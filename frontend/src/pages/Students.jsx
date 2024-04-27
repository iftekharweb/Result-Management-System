import React, { useEffect, useState } from 'react';
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]) 
  const [filter, setFilter] = useState('All');
  const [searchSID, setSearchSID] = useState('');

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
    const GetStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/students/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        setStudents(() => data);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetStudents();
  }, [])

  const filteredStudents = filter === 'All'
    ? students
    : students.filter(student => student.semester.year === parseInt(filter));

    const filteredBySID = searchSID
    ? filteredStudents.filter(student => student.SID.toString().includes(searchSID))
    : filteredStudents;

  return (
    <div className="container mx-auto px-4 py-3">
      <div className="w-full flex flex-row justify-between">
      <h1 className="text-black text-3xl mb-4">Students</h1>
      
      <div className="flex justify-center mb-4">
        <select className="p-2 mr-2 bg-gray-200 text-gray-800 rounded" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
        </select>
        <input
          type="text"
          placeholder="Search by id"
          value={searchSID}
          onChange={(e) => setSearchSID(e.target.value)}
          className="p-2 bg-gray-200 text-gray-800 rounded"
        />
      </div>
      </div>

      <ul className="flex flex-col justify-start items-center w-full">
        <li className='flex flex-row justify-around items-center w-full rounded-md bg-[#060606] p-3 font-bold text-white mb-1'>
          <p className='w-1/4 flex justify-center items-center'>Student id</p>
          <p className='w-1/4 flex justify-center items-center'>Full Name</p>
          <p className='w-1/4 flex justify-center items-center'>Email</p>
          <p className='w-1/4 flex justify-center items-center'>Session</p>
        </li>
        {filteredBySID.map(student => (
          <li key={student.id} className='flex flex-row justify-evenly items-center w-full rounded-md bg-gray-200 p-3 m-2'>
            <h2 className="text-[#060606] w-1/4 flex justify-center items-center">{`${student.user.first_name} ${student.user.last_name}`}</h2>
            <p className="text-[#060606] w-1/4 flex justify-center items-center">{student.SID}</p>
            <p className="text-[#060606] w-1/4 flex justify-center items-center">{student.user.email}</p>
            <p className="text-[#060606] w-1/4 flex justify-center items-center">{student.session}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
