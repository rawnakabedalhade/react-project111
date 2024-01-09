import { useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import loginContext from "./store/loginContext";
import cardContext from "./store/cardContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [login, setLogin] = useState(null);
  const [dataFromServer, setDataFromServer] = useState([]);
  return (
    <cardContext.Provider value={{ dataFromServer, setDataFromServer }}>
      <loginContext.Provider value={{ login, setLogin }}>
        <ToastContainer />
        <LayoutComponent>
          <Router />
        </LayoutComponent>
      </loginContext.Provider>
    </cardContext.Provider>
  );
}

export default App;
