// src/components/driver/DriverProfile.js
import React, { useState, useEffect } from 'react';
import './DriverProfile.css';
import { fetchDriverProfile } from '../../services/driverService';

const DriverProfile = () => {
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
    // const [profile, setProfile] = useState(null);
    const [tempProfile, setTempProfile] = useState({});

    useEffect(() => {
        if (profile) {
            setTempProfile(profile);
        }
    }, [profile]);

    const handleInputChange = (field, value) => {
        setTempProfile(prev => ({ ...prev, [field]: value }));
    };
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // const renderField = (field, label) => (
    //     <div className="DP-profile-field">
    //         <label>{label}</label>
    //         {editingField === field ? (
    //             <div>
    //                 <input
    //                     type="text"
    //                     value={profile[field]}
    //                     onChange={(e) => setProfile(prev => ({ ...prev, [field]: e.target.value }))}
    //                 />
    //                 <button onClick={() => handleSave(field, profile[field])}>Save</button>
    //                 <button onClick={() => setEditingField(null)}>Cancel</button>
    //             </div>
    //         ) : (
    //             <div>
    //                 <p>{profile[field]}</p>
    //                 <button onClick={() => handleEdit(field)}>Edit</button>
    //             </div>
    //         )}
    //     </div>
    // );
    const renderField = (field, label) => (
        <div className="DP-profile-field">
            <label>{label}</label>
            {isEditing ? (
                <input
                    type="text"
                    value={tempProfile[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                />
            ) : (
                <p>{profile[field]}</p>
            )}
        </div>
    );

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleSave = () => {
        setProfile(tempProfile);
        setIsEditing(false);
        // Add API call to save changes here
    };
    const handleCancel = () => {
        setIsEditing(false);
        // Optionally reset to original values
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

    if (loading) return <div className="DP-loading">Loading profile...</div>;
    if (!profile) return <div className="DP-error">Failed to load profile</div>;

    return (
        <div className="DP-driver-profile">
            <h2>My Profile</h2>

            <div className="DP-profile-section">
                <h3>Personal Information</h3>
                <div className="DP-profile-grid">
                    {renderField('fullName', 'Full Name')}
                    {renderField('email', 'Email')}
                    {renderField('phone', 'Phone')}
                    {renderField('aadhar', 'Aadhar Number')}
                    {renderField('experience', 'Experience')}
                    {/* {renderField('rating', 'Rating')} */}
                    {/* <div className="DP-profile-field">
                        <label>Full Name</label>
                        <p>{profile.fullName}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Email</label>
                        <p>{profile.email}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Phone</label>
                        <p>{profile.phone}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Aadhar Number</label>
                        <p>{profile.aadhar}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Experience</label>
                        <p>{profile.experience} years</p>
                    </div>*/}
                    <div className="DP-profile-field">
                        <label>Rating</label>
                        <p>{profile.rating || 'Not rated yet'}</p>
                    </div>
                </div>
            </div>

            <div className="DP-profile-section">
                <h3>Vehicle Information</h3>
                <div className="DP-profile-grid">
                    {renderField('vehicleType', 'Vehicle Type')}
                    {renderField('vehicleName', 'Vehicle Name')}
                    {renderField('loadCapacity', 'Load Capacity')}
                    {renderField('rcNumber', 'RC Number')}
                    {/* <div className="DP-profile-field">
                        <label>Vehicle Type</label>
                        <p>{profile.vehicleType}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Vehicle Name</label>
                        <p>{profile.vehicleName}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Load Capacity</label>
                        <p>{profile.loadCapacity} kg</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>RC Number</label>
                        <p>{profile.rcNumber}</p>
                    </div> */}
                </div>
            </div>

            <div className="DP-profile-section">
                <h3>Payment Information</h3>
                <div className="DP-profile-grid">
                    {renderField('paymentMethod', 'Primary Payment Method')}
                    {renderField('paymentDetails', 'Payment Details')}
                    {/* <div className="DP-profile-field">
                        <label>Primary Payment Method</label>
                        <p>{profile.paymentMethod}</p>
                    </div>
                    <div className="DP-profile-field">
                        <label>Payment Details</label>
                        <p>{profile.paymentDetails}</p>
                    </div> */}
                </div>
            </div>

            {/* <button className="DP-edit-btn" onClick={handleEdit}>Edit Profile</button> */}
            {isEditing ? (
                <div>
                    <button className="DP-edit-btn" onClick={handleSave}>Save</button>
                    <button className="DP-edit-btn" onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <button className="DP-edit-btn" onClick={handleEdit}>Edit Profile</button>
            )}
        </div>
    );
};

export default DriverProfile;