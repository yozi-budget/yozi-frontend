import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 👈 이거 추가
import { Category } from '@/types/category';
import { fetchCategories as fetchCategoriesAPI } from '@/api/categories';

interface CategoryState {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'category-storage', // 로컬 스토리지 키 이름
    }
  )
);
