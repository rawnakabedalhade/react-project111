import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { useNavigate, Link } from "react-router-dom";
import normalizeRegister from "./normalizeRegister";
import { toast } from "react-toastify";

import { validateSchema } from "../../validation/registerValidation";
import TextInputComponent from "../../Components/TextInputComponent";
import "../../style/login.css";

const RegisterPage = () => {
  const [btn, setbtn] = useState(true);
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", normalizeRegister(inputsValue, checked));
      toast.success("🦄 Registered Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err);
    }
  };
  let keysArray = Object.keys(inputsValue);
  const handleInputsBlur = (e) => {
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    console.log(dataFromJoi);
    if (dataFromJoi.error) {
      setErrors((copyOfErrors) => ({
        ...copyOfErrors,
        [e.target.id]: dataFromJoi.error.details[0].message,
      }));
    } else {
      setErrors((copyOfErrors) => {
        delete copyOfErrors[e.target.id];
        setbtn(false);
        return { ...copyOfErrors };
      });
    }
  };
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  const isrequired = (fieldName) => {
    if (
      fieldName === "first" ||
      fieldName === "last" ||
      fieldName === "phone" ||
      fieldName === "password" ||
      fieldName === "email" ||
      fieldName === "country" ||
      fieldName === "street" ||
      fieldName === "city" ||
      fieldName === "houseNumber" ||
      fieldName === "zip"
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
      <Avatar sx={{ m: 1, bgcolor: "black" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
              className="input"
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="Business Account"
            onChange={handleCheckboxChange}
            checked={checked}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={btn}
          className="button-submit"
        >
          Sign Up
        </Button>
      </Box>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to={ROUTES.LOGIN} variant="body2" className="span">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
export default RegisterPage;
