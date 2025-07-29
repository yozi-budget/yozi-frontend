import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f7f8fa;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: sticky;
`;

export const MenuGroup = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

// 클릭 가능한 메뉴 아이템
export const MenuItem = styled.p<{ $active?: boolean }>`
  font-weight: bold;
  color: ${({ $active }) => ($active ? '#228be6' : '#000')};
  margin: 30px 0 0 8px;
  user-select: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? '#e7f1ff' : 'transparent')};

  &:hover {
    background-color: #e9ecef;
  }
`;

// 서브 메뉴 아이템
export const SubMenuItem = styled.p<{ $active?: boolean }>`
  font-weight: normal;
  color: ${({ $active }) => ($active ? '#228be6' : '#6c757d')};
  margin: 8px 0 4px 20px;
  user-select: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? '#e7f1ff' : 'transparent')};

  &:hover {
    background-color: #e9ecef;
  }
`;

// 클릭 안 되는 라벨용 스타일
export const MenuLabel = styled.p`
  font-weight: bold;
  color: #000;
  margin: 30px 0 0 8px;
  user-select: none;
  padding: 8px;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
`;
