import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialLoginPage from './pages/socialLogin';
import HomePage from './pages/home';
import LedgerWritePage from './pages/ledger/write';
import LedgerReadPage from './pages/ledger/read';
import BudgetPage from './pages/budget';
import MonthlyAnalysisPage from './pages/analysis/month'; // ✅ 이 경로로 수정
import CategoryAnalysisPage from './pages/analysis/category'; // ✅ 카테고리 분석
import GlobalStyle from './styles/GlobalStyle';
function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(GlobalStyle, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(SocialLoginPage, {}) }), _jsx(Route, { path: "/home", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/ledger/write", element: _jsx(LedgerWritePage, {}) }), _jsx(Route, { path: "/ledger/read", element: _jsx(LedgerReadPage, {}) }), _jsx(Route, { path: "/budget", element: _jsx(BudgetPage, {}) }), _jsx(Route, { path: "/analysis/month", element: _jsx(MonthlyAnalysisPage, {}) }), " ", _jsx(Route, { path: "/analysis/category", element: _jsx(CategoryAnalysisPage, {}) }), " "] })] }));
}
export default App;
