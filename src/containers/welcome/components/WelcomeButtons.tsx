import {
  LoginSection,
  LoginTitle,
  LoginSubtitle,
  ButtonContainer,
} from "../styles/WelcomeStyles";
import { ContinueAsGuestButton } from "./ContinueAsGuestButton";
import { CreateAnAccountButton } from "./CreateAnAccountButton";
import { WelcomeLoginButton } from "./WelcomeLoginButton";

interface WelcomeButtonsProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

export function WelcomeButtons({
  onSignUpClick,
  onLoginClick,
}: WelcomeButtonsProps) {
  return (
    <LoginSection>
      <LoginTitle>Get Started</LoginTitle>
      <LoginSubtitle>
        Choose how you'd like to begin your oral health journey
      </LoginSubtitle>
      <ButtonContainer>
        <ContinueAsGuestButton />
        <CreateAnAccountButton onClick={onSignUpClick} />
        <WelcomeLoginButton onClick={onLoginClick} />
      </ButtonContainer>
    </LoginSection>
  );
}
