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
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // 현재 월 표시
  const now = new Date();
  const currentMonthLabel = `${now.getFullYear()} ${now.getMonth() + 1}월`;

  // 카테고리 목록 로드
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
        console.log("✅ API 응답:", data);

        // feedbackMessage 저장
        setFeedbackMessage(data.feedbackMessage || "");

        // 데이터 배열 사용
        const list = data.spendingByCategory || (data as any).categorySpendingList;
        if (!list) return;

        const transformed = list.map((item) => {
          const category = categories.find(
            (cat) => Number(cat.id) === Number(item.categoryId)
          );
          return {
            name: category ? category.displayName : `카테고리(${item.categoryId})`,
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

  // feedbackMessage 포맷팅 (콤마 → 줄바꿈)
  const formattedFeedback = feedbackMessage
    ? feedbackMessage
        .split(",")
        .map((msg) => msg.trim())
        .filter((msg) => msg.length > 0)
    : [];

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <MainLayout>
        {isSidebarOpen && <Sidebar />}
        <ContentWrapper>
          {/* 현재 월 자동 반영 */}
          <PageTitle>{currentMonthLabel}</PageTitle>

          <ChartCard>
            <h2>카테고리별 분석</h2>
            {loading ? (
              <p>데이터 불러오는 중...</p>
            ) : (
              <CustomCategoryPieChart data={categoryData} />
            )}
          </ChartCard>

          <CenteredTextWrapper>
            {loading ? (
              <SummaryText>데이터 불러오는 중...</SummaryText>
            ) : formattedFeedback.length > 0 ? (
              <SummaryText>
                {formattedFeedback.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </SummaryText>
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
