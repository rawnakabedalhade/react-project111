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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import loginContext from "../store/loginContext";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import "../style/card.css";

const CardComponent = ({
  title,
  subtitle,
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
  const navigate = useNavigate();
  let location = useLocation();

  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditeClick = () => {
    onEdit(id);
  };
  const handlePhoneClick = () => {
    onPhone(phone);
  };
  const handleFavoriteClick = () => {
    onFavorite(id);
  };
  return (
    <Card square raised className="cards">
      <CardActionArea>
        <CardMedia
          component="img"
          height={200}
          image={img}
          alt="image"
          onClick={() => navigate(`${ROUTES.CARDETAILS}/${id}`)}
        />
      </CardActionArea>
      <CardHeader
        title={title}
        subheader={subtitle}
        className="heading"
      ></CardHeader>
      <Divider></Divider>
      <CardContent>
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
          {address.city},{address.street},{address.houseNumber}
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
  );
};
CardComponent.propTypes = {
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
};

CardComponent.defaultProps = {
  // img: "/assets/imgs/car 1.jpg",
  subtitle: "subtitle default",
};
export default CardComponent;
