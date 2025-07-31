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

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("👉 프론트에서 가져온 토큰:", token);

    const res = await api.get<Transaction[]>('/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    // 에러 상세 확인
    if (error.response) {
      console.error("❌ 데이터 불러오기 실패 (백엔드 응답)", error.response.status, error.response.data);
    } else {
      console.error("❌ 데이터 불러오기 실패 (네트워크 문제?)", error);
    }
    throw error;
  }
};
