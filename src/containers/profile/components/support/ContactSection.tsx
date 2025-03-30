import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { SectionTitle } from "../../styles/AccountTabStyles";
import {
  ContactSection as StyledContactSection,
  ContentBox,
  ContactItem,
  SubHeading,
  ContentText,
  StyledLink,
  SocialLinks,
  SocialLink,
} from "../../styles/SupportTabStyles";

export function ContactSection() {
  return (
    <StyledContactSection>
      <SectionTitle>Get in Touch</SectionTitle>
      <ContentBox>
        <ContactItem>
          <SubHeading>Contact</SubHeading>
          <ContentText>
            For any feedback, bug reports, or issues, please send an email to{" "}
            <StyledLink href="mailto:jeffreyvpatey@gmail.com">
              jeffreyvpatey@gmail.com
            </StyledLink>
          </ContentText>
        </ContactItem>

        <ContactItem>
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
        </ContactItem>
      </ContentBox>
    </StyledContactSection>
  );
}
