import { Tab } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  PageContainer,
  ProfileCard,
  StyledNav,
  TabContent,
  Nav,
} from "../styles/ProfileStyles";
import { useProfile } from "../../../hooks/profile/useProfile";
import { AvatarSelectionModal } from "./AvatarSelectionModal";
import { ProfileSection } from "./ProfileSection";
import { updateProfile } from "../../../services/profileService";

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
      const updatedProfile = await updateProfile({ avatar });
      setLocalAvatar(updatedProfile.avatar);
      setShowAvatarModal(false);
      await refetch();
    } catch (error) {
      console.error("Error updating avatar:", error);
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
          <div>{error}</div>
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
                <h3>Account Settings</h3>
                {/* Account settings content will go here */}
              </TabContent>
            </Tab.Pane>
            <Tab.Pane eventKey="data">
              <TabContent>
                <h3>Your Data</h3>
                {/* Data content will go here */}
              </TabContent>
            </Tab.Pane>
            <Tab.Pane eventKey="support">
              <TabContent>
                <h3>Support</h3>
                {/* Support content will go here */}
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
