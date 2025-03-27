import { Transaction } from '../types/wallet';
import * as crypto from 'crypto';

export class TransactionManager {
  private transactions: Transaction[] = [];

  createTransaction(from: string, to: string, amount: number, fee: number = 0.0001): Transaction {
    const transaction: Transaction = {
      from,
      to,
      amount,
      fee,
      txid: this.generateTxId(),
      timestamp: Date.now()
    };

    this.transactions.push(transaction);
    return transaction;
  }

  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  getTransactionsByAddress(address: string): Transaction[] {
    return this.transactions.filter(tx =>
      tx.from === address || tx.to === address
    );
  }

  async broadcastTransaction(transaction: Transaction): Promise<boolean> {
    // mock implementation
    console.log(`Broadcasting transaction: ${transaction.txid}`);

    // simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // simulate success/failure
    const success = Math.random() > 0.1;

    if (success) {
      console.log(`Transaction ${transaction.txid} confirmed`);
    } else {
      console.log(`Transaction ${transaction.txid} failed`);
    }

    return success;
  }

  private generateTxId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  calculateBalance(address: string): number {
    const txs = this.getTransactionsByAddress(address);
    let balance = 0;

    for (const tx of txs) {
      if (tx.to === address) {
        balance += tx.amount;
      } else if (tx.from === address) {
        balance -= (tx.amount + tx.fee);
      }
    }

    return balance;
  }
}