import styled from 'styled-components';
export const LabelBox = styled.div `
  width: 160px;          // 고정 너비
  height: 40px;          // 고정 높이  
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #228be6;

  display: flex;
  align-items: center;   // 세로 가운데
  justify-content: center; // 가로 가운데

  ${({ $variant }) => $variant === 'primary'
    ? `
        background-color: #228be6;
        color: white;
      `
    : `
        background-color: white;
        color: #228be6;
      `}
`;
export default LabelBox;
