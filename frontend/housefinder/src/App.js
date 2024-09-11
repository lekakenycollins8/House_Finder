import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelection from './pages/RoleSelection';


function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null)

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      setUser(data.user._json);
      setRole(data.user.role);
    } catch (error) {
      console.log(error);
      setUser(null);
      setRole(null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={user && role? <Home user={user} /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={user? <Navigate to="/" /> : <Login />} />
        <Route exact path="/signup" element={user? <Navigate to="/" /> : <Signup />} />
        <Route exact path="/role" element={user && role? <RoleSelection setRole={setRole} /> : <Navigate to="/role" />} />
      </Routes>
    </div>
  );
}

export default App;
