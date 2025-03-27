import { BaseWallet } from './BaseWallet';
import { CoinWallet, WalletConfig, Transaction } from '../types/wallet';
import { CryptoUtils } from '../utils/crypto';
import { TransactionManager } from './TransactionManager';
import * as crypto from 'crypto';

export class BitcoinWallet extends BaseWallet {
  private static readonly BITCOIN_MAINNET_PREFIX = 0x00;
  private static readonly BITCOIN_TESTNET_PREFIX = 0x6f;
  private transactionManager: TransactionManager;

  constructor(config: WalletConfig, mnemonic?: string) {
    super(config, mnemonic);
    this.transactionManager = new TransactionManager();
  }

  generateAddress(derivationPath: string = "m/44'/0'/0'/0/0"): CoinWallet {
    const keyPair = CryptoUtils.deriveKeyPair(this.seed, derivationPath);

    if (!keyPair.privateKey || !keyPair.publicKey) {
      throw new Error('Failed to derive key pair');
    }

    const publicKeyHash = CryptoUtils.hash160(keyPair.publicKey);
    const prefix = this.config.network === 'mainnet'
      ? BitcoinWallet.BITCOIN_MAINNET_PREFIX
      : BitcoinWallet.BITCOIN_TESTNET_PREFIX;

    const address = this.encodeBase58Check(
      Buffer.concat([Buffer.from([prefix]), publicKeyHash])
    );

    return {
      address,
      privateKey: keyPair.privateKey.toString('hex'),
      publicKey: keyPair.publicKey.toString('hex')
    };
  }

  async getBalance(address: string): Promise<number> {
    // mock implementation - would connect to blockchain API
    return Math.random() * 10;
  }

  private encodeBase58Check(payload: Buffer): string {
    const checksum = CryptoUtils.sha256(CryptoUtils.sha256(payload)).slice(0, 4);
    const combined = Buffer.concat([payload, checksum]);
    return this.base58Encode(combined);
  }

  private base58Encode(buffer: Buffer): string {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    let num = BigInt('0x' + buffer.toString('hex'));

    while (num > 0n) {
      const remainder = Number(num % 58n);
      result = alphabet[remainder] + result;
      num = num / 58n;
    }

    for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
      result = '1' + result;
    }

    return result;
  }

  sendTransaction(from: string, to: string, amount: number, fee?: number): Transaction {
    return this.transactionManager.createTransaction(from, to, amount, fee);
  }

  async broadcastTransaction(transaction: Transaction): Promise<boolean> {
    return this.transactionManager.broadcastTransaction(transaction);
  }

  getTransactionHistory(address?: string): Transaction[] {
    if (address) {
      return this.transactionManager.getTransactionsByAddress(address);
    }
    return this.transactionManager.getTransactions();
  }
}