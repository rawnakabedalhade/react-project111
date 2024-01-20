import { useContext, useEffect } from "react";
import cardContext from "../store/cardContext";
import axios from "axios";

const useFavoriteCard = () => {
  let { setDataFromServer } = useContext(cardContext);
  const handleFavorite = async (id) => {
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
  return handleFavorite;
};
export default useFavoriteCard;
