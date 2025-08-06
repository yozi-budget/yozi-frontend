import styled from 'styled-components';

export const PageWrapper = styled.div`
  flex: 1;
  padding: 40px 60px;
  background-color: #ffffff;
  position: relative;
`;

export const TopControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 5px;
`;

export const SelectBox = styled.div`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 160px;          
  height: 40px; 
  
  padding: 10px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  text-align: center;        /* 가운데 정렬 */
  text-align-last: center;   /* 마지막 선택값까지 가운데 정렬 (크롬, 엣지, 일부 브라우저) */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
`;

export const TableHeader = styled.thead`
  th {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: #444;
    padding: 10px 12px;
    margin-right: auto;
  }
`;

export const TableRow = styled.tr<{ isFuture?: boolean }>`
  background-color: ${({ isFuture }) => (isFuture ? '#F0F7FF' : '#fff')};
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const TableCell = styled.td`
  padding: 12px 12px;
  font-size: 14px;
  color: #333;

  &:last-child {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }
`;

export const Badge = styled.span<{ type: '지출' | '수입' }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${({ type }) => (type === '지출' ? '#ffdddd' : '#d4f5e9')};
  color: ${({ type }) => (type === '지출' ? '#d92d20' : '#087443')};
  font-weight: 600;
  font-size: 13px;
`;

export const ActionText = styled.span<{ $delete?: boolean }>`
  color: ${({ $delete }) => ($delete ? '#d92d20' : '#228be6')};
  font-size: 13px;
  margin-left: 8px;
  cursor: pointer;
`;

export const ActionWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
