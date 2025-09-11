<template>
  <div class="subscription-test-panel">
    <div class="test-header">
      <h3>🧪 Subscription System Test Panel</h3>
      <p>Use this panel to test all subscription functionality</p>
    </div>
    
    <div class="test-sections">
      <!-- User Role Testing -->
      <div class="test-section">
        <h4>👤 User Role Testing</h4>
        <div class="role-controls">
          <select v-model="testUserRole" @change="updateUserRole">
            <option value="user">Regular User</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
          <p>Current Role: <strong>{{ currentUserRole }}</strong></p>
          <p>Needs Subscription: <strong>{{ needsSubscription ? 'Yes' : 'No' }}</strong></p>
        </div>
      </div>

      <!-- API Testing -->
      <div class="test-section">
        <h4>🔌 API Endpoint Testing</h4>
        <div class="api-tests">
          <button @click="testCheckSubscription" :disabled="isLoading">
            Test Check Subscription
          </button>
          <button @click="testGetPlans" :disabled="isLoading">
            Test Get Plans
          </button>
          <button @click="testGetCurrentSubscription" :disabled="isLoading">
            Test Current Subscription
          </button>
          <button @click="testGetSubscriptionHistory" :disabled="isLoading">
            Test Subscription History
          </button>
          <button @click="testSubscribeToPlan" :disabled="isLoading">
            Test Subscribe (Demo Plan)
          </button>
        </div>
      </div>

      <!-- Route Guard Testing -->
      <div class="test-section">
        <h4>🛡️ Route Guard Testing</h4>
        <div class="guard-tests">
          <button @click="testDashboardAccess" :disabled="isLoading">
            Test Dashboard Access
          </button>
          <button @click="testEstimateXAccess" :disabled="isLoading">
            Test EstimateX Access
          </button>
          <button @click="testPartsXAccess" :disabled="isLoading">
            Test PartsX Access
          </button>
          <button @click="testSubscriptionGuard" :disabled="isLoading">
            Test Subscription Guard Logic
          </button>
        </div>
      </div>

      <!-- Results Display -->
      <div class="test-section" v-if="testResults.length > 0">
        <h4>📊 Test Results</h4>
        <div class="results-container">
          <div v-for="(result, index) in testResults" :key="index" 
               :class="['result-item', result.success ? 'success' : 'error']">
            <div class="result-header">
              <strong>{{ result.test }}</strong>
              <span :class="['status', result.success ? 'success' : 'error']">
                {{ result.success ? '✅ PASS' : '❌ FAIL' }}
              </span>
            </div>
            <div class="result-message">{{ result.message }}</div>
            <div v-if="result.data" class="result-data">
              <pre>{{ JSON.stringify(result.data, null, 2) }}</pre>
            </div>
          </div>
        </div>
        <button @click="clearResults" class="clear-btn">Clear Results</button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">🔄 Running Tests...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import subscriptionService from '../services/subscriptionService';
import { subscriptionGuard, useSubscriptionCheck } from '../guards/subscriptionGuard';

const router = useRouter();
const { checkAccess } = useSubscriptionCheck();

// Reactive state
const isLoading = ref(false);
const testResults = ref([]);
const testUserRole = ref('user');

// Computed properties
const currentUserRole = computed(() => {
  return localStorage.getItem('userRole') || 'Not Set';
});

const needsSubscription = computed(() => {
  const role = currentUserRole.value;
  const exemptRoles = ['super-admin', 'admin', 'administrator'];
  return !exemptRoles.some(exemptRole => 
    role.toLowerCase().includes(exemptRole.toLowerCase())
  );
});

// Helper functions
const addResult = (test, success, message, data = null) => {
  testResults.value.unshift({
    test,
    success,
    message,
    data,
    timestamp: new Date().toLocaleTimeString()
  });
};

const clearResults = () => {
  testResults.value = [];
};

const updateUserRole = () => {
  localStorage.setItem('userRole', testUserRole.value);
  addResult('Role Update', true, `User role set to: ${testUserRole.value}`);
};

