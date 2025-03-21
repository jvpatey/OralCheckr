import styled from "styled-components";
import { Card } from "react-bootstrap";
import { NavigationButton } from "./NavigationButton";

// Shared styles for the questionnaire components

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

// Shared header components

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

// Shared container components

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Shared button components

export const PrimaryButton = styled(NavigationButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  font-size: 1.25rem;
  text-align: center;
  border: solid 2px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border: solid 2px;
    border-color: ${({ theme }) => theme.green};
  }
`;

export const SecondaryButton = styled(NavigationButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  font-size: 1.25rem;
  text-align: center;
  border: solid 2px;
  border-color: ${({ theme }) => theme.blue};
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.accentBackgroundColor};

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.blue};
    border: solid 2px;
    border-color: ${({ theme }) => theme.blue};
  }
`;

export const DangerButton = styled(NavigationButton)`
  background-color: ${({ theme }) => theme.red};
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  white-space: nowrap;
  min-width: max-content;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.red};
    border: solid 2px ${({ theme }) => theme.red};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

// Shared text styles

export const MessageText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;

  @media (max-width: 950px) {
    font-size: 14px;
  }
`;
