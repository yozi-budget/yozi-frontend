import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { LabelBox } from '@/components/common/LabelBox';
import { useNavigate } from 'react-router-dom';
import CalendarModal from '@/components/home/CalendarModal';


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
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate('/ledger/write');
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const openModal = (clickedDate: Date) => {
  setDate(new Date(clickedDate));  // 새 Date 객체
  setSelectedDate(clickedDate);
  setIsModalOpen(true);
};

  const closeModal = () => setIsModalOpen(false);

  const [financeData, setFinanceData] = useState<FinanceData>({
    '2025-07-03': [
      { id: '1', type: 'income', amount: 2125000, description: '월급' },
      { id: '2', type: 'expense', amount: 10000, description: '커피' },
    ],
    '2025-07-25': [
      { id: '3', type: 'expense', amount: 10000, description: '넷플릭스 구독' },
    ],
    '2025-08-10': [
      {id: '4', type: 'expense', amount: 300000, description: '축의금'}
    ]
  });

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
              <Amount type="expense">1,234,567원</Amount>
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
                            <span style={{ backgroundColor: badgeColor, color: '#fff', borderRadius: '999px', padding: '2px 8px', fontSize: '12px', minWidth: '28px', textAlign: 'center' }}>
                              {day}일
                            </span>
                            <div style={{ fontSize: '14px', color: '#495057', flex: 1 }}>
                              <div style={{ fontWeight: 'bold', color: textColor }}>{entry.description}</div>
                              <div style={{ fontSize: '13px', color: '#868e96' }}>{entry.amount.toLocaleString()}원 / {entry.type === 'income' ? '수입' : '지출'}</div>
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
