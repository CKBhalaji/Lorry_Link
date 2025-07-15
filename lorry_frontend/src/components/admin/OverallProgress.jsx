import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { fetchUsers, fetchAllLoads, fetchDisputes, fetchAdmins } from '../../services/adminService';
import './OverallProgress.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const OverallProgress = () => {
  const [users, setUsers] = useState([]);
  const [loads, setLoads] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, loadsData, disputesData, adminsData] = await Promise.all([
          fetchUsers(),
          fetchAllLoads(),
          fetchDisputes(),
          fetchAdmins()
        ]);
        setUsers(usersData || []);
        setLoads(loadsData || []);
        setDisputes(disputesData || []);
        setAdmins(adminsData || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // User type distribution (remove 'Unknown')
  const userTypeCounts = users.reduce((acc, user) => {
    if (user.type && user.type.toLowerCase() !== 'unknown') {
      acc[user.type] = (acc[user.type] || 0) + 1;
    }
    return acc;
  }, {});

  // Loads by status
  const loadStatusCounts = loads.reduce((acc, load) => {
    const status = load.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Disputes resolved vs unresolved
  const disputeStatusCounts = disputes.reduce((acc, dispute) => {
    const status = dispute.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div>Loading overall progress...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="overall-progress-main">
      <h2>Overall Progress</h2>
      {/* Loads by Status - Full Width */}
      <div className="load-status-fullwidth">
        <h3>Loads by Status</h3>
        <Bar
          data={{
            labels: Object.keys(loadStatusCounts),
            datasets: [
              {
                label: 'Loads',
                data: Object.values(loadStatusCounts),
                backgroundColor: '#36A2EB',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false, labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' } },
              title: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' }
            },
            scales: {
              x: {
                ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' },
                grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#eee' }
              },
              y: {
                ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' },
                grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#eee' }
              }
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
      {/* User Type Distribution & Disputes Status - 2 columns below */}
      <div className="overall-progress-charts-grid">
        {/* User Type Distribution */}
        <div className="chart-card">
          <h3>User Type Distribution</h3>
          {Object.keys(userTypeCounts).length > 0 ? (
            <Pie
              data={{
                labels: Object.keys(userTypeCounts),
                datasets: [
                  {
                    data: Object.values(userTypeCounts),
                    backgroundColor: [
                      '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' } },
                  title: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' }
                }
              }}
            />
          ) : (
            <div style={{ color: '#888', marginTop: '2rem' }}>No user type data available.</div>
          )}
        </div>
        {/* Disputes Status */}
        <div className="chart-card">
          <h3>Disputes Status</h3>
          <Pie
            data={{
              labels: Object.keys(disputeStatusCounts),
              datasets: [
                {
                  data: Object.values(disputeStatusCounts),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' } },
                title: { color: getComputedStyle(document.documentElement).getPropertyValue('--primary-text') || '#222' }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Responsive grid and card styling
// Add this CSS to your main stylesheet or CSS module for this component:
/*
.overall-progress-charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.chart-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.5rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
*/

export default OverallProgress;
