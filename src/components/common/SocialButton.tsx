import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

type SocialType = "kakao" | "google";

interface Props {
  type: SocialType;
  text: string;
  onClick?: () => void;
}

const Button = styled.button<{ $bgColor: string; $textColor: string }>`
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 22px;
  }
`;

const SocialButton: React.FC<Props> = ({ type, text, onClick }) => {
  const iconMap = {
    kakao: <RiKakaoTalkFill color="#3C1E1E" />,
    google: <FcGoogle />,
  };

  const buttonColorMap = {
    kakao: { bgColor: "#FEE500", textColor: "#191919" },
    google: { bgColor: "#F2F2F2", textColor: "#191919" },
  };

  const { bgColor, textColor } = buttonColorMap[type];

  return (
    <Button $bgColor={bgColor} $textColor={textColor} onClick={onClick}>
      <IconWrapper>{iconMap[type]}</IconWrapper>
      {text}
    </Button>
  );
};

export default SocialButton;
