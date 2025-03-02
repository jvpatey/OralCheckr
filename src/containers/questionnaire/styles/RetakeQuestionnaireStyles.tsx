import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap/Button";
import { NavigationButton } from "../../../components/questionnaire/NavigationButton";

export const TitleText = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-top: 20px;
  margin-bottom: 60px;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const CardText = styled.h5`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 20px;
  margin-right: 40px;
  margin-left: 40px;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const NavButton = styled(NavigationButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 15px 20px;
  font-size: 1.25rem;
  text-align: center;
  border: solid 2px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};

  @media (max-width: 768px) {
    width: 70%;
    padding: 10px 15px;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border: solid 2px;
    border-color: ${({ theme }) => theme.green};
  }
`;

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
