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
