import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Footer } from "../componenets/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export function Landing() {
  {
    /* useNavigation hook to navigate through routes once button is clicked */
  }
  const navigate = useNavigate();

  {
    /* function to set auth in localStorage and nav to correct page */
  }
  const handleLogin = () => {
    localStorage.setItem("authenticated", "true");
    navigate("/startQuestionnaire");
  };

  return (
    <div className="full-page-bg">
      <Card>
        <Card.Body className="card-style">
          <Card.Title style={{ marginTop: "20px" }} className="card-title">
            <img
              src="src/assets/logo2.png"
              alt="Logo"
              style={{ height: "90px", marginBottom: "5px" }}
            />
            <span style={{ color: "#EFEFEF", fontSize: "50px" }}>
              OralCheckr
            </span>
          </Card.Title>
          <Card.Text style={{ color: "#EFEFEF" }}>
            Welcome to OralCheckr, your personalized oral health checker app.
          </Card.Text>
          <Card.Text style={{ color: "#EFEFEF" }}>
            Take our questionnaire to get your oral health status and
            personalized recommendations
          </Card.Text>
          <Button
            style={{
              backgroundColor: "#D9B310",
              color: "#328CC1",
              fontWeight: "bold",
              borderColor: "#D9B310",
            }}
            size="lg"
            className="landing-btn"
            onClick={handleLogin}
          >
            Get Started
          </Button>{" "}
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
}
