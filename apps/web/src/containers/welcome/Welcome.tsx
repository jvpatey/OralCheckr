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
  HeroAppPreview,
  WelcomeHeroWaveBands,
} from "./components";
import {
  ModernWelcomeContainer,
  HeroSection,
  HeroGrid,
  HeroCopy,
  HeroPreviewColumn,
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
      <WelcomeNavBar themeToggler={themeToggler} theme={theme} />
      <ModernWelcomeContainer>
        <HeroSection id="hero">
          <WelcomeHeroWaveBands />
          <HeroGrid>
            <HeroCopy>
              <WelcomeContent />
              <WelcomeButtons
                onSignUpClick={handleShowSignUpModal}
                onLoginClick={handleShowLoginModal}
              />
            </HeroCopy>
            <HeroPreviewColumn>
              <HeroAppPreview theme={theme} />
            </HeroPreviewColumn>
          </HeroGrid>
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
