import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
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

function AssignedVehiclesList() {
  const usertype = useSelector((state) => state.user);

  const { access_token } = getToken();
  const navigate = useNavigate();
  const [driver, setDriver] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/drivers/delete/${id}`, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
        alert("successfully Deleted");
      });
  };

 

  useEffect(() => {
    function getData() {
      axios
        .get("http://localhost:8000/api/drivers/", {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setDriver(data);
          console.log(data);
        });
    }
    getData();
  }, [access_token]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Drivers with Assigned Vehicles</h1>

      <Grid container justifyContent="center">
        {driver.map((d,key) => {
          return (
            <>
              <Grid item sm={10} md={4} lg={4} key={key}>
                <Card sx={{ maxWidth: 345 }} >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={d.user.profile_image}
                      alt={d.user.username}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Username: {d.user.username}
                      </Typography>
                      <Typography variant="h6" component="div">
                        Email: {d.user.email}
                      </Typography>
                      <Typography variant="h6" component="div">
                        Vehicle Assigned: {d.vehicle_assigned.vehicle_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {(usertype.is_head.toString() === "true" ||
                    usertype.is_manager.toString() === "true") && (
                    <Button onClick={() => handleDelete(d.id)}>Delete</Button>
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

export default AssignedVehiclesList;
