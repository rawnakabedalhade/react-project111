import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import useAutoLogin from "../hooks/useAutoLogin";
import Typography from "@mui/material/Typography";

const LayoutComponent = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const finishAutoLogin = useAutoLogin();
  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*#ff5722",
    favActive: "*#FB0000",
  });

  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      <MainComponent>
        {finishAutoLogin ? (
          children
        ) : (
          <Typography variant="h1" color="initial">
            Loading
          </Typography>
        )}
      </MainComponent>
      <FooterComponent />
    </ThemeProvider>
  );
};
export default LayoutComponent;
