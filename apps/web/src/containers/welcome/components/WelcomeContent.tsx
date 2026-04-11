import {
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  ColoredText,
} from "../styles/WelcomeStyles";

export function WelcomeContent() {
  return (
    <>
      <HeroTitle>
        <ColoredText>OralCheckr</ColoredText>
      </HeroTitle>
      <HeroSubtitle>
        Your personal oral health companion
      </HeroSubtitle>
      <HeroDescription>
        Take control of your oral health with personalized assessments and habit tracking. 
        Start your journey to a healthier smile today.
      </HeroDescription>
    </>
  );
}
