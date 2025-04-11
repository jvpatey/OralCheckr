import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap/Button";

export const ModalButton = styled(Button)<ButtonProps>`
  &.btn-secondary {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.textGrey};
    border: 1px solid ${({ theme }) => theme.textGrey};

    &:hover {
      background-color: ${({ theme }) => theme.textGrey};
      color: ${({ theme }) => theme.accentBackgroundColor};
      border-color: ${({ theme }) => theme.backgroundColor};
    }
  }

  &.btn-primary {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};

    &:hover {
      background-color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.accentBackgroundColor};
    }
  }
`;

export const MiniResultsCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  padding: 10px;
  margin: -10px 0 10px 0;
  width: 60%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const ScoreText = styled.div<{ $scoreColor: string }>`
  font-size: 1.2rem;
  color: ${(props) => props.$scoreColor};
  font-weight: bold;
  margin: 0;
`;

export const CompletedText = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textGrey};
`;

export const DateText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textGrey};
  margin: 0;
`;
