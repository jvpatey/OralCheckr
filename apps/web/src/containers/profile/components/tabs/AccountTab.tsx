import { SettingsContainer } from "../../styles/AccountTabStyles";
import { PasswordSection } from "../account/PasswordSection";
import { DeleteAccountSection } from "../account/DeleteAccountSection";

interface AccountTabProps {
  refetch: () => Promise<any>;
}

export function AccountTab({ refetch }: AccountTabProps) {
  return (
    <SettingsContainer>
      <PasswordSection refetch={refetch} />
      <DeleteAccountSection />
    </SettingsContainer>
  );
}
