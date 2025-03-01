import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePaths } from "../../common/constants/routes";
import { useHandleGuestLogin } from "../../hooks/questionnaire/useHandleGuestLogin";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

const Button = styled.button`
  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.accentBackgroundColor};
  border: 2px solid ${({ theme }) => theme.darkGrey};
  width: 45%;
  margin: 10px;
  border-radius: 10px;
  padding: 0.5em 1em;
  cursor: pointer;
  display: block;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.darkGrey};
    border-color: ${({ theme }) => theme.darkGrey};
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 1rem;
    padding: 0.4em 0.8em;
  }
`;

export function ContinueAsGuestButton() {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);
  const { mutate: loginAsGuest, isPending } = useHandleGuestLogin();

  const handleContinueAsGuestClick = () => {
    loginAsGuest(undefined, {
      onSuccess: (data) => {
        updateAuth({ userId: data.userId, role: data.role });
        navigate(RoutePaths.LANDING);
      },
      onError: (error) => {
        console.error("Failed to log in as guest:", error);
      },
    });
  };

  return (
    <Button onClick={handleContinueAsGuestClick} disabled={isPending}>
      {isPending ? "Logging in..." : "Continue as Guest"}
    </Button>
  );
}
