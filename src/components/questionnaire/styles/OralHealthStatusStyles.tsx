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

// Modern score display components
export const ModernScoreDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const ModernScoreNumber = styled.div`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const ModernScoreLabel = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.9;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ModernProgressBar = styled.div<{ $scoreColor: string }>`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
