import axios from 'axios';

// Cookie utility functions (same as in AuthContext)
function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}
function removeCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// src/services/driverService.js
const API_BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'https://lorry-application.onrender.com') + '/api/drivers';

export const fetchAvailableLoads = async () => {
  const token = getCookie('authToken');
  // console.log('DriverService: Attempting to fetch available loads.');
  // console.log('DriverService: Using token:', token);
  const url = `${API_BASE_URL}/loads`;
  // console.log('DriverService: Target URL:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Log network errors or errors from response.json() if they occur
    // console.error('DriverService: Exception during fetchAvailableLoads:', error);
    throw error; // Re-throw the error to be caught by the calling component
  }
};

// Accept a bid
export const acceptBid = async (bidId) => {
  const token = getCookie('authToken');
  const url = `${API_BASE_URL}/bids/${bidId}/accept`;
  const response = await axios.put(url, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// Decline a bid
export const declineBid = async (bidId) => {
  const token = getCookie('authToken');
  const url = `${API_BASE_URL}/bids/${bidId}/decline`;
  const response = await axios.put(url, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const placeBid = async (bidData) => {
  const token = getCookie('authToken');
  const response = await axios.post(`${API_BASE_URL}/bids`, bidData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const fetchDriverBids = async (driverId) => {
  const token = getCookie('authToken');
  const userRaw = getCookie('authUser');
  let userType = null;
  try {
    if (userRaw) {
      const userObj = JSON.parse(userRaw);
      userType = userObj.type;
    }
  } catch (e) {
    userType = null;
  }
  if (userType !== 'driver') {
    removeCookie('authToken');
    removeCookie('authUser');
    window.location.href = '/login';
    throw new Error('You must be logged in as a driver to view your bids.');
  }
  // console.log(`DriverService: Attempting to fetch bids for driver ID: ${driverId}.`);
  // console.log('DriverService: Using token:', token);
  const url = `${API_BASE_URL}/${driverId}/bids`;
  // console.log('DriverService: Target URL:', url);

  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // console.log('DriverService: Response status for fetchDriverBids:', response.status);

    // console.log('DriverService: Successfully fetched driver bids. Data:', response.data);
    return response.data;
  } catch (error) {
    // console.error(`DriverService: Exception during fetchDriverBids for driver ID ${driverId}:`, error.response ? error.response.data : error.message);
    if (error.response) {
      // console.error('DriverService: Error status:', error.response.status);
      // console.error('DriverService: Error body:', error.response.data);
      if (error.response.status === 403) {
        removeCookie('authToken');
        removeCookie('authUser');
        window.location.href = '/login';
        throw new Error('Access denied. Please log in as a driver.');
      }
      throw new Error(`Failed to fetch driver bids. Status: ${error.response.status}`);
    } else if (error.request) {
      // console.error('DriverService: No response received for fetchDriverBids:', error.request);
      throw new Error('Failed to fetch driver bids: No response from server.');
    } else {
      // console.error('DriverService: Error setting up request for fetchDriverBids:', error.message);
      throw new Error(`Failed to fetch driver bids: ${error.message}`);
    }
  }
};

export const fetchDriverProfile = async (driverId) => {
  const token = getCookie('authToken');
  // console.log(`DriverService: Attempting to fetch profile for driver ID: ${driverId}.`);
  // console.log('DriverService: Using token:', token);
  const url = `${API_BASE_URL}/${driverId}/profile`;
  // console.log('DriverService: Target URL:', url);

  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // console.log('DriverService: Response status for fetchDriverProfile:', response.status);
    // console.log('DriverService: Successfully fetched driver profile. Data:', response.data);
    return response.data;
  } catch (error) {
    // console.error(`DriverService: Exception during fetchDriverProfile for driver ID ${driverId}:`, error.response ? error.response.data : error.message);
    if (error.response) {
      // console.error('DriverService: Error status:', error.response.status);
      // console.error('DriverService: Error body:', error.response.data);
      throw new Error(`Failed to fetch driver profile. Status: ${error.response.status}`);
    } else if (error.request) {
      // console.error('DriverService: No response received for fetchDriverProfile:', error.request);
      throw new Error('Failed to fetch driver profile: No response from server.');
    } else {
      // console.error('DriverService: Error setting up request for fetchDriverProfile:', error.message);
      throw new Error(`Failed to fetch driver profile: ${error.message}`);
    }
  }
};

export const createDriverDispute = async (disputeData) => {
  const token = getCookie('authToken'); // Or a generic 'authToken'
  try {
    // Note: The old path was '/api/driver/disputes'. The new backend router for drivers is '/api/drivers'.
    // So the new path should be `${API_BASE_URL}/disputes`.
    const response = await axios.post(`${API_BASE_URL}/disputes`, disputeData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    // console.error('Error creating driver dispute:', error);
    throw error;
  }
};

export const fetchDriverDisputes = async () => {
  const token = getCookie('authToken');
  // console.log('DriverService: Attempting to fetch driver disputes.');
  // console.log('DriverService: Using token:', token);
  const url = `${API_BASE_URL}/disputes`;
  // console.log('DriverService: Target URL for fetchDriverDisputes:', url);

  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // console.log('DriverService: Response status for fetchDriverDisputes:', response.status);
    // console.log('DriverService: Successfully fetched driver disputes. Data:', response.data);
    return response.data;
  } catch (error) {
    // console.error('DriverService: Exception during fetchDriverDisputes:', error.response ? error.response.data : error.message);
    if (error.response) {
      // console.error('DriverService: Error status:', error.response.status);
      // console.error('DriverService: Error body:', error.response.data);
      throw new Error(`Failed to fetch driver disputes. Status: ${error.response.status}`);
    } else if (error.request) {
      // console.error('DriverService: No response received for fetchDriverDisputes:', error.request);
      throw new Error('Failed to fetch driver disputes: No response from server.');
    } else {
      // console.error('DriverService: Error setting up request for fetchDriverDisputes:', error.message);
      throw new Error(`Failed to fetch driver disputes: ${error.message}`);
    }
  }
};
export const updateDriverProfile = async (driverId, updatePayload) => {
  const token = getCookie('authToken');
  const url = `${API_BASE_URL}/${driverId}/profile`;
  try {
    const response = await axios.put(url, updatePayload, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Failed to update profile');
    }
    throw error;
  }
};

// Fetch loads for My Loads page (accepted or declined by driver)
export const fetchDriverMyLoads = async (status) => {
  const token = getCookie('authToken');
  let url = `${API_BASE_URL}/my-loads`;
  if (status) {
    url += `?status=${encodeURIComponent(status)}`;
  }
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update load status (for driver to update to in_transit or delivered)
export const updateLoadStatus = async (loadId, newStatus) => {
  const token = getCookie('authToken');
  const url = `${API_BASE_URL}/loads/${loadId}/status`;
  const response = await axios.put(url, { status: newStatus }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// Add more driver-related API calls as needed
export const uploadDriverDocument = async (driverId, file, docType) => {
  const token = getCookie('authToken');
  const formData = new FormData();
  formData.append('file', file);

  // The backend endpoint and field name may need to be adjusted to your API
  // Example: /api/drivers/{driverId}/upload?docType=driving_license
  const response = await axios.post(
    `${API_BASE_URL}/${driverId}/upload?docType=${docType}`,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

export const changeDriverPassword = async (driverId, oldPassword, newPassword) => {
  const token = getCookie('authToken');
  const url = `${API_BASE_URL}/${driverId}/password`;
  try {
    const response = await axios.put(url, {
      old_password: oldPassword,
      new_password: newPassword
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Failed to change password');
    }
    throw error;
  }
};