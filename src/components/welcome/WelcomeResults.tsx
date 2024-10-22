import { useState } from "react";
import { getScoreColor } from "../questionnaire/OralHealthStatus";
import styled from "styled-components";
import { PageBackground } from "../PageBackground";
import { WelcomeNavBar } from "../../containers/welcome/WelcomeNavBar";
import { WelcomeCard, WelcomeContainer } from "./Welcome";
import { SignUpModal } from "../../containers/welcome/SignUpModal";
import { ThemeType } from "../../App";
import { ProgressBar as BootstrapProgressBar } from "react-bootstrap";

export const TitleText = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-bottom: 10px;
  text-align: center;
  font-size: 2.25rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-top: 40px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SubText = styled.h1`
  color: ${({ theme }) => theme.textGrey};
  margin-top: 10px;
  text-align: center;
  font-size: 1.5rem;
  margin-left: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 15px;
  }
`;

const CardText = styled.h5`
  color: ${({ theme }) => theme.textGrey};
  margin-top: 40px;
  margin-bottom: 10px;
  margin-right: 50px;
  margin-left: 50px;
  text-align: center;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-right: 20px;
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const SignUpButton = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1.25rem;
  margin: 10px;
  width: 40%;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border: solid 2px ${({ theme }) => theme.green};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground};
    border: solid 2px ${({ theme }) => theme.disabledText};
    color: ${({ theme }) => theme.disabledText};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 40%;
    font-size: 0.8rem;
  }
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.blue};
  font-weight: 600;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
`;

const ProgressBarStyled = styled(BootstrapProgressBar)<{ $scoreColor: string }>`
  width: 90%;
  max-width: 700px;
  height: 40px;
  border-radius: 15px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.backgroundColor};

  .progress {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-radius: 15px;
  }

  .progress-bar {
    background-color: ${({ $scoreColor }) => $scoreColor};
    color: ${({ theme }) => theme.backgroundColor};
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
  }
`;

interface WelcomeResultsProps {
  themeToggler: () => void;
  theme: ThemeType;
}

export function WelcomeResults({ themeToggler, theme }: WelcomeResultsProps) {
  const [showModal, setShowModal] = useState(false);
  const storedScore = localStorage.getItem("totalScore");
  const score = storedScore ? parseInt(storedScore, 10) : 0;
  const scoreColor = getScoreColor(score);
  const handleToggleModal = (mode: boolean) => {
    setShowModal(mode);
  };

  return (
    <PageBackground>
      <WelcomeContainer>
        <WelcomeCard>
          <WelcomeNavBar themeToggler={themeToggler} theme={theme} />
          <TitleText>Your Results</TitleText>
          <CardText>
            Based on your responses, your oral health score is:
          </CardText>

          <ProgressBarContainer>
            <ProgressBarStyled
              now={score}
              label={`${score}%`}
              $scoreColor={scoreColor}
            />
          </ProgressBarContainer>

          <SubText>
            Want to improve your oral health?
            <ColoredText> Create an account</ColoredText> to receive
            personalized recommendations and start tracking your habits.
          </SubText>

          <ButtonWrapper>
            <SignUpButton onClick={() => handleToggleModal(true)}>
              Create an Account
            </SignUpButton>
          </ButtonWrapper>

          <SignUpModal
            show={showModal}
            handleClose={() => handleToggleModal(false)}
          />
        </WelcomeCard>
      </WelcomeContainer>
    </PageBackground>
  );
}
