import styled from 'styled-components';
export const HeaderWrapper = styled.header `
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-weight: bold;
  font-size: 18px;
  position: relative;
`;
export const ToggleButton = styled.button `
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #333;
    flex-shrink: 0;
  }
`;
export const LogoText = styled.span `
  font-size: 15px;    
  font-weight: bold;     
  color: #4A90E2;       
`;
