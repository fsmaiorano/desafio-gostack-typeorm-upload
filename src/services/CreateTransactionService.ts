import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { getRepository } from 'typeorm';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  public async execute({ title, value, type }: Request): Promise<Transaction> {
    // var balance = this.transactionsRepository.getBalance();

    // if (
    //   transaction.type === 'outcome' &&
    //   balance.income < balance.outcome + transaction.value
    // ) {
    //   throw Error('invalid income value');
    // }

    const transactionRepository = getRepository(Transaction);

    const transaction = transactionRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
