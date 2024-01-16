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
import { useContext } from "react";
import loginContext from "../store/loginContext";
import { useNavigate } from "react-router-dom";
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
  onDelete,
  onEdit,
  onPhone,
  onFavorite,
}) => {
  let { login } = useContext(loginContext);
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    console.log("delete " + id);
    onDelete(id);
  };
  const handleEditeClick = () => {
    console.log("create " + id);
    navigate(`${ROUTES.EDITCARD}/${id}`);
    onEdit(id);
  };
  const handlePhoneClick = () => {
    onPhone(phone);
  };
  const handleFavoriteClick = () => {
    onFavorite(id);
  };
  return (
    <Card square raised sx={{ width: 300, margin: "auto" }}>
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
            {login && login.isAdmin && (
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            )}

            {/* Edit only for my own cards */}
            {(login && login.isAdmin) ||
              (login.isBusiness && (
                <IconButton onClick={handleEditeClick}>
                  <ModeIcon />
                </IconButton>
              ))}
          </Box>
          <Box>
            <IconButton onClick={handlePhoneClick}>
              <LocalPhoneIcon />
            </IconButton>
            {login && (
              <IconButton onClick={handleFavoriteClick}>
                <FavoriteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
DetailsCardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.number.isRequired,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
};

DetailsCardComponent.defaultProps = {
  // img: "/assets/imgs/car 1.jpg",
  subtitle: "subtitle default",
};
export default DetailsCardComponent;