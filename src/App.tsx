import { HashRouter } from "react-router-dom";
import { RenderNavs } from "./containers/navigation/RenderNavs";
import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./common/utilities/color-utils";
import { Router } from "./Router";
import { AuthProvider } from "./containers/authentication/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalToastStyles } from "./styles/ToastStyles";
import { HabitProvider } from "./contexts/HabitContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./config/environment";

// Theme options for the application
export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

// Main application component that sets up providers and routing
export function App() {
  // State for managing the current theme - default to dark mode
  const [theme, setTheme] = useState<ThemeType>(ThemeType.DARK);

  // Check localStorage for saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    if (
      savedTheme &&
      (savedTheme === ThemeType.LIGHT || savedTheme === ThemeType.DARK)
    ) {
      setTheme(savedTheme);
    }
  }, []);

  // Persist query client across renders
  const queryClientRef = useRef<QueryClient>();

  // Initialize query client with default options
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  // Toggle between light and dark themes
  const themeToggler = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return (
    // Google OAuth provider for authentication
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* Theme provider for styled components */}
      <ThemeProvider theme={theme === ThemeType.LIGHT ? lightTheme : darkTheme}>
        {/* Global toast styles */}
        <GlobalToastStyles />
        {/* React Query provider for data fetching */}
        <QueryClientProvider client={queryClientRef.current}>
          {/* Authentication context provider */}
          <AuthProvider>
            {/* Habit tracking context provider */}
            <HabitProvider>
              {/* Hash-based routing */}
              <HashRouter>
                {/* Navigation components */}
                <RenderNavs themeToggler={themeToggler} currentTheme={theme} />
                {/* Main application routes */}
                <Router themeToggler={themeToggler} currentTheme={theme} />
                {/* Toast notifications */}
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  closeOnClick={true}
                  pauseOnHover={true}
                  draggable={true}
                  limit={3}
                  theme={theme === ThemeType.LIGHT ? "light" : "dark"}
                  toastClassName="modern-toast"
                  bodyClassName="toast-body"
                  progressClassName="toast-progress"
                  closeButton={true}
                  newestOnTop={true}
                  rtl={false}
                />
              </HashRouter>
            </HabitProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
