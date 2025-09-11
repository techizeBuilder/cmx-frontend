<template>
  <div class="shop-view-page">
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
        <div class="col-lg-10">
          <div class="card">
            <div class="card-header bg-custom-header">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                  <i class="fas fa-store me-2"></i>Shop Details
                  <span v-if="shopData?.shopId" class="text-muted ms-2">({{ shopData.shopId }})</span>
                </h4>
                <div class="d-flex gap-2">
                  <button 
                    v-if="shopData" 
                    @click="editShop" 
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-edit me-2"></i>Edit Shop
                  </button>
                  <span 
                    v-if="shopData"
                    :class="['badge', 'px-3', 'py-2', 'rounded-pill', shopData.active ? 'bg-success' : 'bg-danger']"
                  >
                    <i :class="['fas', 'me-1', shopData.active ? 'fa-check-circle' : 'fa-times-circle']"></i>
                    {{ shopData.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Loading State -->
              <div v-if="isLoadingShop" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading shop data...</span>
                </div>
                <p class="mt-3">Loading shop information...</p>
              </div>

              <!-- Shop Data -->
              <div v-else-if="shopData">
                <!-- Shop Logo -->
                <div class="text-center mb-5" v-if="getImageUrl(shopData.shopLogo)">
                  <div class="shop-logo-container">
                    <img :src="getImageUrl(shopData.shopLogo)" alt="Shop Logo" class="shop-logo-large" />
                  </div>
                </div>

                <div class="row g-4">
                  <!-- Basic Information -->
                  <div class="col-xl-6 col-lg-12">
                    <div class="info-card border-custom h-100">
                      <div class="info-card-header bg-custom-cell">
                        <h6 class="mb-0 fw-bold"><i class="fas fa-info-circle me-2"></i>Basic Information</h6>
                      </div>
                      <div class="info-card-body">
                        <div class="info-item mb-3">
                          <label class="info-label">Shop Name</label>
                          <p class="info-value">{{ shopData.name }}</p>
                        </div>
                        <div class="info-item mb-3">
                          <label class="info-label">Shop ID</label>
                          <p class="info-value">{{ shopData.id }}</p>
                        </div>
                        <div class="info-item mb-3">
                          <label class="info-label">Status</label>
                          <p class="info-value">
                            <span :class="['badge', 'px-3', 'py-2', 'rounded-pill', shopData.active ? 'bg-success' : 'bg-danger']">
                              <i :class="['fas', 'me-1', shopData.active ? 'fa-check-circle' : 'fa-times-circle']"></i>
                              {{ shopData.active ? 'Active' : 'Inactive' }}
                            </span>
                          </p>
                        </div>
                        <div class="info-item mb-3" v-if="shopData.website && shopData.website !== 'N/A'">
                          <label class="info-label">Website</label>
                          <p class="info-value">
                            <a :href="shopData.website" target="_blank" class="text-decoration-none text-primary">
                              {{ shopData.website }}
                              <i class="fas fa-external-link-alt ms-1"></i>
                            </a>
                          </p>
                        </div>
                        <div class="info-item" v-if="shopData.createdAt">
                          <label class="info-label">Created</label>
                          <p class="info-value">{{ formatDate(shopData.createdAt) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div class="col-xl-6 col-lg-12">
                    <div class="info-card border-custom h-100">
                      <div class="info-card-header bg-custom-cell">
                        <h6 class="mb-0 fw-bold"><i class="fas fa-map-marker-alt me-2"></i>Location & Contact</h6>
                      </div>
                      <div class="info-card-body">
                        <div class="info-item mb-3">
                          <label class="info-label">Phone</label>
                          <p class="info-value">
                            <a :href="`tel:${shopData.phone}`" class="text-decoration-none text-success">
                              <i class="fas fa-phone me-1"></i>{{ shopData.phone }}
                            </a>
                          </p>
                        </div>
                        <div class="info-item mb-3" v-if="shopData.email && shopData.email !== 'N/A'">
                          <label class="info-label">Email</label>
                          <p class="info-value">
                            <a :href="`mailto:${shopData.email}`" class="text-decoration-none text-info">
                              <i class="fas fa-envelope me-1"></i>{{ shopData.email }}
                            </a>
                          </p>
                        </div>
                        <div class="info-item mb-3">
                          <label class="info-label">Full Address</label>
                          <p class="info-value address-text">
                            <i class="fas fa-map-marker-alt me-1 text-danger"></i>
                            {{ shopData.address }}<br>
                            {{ shopData.city }}, {{ shopData.state }} {{ shopData.zipCode }}<br>
                            {{ shopData.country }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Admin Information -->
                  <div class="col-xl-6 col-lg-12">
                    <div class="info-card border-custom h-100">
                      <div class="info-card-header bg-custom-cell">
                        <h6 class="mb-0 fw-bold"><i class="fas fa-user-shield me-2"></i>Admin Information</h6>
                      </div>
                      <div class="info-card-body">
                        <div class="info-item mb-3">
                          <label class="info-label">Admin Name</label>
                          <p class="info-value">
                            <i class="fas fa-user me-1"></i>{{ shopData.adminName }}
                          </p>
                        </div>
                        <div class="info-item mb-3" v-if="shopData.adminPhone && shopData.adminPhone !== 'N/A'">
                          <label class="info-label">Admin Phone</label>
                          <p class="info-value">
                            <a :href="`tel:${shopData.adminPhone}`" class="text-decoration-none text-success">
                              <i class="fas fa-mobile-alt me-1"></i>{{ shopData.adminPhone }}
                            </a>
                          </p>
                        </div>
                        <div class="info-item" v-if="shopData.adminEmail && shopData.adminEmail !== 'N/A'">
                          <label class="info-label">Admin Email</label>
                          <p class="info-value">
                            <a :href="`mailto:${shopData.adminEmail}`" class="text-decoration-none text-info">
                              <i class="fas fa-envelope me-1"></i>{{ shopData.adminEmail }}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Settings Information -->
                  <div class="col-xl-6 col-lg-12">
                    <div class="info-card border-custom h-100">
                      <div class="info-card-header bg-custom-cell">
                        <h6 class="mb-0 fw-bold"><i class="fas fa-cogs me-2"></i>Shop Settings</h6>
                      </div>
                      <div class="info-card-body">
                        <div class="info-item mb-3" v-if="shopData.timeZone && shopData.timeZone !== 'N/A'">
                          <label class="info-label">Time Zone</label>
                          <p class="info-value">
                            <i class="fas fa-clock me-1"></i>{{ shopData.timeZone }}
                          </p>
                        </div>
                        <div class="info-item mb-3" v-if="shopData.dateFormat && shopData.dateFormat !== 'N/A'">
                          <label class="info-label">Date Format</label>
                          <p class="info-value">
                            <i class="fas fa-calendar me-1"></i>{{ shopData.dateFormat }}
                          </p>
                        </div>
                        <div class="info-item" v-if="shopData.timeFormat && shopData.timeFormat !== 'N/A'">
                          <label class="info-label">Time Format</label>
                          <p class="info-value">
                            <i class="fas fa-clock me-1"></i>{{ shopData.timeFormat }}
                          </p>
                        </div>
                        <div class="info-item" v-if="!shopData.timeZone && !shopData.dateFormat && !shopData.timeFormat">
                          <p class="text-muted text-center py-3">
                            <i class="fas fa-info-circle me-1"></i>
                            No settings configured
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error State -->
              <div v-else class="text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h5>Shop Not Found</h5>
                <p class="text-muted">The requested shop could not be found.</p>
                <button @click="goBack" class="btn btn-primary">
                  <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
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
import { useRouter, useRoute } from 'vue-router'
import { showSuccessToast, showErrorToast } from '../../toster'
import { shopService } from '../services/shopService'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const router = useRouter()
const route = useRoute()

// Page state
const isLoadingShop = ref(true)
const shopData = ref(null)

// Helper function to format image URLs with base URL
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === 'N/A') return null
  
  // If the path is already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If the path starts with '/', remove it to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath
  
  return `${API_BASE_URL}/${cleanPath}`
}

// Load shop data
const loadShopData = async () => {
  try {
    isLoadingShop.value = true
    const shopId = route.params.shopId
    
    if (!shopId) {
      throw new Error('Shop ID is required')
    }

    console.log('Loading shop data for ID:', shopId)
    const response = await shopService.getShopById(shopId)
    
    if (response && response.success && response.data) {
      // Transform the data similar to dashboard
      const shop = response.data
      shopData.value = {
        id: shop.shopId || shop._id,
        name: shop.name,
        city: shop.address?.city || 'N/A',
        state: shop.address?.state || 'N/A',
        adminName: shop.admin?.name || 'N/A',
        active: shop.status === 'active',
        email: shop.contact?.email || 'N/A',
        phone: shop.contact?.phone || 'N/A',
        address: shop.address?.street || 'N/A',
        website: shop.website || 'N/A',
        zipCode: shop.address?.zipCode || 'N/A',
        country: shop.address?.country || 'N/A',
        shopLogo: shop.logo || null,
        adminEmail: shop.admin?.email || 'N/A',
        adminPhone: shop.admin?.phone || 'N/A',
        createdAt: shop.createdAt,
        timeZone: shop.settings?.timeZone || 'N/A',
        dateFormat: shop.settings?.dateFormat || 'N/A',
        timeFormat: shop.settings?.timeFormat || 'N/A'
      }
      
      console.log('Shop data loaded:', shopData.value)
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Error loading shop data:', error)
    
    if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.')
      handleLogout()
    } else if (error.response && error.response.status === 404) {
      showErrorToast('Shop not found')
    } else {
      showErrorToast('Error loading shop data. Please try again.')
    }
    
    // Set shopData to null to show error state
    shopData.value = null
  } finally {
    isLoadingShop.value = false
  }
}

// Navigation functions
const goBack = () => {
  router.push('/cmx-super/dashboard')
}

const editShop = () => {
  if (shopData.value?.id) {
    router.push(`/cmx-super/edit-shop/${shopData.value.id}`)
  }
}

const handleLogout = () => {
  localStorage.removeItem('superAdminToken')
  localStorage.removeItem('superAdminData')
  router.push('/cmx-super/login')
}

// Format date helper
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

// Load data on component mount
onMounted(() => {
  loadShopData()
})
</script>

<style scoped>
.shop-view-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 8px;
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

/* Shop Logo Styles */
.shop-logo-container {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  display: inline-block;
}

.shop-logo-large {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Info Cards */
.info-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.info-card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #EEEEEE;
  border-radius: 8px 8px 0 0;
}

.info-card-body {
  padding: 1.5rem;
}

.info-item {
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 0.75rem;
}

.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
  display: block;
}

.info-value {
  font-size: 1rem;
  color: #2d3748;
  margin-bottom: 0;
  word-break: break-word;
}

.address-text {
  line-height: 1.6;
}

/* Button Styles */
.btn-primary {
  background-color: #027A2B;
  border-color: #027A2B;
}

.btn-primary:hover {
  background-color: #025c20;
  border-color: #025c20;
}

.badge {
  font-size: 0.875rem;
}

.bg-success {
  background-color: #027A2B !important;
}

.spinner-border.text-primary {
  color: #027A2B !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .shop-logo-large {
    max-width: 150px;
    max-height: 150px;
  }
  
  .info-card-body {
    padding: 1rem;
  }
  
  .info-value {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .shop-logo-large {
    max-width: 120px;
    max-height: 120px;
  }
  
  .info-card-header {
    padding: 0.75rem 1rem;
  }
  
  .info-card-body {
    padding: 0.75rem;
  }
  
  .info-label {
    font-size: 0.75rem;
  }
  
  .info-value {
    font-size: 0.85rem;
  }
}
</style>
