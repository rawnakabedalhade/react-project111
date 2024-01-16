import { useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import loginContext from "./store/loginContext";
import cardContext from "./store/cardContext";
import { ToastContainer } from "react-toastify";
import FavCardContext from "./store/FavCardContext";

function App() {
  const [login, setLogin] = useState(null);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [FavCard, setFavCard] = useState([]);

  return (
    <cardContext.Provider value={{ dataFromServer, setDataFromServer }}>
      <FavCardContext.Provider value={{ FavCard, setFavCard }}>
        <loginContext.Provider value={{ login, setLogin }}>
          <ToastContainer />
          <LayoutComponent>
            <Router />
          </LayoutComponent>
        </loginContext.Provider>
      </FavCardContext.Provider>
    </cardContext.Provider>
  );
}

export default App;
