// api/categories.ts

import api from "@/api/axios"; 
import { Category } from "@/types/category";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.post<Category[]>("/api/categories");
  return response.data;
};
