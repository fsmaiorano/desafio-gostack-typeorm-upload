import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { getRepository, getCustomRepository } from 'typeorm';

class CreateTransactionService {
  public async execute({ title, value, type, category }: Transaction): Promise<Transaction> {
    // var balance = this.transactionsRepository.getBalance();

    // if (
    //   transaction.type === 'outcome' &&
    //   balance.income < balance.outcome + transaction.value
    // ) {
    //   throw Error('invalid income value');
    // }

    const transactionRepository = getRepository(Transaction);

    const transaction = transactionRepository.create({ title, value, type, category });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
