import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function StartButton() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authenticated", "true");
    navigate("/startQuestionnaire");
  };

  return (
    <Button
      style={{
        backgroundColor: isHovered ? "#0B3C5D" : "#D9B310",
        color: isHovered ? "#D9B310" : "#328CC1",
        fontWeight: "bold",
        borderColor: isHovered ? "#0B3C5D" : "#D9B310",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s",
        margin: "auto",
        marginTop: "50px",
      }}
      size="lg"
      className="landing-btn"
      onClick={handleLogin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Get Started
    </Button>
  );
}
