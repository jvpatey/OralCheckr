import { Card } from "react-bootstrap";
import { LogoTitle } from "../componenets/LogoTitle";
import { IntroText } from "../componenets/IntroText";
import { StartButton } from "../componenets/StartButton";
import { Footer } from "../componenets/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export function Landing() {
  return (
    <div className="full-page-bg">
      <Card className="animated-card">
        <Card.Body className="card-style">
          <LogoTitle />
          <IntroText />
          <StartButton />
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
}
