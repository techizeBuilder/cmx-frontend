import axios from 'axios';

// Get API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

// Transaction Service for Super Admin Transaction Management
class TransactionService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/subscription`;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('superAdminToken');
    console.log('TransactionService getAuthHeaders:', {
      tokenExists: !!token,
      tokenLength: token?.length,
      tokenPreview: token ? token.substring(0, 30) + '...' : token
    });
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Get all transactions with filtering and pagination
   * @param {Object} filters - Filter parameters
   * @returns {Promise} Transaction data with pagination and summary
   */
  async getAllTransactions(filters = {}) {
    try {
      console.log('TransactionService - getAllTransactions called with filters:', filters);
      
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const url = `${this.baseURL}/transactions${queryParams.toString() ? `?${queryParams}` : ''}`;
      console.log('TransactionService - Making request to:', url);
      
      const response = await axios.get(url, {
        headers: this.getAuthHeaders()
      });
      
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Transaction Service - getAllTransactions error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      if (error.message === 'Authentication required. Please log in as Super Admin.') {
        throw error; // Re-throw auth errors as-is
      }
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Super Admin privileges required.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch transactions');
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
      console.log('TransactionService - getTransactionStatistics called with:', { period, shopId });
      
      const queryParams = new URLSearchParams({ period });
      if (shopId) queryParams.append('shopId', shopId);

      const url = `${this.baseURL}/transactions/statistics${queryParams.toString() ? `?${queryParams}` : ''}`;
      console.log('TransactionService - Making statistics request to:', url);
      
      const response = await axios.get(url, {
        headers: this.getAuthHeaders()
      });
      
      if (response.data && response.data.success) {
        console.log('Transaction statistics data:', response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Transaction Service - getTransactionStatistics error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      if (error.message === 'Authentication required. Please log in as Super Admin.') {
        throw error; // Re-throw auth errors as-is
      }
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Super Admin privileges required.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch transaction statistics');
    }
  }

  /**
   * Get transaction by ID
   * @param {string} transactionId - Transaction ID
   * @returns {Promise} Transaction details
   */
  async getTransactionById(transactionId) {
    try {
      const url = `${this.baseURL}/transactions/${transactionId}`;
      
      const response = await axios.get(url, {
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
      const url = `${this.baseURL}/transactions/export${queryParams.toString() ? `?${queryParams}` : ''}`;
      
      const response = await axios.get(url, {
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
