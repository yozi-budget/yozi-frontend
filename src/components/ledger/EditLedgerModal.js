import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalInput, ModalSelect, ModalButtonRow, ModalButton, } from '../common/ModalStyles';
const typeOptions = ['수입', '지출'];
const categoryOptions = [
    '식료품/외식',
    '주거/공과금',
    '교통/차량',
    '쇼핑/패션',
    '건강/의료',
    '교육/자기계발',
    '여가/문화',
    '금융/기타',
];
const methodOptions = ['카드', '현금'];
const EditLedgerModal = ({ item, onClose, onSave }) => {
    const [form, setForm] = useState({ ...item });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = () => {
        onSave(form);
    };
    const formatDateForInput = (dateStr) => {
        if (!dateStr)
            return '';
        const datePart = dateStr.split(' ')[0].replace(/\./g, '-');
        const parts = datePart.split('-').map((p) => p.padStart(2, '0'));
        return `${parts[0]}-${parts[1]}-${parts[2]}`;
    };
    return (_jsx(ModalOverlay, { children: _jsxs(ModalContent, { children: [_jsx(ModalHeader, { children: "\uB0B4\uC5ED \uC218\uC815" }), _jsx("label", { children: "\uBD84\uB958 (\uC218\uC785/\uC9C0\uCD9C)" }), _jsx(ModalSelect, { name: "type", value: form.type, onChange: handleChange, children: typeOptions.map((option) => (_jsx("option", { value: option, children: option }, option))) }), _jsx("label", { children: "\uB0A0\uC9DC" }), _jsx(ModalInput, { type: "date", name: "date", value: formatDateForInput(form.date), onChange: (e) => setForm((prev) => ({
                        ...prev,
                        date: e.target.value.replace(/-/g, '.') + ' (?)',
                    })) }), _jsx("label", { children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsx(ModalSelect, { name: "category", value: form.category, onChange: handleChange, children: categoryOptions.map((option) => (_jsx("option", { value: option, children: option }, option))) }), _jsx("label", { children: "\uACB0\uC81C\uC218\uB2E8" }), _jsx(ModalSelect, { name: "method", value: form.method, onChange: handleChange, children: methodOptions.map((option) => (_jsx("option", { value: option, children: option }, option))) }), _jsx("label", { children: "\uAC70\uB798\uCC98" }), _jsx(ModalInput, { name: "place", value: form.place, onChange: handleChange, placeholder: "\uAC70\uB798\uCC98 \uC785\uB825" }), _jsx("label", { children: "\uAE08\uC561" }), _jsx(ModalInput, { name: "amount", value: form.amount, onChange: handleChange, placeholder: "\uAE08\uC561 \uC785\uB825" }), _jsx("label", { children: "\uBA54\uBAA8" }), _jsx(ModalInput, { name: "memo", value: form.memo, onChange: handleChange, placeholder: "\uBA54\uBAA8 \uC785\uB825" }), _jsxs(ModalButtonRow, { children: [_jsx(ModalButton, { variant: "secondary", onClick: onClose, children: "\uCDE8\uC18C" }), _jsx(ModalButton, { variant: "primary", onClick: handleSubmit, children: "\uC800\uC7A5" })] })] }) }));
};
export default EditLedgerModal;
