// src/api/authApi.ts
import api from "./axios";

export const logoutApi = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("로그아웃 API 호출 실패:", error);
    throw error;
  }
};
