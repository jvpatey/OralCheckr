import styled from "styled-components";

export const Section = styled.div`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h3`
  && {
    color: ${({ theme }) => theme.blue};
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;

export const DataItem = styled.div`
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.textGrey};
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 0.25rem;
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  background: ${({ theme }) => theme.backgroundColor};
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
`;

export const HabitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const HabitItem = styled.li`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  color: ${({ theme }) => theme.darkGrey};

  &:last-child {
    margin-bottom: 0;
  }
`;
