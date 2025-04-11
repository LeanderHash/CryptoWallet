import { BitcoinWallet } from '../src/wallet/BitcoinWallet';
import { WalletConfig } from '../src/types/wallet';

describe('BitcoinWallet', () => {
  let wallet: BitcoinWallet;
  let config: WalletConfig;

  beforeEach(() => {
    config = {
      network: 'testnet',
      derivationPath: "m/44'/1'/0'/0"
    };
    wallet = new BitcoinWallet(config);
  });

  test('should create wallet with mnemonic', () => {
    expect(wallet.getMnemonic()).toBeDefined();
    expect(wallet.getMnemonic().split(' ')).toHaveLength(12);
  });

  test('should generate valid address', () => {
    const address = wallet.generateAddress();

    expect(address.address).toBeDefined();
    expect(address.publicKey).toBeDefined();
    expect(address.privateKey).toBeDefined();
    expect(address.address).toMatch(/^[13mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/);
  });

  test('should create transaction', () => {
    const fromAddress = 'testFromAddress';
    const toAddress = 'testToAddress';
    const amount = 0.001;

    const tx = wallet.sendTransaction(fromAddress, toAddress, amount);

    expect(tx.from).toBe(fromAddress);
    expect(tx.to).toBe(toAddress);
    expect(tx.amount).toBe(amount);
    expect(tx.txid).toBeDefined();
    expect(tx.timestamp).toBeDefined();
  });
});