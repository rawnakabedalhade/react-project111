import { memo } from "react";
import Button from "@mui/material/Button";
const ButtonsComponent = ({ color, children, onClick }) => {
  return (
    <Button fullWidth variant="contained" color={color} onClick={onClick}>
      {children}
    </Button>
  );
};
//hi

export default memo(ButtonsComponent);
