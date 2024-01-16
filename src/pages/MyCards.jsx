import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ROUTES from "../routes/ROUTES";
import CardComponent from "../Components/CardComponent";
import axios from "axios";
import { toast } from "react-toastify";
const MyCards = () => {
  let [count, setCount] = useState(4);
  let [cardsFromServer, setCardsFromServer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardsFromServer(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, [setCardsFromServer]);
  if (!cardsFromServer || !cardsFromServer.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleCreateCard = () => {
    navigate(ROUTES.CREATECARD);
  };
  const handleDeleteCard = (id) => {
    setCardsFromServer((currentDataFromServer) =>
      currentDataFromServer.filter((card) => card._id !== id)
    );
    toast("🦄 Card Is Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handlePhoneCard = (phone) => {
    console.log("parent: Phone to call", phone);
  };

  const handleEditCard = (id) => {
    console.log("parent: card to edit", id);
  };
  const handleFavCard = () => {};
  const handleShowMore = () => {
    setCount((c) => (c += 4));
    // setDataFromServer((cData) => cData + 4);
  };

  return (
    <div>
      <IconButton
        color="primary"
        sx={{ marginLeft: 120, width: "200px" }}
        onClick={handleCreateCard}
      >
        <AddCircleSharpIcon />
      </IconButton>
      <Grid container spacing={2} mt={7}>
        {cardsFromServer.slice(0, count).map((item, index) => (
          <Grid item lg={3} md={3} xs={12} key={"carsCard" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={item.address}
              cardNumber={item.bizNumber}
              onDelete={handleDeleteCard}
              onPhone={handlePhoneCard}
              onEdit={handleEditCard}
              onFavorite={handleFavCard}
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center" }}>
        {count < cardsFromServer.length && (
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
    </div>
  );
};
export default MyCards;
