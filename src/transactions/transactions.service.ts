import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ITransaction } from '../common/itransaction';
import { TransactionType } from '../common/transactiontype';
@Injectable()
export class TransactionsService {
  private readonly logger = new Logger('TRANSACTIONS LOGGER');
  private transactions: ITransaction[] = [];

  constructor() {
    this.loadTransactions();
  }

  getAggregatedData(userId: string) {
    console.log('getting aggregated data for user', userId);
    const transactions = this.transactions.filter((tx) => tx.userId === userId);

    let balance = 0;
    let earned = 0;
    let spent = 0;
    let payout = 0;

    for (const tx of transactions) {
      switch (tx.type) {
        case TransactionType.EARNED:
          earned += tx.amount;
          balance += tx.amount;
          break;
        case TransactionType.SPENT:
          spent += tx.amount;
          balance -= tx.amount;
          break;
        case TransactionType.PAYOUT:
          payout += tx.amount;
          break;
      }
    }

    return {
      userId,
      balance,
      earned,
      spent,
      payout,
    };
  }

  private loadTransactions() {
    this.logger.log('Loading transactions from file...');

    const filePath = path.join(__dirname, '../../data/transactions.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const { items } = JSON.parse(rawData);

    items.forEach((tx: ITransaction) => {
      this.transactions.push(tx);
    });

    this.logger.log(`Loaded ${items.length} transactions.`);
  }
}
