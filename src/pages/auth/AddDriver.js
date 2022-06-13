import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
  } from "@mui/material";
import DatePicker from "react-date-picker";
import { getToken } from "../../services/LocalStorageService";
import { useRegisterDriverMutation } from "../../services/userAuthApi";

export default function AddDriver() {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();
  const { access_token } = getToken()
  console.log('gettoken:',access_token);



  const [registerDriver] = useRegisterDriverMutation();


//   const access_token = useSelector((state)=>state.auth)

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
    };

    const res = await registerDriver({actualData,access_token});
    console.log(res)
    if (res.error) {
      // setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(typeof res.data);
      console.log(res.data);
      navigate("/driver");
    }
  };

  return <div>
    <h1>Driver Register</h1>
      <Box
        component="form"
        sx={{margin: 0,mt:0}}
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
        

        <TextField
          // margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
        />
        

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
        
        <TextField
          // margin="normal"
          required
          fullWidth
          id="first_name"
          name="first_name"
          label="First name"
        />
       
        <TextField
          // margin="normal"
          required
          fullWidth
          id="last_name"
          name="last_name"
          label="last_name"
        />
        
        
        Date of Birth :
        <DatePicker
          onChange={onChange}
          value={value}
          name="dob"
          id="dob"
          required
        />
        <br />
        
        
        <br/>
        <FormControlLabel
          control={<Checkbox value={true} color="primary" name="is_driver" id="is_driver" />}
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
  </div>;
}
