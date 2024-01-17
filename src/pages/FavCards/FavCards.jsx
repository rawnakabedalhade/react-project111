import { useContext, useEffect } from "react";
import FavCardContext from "../../store/FavCardContext";
import CardComponent from "../../Components/CardComponent";
import { Typography, Button, Grid } from "@mui/material";
import cardContext from "../../store/cardContext";
import loginContext from "../../store/loginContext";

const FavCards = () => {
  let { dataFromServer } = useContext(cardContext);
  let { login } = useContext(loginContext);
  console.log(dataFromServer);
  const handleDeleteCard = (id) => {};
  const handleEditeCard = (id) => {
    console.log("father:card to Create", id);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = async (id) => {};
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
