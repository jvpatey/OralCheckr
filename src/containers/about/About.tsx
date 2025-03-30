import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AboutSection } from "../profile/components/support/AboutSection";
import { FAQSection } from "../profile/components/support/FAQSection";
import { ContactSection } from "../profile/components/support/ContactSection";
import { AuthContext } from "../authentication/AuthContext";
import { RoutePaths } from "../../common/constants/routes";
import {
  PageContainer,
  AboutCard,
  AboutTitle,
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
    <PageContainer>
      <AboutCard>
        <BackButtonContainer>
          <SimpleBackButton onClick={handleBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ marginRight: "6px" }}
            />
            Back
          </SimpleBackButton>
        </BackButtonContainer>

        <AboutTitle>About OralCheckr</AboutTitle>
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </AboutCard>
    </PageContainer>
  );
}
