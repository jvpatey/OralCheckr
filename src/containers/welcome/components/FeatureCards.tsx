import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faTasksAlt,
  faChartLine,
  faLightbulb,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { BentoFeatureCard } from "./BentoFeatureCard";
import { BentoGridContainer } from "../styles/BentoGridStyles";

export function FeatureCards() {
  const features = [
    {
      id: "assessment",
      icon: <FontAwesomeIcon icon={faClipboardList} size="lg" />,
      title: "Oral Health Questionnaire",
      description:
        "Comprehensive questionnaire to evaluate your oral health status and receive personalized recommendations.",
      size: "medium",
      color: "primary",
      gradient: "primaryGradient",
    },
    {
      id: "tracking",
      icon: <FontAwesomeIcon icon={faTasksAlt} size="lg" />,
      title: "Habit Tracking",
      description:
        "Monitor daily oral hygiene routines with streak tracking and progress insights.",
      size: "medium",
      color: "secondary",
      gradient: "secondaryGradient",
    },
    {
      id: "analytics",
      icon: <FontAwesomeIcon icon={faChartLine} size="sm" />,
      title: "Analytics & Insights",
      description:
        "Detailed monthly and yearly progress tracking with calendar views and data insights.",
      size: "small",
      color: "accent",
      gradient: "accentGradient",
    },
    {
      id: "recommendations",
      icon: <FontAwesomeIcon icon={faLightbulb} size="sm" />,
      title: "Smart Recommendations",
      description:
        "Personalized tips and suggestions based on your assessment results.",
      size: "small",
      color: "primary",
      gradient: "primaryGradient",
    },
    {
      id: "progress",
      icon: <FontAwesomeIcon icon={faCalendarCheck} size="sm" />,
      title: "Progress Visualization",
      description:
        "Calendar views, heatmaps, and streak tracking to visualize your journey.",
      size: "small",
      color: "secondary",
      gradient: "secondaryGradient",
    },
  ];

  return (
    <BentoGridContainer>
      {features.map((feature, index) => (
        <BentoFeatureCard
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          size={feature.size as "small" | "medium" | "large"}
          color={feature.color as "primary" | "secondary" | "accent"}
          gradient={feature.gradient}
          index={index}
        />
      ))}
    </BentoGridContainer>
  );
}
