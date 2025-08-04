// types/analysis.ts

// 월별 분석 타입
export interface MonthlyTransaction {
  date: string; 
  vendor: string;
  amount: number;
}

export interface MonthlyAnalysisResponse {
  currentMonthTotal: number;
  currentMonthAverage: number;
  previousMonthTotal: number;
  twoMonthsAgoTotal: number;
  transactions: MonthlyTransaction[];
  habitScore: number;
  habitScoreChange: number;
  habitFeedbackMessages: string[];
}

// 카테고리 분석 타입
export interface categorySpendingList {
  categoryId: number;
  totalSpentAmount: number;
}

export interface CategoryAnalysisResult {
  spendingByCategory: categorySpendingList[];
  feedbackMessage: string;
}
