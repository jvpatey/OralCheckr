import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
    <div>
      <h1>Welcome to Oralcheckr</h1>
      <p>This is the landing page</p>
      {/* temporary button to test auth */}
      <Button onClick={handleLogin} variant="info">
        Go to Questionnaire
      </Button>{" "}
    </div>
  );
}
