import { RoutePaths } from "../../../common/constants/routes";
import {
  FooterContainer,
  FooterInner,
  FooterMain,
  FooterBrand,
  FooterEyebrow,
  FooterTitle,
  FooterTitleAccent,
  FooterCenter,
  FooterRight,
  FooterMeta,
  FooterCopyright,
  FooterCredits,
  FooterLink,
} from "../styles/FooterStyles";

export function Footer() {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterMain>
          <FooterBrand>
            <FooterEyebrow>Oral health, simplified</FooterEyebrow>
            <FooterTitle>
              Oral<FooterTitleAccent>Checkr</FooterTitleAccent>
            </FooterTitle>
          </FooterBrand>

          <FooterCenter>
            <FooterLink to={RoutePaths.ABOUT}>Support</FooterLink>
          </FooterCenter>

          <FooterRight>
            <FooterMeta>
              <FooterCopyright>© 2026 OralCheckr</FooterCopyright>
              <FooterCredits>
                Built with React and TypeScript. Designed and built by Jeffrey
                Patey.
              </FooterCredits>
            </FooterMeta>
          </FooterRight>
        </FooterMain>
      </FooterInner>
    </FooterContainer>
  );
}
