import React from "react";
import {
  FeatureCardContainer,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from "../styles/FeatureCardStyles";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon,
  title,
  description,
  onClick,
}: FeatureCardProps) {
  return (
    <FeatureCardContainer onClick={onClick}>
      <FeatureIcon>{icon}</FeatureIcon>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureCardContainer>
  );
}
