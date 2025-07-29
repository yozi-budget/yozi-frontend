import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import {
  Container,
  MainLayout,
  ContentWrapper,
  PageTitle,
  ChartCard,
  CenteredTextWrapper, 
  SummaryText,
  Highlight,
  Suggestion,
} from "./index.styles";
import CustomCategoryPieChart from "@/components/chart/CustomCategoryPieChart";

const categoryData = [
  { name: "식료품/외식", amount: 210000, color: "#4A90E2" },
  { name: "주거/공과금", amount: 200000, color: "#50E3C2" },
  { name: "교통/차량", amount: 100000, color: "#F5A623" },
  { name: "쇼핑/패션", amount: 150000, color: "#D0021B" },
  { name: "건강/의료", amount: 12000, color: "#7ED321" },
  { name: "교육/자기계발", amount: 50000, color: "#9013FE" },
  { name: "여가/문화", amount: 100000, color: "#BD10E0" },
  { name: "금융/기타", amount: 30000, color: "#9B9B9B" },
];

export default function CategoryAnalysisPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const maxCategory = categoryData.reduce((prev, current) =>
    prev.amount > current.amount ? prev : current
  );

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <PageTitle>2025 6월</PageTitle>

          {/* ✅ ChartCard는 그래프만 */}
          <ChartCard>
            <h2>카테고리별 분석</h2>
            <CustomCategoryPieChart data={categoryData} />
          </ChartCard>

          {/* ✅ SummaryText + Highlight + Suggestion 묶어서 중앙 정렬 */}
          <CenteredTextWrapper>
            <SummaryText>
              이번 달 가장 많이 소비한 분야는{" "}
              <Highlight>[{maxCategory.name}]</Highlight> 입니다.
            </SummaryText>
            <Suggestion>
              잘 먹는 것도 중요하지만, 다음 달에는 조금 더 효율적인 식비 계획을
              세워볼까요?
            </Suggestion>
          </CenteredTextWrapper>
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
}
