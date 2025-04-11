import { HashRouter } from "react-router-dom";
import { RenderNavs } from "./containers/navigation/RenderNavs";
import { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./common/utilities/color-utils";
import { Router } from "./Router";
import { AuthProvider } from "./containers/authentication/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  // State for managing the current theme
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);

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
                  autoClose={800}
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover={false}
                  draggable={false}
                  limit={3}
                  theme={theme === ThemeType.LIGHT ? "light" : "dark"}
                />
              </HashRouter>
            </HabitProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
