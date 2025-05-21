// src/components/driver/DriverProfile.js
import React, { useState, useEffect } from 'react';
import './DriverProfile.css';
import { fetchDriverProfile } from '../../services/driverService';

const DriverProfile = () => {
    // const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sample data structure for reference:
    const profile = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        aadhar: '1234 5678 9012',
        experience: 5,
        rating: 4.5,
        vehicleType: 'Truck',
        vehicleName: 'Ashok Leyland 3718',
        loadCapacity: 3500,
        rcNumber: 'MH01AB1234',
        paymentMethod: 'UPI',
        paymentDetails: 'john.doe@upi'
    };


    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchDriverProfile();
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
        <div className="driver-profile">
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
                        <label>Experience</label>
                        <p>{profile.experience} years</p>
                    </div>
                    <div className="profile-field">
                        <label>Rating</label>
                        <p>{profile.rating || 'Not rated yet'}</p>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h3>Vehicle Information</h3>
                <div className="profile-grid">
                    <div className="profile-field">
                        <label>Vehicle Type</label>
                        <p>{profile.vehicleType}</p>
                    </div>
                    <div className="profile-field">
                        <label>Vehicle Name</label>
                        <p>{profile.vehicleName}</p>
                    </div>
                    <div className="profile-field">
                        <label>Load Capacity</label>
                        <p>{profile.loadCapacity} kg</p>
                    </div>
                    <div className="profile-field">
                        <label>RC Number</label>
                        <p>{profile.rcNumber}</p>
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

export default DriverProfile;