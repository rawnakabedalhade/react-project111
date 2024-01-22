import axios from "axios";
import { useEffect } from "react";
import Toserver from "../pages/EditCard/ToServer";
const useEditUser = (id, data1, setData) => {
  const handleEditData = async () => {
    console.log(data1, "from edit");
    axios
      .put("/users/" + id, Toserver(data1))
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return handleEditData;
};
export default useEditUser;
