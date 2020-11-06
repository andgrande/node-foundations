import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  value: number;
  type: 'income' | 'outcome';
  title: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transaction = this.transactions;

    return transaction;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((acc, actual) => {
        return acc + actual.value;
      }, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((acc, actual) => {
        return acc + actual.value;
      }, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(transactionInputs: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(transactionInputs);
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
