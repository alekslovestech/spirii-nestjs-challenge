import { TransactionType } from './transactiontype';

export interface ITransaction {
  transactionId: string;
  userId: string;
  type: TransactionType;
  amount: number;
  createdAt: string;
}
