import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import cardContext from "../../../store/cardContext";

const FilterComponent = () => {
  const [txt, setTxt] = useState("");
  let { dataFromServer, setDataFromServer } = useContext(cardContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTxt(inputValue);

    const filteredCards = dataFromServer.filter((card) => {
      return card.title.includes(inputValue);
    });

    // Update the state with the filtered cards
    setDataFromServer(filteredCards);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={txt}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
