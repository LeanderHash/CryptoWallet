import { BitcoinWallet } from './wallet/BitcoinWallet';
import { WalletConfig } from './types/wallet';

export class CryptoWalletManager {
  private bitcoinWallet?: BitcoinWallet;

  createBitcoinWallet(network: 'mainnet' | 'testnet' = 'testnet', mnemonic?: string): BitcoinWallet {
    const config: WalletConfig = {
      network,
      derivationPath: "m/44'/0'/0'/0"
    };

    this.bitcoinWallet = new BitcoinWallet(config, mnemonic);
    return this.bitcoinWallet;
  }

  getBitcoinWallet(): BitcoinWallet | undefined {
    return this.bitcoinWallet;
  }
}

export * from './types/wallet';
export * from './wallet/BaseWallet';
export * from './wallet/BitcoinWallet';
export * from './utils/crypto';