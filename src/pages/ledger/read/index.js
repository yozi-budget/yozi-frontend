import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StyledButton from '@/components/common/StyledButton';
import LabelBox from '@/components/common/LabelBox';
import EditLedgerModal from '@/components/ledger/EditLedgerModal';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, TopControls, SelectBox, Table, TableHeader, TableRow, TableCell, ActionWrapper, Badge, ActionText, Pagination, } from './index.styles';
const mockData = [
    {
        id: 1,
        type: '지출',
        date: '2025.06.29 (일)',
        category: '식사',
        method: '카드',
        place: '씨유',
        amount: '11,000',
        memo: '맥주 4캔'
    },
    {
        id: 2,
        type: '수입',
        date: '2025.06.28 (토)',
        category: '기타',
        method: '현금',
        place: '알바비',
        amount: '770,000',
        memo: '대타 포함'
    },
    {
        id: 3,
        type: '수입',
        date: '2025.09.15 (화)',
        category: '기타',
        method: '현금',
        place: '알바비',
        amount: '770,000',
        memo: '대타 포함'
    },
    // 필요한 만큼 데이터 추가
];
const isFutureDate = (dateStr) => {
    const today = new Date();
    const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
    const itemDate = new Date(year, month - 1, day);
    return itemDate > today;
};
const LedgerReadPage = () => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const [periodFilter, setPeriodFilter] = useState('전체 내역 보기');
    const [categoryFilter, setCategoryFilter] = useState('카테고리 전체보기');
    const navigate = useNavigate();
    const handleWriteClick = () => {
        navigate('/ledger/write');
    };
    // handleEditClick를 컴포넌트 내부에 정의
    const handleEditClick = (item) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };
    // 삭제 버튼 클릭 이벤트 (임시)
    const handleDeleteClick = (id) => {
        // TODO: 실제 삭제 로직 구현 필요
        console.log('삭제 요청 id:', id);
    };
    // 날짜 필터링 헬퍼 함수 (예: 전체, 과거, 미래)
    const filterByPeriod = (dateStr) => {
        const today = new Date();
        const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
        const itemDate = new Date(year, month - 1, day);
        if (periodFilter === '전체 내역 보기')
            return true;
        if (periodFilter === '과거 내역 보기')
            return itemDate < today;
        if (periodFilter === '미래 내역 보기')
            return itemDate > today;
        return true;
    };
    // 필터링된 데이터 계산 (useMemo로 최적화)
    const filteredData = useMemo(() => {
        return mockData
            .filter(item => {
            if (!filterByPeriod(item.date))
                return false;
            if (categoryFilter === '카테고리 전체보기')
                return true;
            return item.category === categoryFilter;
        })
            .sort((a, b) => {
            const toDate = (dateStr) => {
                const [year, month, day] = dateStr.split(' ')[0].split('.').map(Number);
                return new Date(year, month - 1, day);
            };
            return toDate(b.date).getTime() - toDate(a.date).getTime(); // 내림차순 정렬
        });
    }, [periodFilter, categoryFilter]);
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', height: '100vh' }, children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsxs("div", { style: { display: 'flex', flex: 1, overflow: 'hidden' }, children: [isSidebarOpen && _jsx(Sidebar, {}), _jsxs(PageWrapper, { children: [_jsx(LabelBox, { children: "\uBC15\uB561\uB561\uB2D8\uC758 \uAC00\uACC4\uBD80" }), _jsxs(TopControls, { children: [_jsxs(SelectBox, { as: "select", value: periodFilter, onChange: e => setPeriodFilter(e.target.value), children: [_jsx("option", { children: "\uC804\uCCB4 \uB0B4\uC5ED \uBCF4\uAE30" }), _jsx("option", { children: "\uACFC\uAC70 \uB0B4\uC5ED \uBCF4\uAE30" }), _jsx("option", { children: "\uBBF8\uB798 \uB0B4\uC5ED \uBCF4\uAE30" })] }), _jsxs(SelectBox, { as: "select", value: categoryFilter, onChange: e => setCategoryFilter(e.target.value), children: [_jsx("option", { children: "\uCE74\uD14C\uACE0\uB9AC \uC804\uCCB4\uBCF4\uAE30" }), _jsx("option", { children: "\uC2DD\uB8CC\uD488/\uC678\uC2DD" }), _jsx("option", { children: "\uC8FC\uAC70/\uACF5\uACFC\uAE08" }), _jsx("option", { children: "\uAD50\uD1B5/\uCC28\uB7C9" }), _jsx("option", { children: "\uC1FC\uD551/\uD328\uC158" }), _jsx("option", { children: "\uAC74\uAC15/\uC758\uB8CC" }), _jsx("option", { children: "\uAD50\uC721/\uC790\uAE30\uACC4\uBC1C" }), _jsx("option", { children: "\uC5EC\uAC00/\uBB38\uD654" }), _jsx("option", { children: "\uAE08\uC735/\uAE30\uD0C0" })] }), _jsx(StyledButton, { variant: "primary", style: { marginLeft: 'auto' }, onClick: handleWriteClick, children: "\uAC00\uACC4\uBD80 \uC791\uC131\uD558\uAE30" })] }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs("tr", { children: [_jsx("th", { children: "\uBD84\uB958" }), _jsx("th", { children: "\uB0A0\uC9DC" }), _jsx("th", { children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsx("th", { children: "\uACB0\uC81C\uC218\uB2E8" }), _jsx("th", { children: "\uAC70\uB798\uCC98" }), _jsx("th", { children: "\uAE08\uC561" }), _jsx("th", { children: "\uBA54\uBAA8" }), _jsx("th", {})] }) }), _jsx("tbody", { children: filteredData.map(row => (_jsxs(TableRow, { isFuture: isFutureDate(row.date), children: [_jsx(TableCell, { children: _jsx(Badge, { type: row.type, children: row.type }) }), _jsx(TableCell, { children: row.date }), _jsx(TableCell, { children: row.category }), _jsx(TableCell, { children: row.method }), _jsx(TableCell, { children: row.place }), _jsx(TableCell, { children: row.amount }), _jsx(TableCell, { children: row.memo }), _jsx(TableCell, { children: _jsxs(ActionWrapper, { children: [_jsx(ActionText, { onClick: () => handleEditClick(row), children: "\uC218\uC815\uD558\uAE30" }), _jsx(ActionText, { "$delete": true, onClick: () => handleDeleteClick(row.id), children: "\uC0AD\uC81C\uD558\uAE30" })] }) })] }, row.id))) })] }), _jsxs(Pagination, { children: [_jsx("span", { children: "\u25C0" }), [1, 2, 3, 4, 5].map(n => (_jsx("button", { className: n === 1 ? 'active' : '', children: n }, n))), _jsx("span", { children: "\u25B6" })] })] }), isEditModalOpen && selectedItem && (_jsx(EditLedgerModal, { item: selectedItem, onClose: () => setEditModalOpen(false), onSave: (updatedItem) => {
                            // 실제 저장 로직은 상태 관리 또는 API 요청 필요
                            console.log('수정된 데이터:', updatedItem);
                            setEditModalOpen(false);
                        } }))] })] }));
};
export default LedgerReadPage;
