import { WalletConfig, CoinWallet, MultiCoinWallet } from '../types/wallet';
import { CryptoUtils } from '../utils/crypto';

export abstract class BaseWallet {
  protected config: WalletConfig;
  protected mnemonic: string;
  protected seed: Buffer;

  constructor(config: WalletConfig, mnemonic?: string) {
    this.config = config;
    this.mnemonic = mnemonic || CryptoUtils.generateMnemonic();
    this.seed = CryptoUtils.mnemonicToSeed(this.mnemonic);
  }

  getMnemonic(): string {
    return this.mnemonic;
  }

  getSeed(): Buffer {
    return this.seed;
  }

  abstract generateAddress(derivationPath?: string): CoinWallet;
  abstract getBalance(address: string): Promise<number>;
}