import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<Boolean> {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.findOne({ where: { id } });

    if (!transaction) {
      throw new AppError('Transaction not found', 500);
    }

    await transactionRepository.remove(transaction);

    return true;
  }
}

export default DeleteTransactionService;
