import { useState } from 'react'
import Login from './pages/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile';
import Students from './pages/Students';
import Teachers from './pages/Teachers';

function App() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/login' element={<Login/>}></Route>
                <Route path='/*' element={<Profile/>} />
                <Route path='/students' element={<Students/>} />
                <Route path='/teachers' element={<Teachers/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App