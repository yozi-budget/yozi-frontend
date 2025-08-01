// api/transactions.ts

import axios from 'axios';
import { TransactionRequest } from '@/types/transaction';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const postTransactionsBatch = async (transactions: TransactionRequest[]): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('No access token found');

  await axios.post(`${API_BASE_URL}/api/transactions/batch`, transactions, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

