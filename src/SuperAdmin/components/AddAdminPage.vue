<template>
  <div class="add-admin-page">
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

    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-custom">
            <div class="card-header bg-custom-header">
              <h4 class="mb-0">
                <i class="fas fa-user-plus me-2"></i>Create New Admin
              </h4>
            </div>
            <div class="card-body bg-custom-cell">
              <!-- Progress Steps -->
              <div class="mb-4">
                <div class="progress">
                  <div class="progress-bar bg-primary" :style="{ width: (currentStep / 2) * 100 + '%' }"></div>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <small :class="{ 'text-primary fw-bold': currentStep >= 1 }">Admin Details</small>
                  <small :class="{ 'text-primary fw-bold': currentStep >= 2 }">Review & Create</small>
                </div>
              </div>

              <!-- Step 1: Admin Details -->
              <div v-if="currentStep === 1">
                <h6 class="mb-3">Admin Information</h6>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Username *</label>
                      <input 
                        type="text" 
                        class="form-control"
                        v-model="formData.username"
                        placeholder="Enter unique username"
                        required
                      >
                      <small class="text-muted">Username will be used for login</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        class="form-control"
                        v-model="formData.email"
                        placeholder="Enter email address"
                        required
                      >
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">First Name *</label>
                      <input 
                        type="text" 
                        class="form-control"
                        v-model="formData.firstName"
                        placeholder="Enter first name"
                        required
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Last Name *</label>
                      <input 
                        type="text" 
                        class="form-control"
                        v-model="formData.lastName"
                        placeholder="Enter last name"
                        required
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Password *</label>
                      <input 
                        type="password" 
                        class="form-control"
                        v-model="formData.password"
                        placeholder="Enter secure password"
                        minlength="6"
                        required
                      >
                      <small class="text-muted">Minimum 6 characters required</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Confirm Password *</label>
                      <input 
                        type="password" 
                        class="form-control"
                        v-model="confirmPassword"
                        placeholder="Confirm password"
                        required
                      >
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    class="form-control"
                    v-model="formData.phoneNumber"
                    placeholder="Enter phone number (optional)"
                  >
                </div>
              </div>

              <!-- Step 2: Review -->
              <div v-if="currentStep === 2">
                <h6 class="mb-3">Review Admin Details</h6>
                
                <div class="card border-0 bg-light">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Username</label>
                          <p class="mb-0">{{ formData.username }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Email</label>
                          <p class="mb-0">{{ formData.email }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">First Name</label>
                          <p class="mb-0">{{ formData.firstName }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Last Name</label>
                          <p class="mb-0">{{ formData.lastName }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Phone Number</label>
                          <p class="mb-0">{{ formData.phoneNumber || 'Not provided' }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Role</label>
                          <p class="mb-0">
                            <span class="badge bg-warning px-3 py-2">
                              <i class="fas fa-user-shield me-1"></i>Admin
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="alert alert-info mt-3">
                  <i class="fas fa-info-circle me-2"></i>
                  Please review all information carefully before creating the admin account.
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="d-flex justify-content-between mt-4">
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
                  v-if="currentStep < 2"
                >
                  Next<i class="fas fa-chevron-right ms-2"></i>
                </button>
                
                <button 
                  type="button" 
                  class="btn btn-success"
                  @click="submitForm"
                  v-if="currentStep === 2"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="fas fa-user-plus me-2"></i>
                  {{ isSubmitting ? 'Creating Admin...' : 'Create Admin' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showErrorToast } from '../../toster'
import { adminService } from '../services/adminService'

const router = useRouter()

// Page state
const currentStep = ref(1)
const isSubmitting = ref(false)
const confirmPassword = ref('')

// Form data
const formData = ref({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
})

onMounted(() => {
  const superAdminData = localStorage.getItem('superAdminData')
  if (!superAdminData) {
    router.push('/cmx-super/login')
    return
  }
})

const goBack = () => {
  router.push('/cmx-super/dashboard')
}

const handleLogout = () => {
  localStorage.removeItem('superAdminToken')
  localStorage.removeItem('superAdminData')
  router.push('/cmx-super/login')
}

const validateStep = () => {
  if (currentStep.value === 1) {
    if (!formData.value.username?.trim()) {
      showErrorToast('Username is required')
      return false
    }
    if (!formData.value.email?.trim()) {
      showErrorToast('Email is required')
      return false
    }
    if (!formData.value.password?.trim()) {
      showErrorToast('Password is required')
      return false
    }
    if (formData.value.password.length < 6) {
      showErrorToast('Password must be at least 6 characters')
      return false
    }
    if (formData.value.password !== confirmPassword.value) {
      showErrorToast('Passwords do not match')
      return false
    }
    if (!formData.value.firstName?.trim()) {
      showErrorToast('First name is required')
      return false
    }
    if (!formData.value.lastName?.trim()) {
      showErrorToast('Last name is required')
      return false
    }
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

const submitForm = async () => {
  if (!validateStep()) return
  
  isSubmitting.value = true
  try {
    // Create the admin data object
    const adminData = {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      phoneNumber: formData.value.phoneNumber || undefined
    }

    const response = await adminService.createAdmin(adminData)
    
    showSuccessToast('Admin created successfully!')
    
    // Redirect to dashboard
    router.push('/cmx-super/dashboard')
    
  } catch (error) {
    console.error('Error creating admin:', error)
    
    if (error.response && error.response.status === 400) {
      showErrorToast('Admin with this username or email already exists')
    } else if (error.response && error.response.status === 403) {
      showErrorToast('Access denied. Only super admins can create admins.')
    } else if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.')
      handleLogout()
    } else {
      showErrorToast('Error creating admin. Please try again.')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.add-admin-page {
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

.btn-outline-primary {
  color: #027A2B;
  border-color: #027A2B;
}

.btn-outline-primary:hover {
  background-color: #027A2B;
  border-color: #027A2B;
}

.text-primary {
  color: #027A2B !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #027A2B;
  box-shadow: 0 0 0 0.2rem rgba(2, 122, 43, 0.25);
}

.alert-info {
  background-color: #e8f4fd;
  border-color: #b8daff;
  color: #0c5460;
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
