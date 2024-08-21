import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "./LandingContainer";
import { LandingCardContainer } from "./LandingCardContainer";
import { LandingCard } from "./LandingCard";
import { faClipboardList, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths, getFullPath } from "../../common/constants/routes";

// Functional component for the Landing
export function Landing() {
  return (
    <PageBackground>
      <LandingContainer>
        <LandingCardContainer>
          <LandingCard
            title="Questionnaire"
            description="Click here to complete/retake the oral health questionnaire. Get feedback to improve your oral health."
            buttonLink={getFullPath(RoutePaths.QUESTIONNAIRE)}
            icon={faClipboardList}
          />
          <LandingCard
            title="Habit Tracker"
            description="Click here to track your oral health habits and see analytics and progress."
            buttonLink={getFullPath(RoutePaths.HABITS)}
            icon={faTasksAlt}
          />
        </LandingCardContainer>
      </LandingContainer>
    </PageBackground>
  );
}
