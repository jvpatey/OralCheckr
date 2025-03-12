import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";
import { useHandleGuestLogin } from "../../../hooks/questionnaire/useHandleGuestLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../../containers/authentication/AuthContext";
import { Button } from "./Button";
import { GuestConfirmationModal } from "./GuestConfirmationModal";

export function ContinueAsGuestButton() {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);
  const { mutate: loginAsGuest, isPending } = useHandleGuestLogin();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
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

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button variant="guest" onClick={handleButtonClick} disabled={isPending}>
        {isPending ? "Logging in..." : "Continue as Guest"}
      </Button>

      <GuestConfirmationModal
        show={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
