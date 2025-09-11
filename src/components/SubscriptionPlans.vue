<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    color="#0066ff"
  />

  <div class="subscription-plans-page">
    <!-- Header Section - Theme Matching -->
    <div class="plans-header">
      <div class="header-content">
        <h1 class="header-title">Choose Your Plan</h1>
        <p class="header-subtitle">Select a subscription plan to access your dashboard</p>
      </div>
    </div>

    <!-- Plans Content -->
    <div class="plans-content">
      <div class="container">
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-alert">
          <i class="fas fa-exclamation-triangle"></i>
          {{ errorMessage }}
        </div>

        <!-- No Plans -->
        <div v-if="plans.length === 0 && !isLoading" class="no-plans-message">
          <i class="fas fa-info-circle"></i>
          <h3>No Plans Available</h3>
          <p>Please contact support for assistance.</p>
        </div>

        <!-- Plans Grid - Compact Design -->
        <div v-else class="plans-grid">
          <div
            v-for="plan in plans"
            :key="plan._id"
            class="plan-card"
            :class="{ 
              'popular-plan': plan.isPopular, 
              'selected-plan': subscribingPlan === plan._id,
              'selecting': subscribingPlan === plan._id && isSubscribing
            }"
          >
            <!-- Popular Badge -->
            <div v-if="plan.isPopular" class="popular-badge">
              <i class="fas fa-star"></i>
              Most Popular
            </div>

            <!-- Selection Indicator -->
            <div v-if="subscribingPlan === plan._id" class="selection-indicator">
              <i class="fas fa-check-circle"></i>
              Selected
            </div>

            <!-- Plan Header -->
            <div class="plan-header">
              <h3 class="plan-name">{{ plan.name }}</h3>
              <div class="plan-price">
                <span class="price-currency">{{ plan.currency || 'USD' }}</span>
                <span class="price-amount">{{ plan.price }}</span>
                <span class="price-period">/{{ plan.billingCycle }}</span>
              </div>
              <p class="plan-description">{{ plan.description }}</p>
            </div>

            <!-- Trial Info -->
            <div v-if="plan.trialDays > 0" class="trial-badge">
              <i class="fas fa-gift"></i>
              {{ plan.trialDays }} days free trial
            </div>

            <!-- Plan Features - Fixed Object Handling -->
            <div class="plan-features">
              <h4 class="features-title">Features Included:</h4>
              <ul class="features-list">
                <li 
                  v-for="(feature, index) in getFormattedFeatures(plan.features)" 
                  :key="index"
                  class="feature-item"
                >
                  <i class="fas fa-check feature-check"></i>
                  <span class="feature-text">{{ feature.name }}</span>
                  <span v-if="feature.limit" class="feature-limit">({{ feature.limit }})</span>
                </li>
              </ul>
            </div>

            <!-- Plan Limitations -->
            <div class="plan-limitations" v-if="plan.limitations && hasLimitations(plan.limitations)">
              <div class="limitations-grid">
                <div v-if="plan.limitations.maxUsers" class="limit-item">
                  <span class="limit-number">{{ plan.limitations.maxUsers }}</span>
                  <span class="limit-label">Users</span>
                </div>
                <div v-if="plan.limitations.maxProjects" class="limit-item">
                  <span class="limit-number">{{ plan.limitations.maxProjects }}</span>
                  <span class="limit-label">Projects</span>
                </div>
              </div>
            </div>

            <!-- Subscribe Button -->
            <div class="plan-action">
              <button
                @click="handleSubscribe(plan._id)"
                :disabled="isSubscribing"
                class="subscribe-button"
                :class="{ 
                  'popular-button': plan.isPopular,
                  'selected-button': subscribingPlan === plan._id,
                  'loading-button': subscribingPlan === plan._id && isSubscribing
                }"
              >
                <span v-if="subscribingPlan === plan._id && isSubscribing" class="button-spinner">
                  <i class="fas fa-spinner fa-spin"></i>
                  Processing...
                </span>
                <span v-else-if="subscribingPlan === plan._id">
                  <i class="fas fa-check"></i>
                  Selected
                </span>
                <span v-else>
                  <i class="fas fa-rocket"></i>
                  Get Started
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="success-modal" @click.stop>
        <div class="success-content">
          <i class="fas fa-check-circle success-icon"></i>
          <h3 class="success-title">Subscription Successful!</h3>
          <p class="success-message">You have successfully subscribed to <strong>{{ selectedPlanName }}</strong></p>
          <p v-if="transactionId" class="transaction-id">Transaction ID: <code>{{ transactionId }}</code></p>
          <p class="redirect-message">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { subscriptionService } from '../services/subscriptionService';
import { showErrorToast, showSuccessToast } from '../toster';

const router = useRouter();

// Reactive data
const isLoading = ref(false);
const isSubscribing = ref(false);
const subscribingPlan = ref(null);
const plans = ref([]);
const errorMessage = ref('');
const showSuccessModal = ref(false);
const selectedPlanName = ref('');
const transactionId = ref('');

