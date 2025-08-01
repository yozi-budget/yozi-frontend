// types/home.ts

export interface HomeSummary {
  expense: number;
  income: number;
  budget: number;
}

export type TransactionType = 'INCOME' | 'EXPENSE';

export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER'; // 실제 값에 맞게 조정

export interface HomeTransaction {
  id: number;
  userNickname: string;
  type: TransactionType;
  categoryId: number;
  categoryDisplayName: string;
  paymentMethod: PaymentMethod;
  vendor: string;
  amount: number;
  memo: string;
  transactionDate: string; // YYYY-MM-DD
}

export interface HomeDataResponse {
  summary: HomeSummary;
  transactions: HomeTransaction[];
}
