<template>
  <div class="add-edit-plan-page">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">CMX Super Admin</span>
        <div class="d-flex align-items-center">
          <button @click="goBack" class="btn btn-outline-light me-3">
            <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <button @click="handleLogout" class="btn btn-outline-light">Logout</button>
        </div>
      </div>
    </nav>

    <div class="container mt-4" v-if="!isLoading">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card border-custom">
            <div class="card-header bg-custom-header">
              <h4 class="mb-0">
                <i class="fas fa-plus-circle me-2" v-if="!isEditMode"></i>
                <i class="fas fa-edit me-2" v-else></i>
                {{ isEditMode ? 'Edit Subscription Plan' : 'Add New Subscription Plan' }}
              </h4>
            </div>
            <div class="card-body bg-custom-cell">
              <!-- Progress Steps -->
              <div class="mb-4">
                <div class="progress">
                  <div class="progress-bar bg-primary" :style="{ width: (currentStep / 4) * 100 + '%' }"></div>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <small :class="{ 'text-primary fw-bold': currentStep >= 1 }">Basic Info</small>
                  <small :class="{ 'text-primary fw-bold': currentStep >= 2 }">Features</small>
                  <small :class="{ 'text-primary fw-bold': currentStep >= 3 }">Limitations</small>
                  <small :class="{ 'text-primary fw-bold': currentStep >= 4 }">Review</small>
                </div>
              </div>

              <form @submit.prevent="handleSubmit">
                <!-- Step 1: Basic Information -->
                <div v-if="currentStep === 1">
                  <h6 class="mb-3">Basic Plan Information</h6>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Plan Name <span class="text-danger">*</span></label>
                        <input 
                          type="text" 
                          class="form-control"
                          v-model="formData.name"
                          placeholder="e.g., Professional Plan"
                          required
                        >
                        <small class="text-muted">Must be unique and descriptive</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Price <span class="text-danger">*</span></label>
                        <div class="input-group">
                          <span class="input-group-text">$</span>
                          <input 
                            type="number" 
                            class="form-control"
                            v-model.number="formData.price"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            required
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Currency</label>
                        <select class="form-select" v-model="formData.currency">
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Billing Cycle <span class="text-danger">*</span></label>
                        <select class="form-select" v-model="formData.billingCycle" required>
                          <option value="">Select billing cycle</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly (3 months)</option>
                          <option value="yearly">Yearly (12 months)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Description <span class="text-danger">*</span></label>
                    <textarea 
                      class="form-control"
                      v-model="formData.description"
                      rows="3"
                      placeholder="Describe what this plan offers..."
                      required
                    ></textarea>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Trial Days</label>
                        <input 
                          type="number" 
                          class="form-control"
                          v-model.number="formData.trialDays"
                          min="0"
                          max="365"
                          placeholder="0"
                        >
                        <small class="text-muted">0 = No trial period</small>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Sort Order</label>
                        <input 
                          type="number" 
                          class="form-control"
                          v-model.number="formData.sortOrder"
                          min="0"
                          placeholder="0"
                        >
                        <small class="text-muted">Lower numbers appear first</small>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Stripe Price ID</label>
                        <input 
                          type="text" 
                          class="form-control"
                          v-model="formData.stripePriceId"
                          placeholder="price_1234567890"
                        >
                        <small class="text-muted">For Stripe integration</small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-check mb-3">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          v-model="formData.isActive"
                          id="isActive"
                        >
                        <label class="form-check-label" for="isActive">
                          Plan is Active
                        </label>
                        <small class="d-block text-muted">Inactive plans won't be available for selection</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-check mb-3">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          v-model="formData.isPopular"
                          id="isPopular"
                        >
                        <label class="form-check-label" for="isPopular">
                          Popular Plan
                        </label>
                        <small class="d-block text-muted">Will be highlighted with a badge</small>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Features -->
                <div v-if="currentStep === 2">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6>Plan Features</h6>
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="addFeature">
                      <i class="fas fa-plus me-2"></i>Add Feature
                    </button>
                  </div>
                  
                  <div class="alert alert-info mb-4">
                    <i class="fas fa-info-circle me-2"></i>
                    Features describe what's included in this plan. You can specify limits for certain features or mark them as unlimited.
                  </div>

                  <div v-if="formData.features.length === 0" class="text-center py-4 bg-light rounded">
                    <i class="fas fa-star fa-2x text-muted mb-2"></i>
                    <p class="text-muted mb-0">No features added yet</p>
                    <button type="button" class="btn btn-primary btn-sm mt-2" @click="addFeature">
                      <i class="fas fa-plus me-2"></i>Add First Feature
                    </button>
                  </div>

                  <div v-for="(feature, index) in formData.features" :key="index" class="card mb-3">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-start mb-3">
                        <h6 class="mb-0">Feature {{ index + 1 }}</h6>
                        <button 
                          type="button" 
                          class="btn btn-outline-danger btn-sm"
                          @click="removeFeature(index)"
                          v-if="formData.features.length > 1"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                      
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label">Feature Name <span class="text-danger">*</span></label>
                            <input 
                              type="text" 
                              class="form-control"
                              v-model="feature.name"
                              placeholder="e.g., Unlimited Shops"
                              required
                            >
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label">Limit</label>
                            <div class="input-group">
                              <input 
                                type="number" 
                                class="form-control"
                                v-model.number="feature.limit"
                                :disabled="!feature.hasLimit"
                                placeholder="Enter limit"
                                min="1"
                              >
                              <div class="input-group-text">
                                <input 
                                  class="form-check-input mt-0" 
                                  type="checkbox" 
                                  v-model="feature.hasLimit"
                                  @change="!feature.hasLimit && (feature.limit = null)"
                                >
                              </div>
                            </div>
                            <small class="text-muted">Check to set a limit, uncheck for unlimited</small>
                          </div>
                        </div>
                      </div>
                      
                      <div class="mb-3">
                        <label class="form-label">Description <span class="text-danger">*</span></label>
                        <textarea 
                          class="form-control"
                          v-model="feature.description"
                          rows="2"
                          placeholder="Describe this feature..."
                          required
                        ></textarea>
                      </div>
                      
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          v-model="feature.included"
                          :id="`included_${index}`"
                        >
                        <label class="form-check-label" :for="`included_${index}`">
                          Feature is included in this plan
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 3: Limitations -->
                <div v-if="currentStep === 3">
                  <h6 class="mb-3">Usage Limitations</h6>
                  
                  <div class="alert alert-warning mb-4">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Set usage limits for this plan. Leave fields empty or set to 0 for unlimited usage.
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Maximum Shops</label>
                        <div class="input-group">
                          <input 
                            type="number" 
                            class="form-control"
                            v-model.number="formData.limitations.maxShops"
                            :disabled="formData.limitations.maxShopsUnlimited"
                            min="1"
                            placeholder="0 = Unlimited"
                          >
                          <div class="input-group-text">
                            <input 
                              class="form-check-input mt-0" 
                              type="checkbox" 
                              v-model="formData.limitations.maxShopsUnlimited"
                              @change="formData.limitations.maxShopsUnlimited && (formData.limitations.maxShops = null)"
                            >
                          </div>
                        </div>
                        <small class="text-muted">Check for unlimited shops</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Maximum Users</label>
                        <div class="input-group">
                          <input 
                            type="number" 
                            class="form-control"
                            v-model.number="formData.limitations.maxUsers"
                            :disabled="formData.limitations.maxUsersUnlimited"
                            min="1"
                            placeholder="0 = Unlimited"
                          >
                          <div class="input-group-text">
                            <input 
                              class="form-check-input mt-0" 
                              type="checkbox" 
                              v-model="formData.limitations.maxUsersUnlimited"
                              @change="formData.limitations.maxUsersUnlimited && (formData.limitations.maxUsers = null)"
                            >
                          </div>
                        </div>
                        <small class="text-muted">Check for unlimited users</small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Maximum Storage (GB)</label>
                        <div class="input-group">
                          <input 
                            type="number" 
                            class="form-control"
                            v-model.number="formData.limitations.maxStorage"
                            :disabled="formData.limitations.maxStorageUnlimited"
                            min="1"
                            placeholder="0 = Unlimited"
                          >
                          <div class="input-group-text">
                            <input 
                              class="form-check-input mt-0" 
                              type="checkbox" 
                              v-model="formData.limitations.maxStorageUnlimited"
                              @change="formData.limitations.maxStorageUnlimited && (formData.limitations.maxStorage = null)"
                            >
                          </div>
                        </div>
                        <small class="text-muted">Storage limit in gigabytes</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Maximum Customers</label>
                        <div class="input-group">
                          <input 
                            type="number" 
                            class="form-control"
                            v-model.number="formData.limitations.maxCustomers"
                            :disabled="formData.limitations.maxCustomersUnlimited"
                            min="1"
                            placeholder="0 = Unlimited"
                          >
                          <div class="input-group-text">
                            <input 
                              class="form-check-input mt-0" 
                              type="checkbox" 
                              v-model="formData.limitations.maxCustomersUnlimited"
                              @change="formData.limitations.maxCustomersUnlimited && (formData.limitations.maxCustomers = null)"
                            >
                          </div>
                        </div>
                        <small class="text-muted">Maximum customer records</small>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 4: Review -->
                <div v-if="currentStep === 4">
                  <h6 class="mb-3">Review Plan Details</h6>
                  
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="card border-0 bg-light">
                        <div class="card-body">
                          <!-- Basic Info -->
                          <div class="mb-4">
                            <h6 class="text-primary mb-3">
                              <i class="fas fa-info-circle me-2"></i>Basic Information
                            </h6>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mb-3">
                                  <strong>Plan Name:</strong>
                                  <p class="mb-0">{{ formData.name }}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mb-3">
                                  <strong>Price:</strong>
                                  <p class="mb-0">{{ formatPrice(formData.price, formData.currency) }} / {{ formatBillingCycle(formData.billingCycle) }}</p>
                                </div>
                              </div>
                            </div>
                            <div class="mb-3">
                              <strong>Description:</strong>
                              <p class="mb-0">{{ formData.description }}</p>
                            </div>
                            <div class="row">
                              <div class="col-md-4">
                                <div class="mb-3">
                                  <strong>Trial Period:</strong>
                                  <p class="mb-0">{{ formData.trialDays || 0 }} days</p>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="mb-3">
                                  <strong>Status:</strong>
                                  <p class="mb-0">
                                    <span :class="['badge', formData.isActive ? 'bg-success' : 'bg-secondary']">
                                      {{ formData.isActive ? 'Active' : 'Inactive' }}
                                    </span>
                                    <span v-if="formData.isPopular" class="badge bg-warning ms-2">Popular</span>
                                  </p>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="mb-3">
                                  <strong>Sort Order:</strong>
                                  <p class="mb-0">{{ formData.sortOrder || 0 }}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Features -->
                          <div class="mb-4" v-if="formData.features.length > 0">
                            <h6 class="text-primary mb-3">
                              <i class="fas fa-star me-2"></i>Features
                            </h6>
                            <div class="row">
                              <div class="col-12">
                                <div v-for="(feature, index) in formData.features" :key="index" class="border rounded p-3 mb-2">
                                  <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                      <h6 class="mb-1">
                                        <i :class="feature.included ? 'fas fa-check text-success' : 'fas fa-times text-danger'" class="me-2"></i>
                                        {{ feature.name }}
                                      </h6>
                                      <p class="mb-0 text-muted small">{{ feature.description }}</p>
                                    </div>
                                    <span v-if="feature.limit" class="badge bg-info">
                                      Limit: {{ feature.limit }}
                                    </span>
                                    <span v-else class="badge bg-success">
                                      Unlimited
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Limitations -->
                          <div class="mb-4">
                            <h6 class="text-primary mb-3">
                              <i class="fas fa-cog me-2"></i>Usage Limitations
                            </h6>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mb-2">
                                  <strong>Max Shops:</strong>
                                  <span class="ms-2">{{ formData.limitations.maxShops || 'Unlimited' }}</span>
                                </div>
                                <div class="mb-2">
                                  <strong>Max Users:</strong>
                                  <span class="ms-2">{{ formData.limitations.maxUsers || 'Unlimited' }}</span>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mb-2">
                                  <strong>Max Storage:</strong>
                                  <span class="ms-2">{{ formData.limitations.maxStorage ? `${formData.limitations.maxStorage} GB` : 'Unlimited' }}</span>
                                </div>
                                <div class="mb-2">
                                  <strong>Max Customers:</strong>
                                  <span class="ms-2">{{ formData.limitations.maxCustomers || 'Unlimited' }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-lg-4">
                      <div class="card border-primary">
                        <div class="card-header bg-primary text-white">
                          <h6 class="mb-0">
                            <i class="fas fa-calculator me-2"></i>Price Calculation
                          </h6>
                        </div>
                        <div class="card-body">
                          <div class="mb-3">
                            <strong>Base Price:</strong>
                            <div class="h5 mb-0">{{ formatPrice(formData.price, formData.currency) }}</div>
                            <small class="text-muted">{{ formatBillingCycle(formData.billingCycle) }}</small>
                          </div>
                          
                          <div class="mb-3" v-if="formData.billingCycle !== 'monthly'">
                            <strong>Monthly Equivalent:</strong>
                            <div class="h6 mb-0">{{ formatPrice(calculateMonthlyEquivalent(formData.price, formData.billingCycle), formData.currency) }}</div>
                            <small class="text-muted">per month</small>
                          </div>
                          
                          <div v-if="formData.trialDays > 0" class="alert alert-info p-2">
                            <small>
                              <i class="fas fa-gift me-1"></i>
                              {{ formData.trialDays }}-day free trial included
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="alert alert-success mt-4">
                    <i class="fas fa-check-circle me-2"></i>
                    <strong>Ready to {{ isEditMode ? 'update' : 'create' }} plan!</strong>
                    Please review all information carefully before proceeding.
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="d-flex justify-content-between mt-4 pt-4 border-top">
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary"
                    @click="previousStep" 
                    v-if="currentStep > 1"
                    :disabled="isSubmitting"
                  >
                    <i class="fas fa-chevron-left me-2"></i>Previous
                  </button>
                  <div v-else></div>

                  <button 
                    type="button" 
                    class="btn btn-primary"
                    @click="nextStep"
                    v-if="currentStep < 4"
                  >
                    Next<i class="fas fa-chevron-right ms-2"></i>
                  </button>
                  
                  <button 
                    type="submit" 
                    class="btn btn-success"
                    v-if="currentStep === 4"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="fas fa-save me-2"></i>
                    {{ isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Plan' : 'Create Plan') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">{{ isEditMode ? 'Loading plan details...' : 'Preparing form...' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showSuccessToast, showErrorToast } from '../../toster'
import subscriptionService from '../services/subscriptionService'

const router = useRouter()
const route = useRoute()

// Page state
const isLoading = ref(true)
const isSubmitting = ref(false)
const currentStep = ref(1)

// Form data
const formData = ref({
  name: '',
  description: '',
  price: 0,
  currency: 'USD',
  billingCycle: '',
  features: [],
  limitations: {
    maxShops: null,
    maxUsers: null,
    maxStorage: null,
    maxCustomers: null,
    maxShopsUnlimited: false,
    maxUsersUnlimited: false,
    maxStorageUnlimited: false,
    maxCustomersUnlimited: false
  },
  isActive: true,
  isPopular: false,
  sortOrder: 0,
  trialDays: 0,
  stripePriceId: ''
})

// Computed
const isEditMode = computed(() => !!route.params.id)

onMounted(async () => {
  const superAdminData = localStorage.getItem('superAdminData')
  if (!superAdminData) {
    router.push('/cmx-super/login')
    return
  }
  
  if (isEditMode.value) {
    await loadPlanData()
  } else {
    // Add default feature for new plans
    addFeature()
    isLoading.value = false
  }
})

const loadPlanData = async () => {
  try {
    const planId = route.params.id
    const response = await subscriptionService.getPlanById(planId)
    
    if (response && response.success && response.data) {
      const plan = response.data
      formData.value = {
        name: plan.name || '',
        description: plan.description || '',
        price: plan.price || 0,
        currency: plan.currency || 'USD',
        billingCycle: plan.billingCycle || '',
        features: plan.features ? plan.features.map(f => ({
          name: f.name || '',
          description: f.description || '',
          included: f.included !== undefined ? f.included : true,
          limit: f.limit,
          hasLimit: f.limit !== null && f.limit !== undefined
        })) : [],
        limitations: {
          maxShops: plan.limitations?.maxShops,
          maxUsers: plan.limitations?.maxUsers,
          maxStorage: plan.limitations?.maxStorage,
          maxCustomers: plan.limitations?.maxCustomers,
          maxShopsUnlimited: plan.limitations?.maxShops === null,
          maxUsersUnlimited: plan.limitations?.maxUsers === null,
          maxStorageUnlimited: plan.limitations?.maxStorage === null,
          maxCustomersUnlimited: plan.limitations?.maxCustomers === null
        },
        isActive: plan.isActive !== undefined ? plan.isActive : true,
        isPopular: plan.isPopular !== undefined ? plan.isPopular : false,
        sortOrder: plan.sortOrder || 0,
        trialDays: plan.trialDays || 0,
        stripePriceId: plan.stripePriceId || ''
      }
    } else {
      throw new Error('Plan not found')
    }
    
  } catch (error) {
    console.error('Error loading plan data:', error)
    showErrorToast(subscriptionService.constructor.getErrorMessage(error))
    router.push('/cmx-super/dashboard')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/cmx-super/dashboard')
}

const handleLogout = () => {
  localStorage.removeItem('superAdminToken')
  localStorage.removeItem('superAdminData')
  router.push('/cmx-super/login')
}

const validateStep = () => {
  switch (currentStep.value) {
    case 1:
      if (!formData.value.name?.trim()) {
        showErrorToast('Plan name is required')
        return false
      }
      if (!formData.value.description?.trim()) {
        showErrorToast('Plan description is required')
        return false
      }
      if (formData.value.price < 0) {
        showErrorToast('Plan price must be non-negative')
        return false
      }
      if (!formData.value.billingCycle) {
        showErrorToast('Billing cycle is required')
        return false
      }
      break
    case 2:
      for (let i = 0; i < formData.value.features.length; i++) {
        const feature = formData.value.features[i]
        if (!feature.name?.trim()) {
          showErrorToast(`Feature ${i + 1}: name is required`)
          return false
        }
        if (!feature.description?.trim()) {
          showErrorToast(`Feature ${i + 1}: description is required`)
          return false
        }
      }
      break
  }
  return true
}

const nextStep = () => {
  if (validateStep()) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const addFeature = () => {
  formData.value.features.push({
    name: '',
    description: '',
    included: true,
    limit: null,
    hasLimit: false
  })
}

const removeFeature = (index) => {
  formData.value.features.splice(index, 1)
}

const formatPrice = (price, currency = 'USD') => {
  return subscriptionService.constructor.formatPrice(price, currency)
}

const formatBillingCycle = (billingCycle) => {
  return subscriptionService.constructor.formatBillingCycle(billingCycle)
}

const calculateMonthlyEquivalent = (price, billingCycle) => {
  return subscriptionService.constructor.calculateMonthlyEquivalent(price, billingCycle)
}

const handleSubmit = async () => {
  if (!validateStep()) return
  
  isSubmitting.value = true
  try {
    // Get current user ID for createdBy field
    const superAdminData = JSON.parse(localStorage.getItem('superAdminData') || '{}')
    console.log('SuperAdmin data:', superAdminData) // Debug log
    
    // Try different possible ID fields
    const currentUserId = superAdminData.id || superAdminData._id || superAdminData.userId || superAdminData.adminId
    console.log('Current user ID:', currentUserId) // Debug log
    
    if (!currentUserId) {
      showErrorToast('Unable to identify current user. Please login again.')
      return
    }
    
    // Prepare the data
    const submitData = {
      name: formData.value.name,
      description: formData.value.description,
      price: formData.value.price,
      currency: formData.value.currency,
      billingCycle: formData.value.billingCycle,
      features: formData.value.features.map(f => ({
        name: f.name,
        description: f.description,
        included: f.included,
        limit: f.hasLimit ? f.limit : null
      })),
      limitations: {
        maxShops: formData.value.limitations.maxShopsUnlimited ? null : formData.value.limitations.maxShops,
        maxUsers: formData.value.limitations.maxUsersUnlimited ? null : formData.value.limitations.maxUsers,
        maxStorage: formData.value.limitations.maxStorageUnlimited ? null : formData.value.limitations.maxStorage,
        maxCustomers: formData.value.limitations.maxCustomersUnlimited ? null : formData.value.limitations.maxCustomers
      },
      isActive: formData.value.isActive,
      isPopular: formData.value.isPopular,
      sortOrder: formData.value.sortOrder,
      trialDays: formData.value.trialDays,
      stripePriceId: formData.value.stripePriceId || undefined,
      createdBy: currentUserId // Always include createdBy for new plans
    }

    // Add updatedBy field for edit operations
    if (isEditMode.value) {
      submitData.updatedBy = currentUserId
      // Remove createdBy for edit operations since it shouldn't be updated
      delete submitData.createdBy
    }

    console.log('Submit data:', submitData) // Debug log

    // Validate data
    const validationErrors = subscriptionService.constructor.validatePlanData(submitData)
    if (validationErrors.length > 0) {
      showErrorToast(`Validation failed: ${validationErrors[0]}`)
      return
    }

    let response
    if (isEditMode.value) {
      response = await subscriptionService.updatePlan(route.params.id, submitData)
    } else {
      response = await subscriptionService.createPlan(submitData)
    }
    
    if (response && response.success) {
      showSuccessToast(`Plan ${isEditMode.value ? 'updated' : 'created'} successfully!`)
      router.push('/cmx-super/dashboard')
    } else {
      throw new Error('Operation failed')
    }
    
  } catch (error) {
    console.error(`Error ${isEditMode.value ? 'updating' : 'creating'} plan:`, error)
    showErrorToast(subscriptionService.constructor.getErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.add-edit-plan-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Custom Theme Colors */
.bg-custom-header {
  background-color: #ccdff0 !important;
}

.bg-custom-cell {
  background-color: #f2f7fd !important;
}

.border-custom {
  border: 1px solid #EEEEEE !important;
}

.progress-bar {
  background-color: #027A2B;
}

.btn-primary {
  background-color: #027A2B;
  border-color: #027A2B;
}

.btn-primary:hover {
  background-color: #025c20;
  border-color: #025c20;
}

.text-primary {
  color: #027A2B !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #027A2B;
  box-shadow: 0 0 0 0.2rem rgba(2, 122, 43, 0.25);
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}
</style>
