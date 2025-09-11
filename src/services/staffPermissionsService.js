import axios from 'axios';

const BASE_URL = 'http://localhost:8001/staff-permissions';

// Add auth token to all requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('AuthToken'); // Adjust based on your auth storage method
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const staffPermissionsService = {
  async getAllStaff(shopId) {
    try {
      const response = await axios.post(`${BASE_URL}/getAll`, { shopId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async addStaffMember(staffData) {
    try {
      const response = await axios.post(`${BASE_URL}/add`, staffData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async updatePermissions(staffId, permissions) {
    try {
      const response = await axios.put(`${BASE_URL}/permissions`, {
        staffId,
        permissions
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async batchUpdatePermissions(staffIds, permissions) {
    try {
      const response = await axios.put(`${BASE_URL}/permissions/batch`, {
        staffIds,
        permissions
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async updateStaffDetails(staffId, details) {
    try {
      const response = await axios.put(`${BASE_URL}/${staffId}`, details);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async deleteStaffMember(staffId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${staffId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        success: false,
        message: error.response.data.message || 'An error occurred',
        error: error.response.data.error
      };
    }
    // Network error or other issues
    return {
      success: false,
      message: 'Network error or server unreachable',
      error: error.message
    };
  }
};

export const EMPLOYEE_TITLES = [
  "CEO",
  "Owner",
  "NVP",
  "RVP",
  "COO",
  "Director",
  "Controller",
  "Administrative",
  "Accountant",
  "Office",
  "Shop Foreman",
  "Shop Manager",
  "Estimator",
  "Parts",
  "Body Technician",
  "Frame Technician",
  "Painter",
  "Detailer Technician",
  "Paint Prepper",
  "Maintenance Technician",
  "Parts Delivery Driver",
  "Shop Helper"
];
