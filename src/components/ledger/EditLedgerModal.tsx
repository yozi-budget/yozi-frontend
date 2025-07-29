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

export interface LedgerItem {
  type: '수입' | '지출';
  date: string;
  category: string;
  method: string;
  place: string;
  amount: string;
  memo: string;
}

interface EditLedgerModalProps {
  item: LedgerItem;
  onClose: () => void;
  onSave: (updatedItem: LedgerItem) => void;
}

const typeOptions = ['수입', '지출'] as const;
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

const EditLedgerModal = ({ item, onClose, onSave }: EditLedgerModalProps) => {
  const [form, setForm] = useState<LedgerItem>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    const datePart = dateStr.split(' ')[0].replace(/\./g, '-');
    const parts = datePart.split('-').map((p) => p.padStart(2, '0'));
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>내역 수정</ModalHeader>

        <label>분류 (수입/지출)</label>
        <ModalSelect name="type" value={form.type} onChange={handleChange}>
          {typeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </ModalSelect>

        <label>날짜</label>
        <ModalInput
          type="date"
          name="date"
          value={formatDateForInput(form.date)}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              date: e.target.value.replace(/-/g, '.') + ' (?)',
            }))
          }
        />

        <label>카테고리</label>
        <ModalSelect name="category" value={form.category} onChange={handleChange}>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </ModalSelect>

        <label>결제수단</label>
        <ModalSelect name="method" value={form.method} onChange={handleChange}>
          {methodOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </ModalSelect>

        <label>거래처</label>
        <ModalInput name="place" value={form.place} onChange={handleChange} placeholder="거래처 입력" />

        <label>금액</label>
        <ModalInput name="amount" value={form.amount} onChange={handleChange} placeholder="금액 입력" />

        <label>메모</label>
        <ModalInput name="memo" value={form.memo} onChange={handleChange} placeholder="메모 입력" />

        <ModalButtonRow>
          <ModalButton variant="secondary" onClick={onClose}>취소</ModalButton>
          <ModalButton variant="primary" onClick={handleSubmit}>저장</ModalButton>
        </ModalButtonRow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditLedgerModal;
