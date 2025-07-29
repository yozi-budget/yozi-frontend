import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StyledButton from '@/components/common/StyledButton';
import LabelBox from '@/components/common/LabelBox';
import EditLedgerModal from '@/components/ledger/EditLedgerModal';
import { useNavigate } from 'react-router-dom';

import {
  PageWrapper,
  TopControls,
  SelectBox,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionWrapper,
  Badge,
  ActionText,
  Pagination,
} from './index.styles';

const mockData = [
  {
    id: 1,
    type: '지출',
    date: '2025.06.29 (일)',
    category: '식사',
    method: '카드',
    place: '씨유',
    amount: '11,000',
    memo: '맥주 4캔'
  },
  {
    id: 2,
    type: '수입',
    date: '2025.06.28 (토)',
    category: '기타',
    method: '현금',
    place: '알바비',
    amount: '770,000',
    memo: '대타 포함'
  },

  {
    id: 3,
    type: '수입',
    date: '2025.09.15 (화)',
    category: '기타',
    method: '현금',
    place: '알바비',
    amount: '770,000',
    memo: '대타 포함'
  },
  // 필요한 만큼 데이터 추가
];

const isFutureDate = (dateStr: string) => {
  const today = new Date();
  const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
  const itemDate = new Date(year, month - 1, day);
  return itemDate > today;
};

const LedgerReadPage = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [periodFilter, setPeriodFilter] = useState('전체 내역 보기');
  const [categoryFilter, setCategoryFilter] = useState('카테고리 전체보기');

  const navigate = useNavigate();
  
  const handleWriteClick = () => {
    navigate('/ledger/write');
  };

  // handleEditClick를 컴포넌트 내부에 정의
  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // 삭제 버튼 클릭 이벤트 (임시)
  const handleDeleteClick = (id: number) => {
    // TODO: 실제 삭제 로직 구현 필요
    console.log('삭제 요청 id:', id);
  };

  // 날짜 필터링 헬퍼 함수 (예: 전체, 과거, 미래)
  const filterByPeriod = (dateStr: string) => {
    const today = new Date();
    const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
    const itemDate = new Date(year, month - 1, day);

    if (periodFilter === '전체 내역 보기') return true;
    if (periodFilter === '과거 내역 보기') return itemDate < today;
    if (periodFilter === '미래 내역 보기') return itemDate > today;
    return true;
  };

  // 필터링된 데이터 계산 (useMemo로 최적화)
  const filteredData = useMemo(() => {
    return mockData
      .filter(item => {
        if (!filterByPeriod(item.date)) return false;
        if (categoryFilter === '카테고리 전체보기') return true;
        return item.category === categoryFilter;
      })
      .sort((a, b) => {
        const toDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
          return new Date(year, month - 1, day);
        };
        return toDate(b.date).getTime() - toDate(a.date).getTime(); // 내림차순 정렬
      });
  }, [periodFilter, categoryFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
     <Header onToggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {isSidebarOpen && <Sidebar />}
        <PageWrapper>
          <LabelBox>박땡땡님의 가계부</LabelBox>
          <TopControls>
            <SelectBox as="select" value={periodFilter} onChange={e => setPeriodFilter(e.target.value)}>
              <option>전체 내역 보기</option>
              <option>과거 내역 보기</option>
              <option>미래 내역 보기</option>
            </SelectBox>

            <SelectBox as="select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option>카테고리 전체보기</option>
              <option>식료품/외식</option>
              <option>주거/공과금</option>
              <option>교통/차량</option>
              <option>쇼핑/패션</option>
              <option>건강/의료</option>
              <option>교육/자기계발</option>
              <option>여가/문화</option>
              <option>금융/기타</option>
            </SelectBox>

            <StyledButton variant="primary" style={{ marginLeft: 'auto' }} onClick={handleWriteClick}>
              가계부 작성하기
            </StyledButton>
          </TopControls>

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
                <th></th>
              </tr>
            </TableHeader>
            <tbody>
              {filteredData.map(row => (
                <TableRow key={row.id} isFuture={isFutureDate(row.date)}>
                  <TableCell>
                    <Badge type={row.type as '수입' | '지출'}>{row.type}</Badge>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell>{row.place}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.memo}</TableCell>
                  <TableCell>
                    <ActionWrapper>
                      <ActionText onClick={() => handleEditClick(row)}>수정하기</ActionText>
                      <ActionText $delete onClick={() => handleDeleteClick(row.id)}>삭제하기</ActionText>
                    </ActionWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <span>◀</span>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} className={n === 1 ? 'active' : ''}>{n}</button>
            ))}
            <span>▶</span>
          </Pagination>
        </PageWrapper>

        {isEditModalOpen && selectedItem && (
          <EditLedgerModal
            item={selectedItem}
            onClose={() => setEditModalOpen(false)}
            onSave={(updatedItem) => {
              // 실제 저장 로직은 상태 관리 또는 API 요청 필요
              console.log('수정된 데이터:', updatedItem);
              setEditModalOpen(false);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default LedgerReadPage;
