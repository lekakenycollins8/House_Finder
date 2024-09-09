import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      setUser(data.user._json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={user? <Home user={user} /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={user? <Navigate to="/" /> : <Login />} />
        <Route exact path="/signup" element={user? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </div>
  );
}

export default App;
