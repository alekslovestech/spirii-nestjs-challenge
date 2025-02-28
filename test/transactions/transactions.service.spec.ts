import { TransactionsService } from '../../src/transactions/transactions.service';
import * as fs from 'fs';
import * as path from 'path';
import { ITransaction } from '../../src/common/itransaction';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let mockTransactions: ITransaction[];

  beforeAll(() => {
    service = new TransactionsService();

    // Load mock transactions
    const filePath = path.join(__dirname, 'mock-transactions.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const { items } = JSON.parse(rawData);

    // Assign transactions directly to the array
    service['transactions'] = items;
    mockTransactions = items;
  });

  it('should calculate correct aggregated values for userId 100', () => {
    const result = service.getAggregatedData('100');

    expect(result).toEqual({
      userId: '100',
      balance: 25, // 30 (earned) - 5 (spent)
      earned: 30,
      spent: 5,
      payout: 15,
      paidOut: 15,
    });
  });
});
