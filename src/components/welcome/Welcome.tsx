import styled, { keyframes } from "styled-components";
import { Card } from "react-bootstrap";
import { PageBackground } from "../PageBackground";
import { WelcomeNavBar } from "../../containers/welcome/WelcomeNavBar";
import { ThemeType } from "../../App";
import { ContinueAsGuestButton } from "./ContinueAsGuestButton";
import { CreateAnAccountButton } from "./CreateAnAccountButton";
import { SignUpModal } from "../../containers/welcome/SignUpModal";
import { LoginModal } from "../../containers/welcome/LoginModal";
import { WelcomeLoginButton } from "./WelcomeLoginButton";
import { useState } from "react";

interface WelcomeProps {
  themeToggler: () => void;
  theme: ThemeType;
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WelcomeCard = styled(Card)`
  width: 80vw;
  max-width: 800px;
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border: transparent;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeUp} 1s ease-out;
  height: auto;

  @media (min-width: 1200px) {
    max-width: 900px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80vw;
    max-width: 750px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    max-width: 700px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 90vw;
    padding: 10px;
  }

  @media (max-width: 375px) {
    width: 90vw;
    padding: 10px;
  }
`;

export const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const TitleText = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-bottom: 10px;
  text-align: center;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-top: 40px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const SubText = styled.h1`
  color: ${({ theme }) => theme.textGrey};
  margin-top: 10px;
  text-align: center;
  font-size: 1.5rem;
  margin-left: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
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
  margin-bottom: 20px;
  margin-right: 50px;
  margin-left: 50px;
  text-align: center;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 20px;
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const LogoStyle = styled.div`
  text-align: center;
`;

const LogoImgStyle = styled.img`
  height: 60px;
  margin-bottom: 25px;

  @media (max-width: 480px) {
    height: 50px;
  }
`;

const LogoText = styled.span`
  font-size: 3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.blue};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.blue};
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export function Welcome({ themeToggler, theme }: WelcomeProps) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowSignUpModal = () => setShowSignUpModal(true);
  const handleCloseSignUpModal = () => setShowSignUpModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  return (
    <PageBackground>
      <WelcomeContainer>
        <WelcomeCard>
          <WelcomeNavBar themeToggler={themeToggler} theme={theme} />
          <TitleText>Welcome to</TitleText>
          <LogoStyle>
            <LogoImgStyle src="images/logo-blue.png" alt="Logo" />
            <LogoText>OralCheckr</LogoText>
          </LogoStyle>
          <SubText>
            OralCheckr is a tool designed to help you self-assess your oral
            health. It provides habit tracking and personalized feedback to
            guide you on improving your oral hygiene and maintaining a healthy
            routine.
          </SubText>
          <CardText>
            To explore the app, you can continue as a{" "}
            <ColoredText>Guest.</ColoredText>
          </CardText>
          <CardText>
            <ColoredText>Create an account</ColoredText> or{" "}
            <ColoredText>Login</ColoredText> for a more personalized experience.
          </CardText>
          <ButtonContainer>
            <ContinueAsGuestButton />
            <CreateAnAccountButton onClick={handleShowSignUpModal} />
            <WelcomeLoginButton onClick={handleShowLoginModal} />
          </ButtonContainer>
          <SignUpModal
            show={showSignUpModal}
            handleClose={handleCloseSignUpModal}
          />
          <LoginModal
            show={showLoginModal}
            handleClose={handleCloseLoginModal}
          />
        </WelcomeCard>
      </WelcomeContainer>
    </PageBackground>
  );
}
