import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import ROUTES from "../../routes/ROUTES.js";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import TextInputComponent from "../../Components/TextInputComponent";
import { normalizeCtreate } from "./normalizeCreate.js";
import { toast } from "react-toastify";
import loginContext from "../../store/loginContext.js";
import validateSchema from "../../validation/cardValidation.js";

const CreateCard = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(loginContext);
  if (!login || !login.isBusiness) return;

  let keysArray = Object.keys(inputsValue);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("from submit");
    try {
      await axios.post("/cards", normalizeCtreate(inputsValue));
      toast.success("🦄 Create Card Done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err);
      toast.error("🦄 Oops... try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    console.log(Object.keys(errors).length);
    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
    }
  };
  const isrequired = (fieldName) => {
    if (
      fieldName === "title" ||
      fieldName === "subtitle" ||
      fieldName === "description" ||
      fieldName === "phone" ||
      fieldName === "email" ||
      fieldName === "country" ||
      fieldName === "city" ||
      fieldName === "street" ||
      fieldName === "houseNumber"
    ) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Your Card
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={isrequired(keyName)}
            />
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Create Card
        </Button>
      </Box>
    </Box>
  );
};
export default CreateCard;
