import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { RoutePaths } from "../common/Routes";
import { getFullPath } from "../common/Routes";
import { PageBackground } from "../components/styled/PageBackground";

// styled-component styles for Login Page

const AnimatedCard = styled(Card)`
  border-radius: 15px;
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const CardBody = styled(Card.Body)`
  max-width: 400px;
  min-height: 600px;
  background-color: #f5f5f5;
  border-style: solid;
  border-width: 4px;
  border-color: #07889b;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
`;

const LogoStyle = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const LogoImgStyle = styled.img`
  height: 60px;
  margin-bottom: 20px;
`;

const LogoTextStyle = styled.span`
  color: #222831;
  font-size: 35px;
`;

const TextStyle = styled(Card.Text)`
  color: #222831;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
`;

const LoginText = styled(Card.Text)`
  color: #222831;
  font-size: x-large;
  font-weight: 600;
  text-align: center;
  margin-top: 50px;
`;

const UsernameStyle = styled(Form.Control)`
  background-color: #f5f5f5;
  margin-top: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: #222831;

  ::placeholder {
    color: #07889b !important;
    opacity: 1 !important;
    font-weight: 400;
  }
`;

const PasswordStyle = styled(Form.Control)`
  background-color: #f5f5f5;
  margin-top: 30px;
  border-style: solid;
  border-width: 2px;
  border-color: #222831;

  ::placeholder {
    color: #07889b !important;
    opacity: 1 !important;
    font-weight: 400;
  }
`;

const Button = styled.button<{ $login?: boolean }>`
  background-color: ${(props) => (props.$login ? "#07889B" : "white")};
  color: ${(props) => (props.$login ? "#F5F5F5" : "#07889B")};
  font-weight: bold;
  border: 2px solid ${(props) => (props.$login ? "#0375B4" : "#07889B")};
  width: 60%;
  margin-top: 30px;
  border-radius: 20px;
  padding: 0.5em 1em;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$login ? "#F5F5F5" : "#07889B")};
    color: ${(props) => (props.$login ? "#07889B" : "#F5F5F5")};
    border-color: #07889b;
    border-width: 2px;
  }
`;

export function Login() {
  const navigate = useNavigate();

  // Handle login button click
  const handleLogin = () => {
    localStorage.setItem("authenticated", "true"); // Set authentication status in local storage
    navigate(getFullPath(RoutePaths.DASHBOARD)); // Navigate to the dashboard page
  };

  return (
    <PageBackground>
      <AnimatedCard>
        <CardBody>
          <LogoStyle>
            <LogoImgStyle src="./OralCheckr/images/logo2.png" alt="Logo" />
            <LogoTextStyle>OralCheckr</LogoTextStyle>
          </LogoStyle>
          <TextStyle>Improve your oral health today.</TextStyle>
          <TextStyle>
            Take our questionnaire to get insight on your oral health status,
            get personalized recommendations, and track your habits.
          </TextStyle>
          <LoginText>Login</LoginText>
          <Form>
            <Form.Group controlId="formUsername" className="m-3">
              <UsernameStyle type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formPassword" className="m-3">
              <PasswordStyle type="password" placeholder="Enter password" />
            </Form.Group>
            <Button $login onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </CardBody>
      </AnimatedCard>
      <Footer />
    </PageBackground>
  );
}
