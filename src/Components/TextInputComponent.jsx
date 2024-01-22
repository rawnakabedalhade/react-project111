import { Grid, TextField, Alert } from "@mui/material";

const TextInputComponent = ({
  xs,
  id,
  label,
  autoFocus,
  value,
  onChange,
  onBlur,
  errors,
  required,
  disabled,
}) => {
  return (
    <Grid item xs={xs}>
      <TextField
        name={id}
        fullWidth
        id={id}
        type={label === "password" ? "password" : "text"}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
      {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  );
};

TextInputComponent.defaultProps = {
  xs: 6,
  autoFocus: false,
};

export default TextInputComponent;
