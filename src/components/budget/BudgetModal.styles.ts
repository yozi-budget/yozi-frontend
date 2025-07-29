import styled from "styled-components";
import {
  ModalInput,
  ModalButton,
} from "@/components/common/ModalStyles";

export const BudgetAmount = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.5rem 0 1.5rem 0;
  text-align: center;
  color: #000;
`;

export const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
`;

export const CategoryName = styled.div`
  flex: 1.5;
  font-size: 1rem;
  color: #222;
`;

export const CategoryDisplayAmount = styled.div`
  flex: 1;
  text-align: right;
  font-size: 1rem;
  font-weight: 500;
  color: #111;
`;

export const EditableInput = styled(ModalInput)`
  flex: 1;
  text-align: right;
  font-size: 1rem;
  padding: 0.4rem 0.5rem;
`;

export const EditIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #444;
`;

export const DoneButton = styled(ModalButton).attrs({ variant: "primary" })`
  margin-top: 2rem;
  width: 100%;
  font-size: 1rem;
`;
