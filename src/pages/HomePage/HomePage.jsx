// import CardComponent from "../../components/CardComponent";
import CardComponent from "../../Components/CardComponent";
import { Typography, Button, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import cardContext from "../../store/cardContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDeleteCard from "../../hooks/useDeleteCard";
import useFavoriteCard from "../../hooks/useFavoriteCard";
import loginContext from "../../store/loginContext";
import normalizeHome from "./normalizeHome";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
const HomePage = () => {
  let { setDataFromServer, dataFromServer, setCopyCards } =
    useContext(cardContext);
  let { login } = useContext(loginContext);
  let [count, setCount] = useState(4);
  const handleFavorite = useFavoriteCard();
  const handleDelete = useDeleteCard();
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        console.log(data);
        console.log(normalizeHome(data));
        setDataFromServer(normalizeHome(data));
        setCopyCards(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);
  let dataFromServerFiltered = normalizeHome(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

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
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "left", mb: 1, color: "white", fontFamily: "cursive" }}
      >
        Cards Page
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 10, color: "white" }}
        >
          Here you can find business cards from all categories.
        </Typography>
      </Typography>
      <Grid container spacing={2}>
        {dataFromServerFiltered.slice(0, count).map((item, index) => (
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
        ))}
      </Grid>
      <Grid sx={{ textAlign: "center", position: "relative", mb: 10 }}>
        {count < dataFromServerFiltered.length && (
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
    </>
  );
};

export default HomePage;
