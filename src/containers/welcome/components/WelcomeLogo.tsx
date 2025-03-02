import { LogoStyle, LogoImgStyle, LogoText } from "../styles/WelcomeStyles";

export function WelcomeLogo() {
  return (
    <LogoStyle>
      <LogoImgStyle src="images/logo-blue.png" alt="Logo" />
      <LogoText>OralCheckr</LogoText>
    </LogoStyle>
  );
}
