import React from "react";
import {
  BackgroundWrapper,
  BackgroundHalf,
  BackgroundBottom,
  ContentWrapper,
  Title,
  Subtitle,
  LoginBox,
  Description,
} from "./index.styles";

import SocialButton from "@/components/common/SocialButton";

const SocialLoginPage = () => {
  const handleSocialLogin = (socialType: "kakao" | "google") => {
    // 백엔드 로그인 시작 URL로 이동 (백엔드가 리다이렉트 처리)
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${socialType}`;
  };

  return (
    <BackgroundWrapper>
      <BackgroundHalf />
      <BackgroundBottom />
      <ContentWrapper>
        <Title>YOZI</Title>
        <Subtitle>당신의 요즘 소비 지출, 함께 점검해볼까요?</Subtitle>

        <LoginBox>
          <Description>
            SNS 계정으로 간편하게 로그인하세요.
            <br />
            별도의 가입 없이 바로 시작할 수 있어요!
          </Description>

          <SocialButton
            type="kakao"
            text="카카오 로그인"
            onClick={() => handleSocialLogin("kakao")}
          />

          <SocialButton
            type="google"
            text="구글 로그인"
            onClick={() => handleSocialLogin("google")}
          />
        </LoginBox>
      </ContentWrapper>
    </BackgroundWrapper>
  );
};

export default SocialLoginPage;
