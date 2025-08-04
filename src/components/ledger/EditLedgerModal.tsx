import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalSelect,
  ModalButtonRow,
  ModalButton,
} from '../common/ModalStyles';

import {
  Transaction,
  TransactionRequest,
  TransactionType,
  PaymentMethod,
} from '@/types/transaction';

export interface Category {
  id: number;
  displayName: string;
}

interface EditLedgerModalProps {
  item: Transaction;
  categories: Category[];
  onClose: () => void;
  onSave: (updatedItem: TransactionRequest) => void;
}

const EditLedgerModal = ({ item, categories, onClose, onSave }: EditLedgerModalProps) => {
  const [form, setForm] = useState<TransactionRequest>({
    type: item.type,
    transactionDate: item.transactionDate,
    categoryId: item.categoryId,
    paymentMethod: item.paymentMethod,
    vendor: item.vendor,
    amount: item.amount,
    memo: item.memo,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        name === 'amount' || name === 'categoryId'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  const formatDateForInput = (dateStr: string) => {
    return dateStr.split('T')[0]; // ISO 문자열 "2025-08-01T00:00:00" → "2025-08-01"
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>내역 수정</ModalHeader>

        <label>분류 (수입/지출)</label>
        <ModalSelect name="type" value={form.type} onChange={handleChange}>
          <option value={TransactionType.INCOME}>수입</option>
          <option value={TransactionType.EXPENSE}>지출</option>
        </ModalSelect>

        <label>날짜</label>
        <ModalInput
          type="date"
          name="transactionDate"
          value={formatDateForInput(form.transactionDate)}
          onChange={handleChange}
        />

        <label>카테고리</label>
        <ModalSelect
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
        >
          <option value="">선택</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.displayName}
            </option>
          ))}
        </ModalSelect>

        <label>결제수단</label>
        <ModalSelect name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
          <option value={PaymentMethod.CARD}>카드</option>
          <option value={PaymentMethod.CASH}>현금</option>
        </ModalSelect>

        <label>거래처</label>
        <ModalInput
          name="vendor"
          value={form.vendor}
          onChange={handleChange}
          placeholder="거래처 입력"
        />

        <label>금액</label>
        <ModalInput
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="금액 입력"
        />

        <label>메모</label>
        <ModalInput
          name="memo"
          value={form.memo}
          onChange={handleChange}
          placeholder="메모 입력"
        />

        <ModalButtonRow>
          <ModalButton variant="secondary" onClick={onClose}>
            취소
          </ModalButton>
          <ModalButton variant="primary" onClick={handleSubmit}>
            저장
          </ModalButton>
        </ModalButtonRow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditLedgerModal;
