import {
  LogoStyle,
  LogoImgStyle,
  LogoText,
  HeroTitleAccent,
} from "../styles/WelcomeStyles";

export function WelcomeLogo() {
  return (
    <LogoStyle>
      <LogoImgStyle src="images/logo-blue.png" alt="Logo" />
      <LogoText>
        Oral<HeroTitleAccent>Checkr</HeroTitleAccent>
      </LogoText>
    </LogoStyle>
  );
}
