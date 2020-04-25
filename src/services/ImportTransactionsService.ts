import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import Createcategorieservice from './CreateCategoriesService';
import GetBalanceTransactionService from './GetBalanceTransactionService';
import Category from '../models/Category';

class ImportTransactionsService {
  async execute(loadCsv: string[]): Promise<Transaction[]> {
    var transactions = new Array<Transaction>();

    for (let t of loadCsv) {
      var transaction = new Transaction();

      transaction.title = t[0].trim();
      transaction.type = t[1].trim() as 'income' | 'outcome';
      transaction.value = parseInt(t[2]);
      transaction.category_id = t[3].trim();
      transaction.category = await handleCategories(transaction.category_id);
      transactions.push(transaction);
    }

    const transactionRepository = getRepository(Transaction);
    const storedTransactions = await transactionRepository.find();

    const finalTransactions = storedTransactions.concat(transactions);

    const getBalanceTransactionService = new GetBalanceTransactionService();
    const currentBalance = await getBalanceTransactionService.execute(finalTransactions);

    if (currentBalance.income > currentBalance.outcome) {
      const sortedTransactions = transactions.sort((t0, t1) => (t1.type !== t0.type ? 1 : -1));

      for (let t of sortedTransactions) {
        const transaction = transactionRepository.create(t);
        await transactionRepository.save(transaction);
      }
    }

    return transactions;
  }
}

async function handleCategories(categoryId: string): Promise<Category> {
  var createcategorieservice = new Createcategorieservice();
  var category = await createcategorieservice.execute(categoryId);

  return category;
}

async function handleTransactions() {}

export default ImportTransactionsService;
