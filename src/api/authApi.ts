import api from "@/api/axios";

export const logoutApi = async () => {
  console.log("🔹 [logoutApi] 로그아웃 API 호출 시작");

  try {
    const response = await api.post("/auth/logout");
    console.log("✅ [logoutApi] 로그아웃 API 성공 응답:", {
      status: response.status,
      data: response.data,
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ [logoutApi] 로그아웃 API 요청 실패:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  } finally {
    console.log("🔹 [logoutApi] 로그아웃 API 요청 종료");
  }
};
