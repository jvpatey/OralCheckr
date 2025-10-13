import styled from "styled-components";
import { Card, ProgressBar } from "react-bootstrap";

export const StyledHeader = styled(Card.Header)`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.blue};
  font-size: 25px;
  font-weight: bold;
  border: none;
  text-align: center;
  margin-top: 50px;

  @media (max-width: 375px) {
    margin-top: 20px;
    font-size: 22px;
  }

  @media (max-width: 430px) {
    margin-top: 10px;
    font-size: 18px;
  }
`;

export const StyledText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 18px;

  @media (max-width: 950px) {
    font-size: 16px;
  }
`;

export const ScoreSpan = styled.span<{ $scoreColor: string }>`
  color: ${(props) => props.$scoreColor};
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 950px) {
    font-size: 18px;
  }
`;

export const CustomProgressBar = styled(ProgressBar)<{ $scoreColor: string }>`
  height: 25px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.accentBackgroundColor};

  .progress-bar {
    color: ${({ theme }) => theme.accentBackgroundColor};
    background-color: ${(props) => props.$scoreColor};
    font-size: 15px;
    font-weight: bold;
    border-radius: 20px;
  }

  @media (max-width: 950px) {
    margin-bottom: 10px;
  }
`;

// Modern score display components - styled exactly like dashboard cards
export const ModernScoreDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const ModernScoreNumber = styled.div<{ $scoreColor?: string }>`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  color: ${({ $scoreColor, theme }) => $scoreColor || theme.primary};

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ModernScoreLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ModernProgressBar = styled.div<{ $scoreColor: string }>`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress-width, 0%);
    background: ${({ $scoreColor }) => $scoreColor};
    border-radius: 12px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
