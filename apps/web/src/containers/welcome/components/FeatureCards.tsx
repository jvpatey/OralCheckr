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
      title: "Oral health questionnaire",
      description:
        "A structured check-in that surfaces priorities and next steps tailored to you.",
      size: "medium",
    },
    {
      id: "tracking",
      icon: <FontAwesomeIcon icon={faTasksAlt} size="lg" />,
      title: "Habit tracking",
      description:
        "Log routines, keep streaks, and see consistency at a glance.",
      size: "medium",
    },
    {
      id: "analytics",
      icon: <FontAwesomeIcon icon={faChartLine} size="sm" />,
      title: "Analytics and insights",
      description:
        "Month and year views with calendars and trends so progress feels tangible.",
      size: "small",
    },
    {
      id: "recommendations",
      icon: <FontAwesomeIcon icon={faLightbulb} size="sm" />,
      title: "Smart recommendations",
      description:
        "Practical tips grounded in your latest assessment—not generic advice.",
      size: "small",
    },
    {
      id: "progress",
      icon: <FontAwesomeIcon icon={faCalendarCheck} size="sm" />,
      title: "Progress visualization",
      description:
        "Heatmaps and calendars that make momentum easy to spot.",
      size: "small",
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
          index={index}
        />
      ))}
    </BentoGridContainer>
  );
}
