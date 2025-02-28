import { Injectable } from '@nestjs/common';

enum TransactionType {
  EARNED = 'earned',
  SPENT = 'spent',
  PAYOUT = 'payout',
}

@Injectable()
export class TransactionsService {
  private mockTransactions = [
    { id: '1', userId: '123', type: TransactionType.EARNED, amount: 100 },
    { id: '2', userId: '123', type: TransactionType.SPENT, amount: 50 },
    { id: '3', userId: '123', type: TransactionType.PAYOUT, amount: 30 },
  ];

  getAggregatedData(userId: string) {
    const transactions = this.mockTransactions.filter(
      (tx) => tx.userId === userId,
    );

    const balance = transactions.reduce((acc, tx) => {
      if (tx.type === 'earned') return acc + tx.amount;
      if (tx.type === 'spent') return acc - tx.amount;
      return acc;
    }, 0);

    let earned = 0;
    let spent = 0;
    let payout = 0;

    for (const tx of transactions) {
      switch (tx.type) {
        case TransactionType.EARNED:
          earned += tx.amount;
          break;
        case TransactionType.SPENT:
          spent += tx.amount;
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
      paidOut: 0,
    };
  }
}
