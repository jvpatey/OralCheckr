import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";
import { useHandleGuestLogin } from "../../../hooks/questionnaire/useHandleGuestLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../../containers/authentication/AuthContext";
import { Button } from "./Button";
import { GuestConfirmationModal } from "./GuestConfirmationModal";

const InlineGuestTrigger = styled.button`
  display: inline;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.primaryDark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
    border-radius: 4px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

interface ContinueAsGuestButtonProps {
  onClose?: () => void;
  /** Default pill button; inline text link for hero and compact UI */
  appearance?: "button" | "inline";
}

export function ContinueAsGuestButton({
  onClose,
  appearance = "button",
}: ContinueAsGuestButtonProps) {
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
        const guestUser = {
          userId: data.userId,
          role: "guest",
          firstName: "Guest",
          lastName: "User",
        };

        updateAuth(guestUser);
        navigate(RoutePaths.LANDING);
        // Close the signup modal if onClose is provided
        onClose?.();
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
      {appearance === "inline" ? (
        <InlineGuestTrigger
          type="button"
          onClick={handleButtonClick}
          disabled={isPending}
        >
          {isPending ? "Starting…" : "Continue as guest"}
        </InlineGuestTrigger>
      ) : (
        <Button variant="guest" onClick={handleButtonClick} disabled={isPending}>
          {isPending ? "Logging in..." : "Continue as Guest"}
        </Button>
      )}

      <GuestConfirmationModal
        show={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
