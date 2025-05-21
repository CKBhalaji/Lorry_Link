// src/pages/admin/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin_Dashboard.css';
import UserManagement from './UserManagement';
import LoadManagement from './LoadManagement';
import DisputeResolution from './DisputeResolution';
import AddAdmin from './AddAdmin';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className='admin-dashboard-baground'>
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          {/* <button onClick={handleLogout} className="logout-button">
          Logout
        </button> */}
        </header>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button
            className={`tab-button ${activeTab === 'addAdmin'? 'active' : ''}`}
            onClick={() => setActiveTab('addAdmin')}
          >
            Add Admin
          </button>
          <button
            className={`tab-button ${activeTab === 'loads' ? 'active' : ''}`}
            onClick={() => setActiveTab('loads')}
          >
            Load Management
          </button>
          <button
            className={`tab-button ${activeTab === 'disputes' ? 'active' : ''}`}
            onClick={() => setActiveTab('disputes')}
          >
            Dispute Resolution
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'addAdmin' && <AddAdmin />}
          {/* <Route path= "users/add" element={<AddAdmin />} /> */}
          {activeTab === 'loads' && <LoadManagement />}
          {activeTab === 'disputes' && <DisputeResolution />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;