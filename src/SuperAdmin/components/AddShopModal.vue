<template>
  <div>
    <!-- Bootstrap Modal -->
    <div class="modal fade" :class="{ 'show d-block': dialog }" tabindex="-1" role="dialog" v-if="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Shop</h5>
            <button type="button" class="btn-close" @click="closeDialog" aria-label="Close"></button>
          </div>
          
          <div class="modal-body">
            <!-- Progress Steps -->
            <div class="mb-4">
              <div class="progress">
                <div class="progress-bar bg-primary" :style="{ width: (currentStep / 3) * 100 + '%' }"></div>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <small :class="{ 'text-primary fw-bold': currentStep >= 1 }">Shop Details & Settings</small>
                <small :class="{ 'text-primary fw-bold': currentStep >= 2 }">Shop Logo</small>
                <small :class="{ 'text-primary fw-bold': currentStep >= 3 }">Admin Info</small>
              </div>
            </div>

            <!-- Step 1: Shop Details -->
            <div v-if="currentStep === 1">
              <h6 class="mb-3">Shop Details & Settings</h6>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Shop Name *</label>
                    <input 
                      v-model="formData.shopName" 
                      type="text" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Phone Number *</label>
                    <input 
                      v-model="formData.shopPhone" 
                      type="tel" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Shop Email</label>
                    <input 
                      v-model="formData.shopEmail" 
                      type="email" 
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Website</label>
                    <input 
                      v-model="formData.shopWebsite" 
                      type="url" 
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Address *</label>
                    <input 
                      v-model="formData.address" 
                      type="text" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">City *</label>
                    <input 
                      v-model="formData.city" 
                      type="text" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">State *</label>
                    <select v-model="formData.state" class="form-select" required>
                      <option value="">Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="CA">California</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">ZIP Code *</label>
                    <input 
                      v-model="formData.zipCode" 
                      type="text" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Country *</label>
                    <select v-model="formData.country" class="form-select" required>
                      <option value="">Select Country</option>
                      <option value="USA">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Time Zone *</label>
                    <select v-model="formData.timeZone" class="form-select" required>
                      <option value="">Select Time Zone</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Anchorage">Alaska Time (AKT)</option>
                      <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Date Format *</label>
                    <select v-model="formData.dateFormat" class="form-select" required>
                      <option value="">Select Date Format</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Time Format *</label>
                    <select v-model="formData.timeFormat" class="form-select" required>
                      <option value="">Select Time Format</option>
                      <option value="HH:MM AM/PM">12-hour (HH:MM AM/PM)</option>
                      <option value="HH:MM">24-hour (HH:MM)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Logo Upload -->
            <div v-if="currentStep === 2">
              <h6 class="mb-3">Shop Logo</h6>
              <div class="text-center">
                <div class="logo-upload-area mb-3" @click="$refs.logoInput.click()">
                  <div v-if="!logoPreview" class="upload-placeholder">
                    <i class="fas fa-cloud-upload-alt fa-3x text-muted"></i>
                    <p class="mt-2">Click to upload shop logo</p>
                    <small class="text-muted">Supported formats: JPG, JPEG, PNG (Max 2MB)</small>
                  </div>
                  <div v-else class="logo-preview">
                    <img :src="logoPreview" alt="Logo Preview" class="img-fluid" />
                  </div>
                </div>
                <input 
                  ref="logoInput"
                  type="file" 
                  class="d-none" 
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  @change="onLogoChange"
                />
                <button 
                  v-if="logoPreview" 
                  @click="clearLogo" 
                  class="btn btn-outline-danger btn-sm"
                >
                  Remove Logo
                </button>
              </div>
            </div>

            <!-- Step 3: Admin Information -->
            <div v-if="currentStep === 3">
              <h6 class="mb-3">Admin Information</h6>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Admin Name *</label>
                    <input 
                      v-model="formData.adminName" 
                      type="text" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Admin Phone *</label>
                    <input 
                      v-model="formData.adminPhone" 
                      type="tel" 
                      class="form-control" 
                      required
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label">Admin Email *</label>
                    <input 
                      v-model="formData.adminEmail" 
                      type="email" 
                      class="form-control" 
                      required
                    />
                    <small class="form-text text-muted">This will be used for admin login and notifications</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button 
              v-if="currentStep > 1" 
              @click="currentStep--" 
              class="btn btn-secondary"
            >
              Previous
            </button>
            <button 
              v-if="currentStep < 3" 
              @click="nextStep" 
              class="btn btn-primary"
            >
              Next
            </button>
            <button 
              v-if="currentStep === 3" 
              @click="submitForm" 
              class="btn btn-success"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ isSubmitting ? 'Creating...' : 'Create Shop' }}
            </button>
            <button @click="closeDialog" class="btn btn-outline-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Backdrop -->
    <div v-if="dialog" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { showSuccessToast, showErrorToast } from '../../toster'
import { shopService } from '../services/shopService'

const emit = defineEmits(['shop-added'])

// Modal state
const dialog = ref(false)

// Watch for dialog changes
watch(dialog, (newValue) => {
  console.log('Modal dialog changed:', newValue)
})
const currentStep = ref(1)
const isSubmitting = ref(false)
const logoPreview = ref(null)

// Form data
const formData = ref({
  shopName: '',
  shopPhone: '',
  shopEmail: '',
  shopWebsite: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  timeZone: '',
  dateFormat: '',
  timeFormat: '',
  logo: null,
  adminName: '',
  adminPhone: '',
  adminEmail: ''
})

