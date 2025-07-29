import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  width: 420px;
  max-width: 90vw;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.h2`
  margin: 0 0 20px 0;
  font-weight: 700;
  font-size: 24px;
  color: #222;
  text-align: center;
`;

export const ModalInput = styled.input`
  padding: 10px 14px;
  margin-bottom: 16px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #228be6;
    outline: none;
  }
`;

export const ModalSelect = styled.select`
  padding: 10px 14px;
  margin-bottom: 16px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #228be6;
    outline: none;
  }

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const ModalButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

export const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 4px;

  background-color: ${({ variant }) => (variant === 'primary' ? '#228be6' : '#e0e0e0')};
  color: ${({ variant }) => (variant === 'primary' ? '#fff' : '#333')};

  &:hover {
    background-color: ${({ variant }) => (variant === 'primary' ? '#228be6' : '#cacaca')};
  }
`;
