import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PageBackground } from "../../components/PageBackground";
import { BackgroundEffects } from "../welcome/styles/WelcomeStyles";
import { AboutSection } from "../profile/components/support/AboutSection";
import { FAQSection } from "../profile/components/support/FAQSection";
import { ContactSection } from "../profile/components/support/ContactSection";
import { AuthContext } from "../authentication/AuthContext";
import { RoutePaths } from "../../common/constants/routes";
import {
  PageContainer,
  AboutContainer,
  AboutTitle,
  AboutTitleAccent,
  BackButtonContainer,
} from "./styles/AboutStyles";
import { SimpleBackButton } from "./styles/SimpleBackButton";

export function About() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleBack = () => {
    if (isAuthenticated) {
      navigate(RoutePaths.LANDING); // Go to dashboard for authenticated users
    } else {
      navigate("/"); // Go to welcome page for unauthenticated users
    }
  };

  return (
    <PageBackground>
      <BackgroundEffects />
      <PageContainer $isAuthenticated={isAuthenticated}>
        <AboutContainer>
          <BackButtonContainer>
            <SimpleBackButton onClick={handleBack}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginRight: "6px" }}
              />
              Back
            </SimpleBackButton>
          </BackButtonContainer>

          {isAuthenticated ? (
            <AboutTitle>About</AboutTitle>
          ) : (
            <AboutTitle>
              Support <AboutTitleAccent>Hub</AboutTitleAccent>
            </AboutTitle>
          )}
          <AboutSection />
          <FAQSection />
          <ContactSection />
        </AboutContainer>
      </PageContainer>
    </PageBackground>
  );
}
