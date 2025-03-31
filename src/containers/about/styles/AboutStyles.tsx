import styled, { keyframes } from "styled-components";
import { Card, Button } from "react-bootstrap";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.backgroundColor};
  overflow-y: auto;
  padding-top: calc(
    56px + 2rem
  ); /* Account for navbar height + extra padding */
`;

export const AboutCard = styled(Card)`
  background: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 15px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 800px;
  height: fit-content;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.6s ease-out;

  @media (max-width: 900px) {
    margin: 0 2rem 2rem;
    width: calc(100% - 4rem);
    padding: 1.5rem;
  }
`;

export const AboutTitle = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
`;

export const BackButtonContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.green};
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.green};
    border: 1px solid ${({ theme }) => theme.green};
  }
`;
