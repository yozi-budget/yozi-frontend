import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { HeaderWrapper, ToggleButton, LogoText } from './styles/Header.styles';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <HeaderWrapper>
      <ToggleButton onClick={onToggleSidebar}>
        <FiMenu />
      </ToggleButton>
      <LogoText>YOZI</LogoText>
    </HeaderWrapper>
  );
};

export default Header;
