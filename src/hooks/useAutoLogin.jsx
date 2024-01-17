import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const useAutoLogin = (id) => {
  const { setLogin } = useContext(LoginContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      console.log("no token");
      setFinishAutoLogin(true);
      return;
    }
    let userData = jwtDecode(token);
    if (!userData || !userData._id) {
      console.log("no user data");
      setFinishAutoLogin(true);
      return;
    }
    axios
      .get("/users/" + userData._id)
      .then(({ data }) => {
        setLogin(userData);
        setFinishAutoLogin(true);
      })
      .catch((err) => {
        setFinishAutoLogin(true);
      });
  }, []);

  return finishAutoLogin;
};

export default useAutoLogin;
