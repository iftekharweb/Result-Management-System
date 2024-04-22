import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [rolename, setRolename] = useState("System Admin");

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  async function populateProfile() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setEmail(() => data.email);
      setFirstname(() => data.first_name);
      setLastname(() => data.last_name);
      setUid(() => data.id);
      if(data.role == 2) {
        setRolename(() => "Teacher");
      } else if(data.role == 3) {
        setRolename(() => "Student");
      } else if(data.role == 4){
        setRolename(() => "Unassigned");
      }

    } catch (error) {
      localStorage.removeItem("token");
      navigate("/auth/login");
      console.log(error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        populateProfile();
      }
    } else {
      navigate("/auth/login");
    }
  },[]);

  const handleClick = (e) => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <p>Profile Details</p>
            <div></div>
          </div>
          <p className="mb-2">
            <span>User Id :</span> {uid}
          </p>
          <p className="mb-2">
            <span>First Name :</span> {firstname}
          </p>
          <p className="mb-2">
            <span>Last Name :</span> {lastname}
          </p>
          <p className="mb-2">
            <span>Email :</span> {email}
          </p>
          <p className="mb-2">
            <span>Role :</span> {rolename}
          </p>
        </div>
      </div>
      <br />
      <button onClick={handleClick}>Log Out</button>
    </div>
  );
};

export default Profile;
