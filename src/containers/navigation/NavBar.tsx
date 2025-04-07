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

interface NavBarProps {
  links: NavLink[];
  themeToggler: () => void;
  theme: ThemeType;
}

// Functional component to render the Navbar
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

  // Detect if user is a guest by checking both role and firstName
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");

  // Refresh profile data when the component mounts or when the location changes
  useEffect(() => {
    if (isAuthenticated && !isGuest) {
      refetch();
    }
  }, [isAuthenticated, isGuest, location.pathname, refetch]);

  // Handle the toggle for dark mode
  const toggleDarkMode = () => {
    themeToggler();
    localStorage.setItem(
      "theme",
      isDarkMode ? ThemeType.LIGHT : ThemeType.DARK
    );
  };

  const handleLogoutClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    // First clear auth state locally to prevent 401 errors
    updateAuth(null);

    // Then tell the server to log out
    logoutMutate(undefined, {
      onSuccess: () => {
        // Navigate after successful server logout
        navigate("/");
        setIsLoggingOut(false);
        setShowLogoutModal(false);
      },
      onError: (error: Error) => {
        // Even if server logout fails, still navigate away
        navigate("/");
        setIsLoggingOut(false);
        setShowLogoutModal(false);
      },
    });
  };

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

  const handleCreateAccount = () => {
    setShowSignUpModal(true);
  };

  // Return null if the user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Filter links based on user role
  const filteredLinks = links.filter((link) => {
    // Hide links marked as hideForGuest for guest users
    if (isGuest && link.hideForGuest) {
      return false;
    }

    // Show links marked as showOnlyForGuest only for guest users
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

          <MobileMenu
            links={filteredLinks}
            isActive={isActive}
            handleLogout={handleLogoutClick}
            isGuest={isGuest}
            onCreateAccount={handleCreateAccount}
            userAvatar={profile?.avatar}
          />

          <DesktopMenu
            links={filteredLinks}
            isActive={isActive}
            handleLogout={handleLogoutClick}
            isGuest={isGuest}
            onCreateAccount={handleCreateAccount}
            userAvatar={profile?.avatar}
          />

          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
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
