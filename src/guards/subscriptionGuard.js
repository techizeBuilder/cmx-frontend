import { subscriptionService } from '../services/subscriptionService';
import { showErrorToast } from '../toster';

// Route guard for subscription checking
export const subscriptionGuard = async (to, from, next) => {
  try {
    // Check if user is authenticated
    const token = localStorage.getItem('AuthToken');
    if (!token) {
      next('/login');
      return;
    }

    // Get user role
    const userRole = localStorage.getItem('userRole') || '';
    
    // Exempt roles that don't need subscription
    const exemptRoles = ['super-admin', 'superadmin', 'admin', 'administrator'];
    const isExempt = exemptRoles.some(role => 
      userRole.toLowerCase().includes(role.toLowerCase())
    );

    if (isExempt) {
      // Admin users can proceed without subscription
      next();
      return;
    }

    // For regular users, check subscription
    const subscriptionResult = await subscriptionService.checkSubscription();
    
    if (subscriptionResult.success && subscriptionResult.hasSubscription) {
      // User has valid subscription
      next();
    } else {
      // Redirect to subscription plans
      next('/subscription-plans');
    }
    
  } catch (error) {
    console.error('Subscription guard error:', error);
    showErrorToast('Unable to verify access. Please login again.');
    next('/login');
  }
};

// Higher-order component for protecting routes
export const withSubscriptionProtection = (component) => {
  return {
    ...component,
    async beforeRouteEnter(to, from, next) {
      await subscriptionGuard(to, from, next);
    },
    async beforeRouteUpdate(to, from, next) {
      await subscriptionGuard(to, from, next);
    }
  };
};

// Composable for subscription checking in components
export const useSubscriptionCheck = () => {
  const checkAccess = async (router) => {
    try {
      const token = localStorage.getItem('AuthToken');
      if (!token) {
        router.push('/login');
        return false;
      }

      const userRole = localStorage.getItem('userRole') || '';
      const exemptRoles = ['super-admin', 'superadmin', 'admin', 'administrator'];
      const isExempt = exemptRoles.some(role => 
        userRole.toLowerCase().includes(role.toLowerCase())
      );

      if (isExempt) {
        return true;
      }

      const subscriptionResult = await subscriptionService.checkSubscription();
      
      if (subscriptionResult.success && subscriptionResult.hasSubscription) {
        return true;
      } else {
        router.push('/subscription-plans');
        return false;
      }
    } catch (error) {
      console.error('Access check error:', error);
      router.push('/login');
      return false;
    }
  };

  return {
    checkAccess
  };
};

export default {
  subscriptionGuard,
  withSubscriptionProtection,
  useSubscriptionCheck
};
