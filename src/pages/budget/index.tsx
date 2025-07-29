import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BudgetModal from "@/components/budget/BudgetModal";

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

const categories = [
  "식료품/외식",
  "주거/공과금",
  "교통/차량",
  "쇼핑/패션",
  "건강/의료",
  "교육/자기계발",
  "여가/문화",
  "금융/기타",
];

const initialBudgets: Record<string, number> = {
  "식료품/외식": 210000,
  "주거/공과금": 200000,
  "교통/차량": 100000,
  "쇼핑/패션": 150000,
  "건강/의료": 12000,
  "교육/자기계발": 50000,
  "여가/문화": 100000,
  "금융/기타": 30000,
};

const totalBudget = 600000;
const spentThisMonth = 400000;

export default function BudgetPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryBudgets, setCategoryBudgets] = useState(initialBudgets);

  const remaining = totalBudget - spentThisMonth;
  const remainingPercent = Math.round((remaining / totalBudget) * 100);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleBudgetChange = (category: string, newAmount: number) => {
    setCategoryBudgets((prev) => ({ ...prev, [category]: newAmount }));
  };

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <TopButtonRow>
            <LabelBox $variant="outline">박땡땡님의 가계부</LabelBox>
            <StyledButton variant="primary" onClick={() => setShowModal(true)}>
              예산 설정하기
            </StyledButton>
          </TopButtonRow>

          {/* 현재 달 예산 */}
          <BudgetBox>
            <BudgetTitle>6월 예산</BudgetTitle>
            <BudgetAmount>{remaining.toLocaleString()}원 남음</BudgetAmount>
            <ProgressBarWrapper>
              <ProgressBackground>
                <ProgressBar width={(spentThisMonth / totalBudget) * 100} />
              </ProgressBackground>
            </ProgressBarWrapper>
            <BudgetDetail>
              6월 설정 예산 {totalBudget.toLocaleString()}원 <br />
              남은 예산 {remaining.toLocaleString()}원
            </BudgetDetail>
            <SubText>
              이번 달 예산이 {remainingPercent}% 남았어요. 남은 3일 동안
              예산을 초과하지 않도록 힘내봐요!
            </SubText>
          </BudgetBox>

          {/* 이전 달 예산 */}
          <BudgetBox>
            <BudgetTitle>5월 예산</BudgetTitle>
            <BudgetAmount>200,000원 절약</BudgetAmount>
            <ProgressBarWrapper>
              <ProgressBackground>
                <ProgressBar width={66} color="#ff6b6b" />
              </ProgressBackground>
            </ProgressBarWrapper>
            <BudgetDetail>
              5월 설정 예산 600,000원 <br />
              초과 예산 0원
            </BudgetDetail>
            <SubText>
              지난 달에는 예산에서 33% 덜 사용하셨어요! 절약하는 모습이 멋져요!
            </SubText>
          </BudgetBox>

          <BudgetModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            categories={categories}
            categoryBudgets={categoryBudgets}
            onBudgetChange={handleBudgetChange}
          />
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
}
