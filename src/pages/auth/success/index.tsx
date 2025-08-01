import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useCategoryStore } from "@/store/categoryStore";

const AuthSuccessPage = () => {
  const navigate = useNavigate();

  const fetchNickname = useUserStore((state) => state.fetchNickname);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      console.log("✅ 토큰 저장 완료");

      // 토큰 저장 이후 → 닉네임/카테고리 불러오기
      fetchNickname()
        .then(() => fetchCategories())
        .then(() => {
          console.log("✅ 초기 데이터 불러오기 완료, /home으로 이동");
          navigate("/home");
        })
        .catch((error) => {
          console.error("❌ 초기 데이터 로딩 실패:", error);
          navigate("/"); // 실패 시 홈으로
        });
    } else {
      console.log("❌ 토큰 없음, /로 이동");
      navigate("/");
    }
  }, [navigate, fetchNickname, fetchCategories]);

  return <div>로그인 처리 중입니다...</div>;
};

export default AuthSuccessPage;
