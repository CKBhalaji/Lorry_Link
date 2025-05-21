// src/components/driver/BidHistory.js
import React, { useState, useEffect } from 'react';
import './BidHistory.css';
import { fetchDriverBids } from '../../services/driverService';

const BidHistory = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBids = async () => {
      try {
        const data = await fetchDriverBids();
        setBids(data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBids();
  }, []);

  if (loading) return <div className="loading">Loading your bids...</div>;

  return (
    <div className="bid-history">
      <h2>My Bid History</h2>
      {bids.length === 0 ? (
        <p className="no-bids">You haven't placed any bids yet.</p>
      ) : (
        <div className="bids-list">
          {bids.map(bid => (
            <div key={bid.id} className={`bid-card ${bid.status.toLowerCase()}`}>
              <div className="bid-info">
                <h3>{bid.goodsType}</h3>
                <p><strong>Route:</strong> {bid.pickupLocation} → {bid.deliveryLocation}</p>
                <p><strong>Your Bid:</strong> ₹{bid.amount}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${bid.status.toLowerCase()}`}>{bid.status}</span></p>
                <p><strong>Date:</strong> {new Date(bid.bidDate).toLocaleString()}</p>
              </div>
              {bid.status === 'PENDING' && (
                <button className="cancel-btn">Cancel Bid</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BidHistory;