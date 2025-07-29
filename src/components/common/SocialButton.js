import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
const Button = styled.button `
  width: 25vh;
  height: 48px;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $textColor }) => $textColor};
  font-size: 15px;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 auto 16px;

  &:hover {
    opacity: 0.95;
  }
`;
const IconWrapper = styled.div `
  display: flex;
  align-items: center;

  svg {
    font-size: 22px;
  }
`;
const SocialButton = ({ type, text, onClick }) => {
    const iconMap = {
        kakao: _jsx(RiKakaoTalkFill, { color: "#3C1E1E" }),
        google: _jsx(FcGoogle, {}),
    };
    const buttonColorMap = {
        kakao: { bgColor: "#FEE500", textColor: "#191919" },
        google: { bgColor: "#F2F2F2", textColor: "#191919" },
    };
    const { bgColor, textColor } = buttonColorMap[type];
    return (_jsxs(Button, { "$bgColor": bgColor, "$textColor": textColor, onClick: onClick, children: [_jsx(IconWrapper, { children: iconMap[type] }), text] }));
};
export default SocialButton;
