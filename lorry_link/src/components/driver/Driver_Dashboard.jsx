// src/pages/driver/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Driver_Dashboard.css';
import AvailableLoads from './AvailableLoads';
import DriverProfile from './DriverProfile';
import BidHistory from './BidHistory';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('loads');
  const navigate = useNavigate();

  // Fetch driver data on component mount
  useEffect(() => {
    // Add authentication check here
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('driverToken');
    navigate('/login');
  };

  return (
    <div className="driver-dashboard-baground">
      <div className="driver-dashboard">
        <header className="dashboard-header">
          <h1>Driver Dashboard</h1>
          {/* <button onClick={handleLogout} className="logout-button">
            Logout
          </button> */}
        </header>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'loads' ? 'active' : ''}`}
            onClick={() => setActiveTab('loads')}
          >
            Available Loads
          </button>
          <button
            className={`tab-button ${activeTab === 'bids' ? 'active' : ''}`}
            onClick={() => setActiveTab('bids')}
          >
            My Bids
          </button>
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'loads' && <AvailableLoads />}
          {activeTab === 'bids' && <BidHistory />}
          {activeTab === 'profile' && <DriverProfile />}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;