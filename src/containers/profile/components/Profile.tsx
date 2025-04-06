import { useState, useEffect, useContext } from "react";
import { Tab } from "react-bootstrap";
import {
  PageContainer,
  ProfileCard,
  StyledNav,
  TabContent,
  Nav,
} from "../styles/ProfileStyles";
import { useProfile } from "../../../hooks/profile/useProfile";
import { ProfileSection } from "./ProfileSection";
import { AccountTab } from "./tabs/AccountTab";
import { updateProfile } from "../../../services/profileService";
import { DataTab } from "./tabs/DataTab";
import { AvatarSelectionModal } from "./modals/AvatarSelectionModal";
import { AuthContext } from "../../../containers/authentication/AuthContext";

export function Profile() {
  const { profile, loading, error, refetch } = useProfile();
  const { user } = useContext(AuthContext);
  const isGuest = user?.role === "guest";
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<string | undefined>();

  // Update localAvatar whenever profile changes
  useEffect(() => {
    if (profile?.avatar) {
      setLocalAvatar(profile.avatar);
    }
  }, [profile]);

  const handleAvatarSelect = async (avatar: string) => {
    try {
      await updateProfile({ avatar });
      setLocalAvatar(avatar);
      setShowAvatarModal(false);
      // Ensure refetch immediately to update the navbar
      await refetch();
    } catch (err) {
      console.error(
        "Error updating avatar:",
        err instanceof Error ? err.message : "Failed to update avatar"
      );
    }
  };

  if (isGuest) {
    return (
      <PageContainer>
        <ProfileCard>
          <div>
            <h3>Guest Account</h3>
            <p>Profile management is not available for guest accounts.</p>
            <p>Please sign up for a full account to access profile features.</p>
          </div>
        </ProfileCard>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <ProfileCard>
          <div>Loading...</div>
        </ProfileCard>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ProfileCard>
          <div>
            {error instanceof Error
              ? error.message
              : "An error occurred while loading your profile"}
          </div>
        </ProfileCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProfileCard>
        <ProfileSection
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          email={profile?.email}
          avatar={localAvatar}
          onAvatarClick={() => setShowAvatarModal(true)}
        />

        <Tab.Container defaultActiveKey="account">
          <StyledNav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="account">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="data">Data</Nav.Link>
            </Nav.Item>
          </StyledNav>

          <Tab.Content>
            <Tab.Pane eventKey="account">
              <TabContent>
                <AccountTab
                  currentEmail={profile?.email || ""}
                  refetch={refetch}
                />
              </TabContent>
            </Tab.Pane>
            <Tab.Pane eventKey="data">
              <TabContent>
                <DataTab />
              </TabContent>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <AvatarSelectionModal
          show={showAvatarModal}
          onHide={() => setShowAvatarModal(false)}
          onSelect={handleAvatarSelect}
          currentAvatar={localAvatar}
        />
      </ProfileCard>
    </PageContainer>
  );
}
