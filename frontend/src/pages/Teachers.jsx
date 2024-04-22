import React, { useEffect, useState } from 'react';
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]) 
  useEffect(() => {
    const GetTeachers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/teachers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        console.log(data);
        setTeachers(() => data);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetTeachers();
  }, [])
  const [filter, setFilter] = useState('All');

  const filteredTeachers = filter === 'All'
    ? teachers
    : teachers.filter(teacher =>teacher.semester.year === parseInt(filter));

  return (
    <div>
      <h1>Teachers</h1>

      <ul>
        {filteredTeachers.map(teachteacher => (
          <li key={teachteacher.id}>
            <h2>{`${teachteacher.user.first_name} ${teachteacher.user.last_name}`}</h2>
            <p>Email: {teachteacher.user.email}</p>
            <p>Department: {teachteacher.department.name}</p>
            <p>TID: {teachteacher.TID}</p>
            <p>Phone Number: {teachteacher.phone_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teachers;
