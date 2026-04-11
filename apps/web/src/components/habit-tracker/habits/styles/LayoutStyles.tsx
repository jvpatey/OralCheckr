import styled from "styled-components";

// Main container for habits section
export const HabitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Section header
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

// Section title
export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Section actions
export const SectionActions = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

// Habits list
export const HabitsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// Empty state
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// Empty state icon
export const EmptyStateIcon = styled.div`
  font-size: 48px;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 15px;
`;

// Empty state text
export const EmptyStateText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Divider
export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  margin: 20px 0;
`;

// Grid layout
export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

// Flex row
export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Flex column
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Spacer
export const Spacer = styled.div`
  flex: 1;
`;

// Loading container
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 0;
`;

// Error container
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.errorBackground};
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
`;

// Error message
export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.errorText};
  font-size: 16px;
  margin: 10px 0;
`;
