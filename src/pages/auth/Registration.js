import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/LocalStorageService";
import DatePicker from "react-date-picker";
import { Typography } from "@mui/material";

const Registration = () => {
  const [value, onChange] = useState(new Date());
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  // const [file, setFile] = useState()
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      is_head: data.get("is_head"),
      dob: data.get("dob"),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      // profile_image: data.append("profile_image",file),
    };

    const res = await registerUser(actualData);
    if (res.error) {
      console.log(res.error);
      setServerError(res.error.data);
    }
    if (res.data) {
      console.log(typeof res.data);
      console.log(res.data);
      storeToken(res.data.token);
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        // sx={{ margin: 0, mt: 0 }}
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
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.username[0]}
          </Typography>
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
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.email[0]}
          </Typography>
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
        {server_error.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.password[0]}
          </Typography>
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
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.first_name[0]}
          </Typography>
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
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.last_name[0]}
          </Typography>
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
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.dob[0]}
          </Typography>
        ) : (
          ""
        )}
        <br />
        <FormControlLabel
          control={
            <Checkbox
              required
              value={true}
              color="primary"
              name="is_head"
              id="is_head"
            />
          }
          label="I agree to term and condition as Head."
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
    </>
  );
};

export default Registration;

//
