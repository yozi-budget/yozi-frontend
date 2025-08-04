// 월별 분석 타입
// types/analysis.ts

export interface MonthlyTransaction {
  date: string; // "2025-08-04"
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
export interface CategorySpendingItem {
  categoryId: number;
  totalSpentAmount: number;
}

export interface CategoryAnalysisResult {
  spendingByCategory: CategorySpendingItem[];
  feedbackMessage: string;
}
