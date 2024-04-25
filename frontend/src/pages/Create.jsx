import React, { useEffect, useState } from "react";
import axios from "axios";

const Create = () => {
  // Page 1
  const [email, setEmail] = useState("admin@gmail.com");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [role, setRole] = useState(3);
  const [bd, setBd] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [change, setChange] = useState(false);

  // page 2
  const [semesters, setSemesters] = useState([]);
  const [halls, setHalls] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/semesters/");
        const data = response.data;
        setSemesters(() => data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
  
      try {
        const response = await axios.get("http://127.0.0.1:8000/halls/");
        const data = response.data;
        setHalls(() => data);
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
  
      try {
        const response = await axios.get("http://127.0.0.1:8000/departments/");
        const data = response.data;
        setDepartments(() => data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(email)
    const getUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/userid/?email=${email}`);
        const data = response.data;
        setUserData(() => data);
      } catch (error) {
        console.error("Error fetching user data:", error); 
      }
    }
    getUser();
  }, [email])


  const get_details = () => {
    setChange(true);
    console.log(semesters, halls, departments, userData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password MisMatch!");
      return;
    }
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          role,
          date_of_birth: bd,
          password,
          password2,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.errors) {
          alert("Something is wrong.");
        } else {
          setChange(() => !change)
          get_details();
        }
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again."); 
    }
  };

  return (
    <div>
      {
        !change 
        ? <div className="w-full flex flex-col justify-center items-center p-20">
        <h2 className="font-semibold text-3xl mt-4 mb-1">Create A New User</h2>
        <p className="text-base mb-3">
          Provide the main user informations here.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            onChange={(e) => {
              if (e.target.value === "Student") {
                setRole(3);
              } else if (e.target.value === "Teacher") {
                setRole(2);
              } else if (e.target.value === "Unassigned") {
                setRole(4);
              }
            }}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Unassigned">Unassigned</option>
          </select>
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="date"
            placeholder="Date of Birth"
            value={bd}
            onChange={(e) => setBd(e.target.value)}
            required
            max={new Date().toISOString().split("T")[0]}
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 my-3 bg-[#2c2b2b] rounded-md text-white hover:bg-[#060606]"
          >
            Create
          </button>
        </form>
      </div>
        : <>
        <h1>hello</h1>
        </>
      }
    </div>
  );
};

export default Create;
