import { Typography, Box } from "@mui/material";
import "../style/background.css";
const Background = ({ header, sub }) => {
  return (
    <div className="bg">
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          mb: 1,
          color: "black",
          fontFamily: "cursive",
        }}
      >
        {header}
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 10, color: "black" }}
        >
          {sub}
        </Typography>
      </Typography>
    </div>
  );
};
export default Background;
