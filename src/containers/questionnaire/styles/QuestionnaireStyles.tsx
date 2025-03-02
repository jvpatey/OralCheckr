import styled from "styled-components";
import { NavigationButton } from "../../../components/questionnaire/NavigationButton";

export const QuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 375px) {
    padding: 10px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .progress-segment {
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.textGrey};
    border-radius: 4px;
    margin-right: 4px;

    &.filled {
      background-color: ${({ theme }) => theme.green};
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const ProgressIndicator = styled.div`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.blue};
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
`;

export const SubmitButton = styled(NavigationButton).attrs({ as: "a" })`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 1rem;
  padding: 10px 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 80px;
    font-size: 0.7rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 375px) {
    gap: 5px;
  }
`;

export const QuitButton = styled(NavigationButton)`
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

  @media (max-width: 375px) {
    padding: 8px 16px;
    font-size: 0.7rem;
  }
`;
