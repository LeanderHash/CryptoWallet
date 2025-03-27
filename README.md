# CryptoWallet

A simple cryptocurrency wallet implementation for managing Bitcoin and other cryptocurrencies.

## Features

- Generate BIP39 mnemonic phrases
- Derive Bitcoin addresses from mnemonic
- Create and manage transactions
- Basic balance tracking
- Support for mainnet and testnet

## Installation

```bash
npm install
npm run build
```

## Usage

```javascript
const { CryptoWalletManager } = require('./dist/index');

const manager = new CryptoWalletManager();
const wallet = manager.createBitcoinWallet('testnet');

// Generate a new address
const address = wallet.generateAddress();
console.log('Address:', address.address);

// Create a transaction
const tx = wallet.sendTransaction(address.address, 'recipient_address', 0.001);
console.log('Transaction ID:', tx.txid);
```

## Development

```bash
npm run dev    # Run with ts-node
npm run build  # Compile TypeScript
npm test       # Run tests
```