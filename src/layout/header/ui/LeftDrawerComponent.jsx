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

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  let { login } = useContext(loginContext);
  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <ListItem key="Sign Up" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Up" />
        </ListItemButton>
      </ListItem>
      <ListItem key="Sign In" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem key="Home" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem key="About Us" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <List>
        {login && (
          <ListItem key="Fav Cards" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Fav Cards" />
            </ListItemButton>
          </ListItem>
        )}
        {login && (login.isBusiness || login.isAdmin) && (
          <ListItem key="My Cards" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="My Cards" />
            </ListItemButton>
          </ListItem>
        )}
        {login && login.isAdmin && (
          <ListItem key="SandBox" disablePadding>
            <ListItemButton>
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
