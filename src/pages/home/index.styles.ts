import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MainLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  overflow: hidden;
`;

export const SummaryBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20px 24px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;
  gap: 16px;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const Title = styled.div`
  font-size: 14px;
  color: #868e96;
  margin-bottom: 6px;
`;

export const Amount = styled.div<{ type?: 'income' | 'expense' | 'budget' }>`
  font-size: 22px;
  font-weight: bold;
  color: ${({ type }) =>
    type === 'income' ? '#00C48C' :
    type === 'expense' ? '#FF5A5F' :
    '#4A90E2'};
`;

// export const Amount = styled.div<{ type?: 'income' | 'expense' | 'budget' }>`
//   font-size: 22px;
//   font-weight: bold;
//   color: ${({ type }) =>
//     type === 'income' ? '#4A90E2' :
//     type === 'expense' ? '#4A90E2' :
//     '#4A90E2'};
// `;

export const TopButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;


export const CalendarAndSchedule = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex: 1;
  min-height: 0;
`;

export const CalendarContainer = styled.div`
  background-color: #fff;
  flex: 8;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    padding: 0;
  }

  &::-webkit-scrollbar {
  display: none;
  }

  .react-calendar__tile {
    border: 1px solid #e9ecef;
    border-radius: 0;
    height: 80px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 6px;
    font-size: 0.75rem;
    color: #333;
    position: relative;
  }

  .react-calendar__tile--now {
    background: #e3f2ff !important;
    color: #228be6 !important;
    border-radius: 10px;
    font-weight: bold;
    border-radius: 0;
  }

  .react-calendar__tile--active {
    background: #228be6 !important;
    color: white !important;
    border-radius: 10px;
    border-radius: 0;

  }

  .react-calendar__month-view__days__day--weekend {
    color: #333 !important;
  }
`;

export const ScheduleBox = styled.div`
  flex: 2;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h4 {
    margin-bottom: 10px;
    flex-shrink: 0;
  }

  .schedule-content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    scrollbar-width: none; 
    -ms-overflow-style: none; 


    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 8px;
      }
    }
  }

  .schedule-content::-webkit-scrollbar {
  display: none; 
  }

  .edit-btn {
    background-color: #e6f0ff;
    color: #228be6;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
  }

}

`;
