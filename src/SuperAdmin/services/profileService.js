import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

// Get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('superAdminToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Profile API service
export const profileService = {
  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/superadmin/profile`, profileData, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/superadmin/change-password`, passwordData, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }
};
