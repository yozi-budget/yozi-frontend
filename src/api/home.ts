// api/home.ts

import axios from '@/api/axios';
import { HomeDataResponse } from '@/types/home';

export const getHomeData = async (): Promise<HomeDataResponse> => {
  const response = await axios.get<HomeDataResponse>('/api/budgets/home');
  return response.data;
};
