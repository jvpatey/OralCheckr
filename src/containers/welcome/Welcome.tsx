import { useState } from "react";
import { PageBackground } from "../../components/PageBackground";
import { WelcomeNavBar } from "./WelcomeNavBar";
import { ThemeType } from "../../App";
import { SignUpModal } from "./SignUpModal";
import { LoginModal } from "./LoginModal";
import { WelcomeContent, WelcomeButtons, FeatureCards } from "./components";
import { WelcomeCard, WelcomeContainer } from "./styles/WelcomeStyles";

// Props for welcome page
interface WelcomeProps {
  themeToggler: () => void;
  theme: ThemeType;
}

// Welcome page with sign up and login options
export function Welcome({ themeToggler, theme }: WelcomeProps) {
  // Modal state management
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Modal handlers
  const handleShowSignUpModal = () => setShowSignUpModal(true);
  const handleCloseSignUpModal = () => setShowSignUpModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  // Welcome page view
  return (
    <PageBackground>
      <WelcomeContainer>
        <WelcomeCard>
          <WelcomeNavBar themeToggler={themeToggler} theme={theme} />
          <WelcomeContent />
          <FeatureCards />
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
