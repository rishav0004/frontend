import React, { useState } from 'react'
import { getToken } from '../services/LocalStorageService';
import axios from 'axios';
import { Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
export default function AddVehicle() {

    const {access_token} = getToken()
    const navigate = useNavigate();
    const [server_error, setServerError] = useState({});


    const [vehicle_name, setVehicle_name] = useState('')
    const [vehicle_model, setVehicle_model] = useState('')
    const [vehicle_year, setVehicle_year] = useState('')
    const [vehicle_photo, setVehicle_photo] = useState(null)
    const [chassi_number, setChassi_number] = useState('')
    const [registration_number, setRegistration_number] = useState('')

    const handleSubmit = async () => {
        let formField = new FormData()

        formField.append('vehicle_name',vehicle_name)
        formField.append('vehicle_model',vehicle_model)
        formField.append('vehicle_year',vehicle_year)
        formField.append('vehicle_photo',vehicle_photo)
        formField.append('chassi_number',chassi_number)
        formField.append('registration_number',registration_number)
        
        
        await axios.post('http://localhost:8000/api/vehicle/register/',formField,
        {
            headers:{
                'authorization': `Bearer ${access_token}`,
            }}
            ).then(response =>{
            console.log(response.data);
            navigate('/')
        })
        .catch((error) => {
          console.log(error);
          setServerError(error.response.data);

        })

    }

  return (
    <div className="container">
  <div className="w-75 mx-auto shadow p-5">
    <h2 className="text-center mb-4">Vehicle Registration</h2>
    

    <div className="form-group">
      <img src={vehicle_photo} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input name="vehicle_photo" type="file" className="form-control"  onChange={(e)=>setVehicle_photo(e.target.files[0])}/>
      </div>
      {server_error.vehicle_photo ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.vehicle_photo[0]}
          </Typography>
        ) : (
          ""
        )}
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Vehicle Name"
          name="vehicle_name"
          label='vehicle_name'
          value={vehicle_name}
          onChange={(e) => setVehicle_name(e.target.value)}
        />
      </div>
      {server_error.vehicle_name ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.vehicle_name[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Vehicle Model"
            name="vehicle_model"
            value={vehicle_model}
            onChange={(e) => setVehicle_model(e.target.value)}
          />
        </div>
        {server_error.vehicle_model ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.vehicle_model[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter vehicle_year"
            name="vehicle_year"
            value={vehicle_year}
            onChange={(e) => setVehicle_year(e.target.value)}
          />
        </div>
        {server_error.vehicle_year ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.vehicle_year[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter chassi_number"
            name="chassi_number"
            value={chassi_number}
            onChange={(e) => setChassi_number(e.target.value)}
          />
        </div>
        {server_error.chassi_number ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.chassi_number[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter registration_number"
            name="registration_number"
            value={registration_number}
            onChange={(e) => setRegistration_number(e.target.value)}
          />
        </div>
        {server_error.registration_number ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.registration_number[0]}
          </Typography>
        ) : (
          ""
        )}
      <button onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
      
   
  </div>
</div>
  )
}
