import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ email }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="w-full py-3 px-5 flex flex-row justify-between bg-[#1f1e1e]">
      <div className="flex justify-center items-center">
        <p className="font-bold text-white">Result Management System</p>
      </div>
      <div className="flex flex-row justify-end items-center pr-4 text-white">
        <p className="font-semibold pr-3">{email}</p>
        <div className="w-full h-full flex justify-center items-center">
          <button
            className="py-1 px-2 rounded-md bg-red-500 hover:bg-orange-700 font-semibold"
            onClick={handleClick}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
