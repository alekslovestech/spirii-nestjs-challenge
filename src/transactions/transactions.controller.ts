import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/aggregated/:userId')
  getAggregatedData(@Param('userId') userId: string) {
    return this.transactionsService.getAggregatedData(userId);
  }
}
