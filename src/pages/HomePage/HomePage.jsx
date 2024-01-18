// import CardComponent from "../../components/CardComponent";
import CardComponent from "../../Components/CardComponent";
import { Typography, Button, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import cardContext from "../../store/cardContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavCardContext from "../../store/FavCardContext";
import useFavoriteCard from "../../hooks/useFavoriteCard";
import loginContext from "../../store/loginContext";
import normalizeHome from "./normalizeHome";
const HomePage = () => {
  let { setDataFromServer, dataFromServer, setCopyCards } =
    useContext(cardContext);
  let { login } = useContext(loginContext);
  let [count, setCount] = useState(4);
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
    console.log("father: card to delete", id);
    setDataFromServer((currentDataFromServer) =>
      currentDataFromServer.filter((card) => card._id !== id)
    );
  };
  const handleEditeCard = (id) => {
    console.log("father:card to Create", id);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = async (id) => {
    //axios
    console.log("you liked card", id);
    try {
      let { data } = await axios.patch("/cards/" + id);
      console.log("data from axios (patch)", data);
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex >= 0) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
      //update cards from server
    } catch (err) {
      console.log("error from axios (like)", err);
    }
  };
  const handleShowMore = () => {
    setCount((c) => (c += 4));
  };

  return (
    <>
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
      <div style={{ textAlign: "center" }}>
        {count < dataFromServer.length && (
          <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            onClick={handleShowMore}
            color="secondary"
            sx={{ mt: 2 }}
          >
            Show More Cards
          </Button>
        )}
      </div>
    </>
  );
};

export default HomePage;
