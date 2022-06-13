import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { getToken } from '../../services/LocalStorageService';
import { useGetDriverByIdQuery } from '../../services/userAuthApi';
import axios from "axios";

function UpdateDriver() {
  const navigate = useNavigate();

    const { access_token } = getToken();
    const {id} = useParams()
    const { data, isSuccess } = useGetDriverByIdQuery({ id, access_token });

    const [driving_licence, setDriving_licence] = useState("");
    const [licence_expiry_date, setLicence_expiry_date] = useState("");
    const [address, setAddress] = useState("");
    const [experience, setExperience] = useState("");
    const [user, setUser] = useState("");
    const [vehicle_assigned, setVehicle_assigned] = useState("");
    
    const [vehicle, setVehicle] = useState([]);
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
        if (data && isSuccess) {
            setDriving_licence(data.driving_licence);
            setLicence_expiry_date(data.licence_expiry_date);
            setAddress(data.address);
            setExperience(data.experience);
            setUser(data.user);
            setVehicle_assigned(data.vehicle_assigned);
        }
        getData()
      }, [data, isSuccess]);

      const updateDriverProfile = async () => {
        let formField = new FormData();
    
        formField.append("driving_licence", driving_licence);
        formField.append("licence_expiry_date", licence_expiry_date);
        formField.append("address", address);
        formField.append("experience", experience);
        formField.append("user", user);
        formField.append("vehicle_assigned", vehicle_assigned);
    
        await axios({
          method: "PUT",
          url: `http://127.0.0.1:8000/api/drivers/update/${id}`,
          data: formField,
          
              headers:{
                'authorization': `Bearer ${access_token}`,
              }
          
        }).then((response) => {
          console.log(response.data);
          navigate("/dashboard");
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
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={id}
            name="user"
            value={user.id}
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
            <select class="form-select" aria-label="Default select example" value = {vehicle_assigned} onChange={(e)=>setVehicle_assigned(e.target.value)} >
            <option>-</option>
        {vehicle.map((v) => (
            <>
              <option value={v.id}  >{v.vehicle_name}</option>
              </>
        ))}
            </select>
        
        <button onClick={updateDriverProfile} className="btn btn-primary btn-block">
          Update
        </button>
      </div>
    </div>
  )
}

export default UpdateDriver