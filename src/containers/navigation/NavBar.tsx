import React from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { SignUpModal } from "../welcome/SignUpModal";
import { useLogoutUser } from "../../hooks/auth/useLogoutUser";
import { NavLink } from "../../common/links";
import { ThemeType } from "../../App";
import { CustomNavbar } from "./styles/NavBarStyles";
import { NavBrand, MobileMenu, DesktopMenu, ThemeToggle } from "./components";
import { useProfile } from "../../hooks/profile/useProfile";
import { RoutePaths } from "../../common/constants/routes";
import { ConfirmationModal } from "../../components/shared/ConfirmationModal";

// Props for navigation bar
interface NavBarProps {
  links: NavLink[];
  themeToggler: () => void;
  theme: ThemeType;
}

// Main navigation bar component
export function NavBar({ links, themeToggler, theme }: NavBarProps) {
  const location = useLocation();
  const { isAuthenticated, updateAuth, user } = useContext(AuthContext);
  const { profile, refetch } = useProfile();
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

  // Refresh profile data on mount and location change
  useEffect(() => {
    if (isAuthenticated && !isGuest) {
      refetch();
    }
  }, [isAuthenticated, isGuest, location.pathname, refetch]);

  // Toggle between light and dark theme
  const toggleDarkMode = () => {
    themeToggler();
  };

  // Show logout confirmation modal
  const handleLogoutClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
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

    return true;
  });

  return (
    <>
      <CustomNavbar expand="lg" fixed="top">
        <Container fluid>
          <NavBrand />

          <div
            className="d-flex align-items-center ms-auto d-lg-none"
            style={{ gap: "12px" }}
          >
            <ThemeToggle
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <MobileMenu
              links={filteredLinks}
              isActive={isActive}
              handleLogout={handleLogoutClick}
              isGuest={isGuest}
              onCreateAccount={handleCreateAccount}
              userAvatar={profile?.avatar}
              userFirstName={user?.firstName}
            />
          </div>

          <DesktopMenu
            links={filteredLinks}
            isActive={isActive}
            handleLogout={handleLogoutClick}
            isGuest={isGuest}
            onCreateAccount={handleCreateAccount}
            userAvatar={profile?.avatar}
            userFirstName={user?.firstName}
          />
        </Container>
      </CustomNavbar>

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
