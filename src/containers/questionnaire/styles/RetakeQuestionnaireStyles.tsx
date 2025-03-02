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
