import styled from 'styled-components';
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
  overflow-y: auto;
  padding: 30px;
`;
export const TopTitle = styled.h2 `
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;
export const GridWrapper = styled.div `
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  grid-auto-rows: minmax(300px, auto); /* 최소 높이 확보 */
  gap: 40px;
  margin-top: 15px;
  height: auto;
`;
export const Column = styled.div `
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0px;
`;
export const RightColumn = styled.div `
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 12px;
  gap: 16px;
  height: 100%;
`;
export const Divider = styled.div `
  height: 1px;
  background-color: #dee2e6;
`;
export const Card = styled.div `
  background-color: #f7f8fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0px 25px;
  display: flex;
  flex-direction: column;
  height: 275px;
`;
export const ChartTitle = styled.h3 `
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;
export const Amount = styled.div `
  font-size: 18px;
  font-weight: bold;
  color: ${({ type }) => (type === 'income' ? '#2f9e44' : '#228be6')};
  margin-bottom: 6px;
`;
export const LineChartWrapper = styled.div `
  height: 100px;
  margin-top: 8px;
`;
export const BarChartSection = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
  height: 160px;

  .bar {
    position: relative;
    width: 25%;
    text-align: center;
  }

  .bar-graph {
    background-color: #dee2e6;
    height: 100px;
    border-radius: 6px;
    margin: 0 auto 6px auto;
    width: 40%;
  }

  .highlight .bar-graph {
    background-color: #228be6;
  }

  .highlight .month {
    font-weight: 600;
    color: #228be6;
  }

  .label {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }

  .value {
    font-size: 13px;
    font-weight: 500;
    color: #000;
    margin-top: 2px;
  }

  .highlight .day-average {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    background-color: #edf4ff;
    color: #228be6;
    padding: 2px 6px;
    border-radius: 10px;
  }
`;
export const FixedExpenseContainer = styled.div `
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 0px;
`;
export const FixedExpenseList = styled.ul `
  flex-grow: 1;
  overflow-y: auto; /* 스크롤 가능 */
  -ms-overflow-style: none; /* IE, Edge 숨김 */
  scrollbar-width: none; /* Firefox 숨김 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari 숨김 */
  }

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px; /* 스크롤 영역 확보 */
`;
export const FixedExpenseItem = styled.li `
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  font-size: 13px;
  color: #444;
  font-weight: 500;
  padding: 2px 4px;

  span {
    white-space: nowrap;

    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
`;
export const FixedExpenseFooter = styled.div `
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dee2e6;
  padding: 12px 0 0;  /* 상단 패딩을 12px로 늘림 */
  margin-top: 12px;   /* 위 요소와의 간격도 확보 */
  font-weight: 700;
  font-size: 15px;

  .total-label {
    color: #333;
  }

  .total-amount {
    color: #228be6;
  }
`;
export const ScoreBox = styled.div `
  display: flex;
  justify-content: center;  /* ✅ 가로 중앙 */
  align-items: center;      /* ✅ 세로 중앙 */
  gap: 150px; /* 점수와 설명 사이 넉넉한 여백 */
  height: 100%; /* ✅ 부모 높이를 꽉 채워야 세로 중앙 가능 */
`;
export const ScoreInfo = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ScoreCircle = styled.div `
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #ffe3e3;
  color: #fa5252;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ScoreDesc = styled.div `
  font-size: 13px;
  color: #fa5252;
  margin-top: 10px; /* 원 아래 여백 */
  text-align: center;
`;
export const IconList = styled.ul `
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  margin-top: 8px;

  li {
    margin-bottom: 6px;
    display: flex;
    align-items: flex-start;

    &::before {
      content: '✔';
      color: #228be6;
      font-weight: bold;
      margin-right: 6px;
    }
  }
`;
