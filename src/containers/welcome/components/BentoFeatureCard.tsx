import {
  BentoCardContainer,
  BentoIcon,
  BentoTitle,
  BentoDescription,
} from "../styles/BentoGridStyles";

interface BentoFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  size: "small" | "medium" | "large";
  color: "primary" | "secondary" | "accent";
  gradient: string;
  index: number;
}

export function BentoFeatureCard({
  icon,
  title,
  description,
  size,
  color,
  gradient,
  index,
}: BentoFeatureCardProps) {
  return (
    <BentoCardContainer
      $size={size}
      $color={color}
      $gradient={gradient}
      $index={index}
    >
      <BentoIcon $color={color}>{icon}</BentoIcon>
      <BentoTitle>{title}</BentoTitle>
      <BentoDescription>{description}</BentoDescription>
    </BentoCardContainer>
  );
}
