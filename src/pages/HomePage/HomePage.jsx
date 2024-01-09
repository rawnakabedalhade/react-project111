import Grid from "@mui/material/Grid";
// import CardComponent from "../../components/CardComponent";
import CardComponent from "../../Components/CardComponent";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import cardContext from "../../store/cardContext";

const HomePage = () => {
  let { setDataFromServer, dataFromServer } = useContext(cardContext);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        console.log(data);
        setDataFromServer(data);
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
    console.log({ dataFromServer });
  };
  const handleEditeCard = (id) => {
    console.log("father:card to Create", id);
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = (id) => {
    console.log("father:Favorite Card", id);
  };

  return (
    <Grid container spacing={2}>
      {dataFromServer.map((item, index) => (
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
  );
};

export default HomePage;
