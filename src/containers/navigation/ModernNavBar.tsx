import React, { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../authentication/AuthContext";
import { SignUpModal } from "../welcome/SignUpModal";
import { useLogoutUser } from "../../hooks/auth/useLogoutUser";
import { NavLink } from "../../common/links";
import { ThemeType } from "../../App";
import {
  ModernNavBar as StyledNavBar,
  NavContainer,
  NavBrandSection,
  BrandText,
  NavCenterSection,
  NavLinksContainer,
  NavLink as StyledNavLink,
  NavAvatar,
  NavRightSection,
  ThemeToggleWrapper,
  MobileMenuWrapper,
} from "./styles/ModernNavBarStyles";
import { ThemeToggle, MobileMenu } from "./components";
import { useProfile } from "../../hooks/profile/useProfile";
import { RoutePaths } from "../../common/constants/routes";
import { ConfirmationModal } from "../../components/shared/ConfirmationModal";

// Props for navigation bar
interface ModernNavBarProps {
  links: NavLink[];
  themeToggler: () => void;
  theme: ThemeType;
}

// Modern navigation bar component matching welcome page
export function ModernNavBar({
  links,
  themeToggler,
  theme,
}: ModernNavBarProps) {
  const location = useLocation();
  const { isAuthenticated, updateAuth, user } = useContext(AuthContext);
  const { profile } = useProfile();
  const isDarkMode = theme === ThemeType.DARK;
  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutate: logoutMutate } = useLogoutUser();

  // Check if current user is a guest
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");

  // Show logout confirmation modal
  const handleLogoutClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  // Handle user logout
  const handleLogoutConfirm = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    // Clear local auth state first
    updateAuth(null);

    // Logout from server
    logoutMutate(undefined, {
      onSuccess: () => {
        navigate("/");
        setIsLoggingOut(false);
        setShowLogoutModal(false);
      },
      onError: () => {
        navigate("/");
        setIsLoggingOut(false);
        setShowLogoutModal(false);
      },
    });
  };

  // Check if a link is currently active
  const isActive = (href: string) => {
    const currentPath = location.pathname;

    if (href === RoutePaths.HABITS) {
      return currentPath.startsWith(RoutePaths.HABITS);
    }

    if (href === RoutePaths.QUESTIONNAIRE) {
      return currentPath.startsWith(RoutePaths.QUESTIONNAIRE);
    }

    return currentPath === href;
  };

  // Show sign up modal
  const handleCreateAccount = () => {
    setShowSignUpModal(true);
  };

  // Hide navbar for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  // Filter navigation links based on user role
  const filteredLinks = links.filter((link) => {
    if (isGuest && link.hideForGuest) {
      return false;
    }

    if (link.showOnlyForGuest && !isGuest) {
      return false;
    }

    // Exclude Log Out, Profile, and About from center nav
    return (
      link.name !== "Log Out" &&
      link.name !== "Profile" &&
      link.name !== "About"
    );
  });

  // Add Home link at the beginning
  const navLinks = [
    { name: "Home", path: RoutePaths.LANDING },
    ...filteredLinks,
  ];

  // Find Profile and About links for right section
  const profileLink = links.find((link) => link.name === "Profile");
  const aboutLink = links.find((link) => link.name === "About");

  return (
    <>
      <StyledNavBar>
        <NavContainer>
          {/* Logo on the left */}
          <NavBrandSection>
            <Link to={RoutePaths.LANDING} style={{ textDecoration: "none" }}>
              <BrandText>OralCheckr</BrandText>
            </Link>
          </NavBrandSection>

          {/* Centered pill-shaped navigation */}
          <NavCenterSection>
            <NavLinksContainer>
              {navLinks.map((link) => (
                <StyledNavLink
                  key={link.path}
                  $isActive={isActive(link.path)}
                  onClick={() => navigate(link.path)}
                  type="button"
                >
                  {link.name}
                </StyledNavLink>
              ))}
            </NavLinksContainer>
          </NavCenterSection>

          {/* Right section with profile, about, logout, theme toggle and mobile menu */}
          <NavRightSection>
            {/* Desktop Profile, About and Logout */}
            <NavLinksContainer className="d-none d-xl-flex">
              {!isGuest && profileLink && (
                <StyledNavLink
                  $isActive={isActive(profileLink.path)}
                  onClick={() => navigate(profileLink.path)}
                  type="button"
                >
                  {profile?.avatar && (
                    <NavAvatar src={profile.avatar} alt="Profile" />
                  )}
                  {user?.firstName || "Profile"}
                </StyledNavLink>
              )}
              {aboutLink && (
                <StyledNavLink
                  $isActive={isActive(aboutLink.path)}
                  onClick={() => navigate(aboutLink.path)}
                  type="button"
                >
                  About
                </StyledNavLink>
              )}
              <StyledNavLink
                $isActive={false}
                onClick={handleLogoutClick}
                type="button"
              >
                Log Out
              </StyledNavLink>
            </NavLinksContainer>

            <ThemeToggleWrapper>
              <ThemeToggle
                isDarkMode={isDarkMode}
                toggleDarkMode={themeToggler}
              />
            </ThemeToggleWrapper>

            <MobileMenuWrapper>
              <MobileMenu
                links={links}
                isActive={isActive}
                handleLogout={(e: any) => {
                  e.preventDefault();
                  setShowLogoutModal(true);
                }}
                isGuest={isGuest}
                onCreateAccount={handleCreateAccount}
                userAvatar={profile?.avatar}
                userFirstName={user?.firstName}
              />
            </MobileMenuWrapper>
          </NavRightSection>
        </NavContainer>
      </StyledNavBar>

      {showSignUpModal && (
        <SignUpModal
          show={showSignUpModal}
          handleClose={() => setShowSignUpModal(false)}
        />
      )}

      <ConfirmationModal
        show={showLogoutModal}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmLabel="Log Out"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}
