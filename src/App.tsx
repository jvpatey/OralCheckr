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

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

export function App() {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);
  // Create a persisted queryClient reference
  const queryClientRef = useRef<QueryClient>();

  // Initialize the query client if it doesn't exist
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

  const themeToggler = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme === ThemeType.LIGHT ? lightTheme : darkTheme}>
        <QueryClientProvider client={queryClientRef.current}>
          <AuthProvider>
            <HabitProvider>
              <HashRouter>
                <RenderNavs themeToggler={themeToggler} currentTheme={theme} />
                <Router themeToggler={themeToggler} currentTheme={theme} />
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
