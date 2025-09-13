import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

class AdminService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/superadmin`;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('superAdminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Create a new admin user (only super admins can create admins)
   * @param {Object} adminData - Admin data object
   * @param {string} adminData.username - Unique username
   * @param {string} adminData.email - Unique email
   * @param {string} adminData.password - Plain text password (will be hashed)
   * @param {string} adminData.firstName - First name
   * @param {string} adminData.lastName - Last name
   * @param {string} [adminData.phoneNumber] - Optional phone number
   * @returns {Promise<Object>} Response with created admin data
   */
  async createAdmin(adminData) {
    try {
      const response = await axios.post(`${this.baseURL}/admins`, adminData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  /**
   * Retrieve all admin users with pagination and filtering
   * @param {Object} params - Query parameters
   * @param {number} [params.page=1] - Page number
   * @param {number} [params.limit=10] - Items per page
   * @param {string} [params.status] - Filter by status: 'active' or 'inactive'
   * @param {string} [params.search] - Search in username, email, firstName, lastName
   * @returns {Promise<Object>} Response with admins array and pagination
   */
  async getAdmins(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}/admins${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(url, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  }

  /**
   * Get statistical information about admin users
   * @returns {Promise<Object>} Admin statistics
   */
  async getAdminStats() {
    try {
      const response = await axios.get(`${this.baseURL}/admins/stats`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  }

  /**
   * Retrieve a specific admin user by their ID
   * @param {string} adminId - Admin ID
   * @returns {Promise<Object>} Admin data
   */
  async getAdminById(adminId) {
    try {
      const response = await axios.get(`${this.baseURL}/admins/${adminId}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin:', error);
      throw error;
    }
  }

  /**
   * Update admin user details
   * @param {string} adminId - Admin ID
   * @param {Object} updateData - Update data (all fields optional)
   * @param {string} [updateData.username] - New username (must be unique)
   * @param {string} [updateData.email] - New email (must be unique)
   * @param {string} [updateData.firstName] - New first name
   * @param {string} [updateData.lastName] - New last name
   * @param {string} [updateData.phoneNumber] - New phone number (can be null)
   * @returns {Promise<Object>} Updated admin data
   */
  async updateAdmin(adminId, updateData) {
    try {
      const response = await axios.put(`${this.baseURL}/admins/${adminId}`, updateData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }

  /**
   * Activate or deactivate an admin user
   * @param {string} adminId - Admin ID
   * @param {boolean} isActive - true to activate, false to deactivate
   * @returns {Promise<Object>} Updated admin status
   */
  async toggleAdminStatus(adminId, isActive = null) {
    try {
      // If isActive is not provided, we'll let the API toggle it
      const requestData = isActive !== null ? { isActive } : {};
      
      const response = await axios.patch(`${this.baseURL}/admins/${adminId}/status`, 
        requestData, 
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error toggling admin status:', error);
      throw error;
    }
  }

  /**
   * Reset an admin user's password
   * @param {string} adminId - Admin ID
   * @param {string} newPassword - New password (min 6 characters)
   * @returns {Promise<Object>} Success response
   */
  async resetAdminPassword(adminId, newPassword) {
    try {
      const response = await axios.put(`${this.baseURL}/admins/${adminId}/reset-password`, 
        { newPassword }, 
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error resetting admin password:', error);
      throw error;
    }
  }

  /**
   * Delete an admin user (soft delete - deactivates the user)
   * @param {string} adminId - Admin ID
   * @returns {Promise<Object>} Success response
   */
  async deleteAdmin(adminId) {
    try {
      const response = await axios.delete(`${this.baseURL}/admins/${adminId}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }

  /**
   * Utility method to handle API errors and provide user-friendly messages
   * @param {Error} error - Axios error object
   * @returns {string} User-friendly error message
   */
  static getErrorMessage(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return error.response.data.message || 'Invalid request data';
        case 401:
          return 'Session expired. Please login again.';
        case 403:
          return 'Access denied. Only super admins can manage admin users.';
        case 404:
          return 'Admin not found';
        case 409:
          return 'Admin with this username or email already exists';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return error.response.data.message || 'An error occurred';
      }
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    } else {
      return error.message || 'An unexpected error occurred';
    }
  }
}

export const adminService = new AdminService();
