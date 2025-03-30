import { useState } from "react";
import { Toast } from "react-bootstrap";
import {
  StyledToastContainer,
  SettingsContainer,
} from "../../styles/AccountTabStyles";
import { EmailSection } from "../account/EmailSection";
import { PasswordSection } from "../account/PasswordSection";
import { DeleteAccountSection } from "../account/DeleteAccountSection";

interface AccountTabProps {
  currentEmail: string;
  refetch: () => Promise<any>;
}

export function AccountTab({ currentEmail, refetch }: AccountTabProps) {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setShowToast(true);
  };

  return (
    <>
      <StyledToastContainer>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={message?.type === "success" ? "success" : "danger"}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {message?.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body
            className={message?.type === "success" ? "text-white" : ""}
          >
            {message?.text}
          </Toast.Body>
        </Toast>
      </StyledToastContainer>

      <SettingsContainer>
        <EmailSection
          currentEmail={currentEmail}
          refetch={refetch}
          showToast={handleShowToast}
        />

        <PasswordSection showToast={handleShowToast} />

        <DeleteAccountSection showToast={handleShowToast} />
      </SettingsContainer>
    </>
  );
}
