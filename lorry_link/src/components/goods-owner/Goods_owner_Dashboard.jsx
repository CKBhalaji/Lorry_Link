// src/pages/goods-owner/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Goods_owner_Dashboard.css';
import PostLoad from './PostLoad';
import MyLoads from './MyLoads';
import OwnerProfile from './OwnerProfile';

const GoodsOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  const navigate = useNavigate();

  useEffect(() => {
    // Add authentication check here
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    navigate('/login');
  };

  return (
    <div className="owner-dashboard-baground">
      <div className="owner-dashboard">
        <header className="dashboard-header">
          <h1>Goods Owner Dashboard</h1>
          {/* <button onClick={handleLogout} className="logout-button">
            Logout
          </button> */}
        </header>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
            onClick={() => setActiveTab('post')}
          >
            Post New Load
          </button>
          <button
            className={`tab-button ${activeTab === 'loads' ? 'active' : ''}`}
            onClick={() => setActiveTab('loads')}
          >
            My Loads
          </button>
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'post' && <PostLoad />}
          {activeTab === 'loads' && <MyLoads />}
          {activeTab === 'profile' && <OwnerProfile />}
        </div>
      </div>
    </div>
  );
};

export default GoodsOwnerDashboard;