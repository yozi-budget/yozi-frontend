import React from 'react';
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
declare const CalendarModal: React.FC<CalendarModalProps>;
export default CalendarModal;
