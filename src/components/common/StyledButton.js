import styled, { css } from 'styled-components';
export const StyledButton = styled.button `
  width: 160px;          
  height: 40px; 
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #228be6;

  ${({ variant }) => variant === 'primary'
    ? css `
          background-color: #228be6;
          color: white;
        `
    : css `
          background-color: white;
          color: #228be6;
        `}
`;
export default StyledButton;
