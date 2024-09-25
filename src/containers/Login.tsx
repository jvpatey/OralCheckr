import { Card, Alert } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { RoutePaths } from "../common/constants/routes";
import { getFullPath } from "../common/constants/routes";
import { PageBackground } from "../components/PageBackground";
import { useState } from "react";

// styled-component styles for Login Page
const AnimatedCard = styled(Card)`
  border-radius: 15px;
  border-color: ${({ theme }) => theme.blue};
  margin-top: 40px;
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
  background-color: ${({ theme }) => theme.blue};
  border-style: solid;
  border-width: 4px;
  border-color: ${({ theme }) => theme.blue};
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const LogoStyle = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const LogoImgStyle = styled.img`
  height: 60px;
  margin-bottom: 20px;
`;

const LogoText = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.backgroundColor};
`;

const TextStyle = styled(Card.Text)`
  color: ${({ theme }) => theme.backgroundColor};
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
`;

const LoginText = styled(Card.Text)`
  color: ${({ theme }) => theme.backgroundColor};
  font-size: x-large;
  font-weight: 600;
  text-align: center;
  margin-top: 30px;
`;

const UsernameStyle = styled(Form.Control)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  margin-top: 30px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.blue};

  ::placeholder {
    opacity: 1 !important;
    font-weight: 400;
  }
`;

const PasswordStyle = styled(Form.Control)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  margin-top: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.blue};

  ::placeholder {
    color: #07889b !important;
    opacity: 1 !important;
    font-weight: 400;
  }
`;

const Button = styled.button<{ $login?: boolean }>`
  background-color: ${(props) =>
    props.$login ? props.theme.green : props.theme.green};
  color: ${(props) => (props.$login ? props.theme.backgroundColor : props.theme.backgroundColor)};
  font-weight: bold;
  border: 2px solid ${(props) => (props.$login ? props.theme.blue : props.theme.blue)};
  width: 70%;
  margin-top: 10px;
  border-radius: 20px;
  padding: 0.5em 1em;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$login ? props.theme.backgroundColor : props.theme.backgroundColor};
    color: ${(props) => (props.$login ? props.theme.green : props.theme.green)};
    border-color: ${(props) => props.theme.backgroundColor};
    border-width: 2px;
  }
`;


const AlertWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Environment variables or default values
  const storedUsername = import.meta.env.VITE_USERNAME || "admin";
  const storedPassword = import.meta.env.VITE_PASSWORD || "admin";

  // Handle username input change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle form submission for login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("authenticated", "true");
      navigate(getFullPath(RoutePaths.LANDING));
    } else {
      setError("Invalid username or password");
    }
  };

  // Handle closing the alert
  const handleAlertClose = () => {
    setError("");
  };

  return (
    <PageBackground>
      <AnimatedCard>
        <CardBody>
          <LogoStyle>
            <LogoImgStyle src="./OralCheckr/images/logo-white.png" alt="Logo" />
            <LogoText>OralCheckr</LogoText>
          </LogoStyle>
          <TextStyle>
            Take our questionnaire to get insight on your oral health status,
            get personalized recommendations, and track your habits.
          </TextStyle>
          <LoginText>Login</LoginText>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formUsername" className="m-3">
              <UsernameStyle
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="m-3">
              <PasswordStyle
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
            </Form.Group>
            <AlertWrapper>
              <Alert
                show={!!error}
                variant="danger"
                dismissible
                onClose={handleAlertClose}
              >
                {error}
              </Alert>
            </AlertWrapper>
            <Button $login type="submit">
              Login
            </Button>
          </Form>
        </CardBody>
      </AnimatedCard>
      <Footer />
    </PageBackground>
  );
}
