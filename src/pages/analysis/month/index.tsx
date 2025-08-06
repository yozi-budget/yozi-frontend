import React, { useEffect, useState, useMemo } from "react";
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { LabelBox } from '@/components/common/LabelBox';
import CustomLineChart from '@/components/chart/CustomLineChart';
import CustomBarChart from '@/components/chart/CustomBarChart';

import { fetchMonthlyAnalysis } from "@/api/analysis";
import { MonthlyAnalysisResponse } from "@/types/analysis";
import { useUserStore } from '@/store/userStore';
import { useCategoryStore } from "@/store/categoryStore";

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

interface BarChartData {
  month: string;
  amount: number;
  days: number;
  isCurrent: boolean;
}

const MonthlyAnalysis: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const { categories, fetchCategories } = useCategoryStore();
  const nickname = useUserStore(state => state.nickname);
  const [monthlyData, setMonthlyData] = useState<MonthlyAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 카테고리 데이터 로드
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  // 월별 데이터 로드
  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        const data = await fetchMonthlyAnalysis();
        console.log("✅ 월별 분석 데이터:", data);
        setMonthlyData(data);
      } catch (err) {
        console.error("❌ 월별 분석 데이터 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    loadMonthlyData();
  }, []);

  // ✅ 꺾은선 차트 데이터 (같은 날짜 합산 + 오름차순 정렬)
  const lineChartData = useMemo(() => {
    if (!monthlyData?.transactions) return [];

    const aggregated: Record<string, number> = {};

    // 같은 날짜 금액 합산
    monthlyData.transactions.forEach((t) => {
      const dateKey = `${new Date(t.date).getDate()}일`;
      aggregated[dateKey] = (aggregated[dateKey] || 0) + t.amount;
    });

    // 날짜 기준 오름차순 정렬
    return Object.entries(aggregated)
      .map(([date, amount]) => ({
        date,
        amount,
      }))
      .sort((a, b) => {
        const dayA = parseInt(a.date.replace('일', ''), 10);
        const dayB = parseInt(b.date.replace('일', ''), 10);
        return dayA - dayB;
      });
  }, [monthlyData]);

  // 막대 차트 데이터 변환 (이번달, 전달, 전전달)
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const getMonthLabel = (offset: number) => {
    let month = currentMonth + offset;
    if (month <= 0) month += 12;
    return `${month}월`;
  };

  // 특정 연도와 월의 일수 계산 함수
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const barChartData: BarChartData[] = monthlyData
    ? [
        {
          month: getMonthLabel(-2),
          amount: monthlyData.twoMonthsAgoTotal,
          days: getDaysInMonth(now.getFullYear(), currentMonth - 2 <= 0 ? currentMonth - 2 + 12 : currentMonth - 2),
          isCurrent: false,
        },
        {
          month: getMonthLabel(-1),
          amount: monthlyData.previousMonthTotal,
          days: getDaysInMonth(now.getFullYear(), currentMonth - 1 <= 0 ? currentMonth - 1 + 12 : currentMonth - 1),
          isCurrent: false,
        },
        {
          month: getMonthLabel(0),
          amount: monthlyData.currentMonthTotal,
          days: getDaysInMonth(now.getFullYear(), currentMonth),
          isCurrent: true,
        },
      ]
    : [];

  // 지출 내역 리스트 (최신순 정렬)
  const transactionList = useMemo(() => {
    return (monthlyData?.transactions || [])
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [monthlyData]);

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <TopTitle>{getMonthLabel(0)}</TopTitle>
          <LabelBox>{nickname ? `${nickname}님의 가계부` : '가계부'}</LabelBox>

          {loading ? (
            <p>데이터 불러오는 중...</p>
          ) : (
            <GridWrapper>
              <Column>
                {/* 1. 총 지출 + 꺾은선 */}
                <Card>
                  <LineChartWrapper>
                    <ChartTitle>{getMonthLabel(0)} 총 지출</ChartTitle>
                    <Amount type="expense">
                      {monthlyData?.currentMonthTotal.toLocaleString()} 원
                    </Amount>
                    <CustomLineChart data={lineChartData} />
                  </LineChartWrapper>
                </Card>

                <div style={{ flexGrow: 1 }} />

                {/* 2. 지출 내역 */}
                <Card>
                  <FixedExpenseContainer>
                    <ChartTitle>{getMonthLabel(0)} 지출 내역</ChartTitle>
                    <FixedExpenseList>
                      {transactionList.map((item, index) => (
                        <FixedExpenseItem key={index}>
                          <span className="date">
                            {new Date(item.date).getDate()}일
                          </span>
                          <span className="label">{item.vendor}</span>
                          <span className="amount">
                            {item.amount.toLocaleString()}
                          </span>
                        </FixedExpenseItem>
                      ))}
                    </FixedExpenseList>
                    <FixedExpenseFooter>
                      <span className="total-label">총</span>
                      <span className="total-amount">
                        {monthlyData?.currentMonthTotal.toLocaleString()} 원
                      </span>
                    </FixedExpenseFooter>
                  </FixedExpenseContainer>
                </Card>
              </Column>

              <RightColumn>
                {/* 3. 지출 분석 (막대그래프) */}
                <Card>
                  <ChartTitle>{getMonthLabel(0)} 지출 분석</ChartTitle>
                  <p>
                    이번 달에는 지난 달보다{" "}
                    <span style={{ color: '#228be6', fontWeight: 600 }}>
                      {(monthlyData?.currentMonthTotal || 0) -
                        (monthlyData?.previousMonthTotal || 0)}원
                    </span>{" "}
                    더 사용하셨네요!
                  </p>
                  <BarChartSection>
                    <CustomBarChart data={barChartData} />
                  </BarChartSection>
                </Card>

                <Divider />

                {/* 4. 소비 습관 점수 */}
                <Card>
                  <ChartTitle>소비 습관 점수 (전월 기준)</ChartTitle>
                  <ScoreBox>
                    <ScoreInfo>
                      <ScoreCircle>
                        {monthlyData?.habitScore ?? 0} / 100
                      </ScoreCircle>
                      <ScoreDesc>
                        {(monthlyData?.habitScoreChange ?? 0) > 0
                          ? `지난달보다 ${monthlyData?.habitScoreChange ?? 0}점 상승했어요!`
                          : `지난달보다 ${Math.abs(
                              monthlyData?.habitScoreChange ?? 0
                            )}점 하락했어요.`}
                      </ScoreDesc>
                    </ScoreInfo>
                    <IconList>
                      {monthlyData?.habitFeedbackMessages.map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </IconList>
                  </ScoreBox>
                </Card>
              </RightColumn>
            </GridWrapper>
          )}
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
};

export default MonthlyAnalysis;
