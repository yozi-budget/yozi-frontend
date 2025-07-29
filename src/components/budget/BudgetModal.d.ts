import React from "react";
interface BudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
    categoryBudgets: Record<string, number>;
    onBudgetChange: (category: string, newAmount: number) => void;
}
declare const BudgetModal: React.FC<BudgetModalProps>;
export default BudgetModal;
