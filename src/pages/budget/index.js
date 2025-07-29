import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BudgetModal from "@/components/budget/BudgetModal";
import { Container, MainLayout, ContentWrapper, TopButtonRow, BudgetBox, BudgetTitle, BudgetAmount, ProgressBarWrapper, ProgressBar, ProgressBackground, SubText, BudgetDetail, } from "./index.styles";
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
const initialBudgets = {
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
    const handleBudgetChange = (category, newAmount) => {
        setCategoryBudgets((prev) => ({ ...prev, [category]: newAmount }));
    };
    return (_jsxs(Container, { children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsxs(MainLayout, { children: [isSidebarOpen && _jsx(Sidebar, {}), _jsxs(ContentWrapper, { children: [_jsxs(TopButtonRow, { children: [_jsx(LabelBox, { "$variant": "outline", children: "\uBC15\uB561\uB561\uB2D8\uC758 \uAC00\uACC4\uBD80" }), _jsx(StyledButton, { variant: "primary", onClick: () => setShowModal(true), children: "\uC608\uC0B0 \uC124\uC815\uD558\uAE30" })] }), _jsxs(BudgetBox, { children: [_jsx(BudgetTitle, { children: "6\uC6D4 \uC608\uC0B0" }), _jsxs(BudgetAmount, { children: [remaining.toLocaleString(), "\uC6D0 \uB0A8\uC74C"] }), _jsx(ProgressBarWrapper, { children: _jsx(ProgressBackground, { children: _jsx(ProgressBar, { width: (spentThisMonth / totalBudget) * 100 }) }) }), _jsxs(BudgetDetail, { children: ["6\uC6D4 \uC124\uC815 \uC608\uC0B0 ", totalBudget.toLocaleString(), "\uC6D0 ", _jsx("br", {}), "\uB0A8\uC740 \uC608\uC0B0 ", remaining.toLocaleString(), "\uC6D0"] }), _jsxs(SubText, { children: ["\uC774\uBC88 \uB2EC \uC608\uC0B0\uC774 ", remainingPercent, "% \uB0A8\uC558\uC5B4\uC694. \uB0A8\uC740 3\uC77C \uB3D9\uC548 \uC608\uC0B0\uC744 \uCD08\uACFC\uD558\uC9C0 \uC54A\uB3C4\uB85D \uD798\uB0B4\uBD10\uC694!"] })] }), _jsxs(BudgetBox, { children: [_jsx(BudgetTitle, { children: "5\uC6D4 \uC608\uC0B0" }), _jsx(BudgetAmount, { children: "200,000\uC6D0 \uC808\uC57D" }), _jsx(ProgressBarWrapper, { children: _jsx(ProgressBackground, { children: _jsx(ProgressBar, { width: 66, color: "#ff6b6b" }) }) }), _jsxs(BudgetDetail, { children: ["5\uC6D4 \uC124\uC815 \uC608\uC0B0 600,000\uC6D0 ", _jsx("br", {}), "\uCD08\uACFC \uC608\uC0B0 0\uC6D0"] }), _jsx(SubText, { children: "\uC9C0\uB09C \uB2EC\uC5D0\uB294 \uC608\uC0B0\uC5D0\uC11C 33% \uB35C \uC0AC\uC6A9\uD558\uC168\uC5B4\uC694! \uC808\uC57D\uD558\uB294 \uBAA8\uC2B5\uC774 \uBA4B\uC838\uC694!" })] }), _jsx(BudgetModal, { isOpen: showModal, onClose: () => setShowModal(false), categories: categories, categoryBudgets: categoryBudgets, onBudgetChange: handleBudgetChange })] })] })] }));
}
