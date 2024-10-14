import { useState } from "react";
import { getScoreColor } from "../questionnaire/OralHealthStatus";
import styled from "styled-components";
import { PageBackground } from "../PageBackground";
import { WelcomeNavBar } from "./WelcomeNavBar";
import { ProgressBar } from "react-bootstrap";
import { WelcomeCard, WelcomeContainer } from "./Welcome";
import { SignUpModal } from "./SignUpModal";
import { ThemeType } from "../../App";

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
  margin-bottom: 30px;

  .progress {
    background-color: ${({ theme }) => theme.backgroundColor};
    width: 80%;
    height: 40px;
    border-radius: 15px;
  }

  .progress-bar {
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
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
            <ProgressBar
              now={score}
              label={`${score}%`}
              style={{
                width: "80%",
                height: "40px",
                borderRadius: "15px",
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${score}%`,
                  backgroundColor: scoreColor,
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {score}%
              </div>
            </ProgressBar>
          </ProgressBarContainer>

          <SubText>
            Want to improve your oral health?
            <ColoredText> Create an account</ColoredText> to receive
            personalized recommendations and start tracking your habits.
          </SubText>

          <ButtonWrapper>
            <SignUpButton onClick={handleShowModal}>
              Create an Account
            </SignUpButton>
          </ButtonWrapper>

          <SignUpModal show={showModal} handleClose={handleCloseModal} />
        </WelcomeCard>
      </WelcomeContainer>
    </PageBackground>
  );
}
