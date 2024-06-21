import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export function Landing() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authenticated", "true");
    navigate("/startQuestionnaire");
  };

  return (
    <div className="full-page-bg">
      <Card className="animated-card">
        <Card.Body className="card-style">
          <div className="logo-style">
            <img
              src="public/images/logo2.png"
              alt="Logo"
              style={{ height: "90px", marginBottom: "5px" }}
            />
            <span style={{ color: "#EFEFEF", fontSize: "50px" }}>
              OralCheckr
            </span>
          </div>
          <Card.Text className="text-style">
            Welcome to OralCheckr, your personalized oral health checker app.
          </Card.Text>
          <Card.Text className="text-style">
            Take our questionnaire to get your oral health status and
            personalized recommendations.
          </Card.Text>
          <Button size="lg" className="landing-btn" onClick={handleLogin}>
            Get Started
          </Button>
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
}
