import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import AppError from '../errors/AppError';

class GetBalanceTransactionService {
  public async execute(transactions: Transaction[]): Promise<Balance> {
    const transactionsRepository = new TransactionsRepository();
    const balance = await transactionsRepository.getBalance(transactions);

    return balance;
  }
}

export default GetBalanceTransactionService;
