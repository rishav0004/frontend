import { Avatar, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import ChangePassword from "./auth/ChangePassword";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
const Dashboard = () => {
  const handleLogout = () => {
    dispatch(unsetUserInfo({ id: "",username: "", email: "",is_driver: false, is_manager:false, is_head:false }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  const handleUpdate = () => {
    navigate(`/update/${userData.id}`)
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    profile_image: "",
    first_name:"",
    is_head:false,
    is_manager:false,
    is_driver:false,
    
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        id: data.id,
        email: data.email,
        username: data.username,
        profile_image: data.profile_image,
        first_name :data.first_name,
        is_head: data.is_head,
        is_driver: data.is_driver,
        is_manager: data.is_manager

      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          id: data.id,
          email: data.email,
          username: data.username,
          profile_image: data.profile_image,
          first_name :data.first_name,
          is_head: data.is_head,
          is_driver: data.is_driver,
          is_manager: data.is_manager

        })
      );
    }
  }, [data, isSuccess, dispatch]);

  console.log(userData)
  const head = userData.is_head.toString()
  const driver = userData.is_driver.toString()
  const manager = userData.is_manager.toString()

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>Dashboard</h1>          
          <Typography variant="h5">Email: {userData.email}</Typography>
          <Typography variant="h6">Username: {userData.username}</Typography>
          <Avatar alt="Remy Sharp" src={userData.profile_image} sx={{ width: 80, height: 80 }}/>
          
          {
            head==='true' && 
            <p>You're Logged as Head</p>
          }
          {
            manager==='true' && 
            <p>You're Logged as Manager</p>
          }
          {
            driver==='true' && 
            <p>You're Logged as Driver</p>
          }
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Logout
          </Button>
<br/>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleUpdate}
            sx={{ mt: 8 }}
          >
          
            Edit User
          </Button>

        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
