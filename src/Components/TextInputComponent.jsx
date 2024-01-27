import { Grid, TextField, Alert } from "@mui/material";
import PropTypes from "prop-types";

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
        autoFocus={autoFocus}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
      {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  );
};
TextInputComponent.propTypes = {
  xs: PropTypes.number,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};
TextInputComponent.defaultProps = {
  xs: 6,
  autoFocus: false,
};

export default TextInputComponent;
