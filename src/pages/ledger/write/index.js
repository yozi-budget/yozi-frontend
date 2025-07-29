import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StyledButton from '@/components/common/StyledButton';
import { LabelBox } from '@/components/common/LabelBox';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, Table, TableHeader, TableRow, TableCell, AddRowButton, Select, Input, MemoInput, AmountWrapper } from './index.styles';
const initialRow = {
    type: '',
    date: '',
    category: '',
    method: '',
    place: '',
    amount: '',
    memo: ''
};
const LedgerWritePage = () => {
    const [rows, setRows] = useState([initialRow]);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };
    const handleAddRow = () => {
        setRows([...rows, { ...initialRow }]);
    };
    const handleSubmit = () => {
        console.log(rows);
        // API 전송 등 처리
    };
    const navigate = useNavigate();
    const handleReadClick = () => {
        navigate('/ledger/read');
    };
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', height: '100vh' }, children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsxs("div", { style: { display: 'flex', flex: 1, overflow: 'hidden' }, children: [isSidebarOpen && _jsx(Sidebar, {}), _jsxs(PageWrapper, { children: [_jsx(LabelBox, { "$variant": "outline", children: "\uBC15\uB561\uB561\uB2D8\uC758 \uAC00\uACC4\uBD80" }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs("tr", { children: [_jsx("th", { children: "\uBD84\uB958" }), _jsx("th", { children: "\uB0A0\uC9DC" }), _jsx("th", { children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsx("th", { children: "\uACB0\uC81C\uC218\uB2E8" }), _jsx("th", { children: "\uAC70\uB798\uCC98" }), _jsx("th", { children: "\uAE08\uC561" }), _jsx("th", { children: "\uBA54\uBAA8" })] }) }), _jsx("tbody", { children: rows.map((row, idx) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs(Select, { value: row.type, onChange: (e) => handleChange(idx, 'type', e.target.value), children: [_jsx("option", { value: "", disabled: true, hidden: true, children: "\uC120\uD0DD" }), _jsx("option", { value: "\uC9C0\uCD9C", children: "\uC9C0\uCD9C" }), _jsx("option", { value: "\uC218\uC785", children: "\uC218\uC785" })] }) }), _jsx(TableCell, { children: _jsx(Input, { type: "date", value: row.date, onChange: (e) => handleChange(idx, 'date', e.target.value) }) }), _jsx(TableCell, { children: _jsxs(Select, { value: row.category, onChange: (e) => handleChange(idx, 'category', e.target.value), children: [_jsx("option", { value: "", disabled: true, hidden: true, children: "\uC120\uD0DD" }), _jsx("option", { value: "\uC2DD\uB8CC\uD488/\uC678\uC2DD", children: "\uC2DD\uB8CC\uD488/\uC678\uC2DD" }), _jsx("option", { value: "\uC8FC\uAC70/\uACF5\uACFC\uAE08", children: "\uC8FC\uAC70/\uACF5\uACFC\uAE08" }), _jsx("option", { value: "\uAD50\uD1B5/\uCC28\uB7C9", children: "\uAD50\uD1B5/\uCC28\uB7C9" }), _jsx("option", { value: "\uC1FC\uD551/\uD328\uC158", children: "\uC1FC\uD551/\uD328\uC158" }), _jsx("option", { value: "\uAC74\uAC15/\uC758\uB8CC", children: "\uAC74\uAC15/\uC758\uB8CC" }), _jsx("option", { value: "\uAD50\uC721/\uC790\uAE30\uACC4\uBC1C", children: "\uAD50\uC721/\uC790\uAE30\uACC4\uBC1C" }), _jsx("option", { value: "\uC5EC\uAC00/\uBB38\uD654", children: "\uC5EC\uAC00/\uBB38\uD654" }), _jsx("option", { value: "\uAE08\uC735/\uAE30\uD0C0", children: "\uAE08\uC735/\uAE30\uD0C0" })] }) }), _jsx(TableCell, { children: _jsxs(Select, { value: row.method, onChange: (e) => handleChange(idx, 'method', e.target.value), children: [_jsx("option", { value: "", disabled: true, hidden: true, children: "\uC120\uD0DD" }), _jsx("option", { value: "\uD604\uAE08", children: "\uD604\uAE08" }), _jsx("option", { value: "\uCE74\uB4DC", children: "\uCE74\uB4DC" })] }) }), _jsx(TableCell, { children: _jsx(Input, { value: row.place, onChange: (e) => handleChange(idx, 'place', e.target.value) }) }), _jsx(TableCell, { children: _jsxs(AmountWrapper, { children: [_jsx(Input, { type: "number", value: row.amount, onChange: (e) => handleChange(idx, 'amount', e.target.value) }), _jsx("span", { children: "\uC6D0" })] }) }), _jsx(TableCell, { children: _jsx(MemoInput, { value: row.memo, onChange: (e) => handleChange(idx, 'memo', e.target.value) }) })] }, idx))) })] }), _jsx(AddRowButton, { onClick: handleAddRow, children: "+ \uD589 \uCD94\uAC00" }), _jsx("div", { style: { display: 'flex', justifyContent: 'center', marginTop: '20px' }, children: _jsx(StyledButton, { variant: "primary", onClick: handleReadClick, children: "\uC791\uC131 \uC644\uB8CC" }) })] })] })] }));
};
export default LedgerWritePage;
