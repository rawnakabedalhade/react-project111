import { useContext, useEffect } from "react";
import cardContext from "../store/cardContext";
import FavCardContext from "../store/FavCardContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const useFavoriteCard = () => {
  let { id } = useParams();
  let { setDataFromServer, dataFromServer } = useContext(cardContext);
  let { setFavCard, Favcard } = useContext(FavCardContext);

  useEffect(() => {
    let card = dataFromServer.find((c) => c._id == id);
    axios
      .patch(`/cards/${id}`, card)
      .then(({ data }) => setFavCard(data))
      .catch((err) => console.log(err));
  });
  return Favcard;
};
export default useFavoriteCard;
