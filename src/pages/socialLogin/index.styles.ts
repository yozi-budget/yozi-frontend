import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const BackgroundHalf = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  background-color: #ffffff;
  z-index: 0;
`;

export const BackgroundBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: #f0f6ff;
  z-index: 0;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 700;
  color: #4a90e2;
  margin: 0;
`;

export const Subtitle = styled.p`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: #4a90e2;
  text-align: center;
  margin: 0;
`;

export const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background: white;
  padding: 32px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 320px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 24px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: #222;
  line-height: 1.5;
  margin-bottom: 24px;
`;
