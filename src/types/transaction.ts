// types/transaction.ts

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
}

// 요청용 타입 (id 없음)
export interface TransactionRequest {
  type: TransactionType;
  categoryId: number;
  paymentMethod: PaymentMethod;
  vendor: string;
  amount: number;
  memo: string;
  transactionDate: string; // "YYYY-MM-DD"
}

// 응답 및 화면용 타입 (id 포함)
export interface Transaction extends TransactionRequest {
  id: number;
}