// Helper function to format features properly
const getFormattedFeatures = (features) => {
  if (!features) return [];
  
  return features.map(feature => {
    // Handle both string features and object features
    if (typeof feature === 'string') {
      return { name: feature };
    } else if (typeof feature === 'object' && feature.name) {
      return feature; // Already properly formatted
    } else {
      // Fallback for other object structures
      return { name: JSON.stringify(feature) };
    }
  });
};

// Helper function to check if limitations exist
const hasLimitations = (limitations) => {
  return limitations && (limitations.maxUsers || limitations.maxProjects);
};

onMounted(async () => {
  await checkExistingSubscription();
  await fetchPlans();
});

const checkExistingSubscription = async () => {
  try {
    const userRole = localStorage.getItem('userRole');
    console.log('Checking existing subscription for user role:', userRole);
    
    // Skip subscription check for admin users
    if (userRole && (userRole.toLowerCase().includes('admin') || userRole.toLowerCase().includes('super'))) {
      console.log('Admin user detected, redirecting to dashboard');
      showSuccessToast('Admin access granted - no subscription required');
      router.push('/');
      return;
    }

    console.log('Regular user detected, checking subscription status...');
    const result = await subscriptionService.checkSubscription();
    console.log('Subscription check result:', result);
    
    if (result.success && result.hasSubscription) {
      console.log('User has active subscription, redirecting to dashboard');
      showSuccessToast('You already have an active subscription!');
      router.push('/');
    } else {
      console.log('User has no subscription, showing plans page');
    }
  } catch (error) {
    console.error('Subscription check error:', error);
    // Error is handled in service, continue to show plans
    console.log('Continuing to show subscription plans due to check error');
  }
};

const fetchPlans = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    console.log('Fetching subscription plans...');
    const result = await subscriptionService.getAvailablePlans();
    console.log('Plans API result:', result);
    
    if (result.success) {
      plans.value = result.data || [];
      console.log('Plans loaded:', plans.value);
      if (plans.value.length === 0) {
        console.warn('No plans found in API response');
      }
    } else {
      errorMessage.value = result.message || 'Failed to load subscription plans';
      console.error('Plans API failed:', result);
    }
  } catch (error) {
    console.error('Plans fetch error:', error);
    errorMessage.value = error.message || 'Failed to load subscription plans';
    showErrorToast('Failed to load subscription plans. Please check console for details.');
    
    // Add mock data for testing if API fails
    if (process.env.NODE_ENV === 'development') {
      console.log('Adding mock plans for development testing...');
      plans.value = [
        {
          _id: 'basic-plan',
          name: 'Basic Plan',
          description: 'Perfect for small shops',
          price: 29,
          currency: 'USD',
          billingCycle: 'monthly',
          trialDays: 7,
          isPopular: false,
          features: [
            { name: 'Up to 5 users' },
            { name: 'Basic reporting' },
            { name: 'Email support' },
            { name: 'Customer management' }
          ],
          limitations: {
            maxUsers: 5,
            maxProjects: 10
          }
        },
        {
          _id: 'pro-plan',
          name: 'Professional Plan',
          description: 'Most popular choice',
          price: 79,
          currency: 'USD',
          billingCycle: 'monthly',
          trialDays: 14,
          isPopular: true,
          features: [
            { name: 'Up to 25 users' },
            { name: 'Advanced reporting' },
            { name: 'Priority support' },
            { name: 'Customer management' },
            { name: 'Inventory tracking' },
            { name: 'Analytics' }
          ],
          limitations: {
            maxUsers: 25,
            maxProjects: 100
          }
        },
        {
          _id: 'enterprise-plan',
          name: 'Enterprise Plan',
          description: 'For large operations',
          price: 149,
          currency: 'USD',
          billingCycle: 'monthly',
          trialDays: 30,
          isPopular: false,
          features: [
            { name: 'Unlimited users' },
            { name: 'Custom reporting' },
            { name: '24/7 support' },
            { name: 'All features' },
            { name: 'API access' },
            { name: 'Custom integrations' }
          ],
          limitations: {
            maxUsers: null,
            maxProjects: null
          }
        }
      ];
      console.log('Mock plans added:', plans.value);
    }
  } finally {
    isLoading.value = false;
  }
};

