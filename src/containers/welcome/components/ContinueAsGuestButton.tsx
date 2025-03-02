import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";
import { useHandleGuestLogin } from "../../../hooks/questionnaire/useHandleGuestLogin";
import { useContext } from "react";
import { AuthContext } from "../../../containers/authentication/AuthContext";
import { Button } from "./Button";

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
    <Button
      variant="guest"
      onClick={handleContinueAsGuestClick}
      disabled={isPending}
    >
      {isPending ? "Logging in..." : "Continue as Guest"}
    </Button>
  );
}
