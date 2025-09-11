import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../toster';

const API_URL = import.meta.env.VITE_API_URL;

// Get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('AuthToken');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Check if user needs subscription (exclude super admin and admin)
const doesUserNeedSubscription = (userRole) => {
  const exemptRoles = ['super-admin', 'superadmin', 'admin', 'administrator'];
  return !exemptRoles.some(role => 
    userRole?.toLowerCase().includes(role.toLowerCase())
  );
};

export const subscriptionService = {
  
  // 1. Check User Subscription Status
  async checkSubscription() {
    try {
      const response = await axios.get(
        `${API_URL}/subscription/check-subscription`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Check subscription error:', error);
      throw subscriptionService.handleError(error);
    }
  },

  // 2. Get Available Plans
  async getAvailablePlans() {
    try {
      const response = await axios.get(
        `${API_URL}/subscription/available-plans`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Get plans error:', error);
      throw subscriptionService.handleError(error);
    }
  },

  // 3. Subscribe to Plan
  async subscribeToPlan(planId) {
    try {
      const response = await axios.post(
        `${API_URL}/subscription/subscribe`,
        { planId },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Subscribe error:', error);
      throw subscriptionService.handleError(error);
    }
  },

  // 4. Get Current Subscription
  async getCurrentSubscription() {
    try {
      const response = await axios.get(
        `${API_URL}/subscription/my-subscription`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Get current subscription error:', error);
      throw subscriptionService.handleError(error);
    }
  },

  // 5. Get Subscription History
  async getSubscriptionHistory() {
    try {
      const response = await axios.get(
        `${API_URL}/subscription/subscription-history`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Get subscription history error:', error);
      throw subscriptionService.handleError(error);
    }
  },

  // Check if user should be redirected to subscription page
  async validateUserAccess(router) {
    try {
      // Get user role from localStorage or make API call to get user details
      const userRole = localStorage.getItem('userRole');
      
      // If user is admin/super-admin, skip subscription check
      if (!doesUserNeedSubscription(userRole)) {
        return { hasAccess: true, reason: 'admin_exemption' };
      }

      // Check subscription for regular users
      const subscriptionResult = await this.checkSubscription();
      
      if (subscriptionResult.success && subscriptionResult.hasSubscription) {
        return { hasAccess: true, reason: 'valid_subscription' };
      } else {
        // Redirect to subscription plans
        router.push('/subscription-plans');
        return { hasAccess: false, reason: 'no_subscription' };
      }
    } catch (error) {
      console.error('Access validation error:', error);
      // On error, redirect to login for safety
      router.push('/login');
      return { hasAccess: false, reason: 'validation_error' };
    }
  },

  // Handle API errors
  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.clear();
          window.location.href = '/login';
          return new Error('Session expired. Please login again.');
        case 400:
          return new Error(error.response.data?.message || 'Bad request');
        case 404:
          return new Error('Service not found');
        case 500:
          return new Error('Server error. Please try again later.');
        default:
          return new Error(error.response.data?.message || 'An error occurred');
      }
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error('An unexpected error occurred');
    }
  },

  // Format subscription data for display
  formatSubscriptionData(subscription) {
    if (!subscription) return null;

    return {
      id: subscription._id,
      planName: subscription.planId?.name || 'Unknown Plan',
      status: subscription.status,
      price: subscription.planId?.price || 0,
      currency: subscription.planId?.currency || 'USD',
      billingCycle: subscription.planId?.billingCycle || 'monthly',
      startDate: new Date(subscription.startDate).toLocaleDateString(),
      endDate: new Date(subscription.endDate).toLocaleDateString(),
      daysRemaining: subscription.daysRemaining || 0,
      isOnTrial: subscription.isOnTrial || false,
      features: subscription.planId?.features || []
    };
  },

  // Check if subscription is expiring soon (within 7 days)
  isSubscriptionExpiringSoon(subscription) {
    if (!subscription || !subscription.daysRemaining) return false;
    return subscription.daysRemaining <= 7;
  },

  // Get subscription status color for UI
  getSubscriptionStatusColor(status) {
    switch (status?.toLowerCase()) {
      case 'active':
        return '#28a745';
      case 'expired':
        return '#dc3545';
      case 'cancelled':
        return '#6c757d';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  }
};

export default subscriptionService;
