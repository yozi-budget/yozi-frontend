import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialLoginPage from './pages/socialLogin';
import HomePage from './pages/home';
import LedgerWritePage from './pages/ledger/write';
import LedgerReadPage from './pages/ledger/read';
import BudgetPage from './pages/budget';
import MonthlyAnalysisPage from './pages/analysis/month'; 
import CategoryAnalysisPage from './pages/analysis/category'; 
import KakaoRedirectPage from './pages/auth/KakaoRedirectPage';    
import GoogleRedirectPage from './pages/auth/GoogleRedirectPage';  
import AuthSuccessPage from './pages/auth/success';

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
        <Route path="/analysis/month" element={<MonthlyAnalysisPage />} /> 
        <Route path="/analysis/category" element={<CategoryAnalysisPage />} /> 

  
        {/* OAuth Redirect 콜백 경로 */}
        <Route path="/auth/kakao/callback" element={<KakaoRedirectPage />} />
        <Route path="/auth/google/callback" element={<GoogleRedirectPage />} />
        <Route path="/auth/success" element={<AuthSuccessPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
