import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { LabelBox } from '@/components/common/LabelBox';
import { useNavigate } from 'react-router-dom';
import CalendarModal from '@/components/home/CalendarModal';
import { getTransactions } from '@/api/transactions';

import {
  Container,
  MainLayout,
  ContentWrapper,
  CalendarWrapper,
  SummaryBox,
  SummaryItem,
  Title,
  Amount,
  ScheduleBox,
  CalendarContainer,
  TopButtonRow,
  CalendarAndSchedule,
} from './index.styles';
import StyledButton from '@/components/common/StyledButton';

type CalendarValue = Date | [Date, Date];

// Transaction type
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

// 날짜별 내역
type FinanceData = Record<string, Transaction[]>;

Modal.setAppElement('#root');

// 날짜 문자열(YMD)을 Date 객체로 정확히 파싱 (시차 문제 방지)
const parseYMD = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const Home: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [date, setDate] = useState<CalendarValue>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [financeData, setFinanceData] = useState<FinanceData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // ✅ 가계부 작성 페이지 이동
  const handleWriteClick = () => {
    navigate('/ledger/write');
  };

  // ✅ 사이드바 토글
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // ✅ 달력 날짜 클릭 → 모달 열기
  const openModal = (clickedDate: Date) => {
    setDate(new Date(clickedDate)); // 새 Date 객체
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ✅ 거래내역 API 호출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("❌ 토큰 없음 → 로그인 페이지로 이동");
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const transactions = await getTransactions(); // ✅ API 호출
        console.log("✅ API 응답:", transactions);

        // ✅ 날짜별 그룹화
        const grouped = transactions.reduce((acc: any, t: any) => {
          const dateKey = t.transactionDate; // ex) "2025-07-30"
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push({
            id: t.id,
            type: t.type === "INCOME" ? "income" : "expense",
            amount: t.amount,
            description: t.memo || t.categoryDisplayName || "내역 없음",
          });
          return acc;
        }, {});

        setFinanceData(grouped);
      } catch (err) {
        console.error("❌ 데이터 불러오기 실패", err);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // ✅ 로딩 / 에러 처리
  if (loading) return <div>⏳ 데이터를 불러오는 중입니다...</div>;
  if (error) return <div>❌ {error}</div>;

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <TopButtonRow>
            <LabelBox $variant="outline">박땡땡님의 가계부</LabelBox>
            <StyledButton variant="primary" onClick={handleWriteClick}>
              가계부 작성하기
            </StyledButton>
          </TopButtonRow>

          <SummaryBox>
            <SummaryItem>
              <Title>이번 달 지출</Title>
              <Amount type="expense">1,234,567원</Amount> {/* ✅ 추후 계산 가능 */}
            </SummaryItem>
            <SummaryItem>
              <Title>이번 달 수입</Title>
              <Amount type="income">1,234,567원</Amount>
            </SummaryItem>
            <SummaryItem>
              <Title>예산</Title>
              <Amount type="budget">1,234,567원</Amount>
            </SummaryItem>
          </SummaryBox>

          <CalendarAndSchedule>
            <CalendarContainer>
              <h3 style={{ fontSize: '10px', fontWeight: 600, marginBottom: '12px', color: '#343a40' }}>
                <span style={{ color: '#00C48C' }}>○ 수입</span> &nbsp; <span style={{ color: '#FF5A5F' }}>○ 지출</span>
              </h3>
              <CalendarWrapper>
                <Calendar
                  key={(date as Date).toISOString()}
                  onChange={(value) => setDate(value as CalendarValue)}
                  value={date}
                  locale="ko-KR"
                  onClickDay={openModal}
                  tileContent={({ date, view }) => {
                    if (view !== 'month') return null;
                    const ymd = date.toLocaleDateString('sv-SE');
                    const transactions = financeData[ymd];
                    if (!transactions) return null;
                    return (
                      <div style={{ marginTop: 2 }}>
                        {transactions.map((t, idx) => (
                          <div key={idx} style={{ color: t.type === 'income' ? '#00C48C' : '#FF5A5F', fontSize: '0.7rem' }}>
                            {t.amount.toLocaleString()}원
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
              </CalendarWrapper>
            </CalendarContainer>

            <ScheduleBox>
              <h4>금융 일정</h4>
              <div className="schedule-content">
                <ul>
                  {Object.entries(financeData)
                    .filter(([dateStr]) => parseYMD(dateStr) >= new Date(new Date().setHours(0, 0, 0, 0)))
                    .sort(([a], [b]) => a.localeCompare(b))
                    .flatMap(([dateStr, entries]) =>
                      entries.map((entry, idx) => {
                        const dateObj = parseYMD(dateStr);
                        const day = dateObj.getDate();
                        const badgeColor = entry.type === 'income' ? '#00C48C' : '#FF5A5F';
                        const textColor = badgeColor;

                        return (
                          <li key={`${dateStr}-${idx}`} onClick={() => openModal(parseYMD(dateStr))} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              backgroundColor: badgeColor,
                              color: '#fff',
                              borderRadius: '999px',
                              padding: '2px 8px',
                              fontSize: '12px',
                              minWidth: '28px',
                              textAlign: 'center'
                            }}>
                              {day}일
                            </span>
                            <div style={{ fontSize: '14px', color: '#495057', flex: 1 }}>
                              <div style={{ fontWeight: 'bold', color: textColor }}>{entry.description}</div>
                              <div style={{ fontSize: '13px', color: '#868e96' }}>
                                {entry.amount.toLocaleString()}원 / {entry.type === 'income' ? '수입' : '지출'}
                              </div>
                            </div>
                          </li>
                        );
                      })
                    )}
                </ul>
              </div>
            </ScheduleBox>
          </CalendarAndSchedule>

          <CalendarModal
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedDate={selectedDate}
            transactions={financeData[selectedDate?.toLocaleDateString('sv-SE') || '']}
          />
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
};

export default Home;
