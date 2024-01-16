import { useContext, useEffect } from "react";
import FavCardContext from "../../store/FavCardContext";
import CardComponent from "../../Components/CardComponent";
import { Typography, Button, Grid } from "@mui/material";

const FavCards = () => {
  let { FavCard } = useContext(FavCardContext);
  console.log(FavCard);
  const handleDeleteCard = (id) => {
    // console.log("father: card to delete", id);
    // setDataFromServer((currentDataFromServer) =>
    //   currentDataFromServer.filter((card) => card._id !== id)
    // );
    // console.log({ dataFromServer });
  };
  const handleEditeCard = (id) => {
    console.log("father:card to Create", id);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = async (id) => {
    // console.log("father:Favorite Card", id);
    // let Favcard = dataFromServer.filter((card) => card._id === id);
    // console.log(Favcard);
    // try {
    //   let { data } = await axios.patch(`/cards/${id}`, Favcard);
    //   console.log(data.likes + "liked");
    //   setFavCard(Favcard);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <Grid container spacing={2}>
      {FavCard.map((item, index) => (
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
export default FavCards;
