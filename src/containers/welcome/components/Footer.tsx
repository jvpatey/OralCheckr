import { RoutePaths } from "../../../common/constants/routes";
import {
  FooterContainer,
  FooterContent,
  FooterCopyright,
  FooterLink,
} from "../styles/FooterStyles";

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterCopyright>© 2025 OralCheckr</FooterCopyright>
        <FooterLink to={RoutePaths.ABOUT}>Support</FooterLink>
      </FooterContent>
    </FooterContainer>
  );
}