// API Testing Functions
const testCheckSubscription = async () => {
  isLoading.value = true;
  try {
    const result = await subscriptionService.checkSubscription();
    addResult('Check Subscription API', true, 'Subscription check successful', result);
  } catch (error) {
    addResult('Check Subscription API', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testGetPlans = async () => {
  isLoading.value = true;
  try {
    const result = await subscriptionService.getAvailablePlans();
    addResult('Get Plans API', true, `Found ${result.data?.length || 0} plans`, result);
  } catch (error) {
    addResult('Get Plans API', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testGetCurrentSubscription = async () => {
  isLoading.value = true;
  try {
    const result = await subscriptionService.getCurrentSubscription();
    addResult('Current Subscription API', true, 'Retrieved current subscription', result);
  } catch (error) {
    addResult('Current Subscription API', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testGetSubscriptionHistory = async () => {
  isLoading.value = true;
  try {
    const result = await subscriptionService.getSubscriptionHistory();
    addResult('Subscription History API', true, `Found ${result.data?.length || 0} history records`, result);
  } catch (error) {
    addResult('Subscription History API', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testSubscribeToPlan = async () => {
  isLoading.value = true;
  try {
    // Test with a demo plan ID
    const result = await subscriptionService.subscribeToPlan('demo-plan-id');
    addResult('Subscribe to Plan API', true, 'Subscription created successfully', result);
  } catch (error) {
    addResult('Subscribe to Plan API', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

// Route Guard Testing Functions
const testDashboardAccess = async () => {
  isLoading.value = true;
  try {
    const hasAccess = await checkAccess(router);
    addResult('Dashboard Route Guard', hasAccess, 
      hasAccess ? 'Access granted to dashboard' : 'Access denied - would redirect');
  } catch (error) {
    addResult('Dashboard Route Guard', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testEstimateXAccess = async () => {
  isLoading.value = true;
  try {
    // Simulate route guard check
    await new Promise((resolve, reject) => {
      subscriptionGuard({ path: '/estimatex' }, {}, (next) => {
        if (typeof next === 'string') {
          addResult('EstimateX Route Guard', false, `Would redirect to: ${next}`);
        } else if (next === false) {
          addResult('EstimateX Route Guard', false, 'Access denied');
        } else {
          addResult('EstimateX Route Guard', true, 'Access granted to EstimateX');
        }
        resolve();
      });
    });
  } catch (error) {
    addResult('EstimateX Route Guard', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testPartsXAccess = async () => {
  isLoading.value = true;
  try {
    await new Promise((resolve, reject) => {
      subscriptionGuard({ path: '/parts-x' }, {}, (next) => {
        if (typeof next === 'string') {
          addResult('PartsX Route Guard', false, `Would redirect to: ${next}`);
        } else if (next === false) {
          addResult('PartsX Route Guard', false, 'Access denied');
        } else {
          addResult('PartsX Route Guard', true, 'Access granted to PartsX');
        }
        resolve();
      });
    });
  } catch (error) {
    addResult('PartsX Route Guard', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

const testSubscriptionGuard = async () => {
  isLoading.value = true;
  try {
    const userRole = localStorage.getItem('userRole');
    const exemptRoles = ['super-admin', 'admin', 'administrator'];
    const isExempt = exemptRoles.some(role => 
      userRole?.toLowerCase().includes(role.toLowerCase())
    );

    if (isExempt) {
      addResult('Subscription Guard Logic', true, 
        `User role "${userRole}" is exempt from subscription requirements`);
    } else {
      addResult('Subscription Guard Logic', true, 
        `User role "${userRole}" requires subscription validation`);
    }
  } catch (error) {
    addResult('Subscription Guard Logic', false, error.message);
  } finally {
    isLoading.value = false;
  }
};

// Component lifecycle
onMounted(() => {
  // Set initial test role from current user role
  const currentRole = localStorage.getItem('userRole');
  if (currentRole) {
    testUserRole.value = currentRole;
  }
  
  addResult('Test Panel', true, 'Subscription test panel loaded successfully');
});
</script>

<style scoped>
.subscription-test-panel {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  position: relative;
}

.test-header {
  text-align: center;
  margin-bottom: 30px;
}

.test-header h3 {
  color: #333;
  margin-bottom: 10px;
}

.test-sections {
  display: grid;
  gap: 20px;
}

.test-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.test-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.role-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.role-controls select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 200px;
}

.api-tests, .guard-tests {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.api-tests button, .guard-tests button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.api-tests button:hover, .guard-tests button:hover {
  background: #0056b3;
}

.api-tests button:disabled, .guard-tests button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.results-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.result-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item.success {
  background: #f8fff8;
  border-left: 4px solid #28a745;
}

.result-item.error {
  background: #fff8f8;
  border-left: 4px solid #dc3545;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.status.success {
  color: #28a745;
  font-weight: bold;
}

.status.error {
  color: #dc3545;
  font-weight: bold;
}

.result-message {
  color: #666;
  margin-bottom: 10px;
}

.result-data {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  max-height: 200px;
  overflow: auto;
}

.result-data pre {
  margin: 0;
  font-size: 12px;
}

.clear-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.clear-btn:hover {
  background: #c82333;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.loading-spinner {
  font-size: 18px;
  color: #007bff;
  font-weight: bold;
}
</style>
