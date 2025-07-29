import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Container, MainLayout, ContentWrapper, PageTitle, ChartCard, CenteredTextWrapper, SummaryText, Highlight, Suggestion, } from "./index.styles";
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
    const maxCategory = categoryData.reduce((prev, current) => prev.amount > current.amount ? prev : current);
    return (_jsxs(Container, { children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsxs(MainLayout, { children: [isSidebarOpen && _jsx(Sidebar, {}), _jsxs(ContentWrapper, { children: [_jsx(PageTitle, { children: "2025 6\uC6D4" }), _jsxs(ChartCard, { children: [_jsx("h2", { children: "\uCE74\uD14C\uACE0\uB9AC\uBCC4 \uBD84\uC11D" }), _jsx(CustomCategoryPieChart, { data: categoryData })] }), _jsxs(CenteredTextWrapper, { children: [_jsxs(SummaryText, { children: ["\uC774\uBC88 \uB2EC \uAC00\uC7A5 \uB9CE\uC774 \uC18C\uBE44\uD55C \uBD84\uC57C\uB294", " ", _jsxs(Highlight, { children: ["[", maxCategory.name, "]"] }), " \uC785\uB2C8\uB2E4."] }), _jsx(Suggestion, { children: "\uC798 \uBA39\uB294 \uAC83\uB3C4 \uC911\uC694\uD558\uC9C0\uB9CC, \uB2E4\uC74C \uB2EC\uC5D0\uB294 \uC870\uAE08 \uB354 \uD6A8\uC728\uC801\uC778 \uC2DD\uBE44 \uACC4\uD68D\uC744 \uC138\uC6CC\uBCFC\uAE4C\uC694?" })] })] })] })] }));
}
