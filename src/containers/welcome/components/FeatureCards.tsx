import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { FeatureCard } from "./FeatureCard";
import { FeatureCardsContainer } from "../styles/FeatureCardStyles";
import { RoutePaths } from "../../../common/constants/routes";
import { useNavigate } from "react-router-dom";

export function FeatureCards() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FontAwesomeIcon icon={faClipboardList} size="sm" />,
      title: "Health Assessment",
      description:
        "Complete a comprehensive questionnaire to evaluate your oral health status and receive personalized recommendations for improvement.",
      onClick: () => navigate(RoutePaths.QUESTIONNAIRE),
    },
    {
      icon: <FontAwesomeIcon icon={faTasksAlt} size="sm" />,
      title: "Habit Tracking",
      description:
        "Monitor your daily oral hygiene routine with detailed analytics, streak tracking, and progress insights to build lasting healthy habits.",
      onClick: () => navigate(RoutePaths.HABITS),
    },
  ];

  return (
    <FeatureCardsContainer>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          onClick={feature.onClick}
        />
      ))}
    </FeatureCardsContainer>
  );
}
