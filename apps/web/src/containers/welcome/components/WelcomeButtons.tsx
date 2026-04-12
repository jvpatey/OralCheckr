import {
  HeroButtonsContainer,
  HeroGuestHintRow,
} from "../styles/WelcomeStyles";
import { CreateAnAccountButton } from "./CreateAnAccountButton";
import { WelcomeLoginButton } from "./WelcomeLoginButton";
import { ContinueAsGuestButton } from "./ContinueAsGuestButton";

interface WelcomeButtonsProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

export function WelcomeButtons({
  onSignUpClick,
  onLoginClick,
}: WelcomeButtonsProps) {
  return (
    <>
      <HeroButtonsContainer>
        <CreateAnAccountButton onClick={onSignUpClick} />
        <WelcomeLoginButton onClick={onLoginClick} />
      </HeroButtonsContainer>
      <HeroGuestHintRow>
        Try it out as a guest — no commitment.{" "}
        <ContinueAsGuestButton appearance="inline" />
      </HeroGuestHintRow>
    </>
  );
}
