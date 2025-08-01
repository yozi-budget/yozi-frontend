// api/categories.ts
import api from "@/api/axios"; // 인터셉터 설정된 axios 인스턴스
import { Category } from "@/types/category";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.post<Category[]>("/api/categories");
  return response.data;
};
