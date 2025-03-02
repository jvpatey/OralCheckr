import { useState } from "react";
import { PageBackground } from "../../components/PageBackground";
import { WelcomeNavBar } from "./WelcomeNavBar";
import { ThemeType } from "../../App";
import { SignUpModal } from "./SignUpModal";
import { LoginModal } from "./LoginModal";
import { WelcomeContent, WelcomeButtons } from "./components";
import { WelcomeCard, WelcomeContainer } from "./styles/WelcomeStyles";

interface WelcomeProps {
  themeToggler: () => void;
  theme: ThemeType;
}

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
          <WelcomeContent />
          <WelcomeButtons
            onSignUpClick={handleShowSignUpModal}
            onLoginClick={handleShowLoginModal}
          />
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
