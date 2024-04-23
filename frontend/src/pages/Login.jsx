import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LOGIN_COVER from '../assets/Shabash_Bangladesh.jpg'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.errors) {
        localStorage.setItem("token", data.token.access);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-start">

      <div className="relative w-1/2 h-full flex flex-col item-center">
        <div className="absolute flex flex-col top-[10%] left-[10%]">
          <p className="text-2xl text-white font-bold">Welcome To</p>
          <p className="text-3xl text-white font-extrabold">University of Rajshahi</p>
        </div>
        <img src={LOGIN_COVER} alt=""  className="h-full object-cover"/>
      </div>

      <div className="w-1/2 h-full flex flex-col py-8 px-14 justify-between bg-[#f5f5f5]">
        <h1 className="text-[#060606] text-xl font-semibold"> Result Management System</h1>
        <div className="w-full flex flex-col">
          <h2 className="font-semibold text-3xl mt-4 mb-1">Log In</h2>
          <p className="text-base mb-3">Welcome back! Provide you email and password to sign in.</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full py-2 my-3 bg-[#2c2b2b] rounded-md text-white hover:bg-[#060606]">Log in</button>
          </form>
        </div>
        <div className="w-full flex items-center justify-center">
          <a href="https://www.ru.ac.bd/" className="text-blue-500 hover:text-blue-600 hover:font-semibold">Rajshahi University Official Website</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
