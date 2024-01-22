import { useContext, useEffect, useState } from "react";
import loginContext from "../../store/loginContext";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import TextInputComponent from "../../Components/TextInputComponent";
import axios from "axios";
import dataOfUser from "./dataOfUser";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { validateSchema } from "../../validation/profileValidation";
import Toserver from "./Toserver";
import { toast } from "react-toastify";
const ProfilePage = () => {
  const { login } = useContext(loginContext);
  const [userData, setUserData] = useState({
    first: "",
    middle: "",
    last: "",
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
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  useEffect(() => {
    axios
      .get("/users/" + login._id)
      .then(({ data }) => {
        setUserData(dataOfUser(data));
      })
      .catch((err) => console.log(err));
  }, [login._id]);

  const keysArray = Object.keys(userData);
  const handleInputs = (e) => {
    setUserData((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };
  const flag = !login.isAdmin && !login.isBusiness;
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${login._id}`, Toserver(userData));
      toast.success("🦄 Edit Profile Page Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log("error from axios", err.response);
    }
  };
  const handleInputsBlur = (e) => {
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: userData[e.target.id],
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
        return { ...copyOfErrors };
      });
    }
  };
  const isrequired = (fieldName) => {
    if (
      fieldName === "first" ||
      fieldName === "last" ||
      fieldName === "phone" ||
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
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "left", mb: 1, color: "black", fontFamily: "cursive" }}
      >
        Profile
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "left", color: "black" }}>
        Your own Details.
      </Typography>
      <Box component="form" onSubmit={handleEdit} noValidate sx={{ mt: 3 }}>
        <IconButton
          aria-label="edit"
          type="submit" // Assuming you have a function named handleEdit
          sx={{
            width: 100,
            height: 40,
            bgcolor: "primary.main",
            borderRadius: 0,
            mt: 2,
            color: "white",
          }}
        >
          <AutoFixNormalIcon />
        </IconButton>
        <Grid container spacing={10}>
          {/* Grid item for the form inputs */}
          <Grid item xs={12} md={9}>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {keysArray.map((keyName) => (
                  <TextInputComponent
                    key={"inputs" + keyName}
                    id={keyName}
                    label={keyName}
                    className="input"
                    value={userData[keyName]}
                    onChange={handleInputs}
                    onBlur={handleInputsBlur}
                    errors={errors[keyName]}
                    disabled={flag}
                    required={isrequired(keyName)}
                  />
                ))}
              </Grid>
            </Box>
          </Grid>
          {/* Grid item for the profile image */}
          {userData.url && (
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  bgcolor: "white",
                  borderRadius: 50,
                }}
              >
                <img
                  src={userData.url}
                  alt={userData.alt}
                  width="200"
                  style={{ borderRadius: 100 }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
