import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/profileService";
import { logoutUser } from "../../../../services/authService";
import { AuthContext } from "../../../../containers/authentication/AuthContext";
import { DeleteAccountModal } from "../modals/DeleteAccountModal";
import {
  DeleteSection,
  SectionTitle,
  DeleteButton,
  WarningText,
  DescriptionText,
} from "../../styles/AccountTabStyles";

interface DeleteAccountSectionProps {
  showToast: (type: "success" | "error", message: string) => void;
}

export function DeleteAccountSection({ showToast }: DeleteAccountSectionProps) {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      await logoutUser();
      updateAuth(null);
      navigate("/welcome");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to delete account";
      showToast("error", errorMessage);
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DeleteSection>
        <SectionTitle>Delete Account</SectionTitle>
        <WarningText>Warning: This action cannot be undone.</WarningText>
        <DescriptionText>
          Deleting your account will permanently remove all your data, including
          your profile information, questionnaire responses and habit tracking
          data.
        </DescriptionText>
        <DeleteButton
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isDeleting}
        >
          Delete Account
        </DeleteButton>
      </DeleteSection>

      <DeleteAccountModal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        isDeleting={isDeleting}
      />
    </>
  );
}
