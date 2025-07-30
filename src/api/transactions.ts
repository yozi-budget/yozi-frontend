import api from './axios';  

export interface Transaction {
  id: number;
  userNickname: string;
  type: 'INCOME' | 'EXPENSE';
  categoryId: number;
  categoryDisplayName: string;
  paymentMethod: string;
  vendor: string;
  amount: number;
  memo: string;
  transactionDate: string; // yyyy-mm-dd
}

// 토큰 자동 포함해서 거래 내역 가져오기
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("토큰이 없습니다. 로그인 해주세요.");

    const res = await api.get<Transaction[]>('/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ 거래 내역 가져오기 실패:", error);
    throw error;
  }
};
