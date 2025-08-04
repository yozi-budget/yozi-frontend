import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StyledButton from '@/components/common/StyledButton';
import LabelBox from '@/components/common/LabelBox';
import EditLedgerModal from '@/components/ledger/EditLedgerModal';
import { useNavigate } from 'react-router-dom';
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from '@/store/userStore';
import { fetchTransactions, updateTransaction, deleteTransaction } from '@/api/transactions';
import { Transaction, TransactionRequest } from '@/types/transaction';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LedgerReadPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const categories = useCategoryStore(state => state.categories);
  const nickname = useUserStore(state => state.nickname);

  const [typeFilter, setTypeFilter] = useState('전체 내역 보기');
  const [categoryFilter, setCategoryFilter] = useState('카테고리 전체보기');

  const navigate = useNavigate();

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.displayName : '알 수 없음';
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError('가계부 내역을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleWriteClick = () => {
    navigate('/ledger/write');
  };

  const handleEditClick = (item: Transaction) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleUpdateTransaction = async (updatedData: TransactionRequest) => {
    if (!selectedItem) return;

    const correctedData = {
      ...updatedData,
      categoryId: Number(updatedData.categoryId), // categoryId를 숫자로 강제 변환
    };

    try {
      await updateTransaction(selectedItem.id, correctedData);
      setTransactions(prev =>
        prev.map(item =>
          item.id === selectedItem.id
            ? { ...item, ...correctedData }
            : item
        )
      );
      toast.success('수정 완료!');
    } catch (err) {
      console.error('수정 중 오류 발생:', err);
      toast.error('수정 실패');
    } finally {
      setEditModalOpen(false);
      setSelectedItem(null);
    }
  };


  const handleDeleteClick = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(item => item.id !== id));
      toast.success('삭제 완료!');
    } catch (err) {
      console.error('삭제 중 오류:', err);
      toast.error('삭제 실패');
    }
  };

  const isFutureDate = (dateStr: string) => {
    const today = new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    const itemDate = new Date(year, month - 1, day);
    return itemDate > today;
  };

  const filteredData = useMemo(() => {
    return transactions
      .filter(item => {
        if (typeFilter === '수입 내역 보기' && item.type !== 'INCOME') return false;
        if (typeFilter === '지출 내역 보기' && item.type !== 'EXPENSE') return false;
        if (categoryFilter !== '카테고리 전체보기' && getCategoryName(item.categoryId) !== categoryFilter) return false;
        return true;
      })
      .sort((a, b) => {
        const aDate = new Date(a.transactionDate);
        const bDate = new Date(b.transactionDate);
        return bDate.getTime() - aDate.getTime();
      });
  }, [transactions, typeFilter, categoryFilter, categories]);

  if (loading) return <div>내역 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onToggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {isSidebarOpen && <Sidebar />}
        <PageWrapper>
          <LabelBox>{nickname ? `${nickname}님의 가계부` : '가계부'}</LabelBox>

          <TopControls>
            <SelectBox as="select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option>전체 내역 보기</option>
              <option>수입 내역 보기</option>
              <option>지출 내역 보기</option>
            </SelectBox>

            <SelectBox as="select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option>카테고리 전체보기</option>
              {categories.map(cat => (
                <option key={cat.id}>{cat.displayName}</option>
              ))}
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
                <TableRow key={row.id} isFuture={isFutureDate(row.transactionDate)}>
                  <TableCell>
                    <Badge type={row.type === 'INCOME' ? '수입' : '지출'}>
                      {row.type === 'INCOME' ? '수입' : '지출'}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.transactionDate}</TableCell>
                  <TableCell>{getCategoryName(row.categoryId)}</TableCell>
                  <TableCell>{row.paymentMethod === 'CASH' ? '현금' : '카드'}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>{row.amount.toLocaleString()} 원</TableCell>
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
            categories={categories}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedItem(null);
            }}
            onSave={handleUpdateTransaction}
          />
        )}
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default LedgerReadPage;
