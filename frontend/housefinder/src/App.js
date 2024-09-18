import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelection from './pages/RoleSelection';
import LandlordDashboard from './components/LandlordDashbooard';
import LandLordListing from './components/LandlordListing';
import RenterDashboard from './components/RenterDashboard';
import HouseDetails from './components/HouseDetails';
import Messaging from './components/Messaging';
import styles from './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}auth/login/success`;
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
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.container}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            user ? (
              role ? (
                <Home user={user} />
              ) : (
                <Navigate to="/role" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          element={
            user ? (
              role ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/role" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          exact
          path="/role"
          element={<RoleSelection setRole={setRole} />}
        />
        <Route
          path="/my-houses"
          element={role === 'landlord' ? <LandlordDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/create-house"
          element={role === 'landlord' ? <LandLordListing /> : <Navigate to="/" />}
        />
        <Route
          path="/renter-dashboard"
          element={role === 'renter' ? <RenterDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/house/:id"
          element={<HouseDetails />}
        />
        <Route
          path="/house/:id/messages"
          element={<Messaging />} // New route for messaging within the house context
        />
      </Routes>
    </div>
  );
}

export default App;