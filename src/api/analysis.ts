// api/analysis.ts
import api from "@/api/axios"; 
import { MonthlyAnalysisResponse, CategoryAnalysisResult } from "@/types/analysis";

// 월별 분석 요청
export const fetchMonthlyAnalysis = async (): Promise<MonthlyAnalysisResponse> => {
  const response = await api.get<MonthlyAnalysisResponse>("/api/budgets/analysis/monthly");
  return response.data;
};

// 카테고리별 분석 요청
export const fetchCategoryAnalysis = async (): Promise<CategoryAnalysisResult> => {
  const response = await api.get<CategoryAnalysisResult>("/api/budgets/analysis/category");
  return response.data;
};

