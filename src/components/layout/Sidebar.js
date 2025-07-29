import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarContainer, MenuGroup, MenuItem, SubMenuItem, MenuLabel, BottomSection, } from './styles/Sidebar.styles';
import { useNavigate, useLocation } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (_jsxs(SidebarContainer, { children: [_jsxs(MenuGroup, { children: [_jsx(MenuItem, { onClick: () => navigate('/home'), "$active": location.pathname === '/home', children: "\uBA54\uC778" }), _jsx(MenuLabel, { children: "\uAC00\uACC4\uBD80" }), _jsx(SubMenuItem, { onClick: () => navigate('/ledger/write'), "$active": location.pathname === '/ledger/write', children: "\uC791\uC131" }), _jsx(SubMenuItem, { onClick: () => navigate('/ledger/read'), "$active": location.pathname === '/ledger/read', children: "\uB0B4\uC5ED" }), _jsx(MenuLabel, { children: "\uC608\uC0B0" }), _jsx(SubMenuItem, { onClick: () => navigate('/budget'), "$active": location.pathname === '/budget', children: "\uB0B4\uC5ED" }), _jsx(MenuLabel, { children: "\uBD84\uC11D" }), _jsx(SubMenuItem, { onClick: () => navigate('/analysis/month'), "$active": location.pathname === '/analysis/month', children: "\uC6D4\uBCC4 \uBD84\uC11D" }), _jsx(SubMenuItem, { onClick: () => navigate('/analysis/category'), "$active": location.pathname === '/analysis/category', children: "\uCE74\uD14C\uACE0\uB9AC\uBCC4 \uBD84\uC11D" })] }), _jsx(BottomSection, { children: _jsx(MenuItem, { children: "\uB85C\uADF8\uC544\uC6C3" }) })] }));
};
export default Sidebar;
