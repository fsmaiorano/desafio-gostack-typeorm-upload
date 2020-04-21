import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

class GetBalanceTransactionService {
  private balance: Balance;

  constructor() {
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public execute(transactions: Transaction[]): Balance {
    var income = transactions
      .filter(x => x.type === 'income')
      .map(y => y.value)
      .reduce((accumulator: number, current: number) => {
        return accumulator + current;
      });

    var outcome = transactions
      .filter(x => x.type === 'outcome')
      .map(y => y.value)
      .reduce((accumulator: number, current: number) => {
        return accumulator + current;
      });

    var total = income - outcome;

    this.balance = new Balance({ income, outcome, total });

    return this.balance;
  }
}

export default GetBalanceTransactionService;
