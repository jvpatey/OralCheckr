import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { FeatureCard } from "./FeatureCard";
import { FeatureCardsContainer } from "../styles/FeatureCardStyles";

export function FeatureCards() {
  const features = [
    {
      icon: <FontAwesomeIcon icon={faClipboardList} size="sm" />,
      title: "Health Assessment",
      description:
        "Complete a comprehensive questionnaire to evaluate your oral health status and receive personalized recommendations for improvement.",
    },
    {
      icon: <FontAwesomeIcon icon={faTasksAlt} size="sm" />,
      title: "Habit Tracking",
      description:
        "Monitor your daily oral hygiene routine with detailed analytics, streak tracking, and progress insights to build lasting healthy habits.",
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
        />
      ))}
    </FeatureCardsContainer>
  );
}
