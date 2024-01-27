import { useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import loginContext from "./store/loginContext";
import cardContext from "./store/cardContext";
import { ToastContainer } from "react-toastify";
import FavCardContext from "./store/FavCardContext";
import userContext from "./store/userContext";
import UsersInfo from "./pages/CRM/UsersInfo";

function App() {
  const [login, setLogin] = useState(null);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [copyCards, setCopyCards] = useState([]);
  const [FavCard, setFavCard] = useState([]);
  const [user, SetUser] = useState([]);
  const [bizStatus, setBizStatus] = useState([]);

  return (
    // <UsersInfo.Provider value={{ bizStatus, setBizStatus }}>
    <cardContext.Provider
      value={{ dataFromServer, setDataFromServer, copyCards, setCopyCards }}
    >
      <userContext.Provider value={{ user, SetUser }}>
        <FavCardContext.Provider value={{ FavCard, setFavCard }}>
          <loginContext.Provider value={{ login, setLogin }}>
            <ToastContainer />
            <LayoutComponent>
              <Router />
            </LayoutComponent>
          </loginContext.Provider>
        </FavCardContext.Provider>
      </userContext.Provider>
    </cardContext.Provider>
    // </UsersInfo.Provider>
  );
}

export default App;
