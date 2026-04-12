import styled from "styled-components";
import {
  TileContainer,
  TileHeading,
  TileMainContent,
  TileSubContent,
} from "../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";

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
    font-family: var(--font-sans), system-ui, sans-serif;
    color: ${({ theme }) => theme.textPrimary};
    font-size: clamp(1.1rem, 1.2vw + 0.85rem, 1.35rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.35;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};

    @media (max-width: 768px) {
      margin-bottom: 1.25rem;
    }
  }
`;

/** Match analytics `TilesContainer` rhythm */
export const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5625rem;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

/** Same shell as analytics month tiles (`TileContainer`) */
export const DataItem = styled(TileContainer)`
  height: auto;
  min-height: 132px;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 1rem 0.75rem;

  @media (max-width: 480px) {
    min-height: 120px;
  }
`;

/** Centers loading spinners above the tile gradient overlay */
export const DataItemInner = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Uppercase label — same look as `TileHeading`, but `as="p"` so we do not nest
 * headings under the section `SectionTitle` (h3).
 */
export const Label = styled(TileHeading).attrs({ as: "p" })`
  margin: 0 0 0.125rem 0;
`;

/**
 * Primary metric / value — analytics `TileMainContent` scale tuned for dates and short text.
 */
export const Value = styled(TileMainContent)`
  font-size: clamp(1.125rem, 3.2vw, 1.875rem);
  line-height: 1.2;
  word-break: break-word;
  max-width: 100%;
  padding: 0 0.25rem;
`;

export const HabitList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5625rem;
  margin-bottom: 2rem;
  overflow-y: auto;
  max-height: 500px;
  padding-right: 8px;

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
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    max-height: 400px;
  }
`;

export const HabitItem = styled(DataItem)`
  min-height: 112px;
`;

export const HabitName = styled(TileMainContent)`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.25;
  word-break: break-word;
  max-width: 100%;
  padding: 0 0.35rem;
`;

export const HabitDate = styled(TileSubContent)`
  margin-top: 0.125rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.8125rem;
`;

export const EmptyHabit = styled(TileContainer)`
  height: auto;
  min-height: 100px;
  grid-column: 1 / -1;
  border-style: dashed;
  border-color: ${({ theme }) => `${theme.primary}38`};
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;

  &::before {
    opacity: 0.02;
  }
`;

export const WarningText = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => `${theme.error}14`};
  border: 1px solid ${({ theme }) => `${theme.error}45`};
  border-radius: 20px;
  line-height: 1.5;
`;

export const DescriptionText = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  margin-bottom: 1.5rem;
  line-height: 1.65;
  font-weight: 400;
`;

/** Semibold prefix inside `HabitDate` — inherits muted text color (no accent green) */
export const HabitDatePrefix = styled.span`
  font-weight: 600;
`;

export const Spacing = styled.div`
  margin-top: 2rem;
`;
