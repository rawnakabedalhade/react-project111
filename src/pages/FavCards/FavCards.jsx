import { useContext } from "react";
import CardComponent from "../../Components/CardComponent";
import { Typography, Button, Grid } from "@mui/material";
import cardContext from "../../store/cardContext";
import loginContext from "../../store/loginContext";
import useDeleteCard from "../../hooks/useDeleteCard";
import useFavoriteCard from "../../hooks/useFavoriteCard";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import normalizeCards from "./normalizeFav";

const FavCards = () => {
  let { dataFromServer, setDataFromServer } = useContext(cardContext);
  let { login } = useContext(loginContext);
  const handleFavorite = useFavoriteCard();
  const handleDelete = useDeleteCard();
  const navigate = useNavigate();
  let dataFromServerFiltered = normalizeCards(
    dataFromServer,
    login ? login._id : undefined
  );
  const handleDeleteCard = (id) => {
    handleDelete(id);
  };
  const handleEditeCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = (id) => {
    handleFavorite(id);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "left", mb: 1, color: "white", fontFamily: "cursive" }}
      >
        Favorite Cards Page
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 10, color: "white" }}
        >
          Here you can find favorite cards from all categories.
        </Typography>
      </Typography>

      <Grid container spacing={2}>
        {dataFromServerFiltered.map(
          (item, index) =>
            dataFromServerFiltered[index].likes.some(
              (id) => id === login._id
            ) && (
              <Grid item lg={3} md={6} xs={12} key={"cards" + index}>
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subtitle={item.subtitle}
                  img={item.image.url}
                  phone={item.phone}
                  address={item.address}
                  cardNumber={item.bizNumber}
                  liked={item.liked}
                  onDelete={handleDeleteCard}
                  onEdit={handleEditeCard}
                  onPhone={handlePhoneCard}
                  onFavorite={handleFavoriteCard}
                />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
};
export default FavCards;
