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
import {  useNavigate } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";

function Manager() {
  const usertype = useSelector((state) => state.user);
  const [manager, setManager] = useState([]);
  const navigate = useNavigate();
  const {access_token} = getToken()

  function getData() {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/managers/",
    }).then((response) => {
      const data = response.data;
      setManager(data);
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

  const handleUpdate = (id) => {
    navigate(`/update/manager/${id}`)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Managers</h1>
      {usertype.is_head.toString() === "true" && (
        <Button component={NavLink} to="/addManager">
          Add New Manager
        </Button>
      )}
      <hr />
      <Grid container justifyContent="center" cols={3}>
        {manager.map((d) => {
          return (
            <>
              <Grid item sm={10} md={4}>
                <Card sx={{ maxWidth: 345 }} key={d.id} sm={6}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={d.user.profile_image}
                      alt={d.user.username}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Username: {d.user.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Email: {d.user.email}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {(usertype.is_head.toString() === "true")  && (
                    <Button onClick={() => handleDelete(d.user.id)}>
                      Delete
                    </Button>
                  )}
                  {(usertype.is_head.toString()==='true')&&(
                    <Button onClick={()=>handleUpdate(d.user.id)}>
                      Edit
                    </Button>
                  )}
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default Manager;
