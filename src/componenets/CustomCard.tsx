import { Card } from "react-bootstrap";
import { LogoTitle } from "./LogoTitle";
import { IntroText } from "./IntroText";
import { StartButton } from "./StartButton";

export function CustomCard() {
  return (
    <Card className="animated-card">
      <Card.Body className="card-style">
        <LogoTitle />
        <IntroText />
        <StartButton />
      </Card.Body>
    </Card>
  );
}
