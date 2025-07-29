import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// pages/analysis/month/index.tsx
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { LabelBox } from '@/components/common/LabelBox';
import CustomLineChart from '@/components/chart/CustomLineChart';
import CustomBarChart from '@/components/chart/CustomBarChart';
import { Container, MainLayout, ContentWrapper, TopTitle, GridWrapper, Column, RightColumn, Divider, Card, ChartTitle, Amount, ScoreBox, ScoreInfo, BarChartSection, FixedExpenseContainer, FixedExpenseList, FixedExpenseItem, FixedExpenseFooter, ScoreCircle, ScoreDesc, IconList, LineChartWrapper } from './index.styles';
const MonthlyAnalysis = () => {
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
    return (_jsxs(Container, { children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsxs(MainLayout, { children: [isSidebarOpen && _jsx(Sidebar, {}), _jsxs(ContentWrapper, { children: [_jsx(TopTitle, { children: "2025 6\uC6D4" }), _jsx(LabelBox, { "$variant": "outline", children: "\uBC15\uB561\uB561\uB2D8\uC758 \uAC00\uACC4\uBD80" }), _jsxs(GridWrapper, { children: [_jsxs(Column, { children: [_jsx(Card, { children: _jsxs(LineChartWrapper, { children: [_jsx(ChartTitle, { children: "6\uC6D4 \uCD1D \uC9C0\uCD9C" }), _jsx(Amount, { type: "expense", children: "777,350 \uC6D0" }), _jsx(CustomLineChart, { data: lineChartData })] }) }), _jsx("div", { style: { flexGrow: 1 } }), _jsx(Card, { children: _jsxs(FixedExpenseContainer, { children: [_jsx(ChartTitle, { children: "6\uC6D4 \uACE0\uC815\uC9C0\uCD9C" }), _jsxs(FixedExpenseList, { children: [_jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "15\uC77C" }), _jsx("span", { className: "label", children: "\uBCF4\uD5D8\uB8CC" }), _jsx("span", { className: "amount", children: "54,300" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uD1B5\uC2E0\uC694\uAE08" }), _jsx("span", { className: "amount", children: "49,000" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uC720\uD29C\uBE0C \uD504\uB9AC\uBBF8\uC5C4" }), _jsx("span", { className: "amount", children: "14,900" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uC720\uD29C\uBE0C \uD504\uB9AC\uBBF8\uC5C4" }), _jsx("span", { className: "amount", children: "14,900" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uC720\uD29C\uBE0C \uD504\uB9AC\uBBF8\uC5C4" }), _jsx("span", { className: "amount", children: "14,900" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uC720\uD29C\uBE0C \uD504\uB9AC\uBBF8\uC5C4" }), _jsx("span", { className: "amount", children: "14,900" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uC720\uD29C\uBE0C \uD504\uB9AC\uBBF8\uC5C4" }), _jsx("span", { className: "amount", children: "14,900" })] }), _jsxs(FixedExpenseItem, { children: [_jsx("span", { className: "date", children: "25\uC77C" }), _jsx("span", { className: "label", children: "\uC720\uD29C\uBE0C \uD504\uB9AC\uBBF8\uC5C4" }), _jsx("span", { className: "amount", children: "14,900" })] })] }), _jsxs(FixedExpenseFooter, { children: [_jsx("span", { className: "total-label", children: "\uCD1D" }), _jsx("span", { className: "total-amount", children: "118,200 \uC6D0" })] })] }) })] }), _jsxs(RightColumn, { children: [_jsxs(Card, { children: [_jsx(ChartTitle, { children: "6\uC6D4 \uC9C0\uCD9C \uBD84\uC11D" }), _jsxs("p", { children: ["\uC774\uBC88 \uB2EC\uC5D0\uB294 \uC9C0\uB09C \uB2EC\uBCF4\uB2E4", ' ', _jsx("span", { style: { color: '#228be6', fontWeight: 600 }, children: "200,000\uC6D0" }), " \uB354 \uC0AC\uC6A9\uD558\uC168\uB124\uC694!"] }), _jsx(BarChartSection, { children: _jsx(CustomBarChart, {}) })] }), _jsx(Divider, {}), _jsxs(Card, { children: [_jsx(ChartTitle, { children: "\uC18C\uBE44 \uC2B5\uAD00 \uC810\uC218 (\uC804\uC6D4 \uAE30\uC900)" }), _jsxs(ScoreBox, { children: [_jsxs(ScoreInfo, { children: [_jsx(ScoreCircle, { children: "88 / 100" }), _jsx(ScoreDesc, { children: "\uC9C0\uB09C\uB2EC\uBCF4\uB2E4 5\uC810 \uC0C1\uC2B9\uD588\uC5B4\uC694!" })] }), _jsxs(IconList, { children: [_jsx("li", { children: "\uC608\uC0B0 \uB0B4 \uC18C\uBE44\uB97C \uC798 \uC9C0\uCF30\uC5B4\uC694!" }), _jsx("li", { children: "\uC804\uC6D4\uBCF4\uB2E4 \uC18C\uBE44\uAC00 8% \uC904\uC5C8\uC5B4\uC694." }), _jsx("li", { children: "\uBAA8\uB4E0 \uD56D\uBAA9\uC5D0\uC11C \uADE0\uD615 \uC788\uAC8C \uC18C\uBE44\uD588\uC5B4\uC694!" }), _jsx("li", { children: "22\uC77C \uB3D9\uC548 \uC18C\uBE44\uB97C \uAE30\uB85D\uD588\uC5B4\uC694." }), _jsx("li", { children: "\uC2DD\uBE44\uAC00 \uC804\uCCB4 \uC18C\uBE44\uC758 52%\uB97C \uCC28\uC9C0\uD588\uC5B4\uC694." })] })] })] })] })] })] })] })] }));
};
export default MonthlyAnalysis;
