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

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

// 카카오 로그인 URL
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

// 구글 로그인 URL
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;

const SocialLoginPage = () => {
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
            onClick={() => (window.location.href = kakaoAuthUrl)}
          />

          <SocialButton
            type="google"
            text="구글 로그인"
            onClick={() => (window.location.href = googleAuthUrl)}
          />
        </LoginBox>
      </ContentWrapper>
    </BackgroundWrapper>
  );
};

export default SocialLoginPage;
