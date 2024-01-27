import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useContext } from "react";
import loginContext from "../store/loginContext";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const DetailsCardComponent = ({
  title,
  subtitle,
  description,
  email,
  web,
  img,
  phone,
  address,
  cardNumber,
  id,
  liked,
  onDelete,
  onEdit,
  onPhone,
  onFavorite,
}) => {
  let { login } = useContext(loginContext);
  let location = useLocation();
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditeClick = () => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
    onEdit(id);
  };
  const handlePhoneClick = () => {
    onPhone(phone);
  };
  const handleFavoriteClick = () => {
    onFavorite(id);
  };
  const src = `https://maps.google.com/maps?&q="+${address}"&output=embed`;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} md={10}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5">
            Card Location:
          </Typography>
          <iframe
            width="100%"
            height="600"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src={src}
          >
            <a href="https://www.maps.ie/population/">Find Population on Map</a>
          </iframe>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <Card square raised sx={{ width: 300, margin: 5 }} className="cards">
          <CardActionArea>
            <CardMedia component="img" height={200} image={img} alt="image" />
          </CardActionArea>
          <CardHeader title={title} subheader={subtitle}></CardHeader>
          <Divider></Divider>
          <CardContent>
            <Typography component="span" fontWeight={700}>
              {description}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={700}>
                Website:
              </Typography>
              {web}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={700}>
                Email:
              </Typography>
              {email}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={700}>
                Phone:
              </Typography>
              {phone}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={700}>
                Address:
              </Typography>
              {address.state},{address.country},{address.city},{address.street},
              {address.houseNumber}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={700}>
                Card number:
              </Typography>
              {cardNumber}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                {((login && login.isAdmin) ||
                  location.pathname === ROUTES.MYCARDS) && (
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                )}

                {/* Edit only for my own cards */}
                {((login && location.pathname === ROUTES.MYCARDS) ||
                  login.isAdmin) && (
                  <IconButton onClick={handleEditeClick}>
                    <ModeIcon />
                  </IconButton>
                )}
              </Box>
              <Box>
                <IconButton onClick={handlePhoneClick}>
                  <LocalPhoneIcon />
                </IconButton>
                {login && (
                  <IconButton onClick={handleFavoriteClick}>
                    <FavoriteIcon color={liked ? "error" : "inherit"} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
DetailsCardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.number.isRequired,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onPhone: PropTypes.func,
  onFavorite: PropTypes.func,
};
export default DetailsCardComponent;
