import React, { useState, useEffect } from 'react';
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

import { getCategories, Category } from '@/api/categories';
import { postTransaction } from '@/api/transactions';
import { decodeToken } from '@/utils/auth'; 

// Row 타입 선언
interface Row {
  type: string;
  date: string;
  categoryId: number;
  method: string;
  place: string;
  amount: string;
  memo: string;
}

const initialRow: Row = {
  type: '',
  date: '',
  categoryId: 0,
  method: '',
  place: '',
  amount: '',
  memo: ''
};


const LedgerWritePage = () => {
  const [rows, setRows] = useState([initialRow]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 카테고리 API 호출해서 셀렉트 옵션 세팅
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        alert('카테고리 정보를 불러오는데 실패했습니다.');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    index: number,
    field: keyof Row,
    value: string | number
  ) => {
    const newRows = [...rows];
    // categoryId와 amount는 number로 저장해야 할 수 있으니 아래처럼 처리
    if (field === 'categoryId') {
      newRows[index][field] = Number(value) as any;
    } else {
      newRows[index][field] = value as any;
    }
    setRows(newRows);
  };


  const handleAddRow = () => {
    setRows([...rows, { ...initialRow }]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || !decoded.userId) {
        alert('유효하지 않은 토큰입니다.');
        return;
      }

      const userId = decoded.userId;

      for (const row of rows) {
        if (
          !row.type ||
          !row.date ||
          !row.categoryId ||
          !row.method ||
          !row.place ||
          !row.amount
        ) {
          alert('모든 필드를 정확히 입력해주세요.');
          return;
        }

        const type = row.type === '수입' ? 'INCOME' : 'EXPENSE';
        const paymentMethod = row.method === '현금' ? 'CASH' : 'CARD';

        await postTransaction({
          userId,
          type,
          categoryId: Number(row.categoryId),
          paymentMethod,
          vendor: row.place,
          amount: Number(row.amount),
          memo: row.memo || '',
          transactionDate: row.date,
        });
      }

      alert('가계부 내역이 저장되었습니다.');
      navigate('/ledger/read');
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

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
                      onChange={(e) =>
                        handleChange(idx, 'type', e.target.value)
                      }>
                      <option value="" disabled hidden>선택</option>
                      <option value="지출">지출</option>
                      <option value="수입">수입</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleChange(idx, 'date', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.categoryId ? row.categoryId.toString() : ''}
                      onChange={(e) =>
                        handleChange(idx, 'categoryId', Number(e.target.value))
                    }>
                      <option value="" disabled hidden>선택</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id.toString()}>
                          {cat.displayName}
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.method}
                      onChange={(e) =>
                        handleChange(idx, 'method', e.target.value)
                      }>
                      <option value="" disabled hidden>선택</option>
                      <option value="현금">현금</option>
                      <option value="카드">카드</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.place}
                      onChange={(e) =>
                        handleChange(idx, 'place', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <AmountWrapper>
                      <Input
                        type="number"
                        value={row.amount}
                        onChange={(e) =>
                          handleChange(idx, 'amount', e.target.value)
                        }
                      />
                      <span>원</span>
                    </AmountWrapper>
                  </TableCell>
                  <TableCell>
                    <MemoInput
                      value={row.memo}
                      onChange={(e) =>
                        handleChange(idx, 'memo', e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <AddRowButton onClick={handleAddRow}>+ 행 추가</AddRowButton>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <StyledButton variant="primary" onClick={handleSubmit}>
              작성 완료
            </StyledButton>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default LedgerWritePage;
