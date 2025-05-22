// src/components/goods-owner/MyLoads.js
import React, { useState, useEffect } from 'react';
import './MyLoads.css';
import { fetchOwnerLoads } from '../../services/goodsOwnerService';

const MyLoads = () => {
  const [loading, setLoading] = useState(true);
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const data = await fetchOwnerLoads();
        setLoads(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching loads:', error);
        setLoads([]);
      }
    };

    fetchLoads();
  }, []);

  if (loading) return <div className="loading">Loading your loads...</div>;

  return (
    <div className="my-loads">
      <h2>My Loads</h2>
      {loads.length === 0 ? (
        <p className="no-loads">You haven't posted any loads yet.</p>
      ) : (
        <div className="loads-list">
          {loads.map(load => (
            <div key={load.id} className={`load-card ${load.status.toLowerCase()}`}>
              <div className="load-header">
                <h3>{load.goodsType}</h3>
                <span className={`status-badge ${load.status.toLowerCase()}`}>{load.status}</span>
              </div>
              <div className="load-details">
                <p><strong>From:</strong> {load.pickupLocation}</p>
                <p><strong>To:</strong> {load.deliveryLocation}</p>
                <p><strong>Weight:</strong> {load.weight} kg</p>
                <p><strong>Dates:</strong> {new Date(load.pickupDate).toLocaleDateString()} - {new Date(load.deliveryDate).toLocaleDateString()}</p>
                <p><strong>Bids Received:</strong> {load.bidCount}</p>
                {load.highestBid && (
                  <p><strong>Highest Bid:</strong> ₹{load.highestBid}</p>
                )}
              </div>
              <div className="load-actions">
                {load.status === 'ACTIVE' && (
                  <button className="view-bids-btn">View Bids</button>
                )}
                {load.status === 'ACTIVE' && (
                  <button className="cancel-btn">Cancel Load</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLoads;