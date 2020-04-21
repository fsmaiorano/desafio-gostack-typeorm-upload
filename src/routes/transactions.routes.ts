import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetBalanceTransactionService from '../services/GetBalanceTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import CreateCategoryService from '../services/CreateCategoryService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find();

  const balance = new GetBalanceTransactionService().execute(transactions);

  const result = { transactions, balance };

  return response.json(result);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category_id } = request.body;

  const createTransactionService = new CreateTransactionService();
  const createCategoryService = new CreateCategoryService();

  var category = await createCategoryService.execute(category_id);
  const transaction = await createTransactionService.execute({ title, value, type, category });
  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();
  deleteTransactionService.execute(id);

  return response.json({ success: true });
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
