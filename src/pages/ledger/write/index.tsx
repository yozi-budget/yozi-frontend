import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StyledButton from '@/components/common/StyledButton';
import { LabelBox } from '@/components/common/LabelBox';
import { useNavigate } from 'react-router-dom';

import {
  PageWrapper,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  AddRowButton,
  Select,
  Input,
  MemoInput,
  AmountWrapper
} from './index.styles';

const initialRow = {
  type: '',
  date: '',
  category: '',
  method: '',
  place: '',
  amount: '',
  memo: ''
};

const LedgerWritePage = () => {
  const [rows, setRows] = useState([initialRow]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index][field as keyof typeof initialRow] = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { ...initialRow }]);
  };

  const handleSubmit = () => {
    console.log(rows);
    // API 전송 등 처리
  };

  const navigate = useNavigate();
    
      const handleReadClick = () => {
        navigate('/ledger/read');
      };


  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onToggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {isSidebarOpen && <Sidebar />}
        <PageWrapper>
          <LabelBox $variant="outline">박땡땡님의 가계부</LabelBox>
          <Table>
            <TableHeader>
              <tr>
                <th>분류</th>
                <th>날짜</th>
                <th>카테고리</th>
                <th>결제수단</th>
                <th>거래처</th>
                <th>금액</th>
                <th>메모</th>
              </tr>
            </TableHeader>
            <tbody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Select
                      value={row.type}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleChange(idx, 'type', e.target.value)}>
                      <option value="" disabled hidden>선택</option>
                      <option value="지출">지출</option>
                      <option value="수입">수입</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={row.date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(idx, 'date', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.category}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleChange(idx, 'category', e.target.value)}>
                      <option value="" disabled hidden>선택</option>
                      <option value="식료품/외식">식료품/외식</option>
                      <option value="주거/공과금">주거/공과금</option>
                      <option value="교통/차량">교통/차량</option>
                      <option value="쇼핑/패션">쇼핑/패션</option>
                      <option value="건강/의료">건강/의료</option>
                      <option value="교육/자기계발">교육/자기계발</option>
                      <option value="여가/문화">여가/문화</option>
                      <option value="금융/기타">금융/기타</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.method}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleChange(idx, 'method', e.target.value)}>
                      <option value="" disabled hidden>선택</option>
                      <option value="현금">현금</option>
                      <option value="카드">카드</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.place}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(idx, 'place', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <AmountWrapper>
                      <Input
                        type="number"
                        value={row.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(idx, 'amount', e.target.value)}
                      />
                      <span>원</span>
                    </AmountWrapper>
                  </TableCell>
                  <TableCell>
                    <MemoInput
                      value={row.memo}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleChange(idx, 'memo', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <AddRowButton onClick={handleAddRow}>+ 행 추가</AddRowButton>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <StyledButton variant="primary" onClick={handleReadClick}>
              작성 완료
            </StyledButton>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default LedgerWritePage;