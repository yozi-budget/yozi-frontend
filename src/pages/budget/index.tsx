import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BudgetModal from "@/components/budget/BudgetModal";
import { fetchBudgetSummary, getMonthlyBudget, updateMonthlyBudget } from '@/api/budget';
import { BudgetSummary, CategoryBudget } from '@/types/budget';

import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from '@/store/userStore';

import {
  Container,
  MainLayout,
  ContentWrapper,
  TopButtonRow,
  BudgetBox,
  BudgetTitle,
  BudgetAmount,
  ProgressBarWrapper,
  ProgressBar,
  ProgressBackground,
  SubText,
  BudgetDetail,
} from "./index.styles";
import { LabelBox } from "@/components/common/LabelBox";
import StyledButton from "@/components/common/StyledButton";

function getMonthLabels() {
  const now = new Date();
  const thisMonth = `${now.getMonth() + 1}월`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = `${lastMonthDate.getMonth() + 1}월`;
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - now.getDate();
  const isLastDay = daysLeft === 0;
  return { thisMonth, lastMonth, daysLeft, isLastDay };
}

export default function BudgetPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState<BudgetSummary | null>(null);
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const { thisMonth, lastMonth, daysLeft, isLastDay } = getMonthLabels();
  const categories = useCategoryStore(state => state.categories);
  const nickname = useUserStore(state => state.nickname);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.displayName : '알 수 없음';
  };

  const loadBudgets = async () => {
    setLoading(true);
    try {
      const [summaryData, categoryBudgetData] = await Promise.all([
        fetchBudgetSummary(),
        getMonthlyBudget(),
      ]);
      setSummary(summaryData);
      setCategoryBudgets(categoryBudgetData);
    } catch (error) {
      console.error('예산 데이터를 불러오는 데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);


  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <TopButtonRow>
            <LabelBox>{nickname ? `${nickname}님의 가계부` : '가계부'}</LabelBox>
            <StyledButton variant="primary" onClick={() => setShowModal(true)}>
              예산 설정하기
            </StyledButton>
          </TopButtonRow>

          {/* 현재 달 예산 */}
          {summary && (
            <BudgetBox>
              <BudgetTitle>{thisMonth} 예산</BudgetTitle>
              <BudgetAmount>
                {summary.remaining === 0
                  ? summary.exceeded > 0
                    ? `예산 초과 ${summary.exceeded.toLocaleString()}원`
                    : `예산 모두 사용`
                  : `${summary.remaining.toLocaleString()}원 남음`}
              </BudgetAmount>
              <ProgressBarWrapper>
                <ProgressBackground>
                  <ProgressBar
                    width={(summary.spent / summary.total) * 100}
                    color={summary.exceeded > 0 ? '#ff6b6b' : '#339af0'}
                  />
                </ProgressBackground>
              </ProgressBarWrapper>
              <BudgetDetail>
                설정 예산 {summary.total.toLocaleString()}원 <br />
                {summary.exceeded > 0
                  ? `초과 예산 ${summary.exceeded.toLocaleString()}원`
                  : `남은 예산 ${summary.remaining.toLocaleString()}원`}
              </BudgetDetail>
              <SubText>
                {summary.remaining === 0 && summary.exceeded === 0 && (
                  isLastDay
                    ? '이번 달 예산을 딱 맞게 모두 사용했어요! 계획적인 소비 멋져요 👏'
                    : `이번 달 예산을 모두 사용했어요. 아직 ${daysLeft}일 남았으니, 초과하지 않도록 주의해요 ⚠️`
                )}
                {summary.remaining === 0 && summary.exceeded > 0 &&
                  `이번 달 예산을 ${summary.exceeded.toLocaleString()}원 초과했어요. 다음 달엔 조금만 더 신중하게!`}
                {summary.remaining > 0 && summary.exceeded === 0 &&
                  `이번 달 예산이 ${summary.remaining.toLocaleString()}원 남았어요. 남은 ${daysLeft}일 동안 알뜰하게 써봐요!`}
              </SubText>
            </BudgetBox>
          )}

          {/* 이전 달 예산 */}
          {summary && (
            <BudgetBox>
              <BudgetTitle>{lastMonth}</BudgetTitle>
              <BudgetAmount>
                {summary.prevRemaining === 0
                  ? summary.prevExceeded > 0
                    ? `예산 초과 ${summary.prevExceeded.toLocaleString()}원`
                    : `예산 모두 사용`
                  : `${summary.prevRemaining.toLocaleString()}원 절약`}
              </BudgetAmount>
              <ProgressBarWrapper>
                <ProgressBackground>
                  <ProgressBar
                    width={(summary.prevSpent / summary.prevTotal) * 100}
                    color={summary.prevExceeded > 0 ? '#ff6b6b' : '#339af0'}
                  />
                </ProgressBackground>
              </ProgressBarWrapper>
              <BudgetDetail>
                설정 예산 {summary.prevTotal.toLocaleString()}원 <br />
                {summary.prevExceeded > 0
                  ? `초과 예산 ${summary.prevExceeded.toLocaleString()}원`
                  : `남은 예산 ${summary.prevRemaining.toLocaleString()}원`}
              </BudgetDetail>
              <SubText>
                {summary.prevRemaining === 0 && summary.prevExceeded === 0 &&
                  '지난 달 예산을 정확하게 사용했어요. 완벽한 소비 계획이었어요!'}
                {summary.prevRemaining === 0 && summary.prevExceeded > 0 &&
                  `지난 달 예산을 ${summary.prevExceeded.toLocaleString()}원 초과했어요. 소비를 조금 줄여보는 건 어때요?`}
                {summary.prevRemaining > 0 && summary.prevExceeded === 0 &&
                  `지난 달에는 ${summary.prevRemaining.toLocaleString()}원 절약하셨어요! 알뜰한 소비 최고예요 💰`}
              </SubText>
            </BudgetBox>
          )}

          <BudgetModal
            isOpen={showModal}
            onClose={async () => {
              setShowModal(false);
              await loadBudgets(); // 모달 닫힐 때 예산 다시 불러오기
            }}
            categories={categories}             
          />
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
}
