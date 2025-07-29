import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BackgroundWrapper, BackgroundHalf, BackgroundBottom, ContentWrapper, Title, Subtitle, LoginBox, Description, } from "./index.styles";
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
    return (_jsxs(BackgroundWrapper, { children: [_jsx(BackgroundHalf, {}), _jsx(BackgroundBottom, {}), _jsxs(ContentWrapper, { children: [_jsx(Title, { children: "YOZI" }), _jsx(Subtitle, { children: "\uB2F9\uC2E0\uC758 \uC694\uC998 \uC18C\uBE44 \uC9C0\uCD9C, \uD568\uAED8 \uC810\uAC80\uD574\uBCFC\uAE4C\uC694?" }), _jsxs(LoginBox, { children: [_jsxs(Description, { children: ["SNS \uACC4\uC815\uC73C\uB85C \uAC04\uD3B8\uD558\uAC8C \uB85C\uADF8\uC778\uD558\uC138\uC694.", _jsx("br", {}), "\uBCC4\uB3C4\uC758 \uAC00\uC785 \uC5C6\uC774 \uBC14\uB85C \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694!"] }), _jsx(SocialButton, { type: "kakao", text: "\uCE74\uCE74\uC624 \uB85C\uADF8\uC778", onClick: () => (window.location.href = kakaoAuthUrl) }), _jsx(SocialButton, { type: "google", text: "\uAD6C\uAE00 \uB85C\uADF8\uC778", onClick: () => (window.location.href = googleAuthUrl) })] })] })] }));
};
export default SocialLoginPage;
