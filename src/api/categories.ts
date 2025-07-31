import api from './axios';

export interface Category {
  id: number;
  displayName: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get<Category[]>('/api/categories');
    return res.data;
  } catch (error) {
    console.error('카테고리 조회 실패', error);
    throw error;
  }
};
