<template>
  <div class="edit-admin-page">
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
        <div class="col-lg-8">
          <div class="card border-custom">
            <div class="card-header bg-custom-header">
              <h4 class="mb-0">
                <i class="fas fa-user-edit me-2"></i>Edit Admin: {{ adminData?.firstName }} {{ adminData?.lastName }}
              </h4>
            </div>
            <div class="card-body bg-custom-cell">
              <!-- Progress Steps -->
              <div class="mb-4">
                <div class="progress">
                  <div class="progress-bar bg-primary" :style="{ width: (currentStep / 3) * 100 + '%' }"></div>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <small :class="{ 'text-primary fw-bold': currentStep >= 1 }">Basic Info</small>
                  <small :class="{ 'text-primary fw-bold': currentStep >= 2 }">Admin Actions</small>
                  <small :class="{ 'text-primary fw-bold': currentStep >= 3 }">Review & Save</small>
                </div>
              </div>

              <!-- Step 1: Basic Information -->
              <div v-if="currentStep === 1">
                <h6 class="mb-3">Basic Information</h6>
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
                  <div class="col-md-6">
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
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Username</label>
                      <input 
                        type="text" 
                        class="form-control"
                        v-model="formData.username"
                        placeholder="Enter unique username"
                      >
                      <small class="text-muted">Username can be updated (must be unique)</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Current Status</label>
                      <div class="form-control d-flex align-items-center">
                        <span :class="adminData?.isActive ? 'text-success' : 'text-danger'">
                          <i :class="adminData?.isActive ? 'fas fa-check-circle' : 'fas fa-times-circle'" class="me-2"></i>
                          {{ adminData?.isActive ? 'Active' : 'Inactive' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2: Admin Actions -->
              <div v-if="currentStep === 2">
                <h6 class="mb-3">Admin Management Actions</h6>
                
                <!-- Status Toggle -->
                <div class="card border-info mb-3">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <h6 class="mb-2">
                          <i class="fas fa-toggle-on me-2"></i>Status Management
                        </h6>
                        <p class="mb-0">
                          Current status: 
                          <span :class="adminData?.isActive ? 'text-success' : 'text-danger'">
                            {{ adminData?.isActive ? 'Active' : 'Inactive' }}
                          </span>
                        </p>
                        <small class="text-muted">
                          {{ adminData?.isActive ? 'Deactivate to prevent login access' : 'Activate to restore login access' }}
                        </small>
                      </div>
                      <div class="col-md-4 text-end">
                        <button 
                          class="btn" 
                          :class="adminData?.isActive ? 'btn-outline-danger' : 'btn-outline-success'"
                          @click="toggleAdminStatus"
                          :disabled="isStatusToggling"
                        >
                          <span v-if="isStatusToggling" class="spinner-border spinner-border-sm me-2"></span>
                          <i v-else :class="adminData?.isActive ? 'fas fa-ban' : 'fas fa-check'" class="me-2"></i>
                          {{ adminData?.isActive ? 'Deactivate' : 'Activate' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Password Reset -->
                <div class="card border-warning mb-3">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <h6 class="mb-2">
                          <i class="fas fa-key me-2"></i>Password Reset
                        </h6>
                        <div v-if="!showPasswordForm">
                          <p class="mb-0">Reset admin password and send new credentials via email</p>
                          <small class="text-muted">
                            A new password will be generated and sent to the admin's email address
                          </small>
                        </div>
                        <div v-else>
                          <div class="mb-3">
                            <label class="form-label">New Password</label>
                            <input 
                              type="password" 
                              class="form-control"
                              v-model="newPassword"
                              placeholder="Enter new password (min 6 characters)"
                              minlength="6"
                            >
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Confirm Password</label>
                            <input 
                              type="password" 
                              class="form-control"
                              v-model="confirmPassword"
                              placeholder="Confirm new password"
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 text-end">
                        <div v-if="!showPasswordForm">
                          <button 
                            class="btn btn-warning"
                            @click="showPasswordForm = true"
                          >
                            <i class="fas fa-key me-2"></i>Reset Password
                          </button>
                        </div>
                        <div v-else class="d-flex flex-column gap-2">
                          <button 
                            class="btn btn-success"
                            @click="resetPassword"
                            :disabled="isResettingPassword || !isPasswordValid"
                          >
                            <span v-if="isResettingPassword" class="spinner-border spinner-border-sm me-2"></span>
                            <i v-else class="fas fa-save me-2"></i>
                            {{ isResettingPassword ? 'Saving...' : 'Save New Password' }}
                          </button>
                          <button 
                            class="btn btn-outline-secondary btn-sm"
                            @click="cancelPasswordReset"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Delete Admin -->
                <div class="card border-danger">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <h6 class="mb-2 text-danger">
                          <i class="fas fa-exclamation-triangle me-2"></i>Danger Zone
                        </h6>
                        <p class="mb-0">Permanently delete this admin account</p>
                        <small class="text-muted">
                          This will deactivate the admin user (soft delete). This action can be reversed by reactivating the user.
                        </small>
                      </div>
                      <div class="col-md-4 text-end">
                        <button 
                          class="btn btn-outline-danger"
                          @click="confirmDelete"
                          :disabled="isDeleting"
                        >
                          <span v-if="isDeleting" class="spinner-border spinner-border-sm me-2"></span>
                          <i v-else class="fas fa-trash me-2"></i>
                          {{ isDeleting ? 'Deleting...' : 'Delete Admin' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Review -->
              <div v-if="currentStep === 3">
                <h6 class="mb-3">Review Changes</h6>
                
                <div class="card border-0 bg-light">
                  <div class="card-body">
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
                          <label class="form-label fw-bold">Email</label>
                          <p class="mb-0">{{ formData.email }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Phone Number</label>
                          <p class="mb-0">{{ formData.phoneNumber || 'Not provided' }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Username</label>
                          <p class="mb-0">{{ formData.username }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Status</label>
                          <p class="mb-0">
                            <span :class="['badge', adminData?.isActive ? 'bg-success' : 'bg-danger']">
                              {{ adminData?.isActive ? 'Active' : 'Inactive' }}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Admin Info -->
                    <hr>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Created Date</label>
                          <p class="mb-0">{{ formatDate(adminData?.createdAt) }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label fw-bold">Admin ID</label>
                          <p class="mb-0"><code>{{ adminData?.id || adminData?._id }}</code></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="alert alert-info mt-3">
                  <i class="fas fa-info-circle me-2"></i>
                  Please review all changes carefully before saving.
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
                  v-if="currentStep < 3"
                >
                  Next<i class="fas fa-chevron-right ms-2"></i>
                </button>
                
                <button 
                  type="button" 
                  class="btn btn-success"
                  @click="saveChanges"
                  v-if="currentStep === 3"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="fas fa-save me-2"></i>
                  {{ isSubmitting ? 'Saving Changes...' : 'Save Changes' }}
                </button>
              </div>
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
          <p class="mt-3">Loading admin details...</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" ref="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              <i class="fas fa-exclamation-triangle me-2"></i>Confirm Delete
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete admin <strong>{{ adminData?.firstName }} {{ adminData?.lastName }}</strong>?</p>
            <div class="alert alert-warning">
              <i class="fas fa-info-circle me-2"></i>
              This will deactivate the admin user (soft delete). The user can be reactivated later if needed.
            </div>
            <p>Please type <strong>DELETE</strong> to confirm:</p>
            <input 
              type="text" 
              class="form-control" 
              v-model="deleteConfirmText"
              placeholder="Type DELETE to confirm"
              :class="{ 'is-valid': deleteConfirmText === 'DELETE', 'is-invalid': deleteConfirmText && deleteConfirmText !== 'DELETE' }"
            >
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-danger"
              @click="deleteAdmin"
              :disabled="isDeleting || deleteConfirmText !== 'DELETE'"
            >
              <span v-if="isDeleting" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="fas fa-trash me-2"></i>
              {{ isDeleting ? 'Deleting...' : 'Delete Admin' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showSuccessToast, showErrorToast } from '../../toster'
import { adminService } from '../services/adminService'

const router = useRouter()
const route = useRoute()

// Page state
const isLoading = ref(true)
const isSubmitting = ref(false)
const isStatusToggling = ref(false)
const isResettingPassword = ref(false)
const isDeleting = ref(false)
const deleteModal = ref(null)
const currentStep = ref(1)
const deleteConfirmText = ref('')
const showPasswordForm = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')

// Data
const adminData = ref(null)
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  username: ''
})

// Computed properties
const isPasswordValid = computed(() => {
  return newPassword.value && 
         newPassword.value.length >= 6 && 
         newPassword.value === confirmPassword.value
})

onMounted(async () => {
  const superAdminData = localStorage.getItem('superAdminData')
  if (!superAdminData) {
    router.push('/cmx-super/login')
    return
  }
  
  await loadAdminData()
})

const loadAdminData = async () => {
  try {
    const adminId = route.params.id
    if (!adminId) {
      showErrorToast('Admin ID not provided')
      router.push('/cmx-super/dashboard')
      return
    }

    // Try to get admin by ID from API
    const response = await adminService.getAdminById(adminId)
    
    if (response && response.success && response.data) {
      adminData.value = response.data
      formData.value = {
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        email: response.data.email || '',
        phoneNumber: response.data.phoneNumber || '',
        username: response.data.username || ''
      }
    } else {
      throw new Error('Admin not found in API response')
    }
    
  } catch (error) {
    console.error('Error loading admin data:', error)
    
    // Fallback to mock data for development
    const adminId = route.params.id
    const mockAdmins = [
      {
        _id: '1',
        username: 'admin_user1',
        email: 'admin1@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        isActive: true,
        role: 'admin',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        username: 'admin_user2',
        email: 'admin2@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '+1234567891',
        isActive: false,
        role: 'admin',
        lastLogin: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        _id: '3',
        username: 'admin_user3',
        email: 'admin3@example.com',
        firstName: 'Mike',
        lastName: 'Johnson',
        phoneNumber: '+1234567892',
        isActive: true,
        role: 'admin',
        lastLogin: new Date(Date.now() - 3600000).toISOString(),
        createdAt: new Date(Date.now() - 2592000000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      }
    ]
    
    const admin = mockAdmins.find(a => a._id == adminId)
    
    if (!admin) {
      showErrorToast('Admin not found')
      router.push('/cmx-super/dashboard')
      return
    }

    adminData.value = admin
    formData.value = {
      firstName: admin.firstName || '',
      lastName: admin.lastName || '',
      email: admin.email || '',
      phoneNumber: admin.phoneNumber || '',
      username: admin.username || ''
    }
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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const validateStep = () => {
  if (currentStep.value === 1) {
    if (!formData.value.firstName?.trim()) {
      showErrorToast('First name is required')
      return false
    }
    if (!formData.value.lastName?.trim()) {
      showErrorToast('Last name is required')
      return false
    }
    if (!formData.value.email?.trim()) {
      showErrorToast('Email is required')
      return false
    }
    if (!formData.value.username?.trim()) {
      showErrorToast('Username is required')
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

const saveChanges = async () => {
  if (!validateStep()) return
  
  isSubmitting.value = true
  try {
    const updateData = {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      phoneNumber: formData.value.phoneNumber || null,
      username: formData.value.username
    }

    const response = await adminService.updateAdmin(adminData.value._id, updateData)
    
    if (response && response.success) {
      showSuccessToast('Admin updated successfully!')
      
      // Update local data
      adminData.value = { ...adminData.value, ...updateData, updatedAt: new Date().toISOString() }
      
      // Go back to dashboard
      router.push('/cmx-super/dashboard')
    } else {
      throw new Error('Update failed')
    }
    
  } catch (error) {
    console.error('Error updating admin:', error)
    
    const errorMessage = adminService.constructor.getErrorMessage(error)
    showErrorToast(errorMessage)
    
    // Handle specific error cases
    if (error.response && error.response.status === 401) {
      handleLogout()
    }
  } finally {
    isSubmitting.value = false
  }
}

const toggleAdminStatus = async () => {
  isStatusToggling.value = true
  try {
    const newStatus = !adminData.value.isActive
    const response = await adminService.toggleAdminStatus(adminData.value._id, newStatus)
    
    if (response && response.success) {
      adminData.value.isActive = newStatus
      showSuccessToast(`Admin ${newStatus ? 'activated' : 'deactivated'} successfully`)
    } else {
      throw new Error('Status toggle failed')
    }
    
  } catch (error) {
    console.error('Error toggling admin status:', error)
    
    const errorMessage = adminService.constructor.getErrorMessage(error)
    showErrorToast(errorMessage)
  } finally {
    isStatusToggling.value = false
  }
}

const resetPassword = async () => {
  if (!isPasswordValid.value) {
    showErrorToast('Please enter a valid password (min 6 characters) and confirm it')
    return
  }
  
  isResettingPassword.value = true
  try {
    const response = await adminService.resetAdminPassword(adminData.value._id, newPassword.value)
    
    if (response && response.success) {
      showSuccessToast('Password reset successfully!')
      cancelPasswordReset()
    } else {
      throw new Error('Password reset failed')
    }
    
  } catch (error) {
    console.error('Error resetting password:', error)
    
    const errorMessage = adminService.constructor.getErrorMessage(error)
    showErrorToast(errorMessage)
  } finally {
    isResettingPassword.value = false
  }
}

const cancelPasswordReset = () => {
  showPasswordForm.value = false
  newPassword.value = ''
  confirmPassword.value = ''
}

const confirmDelete = async () => {
  // Reset the confirmation text
  deleteConfirmText.value = ''
  
  // Show the modal using Bootstrap's modal API
  try {
    const { Modal } = await import('bootstrap')
    const modal = new Modal(deleteModal.value)
    modal.show()
  } catch (error) {
    console.error('Error showing modal:', error)
    // Fallback to simple confirm dialog
    if (confirm(`Are you sure you want to delete admin ${adminData.value.firstName} ${adminData.value.lastName}? This will deactivate the user.`)) {
      deleteAdmin()
    }
  }
}

const deleteAdmin = async () => {
  isDeleting.value = true
  try {
    const response = await adminService.deleteAdmin(adminData.value._id)
    
    if (response && response.success) {
      showSuccessToast('Admin deleted successfully!')
      
      // Close modal if it exists
      try {
        const { Modal } = await import('bootstrap')
        const modal = Modal.getInstance(deleteModal.value)
        modal?.hide()
      } catch (error) {
        console.error('Error closing modal:', error)
      }
      
      router.push('/cmx-super/dashboard')
    } else {
      throw new Error('Delete failed')
    }
    
  } catch (error) {
    console.error('Error deleting admin:', error)
    
    const errorMessage = adminService.constructor.getErrorMessage(error)
    showErrorToast(errorMessage)
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.edit-admin-page {
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

.form-control:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
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