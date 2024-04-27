import React, { useEffect, useState } from 'react';
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]) 
  const [filter, setFilter] = useState('All');
  const [searchTID, setSearchTID] = useState('');

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        navigate("/auth/login");
        return;
      }
    } else {
      navigate("/auth/login");
      return;
    }
    
    const GetTeachers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/teachers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        setTeachers(() => data);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetTeachers();
  }, [])

  const filteredTeachers = filter === 'All'
    ? teachers
    : teachers.filter(teacher => teacher.semester.year === parseInt(filter));

  const filteredByTID = searchTID
    ? filteredTeachers.filter(teacher => teacher.TID.toString().includes(searchTID))
    : filteredTeachers;

  return (
    <div className="container mx-auto px-4 py-3">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-black text-3xl mb-4">Teachers</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by id"
            value={searchTID}
            onChange={(e) => setSearchTID(e.target.value)}
            className="p-2 bg-gray-200 text-gray-800 rounded"
          />
        </div>
      </div>
      <ul className="flex flex-col justify-start items-center w-full">
        <li className='flex flex-row justify-around items-center w-full rounded-md bg-[#060606] p-3 font-bold text-white mb-1'>
          <p className='w-1/5 flex justify-center items-center'>Teacher id</p>
          <p className='w-1/4 flex justify-center items-center'>Full Name</p>
          <p className='w-1/4 flex justify-center items-center'>Email</p>
          <p className='w-1/4 flex justify-center items-center'>Department</p>
        </li>
        {filteredByTID.map(teacher => (
          <li key={teacher.id} className='flex flex-row justify-evenly items-center w-full rounded-md bg-gray-200 p-3 m-2'>
            <p className="text-[#060606] w-1/5 flex justify-center items-center">{teacher.TID}</p>
            <h2 className="text-[#060606] w-1/4 flex justify-center items-center">{`${teacher.user.first_name} ${teacher.user.last_name}`}</h2>
            <p className="text-[#060606] w-1/4 flex justify-center items-center">{teacher.user.email}</p>
            <p className="text-[#060606] w-1/4 flex justify-center items-center">{teacher.department.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teachers;
