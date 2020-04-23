import Transaction from '../models/Transaction';
import Createcategorieservice from '../services/CreateCategoriesService';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: Category;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    const transaction = transactionRepository.create({ title, value, type, category });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
