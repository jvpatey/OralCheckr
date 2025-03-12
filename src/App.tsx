import { HashRouter } from "react-router-dom";
import { RenderNavs } from "./containers/navigation/RenderNavs";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./common/utilities/color-utils";
import { Router } from "./Router";
import { AuthProvider } from "./containers/authentication/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HabitProvider } from "./contexts/HabitContext";

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

export function App() {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);

  const themeToggler = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme === ThemeType.LIGHT ? lightTheme : darkTheme}>
      <QueryClientProvider client={queryClient}>
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
  );
}
