import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ModalOverlay, ModalContent } from '@/components/common/ModalStyles';
const CalendarModal = ({ isOpen, onClose, selectedDate, transactions = [], }) => {
    if (!isOpen)
        return null;
    return (_jsx(ModalOverlay, { onClick: onClose, children: _jsx(ModalContent, { onClick: (e) => e.stopPropagation(), style: { width: '360px', maxWidth: '90vw' }, children: selectedDate && (_jsxs(_Fragment, { children: [_jsx("h3", { style: {
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            marginBottom: '12px',
                        }, children: selectedDate.toLocaleDateString('ko-KR') }), _jsx("hr", {}), transactions.length === 0 ? (_jsx("p", { children: "\uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })) : (transactions.map((entry, i) => (_jsxs("p", { style: {
                            color: entry.type === 'income' ? '#00C48C' : '#FF5A5F',
                            fontSize: '0.9rem',
                        }, children: [entry.description, ": ", entry.amount.toLocaleString(), "\uC6D0 (", entry.type === 'income' ? '수입' : '지출', ")"] }, i)))), _jsx("button", { onClick: onClose, style: {
                            marginTop: '20px',
                            padding: '8px 12px',
                            backgroundColor: '#228be6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }, children: "\uB2EB\uAE30" })] })) }) }));
};
export default CalendarModal;
