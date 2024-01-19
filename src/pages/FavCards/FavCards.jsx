import { useContext, useEffect, useState } from "react";
import FavCardContext from "../../store/FavCardContext";
import CardComponent from "../../Components/CardComponent";
import { Typography, Button, Grid } from "@mui/material";
import cardContext from "../../store/cardContext";
import loginContext from "../../store/loginContext";
import axios from "axios";

const FavCards = () => {
  let { dataFromServer, setDataFromServer } = useContext(cardContext);
  let { login } = useContext(loginContext);

  console.log(dataFromServer);
  const handleDeleteCard = (id) => {};
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
  return (
    <Grid container spacing={2}>
      {dataFromServer.map(
        (item, index) =>
          dataFromServer[index].likes.some((id) => id === login._id) && (
            <Grid item lg={3} md={6} xs={12} key={"cards" + index}>
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                address={item.address}
                cardNumber={item.bizNumber}
                liked={true}
                onDelete={handleDeleteCard}
                onEdit={handleEditeCard}
                onPhone={handlePhoneCard}
                onFavorite={handleFavoriteCard}
              />
            </Grid>
          )
      )}
    </Grid>
  );
};
export default FavCards;
