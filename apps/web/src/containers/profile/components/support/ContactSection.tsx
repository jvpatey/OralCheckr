import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { SupportSectionTitle } from "../../../../containers/about/styles/AboutContentStyles";
import {
  ContentSection,
  ContentBox,
  SubHeading,
  ContentText,
  SocialLinks,
  SocialLink,
} from "../../../../containers/about/styles/AboutContentStyles";
import { ContactForm } from "../../../../components/shared/ContactForm";

// Contact section component
export function ContactSection() {
  return (
    <ContentSection>
      <SupportSectionTitle>Get in Touch</SupportSectionTitle>
      <ContentBox>
        <SubHeading>Contact</SubHeading>
        <ContentText style={{ marginBottom: "1rem" }}>
          For any feedback, bug reports, or issues, please fill out the form
          below and I'll get back to you as soon as possible.
        </ContentText>
        <ContactForm />
      </ContentBox>

      <ContentBox>
        <SubHeading>Connect</SubHeading>
        <ContentText style={{ marginBottom: "0.25rem" }}>
          Thanks for checking out my app! To see my other projects or connect
          with me professionally:
        </ContentText>
        <SocialLinks>
          <SocialLink
            href="https://github.com/jvpatey"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub as any} /> GitHub
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/jeffreypatey/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin as any} /> LinkedIn
          </SocialLink>
        </SocialLinks>
      </ContentBox>
    </ContentSection>
  );
}
