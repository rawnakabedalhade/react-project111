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

const HomePage = () => {
  let { setDataFromServer, dataFromServer, setCopyCards } =
    useContext(cardContext);
  let { login } = useContext(loginContext);
  console.log(login);
  // let { setFavCard, Favcard } = useContext(FavCardContext);
  // let Favcard = useFavoriteCard();
  let [count, setCount] = useState(4);
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        console.log(data);
        setDataFromServer(data);
        setCopyCards(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);
  if (!dataFromServer || !dataFromServer.length) {
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
    console.log("father:Favorite Card", id);
    let Favcard = dataFromServer.filter((card) => card._id === id);
    try {
      let { data } = await axios.patch(`/cards/${id}`, Favcard);
      console.log(data.likes + "liked");
      // setFavCard(Favcard);
      // console.log(Favcard);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowMore = () => {
    setCount((c) => (c += 4));
  };

  return (
    <>
      <Grid container spacing={2}>
        {dataFromServer.slice(0, count).map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"cards" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={item.address}
              cardNumber={item.bizNumber}
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
