import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import GetBalanceTransactionService from '../services/GetBalanceTransactionService';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public balance: Balance;

  constructor() {
    super();
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public async getBalance(transactions: Transaction[]): Promise<Balance> {
    var income = transactions
      .filter(x => x.type === 'income')
      .map(y => y.value)
      .reduce((accumulator: number, current: number) => accumulator + current, 0);

    var outcome = transactions
      .filter(x => x.type === 'outcome')
      .map(y => y.value)
      .reduce((accumulator: number, current: number) => accumulator + current, 0);
    var total = income - outcome;

    this.balance = new Balance({ income, outcome, total });

    return this.balance;
  }
}

export default TransactionsRepository;
