import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function StartButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authenticated", "true");
    navigate("/startQuestionnaire");
  };

  return (
    <Button size="lg" className="landing-btn" onClick={handleLogin}>
      Get Started
    </Button>
  );
}
