import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { LabelBox } from '@/components/common/LabelBox';
import CustomLineChart from '@/components/chart/CustomLineChart';
import CustomBarChart from '@/components/chart/CustomBarChart';

import {
  Container,
  MainLayout,
  ContentWrapper,
  TopTitle,
  GridWrapper,
  Column,
  RightColumn,
  Divider,
  Card,
  ChartTitle,
  Amount,
  ScoreBox,
  ScoreInfo,
  BarChartSection,
  FixedExpenseContainer,
  FixedExpenseList,
  FixedExpenseItem,
  FixedExpenseFooter,
  ScoreCircle,
  ScoreDesc,
  IconList,
  LineChartWrapper
} from './index.styles';

const MonthlyAnalysis: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // 예시용 더미 데이터
  const lineChartData = [
    { date: '1일', amount: 18000 },
    { date: '5일', amount: 21000 },
    { date: '10일', amount: 23000 },
    { date: '15일', amount: 25000 },
    { date: '20일', amount: 20000 },
    { date: '25일', amount: 28000 },
    { date: '30일', amount: 30000 },
  ];

  const barChartData = [
    { category: '식비', amount: 300000 },
    { category: '교통', amount: 120000 },
    { category: '쇼핑', amount: 100000 },
    { category: '문화', amount: 80000 },
  ];

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <TopTitle>2025 6월</TopTitle>
          <LabelBox $variant="outline">박땡땡님의 가계부</LabelBox>

          <GridWrapper>
            <Column>
              {/* 1. 총 지출 + 꺾은선 */}
              <Card>
                <LineChartWrapper>
                  <ChartTitle>6월 총 지출</ChartTitle>
                  <Amount type="expense">777,350 원</Amount>
                  <CustomLineChart data={lineChartData} />
                </LineChartWrapper>
              </Card>

              <div style={{ flexGrow: 1 }} />

              {/* 2. 고정 지출 */}
              <Card>
                <FixedExpenseContainer>
                  <ChartTitle>6월 지출 내역</ChartTitle>

                  <FixedExpenseList>
                    <FixedExpenseItem>
                      <span className="date">15일</span>
                      <span className="label">보험료</span>
                      <span className="amount">54,300</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">통신요금</span>
                      <span className="amount">49,000</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">유튜브 프리미엄</span>
                      <span className="amount">14,900</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">유튜브 프리미엄</span>
                      <span className="amount">14,900</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">유튜브 프리미엄</span>
                      <span className="amount">14,900</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">유튜브 프리미엄</span>
                      <span className="amount">14,900</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">유튜브 프리미엄</span>
                      <span className="amount">14,900</span>
                    </FixedExpenseItem>
                    <FixedExpenseItem>
                      <span className="date">25일</span>
                      <span className="label">유튜브 프리미엄</span>
                      <span className="amount">14,900</span>
                    </FixedExpenseItem>
          
                  </FixedExpenseList>

                  <FixedExpenseFooter>
                    <span className="total-label">총</span>
                    <span className="total-amount">118,200 원</span>
                  </FixedExpenseFooter>
                </FixedExpenseContainer>
              </Card>

            </Column>

            <RightColumn>
              {/* 3. 지출 분석 (막대그래프) */}
              <Card>
                <ChartTitle>6월 지출 분석</ChartTitle>
                <p>
                  이번 달에는 지난 달보다{' '}
                  <span style={{ color: '#228be6', fontWeight: 600 }}>200,000원</span> 더 사용하셨네요!
                </p>
                <BarChartSection>
                  <CustomBarChart/>
                </BarChartSection>
              </Card>

              <Divider />

              {/* 4. 소비 습관 점수 */}
              <Card>
                <ChartTitle>소비 습관 점수 (전월 기준)</ChartTitle>
                <ScoreBox>
                  <ScoreInfo>
                    <ScoreCircle>88 / 100</ScoreCircle>
                    <ScoreDesc>지난달보다 5점 상승했어요!</ScoreDesc>
                  </ScoreInfo>
                  <IconList>
                    <li>예산 내 소비를 잘 지켰어요!</li>
                    <li>전월보다 소비가 8% 줄었어요.</li>
                    <li>모든 항목에서 균형 있게 소비했어요!</li>
                    <li>22일 동안 소비를 기록했어요.</li>
                    <li>식비가 전체 소비의 52%를 차지했어요.</li>
                  </IconList>
                </ScoreBox>
              </Card>
            </RightColumn>
          </GridWrapper>
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
};

export default MonthlyAnalysis;
