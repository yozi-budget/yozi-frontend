// store/categoryStore.ts

import { create } from 'zustand';
import { Category } from '@/types/category';
import { fetchCategories } from '@/api/categories';

interface CategoryState {
  categories: Category[];
  loadCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loadCategories: async () => {
    try {
      const data = await fetchCategories();
      set({ categories: data });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },
}));
