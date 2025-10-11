import styled from "styled-components";

export const Section = styled.div`
  margin-bottom: 3rem;
  position: relative;
  max-height: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  && {
    color: ${({ theme }) => theme.textPrimary};
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid ${({ theme }) => theme.borderLight};
    background: ${({ theme }) => theme.primaryGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 1.125rem;
      margin-bottom: 1.25rem;
    }
  }
`;

export const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const DataItem = styled.div`
  background: ${({ theme }) => theme.surfaceElevated};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.borderLight};
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowLg};
    border-color: ${({ theme }) => theme.primary}40;
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.125rem;
  font-weight: 600;
`;

export const HabitList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
  overflow-y: auto;
  max-height: 500px;
  padding-right: 10px;

  /* Modern scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}40;
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary}60;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
    max-height: 400px;
  }
`;

export const HabitItem = styled.div`
  background: ${({ theme }) => theme.surfaceElevated};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.borderLight};
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowLg};
    border-color: ${({ theme }) => theme.secondary}40;
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

export const HabitName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const HabitDate = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const EmptyHabit = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px dashed ${({ theme }) => theme.borderMedium};
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  box-shadow: ${({ theme }) => theme.shadowSm};
  margin-bottom: 2rem;
`;

export const WarningText = styled.div`
  color: #ff6961;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  background: rgba(255, 105, 97, 0.1);
  border: 1px solid rgba(255, 105, 97, 0.3);
  border-radius: 12px;
  line-height: 1.5;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const GreenLabel = styled.span`
  color: ${({ theme }) => theme.secondary};
  font-weight: 600;
`;

export const Spacing = styled.div`
  margin-top: 2rem;
`;
