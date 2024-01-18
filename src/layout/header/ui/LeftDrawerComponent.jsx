import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import { useState, Fragment, useContext } from "react";
import loginContext from "../../../store/loginContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeedIcon from "@mui/icons-material/Feed";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";
import { toast } from "react-toastify";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  let navigate = useNavigate();
  let { login, setLogin } = useContext(loginContext);
  const handleLogOutOrIn = () => {
    if (login) {
      setLogin(null);
      localStorage.clear();
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
      navigate(ROUTES.LOGIN);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };
  const handleRoutes = (key) => {
    console.log(key.value);
    switch (key) {
      case "Home":
        navigate(ROUTES.HOME);
        break;
      case "About Us":
        navigate(ROUTES.ABOUT);
        break;
      case "Fav Cards":
        navigate(ROUTES.FAVCARDS);
        break;
      case "My Cards":
        navigate(ROUTES.MYCARDS);
        break;
      case "SandBox":
        navigate(ROUTES.SANDBOX);
        break;
      case "Profile":
        navigate(ROUTES.PROFILE);
        break;
      default:
        break;
    }
  };

  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <ListItem key="LogOut" disablePadding>
        <ListItemButton onClick={handleLogOutOrIn}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="LogOut" />
        </ListItemButton>
      </ListItem>
      <ListItem key="Sign In" disablePadding>
        <ListItemButton onClick={handleLogOutOrIn}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem key="Home" disablePadding>
        <ListItemButton onClick={handleRoutes}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem key="About Us" disablePadding>
        <ListItemButton onClick={handleRoutes}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItemButton>
      </ListItem>
      <Divider />
      {login && (
        <ListItem key="Profile" disablePadding>
          <ListItemButton onClick={handleRoutes}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      )}
      <Divider />
      <List>
        {login && (
          <ListItem key="Fav Cards" disablePadding>
            <ListItemButton onClick={handleRoutes}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Fav Cards" />
            </ListItemButton>
          </ListItem>
        )}
        {login && (login.isBusiness || login.isAdmin) && (
          <ListItem key="My Cards" disablePadding>
            <ListItemButton onClick={handleRoutes}>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="My Cards" />
            </ListItemButton>
          </ListItem>
        )}
        {login && login.isAdmin && (
          <ListItem key="SandBox" disablePadding>
            <ListItemButton onClick={handleRoutes}>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="SandBox" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
