import { HeroButtonsContainer } from "../styles/WelcomeStyles";
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
    <HeroButtonsContainer>
      <CreateAnAccountButton onClick={onSignUpClick} />
      <WelcomeLoginButton onClick={onLoginClick} />
    </HeroButtonsContainer>
  );
}
