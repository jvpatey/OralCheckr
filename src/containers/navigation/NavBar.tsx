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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutate: logoutMutate } = useLogoutUser();

  // Refresh profile data when the component mounts or when the location changes
  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, location.pathname, refetch]);

  // Handle the toggle for dark mode
  const toggleDarkMode = () => {
    themeToggler();
    localStorage.setItem(
      "theme",
      isDarkMode ? ThemeType.LIGHT : ThemeType.DARK
    );
  };

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (isLoggingOut) return;
    setIsLoggingOut(true);

    // Logout mutation
    logoutMutate(undefined, {
      onSuccess: () => {
        updateAuth(null);
        navigate("/");
        setIsLoggingOut(false);
      },
      onError: (error: Error) => {
        console.error("Logout error:", error);
        setIsLoggingOut(false);
      },
    });
  };

  const isActive = (href: string) => {
    const currentPath = location.pathname;

    if (href === RoutePaths.HABITS) {
      return currentPath.startsWith(RoutePaths.HABITS);
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

  // Ensure isGuest is always a boolean
  const isGuest = Boolean(user && user.role === "guest");

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
            handleLogout={handleLogout}
            isGuest={isGuest}
            onCreateAccount={handleCreateAccount}
            userAvatar={profile?.avatar}
          />

          <DesktopMenu
            links={filteredLinks}
            isActive={isActive}
            handleLogout={handleLogout}
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
    </>
  );
}
