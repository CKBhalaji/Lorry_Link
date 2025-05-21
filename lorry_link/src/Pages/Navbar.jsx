import { useAuth } from '../context/AuthContext';
import { NavLink, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect} from 'react';
import './Navbar.css'; // Add this import
import { ArrowRightOutlined } from '@ant-design/icons';


const Navbar = () => {
  const { logout, isAuthenticated, userType, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    console.log('User logged out successfully');
  };

  useEffect(() => {
    // Force re-render when authentication state changes
  }, [isAuthenticated, userType]);

  return (
    <nav className="navbar">
      <div className={`navbar-container ${userType === 'driver' ? 'driver' : userType === 'goodsOwner' ? 'goods-owner' : ''}`}>
        <div className="navbar-header">
          <div className="navbar-brand">
          <h1>Lorry Link </h1>
            {/* <h1>Lorry Link<ArrowRightOutlined /> </h1> */}
            {/* {userType && (
              <span className="user-type-indicator">
                {userType === 'driver' ? 'Driver' : 
                 userType === 'goodsOwner' ? 'Goods Owner' :
                 userType === 'admin' ? 'Admin' : ''}
              </span>
            )} */}
          </div>
          <div className="user-info">
            {isAuthenticated && userType ? (
              <>
                <span className="username">Welcome, {username}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <div className="auth-links">
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* {isAuthenticated && (
          <div className="navbar-links">
            {userType === 'driver' && (
              <>
                <NavLink 
                  to="/driver/loads" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Available Loads
                </NavLink>
                <Link to="/driver/bids" className="nav-link">My Bids</Link>
                <Link to="/driver/profile" className="nav-link">Profile</Link>
              </>
            )}
            {userType === 'goodsOwner' && (
              <>
                <Link to="/goods-owner/post" className="nav-link">Post Load</Link>
                <Link to="/goods-owner/loads" className="nav-link">My Loads</Link>
                <Link to="/goods-owner/profile" className="nav-link">Profile</Link>
              </>
            )}
            {userType === 'admin' && (
              <>
                <Link to="/admin/users" className="nav-link">User Management</Link>
                <Link to="/admin/loads" className="nav-link">Load Management</Link>
                <Link to="/admin/disputes" className="nav-link">Dispute Resolution</Link>
              </>
            )}
          </div>
        )} */}
      </div>
    </nav>
  );
};
export default Navbar;