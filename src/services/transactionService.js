import axios from 'axios';

// Get API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

// Transaction Service for Super Admin Transaction Management
class TransactionService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/subscription/transactions`;
  }

  /**
   * Get authentication headers
   * @returns {Object} Headers with authorization token
   */
  getAuthHeaders() {
    try {
      const token = localStorage.getItem('superAdminToken');
      
      // Debug logging to understand token retrieval
      console.log('TransactionService - Token retrieval debug:', {
        tokenExists: !!token,
        tokenLength: token ? token.length : 0,
        tokenStart: token ? token.substring(0, 20) + '...' : 'null',
        allSuperAdminKeys: Object.keys(localStorage).filter(key => key.includes('super') || key.includes('Admin'))
      });
      
      if (!token || token === 'null' || token.trim() === '') {
        console.warn('No valid SuperAdmin authentication token found');
        console.log('Available localStorage keys:', Object.keys(localStorage));
        return {};
      }
      
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      return {};
    }
  }

  /**
   * Get all transactions with filtering and pagination
   * @param {Object} filters - Filter parameters
   * @returns {Promise} Transaction data with pagination and summary
   */
  async getAllTransactions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await axios.get(`${this.baseURL}?${queryParams}`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Transaction Service - getAllTransactions error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Super Admin privileges required.');
      }
      
      throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
    }
  }

  /**
   * Get transaction statistics
   * @param {string} period - Time period for stats
   * @param {string} shopId - Optional shop ID filter
   * @returns {Promise} Transaction statistics
   */
  async getTransactionStatistics(period = '30days', shopId = null) {
    try {
      const queryParams = new URLSearchParams({ period });
      if (shopId) queryParams.append('shopId', shopId);

      const response = await axios.get(`${this.baseURL}/statistics?${queryParams}`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.data && response.data.success) {
        console.log('Transaction statistics data:', response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Transaction Service - getTransactionStatistics error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Super Admin privileges required.');
      }
      
      throw new Error(error.response?.data?.message || 'Failed to fetch transaction statistics');
    }
  }

  /**
   * Get transaction by ID
   * @param {string} transactionId - Transaction ID
   * @returns {Promise} Transaction details
   */
  async getTransactionById(transactionId) {
    try {
      const response = await axios.get(`${this.baseURL}/${transactionId}`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Transaction not found');
      }
    } catch (error) {
      console.error('Transaction Service - getTransactionById error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Super Admin privileges required.');
      } else if (error.response?.status === 404) {
        throw new Error('Transaction not found');
      }
      
      throw new Error(error.response?.data?.message || 'Failed to fetch transaction details');
    }
  }

  /**
   * Export transactions data
   * @param {Object} filters - Filter parameters
   * @param {string} format - Export format (csv, xlsx, pdf)
   * @returns {Promise} Export file blob
   */
  async exportTransactions(filters = {}, format = 'csv') {
    try {
      const queryParams = new URLSearchParams({ ...filters, format });
      
      const response = await axios.get(`${this.baseURL}/export?${queryParams}`, {
        headers: this.getAuthHeaders(),
        responseType: 'blob'
      });
      
      return response.data;
    } catch (error) {
      console.error('Transaction Service - exportTransactions error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Super Admin privileges required.');
      }
      
      throw new Error('Failed to export transactions');
    }
  }
}

export const transactionService = new TransactionService();
export default transactionService;
