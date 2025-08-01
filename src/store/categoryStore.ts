// store/categoryStore.ts

import { create } from 'zustand';
import { Category } from '@/types/category';
import { fetchCategories as fetchCategoriesAPI } from '@/api/categories';

interface CategoryState {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const data = await fetchCategoriesAPI();
      set({ categories: data });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  },
}));
