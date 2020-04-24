import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import AppError from '../errors/AppError';

class GetBalanceTransactionService {
  public async execute(transactions: Transaction[]): Promise<Balance> {
    if (transactions.length === 0) {
      throw new AppError('Has no transactions');
    }

    const transactionsRepository = new TransactionsRepository();
    const balance = await transactionsRepository.getBalance(transactions);

    return balance;
  }
}

export default GetBalanceTransactionService;
