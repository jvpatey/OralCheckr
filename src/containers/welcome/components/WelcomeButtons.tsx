import { ButtonContainer } from "../styles/WelcomeStyles";
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
    <ButtonContainer>
      <ContinueAsGuestButton />
      <CreateAnAccountButton onClick={onSignUpClick} />
      <WelcomeLoginButton onClick={onLoginClick} />
    </ButtonContainer>
  );
}
