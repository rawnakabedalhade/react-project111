import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ROUTES from "../../routes/ROUTES";
import CardComponent from "../../Components/CardComponent";
import useDeleteCard from "../../hooks/useDeleteCard";
import useFavoriteCard from "../../hooks/useFavoriteCard";
import axios from "axios";
import { toast } from "react-toastify";
import normalizeCards from "./normalizeMyCards";
import loginContext from "../../store/loginContext";
const MyCards = () => {
  let [count, setCount] = useState(4);
  let [cardsFromServer, setCardsFromServer] = useState([]);
  let { login } = useContext(loginContext);
  const handleDelete = useDeleteCard();
  const handleFavorite = useFavoriteCard();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardsFromServer(normalizeCards(data));
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);

  let cardsFromServerFiltered = normalizeCards(
    cardsFromServer,
    login ? login._id : undefined
  );
  if (!cardsFromServerFiltered || !cardsFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleCreateCard = () => {
    navigate(ROUTES.CREATECARD);
  };
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
  const handleShowMore = () => {
    setCount((c) => (c += 4));
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{ textAlign: "left", mb: 1, color: "black", fontFamily: "cursive" }}
      >
        My Cards Page
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 10, color: "blck" }}
        >
          Here you can find your own cards.
        </Typography>
      </Typography>

      <IconButton
        color="primary"
        sx={{
          marginLeft: 150,
          my: 20,
          fontSize: "large",
          position: "absolute",
        }}
        onClick={handleCreateCard}
      >
        <AddCircleSharpIcon />
      </IconButton>

      <Grid container spacing={2} mt={7}>
        {cardsFromServerFiltered.slice(0, count).map((item, index) => (
          <Grid item lg={3} md={3} xs={12} key={"carsCard" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={item.address}
              liked={item.liked}
              cardNumber={item.bizNumber}
              onDelete={handleDeleteCard}
              onPhone={handlePhoneCard}
              onEdit={handleEditeCard}
              onFavorite={handleFavoriteCard}
            />
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ textAlign: "center", position: "relative", mb: 10 }}>
        {count < cardsFromServerFiltered.length && (
          <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            onClick={handleShowMore}
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Show More Cards
          </Button>
        )}
      </Grid>
    </div>
  );
};
export default MyCards;
