import { useState } from 'react'
import Login from './pages/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import MarkEntry from './pages/MarkEntry';
import Create from './pages/Create';

function App() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/login' element={<Login/>}></Route>
                <Route path='/*' element={<Profile/>} />
                <Route path='/students' element={<Students/>} />
                <Route path='/teachers' element={<Teachers/>} />
                <Route path='/create' element={<Create/>} />
                <Route path='/marks' element={<MarkEntry year={1} semester={`Odd`} section={6}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

// App.js
// import { useState } from 'react'
// import Login from './pages/Login';
// import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import Profile from './pages/Profile';
// import Students from './pages/Students';
// import Teachers from './pages/Teachers';
// import MarkEntry from './pages/MarkEntry';
// import Create from './pages/Create';

// function App() {
//     const [redirectToProfile, setRedirectToProfile] = useState(false);
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path='/auth/login' element={<Login/>}></Route>
//                 <Route path='/*' element={<Profile/>} />
//                 <Route path='/students' element={<Students/>} />
//                 <Route path='/teachers' element={<Teachers/>} />
//                 <Route path='/create' element={<Create/>} />
//                 <Route path='/marks' element={<MarkEntry year={1} semester={`Odd`} section={6}/>} />
//             </Routes>
//         </BrowserRouter>
//     )
// }

// export default App


// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, NavLink } from "react-router-dom";
// import { Routes, Route } from "react-router-dom"; // Importing useNavigate
// import Profile from "./pages/Profile";
// import Students from "./pages/Students";
// import Teachers from "./pages/Teachers";
// import CreateUser from "./pages/Create";
// import Login from "./pages/Login";
// import axios from "axios";

// const App = () => {
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setAuthenticated(true);

//       } catch (error) {
//         console.error(error);
//       }
//     };
//     checkAuthentication();
//   }, []);

//   return (
//     <Router>
//       <div>
//         {authenticated ? (
//           <div className="flex">
//             <div className="w-1/5 bg-gray-200 h-screen p-4">
//               <h1 className="text-lg font-bold mb-4">Your App Name</h1>
//               <NavLink
//                 to="/profile"
//                 activeClassName="selected"
//                 className="block py-2 hover:bg-gray-300 rounded mb-2"
//               >
//                 Profile
//               </NavLink>
//               <NavLink
//                 to="/students"
//                 activeClassName="selected"
//                 className="block py-2 hover:bg-gray-300 rounded mb-2"
//               >
//                 Students
//               </NavLink>
//               <NavLink
//                 to="/teachers"
//                 activeClassName="selected"
//                 className="block py-2 hover:bg-gray-300 rounded mb-2"
//               >
//                 Teachers
//               </NavLink>
//               <NavLink
//                 to="/create"
//                 activeClassName="selected"
//                 className="block py-2 hover:bg-gray-300 rounded mb-2"
//               >
//                 Create User
//               </NavLink>
//             </div>
//             <div className="w-4/5 p-4">
//               <Routes>
//                 <Route path="/" element={<Profile />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/students" element={<Students />} />
//                 <Route path="/teachers" element={<Teachers />} />
//                 <Route path="/create" element={<CreateUser />} />
//               </Routes>
//             </div>
//           </div>
//         ) : (
//           <Login setAuthenticated={setAuthenticated} />
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;


