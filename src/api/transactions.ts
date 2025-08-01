// api/transactions.ts

import api from '@/api/axios';
import { TransactionRequest } from '@/types/transaction';

export const postTransactionsBatch = async (
  transactions: TransactionRequest[]
): Promise<void> => {
  await api.post('/api/transactions/batch', transactions);
};
