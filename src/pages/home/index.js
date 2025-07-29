import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { LabelBox } from '@/components/common/LabelBox';
import { useNavigate } from 'react-router-dom';
import CalendarModal from '@/components/home/CalendarModal';
import { Container, MainLayout, ContentWrapper, CalendarWrapper, SummaryBox, SummaryItem, Title, Amount, ScheduleBox, CalendarContainer, TopButtonRow, CalendarAndSchedule, } from './index.styles';
import StyledButton from '@/components/common/StyledButton';
Modal.setAppElement('#root');
// 날짜 문자열(YMD)을 Date 객체로 정확히 파싱 (시차 문제 방지)
const parseYMD = (ymd) => {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(y, m - 1, d);
};
const Home = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleWriteClick = () => {
        navigate('/ledger/write');
    };
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const openModal = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const [financeData, setFinanceData] = useState({
        '2025-07-03': [
            { id: '1', type: 'income', amount: 125000, description: '월급' },
            { id: '2', type: 'expense', amount: 10000, description: '커피' },
        ],
        '2025-07-25': [
            { id: '3', type: 'expense', amount: 10000, description: '넷플릭스 구독' },
        ],
    });
    return (_jsxs(Container, { children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsxs(MainLayout, { children: [isSidebarOpen && _jsx(Sidebar, {}), _jsxs(ContentWrapper, { children: [_jsxs(TopButtonRow, { children: [_jsx(LabelBox, { "$variant": "outline", children: "\uBC15\uB561\uB561\uB2D8\uC758 \uAC00\uACC4\uBD80" }), _jsx(StyledButton, { variant: "primary", onClick: handleWriteClick, children: "\uAC00\uACC4\uBD80 \uC791\uC131\uD558\uAE30" })] }), _jsxs(SummaryBox, { children: [_jsxs(SummaryItem, { children: [_jsx(Title, { children: "\uC774\uBC88 \uB2EC \uC9C0\uCD9C" }), _jsx(Amount, { type: "expense", children: "1,234,567\uC6D0" })] }), _jsxs(SummaryItem, { children: [_jsx(Title, { children: "\uC774\uBC88 \uB2EC \uC218\uC785" }), _jsx(Amount, { type: "income", children: "1,234,567\uC6D0" })] }), _jsxs(SummaryItem, { children: [_jsx(Title, { children: "\uC608\uC0B0" }), _jsx(Amount, { type: "budget", children: "1,234,567\uC6D0" })] })] }), _jsxs(CalendarAndSchedule, { children: [_jsxs(CalendarContainer, { children: [_jsxs("h3", { style: { fontSize: '10px', fontWeight: 600, marginBottom: '12px', color: '#343a40' }, children: [_jsx("span", { style: { color: '#00C48C' }, children: "\u25CB \uC218\uC785" }), " \u00A0 ", _jsx("span", { style: { color: '#FF5A5F' }, children: "\u25CB \uC9C0\uCD9C" })] }), _jsx(CalendarWrapper, { children: _jsx(Calendar, { onChange: (value) => setDate(value), value: date, locale: "ko-KR", onClickDay: openModal, tileContent: ({ date, view }) => {
                                                        if (view !== 'month')
                                                            return null;
                                                        const ymd = date.toLocaleDateString('sv-SE');
                                                        const transactions = financeData[ymd];
                                                        if (!transactions)
                                                            return null;
                                                        return (_jsx("div", { style: { marginTop: 2 }, children: transactions.map((t, idx) => (_jsxs("div", { style: { color: t.type === 'income' ? '#00C48C' : '#FF5A5F', fontSize: '0.7rem' }, children: [t.amount.toLocaleString(), "\uC6D0"] }, idx))) }));
                                                    } }) })] }), _jsxs(ScheduleBox, { children: [_jsx("h4", { children: "\uAE08\uC735 \uC77C\uC815" }), _jsx("div", { className: "schedule-content", children: _jsx("ul", { children: Object.entries(financeData)
                                                        .filter(([dateStr]) => parseYMD(dateStr) >= new Date(new Date().setHours(0, 0, 0, 0)))
                                                        .sort(([a], [b]) => a.localeCompare(b))
                                                        .flatMap(([dateStr, entries]) => entries.map((entry, idx) => {
                                                        const dateObj = parseYMD(dateStr);
                                                        const day = dateObj.getDate();
                                                        const badgeColor = entry.type === 'income' ? '#00C48C' : '#FF5A5F';
                                                        const textColor = badgeColor;
                                                        return (_jsxs("li", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsxs("span", { style: { backgroundColor: badgeColor, color: '#fff', borderRadius: '999px', padding: '2px 8px', fontSize: '12px', minWidth: '28px', textAlign: 'center' }, children: [day, "\uC77C"] }), _jsxs("div", { style: { fontSize: '14px', color: '#495057', flex: 1 }, children: [_jsx("div", { style: { fontWeight: 'bold', color: textColor }, children: entry.description }), _jsxs("div", { style: { fontSize: '13px', color: '#868e96' }, children: [entry.amount.toLocaleString(), "\uC6D0 / ", entry.type === 'income' ? '수입' : '지출'] })] })] }, `${dateStr}-${idx}`));
                                                    })) }) }), _jsx("button", { className: "edit-btn", children: "\uAE08\uC735 \uC77C\uC815 \uC218\uC815\uD558\uAE30" })] })] }), _jsx(CalendarModal, { isOpen: isModalOpen, onClose: closeModal, selectedDate: selectedDate, transactions: financeData[selectedDate?.toLocaleDateString('sv-SE') || ''] })] })] })] }));
};
export default Home;
