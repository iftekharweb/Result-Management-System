import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignedSections = () => {
  const [assigned, setAssigned] = useState([]);
  const [uid, setUid] = useState(null);
  const [addindMark, setAddingMark] = useState(false);

  const navigate = useNavigate();

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

  const get_uid = async (user) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/auth/theid/${user}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUid(() => response.data.id);
    } catch (error) {
      console.error(error);
    }
    // setUid(() => user.user_id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        navigate("/auth/login");
      } else {
        get_uid(user.user_id);
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  const get_assigned_courses = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/teachers/${uid}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response?.data?.assigned_sections;
      console.log(data);
      if (data) {
        setAssigned(data);
      } else {
        alert("Something is Wrong!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (uid) {
      get_assigned_courses();
    }
  }, [uid]);

  const handleAddMarks = (id) => {
    // Implement your logic for adding marks here
    console.log("Adding marks for course with ID:", id);
    setAddingMark(true);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full p-3 flex justify-center items-center">
          <h1 className="text-3xl font-semibold">Assigned Courses</h1>
        </div>
        {assigned.map((course) => (
          <div className="w-full px-14 py-3">
            <div key={course.id} className="w-full rounded-md bg-slate-200">
              <div className="w-full px-8 py-2 flex flex-row justify-between">
                <div className="w-3/4">
                  <h5 className="text-xl font-serif">{course.course.title}</h5>
                  <div className="pb-3">
                    <p className="font-mono">ICE {course.course.code}</p>
                  </div>
                  <div>
                    <p>
                    <span className="font-semibold">Type : </span> {course.course.type}
                    <br />
                    <span className="font-semibold">Credit : </span> {course.course.credit}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 flex justify-end items-center">
                  <button
                    className="bg-[#060606] text-white font-semibold p-4 rounded-md hover:bg-sky-700"
                    onClick={() => handleAddMarks(course.id)}
                  >
                    Add Marks
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {addindMark && <div>Add marks component here</div>}
    </>
  );
};

export default AssignedSections;
