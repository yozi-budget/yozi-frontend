import React from "react";
type SocialType = "kakao" | "google";
interface Props {
    type: SocialType;
    text: string;
    onClick?: () => void;
}
declare const SocialButton: React.FC<Props>;
export default SocialButton;
