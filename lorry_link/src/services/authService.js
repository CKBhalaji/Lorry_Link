export const signUpDriver = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/api/signup-driver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const signUpGoodsOwner = async (goodsOwnerData) => {
  try {
    const response = await axios.post(`${API_URL}/signup-goods-owner`, goodsOwnerData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendOTP = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const response = await fetch(`http://localhost:8080/api/verification/send?email=${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to send OTP');
    return otp;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch('http://localhost:8080/api/verification/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        token: otp,
      }),
    });
    if (!response.ok) throw new Error('Failed to verify OTP');
    return response.json();
  } catch (error) {
    throw error;
  }
};