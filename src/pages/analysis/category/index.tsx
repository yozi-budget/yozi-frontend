import React, { useEffect, useState } from "react";
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
import { useCategoryStore } from "@/store/categoryStore";

import { fetchCategoryAnalysis } from "@/api/analysis";
import { CategoryAnalysisResult } from "@/types/analysis";

export default function CategoryAnalysisPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { categories, fetchCategories } = useCategoryStore();
  const [categoryData, setCategoryData] = useState<
    { name: string; amount: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // 카테고리 목록 먼저 로드
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  // API 데이터 로드
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const data: CategoryAnalysisResult = await fetchCategoryAnalysis();
        // spendingByCategory 배열 사용
        const transformed = data.spendingByCategory.map((item) => {
          const category = categories.find((cat) => cat.id === item.categoryId);
          return {
            name: category ? category.displayName : "알 수 없음",
            amount: item.totalSpentAmount,
            color: generateColor(item.categoryId),
          };
        });

        setCategoryData(transformed);
      } catch (err) {
        console.error("카테고리별 데이터 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      loadCategoryData();
    }
  }, [categories]);

  const maxCategory =
    categoryData.length > 0
      ? categoryData.reduce((prev, curr) =>
          curr.amount > prev.amount ? curr : prev
        )
      : { name: "", amount: 0, color: "" };

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          <PageTitle>2025 6월</PageTitle>

          <ChartCard>
            <h2>카테고리별 분석</h2>
            {loading ? (
              <p>데이터 불러오는 중...</p>
            ) : (
              <CustomCategoryPieChart data={categoryData} />
            )}
          </ChartCard>

          <CenteredTextWrapper>
            {maxCategory.name ? (
              <>
                <SummaryText>
                  이번 달 가장 많이 소비한 분야는{" "}
                  <Highlight>[{maxCategory.name}]</Highlight> 입니다.
                </SummaryText>
                <Suggestion>
                  해당 항목에 대해 다음 달 예산 계획을 세워보세요!
                </Suggestion>
              </>
            ) : (
              <SummaryText>카테고리별 데이터가 없습니다.</SummaryText>
            )}
          </CenteredTextWrapper>
        </ContentWrapper>
      </MainLayout>
    </Container>
  );
}

const generateColor = (id: number) => {
  const colors = [
    "#4A90E2",
    "#50E3C2",
    "#F5A623",
    "#D0021B",
    "#7ED321",
    "#9013FE",
    "#BD10E0",
    "#9B9B9B",
  ];
  return colors[id % colors.length];
};
