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
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SocialLoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ledger/write" element={<LedgerWritePage />} />
        <Route path="/ledger/read" element={<LedgerReadPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/analysis/month" element={<MonthlyAnalysisPage />} /> {/* ✅ 분석 경로 추가 */}
        <Route path="/analysis/category" element={<CategoryAnalysisPage />} /> {/* ✅ 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
