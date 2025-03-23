const { CryptoWalletManager } = require('./dist/index');

async function testWallet() {
  const manager = new CryptoWalletManager();

  console.log('Creating Bitcoin wallet...');
  const btcWallet = manager.createBitcoinWallet('testnet');

  console.log('Mnemonic:', btcWallet.getMnemonic());

  const address = btcWallet.generateAddress();
  console.log('Generated address:', address.address);
  console.log('Public key:', address.publicKey);

  try {
    const balance = await btcWallet.getBalance(address.address);
    console.log('Balance:', balance);
  } catch (error) {
    console.log('Error getting balance:', error.message);
  }
}

if (require.main === module) {
  testWallet().catch(console.error);
}