import React from 'react';
import { ModalOverlay, ModalContent } from '@/components/common/ModalStyles';

interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  transactions?: Transaction[];
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  transactions = [],
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        style={{ width: '360px', maxWidth: '90vw' }}
      >
        {selectedDate && (
          <>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              {selectedDate.toLocaleDateString('ko-KR')}
            </h3>
            <hr />
            {transactions.length === 0 ? (
              <p>내역이 없습니다.</p>
            ) : (
              transactions.map((entry, i) => (
                <p
                  key={i}
                  style={{
                    color: entry.type === 'income' ? '#00C48C' : '#FF5A5F',
                    fontSize: '0.9rem',
                  }}
                >
                  {entry.description}: {entry.amount.toLocaleString()}원 ({entry.type === 'income' ? '수입' : '지출'})
                </p>
              ))
            )}
            <button
              onClick={onClose}
              style={{
                marginTop: '20px',
                padding: '8px 12px',
                backgroundColor: '#228be6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              닫기
            </button>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CalendarModal;
