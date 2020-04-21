import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from '../services/CreateCategoryService';
import { getRepository, getCustomRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Transaction): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    const createCategoryService = new CreateCategoryService();
    var selectedCategory = await createCategoryService.execute(category);

    const transaction = transactionRepository.create({ title, value, type, category_id: selectedCategory.id });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
