import { useState, useEffect } from "react";
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
import { SupportTab } from "./tabs/SupportTab";
import { AvatarSelectionModal } from "./modals/AvatarSelectionModal";

export function Profile() {
  const { profile, loading, error, refetch } = useProfile();
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
            <Nav.Item>
              <Nav.Link eventKey="support">Support</Nav.Link>
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
            <Tab.Pane eventKey="support">
              <TabContent>
                <SupportTab />
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
