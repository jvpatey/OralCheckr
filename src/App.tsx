import { BrowserRouter } from "react-router-dom";
import { RenderNavs } from "./containers/RenderNavs";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./common/utilities/color-utils";

export function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <BrowserRouter>
        <RenderNavs themeToggler={themeToggler} currentTheme={theme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}