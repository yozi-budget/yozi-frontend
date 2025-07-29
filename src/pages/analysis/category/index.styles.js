import styled from "styled-components";
export const Container = styled.div `
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
`;
export const MainLayout = styled.div `
  display: flex;
  height: 100vh;
  overflow: hidden;
`;
export const ContentWrapper = styled.div `
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;
export const PageTitle = styled.h1 `
  font-size: 24px;
  margin-bottom: 20px;
`;
export const ChartCard = styled.div `
  background-color: #fffff;
  border-radius: 16px;
  padding: 10px 30px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
  }
`;
export const CenteredTextWrapper = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  min-height: 25vh;   /* 화면의 25% 차지 */
`;
export const SummaryText = styled.p `
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;
export const Highlight = styled.span `
  color: #4A90E2;
`;
export const Suggestion = styled.p `
  color: #4A90E2;
  font-weight: 500;
`;
