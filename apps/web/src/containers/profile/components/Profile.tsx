import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PageContainer,
  ProfileCard,
  ProfileHeader,
  ProfilePageHeader,
  ProfileStateTitle,
  ProfileStateText,
  ProfileTabBarShell,
  ProfileTabIndicator,
  ProfileTabButton,
  ProfileTabPanelRegion,
  TabContent,
  TabsContainer,
} from "../styles/ProfileStyles";
import {
  HabitHeroEyebrow,
  HeaderText,
  HeaderSubtitle,
} from "../../../components/habit-tracker/habits/styles/HabitComponentsStyles";
import { HeroTitleAccent } from "../../welcome/styles/WelcomeStyles";
import { useProfile } from "../../../hooks/profile/useProfile";
import { ProfileSection } from "./ProfileSection";
import { AccountTab } from "./tabs/AccountTab";
import { updateProfile } from "../../../services/profileService";
import { DataTab } from "./tabs/DataTab";
import { AvatarSelectionModal } from "./modals/AvatarSelectionModal";

type ProfileTabKey = "account" | "data";

function ProfilePageHero({ subtitle }: { subtitle: string }) {
  return (
    <ProfilePageHeader>
      <HabitHeroEyebrow>Account</HabitHeroEyebrow>
      <HeaderText>
        Profile <HeroTitleAccent as="span">& settings</HeroTitleAccent>
      </HeaderText>
      <HeaderSubtitle>{subtitle}</HeaderSubtitle>
    </ProfilePageHeader>
  );
}

// Main profile page component with tabs and avatar management
export function Profile() {
  const { profile, loading, error, refetch, isGuest } = useProfile();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("account");
  const [hasChangedTab, setHasChangedTab] = useState(false);
  /** Set in selectTab before setState so exiting/entering panels read the same transition axis (avoids stale custom on key change). */
  const tabTransitionDirRef = useRef(0);

  const tabPanelVariants = useMemo(
    () => ({
      initial: () => ({
        opacity: tabTransitionDirRef.current === 0 ? 1 : 0,
        x: tabTransitionDirRef.current * 20,
        filter:
          tabTransitionDirRef.current === 0 ? "blur(0px)" : "blur(6px)",
      }),
      animate: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
      },
      exit: () => ({
        opacity: 0,
        x: tabTransitionDirRef.current * -14,
        filter: "blur(5px)",
      }),
    }),
    []
  );

  const selectTab = (key: ProfileTabKey) => {
    if (key === activeTab) return;
    const from = activeTab === "account" ? 0 : 1;
    const to = key === "account" ? 0 : 1;
    tabTransitionDirRef.current = to > from ? 1 : -1;
    setHasChangedTab(true);
    setActiveTab(key);
  };

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
          <ProfilePageHero subtitle="Sign in with a full account to manage your profile and data." />
          <ProfileHeader $singleColumn>
            <div>
              <ProfileStateTitle>Guest account</ProfileStateTitle>
              <ProfileStateText>
                Profile management is not available for guest accounts.
              </ProfileStateText>
              <ProfileStateText>
                Please sign up for a full account to access profile features.
              </ProfileStateText>
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
          <ProfilePageHero subtitle="Loading your profile information…" />
          <ProfileHeader $singleColumn>
            <div>
              <ProfileStateTitle>Loading…</ProfileStateTitle>
              <ProfileStateText>
                Please wait while we load your profile information.
              </ProfileStateText>
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
          <ProfilePageHero subtitle="We couldn’t load your profile." />
          <ProfileHeader $singleColumn>
            <div>
              <ProfileStateTitle>Something went wrong</ProfileStateTitle>
              <ProfileStateText>
                {error instanceof Error
                  ? error.message
                  : "An error occurred while loading your profile"}
              </ProfileStateText>
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
        <ProfilePageHero subtitle="Manage your account details, password, and data." />
        <ProfileSection
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          email={profile?.email}
          avatar={localAvatar}
          onAvatarClick={() => setShowAvatarModal(true)}
          refetch={refetch}
        />

        <TabsContainer>
          <ProfileTabBarShell role="tablist" aria-label="Profile sections">
            <ProfileTabIndicator
              $activeIndex={activeTab === "account" ? 0 : 1}
              $linkCount={2}
            />
            <ProfileTabButton
              type="button"
              role="tab"
              id="profile-tab-account"
              aria-selected={activeTab === "account"}
              aria-controls="profile-panel-account"
              $isActive={activeTab === "account"}
              onClick={() => selectTab("account")}
            >
              Account Settings
            </ProfileTabButton>
            <ProfileTabButton
              type="button"
              role="tab"
              id="profile-tab-data"
              aria-selected={activeTab === "data"}
              aria-controls="profile-panel-data"
              $isActive={activeTab === "data"}
              onClick={() => selectTab("data")}
            >
              Data Management
            </ProfileTabButton>
          </ProfileTabBarShell>

          <ProfileTabPanelRegion>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={
                  activeTab === "account"
                    ? "profile-panel-account"
                    : "profile-panel-data"
                }
                aria-labelledby={
                  activeTab === "account"
                    ? "profile-tab-account"
                    : "profile-tab-data"
                }
                variants={tabPanelVariants}
                initial={hasChangedTab ? "initial" : false}
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.34,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.26 },
                  filter: { duration: 0.28 },
                }}
              >
                <TabContent>
                  {activeTab === "account" ? (
                    <AccountTab refetch={refetch} />
                  ) : (
                    <DataTab />
                  )}
                </TabContent>
              </motion.div>
            </AnimatePresence>
          </ProfileTabPanelRegion>
        </TabsContainer>

        <AvatarSelectionModal
          show={showAvatarModal}
          onHide={() => setShowAvatarModal(false)}
          onSelect={handleAvatarSelect}
          currentAvatar={localAvatar}
          accountPhotoUrl={profile?.googlePicture}
        />
      </ProfileCard>
    </PageContainer>
  );
}
