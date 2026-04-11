import { RoutePaths } from "../../../common/constants/routes";
import {
  FooterContainer,
  FooterContent,
  FooterCopyright,
  FooterLink,
  FooterCredits,
} from "../styles/FooterStyles";

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterCopyright>© 2025 OralCheckr</FooterCopyright>
        <FooterCredits>
          Built with React & TypeScript • Designed & Built by Jeffrey Patey
        </FooterCredits>
        <FooterLink to={RoutePaths.ABOUT}>Support</FooterLink>
      </FooterContent>
    </FooterContainer>
  );
}
