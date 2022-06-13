import axios from "axios";
import React, { useState,useEffect } from "react";
import { getToken } from "../../services/LocalStorageService";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../services/userAuthApi";

function UpdateVehicle() {
  const { access_token } = getToken();
  const navigate = useNavigate();

  const { id } = useParams();
  const {data , isSuccess} = useGetVehicleByIdQuery(id)
  console.log(data);
  
  // const [veh, setVeh] = useState({
  //   vehicle_name: "",
  //   vehicle_model: "",
  //   vehicle_year: "",
  //   vehicle_photo: "",
  //   chassi_number: "",
  //   registration_number: "",
  // });

  const [vehicle_name, setVehicle_name] = useState('');
  const [vehicle_model, setVehicle_model] = useState('');
  const [vehicle_year, setVehicle_year] = useState('');
  const [vehicle_photo, setVehicle_photo] = useState('');
  const [chassi_number, setChassi_number] = useState('');
  const [registration_number, setRegistration_number] = useState('');

  useEffect(()=> {
    if (data && isSuccess) {
      setVehicle_name(data.vehicle_name)
      setVehicle_model(data.vehicle_model)
      setVehicle_year(data.vehicle_year)
      setVehicle_photo(data.vehicle_photo)
      setChassi_number(data.chassi_number)
      setRegistration_number(data.registration_number)
    }
  }, [data, isSuccess])
  // useEffect(() => {
  //   async function getVehicle() {
  //     try {
  //       const veh = await axios.get(`http://127.0.0.1:8000/api/vehicles/${id}/`)
  //       setVeh(veh.data)
  //     } catch (error) {
  //   console.log("Something is Wrong");

  //     }
  //   }
  //   getVehicle()
    
  // }, [id])
  

  const updateVehicle = async () => {
    let formField = new FormData();

    formField.append("vehicle_name", vehicle_name);
    formField.append("vehicle_model", vehicle_model);
    formField.append("vehicle_year", vehicle_year);
    formField.append("vehicle_photo", vehicle_photo);
    formField.append("chassi_number", chassi_number);
    formField.append("registration_number", registration_number);

    await axios
      .put(`http://localhost:8000/api/vehicle/update/${id}`, formField, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Vehicle Registration</h2>

        <div className="form-group">
          <img src={vehicle_photo} height="200" width="200" alt={vehicle_name} srcSet="" />
          <label>Upload Image</label>
          <input
            name="vehicle_photo"
            type="file"
            className="form-control"
            onChange={(e) => setVehicle_photo(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Vehicle Name"
            name="vehicle_name"
            label="vehicle_name"
            value={vehicle_name}
            onChange={(e) => setVehicle_name(e.target.value)}
          />
        </div>

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
        <button
          onClick={() => updateVehicle()}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UpdateVehicle;
