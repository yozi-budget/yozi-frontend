// api/transactions.ts

import api from '@/api/axios';
import { TransactionRequest, Transaction } from '@/types/transaction';

export const postTransactionsBatch = async (
  transactions: TransactionRequest[]
): Promise<void> => {
  await api.post('/api/transactions/batch', transactions);
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>('/api/transactions');
  return response.data;
};

export const updateTransaction = async (id: number, data: TransactionRequest): Promise<void> => {
  await api.put(`/api/transactions/${id}`, data);
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await api.delete(`/api/transactions/${id}`);
};