// Validation functions
const validateStep = () => {
  if (currentStep.value === 1) {
    const required = ['shopName', 'shopPhone', 'address', 'city', 'state', 'zipCode', 'country', 'timeZone', 'dateFormat', 'timeFormat']
    return required.every(field => formData.value[field]?.toString().trim() !== '')
  } else if (currentStep.value === 3) {
    const required = ['adminName', 'adminPhone', 'adminEmail']
    return required.every(field => formData.value[field]?.toString().trim() !== '')
  }
  return true
}

// Step navigation
const nextStep = () => {
  if (!validateStep()) {
    if (currentStep.value === 1) {
      showErrorToast('Please fill all required shop details and settings')
    } else if (currentStep.value === 3) {
      showErrorToast('Please fill all admin information')
    }
    return
  }
  
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

// File upload handling
const onLogoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      showErrorToast('Only JPG, JPEG, and PNG files are allowed')
      event.target.value = ''
      return
    }
    
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      showErrorToast('File size must be less than 2MB')
      event.target.value = ''
      return
    }
    
    formData.value.logo = file
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const clearLogo = () => {
  formData.value.logo = null
  logoPreview.value = null
  // Clear the file input
  const logoInput = document.querySelector('input[type="file"]')
  if (logoInput) {
    logoInput.value = ''
  }
}

// Form submission
const submitForm = async () => {
  if (!validateStep()) {
    showErrorToast('Please fill all required fields correctly')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Create FormData for API submission (multipart/form-data)
    const formDataToSubmit = new FormData()
    
    // Required fields according to API specification
    formDataToSubmit.append('shopName', formData.value.shopName)
    formDataToSubmit.append('shopPhone', formData.value.shopPhone)
    formDataToSubmit.append('address', formData.value.address)
    formDataToSubmit.append('city', formData.value.city)
    formDataToSubmit.append('state', formData.value.state)
    formDataToSubmit.append('zipCode', formData.value.zipCode)
    formDataToSubmit.append('country', formData.value.country)
    formDataToSubmit.append('timeZone', formData.value.timeZone)
    formDataToSubmit.append('dateFormat', formData.value.dateFormat)
    formDataToSubmit.append('timeFormat', formData.value.timeFormat)
    formDataToSubmit.append('adminName', formData.value.adminName)
    formDataToSubmit.append('adminPhone', formData.value.adminPhone)
    formDataToSubmit.append('adminEmail', formData.value.adminEmail)
    
    // Optional fields - only send if they have actual values
    if (formData.value.shopEmail && formData.value.shopEmail.trim() !== '') {
      formDataToSubmit.append('shopEmail', formData.value.shopEmail.trim())
    }
    
    if (formData.value.shopWebsite && formData.value.shopWebsite.trim() !== '') {
      formDataToSubmit.append('shopWebsite', formData.value.shopWebsite.trim())
    }
    
    // Add logo file if selected
    if (formData.value.logo) {
      formDataToSubmit.append('logo', formData.value.logo)
    }
    
    // Call API
    const response = await shopService.createShop(formDataToSubmit)
    
    if (response && response.success) {
      showSuccessToast(response.message || 'Shop created successfully!')
      emit('shop-added', response.data)
      closeDialog()
    } else {
      throw new Error('Invalid response format')
    }
    
  } catch (error) {
    console.error('Error creating shop:', error)
    
    // Handle specific error responses
    if (error.response && error.response.data) {
      const errorData = error.response.data
      if (errorData.message && errorData.errors) {
        // Check for duplicate key errors
        const duplicateError = errorData.errors.find(err => 
          err.message && err.message.includes('E11000 duplicate key error')
        )
        
        if (duplicateError) {
          if (duplicateError.message.includes('email')) {
            showErrorToast('A shop with this email address already exists. Please use a different email.')
          } else if (duplicateError.message.includes('name')) {
            showErrorToast('A shop with this name already exists. Please use a different name.')
          } else {
            showErrorToast('A shop with these details already exists. Please check your input.')
          }
        } else {
          // Handle other validation errors
          const errorMessages = errorData.errors.map(err => err.message).join(', ')
          showErrorToast(`Validation Error: ${errorMessages}`)
        }
      } else if (errorData.message) {
        showErrorToast(errorData.message)
      } else if (errorData.errors) {
        // Handle validation errors
        const errorMessages = Object.values(errorData.errors).flat()
        showErrorToast(errorMessages.join(', '))
      } else {
        showErrorToast('Invalid request data')
      }
    } else if (error.response && error.response.status === 400) {
      showErrorToast('Invalid shop data. Please check all required fields.')
    } else if (error.response && error.response.status === 409) {
      showErrorToast('Shop with this email or name already exists.')
    } else if (error.response && error.response.status === 401) {
      showErrorToast('Unauthorized. Please login again.')
    } else {
      showErrorToast('Failed to create shop. Please try again.')
    }
  } finally {
    isSubmitting.value = false
  }
}

// Close modal and reset
const closeDialog = () => {
  dialog.value = false
  currentStep.value = 1
  isSubmitting.value = false
  logoPreview.value = null
  
  // Reset form data
  formData.value = {
    shopName: '',
    shopPhone: '',
    shopEmail: '',
    shopWebsite: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    timeZone: '',
    dateFormat: '',
    timeFormat: '',
    logo: null,
    adminName: '',
    adminPhone: '',
    adminEmail: ''
  }
}

// Expose dialog for parent component
defineExpose({
  dialog
})
</script>

<style scoped>
.logo-upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px;
  cursor: pointer;
  transition: border-color 0.3s;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-upload-area:hover {
  border-color: #007bff;
}

.upload-placeholder {
  color: #6c757d;
  text-align: center;
}

.logo-preview {
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
}

.logo-preview img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.progress {
  height: 8px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}

.modal.show {
  z-index: 1050;
}

.progress-bar {
  transition: width 0.3s ease;
}
</style>