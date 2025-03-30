import styled from "styled-components";

export const Section = styled.div`
  margin-bottom: 2.5rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 2rem;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: ${({ theme }) => theme.blue};
  }
`;

export const SectionTitle = styled.h3`
  && {
    color: ${({ theme }) => theme.blue};
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 2rem;
    padding-bottom: 0.25rem;
  }
`;

export const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DataItem = styled.div`
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 1rem;
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.95rem;
`;

export const HabitList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 1rem;
`;

export const HabitItem = styled.div`
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const HabitName = styled.div`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 1rem;
`;

export const HabitDate = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.85rem;
`;

export const EmptyHabit = styled(HabitItem)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textGrey};
  grid-column: 1 / -1;
  min-height: 100px;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

export const WarningText = styled(DescriptionText)`
  color: ${({ theme }) => theme.red};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
