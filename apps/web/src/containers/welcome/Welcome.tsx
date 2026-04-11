import { useState } from "react";
import { PageBackground } from "../../components/PageBackground";
import { WelcomeNavBar } from "./WelcomeNavBar";
import { ThemeType } from "../../App";
import { SignUpModal } from "./SignUpModal";
import { LoginModal } from "./LoginModal";
import {
  WelcomeContent,
  WelcomeButtons,
  FeatureCards,
  Footer,
} from "./components";
import {
  ModernWelcomeContainer,
  HeroSection,
  FeatureSection,
  BackgroundEffects,
} from "./styles/WelcomeStyles";

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
      <BackgroundEffects />
      <ModernWelcomeContainer>
        <WelcomeNavBar themeToggler={themeToggler} theme={theme} />

        <HeroSection id="hero">
          <WelcomeContent />
          <WelcomeButtons
            onSignUpClick={handleShowSignUpModal}
            onLoginClick={handleShowLoginModal}
          />
        </HeroSection>

        <FeatureSection id="features">
          <FeatureCards />
        </FeatureSection>
      </ModernWelcomeContainer>

      <Footer />

      <SignUpModal
        show={showSignUpModal}
        handleClose={handleCloseSignUpModal}
      />
      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
    </PageBackground>
  );
}
