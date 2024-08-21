import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../PageBackground";
import { DashboardContainer } from "./DashboardContainer";
import { DashboardCardContainer } from "./DashboardCardContainer";
import { DashboardCard } from "./DashboardCard";
import { faClipboardList, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths, getFullPath } from "../../common/constants/routes";

// Functional component for the dashboard
export function Dashboard() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard
            title="Questionnaire"
            description="Click here to complete/retake the oral health questionnaire. Get feedback to improve your oral health."
            buttonLink={getFullPath(RoutePaths.QUESTIONNAIRE)}
            icon={faClipboardList}
          />
          <DashboardCard
            title="Habit Tracker"
            description="Click here to track your oral health habits and see analytics and progress."
            buttonLink={getFullPath(RoutePaths.HABITS)}
            icon={faTasksAlt}
          />
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}
