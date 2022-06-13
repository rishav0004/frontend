import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";
import DatePicker from "react-date-picker";
import { getToken } from "../../services/LocalStorageService";
import { useRegisterManagerMutation } from "../../services/userAuthApi";

function AddManager() {
  const [value, onChange] = useState(new Date());
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const { access_token } = getToken();
  //   console.log('gettoken:',access_token);

  const [registerManager] = useRegisterManagerMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      is_manager: data.get("is_manager"),
      dob: data.get("dob"),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
    };

    const res = await registerManager({ actualData, access_token });
    console.log(res);
    if (res.error) {
      setServerError(res.error.data);
    }
    if (res.data) {
      console.log(typeof res.data);
      console.log(res.data);
      navigate("/manager");
    }
  };
  return (
    <div>
      <h1>Manager Register</h1>
      <Box
        component="form"
        sx={{ margin: 0, mt: 0 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          // margin="normal"
          required
          fullWidth
          id="username"
          name="username"
          label="username"
        />
        {server_error.username ? (
          <Alert severity="error">{server_error.username[0]}</Alert>
        ) : (
          ""
        )}
        
        <TextField
          // margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
        />
        {server_error.email ? (
          <Alert severity="error">{server_error.email[0]}</Alert>
        ) : (
          ""
        )}
        <TextField
          // margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        
        <TextField
          // margin="normal"
          required
          fullWidth
          id="password2"
          name="password2"
          label="Confirm Password"
          type="password"
        />
        {server_error.error ? (
          <Alert severity="error">{server_error.error}</Alert>
        ) : (
          ""
        )}
        <TextField
          // margin="normal"
          required
          fullWidth
          id="first_name"
          name="first_name"
          label="First name"
        />
        {server_error.first_name ? (
          <Alert severity="error">{server_error.first_name[0]}</Alert>
        ) : (
          ""
        )}
        <TextField
          // margin="normal"
          required
          fullWidth
          id="last_name"
          name="last_name"
          label="last_name"
        />
        {server_error.last_name ? (
          <Alert severity="error">{server_error.last_name[0]}</Alert>
        ) : (
          ""
        )}
        Date of Birth :
        <DatePicker
          onChange={onChange}
          value={value}
          name="dob"
          id="dob"
          required
        />
        {server_error.dob ? (
          <Alert severity="error">{server_error.dob[0]}</Alert>
        ) : (
          ""
        )}
        <br />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              required
              value={true}
              color="primary"
              name="is_manager"
              id="is_manager"
            />
          }
          label="I agree to term and condition."
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Join
          </Button>
        </Box>
        
      </Box>
    </div>
  );
}

export default AddManager;


// {error: {…}}
// error:
//   data:
//     email: ['user with this email address already exists.']
// [[Prototype]]: Object
// status: 400
// [[Prototype]]: Object
// [[Prototype]]: Object