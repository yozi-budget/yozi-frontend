import styled from 'styled-components';
export const Container = styled.div `
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export const MainLayout = styled.div `
  display: flex;
  flex: 1;
  overflow: hidden;
`;
export const ContentWrapper = styled.div `
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #ffffff;
`;
export const TopButtonRow = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
export const BudgetBox = styled.div `
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;
export const BudgetTitle = styled.h2 `
  font-size: 1.2rem;
  font-weight: 600;
`;
export const BudgetAmount = styled.div `
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;
export const ProgressBarWrapper = styled.div `
  margin: 1rem 0;
`;
export const ProgressBackground = styled.div `
  background-color: #f1f3f5;
  border-radius: 10px;
  height: 20px;
  width: 100%;
`;
export const ProgressBar = styled.div `
  height: 100%;
  border-radius: 10px;
  background-color: ${({ color }) => color || '#20c997'};
  width: ${({ width }) => `${width}%`};
  transition: width 0.4s ease;
`;
export const BudgetDetail = styled.div `
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
export const SubText = styled.div `
  font-size: 0.9rem;
  color: #339af0;
  margin-top: 1rem;
  text-align: center;
`;
