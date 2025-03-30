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
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const DataItem = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 1rem;
`;

export const HabitList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 2rem;
`;

export const HabitItem = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const HabitName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.darkGrey};
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
`;

export const HabitDate = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
`;

export const EmptyHabit = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textGrey};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

export const WarningText = styled.div`
  color: ${({ theme }) => theme.red};
  font-weight: 500;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

export const GreenLabel = styled.span`
  color: ${({ theme }) => theme.green};
`;

export const Spacing = styled.div`
  margin-top: 2rem;
`;
