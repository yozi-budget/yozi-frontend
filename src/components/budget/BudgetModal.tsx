import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
import { Category } from "@/types/category";
import { getMonthlyBudget, updateMonthlyBudget } from "@/api/budget";
import { CategoryBudget } from "@/types/budget";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  // categoryId별 예산 금액 저장 (키: 카테고리ID, 값: 금액)
  const [categoryBudgets, setCategoryBudgets] = useState<Record<number, number>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  // 입력 중인 금액 상태 (키: 카테고리ID, 값: 입력된 문자열)
  const [inputValues, setInputValues] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!isOpen) return;

    const fetchBudget = async () => {
      try {
        const data: CategoryBudget[] = await getMonthlyBudget(); // [{ categoryId, amount }, ...]
        const budgets: Record<number, number> = {};
        data.forEach((b) => {
          budgets[b.categoryId] = b.amount;
        });
        setCategoryBudgets(budgets);
      } catch (err) {
        console.error("예산 불러오기 실패:", err);
      }
    };

    fetchBudget();
  }, [isOpen]);

  // 총 예산 합계 계산
  const total: number = Object.values(categoryBudgets).reduce((a, b) => a + b, 0);

  const handleEditClick = (categoryId: number) => {
    setEditingCategoryId(categoryId);
    setInputValues((prev) => ({
      ...prev,
      [categoryId]: categoryBudgets[categoryId]?.toString() || "0",
    }));
  };

  const handleInputChange = (categoryId: number, value: string) => {
    // 숫자 이외 문자 제거
    const numericValue: string = value.replace(/[^0-9]/g, "");
    setInputValues((prev) => ({
      ...prev,
      [categoryId]: numericValue,
    }));
  };

  const handleBlur = (categoryId: number) => {
    const newAmount: number = parseInt(inputValues[categoryId] || "0", 10);
    setCategoryBudgets((prev) => ({
      ...prev,
      [categoryId]: isNaN(newAmount) ? 0 : newAmount,
    }));
    setEditingCategoryId(null);
  };

  const handleSave = async () => {
    // 카테고리별 예산 리스트로 변환
    const categoryBudgetList: CategoryBudget[] = categories.map((c) => ({
      categoryId: c.id,
      amount: categoryBudgets[c.id] || 0,
    }));

    try {
      await updateMonthlyBudget(categoryBudgetList);
      onClose();
    } catch (err) {
      console.error("예산 저장 실패:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>예산 설정</ModalHeader>
        <BudgetAmount>{total.toLocaleString()}원</BudgetAmount>

        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryName>{category.displayName}</CategoryName>

            {editingCategoryId === category.id ? (
              <EditableInput
                type="text"
                value={inputValues[category.id] || ""}
                onChange={(e) => handleInputChange(category.id, e.target.value)}
                onBlur={() => handleBlur(category.id)}
                autoFocus
              />
            ) : (
              <>
                <CategoryDisplayAmount>
                  {(categoryBudgets[category.id] || 0).toLocaleString()}원
                </CategoryDisplayAmount>
                <EditIcon onClick={() => handleEditClick(category.id)}>✎</EditIcon>
              </>
            )}
          </CategoryItem>
        ))}

        <DoneButton onClick={handleSave}>완료</DoneButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BudgetModal;
