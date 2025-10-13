import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { SectionTitle } from "../../styles/AccountTabStyles";
import {
  ContentSection,
  ContentBox,
  ContentItem,
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
      <SectionTitle>Get in Touch</SectionTitle>
      <ContentBox>
        <ContentItem>
          <SubHeading>Contact</SubHeading>
          <ContentText style={{ marginBottom: "1.5rem" }}>
            For any feedback, bug reports, or issues, please fill out the form
            below and I'll get back to you as soon as possible.
          </ContentText>
          <ContactForm />
        </ContentItem>

        <ContentItem>
          <SubHeading>Connect</SubHeading>
          <ContentText>
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
        </ContentItem>
      </ContentBox>
    </ContentSection>
  );
}
