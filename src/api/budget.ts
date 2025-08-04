// api/budget.ts

import api from "@/api/axios"; 
import { BudgetSummary } from '@/types/budget';
import { CategoryBudget } from '@/types/budget';

export const fetchBudgetSummary = async (): Promise<BudgetSummary> => {
  const response = await api.get<BudgetSummary>('/api/budgets/summary');
  return response.data;
};

export const getMonthlyBudget = async (): Promise<CategoryBudget[]> => {
  const response = await api.get('/api/budgets');
  return response.data; // Array<{ categoryId, amount }>
};

export const updateMonthlyBudget = async (
  categoryBudgets: CategoryBudget[]
): Promise<void> => {
  await api.put('/api/budgets', categoryBudgets);
};