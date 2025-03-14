export interface WalletConfig {
  network: 'mainnet' | 'testnet';
  derivationPath: string;
}

export interface CoinWallet {
  address: string;
  privateKey: string;
  publicKey: string;
  balance?: number;
}

export interface MultiCoinWallet {
  mnemonic: string;
  seed: Buffer;
  wallets: {
    [coinType: string]: CoinWallet;
  };
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
  fee: number;
  txid?: string;
  timestamp?: number;
}