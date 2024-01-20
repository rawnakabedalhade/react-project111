import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";
import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./ui/FilterComponent";
import loginContext from "../../store/loginContext";
import ROUTES from "../../routes/ROUTES";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setLogin } = useContext(loginContext);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    navigate(ROUTES.PROFILE);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };
  const handleLogout = () => {
    setLogin(null);
    toast.success("🦄 LoggedOut Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    localStorage.clear();
    navigate(ROUTES.LOGIN);
  };

  const menuId = "primary-search-account-menu";
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleOpenDrawerClick}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontFamily: "cursive" }}
          >
            Card-Management 🃏
          </Typography>
          <Links />
          <FilterComponent />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch
              checked={isDarkTheme}
              onChange={handleThemeChange}
              icon={isDarkTheme ? <DarkModeIcon /> : <WbSunnyIcon />}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ mx: 5, width: "90" }}
            >
              <AccountCircle />
            </IconButton>
            <Button onClick={handleLogout} sx={{ color: "white", width: "70" }}>
              Log Out
              <IconButton color="inherit" aria-label="log out">
                <LogoutIcon />
              </IconButton>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <LeftDrawerComponent
          isOpen={isOpen}
          onCloseDrawer={handleCloseDrawerClick}
        />
      </Hidden>
    </Box>
  );
};
export default HeaderComponent;
