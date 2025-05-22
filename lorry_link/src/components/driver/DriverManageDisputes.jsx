// src/components/driver/ManageDisputes.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageDisputes.css';
import { fetchDriverDisputes, createDriverDispute } from '../../services/driverService';

const ManageDisputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    loadId: '',
    disputeType: 'payment',
    message: '',
    attachments: null
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const data = await fetchDriverDisputes();
        setDisputes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching disputes:', error);
        setDisputes([]);
      }
    };

    fetchDisputes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.loadId) newErrors.loadId = 'Load ID is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (formData.message.length > 500) newErrors.message = 'Message too long (max 500 chars)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newDispute = await createDriverDispute(formData);
      setDisputes([newDispute, ...disputes]);
      setShowCreateForm(false);
      setFormData({
        loadId: '',
        disputeType: 'payment',
        message: '',
        attachments: null
      });
      alert('Dispute created successfully!');
    } catch (error) {
      console.error('Error creating dispute:', error);
      alert(error.message || 'Failed to create dispute');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'pending',
      accepted: 'accepted',
      rejected: 'rejected',
      resolved: 'resolved'
    };
    return (
      <span className={`status-badge ${statusClasses[status] || ''}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div className="loading">Loading disputes...</div>;

  return (
    <div className="manage-disputes-driver">
      <div className="disputes-header">
        <h2>My Disputes</h2>
        <button
          className={`toggle-form-btn ${showCreateForm ? 'cancel' : 'add'}`}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Add New Dispute'}
        </button>
      </div>

      {showCreateForm && (
        <div className="create-dispute-form">
          <h3>Create New Dispute</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Load ID</label>
              <input
                type="text"
                name="loadId"
                value={formData.loadId}
                onChange={handleChange}
                className={errors.loadId ? 'error' : ''}
              />
              {errors.loadId && <span className="error-message">{errors.loadId}</span>}
            </div>
            
            <div className="form-group">
              <label>Dispute Type</label>
              <select
                name="disputeType"
                value={formData.disputeType}
                onChange={handleChange}
              >
                <option value="payment">Payment Issue</option>
                <option value="delivery">Delivery Problem</option>
                <option value="goods">Goods Condition</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                rows="5"
                placeholder="Describe your dispute in detail..."
              />
              <div className="char-count">
                {formData.message.length}/500 characters
              </div>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            <div className="form-group">
              <label>Attachment (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <small>Upload supporting documents (max 5MB)</small>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
              >
                Submit Dispute
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="disputes-list">
        {disputes.length === 0 ? (
          <div className="no-disputes">
            {showCreateForm ? '' : 'You have no disputes yet.'}
          </div>
        ) : (
          disputes.map(dispute => (
            <div key={dispute.id} className="dispute-card">
              <div className="dispute-header">
                <h3>Dispute #{dispute.id}</h3>
                {getStatusBadge(dispute.status)}
              </div>
              <div className="dispute-details">
                <p><strong>Load ID:</strong> {dispute.loadId}</p>
                <p><strong>Type:</strong> {dispute.type}</p>
                <p><strong>Date:</strong> {new Date(dispute.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="dispute-message">
                <p><strong>Message:</strong> {dispute.message}</p>
              </div>
              {dispute.resolution && (
                <div className="dispute-resolution">
                  <p><strong>Resolution:</strong> {dispute.resolution}</p>
                  {dispute.resolvedAt && (
                    <p><strong>Resolved on:</strong> {new Date(dispute.resolvedAt).toLocaleDateString()}</p>
                  )}
                </div>
              )}
              {dispute.attachments && (
                <div className="dispute-attachments">
                  <strong>Attachments:</strong>
                  <a href={dispute.attachments.url} target="_blank" rel="noopener noreferrer">
                    {dispute.attachments.name}
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageDisputes;