// src/components/admin/AdminProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';
import { fetchAdminProfile, updateAdminProfile } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isSuperAdmin = currentUser && currentUser.role === 'superadmin';

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAdminProfile();
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
          profile: data.profile,
          phone: data.phone
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = '10-digit phone number required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedProfile = await updateAdminProfile(formData);
      setProfile(updatedProfile);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = () => {
  navigate('/admin/dashboard?tab=change-password', { state: { activeTab: 'change-password' } });
  // window.location.reload(); // Force immediate refresh
};

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!profile) return <div className="error">Failed to load profile</div>;

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h2>Admin Profile</h2>
        {!editMode && (
          <button
            className="edit-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Profile</label>
            <select
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              disabled={!isSuperAdmin}
              className={!isSuperAdmin ? 'disabled-field' : ''}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{profile.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{profile.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Profile:</span>
            <span className="detail-value">{profile.profile}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{profile.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Admin Since:</span>
            <span className="detail-value">
              {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>

          <button
            className="change-password-btn"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;