import { useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import loginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [login, setLogin] = useState(null);
  return (
    <loginContext.Provider value={{ login, setLogin }}>
      <ToastContainer />
      <LayoutComponent>
        <Router />
      </LayoutComponent>
    </loginContext.Provider>
  );
}

export default App;
