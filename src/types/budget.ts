// types/budget.ts

export interface BudgetSummary {
  total: number;
  spent: number;
  remaining: number;
  exceeded: number;
  prevTotal: number;
  prevSpent: number;
  prevRemaining: number;
  prevExceeded: number;
}

export interface CategoryBudget {
  categoryId: number;
  amount: number;
}
