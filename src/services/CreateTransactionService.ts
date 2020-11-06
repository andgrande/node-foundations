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
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      const requestedOutcomeAmount = total - value;

      if (requestedOutcomeAmount <= 0) {
        throw Error('No sufficient balance');
      }
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
