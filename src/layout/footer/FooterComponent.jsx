// FooterComponent
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeedIcon from "@mui/icons-material/Feed";
import { useContext } from "react";
import loginContext from "../../store/loginContext";
const FooterComponent = () => {
  let { login } = useContext(loginContext);
  return (
    <Paper elevation={4} sx={{ position: "sticky", mt: 2 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="About" icon={<InfoIcon />} />
        {login && (
          <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
        )}
        {login && (login.isBusiness || login.isAdmin) && (
          <BottomNavigationAction label="MyCards" icon={<FeedIcon />} />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default FooterComponent;
