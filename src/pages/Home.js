import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";
const Home = () => {
  const usertype = useSelector((state) => state.user);
  console.log("bhai sahab", usertype);
  const [vehicle, setVehicle] = useState([]);
  const navigate = useNavigate();
  const {access_token} = getToken()

  function getData() {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/vehicles/",
    }).then((response) => {
      const data = response.data;
      setVehicle(data);
      console.log(data);
    });
  }
  
  const handleUpdate = (id) => {
    navigate(`/update/vehicle/${id}`)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/vehicle/delete/${id}`,
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Vehicles</h1>
      {(usertype.is_head.toString() === "true" ||
        usertype.is_manager.toString() === "true") && (
        <Button component={NavLink} to="/addVehicle">
          Add New Vehicle
        </Button>
      )}

      <hr />

      <Grid container justifyContent="center">
        {vehicle.map((v) => {
          return (
            <>
              <Grid item sm={10} md={4} lg={4}>
                <Card sx={{ maxWidth: 345 }} key={v.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={v.vehicle_photo}
                      alt={v.vehicle_name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {v.vehicle_model}
                        ID: {v.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Year: {v.vehicle_year}
                        Type: {v.vehicle_type}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {(usertype.is_head.toString() === "true" ||
                    usertype.is_manager.toString() === "true") && (
                    <Button onClick={() => handleDelete(v.id)}>
                      Delete
                    </Button>
                  )}
                  {(usertype.is_head.toString() === "true" ||
                    usertype.is_manager.toString() === "true") && (
                    <Button onClick={() => handleUpdate(v.id)}>
                      Edit
                    </Button>
                  )}
                </Card>
                <br/>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
