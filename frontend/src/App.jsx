import { useState } from 'react'
import Login from './pages/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import MarkEntry from './pages/MarkEntry';
import Create from './pages/Create';
import AssignedSections from './pages/AssignedSections';
import Home from './pages/Home';

function App() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/login' element={<Login/>}></Route>
                <Route path='/' element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

