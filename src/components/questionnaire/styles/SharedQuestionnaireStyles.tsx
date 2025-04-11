import styled from "styled-components";
import { Card } from "react-bootstrap";
import { NavigationButton } from "./NavigationButton";

// Shared styles for the questionnaire components

export const TitleText = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const CardText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  text-align: center;
  font-size: 1.1rem;
  margin: 10px 0;
  width: 80%;
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
  transition: all 0.4s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.1rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
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
