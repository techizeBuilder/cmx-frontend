import axios from 'axios'

/**
 * Subscription Management Service
 * Handles all subscription and plan-related API operations for SuperAdmin
 */
class SubscriptionService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8001'
    this.endpoint = '/subscription'
  }

  /**
   * Get authenticated axios instance with JWT token
   * @returns {Object} Axios instance with auth headers
   */
  getAxiosInstance() {
    const token = localStorage.getItem('superAdminToken')
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  // ============= SUBSCRIPTION PLAN MANAGEMENT =============

  /**
   * Get all subscription plans
   * @returns {Promise<Object>} API response with plans array
   */
  async getPlans() {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.get(`${this.endpoint}/plans`)
      return response.data
    } catch (error) {
      console.error('Error fetching subscription plans:', error)
      throw error
    }
  }

  /**
   * Get a specific subscription plan by ID
   * @param {string} planId - The plan ID
   * @returns {Promise<Object>} API response with plan data
   */
  async getPlanById(planId) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.get(`${this.endpoint}/plans/${planId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching subscription plan:', error)
      throw error
    }
  }

  /**
   * Create a new subscription plan
   * @param {Object} planData - The plan data
   * @param {string} planData.name - Plan name (required)
   * @param {string} planData.description - Plan description (required)
   * @param {number} planData.price - Plan price (required, non-negative)
   * @param {string} planData.currency - Currency code (default: USD)
   * @param {string} planData.billingCycle - Billing cycle: monthly, quarterly, yearly (required)
   * @param {Array} planData.features - Array of feature objects
   * @param {Object} planData.limitations - Usage limitations object
   * @param {boolean} planData.isActive - Plan availability (default: true)
   * @param {boolean} planData.isPopular - Popular plan flag (default: false)
   * @param {number} planData.sortOrder - Display order (default: 0)
   * @param {number} planData.trialDays - Trial period in days (default: 0)
   * @param {string} planData.stripePriceId - Stripe price ID
   * @returns {Promise<Object>} API response with created plan data
   */
  async createPlan(planData) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.post(`${this.endpoint}/plans`, planData)
      return response.data
    } catch (error) {
      console.error('Error creating subscription plan:', error)
      throw error
    }
  }

  /**
   * Update an existing subscription plan
   * @param {string} planId - The plan ID to update
   * @param {Object} planData - The updated plan data
   * @returns {Promise<Object>} API response with updated plan data
   */
  async updatePlan(planId, planData) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.put(`${this.endpoint}/plans/${planId}`, planData)
      return response.data
    } catch (error) {
      console.error('Error updating subscription plan:', error)
      throw error
    }
  }

  /**
   * Delete a subscription plan
   * @param {string} planId - The plan ID to delete
   * @returns {Promise<Object>} API response confirming deletion
   */
  async deletePlan(planId) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.delete(`${this.endpoint}/plans/${planId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting subscription plan:', error)
      throw error
    }
  }

  // ============= USER SUBSCRIPTION MANAGEMENT =============

  /**
   * Get all user subscriptions with optional filtering
   * @param {Object} filters - Filter options
   * @param {string} filters.shopId - Filter by shop ID
   * @param {string} filters.userId - Filter by user ID
   * @param {string} filters.status - Filter by status (active, inactive, cancelled, expired, trial, pending)
   * @returns {Promise<Object>} API response with subscriptions array
   */
  async getSubscriptions(filters = {}) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key])
        }
      })
      
      const queryString = params.toString()
      const url = queryString ? `${this.endpoint}/subscriptions?${queryString}` : `${this.endpoint}/subscriptions`
      
      const response = await axiosInstance.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      throw error
    }
  }

  /**
   * Get active subscriptions only
   * @returns {Promise<Object>} API response with active subscriptions
   */
  async getActiveSubscriptions() {
    return this.getSubscriptions({ status: 'active' })
  }

  /**
   * Get trial subscriptions only
   * @returns {Promise<Object>} API response with trial subscriptions
   */
  async getTrialSubscriptions() {
    return this.getSubscriptions({ status: 'trial' })
  }

  /**
   * Get subscriptions by shop ID
   * @param {string} shopId - The shop ID
   * @returns {Promise<Object>} API response with shop subscriptions
   */
  async getSubscriptionsByShop(shopId) {
    return this.getSubscriptions({ shopId })
  }

  /**
   * Get subscriptions by user ID
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} API response with user subscriptions
   */
  async getSubscriptionsByUser(userId) {
    return this.getSubscriptions({ userId })
  }

  // ============= UTILITY METHODS =============

  /**
   * Extract error message from API error response
   * @param {Error} error - The error object
   * @returns {string} User-friendly error message
   */
  static getErrorMessage(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          return data.message || 'Invalid request. Please check your input.'
        case 401:
          return 'Authentication required. Please login again.'
        case 403:
          return 'Access denied. You do not have permission to perform this action.'
        case 404:
          return data.message || 'Resource not found.'
        case 409:
          return data.message || 'Conflict. Resource already exists.'
        case 422:
          return data.message || 'Validation failed. Please check your input.'
        case 500:
          return 'Internal server error. Please try again later.'
        default:
          return data.message || `Server error (${status}). Please try again.`
      }
    } else if (error.request) {
      // Network error
      return 'Network error. Please check your internet connection.'
    } else {
      // Other error
      return error.message || 'An unexpected error occurred.'
    }
  }

  /**
   * Validate plan data before submission
   * @param {Object} planData - The plan data to validate
   * @returns {Array} Array of validation errors (empty if valid)
   */
  static validatePlanData(planData) {
    const errors = []

    // Required fields
    if (!planData.name?.trim()) {
      errors.push('Plan name is required')
    }
    if (!planData.description?.trim()) {
      errors.push('Plan description is required')
    }
    if (planData.price === undefined || planData.price === null || planData.price < 0) {
      errors.push('Plan price is required and must be non-negative')
    }
    if (!planData.billingCycle) {
      errors.push('Billing cycle is required')
    }

    // Billing cycle validation
    const validBillingCycles = ['monthly', 'quarterly', 'yearly']
    if (planData.billingCycle && !validBillingCycles.includes(planData.billingCycle)) {
      errors.push('Billing cycle must be monthly, quarterly, or yearly')
    }

    // Features validation
    if (planData.features && Array.isArray(planData.features)) {
      planData.features.forEach((feature, index) => {
        if (!feature.name?.trim()) {
          errors.push(`Feature ${index + 1}: name is required`)
        }
        if (!feature.description?.trim()) {
          errors.push(`Feature ${index + 1}: description is required`)
        }
        if (typeof feature.included !== 'boolean') {
          errors.push(`Feature ${index + 1}: included must be true or false`)
        }
      })
    }

    // Limitations validation
    if (planData.limitations) {
      const limitations = planData.limitations
      const numericFields = ['maxShops', 'maxUsers', 'maxStorage', 'maxCustomers']
      
      numericFields.forEach(field => {
        if (limitations[field] !== null && limitations[field] !== undefined) {
          if (typeof limitations[field] !== 'number' || limitations[field] < 0) {
            errors.push(`${field} must be a non-negative number or null for unlimited`)
          }
        }
      })
    }

    return errors
  }

  /**
   * Format price for display
   * @param {number} price - The price value
   * @param {string} currency - The currency code (default: USD)
   * @returns {string} Formatted price string
   */
  static formatPrice(price, currency = 'USD') {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2
      }).format(price)
    } catch (error) {
      return `${currency.toUpperCase()} ${price.toFixed(2)}`
    }
  }

  /**
   * Format billing cycle for display
   * @param {string} billingCycle - The billing cycle
   * @returns {string} Formatted billing cycle
   */
  static formatBillingCycle(billingCycle) {
    const cycles = {
      monthly: 'Monthly',
      quarterly: 'Quarterly (3 months)',
      yearly: 'Yearly (12 months)'
    }
    return cycles[billingCycle] || billingCycle
  }

  /**
   * Calculate monthly equivalent price
   * @param {number} price - The price
   * @param {string} billingCycle - The billing cycle
   * @returns {number} Monthly equivalent price
   */
  static calculateMonthlyEquivalent(price, billingCycle) {
    const multipliers = {
      monthly: 1,
      quarterly: 1 / 3,
      yearly: 1 / 12
    }
    return price * (multipliers[billingCycle] || 1)
  }

  /**
   * Format subscription status for display
   * @param {string} status - The subscription status
   * @returns {Object} Status info with label, class, and icon
   */
  static formatSubscriptionStatus(status) {
    const statusMap = {
      active: {
        label: 'Active',
        class: 'success',
        icon: 'fas fa-check-circle'
      },
      inactive: {
        label: 'Inactive',
        class: 'secondary',
        icon: 'fas fa-pause-circle'
      },
      cancelled: {
        label: 'Cancelled',
        class: 'danger',
        icon: 'fas fa-times-circle'
      },
      expired: {
        label: 'Expired',
        class: 'warning',
        icon: 'fas fa-clock'
      },
      trial: {
        label: 'Trial',
        class: 'info',
        icon: 'fas fa-star'
      },
      pending: {
        label: 'Pending',
        class: 'warning',
        icon: 'fas fa-hourglass-half'
      }
    }
    return statusMap[status] || {
      label: status,
      class: 'secondary',
      icon: 'fas fa-question-circle'
    }
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService()
export default subscriptionService
