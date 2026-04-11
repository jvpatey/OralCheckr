import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
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
  index: number;
}

export function BentoFeatureCard({
  icon,
  title,
  description,
  size,
  index,
}: BentoFeatureCardProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <BentoCardContainer
      ref={ref}
      $size={size}
      $index={index}
      $isVisible={isVisible}
    >
      <BentoIcon>{icon}</BentoIcon>
      <BentoTitle>{title}</BentoTitle>
      <BentoDescription>{description}</BentoDescription>
    </BentoCardContainer>
  );
}
