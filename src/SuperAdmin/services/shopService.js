import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/superadmin';

// Get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('superAdminToken');
  return {
    'Authorization': `Bearer ${token}`
  };
};

// Shop API service
export const shopService = {
  // Create a new shop
  createShop: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/shop`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Get all shops with pagination and filters
  getShops: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);

    const response = await axios.get(`${API_BASE_URL}/shops?${queryParams}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get shop details by ID
  getShopById: async (shopId) => {
    const response = await axios.get(`${API_BASE_URL}/shops/${shopId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Update shop
  updateShop: async (shopId, formData) => {
    const response = await axios.put(`${API_BASE_URL}/shops/${shopId}`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Toggle shop status
  toggleShopStatus: async (shopId, status) => {
    const response = await axios.patch(
      `${API_BASE_URL}/shops/${shopId}/status`,
      { status },
      {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
};

export default shopService;
