// types/home.ts 

import { Transaction } from './transaction';

export interface HomeSummary {
  expense: number;
  income: number;
  budget: number;
}

export interface HomeDataResponse {
  summary: HomeSummary;
  transactions: Transaction[];
}
