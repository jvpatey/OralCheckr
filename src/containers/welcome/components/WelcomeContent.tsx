import {
  TitleText,
  SubText,
  CardText,
  ColoredText,
} from "../styles/WelcomeStyles";
import { WelcomeLogo } from "./WelcomeLogo";

export function WelcomeContent() {
  return (
    <>
      <TitleText>Welcome to</TitleText>
      <WelcomeLogo />
      <SubText>
        OralCheckr is a tool designed to help you self-assess your oral health.
        It provides habit tracking and personalized feedback to guide you on
        improving your oral hygiene and maintaining a healthy routine.
      </SubText>
      <CardText>
        To explore the app, you can continue as a{" "}
        <ColoredText>Guest.</ColoredText>
      </CardText>
      <CardText>
        <ColoredText>Create an account</ColoredText> or{" "}
        <ColoredText>Login</ColoredText> for a more personalized experience.
      </CardText>
    </>
  );
}
