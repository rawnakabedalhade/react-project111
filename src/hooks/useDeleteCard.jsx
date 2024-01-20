import axios from "axios";
import cardContext from "../store/cardContext";
import { useContext } from "react";
const useDeleteCard = () => {
  let { setDataFromServer } = useContext(cardContext);
  const handleDelete = async (id) => {
    axios
      .delete("/cards/" + id)
      .then(({ data }) => {
        console.log("data", data);
        console.log("data from axios (delete)", data);
        setDataFromServer((cDataFromServer) => {
          return cDataFromServer.filter((card) => card._id !== id);
        });
      })
      .catch((err) => {
        console.log("error from axios (delete)", err);
      });
  };
  return handleDelete;
};
export default useDeleteCard;
