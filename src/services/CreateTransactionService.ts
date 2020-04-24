import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import GetBalanceTransactionService from './GetBalanceTransactionService';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: Category;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    const getBalanceTransactionService = new GetBalanceTransactionService();
    const currentBalance = await getBalanceTransactionService.execute(transactions);

    if (type === 'outcome' && currentBalance.total < value) {
      throw new AppError('No money available');
    }

    const transaction = transactionRepository.create({ title, value, type, category });

    await transactionRepository.save(transaction);

    transactions.push(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
