import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px 40px;
  width: 100%;
`;

export const Table = styled.table`
  border-spacing: 0 12px;
`;

export const TableHeader = styled.thead`
  th {
    text-align: left;
    padding: 15px 0 0 15px;
    font-weight: bold;
    font-size: 14px;
    color: #555;
  }
`;

export const TableRow = styled.tr`
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

export const TableCell = styled.td`
  padding: 10px;
  vertical-align: middle;
`;

export const Select = styled.select`
appearance: none;          // 모든 브라우저
  -webkit-appearance: none;  // Safari
  -moz-appearance: none;     // Firefox

  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 14px;
  background-color: #fff;
  color: #212529;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 14px;
  color: #212529;
`;

export const MemoInput = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 14px;
  resize: none;
  color: #212529;
  height: 40px;
  line-height: 1.5;
  overflow: auto;
  vertical-align: middle;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const AddRowButton = styled.button`
  margin-top: 12px;
  background: none;
  border: none;
  color: #228be6;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s, background-color 0.2s;
  
  &:hover {
    color: #e74c3c; /* 빨간색 계열 */
    background-color: #f9f9f9;
    border-radius: 4px;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 30px;
  align-self: center;
  padding: 14px 80px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  background-color: #228be6;
  color: white;
  border: none;
  cursor: pointer;
`;

export const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #555;
  }
`;
