import React from "react";

const Sidebar = ({role, handleSwitch }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start bg-slate-200 px-2 py-5">
      <button className="w-full p-2  font-semibold text-md flex justify-center items-center focus:bg-slate-400 focus:rounded-md" onClick={() => handleSwitch(1)}>
        <p>Profile</p>
      </button>
      {role === 2 && <button className="w-full p-2 font-semibold text-md focus:bg-slate-400 focus:rounded-md flex justify-center items-center" onClick={() => handleSwitch(2)}>
        <p>Assigned Sections</p>
      </button>}
      <button className="w-full p-2 font-semibold text-md focus:bg-slate-400 focus:rounded-md flex justify-center items-center" onClick={() => handleSwitch(3)}>
        <p>Students</p>
      </button>
      <button className="w-full p-2 font-semibold text-md focus:bg-slate-400 focus:rounded-md flex justify-center items-center" onClick={() => handleSwitch(4)}>
        <p>Teachers</p>
      </button>
      {role === 1 && <button className="w-full p-2 font-semibold text-md focus:bg-slate-400 focus:rounded-md flex justify-center items-center" onClick={() => handleSwitch(5)}>
        <p>Create User</p>
      </button>}
      <button className="w-full p-2 font-semibold text-md focus:bg-slate-400 focus:rounded-md flex justify-center items-center" onClick={() => handleSwitch(6)}>
        <p>Results</p>
      </button>
    </div>
  );
};

export default Sidebar;
