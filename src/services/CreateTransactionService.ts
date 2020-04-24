import Transaction from '../models/Transaction';
import Createcategorieservice from '../services/CreateCategoriesService';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import GetBalanceTransactionService from './GetBalanceTransactionService';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

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

    const tr = new TransactionsRepository();
    tr.setBalance(transactions);

    return transaction;
  }
}

export default CreateTransactionService;
