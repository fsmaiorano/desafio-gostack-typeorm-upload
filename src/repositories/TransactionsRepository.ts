import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import GetBalanceTransactionService from '../services/GetBalanceTransactionService';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private balance: Balance;
  public async getBalance(): Promise<Balance> {
    const transactionRepository = new TransactionsRepository();
    const transactions = await transactionRepository.find();

    const getBalanceService = new GetBalanceTransactionService();
    const balance = getBalanceService.execute(transactions);

    return balance;
  }
}

export default TransactionsRepository;
