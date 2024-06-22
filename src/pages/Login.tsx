import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="full-page-bg">
      <Card className="animated-card">
        <Card.Body className="card-style">
          <div className="logo-style">
            <img
              src="public/images/logo2.png"
              alt="Logo"
              style={{ height: "60px", marginBottom: "20px" }}
            />
            <span style={{ color: "#EFEFEF", fontSize: "35px" }}>
              OralCheckr
            </span>
          </div>
          <Card.Text className="text-style">
            Improve your oral health today.
          </Card.Text>
          <Card.Text className="text-style">
            Take our questionnaire to get insight on your oral health status,
            get personalized recommendations, and track your habits.
          </Card.Text>
          <Card.Text className="login-text">Login</Card.Text>
          <Form>
            <Form.Group controlId="formUsername" className="m-3">
              <Form.Control
                className="username-style"
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="m-3">
              <Form.Control
                className="password-style"
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Button className="landing-btn" onClick={handleLogin}>
              Get Started
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
}
