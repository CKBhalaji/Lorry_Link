// src/components/admin/DisputeResolution.js
import React, { useState, useEffect } from 'react';
import './DisputeResolution.css';
import { fetchDisputes, resolveDispute } from '../../services/adminService';

const DisputeResolution = () => {
  const disputes = [
    {
      id: 1,
      loadId: 'L12345',
      complainantName: 'John Doe',
      againstName: 'Jane Smith',
      date: '2023-10-01T09:00:00',
      message: 'The load was delivered late without prior notice.',
      status: 'open'
    },
    {
      id: 2,
      loadId: 'L67890',
      complainantName: 'Alice Johnson',
      againstName: 'Bob Williams',
      date: '2023-10-05T14:30:00',
      message: 'The load was damaged during transit.',
      status: 'resolved',
      resolution: 'approved',
      resolvedDate: '2023-10-07T11:15:00'
    },
    {
      id: 3,
      loadId: 'L24680',
      complainantName: 'Michael Brown',
      againstName: 'Sarah Johnson',
      date: '2023-10-10T16:45:00',
      message: 'The load was delivered to the wrong location.',
      status: 'open'
    },
    {
      id: 4,
      loadId: 'L13579',
      complainantName: 'Emily Davis',
      againstName: 'David Wilson',
      date: '2023-10-12T11:20:00',
      message: 'The load was incomplete upon delivery.',
      status: 'resolved',
      resolution: 'rejected',
      resolvedDate: '2023-10-14T09:30:00'
    },
    {
      id: 5,
      loadId: 'L97531',
      complainantName: 'Robert Taylor',
      againstName: 'Jennifer Anderson',
      date: '2023-10-15T13:15:00',
      message: 'The load was damaged during loading.',
      status: 'open'
    }
  ];
  // const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('open');

  useEffect(() => {
    const loadDisputes = async () => {
      try {
        const data = await fetchDisputes();
        setDisputes(data);
      } catch (error) {
        console.error('Error fetching disputes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDisputes();
  }, []);

  const handleResolve = async (disputeId, resolution) => {
    try {
      await resolveDispute(disputeId, resolution);
      setDisputes(disputes.map(dispute =>
        dispute.id === disputeId ? { ...dispute, status: 'resolved' } : dispute
      )); 
    } catch (error) {
      console.error('Error resolving dispute:', error);
    }
  };

  const filteredDisputes = Array.isArray(disputes) ? disputes.filter(dispute =>
    activeTab === 'open' ? dispute.status === 'open' : dispute.status === 'resolved'
  ) : [];

  if (loading) return <div className="loading">Loading disputes...</div>;

  return (
    <div className="dispute-resolution">
      <div className="management-header">
        <h2>Dispute Resolution</h2>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'open' ? 'active' : ''}`}
            onClick={() => setActiveTab('open')}
          >
            Open Disputes
          </button>
          <button
            className={`tab-button ${activeTab === 'resolved' ? 'active' : ''}`}
            onClick={() => setActiveTab('resolved')}
          >
            Resolved Disputes
          </button>
        </div>
      </div>

      {filteredDisputes.length === 0 ? (
        <div className="no-results">
          No {activeTab} disputes found
        </div>
      ) : (
        <div className="disputes-list">
          {filteredDisputes.map(dispute => (
            <div key={dispute.id} className="dispute-card">
              <div className="dispute-header">
                <h3>Dispute #{dispute.id}</h3>
                <span className={`status-badge ${dispute.status}`}>
                  {dispute.status}
                </span>
              </div>
              <div className="dispute-details">
                <p><strong>Load ID:</strong> {dispute.loadId}</p>
                <p><strong>Complainant:</strong> {dispute.complainantName}</p>
                <p><strong>Against:</strong> {dispute.againstName}</p>
                <p><strong>Date:</strong> {new Date(dispute.date).toLocaleString()}</p>
              </div>
              <div className="dispute-message">
                <p><strong>Message:</strong></p>
                <p>{dispute.message}</p>
              </div>

              {dispute.status === 'open' && (
                <div className="resolution-actions">
                  <button
                    className="resolve-btn approve"
                    onClick={() => handleResolve(dispute.id, 'approved')}
                  >
                    Approve Complaint
                  </button>
                  <button
                    className="resolve-btn reject"
                    onClick={() => handleResolve(dispute.id, 'rejected')}
                  >
                    Reject Complaint
                  </button>
                </div>
              )}

              {dispute.status === 'resolved' && (
                <div className="resolution-outcome">
                  <p><strong>Resolution:</strong> {dispute.resolution}</p>
                  <p><strong>Resolved on:</strong> {new Date(dispute.resolvedDate).toLocaleString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisputeResolution;