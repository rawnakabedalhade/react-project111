import { useContext, useEffect, useState } from "react";
import loginContext from "../../store/loginContext";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import TextInputComponent from "../../Components/TextInputComponent";
import axios from "axios";
import dataOfUser from "./dataOfUser";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import useEditUser from "../../hooks/useEditUser";
import { validateSchema } from "../../validation/registerValidation";

const ProfilePage = () => {
  const { login } = useContext(loginContext);
  const [userData, setUserData] = useState({
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
  const hadleEditData = useEditUser(login._id, userData, setUserData);

  useEffect(() => {
    axios
      .get("/users/" + login._id)
      .then(({ data }) => {
        setUserData(dataOfUser(data));
        console.log(data.address);
      })
      .catch((err) => console.log(err));
  }, [login._id]);

  const keysArray = Object.keys(userData);

  const handleInputs = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.id]: e.target.value,
    }));
  };
  const flag = !login.isAdmin && !login.isBusiness;

  const handleEdit = (e) => {
    console.log(login._id);
    e.preventDefault();
    hadleEditData(login._id, userData);
  };
  const handleInputsBlur = (e) => {
    let { error } = validateSchema[e.target.id]({
      [e.target.id]: userData[e.target.id],
    });
    console.log({ error });
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
                  disabled={flag}
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
                alt={`${userData.first}'s profile`}
                width="200"
                style={{ borderRadius: 100 }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton
          aria-label="edit"
          onClick={handleEdit} // Assuming you have a function named handleEdit
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
      </Box>
    </>
  );
};

export default ProfilePage;
