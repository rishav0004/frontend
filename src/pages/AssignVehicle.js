import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getToken } from "../services/LocalStorageService";

function AssignVehicle() {
  const { access_token } = getToken();
  const navigate = useNavigate();

  const { id } = useParams();

  const [driving_licence, setDriving_licence] = useState("");
  const [licence_expiry_date, setLicence_expiry_date] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [user, setUser] = useState(id);

  const [vehicle_assigned, setVehicle_assigned] = useState("");

  const [vehicle, setVehicle] = useState([]);
  const [server_error, setServerError] = useState({});

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

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    let formField = new FormData();

    formField.append("driving_licence", driving_licence);
    formField.append("licence_expiry_date", licence_expiry_date);
    formField.append("address", address);
    formField.append("experience", experience);
    formField.append("user", user);
    formField.append("vehicle_assigned", vehicle_assigned);

    await axios
      .post("http://localhost:8000/api/driveradd/", formField, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setServerError(error.response.data);
      });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Vehicle Assign to Driver</h2>

        <div className="form-group">
          <label>Upload Driving Licence</label>
          <input
            name="driving_licence"
            type="file"
            className="form-control"
            onChange={(e) => setDriving_licence(e.target.files[0])}
          />
        </div>
        {server_error.driving_licence ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.driving_licence[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Address"
            name="address"
            label="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {server_error.address ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.address[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter experience"
            name="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        {server_error.experience ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.experience[0]}
          </Typography>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={id}
            name="user"
            value={user}
            disabled
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        
        <div class="form-group">
          <input
            class="form-control"
            id="licence_expiry_date"
            name="licence_expiry_date"
            value={licence_expiry_date}
            onChange={(e) => setLicence_expiry_date(e.target.value)}
            placeholder="MM/DD/YYY"
            type="date"
          />
        </div>
        {server_error.setLicence_expiry_date ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.setLicence_expiry_date[0]}
          </Typography>
        ) : (
          ""
        )}
        <select
          class="form-select"
          aria-label="Default select example"
          value={vehicle_assigned}
          onChange={(e) => setVehicle_assigned(e.target.value)}
        >
          <option>-</option>
          {vehicle.map((v) => (
            <>
              <option value={v.id}>{v.vehicle_name}</option>
            </>
          ))}
        </select>
        {server_error.vehicle_assigned ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {server_error.vehicle_assigned[0]}
          </Typography>
        ) : (
          ""
        )}

        <button onClick={handleSubmit} className="btn btn-primary btn-block">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AssignVehicle;
