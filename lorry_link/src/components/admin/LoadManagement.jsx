// src/components/admin/LoadManagement.js
import React, { useState, useEffect } from 'react';
import './LoadManagement.css';
import { fetchAllLoads, updateLoadStatus } from '../../services/adminService';

const LoadManagement = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllLoads();
        setLoads(data);
      } catch (error) {
        console.error('Error fetching loads:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleStatusChange = async (loadId, newStatus) => {
    try {
      await updateLoadStatus(loadId, newStatus);
      setLoads(loads.map(load => 
        load.id === loadId ? { ...load, status: newStatus } : load
      ));
    } catch (error) {
      console.error('Error updating load status:', error);
    }
  };

  const filteredLoads = Array.isArray(loads) ? (filter === 'all' 
    ? loads 
    : loads.filter(load => load.status === filter)) : [];

  if (loading) return <div className="loading">Loading loads...</div>;

  return (
    <div className="load-management">
      <div className="management-header">
        <h2>Load Management</h2>
        <div className="filter-controls">
          <label>Filter by status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Loads</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="loads-table">
        <div className="table-header">
          <div className="header-cell">ID</div>
          <div className="header-cell">Goods Type</div>
          <div className="header-cell">Route</div>
          <div className="header-cell">Owner</div>
          <div className="header-cell">Bids</div>
          <div className="header-cell">Status</div>
          <div className="header-cell actions">Actions</div>
        </div>

        {filteredLoads.length === 0 ? (
          <div className="no-results">No loads found</div>
        ) : (
          filteredLoads.map(load => (
            <div key={load.id} className="table-row">
              <div className="table-cell">{load.id}</div>
              <div className="table-cell">{load.goodsType}</div>
              <div className="table-cell">
                {load.pickupLocation} → {load.deliveryLocation}
              </div>
              <div className="table-cell">{load.ownerName}</div>
              <div className="table-cell">{load.bidCount}</div>
              <div className="table-cell">
                <span className={`status-badge ${load.status}`}>
                  {load.status}
                </span>
              </div>
              <div className="table-cell actions">
                <select
                  value={load.status}
                  onChange={(e) => handleStatusChange(load.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className="view-btn">Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LoadManagement;