import { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import {
  PageContainer,
  ProfileCard,
  ProfileHeader,
  StyledNav,
  TabContent,
  TabsContainer,
  Nav,
} from "../styles/ProfileStyles";
import { useProfile } from "../../../hooks/profile/useProfile";
import { ProfileSection } from "./ProfileSection";
import { AccountTab } from "./tabs/AccountTab";
import { updateProfile } from "../../../services/profileService";
import { DataTab } from "./tabs/DataTab";
import { AvatarSelectionModal } from "./modals/AvatarSelectionModal";

// Main profile page component with tabs and avatar management
export function Profile() {
  const { profile, loading, error, refetch, isGuest } = useProfile();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<string | undefined>();

  // Keep local avatar in sync with profile changes
  useEffect(() => {
    if (isGuest) {
      return;
    }
    setLocalAvatar(profile?.avatar);
  }, [profile, isGuest]);

  // Handle avatar selection and update
  const handleAvatarSelect = async (avatar: string) => {
    try {
      await updateProfile({ avatar });
      setLocalAvatar(avatar);
      setShowAvatarModal(false);
      await refetch();
    } catch (err) {
      console.error(
        "Error updating avatar:",
        err instanceof Error ? err.message : "Failed to update avatar"
      );
    }
  };

  // Show guest account message
  if (isGuest) {
    return (
      <PageContainer>
        <ProfileCard>
          <ProfileHeader>
            <div>
              <h3>Guest Account</h3>
              <p>Profile management is not available for guest accounts.</p>
              <p>
                Please sign up for a full account to access profile features.
              </p>
            </div>
          </ProfileHeader>
        </ProfileCard>
      </PageContainer>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <PageContainer>
        <ProfileCard>
          <ProfileHeader>
            <div>
              <h3>Loading...</h3>
              <p>Please wait while we load your profile information.</p>
            </div>
          </ProfileHeader>
        </ProfileCard>
      </PageContainer>
    );
  }

  // Show error state
  if (error) {
    return (
      <PageContainer>
        <ProfileCard>
          <ProfileHeader>
            <div>
              <h3>Error</h3>
              <p>
                {error instanceof Error
                  ? error.message
                  : "An error occurred while loading your profile"}
              </p>
            </div>
          </ProfileHeader>
        </ProfileCard>
      </PageContainer>
    );
  }

  // Main profile view with tabs
  return (
    <PageContainer>
      <ProfileCard>
        <ProfileSection
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          email={profile?.email}
          avatar={localAvatar}
          onAvatarClick={() => setShowAvatarModal(true)}
          refetch={refetch}
        />

        <TabsContainer>
          <Tab.Container defaultActiveKey="account">
            <StyledNav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="account">Account Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="data">Data Management</Nav.Link>
              </Nav.Item>
            </StyledNav>

            <Tab.Content>
              <Tab.Pane eventKey="account">
                <TabContent>
                  <AccountTab refetch={refetch} />
                </TabContent>
              </Tab.Pane>
              <Tab.Pane eventKey="data">
                <TabContent>
                  <DataTab />
                </TabContent>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </TabsContainer>

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