const handleSubscribe = async (planId) => {
  subscribingPlan.value = planId;
  isSubscribing.value = true;
  
  try {
    const selectedPlan = plans.value.find(p => p._id === planId);
    selectedPlanName.value = selectedPlan?.name || 'Selected Plan';
    
    const result = await subscriptionService.subscribeToPlan(planId);
    
    if (result.success) {
      transactionId.value = result.transaction?.transactionId || '';
      showSuccessModal.value = true;
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } else {
      showErrorToast(result.message || 'Subscription failed');
    }
  } catch (error) {
    showErrorToast(error.message || 'Subscription failed. Please try again.');
  } finally {
    subscribingPlan.value = null;
    isSubscribing.value = false;
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  router.push('/');
};
</script>

<style scoped>
/* Main Container - Project Theme */
.subscription-plans-page {
  min-height: 100vh;
  background: #f9fbfd;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  padding: 0;
}

/* Header Styles - Matching UserProfile Theme (Subtle and Clean) */
.plans-header {
  background: linear-gradient(135deg, #ccdff0 0%, #f2f7fd 100%);
  padding: 50px 0;
  text-align: center;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #e9ecef;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2c3e50;
  text-shadow: none;
}

.header-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  margin: 0;
  color: #6c757d;
  text-shadow: none;
}

/* Plans Content */
.plans-content {
  padding: 50px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Error & No Plans States */
.error-alert {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #dc3545;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.no-plans-message {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 102, 255, 0.1);
  color: #333;
  max-width: 600px;
  margin: 0 auto;
}

.no-plans-message i {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #FF8100;
}

/* Compact Plans Grid */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

/* Compact Plan Cards - Fixed Height 280px */
.plan-card {
  height: 280px;
  background: white;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 6px 20px rgba(0, 102, 255, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 102, 255, 0.15);
  border-color: rgba(0, 102, 255, 0.2);
}

.plan-card.popular-plan {
  border-color: #0066ff;
  box-shadow: 0 10px 30px rgba(0, 102, 255, 0.2);
  transform: scale(1.02);
}

.plan-card.popular-plan:hover {
  transform: scale(1.02) translateY(-5px);
}

.plan-card.selected-plan {
  border-color: #28a745;
  box-shadow: 0 10px 30px rgba(40, 167, 69, 0.2);
}

.plan-card.selecting {
  opacity: 0.8;
  pointer-events: none;
}

/* Popular Badge */
.popular-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #0066ff, #FF8100);
  color: white;
  padding: 6px 15px;
  border-radius: 0 16px 0 16px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Selection Indicator */
.selection-indicator {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #28a745;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Compact Plan Header */
.plan-header {
  padding: 20px 20px 12px 20px;
  text-align: center;
  flex-shrink: 0;
}

.plan-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.2;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  margin-bottom: 8px;
}

.price-currency {
  font-size: 0.9rem;
  color: #0066ff;
  font-weight: 600;
}

.price-amount {
  font-size: 2rem;
  font-weight: 800;
  color: #0066ff;
}

.price-period {
  font-size: 0.85rem;
  color: #666;
}

.plan-description {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
  line-height: 1.3;
}

/* Trial Badge */
.trial-badge {
  background: rgba(255, 129, 0, 0.1);
  color: #FF8100;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  margin: 0 20px 8px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
}

/* Compact Plan Features */
.plan-features {
  flex: 1;
  padding: 0 20px;
  overflow: hidden;
}

.features-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 80px;
  overflow: hidden;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0;
  font-size: 0.8rem;
  color: #555;
  line-height: 1.2;
}

.feature-check {
  color: #0066ff;
  font-size: 0.75rem;
  width: 12px;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
}

.feature-limit {
  font-size: 0.7rem;
  color: #999;
  font-style: italic;
}

/* Compact Plan Limitations */
.plan-limitations {
  padding: 8px 20px;
  flex-shrink: 0;
}

.limitations-grid {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.limit-item {
  text-align: center;
}

.limit-number {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0066ff;
  line-height: 1;
}

.limit-label {
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  font-weight: 500;
}

/* Compact Plan Action */
.plan-action {
  padding: 0 20px 20px 20px;
  flex-shrink: 0;
}

.subscribe-button {
  width: 100%;
  padding: 12px 20px;
  background: #e9ecef;
  color: #495057;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.subscribe-button:hover:not(:disabled) {
  background: #dee2e6;
  transform: translateY(-1px);
}

.subscribe-button.popular-button {
  background: #0066ff;
  color: white;
}

.subscribe-button.popular-button:hover:not(:disabled) {
  background: #0052cc;
}

.subscribe-button.selected-button {
  background: #28a745;
  color: white;
}

.subscribe-button.selected-button:hover:not(:disabled) {
  background: #1e7e34;
}

.subscribe-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.button-spinner {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Success Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.success-modal {
  background: white;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalEnter 0.3s ease;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-content {
  text-align: center;
  padding: 40px 30px;
}

.success-icon {
  font-size: 3rem;
  color: #28a745;
  margin-bottom: 20px;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
}

.success-message {
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
}

.success-message strong {
  color: #0066ff;
}

.transaction-id {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.transaction-id code {
  background: #ccdff0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #0066ff;
  font-size: 0.8rem;
}

.redirect-message {
  font-size: 0.9rem;
  color: #999;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-title {
    font-size: 2rem;
  }
  
  .plans-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .plan-card.popular-plan {
    transform: none;
  }
  
  .plan-card.popular-plan:hover {
    transform: translateY(-5px);
  }
}

@media (max-width: 480px) {
  .plans-header {
    padding: 40px 0;
  }
  
  .header-title {
    font-size: 1.8rem;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .plans-grid {
    grid-template-columns: 1fr;
  }
  
  .success-modal {
    margin: 20px;
  }
  
  .success-content {
    padding: 30px 20px;
  }
}

/* Animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.fa-spinner {
  animation: spin 1s linear infinite;
}
</style>
