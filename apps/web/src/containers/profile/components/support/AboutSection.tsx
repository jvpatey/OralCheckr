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
          OralCheckr is an oral health tracking app designed to help you build
          consistent daily routines and monitor your progress over time. It
          includes a comprehensive questionnaire, an Oral Health Summary with
          personalized recommendations, and habit tracking to support long-term
          improvement. You can also open your Oral Health Report to print or
          save a copy for your dental professional.
        </ContentText>
      </ContentBox>
    </SupportSection>
  );
}
