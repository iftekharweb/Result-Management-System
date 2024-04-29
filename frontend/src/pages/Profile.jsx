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
  const [userId, setUserId] = useState(0);
  const [details, setDetails] = useState(undefined);

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

  async function get_data(x) {
    if (rolename === "Student" && x) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/students/${x}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (rolename === "Teacher") {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/teachers/${x}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(details);
  }

  async function populateProfile() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setEmail(data.email);
      setFirstname(data.first_name);
      setLastname(data.last_name);
      setUserId(data.related_id);
      setUid(data.id);
      if (data.role === 2) {
        setRolename("Teacher");
      } else if (data.role === 3) {
        setRolename("Student");
      } else if (data.role === 4) {
        setRolename("Unassigned");
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/auth/login");
      console.log(error.message);
      return;
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
  }, []);

  useEffect(() => {
    if (userId) {
      get_data(userId);
    }
  }, [userId]);

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row justify-center items-center p-3">
        <h1 className="text-3xl font-semibold">You Profile Details</h1>
      </div>

      {/**/}
      <div className="w-full flex flex-row justify-start items-start px-20">
        <div>
          <p className="mb-2">
            <span className="font-semibold">User Id</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">First Name</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Last Name</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role</span>
          </p>
        </div>
        <div className="px-2">
          <p className="mb-2">
            <span className="font-semibold"> : </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold"> : </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold"> : </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold"> : </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold"> : </span>
          </p>
        </div>
        <div className="pl-1">
          <p className="mb-2"> {uid} </p>
          <p className="mb-2">{firstname}</p>
          <p className="mb-2">{lastname}</p>
          <p className="mb-2">{email}</p>
          <p className="mb-2">{rolename}</p>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center p-3">
        {rolename != "System Admin" && <h1 className="text-3xl font-semibold">More Details</h1>}
      </div>
      {details && rolename === "Student" && (
        <>
          <div className="w-full flex flex-row justify-start items-start px-20">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Student ID </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Department </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Hall </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">University </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">HSC Reg </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Session </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Curent Year </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Curent Semester</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Blood Group</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone</span>
              </p>
            </div>
            <div className="px-2">
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
            </div>

            <div className="pl-1">
              <p className="mb-2">{details.SID}</p>
              <p className="mb-2">{details.department.name}</p>
              <p className="mb-2">{details.hall.name}</p>
              <p className="mb-2">{details.university}</p>
              <p className="mb-2">{details.hsc_reg}</p>
              <p className="mb-2">{details.session}</p>
              <p className="mb-2">{details.semester.year}</p>
              <p className="mb-2">{details.semester.name}</p>
              <p className="mb-2">{details.blood_group}</p>
              <p className="mb-2">{details.phone_number}</p>
            </div>
          </div>
        </>
      )}
      {details && rolename === "Teacher" && (
        <>
          <div className="w-full flex flex-row justify-start items-start px-20">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Teacher ID </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Department </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">University </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Blood Group</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone </span>
              </p>
            </div>
            <div className="px-2">
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold"> : </span>
              </p>
            </div>

            <div className="pl-1">
              <p className="mb-2">{details.TID}</p>
              <p className="mb-2">{details.department.name}</p>
              <p className="mb-2">{details.university}</p>
              <p className="mb-2">{details.blood_group}</p>
              <p className="mb-2">{details.phone_number}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
