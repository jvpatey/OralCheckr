import styled, { keyframes } from "styled-components";
import { Card } from "react-bootstrap";
import { PageBackground } from "./PageBackground";

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
  height: auto;
  max-height: calc(100vh - 100px);
  min-height: 70vh;
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border: transparent;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeUp} 1s ease-out;

  @media (min-width: 1200px) {
    max-width: 900px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80vw;
    max-width: 750px;
    max-height: calc(100vh - 80px);
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    max-width: 700px;
    padding: 10px;
    max-height: calc(100vh - 100px);
  }

  @media (max-width: 375px) {
    width: 70vw;
    padding: 8px;
  }
`;

const WelcomeContainer = styled.div`
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
  margin-top: 50px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-top: 40px;
    margin-bottom: 10px;
  }
`;

export const SubText = styled.h1`
  color: ${({ theme }) => theme.textGrey};
  margin-top: 10px;
  text-align: center;
  font-size: 1.5rem;
  margin-left: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
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
`;

const LogoStyle = styled.div`
  text-align: center;
`;

const LogoImgStyle = styled.img`
  height: 60px;
  margin-bottom: 25px;
`;

const LogoText = styled.span`
  font-size: 3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.blue};
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.blue};
  font-weight: 600;
`;

export function Welcome() {
  return (
    <PageBackground>
      <WelcomeContainer>
        <WelcomeCard>
        <TitleText>Welcome to</TitleText>
        <LogoStyle>
              <LogoImgStyle src="images/logo-blue.png" alt="Logo" />
              <LogoText>OralCheckr</LogoText>
        </LogoStyle>
        <SubText>OralCheckr is a tool designed to help you self-assess your oral health. 
          It provides habit tracking and personalized feedback to guide you on improving 
          your oral hygiene and maintaining a healthy routine.</SubText>
        <CardText>To find out your <ColoredText> oral health score</ColoredText>, take our quick and easy
          <ColoredText> questionnaire</ColoredText>.</CardText>
        <CardText>Once you've completed the questionnaire, you can <ColoredText>create an account</ColoredText> to
        track your progress and maintain healthy habits.</CardText>
        </WelcomeCard>
      </WelcomeContainer>
    </PageBackground>
  );
}
