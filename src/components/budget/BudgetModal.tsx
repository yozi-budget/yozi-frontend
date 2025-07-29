import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalButton,
} from "@/components/common/ModalStyles";
import {
  CategoryItem,
  CategoryName,
  CategoryDisplayAmount,
  EditableInput,
  EditIcon,
  DoneButton,
  BudgetAmount,
} from "./BudgetModal.styles";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  categoryBudgets: Record<string, number>;
  onBudgetChange: (category: string, newAmount: number) => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  categories,
  categoryBudgets,
  onBudgetChange,
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const total = Object.values(categoryBudgets).reduce((a, b) => a + b, 0);

  const handleEditClick = (category: string) => {
    setEditingCategory(category);
    setInputValues((prev) => ({
      ...prev,
      [category]: categoryBudgets[category].toString(),
    }));
  };

  const handleInputChange = (category: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setInputValues((prev) => ({
      ...prev,
      [category]: numericValue,
    }));
  };

  const handleBlur = (category: string) => {
    const newAmount = parseInt(inputValues[category] || "0", 10);
    onBudgetChange(category, isNaN(newAmount) ? 0 : newAmount);
    setEditingCategory(null);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>예산 설정</ModalHeader>
        <BudgetAmount>{total.toLocaleString()}원</BudgetAmount>

        {categories.map((category) => (
          <CategoryItem key={category}>
            <CategoryName>{category}</CategoryName>

            {editingCategory === category ? (
              <EditableInput
                type="text"
                value={inputValues[category] || ""}
                onChange={(e) => handleInputChange(category, e.target.value)}
                onBlur={() => handleBlur(category)}
                autoFocus
              />
            ) : (
              <>
                <CategoryDisplayAmount>
                  {categoryBudgets[category].toLocaleString()}원
                </CategoryDisplayAmount>
                <EditIcon onClick={() => handleEditClick(category)}>✎</EditIcon>
              </>
            )}
          </CategoryItem>
        ))}

        <DoneButton onClick={onClose}>완료</DoneButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BudgetModal;
