import { subscriptionService } from '../services/subscriptionService';
import { showSuccessToast } from '../toster';

// Enhanced login handler with subscription checking
export const useEnhancedLogin = (router) => {
  
  const handleLoginSuccess = async (loginResponse) => {
    try {
      // Store authentication data as usual
      const token = loginResponse.token;
      const userData = loginResponse.data;
      
      localStorage.setItem('AuthToken', token);
      localStorage.setItem('userId', userData._id);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userRole', userData.role || '');
      localStorage.setItem('shopId', userData.shopId._id);
      localStorage.setItem('shopData', JSON.stringify(userData.shopId));
      localStorage.setItem('shopIdStr', userData.shopId.shopIdStr || '');

      // Success message
      showSuccessToast(loginResponse.msg || 'Login successful!');
      
      // Check if user needs subscription (exclude admin users)
      const userRole = userData.role || '';
      const exemptRoles = ['super-admin', 'superadmin', 'admin', 'administrator'];
      const isExemptUser = exemptRoles.some(role => 
        userRole.toLowerCase().includes(role.toLowerCase())
      );

      if (isExemptUser) {
        // Admin users can go directly to dashboard
        router.push('/');
        return { success: true, redirect: '/', reason: 'admin_exemption' };
      }

      // For regular users, check subscription status
      try {
        const subscriptionResult = await subscriptionService.checkSubscription();
        
        if (subscriptionResult.success && subscriptionResult.hasSubscription) {
          // User has valid subscription - go to dashboard
          router.push('/');
          return { success: true, redirect: '/', reason: 'valid_subscription' };
        } else {
          // User needs to subscribe - redirect to subscription plans
          router.push('/subscription-plans');
          return { success: true, redirect: '/subscription-plans', reason: 'no_subscription' };
        }
      } catch (subscriptionError) {
        console.error('Subscription check failed:', subscriptionError);
        // If subscription check fails, still allow access but show warning
        router.push('/subscription-plans');
        return { success: true, redirect: '/subscription-plans', reason: 'subscription_check_failed' };
      }
      
    } catch (error) {
      console.error('Login success handler error:', error);
      // Fallback to normal dashboard redirect
      router.push('/');
      return { success: true, redirect: '/', reason: 'fallback' };
    }
  };

  const checkUserAccess = async () => {
    try {
      const token = localStorage.getItem('AuthToken');
      const userRole = localStorage.getItem('userRole') || '';
      
      if (!token) {
        router.push('/login');
        return { hasAccess: false, reason: 'no_token' };
      }

      // Check if user is exempt from subscription requirements
      const exemptRoles = ['super-admin', 'superadmin', 'admin', 'administrator'];
      const isExemptUser = exemptRoles.some(role => 
        userRole.toLowerCase().includes(role.toLowerCase())
      );

      if (isExemptUser) {
        return { hasAccess: true, reason: 'admin_exemption' };
      }

      // Check subscription for regular users
      const subscriptionResult = await subscriptionService.checkSubscription();
      
      if (subscriptionResult.success && subscriptionResult.hasSubscription) {
        return { hasAccess: true, reason: 'valid_subscription' };
      } else {
        router.push('/subscription-plans');
        return { hasAccess: false, reason: 'no_subscription' };
      }
      
    } catch (error) {
      console.error('Access check error:', error);
      router.push('/login');
      return { hasAccess: false, reason: 'check_failed' };
    }
  };

  return {
    handleLoginSuccess,
    checkUserAccess
  };
};

export default useEnhancedLogin;
