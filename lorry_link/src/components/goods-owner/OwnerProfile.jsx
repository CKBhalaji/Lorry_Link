// src/components/goods-owner/OwnerProfile.js
import React, { useState, useEffect } from 'react';
import './OwnerProfile.css';
import { fetchOwnerProfile } from '../../services/goodsOwnerService';

const OwnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchOwnerProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!profile) return <div className="error">Failed to load profile</div>;

  return (
    <div className="owner-profile">
      <h2>My Profile</h2>
      
      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Full Name</label>
            <p>{profile.fullName}</p>
          </div>
          <div className="profile-field">
            <label>Email</label>
            <p>{profile.email}</p>
          </div>
          <div className="profile-field">
            <label>Phone</label>
            <p>{profile.phone}</p>
          </div>
          <div className="profile-field">
            <label>Aadhar Number</label>
            <p>{profile.aadhar}</p>
          </div>
          <div className="profile-field">
            <label>Company Name</label>
            <p>{profile.companyName || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
      <div className="profile-section">
        <h3>Payment Information</h3>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Primary Payment Method</label>
            <p>{profile.paymentMethod}</p>
          </div>
          <div className="profile-field">
            <label>Payment Details</label>
            <p>{profile.paymentDetails}</p>
          </div>
        </div>
      </div>
      
      <button className="edit-btn">Edit Profile</button>
    </div>
  );
};

export default OwnerProfile;