import styled from "styled-components";
import { NavigationButton } from "./NavigationButton";

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

export const StartButton = styled(NavigationButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%; // Wider button
  padding: 20px 30px;
  font-size: 1.5rem;
  text-align: center;
  border: solid 2px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};

  @media (max-width: 768px) {
    width: 80%;
    padding: 15px 20px;
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border: solid 2px;
    border-color: ${({ theme }) => theme.green};
  }
`;
