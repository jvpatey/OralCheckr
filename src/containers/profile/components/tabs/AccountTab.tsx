import { SettingsContainer } from "../../styles/AccountTabStyles";
import { PasswordSection } from "../account/PasswordSection";
import { DeleteAccountSection } from "../account/DeleteAccountSection";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastUtils";

interface AccountTabProps {
  refetch: () => Promise<any>;
}

// Account tab component
export function AccountTab({ refetch }: AccountTabProps) {
  const handleShowToast = (type: "success" | "error", text: string) => {
    if (type === "success") {
      showSuccessToast("Success", text);
    } else {
      showErrorToast("Error", text);
    }
  };

  return (
    <SettingsContainer>
      <PasswordSection refetch={refetch} showToast={handleShowToast} />
      <DeleteAccountSection showToast={handleShowToast} />
    </SettingsContainer>
  );
}
