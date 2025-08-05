import React from 'react';
import {
  SidebarContainer,
  MenuGroup,
  MenuItem,
  SubMenuItem,
  MenuLabel,
  BottomSection,
} from './styles/Sidebar.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutApi } from '@/api/authApi';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // 1️. 로컬 스토리지 토큰 제거 (키명 통일)
      localStorage.removeItem("accessToken");

      // 2️. 로그아웃 API 호출
      await logoutApi();
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
    } finally {
      // 3️. 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    }
  };

  return (
    <SidebarContainer>
      <MenuGroup>
        <MenuItem
          onClick={() => navigate('/home')}
          $active={location.pathname === '/home'}
        >
          메인
        </MenuItem>

        <MenuLabel>가계부</MenuLabel>
        <SubMenuItem
          onClick={() => navigate('/ledger/write')}
          $active={location.pathname === '/ledger/write'}
        >
          작성
        </SubMenuItem>
        <SubMenuItem
          onClick={() => navigate('/ledger/read')}
          $active={location.pathname === '/ledger/read'}
        >
          내역
        </SubMenuItem>

        <MenuLabel>예산</MenuLabel>
        <SubMenuItem
          onClick={() => navigate('/budget')}
          $active={location.pathname === '/budget'}
        >
          내역
        </SubMenuItem>

        <MenuLabel>분석</MenuLabel>
        <SubMenuItem
          onClick={() => navigate('/analysis/month')}
          $active={location.pathname === '/analysis/month'}
        >
          월별 분석
        </SubMenuItem>
        <SubMenuItem
          onClick={() => navigate('/analysis/category')}
          $active={location.pathname === '/analysis/category'}
        >
          카테고리별 분석
        </SubMenuItem>
      </MenuGroup>

      <BottomSection>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;
