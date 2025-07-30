import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  console.log("받은 토큰:", token);

  if (token) {
    localStorage.setItem("accessToken", token);
    console.log("✅ 토큰 저장 완료, /home으로 이동 시도");
    setTimeout(() => {
      console.log("✅ navigate 호출");
      navigate('/home');
    }, 100);
  } else {
    console.log("❌ 토큰 없음, /로 이동");
    navigate("/");
  }
}, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default AuthSuccessPage;
