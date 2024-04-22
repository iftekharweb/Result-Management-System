import React, { useEffect, useState } from 'react';
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]) 
  useEffect(() => {
    const GetStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/students/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        console.log(data);
        setStudents(() => data);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetStudents();
  }, [])
  const [filter, setFilter] = useState('All');

  const filteredStudents = filter === 'All'
    ? students
    : students.filter(student => student.semester.year === parseInt(filter));

  return (
    <div>
      <h1>Students</h1>
      
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="1">First Year</option>
        <option value="2">Second Year</option>
        <option value="3">Third Year</option>
        <option value="4">Fourth Year</option>
      </select>

      <ul>
        {filteredStudents.map(student => (
          <li key={student.id}>
            <h2>{`${student.user.first_name} ${student.user.last_name}`}</h2>
            <p>Email: {student.user.email}</p>
            <p>Hall: {student.hall.name}</p>
            <p>Department: {student.department.name}</p>
            <p>Session: {student.session}</p>
            <p>SID: {student.SID}</p>
            <p>Phone Number: {student.phone_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
