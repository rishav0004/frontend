import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";
import {  useNavigate } from "react-router-dom";

function Driver() {
  const usertype = useSelector((state) => state.user);
  const {access_token} = getToken()
  const navigate = useNavigate();

  const [driver, setDriver] = useState([]);
  function getData() {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/alldrivers/",
    }).then((response) => {
      const data = response.data;
      setDriver(data);
      console.log(data);
    });
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`,
    {
      headers:{
        'authorization': `Bearer ${access_token}`
      }}
    ).then(res => {
      console.log(res.data);
      navigate('/dashboard')
      alert('successfully Deleted')

    })
  }

  const handleUserInfoUpdate = (id) => {
    navigate(`/update/driverpersonal/${id}`)
  }

  const handleAssignVehicle = (id) => {
    navigate(`/assignVehicle/${id}`)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Drivers</h1>

      {(usertype.is_head.toString() === "true" ||
        usertype.is_manager.toString() === "true") && (
        <Button component={NavLink} to="/addDriver">
          Add New Driver
        </Button>
      )}
      <Grid container justifyContent="center">
        {driver.map((d) => {
          return (
            <>
              <Grid item sm={10} md={4} lg={4}>
                <Card sx={{ maxWidth: 345 }} key={d.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={d.profile_image}
                      alt={d.username}
                    />
                    <CardContent>
                      <Typography  variant="h5" component="div">
                        Username: {d.username}
                      </Typography>
                      <Typography  variant="h6" component="div">
                        Email: {d.email}
                      </Typography>
                    
                    </CardContent>
                  </CardActionArea>
                  {(usertype.is_head.toString() === "true" ||
                    usertype.is_manager.toString() === "true") && (
                    <Button onClick={() => handleDelete(d.id)}>
                      Delete
                    </Button>
                  )}
                  {(usertype.is_head.toString() === "true" ||
                    usertype.is_manager.toString() === "true") && (
                    <Button onClick={() => handleUserInfoUpdate(d.id)}>
                      Update Info
                    </Button>
                  )}
                  {(usertype.is_head.toString() === "true" ||
                    usertype.is_manager.toString() === "true") && (
                    <Button onClick={() => handleAssignVehicle(d.id)}>
                      Assign Vehicle
                    </Button>
                  )}
                </Card>
                <br />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default Driver;
