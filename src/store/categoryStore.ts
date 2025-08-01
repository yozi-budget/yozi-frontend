// store/categoryStore.ts
import { create } from 'zustand';
import { getCategories, Category } from '@/api/categories';

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const data = await getCategories();
      set({ categories: data });
    } catch (e) {
      console.error('카테고리 불러오기 실패', e);
    }
  },
}));
