import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import CreateCategoryService from './CreateCategoryService';

class ImportTransactionsService {
  async execute(loadCsv: string[]): Promise<Transaction[]> {
    var transactions = new Array<Transaction>();
    var createTransactionService = new CreateTransactionService();
    var createCategoryService = new CreateCategoryService();

    await Promise.all(
      loadCsv.map(async function map(t) {
        var transaction = new Transaction();

        transaction.title = t[0].trim();
        transaction.type = t[1].trim() as 'income' | 'outcome';
        transaction.value = parseInt(t[2]);
        transaction.category_id = t[3].trim();

        var category = await createCategoryService.execute(transaction.category_id);
        transaction.category = category;
        await createTransactionService.execute(transaction);

        transactions.push(transaction);

        return;
      }),
    );

    return transactions;
  }
}

export default ImportTransactionsService;
