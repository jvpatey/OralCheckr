import styled from "styled-components";
import { BaseButton } from "../../../containers/welcome/styles/ButtonStyles";

export const SummaryRoot = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: clamp(28px, 5vh, 48px);
  text-align: left;
  color: ${({ theme }) => theme.textPrimary};

  @media print {
    max-width: 100%;
    padding-bottom: 0;
    overflow: visible !important;
    color: #0f172a !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
`;

export const PrintHeaderBlock = styled.header`
  text-align: left;
  margin-bottom: clamp(24px, 4vw, 36px);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;

  @media print {
    margin-bottom: 20px;
  }
`;

export const ReportHeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
`;

export const ReportHeaderIconButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const PrintEyebrow = styled.p`
  margin: 0 0 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};

  @media print {
    color: #64748b !important;
  }
`;

export const PrintTitleLine = styled.h1`
  margin: 0 0 6px;
  font-size: clamp(1.65rem, 2.5vw + 1rem, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: ${({ theme }) => theme.textPrimary};

  @media print {
    color: #0f172a !important;
  }
`;

export const PrintTitleAccent = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;

  @media print {
    color: #0891b2 !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
`;

export const PrintSubtitle = styled.p`
  margin: 0 0 10px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};

  @media print {
    color: #475569 !important;
  }
`;

export const PrintMeta = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};

  @media print {
    color: #64748b !important;
  }
`;

export const Section = styled.section`
  margin-top: clamp(22px, 3vw, 28px);

  @media print {
    margin-top: 18px;
    break-inside: auto;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};

  @media print {
    color: #475569 !important;
  }
`;

export const ScoreBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px 20px;
`;

export const ScoreValue = styled.span`
  font-size: clamp(2.5rem, 4vw + 1.5rem, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.primary};

  @media print {
    color: #0891b2 !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
`;

export const ScoreLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};

  @media print {
    color: #0f172a !important;
  }
`;

export const MutedLine = styled.p`
  margin: 8px 0 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.textSecondary};

  @media print {
    color: #475569 !important;
  }
`;

export const QuestionnaireOverviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  table-layout: fixed;

  th,
  td {
    text-align: left;
    vertical-align: top;
    padding: 10px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
    word-break: break-word;
    hyphens: auto;
  }

  th {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textSecondary};
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 2.25rem;
    padding-right: 6px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.textSecondary};
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 22%;
  }

  @media print {
    th,
    td {
      border-color: #e2e8f0 !important;
      color: #0f172a !important;
    }
    th {
      color: #64748b !important;
    }
    thead {
      display: table-header-group;
    }
  }
`;

export const OverviewRow = styled.tr``;

export const AdherenceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th,
  td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  }

  th {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textSecondary};
  }

  @media print {
    th,
    td {
      border-color: #e2e8f0 !important;
      color: #0f172a !important;
    }
    th {
      color: #64748b !important;
    }
  }
`;

export const AdherenceRow = styled.tr`
  @media print {
    break-inside: avoid;
  }
`;

export const EmptyNote = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.textSecondary};

  @media print {
    color: #64748b !important;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: clamp(20px, 3vw, 28px) 0 0;

  @media print {
    display: none !important;
  }
`;

export const PrintButton = styled(BaseButton).attrs(() => ({
  type: "button" as const,
  $variant: "primary" as const,
}))`
  flex: none;
  padding: 12px 22px;
  font-size: 0.9375rem;
`;
