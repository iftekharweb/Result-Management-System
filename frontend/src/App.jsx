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