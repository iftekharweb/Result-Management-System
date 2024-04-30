import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateDetails = ({ email, role }) => {
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState([]);
  const [halls, setHalls] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [semester, setSemester] = useState(null);
  const [department, setDepartment] = useState(null);
  const [hall, setHall] = useState(null);
  const [SID, setSID] = useState(null);
  const [TID, setTID] = useState(null);
  const [hsc_reg, setHsc_reg] = useState(null);
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("");
  const [user_id, setUserId] = useState(null);

  const [force, setForce] = useState("");

  useEffect(() => {
    console.log(force);
    setForce(email);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/semesters/");
        const data = response.data;
        setSemesters(data);
        setSemester(data[0]?.id);
        console.log("Semesters:", semesters);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/halls/");
        const data = response.data;
        setHalls(data);
        setHall(data[0]?.id);
      } catch (error) {
        console.error("Error fetching halls:", error);
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/departments/");
        const data = response.data;
        setDepartments(data);
        setDepartment(data[0]?.id);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/userid/?email=${email}`
        );
        const data = response.data;
        setUserId(() => data.user_id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [force]);

  const handleSubmitTeacher = async (e) => {
    e.preventDefault();
    if (
      !user_id ||
      !department ||
      !TID ||
      !bloodGroup ||
      !phone
    ) {
      alert("Please fill in all fields");
      return;
    }
    //
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/teacher/details/",
        {
          user: user_id,
          department,
          TID,
          blood_group: bloodGroup,
          university: "Universiy of Rajshahi",
          phone_number: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Teacher details added successfully.");
        navigate("/profile");
      } else {
        const errorData = response.data;
        alert(errorData.detail || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user_id ||
      !semester ||
      !department ||
      !hall ||
      !SID ||
      !hsc_reg ||
      !bloodGroup ||
      !phone ||
      !session
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/student/details/",
        {
          user: user_id,
          semester,
          department,
          hall,
          SID,
          hsc_reg,
          blood_group: bloodGroup,
          university: "Universiy of Rajshahi",
          phone_number: phone,
          session,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Student details added successfully.");
        navigate("/profile");
      } else {
        const errorData = response.data;
        alert(errorData.detail || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-20 py-2">
      <h2 className="font-semibold text-3xl mt-4 mb-1">Add {role === 2 ? "Teacher" : "Student"} Details</h2>
      <h1 className="text-sm">User: {email}</h1>
      {role === 3 ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Semester
            </option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.year} {semester.name}
              </option>
            ))}
          </select>

          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => setHall(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Hall
            </option>
            {halls.map((hall) => (
              <option key={hall.id} value={hall.id}>
                {hall.name}
              </option>
            ))}
          </select>

          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="number"
            placeholder="Student ID"
            value={SID}
            onChange={(e) => setSID(e.target.value)}
            required
          />

          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="number"
            placeholder="HSC Reg"
            value={hsc_reg}
            onChange={(e) => setHsc_reg(e.target.value)}
            required
          />

          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="text"
            placeholder="Session (e.g. 2018-2019)"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-2 my-3 bg-[#2c2b2b] rounded-md text-white hover:bg-[#060606]"
          >
            Add Student
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitTeacher} className="w-full flex flex-col">
          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="number"
            placeholder="Teacher ID"
            value={SID}
            onChange={(e) => setTID(e.target.value)}
            required
          />

          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 my-3 bg-[#2c2b2b] rounded-md text-white hover:bg-[#060606]"
          >
            Add Teacher
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateDetails;
