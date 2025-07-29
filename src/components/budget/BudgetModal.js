import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { ModalOverlay, ModalContent, ModalHeader, } from "@/components/common/ModalStyles";
import { CategoryItem, CategoryName, CategoryDisplayAmount, EditableInput, EditIcon, DoneButton, BudgetAmount, } from "./BudgetModal.styles";
const BudgetModal = ({ isOpen, onClose, categories, categoryBudgets, onBudgetChange, }) => {
    const [editingCategory, setEditingCategory] = useState(null);
    const [inputValues, setInputValues] = useState({});
    if (!isOpen)
        return null;
    const total = Object.values(categoryBudgets).reduce((a, b) => a + b, 0);
    const handleEditClick = (category) => {
        setEditingCategory(category);
        setInputValues((prev) => ({
            ...prev,
            [category]: categoryBudgets[category].toString(),
        }));
    };
    const handleInputChange = (category, value) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        setInputValues((prev) => ({
            ...prev,
            [category]: numericValue,
        }));
    };
    const handleBlur = (category) => {
        const newAmount = parseInt(inputValues[category] || "0", 10);
        onBudgetChange(category, isNaN(newAmount) ? 0 : newAmount);
        setEditingCategory(null);
    };
    return (_jsx(ModalOverlay, { onClick: onClose, children: _jsxs(ModalContent, { onClick: (e) => e.stopPropagation(), children: [_jsx(ModalHeader, { children: "\uC608\uC0B0 \uC124\uC815" }), _jsxs(BudgetAmount, { children: [total.toLocaleString(), "\uC6D0"] }), categories.map((category) => (_jsxs(CategoryItem, { children: [_jsx(CategoryName, { children: category }), editingCategory === category ? (_jsx(EditableInput, { type: "text", value: inputValues[category] || "", onChange: (e) => handleInputChange(category, e.target.value), onBlur: () => handleBlur(category), autoFocus: true })) : (_jsxs(_Fragment, { children: [_jsxs(CategoryDisplayAmount, { children: [categoryBudgets[category].toLocaleString(), "\uC6D0"] }), _jsx(EditIcon, { onClick: () => handleEditClick(category), children: "\u270E" })] }))] }, category))), _jsx(DoneButton, { onClick: onClose, children: "\uC644\uB8CC" })] }) }));
};
export default BudgetModal;
