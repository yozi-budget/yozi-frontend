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

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <MenuItem>로그아웃</MenuItem>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;
