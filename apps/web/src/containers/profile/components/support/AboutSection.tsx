import {
  SupportSection,
  SupportSectionTitle,
  ContentBox,
  ContentText,
} from "../../../../containers/about/styles/AboutContentStyles";

// About section component
export function AboutSection() {
  return (
    <SupportSection>
      <SupportSectionTitle>About OralCheckr</SupportSectionTitle>
      <ContentBox style={{ marginBottom: "2rem" }}>
        <ContentText>
          OralCheckr is a dental health tracking application designed to help
          you maintain good oral hygiene habits and monitor your oral health
          over time. The app features a comprehensive assessment to evaluate
          your oral health status and provides a habit tracking system to help
          you build consistent dental care routines.
        </ContentText>
      </ContentBox>
    </SupportSection>
  );
}
