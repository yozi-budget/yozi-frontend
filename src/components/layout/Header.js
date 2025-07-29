import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FiMenu } from 'react-icons/fi';
import { HeaderWrapper, ToggleButton, LogoText } from './styles/Header.styles';
const Header = ({ onToggleSidebar }) => {
    return (_jsxs(HeaderWrapper, { children: [_jsx(ToggleButton, { onClick: onToggleSidebar, children: _jsx(FiMenu, {}) }), _jsx(LogoText, { children: "YOZI" })] }));
};
export default Header;
