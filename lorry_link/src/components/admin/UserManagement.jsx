// src/components/admin/UserManagement.js
import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { fetchUsers, deleteUser } from '../../services/adminService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = Array.isArray(users) ? (filter === 'all' 
    ? users 
    : users.filter(user => user.role === filter)) : [];

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="user-management">
      <div className="management-header">
        <h2>User Management</h2>
        <div className="filter-controls">
          <label>Filter by role:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="driver">Drivers</option>
            <option value="goodsOwner">Goods Owners</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="header-cell">ID</div>
          <div className="header-cell">Name</div>
          <div className="header-cell">Email</div>
          <div className="header-cell">Role</div>
          <div className="header-cell">Status</div>
          <div className="header-cell actions">Actions</div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="no-results">No users found</div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="table-row">
              <div className="table-cell">{user.id}</div>
              <div className="table-cell">{user.name}</div>
              <div className="table-cell">{user.email}</div>
              <div className="table-cell">
                <span className={`role-badge ${user.role}`}>
                  {user.role}
                </span>
              </div>
              <div className="table-cell">
                <span className={`status-badge ${user.status}`}>
                  {user.status}
                </span>
              </div>
              <div className="table-cell actions">
                <button className="view-btn">View</button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;