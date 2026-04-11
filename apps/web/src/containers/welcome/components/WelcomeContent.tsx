import {
  HeroEyebrow,
  HeroTitle,
  HeroTitleAccent,
  HeroSubtitle,
  HeroDescription,
  HeroTrustRow,
} from "../styles/WelcomeStyles";

export function WelcomeContent() {
  return (
    <>
      <HeroEyebrow>Oral health, simplified</HeroEyebrow>
      <HeroTitle>
        Oral<HeroTitleAccent>Checkr</HeroTitleAccent>
      </HeroTitle>
      <HeroSubtitle>
        Assess your habits, see what matters, and build a routine that sticks.
      </HeroSubtitle>
      <HeroDescription>
        Guided questionnaire, habit tracking, and clear insights—so you can
        focus on a healthier smile without the noise.
      </HeroDescription>
      <HeroTrustRow>Built for daily use · Free to start</HeroTrustRow>
    </>
  );
}
