import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import loginContext from "../store/loginContext";
import { validatePassword } from "../validation/loginValidation";
const Fpassword = () => {
  const [password1Value, setPassword1Value] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const [password1Error, setpassword1Error] = useState("");
  const [password2Error, setpassword2Error] = useState("");
  const { login } = useContext(loginContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1Value !== password2Value) {
      setpassword2Error("Passwords do not match.");
      return;
    }

    try {
      let { data } = await axios.post("/users/login", {
        email: login.email,
        password: password1Value,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePassword1 = (e) => {
    setPassword1Value(e.target.value);
  };

  const handlePassword1Blur = () => {
    let dataFromJoi = validatePassword({ password: password1Value });
    if (dataFromJoi.error) {
      setpassword1Error(dataFromJoi.error.details[0].message);
    } else {
      setpassword1Error("");
    }
  };

  const handlePassword2 = (e) => {
    setPassword2Value(e.target.value);
  };

  const handlePassword2Blur = () => {
    let dataFromJoi = validatePassword({ password: password2Value });
    if (dataFromJoi.error) {
      setpassword2Error(dataFromJoi.error.details[0].message);
    } else {
      setpassword2Error("");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "70vh" }}>
      <Grid item xs={12} square>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rest Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            className="form"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="New Password"
              name="newPassword"
              autoComplete="new-password"
              autoFocus
              value={password1Value}
              onChange={handlePassword1}
              onBlur={handlePassword1Blur}
              className="input"
            />
            {password1Error && <Alert severity="error">{password1Error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="confirm-password"
              autoFocus
              value={password2Value}
              onChange={handlePassword2}
              onBlur={handlePassword2Blur}
              className="input"
            />
            {password2Error && <Alert severity="error">{password2Error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={password1Error || password2Error}
              className="button-submit"
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Fpassword;
