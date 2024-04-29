import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Profile from './Profile';
import AssignedSections from './AssignedSections';
import Students from './Students';
import Teachers from './Teachers';
import Create from './Create';
import Results from './Results';

const Home = () => {
  const [email, setEmail] = useState('');
  const [curr, setCurr] = useState(1);
  const [role, setRole] = useState(0);

  const navigate = useNavigate();

  const getEmail = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmail(response.data.email)
      setRole(response.data.role)
    } catch (error) {
      navigate('/auth/login')
      console.error(error)
    }
  }
  useEffect(() => {
    getEmail();
  }, [])

  const handleSwitch = (v) => {
    setCurr(() => v);
  }

  return (
    <div className='w-full h-screen'>
        <div className='w-full'>
          <Navbar email={email}/>
        </div>
        <div className='w-full h-full flex flex-row'>
          <div className='w-[17%] h-full'>
            <Sidebar role={role} handleSwitch={handleSwitch}/>
          </div>
          <div className='w-[83%] h-full'>
            {
              curr === 1 && <Profile/>
            }
            {
              curr === 2 && <AssignedSections/>
            }
            {
              curr === 3 && <Students/>
            }
            {
              curr === 4 && <Teachers/>
            } 
            {
              curr === 5 && <Create/>
            }
            {
              curr === 6 && <Results/>
            }
          </div>
        </div>
      
    </div>
  )
}

export default Home
