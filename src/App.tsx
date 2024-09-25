import { BrowserRouter } from "react-router-dom";
import { RenderNavs } from "./containers/RenderNavs";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./common/utilities/color-utils";

enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

export function App() {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);

  const themeToggler = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return (
    <ThemeProvider theme={theme === ThemeType.LIGHT ? lightTheme : darkTheme}>
      <BrowserRouter>
        <RenderNavs themeToggler={themeToggler} currentTheme={theme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
