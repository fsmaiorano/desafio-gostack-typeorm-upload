import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import Createcategorieservice from './CreateCategoriesService';
import GetBalanceTransactionService from './GetBalanceTransactionService';

class ImportTransactionsService {
  async execute(loadCsv: string[]): Promise<Transaction[]> {
    var transactions = new Array<Transaction>();
    var createcategorieservice = new Createcategorieservice();

    await Promise.all(
      loadCsv.map(async function map(t) {
        var transaction = new Transaction();

        transaction.title = t[0].trim();
        transaction.type = t[1].trim() as 'income' | 'outcome';
        transaction.value = parseInt(t[2]);
        transaction.category_id = t[3].trim();

        var category = await createcategorieservice.execute(transaction.category_id);
        transaction.category = category;

        transactions.push(transaction);

        return;
      }),
    ).then(async () => {
      const transactionRepository = getRepository(Transaction);
      const storedTransactions = await transactionRepository.find();

      const finalTransactions = storedTransactions.concat(transactions);

      const getBalanceTransactionService = new GetBalanceTransactionService();
      const currentBalance = await getBalanceTransactionService.execute(finalTransactions);

      if (currentBalance.income > currentBalance.outcome) {
        const sortedTransactions = transactions.sort((t0, t1) => (t1.type !== t0.type ? 1 : -1));

        sortedTransactions.forEach(async t => {
          const transaction = transactionRepository.create(t);
          await transactionRepository.save(transaction);
        });
      }
    });

    return transactions;
  }
}

export default ImportTransactionsService;
