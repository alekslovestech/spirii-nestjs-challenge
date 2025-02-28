import { TransactionsService } from '../../src/transactions/transactions.service';
import * as fs from 'fs';
import * as path from 'path';
import { ITransaction } from '../../src/common/itransaction';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let mockTransactions: ITransaction[];

  beforeAll(() => {
    service = new TransactionsService();

    const filePath = path.join(__dirname, 'mock-transactions.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const { items } = JSON.parse(rawData);

    service['transactions'] = items;
    mockTransactions = items;
  });

  it('should calculate correct aggregated values for userId 100', () => {
    const result = service.getAggregatedData('100');

    expect(result).toEqual({
      userId: '100',
      balance: 25,
      earned: 30,
      spent: 5,
      payout: 15,
    });
  });

  it('should correctly sum transactions for userId 200', () => {
    const result = service.getAggregatedData('200');

    expect(result).toEqual({
      userId: '200',
      balance: 70,
      earned: 100,
      spent: 30,
      payout: 50,
    });
  });
});
