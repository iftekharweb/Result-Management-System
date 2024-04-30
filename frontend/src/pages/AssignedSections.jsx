import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MarkEntry from "./MarkEntry";

const AssignedSections = () => {
  const [assigned, setAssigned] = useState([]);
  const [uid, setUid] = useState(null);
  const [addindMark, setAddingMark] = useState(false);

  const [section, setSection] = useState(null);
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState("");
  const [sectionName, setSectionName] = useState("")
  const [courseName, setCourseName] = useState("")

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
        setSection(data.id);
      } else {
        alert("Something is Wrong!");
        navigate("/");
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

  const handleAddMarks = (id, _year, _semester, _sectionName, _courseName) => {
    setYear(_year);
    setSemester(_semester);
    setSection(id);
    setAddingMark(true);
    setSectionName(_sectionName);
    setCourseName(_courseName);
  };

  const handleState = () => {
    setAddingMark(() => !addindMark);
  };

  return (
    <>
      {!addindMark ? (
        <div className="w-full flex flex-col">
          <div className="w-full p-3 flex justify-center items-center">
            <h1 className="text-3xl font-semibold">Assigned Courses</h1>
          </div>
          {assigned.map((course) => (
            <div className="w-full px-14 py-3" key={course.id}>
              <div className="w-full rounded-md bg-slate-200">
                <div className="w-full px-8 py-2 flex flex-row justify-between">
                  <div className="w-3/4">
                    <h5 className="text-xl font-serif">
                      {course.course.title}
                    </h5>
                    <div className="pb-3">
                      <p className="font-mono">ICE {course.course.code}</p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Type : </span>{" "}
                        {course.course.type}
                        <br />
                        <span className="font-semibold">Credit : </span>{" "}
                        {course.course.credit}
                        <br />
                        <span className="font-semibold">Section : </span>{" "}
                        {course.section}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/4 flex justify-end items-center">
                    <button
                      className="bg-[#060606] text-white font-semibold p-4 rounded-md hover:bg-sky-700"
                      onClick={() => handleAddMarks(course.id, course.course.semester.year, course.course.semester.name, course.section, course.course.code)}
                    >
                      Add Marks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div>
            <MarkEntry
              section={section}
              semester={semester}
              year={year}
              handleState={handleState}
              sectionName={sectionName}
              courseName={courseName}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AssignedSections;
