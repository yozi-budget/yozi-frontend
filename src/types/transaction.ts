// types/transaction.ts

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
}

export interface TransactionRequest {
  type: TransactionType;
  categoryId: number;
  paymentMethod: PaymentMethod;
  vendor: string;
  amount: number;
  memo: string;
  transactionDate: string; // "YYYY-MM-DD"
}
