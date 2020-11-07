import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Invalid operation');
    }

    if (value < 1) {
      throw Error('The minimum amount for a transaction is $1');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error('Not enough balance');
    }

    const createdTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return createdTransaction;
  }
}

export default CreateTransactionService;
