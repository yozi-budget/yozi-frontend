import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 모든 엘리먼트에 박스 사이징 */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* body 기본 스타일 */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    background-color: #f8f9fa;
    color: #212529;
  }

  /* 버튼에도 폰트 상속 */
  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;