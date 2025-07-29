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
declare const EditLedgerModal: ({ item, onClose, onSave }: EditLedgerModalProps) => import("react/jsx-runtime").JSX.Element;
export default EditLedgerModal;
