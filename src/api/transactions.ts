// src/api/transactions.ts
import api from "./axios";

export interface Transaction {
  id: number;
  userNickname: string;
  type: "INCOME" | "EXPENSE";
  categoryId: number;
  categoryDisplayName: string;
  paymentMethod: string;
  vendor: string;
  amount: number;
  memo: string;
  transactionDate: string; // yyyy-mm-dd
}

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const res = await api.get<Transaction[]>("/api/transactions");
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("❌ 데이터 불러오기 실패 (백엔드 응답)", error.response.status, error.response.data);
    } else {
      console.error("❌ 데이터 불러오기 실패 (네트워크 문제?)", error);
    }
    throw error;
  }
};

export interface TransactionPostData {
  type: "INCOME" | "EXPENSE";
  categoryId: number;
  paymentMethod: "CASH" | "CARD";
  vendor: string;
  amount: number;
  memo: string;
  transactionDate: string;
}

export const postTransaction = async (data: TransactionPostData) => {
  try {
    const res = await api.post("/api/transactions", data);
    return res.data;
  } catch (error) {
    console.error("❌ 거래 등록 실패", error);
    throw error;
  }
};
