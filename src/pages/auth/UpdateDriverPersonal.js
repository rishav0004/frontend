import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getToken } from "../../services/LocalStorageService";
import { useGetUserByIdQuery } from "../../services/userAuthApi";
function UpdateDriverPersonal() {
  const { access_token } = getToken();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, isSuccess } = useGetUserByIdQuery({ id, access_token });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profile_image, setProfile_image] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (data && isSuccess) {
      setUsername(data.username);
      setProfile_image(data.profile_image);
      setEmail(data.email);
      setFirst_name(data.first_name);
      setLast_name(data.last_name);
      setDob(data.dob);
    }
  }, [data, isSuccess]);

  const updateUserProfile = async () => {
    let formField = new FormData();

    formField.append("username", username);
    formField.append("email", email);
    formField.append("first_name", first_name);
    formField.append("last_name", last_name);
    formField.append("profile_image", profile_image);
    formField.append("dob", dob);

    await axios({
      method: "PUT",
      url: `http://127.0.0.1:8000/api/update/${id}`,
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/dashboard");
    });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Update Driver Info</h2>

        <div className="form-group">
          <img src={profile_image} height="100" width="200" alt="" srcSet="" />
          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setProfile_image(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Name"
            name="username"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter Your E-mail Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Phone Number"
            name="first_name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Phone Number"
            name="last_name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          />
        </div>
        <div class="form-group">
          <input
            class="form-control"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="MM/DD/YYY"
            type="date"
          />
        </div>
        <button
          onClick={updateUserProfile}
          className="btn btn-primary btn-block"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdateDriverPersonal;
