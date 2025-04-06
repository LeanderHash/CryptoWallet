#!/usr/bin/env node

const { CryptoWalletManager } = require('./dist/index');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let walletManager = new CryptoWalletManager();
let currentWallet = null;

function showMenu() {
  console.log('\n=== Crypto Wallet CLI ===');
  console.log('1. Create new Bitcoin wallet');
  console.log('2. Generate address');
  console.log('3. Check balance');
  console.log('4. Send transaction');
  console.log('5. View transaction history');
  console.log('6. Exit');
  console.log('========================');
}

function prompt(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function createWallet() {
  const network = await prompt('Network (mainnet/testnet): ');
  currentWallet = walletManager.createBitcoinWallet(network);
  console.log('Wallet created!');
  console.log('Mnemonic:', currentWallet.getMnemonic());
}

async function generateAddress() {
  if (!currentWallet) {
    console.log('Please create a wallet first');
    return;
  }

  const address = currentWallet.generateAddress();
  console.log('New address:', address.address);
  console.log('Public key:', address.publicKey);
}

async function main() {
  console.log('Welcome to Crypto Wallet!');

  while (true) {
    showMenu();
    const choice = await prompt('Select option: ');

    switch (choice) {
      case '1':
        await createWallet();
        break;
      case '2':
        await generateAddress();
        break;
      case '3':
        console.log('Balance checking not implemented yet');
        break;
      case '4':
        console.log('Transaction sending not implemented yet');
        break;
      case '5':
        console.log('Transaction history not implemented yet');
        break;
      case '6':
        console.log('Goodbye!');
        process.exit(0);
      default:
        console.log('Invalid option');
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}