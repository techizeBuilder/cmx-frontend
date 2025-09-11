<template>
  <div class="dashboard-container">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">CMX Super Admin</span>
        <div class="d-flex align-items-center">
          <span class="text-white me-3">{{ userData?.firstName }} {{ userData?.lastName }}</span>
          <button @click="handleLogout" class="btn btn-outline-light">Logout</button>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <!-- Compact Dashboard Cards -->
      <div class="row mb-5 pb-3">
        <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
          <div class="compact-dashboard-card" 
               :class="{ 'active-card': activeModule === 'shopManagement' }"
               @click="activeModule = 'shopManagement'">
            <div class="card-header-compact">
              <div class="icon-section">
                <i class="fas fa-store"></i>
              </div>
              <div class="stats-section">
                <span class="count">{{ shops.length }}</span>
                <span class="label">Shops</span>
              </div>
            </div>
            <div class="card-content-compact">
              <h6 class="card-title-compact">Shop Admins</h6>
              <p class="card-desc">Manage shops & admins</p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
          <div class="compact-dashboard-card" 
               :class="{ 'active-card': activeModule === 'settings' }"
               @click="activeModule = 'settings'">
            <div class="card-header-compact">
              <div class="icon-section">
                <i class="fas fa-cog"></i>
              </div>
              <div class="stats-section">
                <span class="count">5</span>
                <span class="label">Configs</span>
              </div>
            </div>
            <div class="card-content-compact">
              <h6 class="card-title-compact">System Settings</h6>
              <p class="card-desc">Global configurations</p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
          <div class="compact-dashboard-card" 
               :class="{ 'active-card': activeModule === 'analytics' }"
               @click="activeModule = 'analytics'">
            <div class="card-header-compact">
              <div class="icon-section">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stats-section">
                <span class="count">98%</span>
                <span class="label">Uptime</span>
              </div>
            </div>
            <div class="card-content-compact">
              <h6 class="card-title-compact">Analytics</h6>
              <p class="card-desc">Reports & metrics</p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
          <div class="compact-dashboard-card" 
               :class="{ 'active-card': activeModule === 'subscriptions' }"
               @click="activeModule = 'subscriptions'">
            <div class="card-header-compact">
              <div class="icon-section">
                <i class="fas fa-crown"></i>
              </div>
              <div class="stats-section">
                <span class="count">{{ subscriptionPlans.length }}</span>
                <span class="label">Plans</span>
              </div>
            </div>
            <div class="card-content-compact">
              <h6 class="card-title-compact">Subscriptions</h6>
              <p class="card-desc">${{ totalMonthlyRevenue.toLocaleString() }}/mo</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Module Content -->
      <div v-if="activeModule === 'shopManagement'">
        <!-- Shop Management Section -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2><i class="fas fa-store me-2"></i>Shop Admins</h2>
          <button @click="goToAddShop" class="btn btn-primary">
            <i class="fas fa-plus me-2"></i> Add Shop
          </button>
        </div>

      <!-- Filters and Search -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <label for="search" class="form-label">Search Shops</label>
              <input 
                type="text" 
                class="form-control" 
                id="search"
                v-model="searchQuery" 
                placeholder="Search by name, ID, or location..."
                @input="handleSearch"
              >
            </div>
            <div class="col-md-3">
              <label for="statusFilter" class="form-label">Status Filter</label>
              <select class="form-select" id="statusFilter" v-model="statusFilter" @change="applyFilters">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div class="col-md-3">
              <label for="limitSelect" class="form-label">Items per page</label>
              <select class="form-select" id="limitSelect" v-model="itemsPerPage" @change="applyFilters">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button class="btn btn-outline-secondary" @click="refreshShops" :disabled="isLoading">
                <i class="fas fa-refresh me-2"></i>Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading shops...</p>
      </div>

      <!-- Shop List -->
      <div class="card" v-else>
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Shops ({{ pagination.total || shops.length }})</h5>
          <small class="text-muted" v-if="pagination.total">
            Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to 
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }}
          </small>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Shop ID</th>
                  <th>Shop Name</th>
                  <th>Location</th>
                  <th>Admin Contact</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="shop in shops" :key="shop.id">
                  <td>{{ shop.id }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img v-if="getImageUrl(shop.shopLogo)" :src="getImageUrl(shop.shopLogo)" alt="Shop Logo" 
                           class="shop-logo me-2" style="width: 30px; height: 30px; border-radius: 4px;">
                      {{ shop.name }}
                    </div>
                  </td>
                  <td>
                    <div>{{ shop.city }}, {{ shop.state }}</div>
                    <small class="text-muted">{{ shop.zipCode }}, {{ shop.country }}</small>
                  </td>
                  <td>{{ shop.adminName }}</td>
                  <td>
                    <div>{{ shop.email }}</div>
                    <small class="text-muted" v-if="shop.adminEmail">Admin: {{ shop.adminEmail }}</small>
                  </td>
                  <td>
                    <div>{{ shop.phone }}</div>
                    <small class="text-muted" v-if="shop.adminPhone">Admin: {{ shop.adminPhone }}</small>
                  </td>
                  <td>
                    <span :class="['badge', shop.active ? 'bg-success' : 'bg-danger']">
                      {{ shop.active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editShop(shop)"
                            title="Edit Shop">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info me-2" @click="viewShop(shop)"
                            title="View Details">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm" 
                            :class="shop.active ? 'btn-outline-danger' : 'btn-outline-success'"
                            @click="toggleShopStatus(shop)"
                            :title="shop.active ? 'Deactivate Shop' : 'Activate Shop'">
                      <i class="fas" :class="shop.active ? 'fa-ban' : 'fa-check'"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Empty State -->
            <div v-if="shops.length === 0" class="text-center py-4">
              <i class="fas fa-store fa-3x text-muted mb-3"></i>
              <h5>No shops found</h5>
              <p class="text-muted">{{ searchQuery || statusFilter ? 'Try adjusting your filters' : 'Start by adding your first shop' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="card-footer" v-if="pagination.totalPages > 1">
          <nav aria-label="Shop pagination">
            <ul class="pagination justify-content-center mb-0">
              <li class="page-item" :class="{ 'disabled': pagination.page <= 1 }">
                <button class="page-link" @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1">
                  Previous
                </button>
              </li>
              
              <li v-for="page in getVisiblePages()" :key="page" 
                  class="page-item" :class="{ 'active': page === pagination.page }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              
              <li class="page-item" :class="{ 'disabled': pagination.page >= pagination.totalPages }">
                <button class="page-link" @click="changePage(pagination.page + 1)" 
                        :disabled="pagination.page >= pagination.totalPages">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- End of Shop Management Module -->
      </div>

      <!-- Settings Module -->
      <div v-else-if="activeModule === 'settings'" class="module-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2><i class="fas fa-cog me-2"></i>Settings & Profile</h2>
        </div>
        
        <div class="row">
          <!-- Profile Management -->
          <div class="col-lg-6">
            <div class="card border-custom shadow-sm h-100">
              <div class="card-header bg-custom-header border-0">
                <h5 class="mb-0 fw-bold">
                  <i class="fas fa-user me-2"></i>Profile Information
                </h5>
              </div>
              <div class="card-body p-4">
                <form @submit.prevent="updateProfile">
                  <div class="mb-3">
                    <label class="form-label fw-semibold">First Name *</label>
                    <input 
                      type="text" 
                      class="form-control"
                      v-model="profileForm.firstName"
                      placeholder="Enter first name"
                      required
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Last Name *</label>
                    <input 
                      type="text" 
                      class="form-control"
                      v-model="profileForm.lastName"
                      placeholder="Enter last name"
                      required
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Phone Number</label>
                    <input 
                      type="tel" 
                      class="form-control"
                      v-model="profileForm.phoneNumber"
                      placeholder="Enter phone number"
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Email</label>
                    <input 
                      type="email" 
                      class="form-control"
                      :value="userData?.email || ''"
                      disabled
                      readonly
                    >
                    <small class="text-muted">Email cannot be changed</small>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Username</label>
                    <input 
                      type="text" 
                      class="form-control"
                      :value="userData?.username || ''"
                      disabled
                      readonly
                    >
                    <small class="text-muted">Username cannot be changed</small>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="btn btn-primary w-100"
                    :disabled="isUpdatingProfile"
                  >
                    <span v-if="isUpdatingProfile" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="fas fa-save me-2"></i>
                    {{ isUpdatingProfile ? 'Updating...' : 'Update Profile' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Password Management -->
          <div class="col-lg-6">
            <div class="card border-custom shadow-sm h-100">
              <div class="card-header bg-custom-cell border-0">
                <h5 class="mb-0 fw-bold">
                  <i class="fas fa-lock me-2"></i>Password Management
                </h5>
              </div>
              <div class="card-body p-4">
                <div v-if="!showPasswordForm">
                  <div class="text-center py-4">
                    <i class="fas fa-shield-alt fa-3x text-muted mb-3"></i>
                    <p class="text-muted mb-3">Keep your account secure by changing your password regularly.</p>
                    <button 
                      class="btn btn-outline-primary"
                      @click="togglePasswordForm"
                    >
                      <i class="fas fa-key me-2"></i>Change Password
                    </button>
                  </div>
                </div>
                
                <div v-else>
                  <form @submit.prevent="changePassword">
                    <div class="mb-3">
                      <label class="form-label fw-semibold">Current Password *</label>
                      <input 
                        type="password" 
                        class="form-control"
                        v-model="passwordForm.currentPassword"
                        placeholder="Enter current password"
                        required
                      >
                    </div>
                    
                    <div class="mb-3">
                      <label class="form-label fw-semibold">New Password *</label>
                      <input 
                        type="password" 
                        class="form-control"
                        v-model="passwordForm.newPassword"
                        placeholder="Enter new password"
                        minlength="6"
                        required
                      >
                      <small class="text-muted">Password must be at least 6 characters long</small>
                    </div>
                    
                    <div class="mb-4">
                      <label class="form-label fw-semibold">Confirm New Password *</label>
                      <input 
                        type="password" 
                        class="form-control"
                        v-model="passwordForm.confirmPassword"
                        placeholder="Confirm new password"
                        required
                      >
                    </div>
                    
                    <div class="d-flex gap-2">
                      <button 
                        type="submit" 
                        class="btn btn-primary flex-fill"
                        :disabled="isChangingPassword"
                      >
                        <span v-if="isChangingPassword" class="spinner-border spinner-border-sm me-2"></span>
                        <i v-else class="fas fa-key me-2"></i>
                        {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-outline-secondary"
                        @click="togglePasswordForm"
                        :disabled="isChangingPassword"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Settings Cards -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card border-custom shadow-sm">
              <div class="card-header bg-custom-cell border-0">
                <h6 class="mb-0 fw-bold"><i class="fas fa-globe me-2"></i>System Settings</h6>
              </div>
              <div class="card-body">
                <p class="card-text text-muted">Configure system-wide settings and preferences.</p>
                <button class="btn btn-outline-primary">
                  <i class="fas fa-cogs me-2"></i>Configure System
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card border-custom shadow-sm">
              <div class="card-header bg-custom-cell border-0">
                <h6 class="mb-0 fw-bold"><i class="fas fa-user-shield me-2"></i>Admin Management</h6>
              </div>
              <div class="card-body">
                <p class="card-text text-muted">Create and manage system administrators.</p>
                <div class="d-flex gap-2 mb-3">
                  <div class="text-center">
                    <div class="badge bg-primary fs-6 px-2 py-1">{{ adminStats.total }}</div>
                    <small class="d-block text-muted">Total</small>
                  </div>
                  <div class="text-center">
                    <div class="badge bg-success fs-6 px-2 py-1">{{ adminStats.active }}</div>
                    <small class="d-block text-muted">Active</small>
                  </div>
                  <div class="text-center">
                    <div class="badge bg-danger fs-6 px-2 py-1">{{ adminStats.inactive }}</div>
                    <small class="d-block text-muted">Inactive</small>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button @click="goToAddAdmin" class="btn btn-primary btn-sm">
                    <i class="fas fa-plus me-1"></i>Add Admin
                  </button>
                  <button @click="showAdminList = !showAdminList" class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-list me-1"></i>{{ showAdminList ? 'Hide' : 'View' }} List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Admin List (Collapsible) -->
        <div v-if="showAdminList" class="mt-4">
          <div class="card border-custom shadow-sm">
            <div class="card-header bg-custom-header border-0">
              <h6 class="mb-0 fw-bold"><i class="fas fa-users me-2"></i>Admin List</h6>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-6">
                  <input 
                    type="text" 
                    class="form-control form-control-sm" 
                    v-model="adminSearchQuery" 
                    placeholder="Search by username, email, or name..."
                    @input="handleAdminSearch"
                  >
                </div>
                <div class="col-md-3">
                  <select class="form-select form-select-sm" v-model="adminStatusFilter" @change="applyAdminFilters">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-outline-secondary btn-sm w-100" @click="loadAdmins(); loadAdminStats()" :disabled="isLoadingAdmins">
                    <i class="fas fa-refresh me-1"></i>Refresh
                  </button>
                </div>
              </div>

              <!-- Loading State -->
              <div v-if="isLoadingAdmins" class="text-center py-4">
                <div class="spinner-border spinner-border-sm text-primary" role="status">
                  <span class="visually-hidden">Loading admins...</span>
                </div>
                <p class="mt-2 mb-0">Loading admins...</p>
              </div>

              <!-- Admin Table -->
              <div v-else class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="admin in admins.slice(0, 10)" :key="admin._id">
                      <td>
                        <div class="d-flex align-items-center">
                          <i class="fas fa-user-circle me-2 text-muted"></i>
                          <strong>{{ admin.username }}</strong>
                        </div>
                      </td>
                      <td>{{ admin.firstName }} {{ admin.lastName }}</td>
                      <td>{{ admin.email }}</td>
                      <td>
                        <span :class="['badge', admin.isActive ? 'bg-success' : 'bg-danger']">
                          {{ admin.isActive ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td>
                        <div class="btn-group" role="group">
                          <button class="btn btn-sm btn-outline-primary" @click="goToEditAdmin(admin)"
                                  title="Edit Admin">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-sm btn-outline-warning" @click="openResetPasswordForm(admin)"
                                  title="Reset Password">
                            <i class="fas fa-key"></i>
                          </button>
                          <button class="btn btn-sm" 
                                  :class="admin.isActive ? 'btn-outline-danger' : 'btn-outline-success'"
                                  @click="toggleAdminStatus(admin)"
                                  :title="admin.isActive ? 'Deactivate Admin' : 'Activate Admin'">
                            <i class="fas" :class="admin.isActive ? 'fa-ban' : 'fa-check'"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <!-- Empty State -->
                <div v-if="admins.length === 0" class="text-center py-4">
                  <i class="fas fa-user-shield fa-2x text-muted mb-2"></i>
                  <h6>No admins found</h6>
                  <p class="text-muted small">{{ adminSearchQuery || adminStatusFilter ? 'Try adjusting your filters' : 'Start by creating your first admin' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Account Information -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="card border-custom shadow-sm">
              <div class="card-header bg-custom-header border-0">
                <h6 class="mb-0 fw-bold"><i class="fas fa-info-circle me-2"></i>Account Information</h6>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-3">
                    <small class="text-muted">Role:</small>
                    <p class="fw-semibold mb-2">{{ userData?.role || 'N/A' }}</p>
                  </div>
                  <div class="col-md-3">
                    <small class="text-muted">Status:</small>
                    <p class="mb-2">
                      <span class="badge bg-success px-3 py-2 rounded-pill">
                        <i class="fas fa-check-circle me-1"></i>Active
                      </span>
                    </p>
                  </div>
                  <div class="col-md-3">
                    <small class="text-muted">Last Login:</small>
                    <p class="fw-semibold mb-2">{{ userData?.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : 'N/A' }}</p>
                  </div>
                  <div class="col-md-3">
                    <small class="text-muted">Member Since:</small>
                    <p class="fw-semibold mb-2">{{ userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Module -->
      <div v-else-if="activeModule === 'analytics'" class="module-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2><i class="fas fa-chart-bar me-2"></i>Analytics & Reports</h2>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <i class="fas fa-store fa-2x text-primary mb-3"></i>
                <h3 class="text-primary">{{ shops.length }}</h3>
                <p class="card-text">Total Shops</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <i class="fas fa-check-circle fa-2x text-success mb-3"></i>
                <h3 class="text-success">{{ activeShopsCount }}</h3>
                <p class="card-text">Active Shops</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <i class="fas fa-pause-circle fa-2x text-warning mb-3"></i>
                <h3 class="text-warning">{{ inactiveShopsCount }}</h3>
                <p class="card-text">Inactive Shops</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscriptions Module -->
      <div v-else-if="activeModule === 'subscriptions'" class="module-content">
        <!-- Subscription Management Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2><i class="fas fa-credit-card me-2"></i>Subscription Management</h2>
          <div>
            <button class="btn btn-outline-primary me-2" @click="refreshSubscriptionData">
              <i class="fas fa-sync me-2" :class="{ 'fa-spin': loadingSubscriptions }"></i>Refresh
            </button>
            <button class="btn btn-primary" @click="goToAddPlan">
              <i class="fas fa-plus me-2"></i>Add Plan
            </button>
          </div>
        </div>

        <!-- Subscription Analytics Cards -->
        <div class="row mb-4">
          <div class="col-lg-3 col-md-6 mb-3">
            <div class="card analytics-card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="card-title mb-0">Total Plans</h6>
                    <h3 class="mb-0">{{ subscriptionPlans.length }}</h3>
                    <small>{{ activeSubscriptionPlans.length }} Active</small>
                  </div>
                  <div class="analytics-icon">
                    <i class="fas fa-layer-group fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-3">
            <div class="card analytics-card bg-success text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="card-title mb-0">Active Subscriptions</h6>
                    <h3 class="mb-0">{{ totalActiveSubscriptions }}</h3>
                    <small>{{ totalTrialSubscriptions }} Trial</small>
                  </div>
                  <div class="analytics-icon">
                    <i class="fas fa-users fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-3">
            <div class="card analytics-card bg-info text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="card-title mb-0">Monthly Revenue</h6>
                    <h3 class="mb-0">${{ totalMonthlyRevenue.toLocaleString() }}</h3>
                    <small>Estimated</small>
                  </div>
                  <div class="analytics-icon">
                    <i class="fas fa-dollar-sign fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-3">
            <div class="card analytics-card bg-warning text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="card-title mb-0">Popular Plan</h6>
                    <h6 class="mb-0">{{ mostPopularPlan?.name || 'N/A' }}</h6>
                    <small>{{ mostPopularPlan?.subscriberCount || 0 }} subscribers</small>
                  </div>
                  <div class="analytics-icon">
                    <i class="fas fa-star fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <ul class="nav nav-tabs mb-4" id="subscriptionTabs">
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ 'active': activeSubscriptionTab === 'plans' }"
              @click="activeSubscriptionTab = 'plans'"
            >
              <i class="fas fa-layer-group me-2"></i>Subscription Plans
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ 'active': activeSubscriptionTab === 'subscriptions' }"
              @click="activeSubscriptionTab = 'subscriptions'"
            >
              <i class="fas fa-users me-2"></i>User Subscriptions
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ 'active': activeSubscriptionTab === 'transactions' }"
              @click="activeSubscriptionTab = 'transactions'"
            >
              <i class="fas fa-credit-card me-2"></i>Transaction Management
            </button>
          </li>
        </ul>

        <!-- Plans Tab -->
        <div v-if="activeSubscriptionTab === 'plans'">
          <div v-if="loadingSubscriptions" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading subscription plans...</p>
          </div>

          <div v-else-if="subscriptionPlans.length === 0" class="text-center py-5">
            <i class="fas fa-layer-group fa-3x text-muted mb-3"></i>
            <h4>No Subscription Plans</h4>
            <p class="text-muted">Create your first subscription plan to get started</p>
            <button class="btn btn-primary" @click="goToAddPlan">
              <i class="fas fa-plus me-2"></i>Create Plan
            </button>
          </div>

          <div v-else class="row">
            <div v-for="plan in subscriptionPlans" :key="plan._id" class="col-lg-4 col-md-6 mb-4">
              <div class="card plan-card h-100" :class="{ 'border-warning': plan.isPopular, 'opacity-50': !plan.isActive }">
                <div class="card-header d-flex justify-content-between align-items-center" :class="plan.isPopular ? 'bg-warning' : 'bg-light'">
                  <div>
                    <h5 class="mb-0" :class="plan.isPopular ? 'text-white' : ''">{{ plan.name }}</h5>
                    <div class="mt-1">
                      <span v-if="plan.isPopular" class="badge bg-white text-warning">
                        <i class="fas fa-star me-1"></i>Popular
                      </span>
                      <span :class="['badge', plan.isActive ? 'bg-success' : 'bg-secondary']">
                        {{ plan.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="goToEditPlan(plan._id)">
                        <i class="fas fa-edit me-2"></i>Edit Plan
                      </a></li>
                      <li><a class="dropdown-item" @click="duplicatePlan(plan)">
                        <i class="fas fa-copy me-2"></i>Duplicate Plan
                      </a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" @click="confirmDeletePlan(plan)">
                        <i class="fas fa-trash me-2"></i>Delete Plan
                      </a></li>
                    </ul>
                  </div>
                </div>
                <div class="card-body">
                  <div class="pricing-display mb-3">
                    <h2 class="price-amount mb-0">{{ formatPrice(plan.price, plan.currency) }}</h2>
                    <small class="text-muted">{{ formatBillingCycle(plan.billingCycle) }}</small>
                    <div class="monthly-equivalent" v-if="plan.billingCycle !== 'monthly'">
                      <small class="text-info">
                        {{ formatPrice(calculateMonthlyEquivalent(plan.price, plan.billingCycle), plan.currency) }}/month
                      </small>
                    </div>
                  </div>
                  
                  <p class="card-text text-muted">{{ plan.description }}</p>
                  
                  <!-- Features -->
                  <div class="features-list mb-3" v-if="plan.features && plan.features.length > 0">
                    <h6 class="mb-2">Features:</h6>
                    <ul class="list-unstyled">
                      <li v-for="(feature, index) in plan.features.slice(0, 3)" :key="index" class="mb-1">
                        <i :class="feature.included ? 'fas fa-check text-success' : 'fas fa-times text-danger'" class="me-2"></i>
                        <span :class="{ 'text-muted': !feature.included }">
                          {{ feature.name }}
                          <span v-if="feature.limit" class="badge bg-info ms-1">{{ feature.limit }}</span>
                        </span>
                      </li>
                      <li v-if="plan.features.length > 3" class="mb-1 text-muted">
                        <i class="fas fa-plus me-2"></i>{{ plan.features.length - 3 }} more features...
                      </li>
                    </ul>
                  </div>

                  <!-- Limitations -->
                  <div class="limitations mb-3" v-if="plan.limitations">
                    <h6 class="mb-2">Limits:</h6>
                    <div class="row text-small">
                      <div class="col-6">
                        <div class="mb-1">
                          <strong>Shops:</strong> {{ plan.limitations.maxShops || 'Unlimited' }}
                        </div>
                        <div class="mb-1">
                          <strong>Users:</strong> {{ plan.limitations.maxUsers || 'Unlimited' }}
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-1">
                          <strong>Storage:</strong> {{ plan.limitations.maxStorage ? `${plan.limitations.maxStorage}GB` : 'Unlimited' }}
                        </div>
                        <div class="mb-1">
                          <strong>Customers:</strong> {{ plan.limitations.maxCustomers || 'Unlimited' }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Plan Stats -->
                  <div class="plan-stats">
                    <div class="row text-center">
                      <div class="col-6">
                        <div class="stat-item">
                          <strong class="text-primary">{{ plan.subscriberCount || 0 }}</strong>
                          <small class="d-block text-muted">Subscribers</small>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="stat-item">
                          <strong class="text-success">{{ plan.trialDays || 0 }}</strong>
                          <small class="d-block text-muted">Trial Days</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-primary btn-sm" @click="goToEditPlan(plan._id)">
                      <i class="fas fa-edit me-1"></i>Edit
                    </button>
                    <button class="btn btn-outline-info btn-sm" @click="viewPlanSubscriptions(plan._id)">
                      <i class="fas fa-users me-1"></i>Subscribers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Subscriptions Tab -->
        <div v-else-if="activeSubscriptionTab === 'subscriptions'">
          <!-- Filters -->
          <div class="card mb-4">
            <div class="card-body">
              <h6 class="card-title">
                <i class="fas fa-filter me-2"></i>Filter Subscriptions
              </h6>
              <div class="row">
                <div class="col-md-3">
                  <label class="form-label">Status</label>
                  <select class="form-select" v-model="subscriptionFilters.status" @change="loadUserSubscriptions">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="inactive">Inactive</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="expired">Expired</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Shop ID</label>
                  <input 
                    type="text" 
                    class="form-control"
                    v-model="subscriptionFilters.shopId"
                    placeholder="Filter by shop ID"
                    @input="debounceLoadSubscriptions"
                  >
                </div>
                <div class="col-md-3">
                  <label class="form-label">User ID</label>
                  <input 
                    type="text" 
                    class="form-control"
                    v-model="subscriptionFilters.userId"
                    placeholder="Filter by user ID"
                    @input="debounceLoadSubscriptions"
                  >
                </div>
                <div class="col-md-3">
                  <label class="form-label">Actions</label>
                  <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary btn-sm" @click="clearSubscriptionFilters">
                      <i class="fas fa-times me-1"></i>Clear
                    </button>
                    <button class="btn btn-primary btn-sm" @click="exportSubscriptions">
                      <i class="fas fa-download me-1"></i>Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="loadingUserSubscriptions" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading user subscriptions...</p>
          </div>

          <div v-else-if="userSubscriptions.length === 0" class="text-center py-5">
            <i class="fas fa-users fa-3x text-muted mb-3"></i>
            <h4>No Subscriptions Found</h4>
            <p class="text-muted">{{ hasSubscriptionFilters ? 'No subscriptions match your filters' : 'No user subscriptions available' }}</p>
            <button v-if="hasSubscriptionFilters" class="btn btn-outline-primary" @click="clearSubscriptionFilters">
              Clear Filters
            </button>
          </div>

          <div v-else>
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">User Subscriptions ({{ userSubscriptions.length }})</h6>
                <div class="d-flex gap-2">
                  <small class="text-muted">Last updated: {{ lastSubscriptionUpdate }}</small>
                </div>
              </div>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover mb-0">
                    <thead class="table-light">
                      <tr>
                        <th>User</th>
                        <th>Shop</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Current Period</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="subscription in userSubscriptions" :key="subscription._id">
                        <td>
                          <div class="user-info">
                            <strong>{{ subscription.userId?.firstName }} {{ subscription.userId?.lastName }}</strong>
                            <br>
                            <small class="text-muted">{{ subscription.userId?.email }}</small>
                          </div>
                        </td>
                        <td>
                          <div class="shop-info">
                            <strong>{{ subscription.shopId?.name }}</strong>
                            <br>
                            <small class="text-muted">{{ subscription.shopId?.email }}</small>
                          </div>
                        </td>
                        <td>
                          <div class="plan-info">
                            <strong>{{ subscription.planId?.name }}</strong>
                            <br>
                            <small class="text-muted">{{ formatPrice(subscription.planId?.price, subscription.planId?.currency) }}/{{ subscription.planId?.billingCycle }}</small>
                          </div>
                        </td>
                        <td>
                          <span :class="['badge', `bg-${formatSubscriptionStatus(subscription.status).class}`]">
                            <i :class="formatSubscriptionStatus(subscription.status).icon" class="me-1"></i>
                            {{ formatSubscriptionStatus(subscription.status).label }}
                          </span>
                          <div v-if="subscription.daysRemaining !== undefined" class="mt-1">
                            <small class="text-muted">
                              {{ subscription.daysRemaining }} days left
                            </small>
                          </div>
                        </td>
                        <td>
                          <div class="period-info">
                            <strong>{{ formatDate(subscription.currentPeriodStart) }}</strong>
                            <br>
                            <small class="text-muted">to {{ formatDate(subscription.currentPeriodEnd) }}</small>
                          </div>
                        </td>
                        <td>
                          <div class="revenue-info">
                            <strong class="text-success">{{ formatPrice(subscription.planId?.price || 0, subscription.planId?.currency) }}</strong>
                            <br>
                            <small class="text-muted">{{ subscription.paymentHistory?.length || 0 }} payments</small>
                          </div>
                        </td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" @click="viewSubscriptionDetails(subscription)">
                                <i class="fas fa-eye me-2"></i>View Details
                              </a></li>
                              <li><a class="dropdown-item" @click="viewPaymentHistory(subscription)">
                                <i class="fas fa-history me-2"></i>Payment History
                              </a></li>
                              <li v-if="subscription.status === 'active'"><a class="dropdown-item text-warning" @click="pauseSubscription(subscription)">
                                <i class="fas fa-pause me-2"></i>Pause Subscription
                              </a></li>
                              <li v-if="subscription.status === 'inactive'"><a class="dropdown-item text-success" @click="resumeSubscription(subscription)">
                                <i class="fas fa-play me-2"></i>Resume Subscription
                              </a></li>
                              <li><hr class="dropdown-divider"></li>
                              <li><a class="dropdown-item text-danger" @click="cancelSubscription(subscription)">
                                <i class="fas fa-ban me-2"></i>Cancel Subscription
                              </a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction Management Tab -->
        <div v-else-if="activeSubscriptionTab === 'transactions'">
          <TransactionManagement />
        </div>
      </div>
    </div>
  </div>

  <!-- Create Admin Modal -->
  <div class="modal fade" :class="{ 'show d-block': showCreateAdminForm }" v-if="showCreateAdminForm" @click.self="showCreateAdminForm = false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-custom">
        <div class="modal-header bg-custom-header border-0">
          <h5 class="modal-title">
            <i class="fas fa-user-plus me-2"></i>Create New Admin
          </h5>
          <button type="button" class="btn-close" @click="showCreateAdminForm = false"></button>
        </div>
        <form @submit.prevent="createAdmin">
          <div class="modal-body bg-custom-cell">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Username *</label>
                  <input 
                    type="text" 
                    class="form-control"
                    v-model="createAdminForm.username"
                    placeholder="Enter username"
                    required
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email *</label>
                  <input 
                    type="email" 
                    class="form-control"
                    v-model="createAdminForm.email"
                    placeholder="Enter email"
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
                    v-model="createAdminForm.firstName"
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
                    v-model="createAdminForm.lastName"
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
                    v-model="createAdminForm.password"
                    placeholder="Enter password (min 6 characters)"
                    required
                    minlength="6"
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    class="form-control"
                    v-model="createAdminForm.phoneNumber"
                    placeholder="Enter phone number (optional)"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-secondary" @click="showCreateAdminForm = false" :disabled="isSubmittingAdmin">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmittingAdmin">
              <span v-if="isSubmittingAdmin" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="fas fa-plus me-2"></i>
              {{ isSubmittingAdmin ? 'Creating...' : 'Create Admin' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Edit Admin Modal -->
  <div class="modal fade" :class="{ 'show d-block': showEditAdminForm }" v-if="showEditAdminForm" @click.self="showEditAdminForm = false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-custom">
        <div class="modal-header bg-custom-header border-0">
          <h5 class="modal-title">
            <i class="fas fa-edit me-2"></i>Edit Admin
            <span v-if="selectedAdmin" class="text-muted ms-2">({{ selectedAdmin.username }})</span>
          </h5>
          <button type="button" class="btn-close" @click="showEditAdminForm = false"></button>
        </div>
        <form @submit.prevent="updateAdmin">
          <div class="modal-body bg-custom-cell">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Username *</label>
                  <input 
                    type="text" 
                    class="form-control"
                    v-model="editAdminForm.username"
                    placeholder="Enter username"
                    required
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email *</label>
                  <input 
                    type="email" 
                    class="form-control"
                    v-model="editAdminForm.email"
                    placeholder="Enter email"
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
                    v-model="editAdminForm.firstName"
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
                    v-model="editAdminForm.lastName"
                    placeholder="Enter last name"
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
                v-model="editAdminForm.phoneNumber"
                placeholder="Enter phone number (optional)"
              >
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-secondary" @click="showEditAdminForm = false" :disabled="isSubmittingAdmin">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmittingAdmin">
              <span v-if="isSubmittingAdmin" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="fas fa-save me-2"></i>
              {{ isSubmittingAdmin ? 'Updating...' : 'Update Admin' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Reset Password Modal -->
  <div class="modal fade" :class="{ 'show d-block': showResetPasswordForm }" v-if="showResetPasswordForm" @click.self="showResetPasswordForm = false">
    <div class="modal-dialog">
      <div class="modal-content border-custom">
        <div class="modal-header bg-custom-header border-0">
          <h5 class="modal-title">
            <i class="fas fa-key me-2"></i>Reset Admin Password
            <span v-if="selectedAdmin" class="text-muted ms-2">({{ selectedAdmin.username }})</span>
          </h5>
          <button type="button" class="btn-close" @click="showResetPasswordForm = false"></button>
        </div>
        <form @submit.prevent="resetAdminPassword">
          <div class="modal-body bg-custom-cell">
            <div class="mb-3">
              <label class="form-label">New Password *</label>
              <input 
                type="password" 
                class="form-control"
                v-model="resetPasswordForm.newPassword"
                placeholder="Enter new password (min 6 characters)"
                required
                minlength="6"
              >
            </div>
            <div class="mb-3">
              <label class="form-label">Confirm Password *</label>
              <input 
                type="password" 
                class="form-control"
                v-model="resetPasswordForm.confirmPassword"
                placeholder="Confirm new password"
                required
              >
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-secondary" @click="showResetPasswordForm = false" :disabled="isSubmittingAdmin">
              Cancel
            </button>
            <button type="submit" class="btn btn-warning" :disabled="isSubmittingAdmin">
              <span v-if="isSubmittingAdmin" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="fas fa-key me-2"></i>
              {{ isSubmittingAdmin ? 'Resetting...' : 'Reset Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Backdrops -->
  <div v-if="showCreateAdminForm || showEditAdminForm || showResetPasswordForm" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showErrorToast } from '../../toster';
import { shopService } from '../services/shopService';
import { profileService } from '../services/profileService';
import { adminService } from '../services/adminService';
import subscriptionService from '../services/subscriptionService';
import TransactionManagement from '../../components/TransactionManagement.vue';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const router = useRouter();
const userData = ref(null);
const shops = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');
const itemsPerPage = ref(10);
const activeModule = ref('shopManagement');
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1
});

// Profile management variables
const profileForm = ref({
  firstName: '',
  lastName: '',
  phoneNumber: ''
});
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const isUpdatingProfile = ref(false);
const isChangingPassword = ref(false);
const showPasswordForm = ref(false);
const showAdminList = ref(false);

// Admin management variables
const admins = ref([]);
const adminStats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  recentLogins: 0,
  createdThisMonth: 0
});
const adminPagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1
});
const adminSearchQuery = ref('');
const adminStatusFilter = ref('');
const isLoadingAdmins = ref(false);
const showCreateAdminForm = ref(false);
const showEditAdminForm = ref(false);
const showResetPasswordForm = ref(false);
const selectedAdmin = ref(null);

const createAdminForm = ref({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
});

const editAdminForm = ref({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
});

const resetPasswordForm = ref({
  newPassword: '',
  confirmPassword: ''
});

const isSubmittingAdmin = ref(false);

// Subscription management variables
const subscriptionPlans = ref([]);
const userSubscriptions = ref([]);
const activeSubscriptionTab = ref('plans');
const loadingSubscriptions = ref(false);
const loadingUserSubscriptions = ref(false);
const subscriptionFilters = ref({
  status: '',
  shopId: '',
  userId: ''
});
const lastSubscriptionUpdate = ref('');
let subscriptionFilterTimeout = null;

// Computed properties for analytics
const activeShopsCount = computed(() => {
  return shops.value.filter(shop => shop.active).length;
});

const inactiveShopsCount = computed(() => {
  return shops.value.filter(shop => !shop.active).length;
});

// Subscription computed properties
const activeSubscriptionPlans = computed(() => {
  return subscriptionPlans.value.filter(plan => plan.isActive);
});

const totalActiveSubscriptions = computed(() => {
  return userSubscriptions.value.filter(sub => sub.status === 'active').length;
});

const totalTrialSubscriptions = computed(() => {
  return userSubscriptions.value.filter(sub => sub.status === 'trial').length;
});

const totalMonthlyRevenue = computed(() => {
  return subscriptionPlans.value.reduce((total, plan) => {
    const monthlyPrice = subscriptionService.constructor.calculateMonthlyEquivalent(plan.price, plan.billingCycle);
    return total + (monthlyPrice * (plan.subscriberCount || 0));
  }, 0);
});

const mostPopularPlan = computed(() => {
  return subscriptionPlans.value.reduce((most, plan) => {
    return (!most || (plan.subscriberCount || 0) > (most.subscriberCount || 0)) ? plan : most;
  }, null);
});

const hasSubscriptionFilters = computed(() => {
  return subscriptionFilters.value.status || subscriptionFilters.value.shopId || subscriptionFilters.value.userId;
});

onMounted(() => {
  // Debug localStorage tokens
  console.log('=== SuperAdminDashboard onMounted Debug ===');
  console.log('superAdminToken:', localStorage.getItem('superAdminToken'));
  console.log('superAdminData:', localStorage.getItem('superAdminData'));
  console.log('All localStorage keys:', Object.keys(localStorage));
  console.log('==========================================');
  
  const superAdminData = localStorage.getItem('superAdminData');
  if (!superAdminData) {
    router.push('/cmx-super/login');
    return;
  }
  userData.value = JSON.parse(superAdminData);
  
  // Initialize profile form with current user data
  if (userData.value) {
    profileForm.value = {
      firstName: userData.value.firstName || '',
      lastName: userData.value.lastName || '',
      phoneNumber: userData.value.phoneNumber || ''
    };
  }
  
  loadShops();
  loadAdminStats(); // Load admin statistics for dashboard cards
  
  // Load admin list for settings module
  loadAdmins();
});

const loadShops = async (params = {}) => {
  isLoading.value = true;
  try {
    const apiParams = {
      page: params.page || pagination.value.page,
      limit: params.limit || itemsPerPage.value,
      ...params
    };

    if (statusFilter.value) {
      apiParams.status = statusFilter.value;
    }
    if (searchQuery.value) {
      apiParams.search = searchQuery.value;
    }

    // Try to load from API first
    const response = await shopService.getShops(apiParams);
    
    // Transform API response to match component expectations
    if (response && response.success && response.data && response.data.shops) {
      shops.value = response.data.shops.map(shop => ({
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
      }));
      
      // Update pagination info
      if (response.data.pagination) {
        pagination.value = {
          ...response.data.pagination
        };
      }
      
      console.log('Shops loaded successfully:', shops.value.length, 'shops');
    } else {
      // If response format is different, handle it
      console.warn('Unexpected API response format:', response);
      shops.value = [];
    }
    
  } catch (error) {
    console.error('Error loading shops:', error);
    
    if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.');
      handleLogout();
    } else {
      showErrorToast('Error loading shops. Please try again.');
      
      // Always fallback to mock data for development when API is not available
      shops.value = [
        {
          id: 'S00001',
          name: 'CMX Collision and Glass Corporation',
          city: 'Chicago',
          state: 'IL',
          adminName: 'Steve Kurt',
          active: true,
          email: 'contact@cmx.com',
          phone: '3125555555',
          address: '1234 Main St',
          website: 'CollisionMateX.com',
          zipCode: '60647',
          country: 'USA',
          adminEmail: 'admin@cmx.com',
          adminPhone: '312-555-5555',
          timeZone: 'America/Chicago',
          dateFormat: 'MM/DD/YYYY',
          timeFormat: 'HH:MM AM/PM'
        },
        {
          id: 'S00002',
          name: 'AutoFix Collision Center',
          city: 'New York',
          state: 'NY',
          adminName: 'John Smith',
          active: true,
          email: 'info@autofix.com',
          phone: '2125555555',
          address: '456 Broadway',
          zipCode: '10001',
          country: 'USA',
          adminEmail: 'john@autofix.com',
          adminPhone: '212-555-5556'
        },
        {
          id: 'S00003',
          name: 'Elite Body Shop',
          city: 'Los Angeles',
          state: 'CA',
          adminName: 'Maria Garcia',
          active: false,
          email: 'contact@elitebody.com',
          phone: '3235555555',
          address: '789 Sunset Blvd',
          zipCode: '90028',
          country: 'USA',
          adminEmail: 'maria@elitebody.com',
          adminPhone: '323-555-5557'
        }
      ];
    }
  } finally {
    isLoading.value = false;
  }
};

let searchTimeout = null;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1; // Reset to first page when searching
    loadShops();
  }, 500); // Debounce search by 500ms
};

const applyFilters = () => {
  pagination.value.page = 1; // Reset to first page when filtering
  loadShops();
};

const refreshShops = () => {
  loadShops();
};

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.page = page;
    loadShops({ page });
  }
};

const getVisiblePages = () => {
  const total = pagination.value.totalPages;
  const current = pagination.value.page;
  const pages = [];
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Show first, last, current, and surrounding pages
    pages.push(1);
    
    if (current > 3) {
      pages.push('...');
    }
    
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    if (current < total - 2) {
      pages.push('...');
    }
    
    if (!pages.includes(total)) {
      pages.push(total);
    }
  }
  
  return pages.filter(page => page !== '...' || true); // Keep ellipsis
};

const goToAddShop = () => {
  router.push('/cmx-super/add-shop');
};

const editShop = (shop) => {
  // Navigate to edit page with shop ID
  console.log('Edit shop:', shop);
  router.push(`/cmx-super/edit-shop/${shop.id}`);
};

const viewShop = (shop) => {
  // Navigate to view page with shop ID
  console.log('View shop:', shop);
  router.push(`/cmx-super/view-shop/${shop.id}`);
};

const toggleShopStatus = async (shop) => {
  try {
    const newStatus = shop.active ? 'inactive' : 'active';
    // Use the actual shop ID from the API response (_id)
    const shopId = shop.id.startsWith('S') ? shop.id : shop.id;
    
    await shopService.toggleShopStatus(shopId, newStatus);
    
    // Update the local state
    shop.active = !shop.active;
    showSuccessToast(`Shop ${shop.active ? 'activated' : 'deactivated'} successfully`);
    
    // Optionally reload the shops to get the latest data
    // loadShops();
  } catch (error) {
    console.error('Error updating shop status:', error);
    if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.');
      handleLogout();
    } else if (error.response && error.response.status === 404) {
      showErrorToast('Shop not found');
    } else {
      showErrorToast('Error updating shop status');
    }
  }
};

// Helper function to format image URLs with base URL
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === 'N/A') return null;
  
  // If the path is already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If the path starts with '/', remove it to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  return `${API_BASE_URL}/${cleanPath}`;
};

const handleLogout = () => {
  localStorage.removeItem('superAdminToken');
  localStorage.removeItem('superAdminData');
  router.push('/cmx-super/login');
};

// Profile management functions
const updateProfile = async () => {
  if (!profileForm.value.firstName || !profileForm.value.lastName) {
    showErrorToast('Please fill in all required fields');
    return;
  }

  isUpdatingProfile.value = true;
  try {
    const response = await profileService.updateProfile(profileForm.value);
    
    // Update local userData
    userData.value = {
      ...userData.value,
      firstName: profileForm.value.firstName,
      lastName: profileForm.value.lastName,
      phoneNumber: profileForm.value.phoneNumber
    };
    
    // Update localStorage
    localStorage.setItem('superAdminData', JSON.stringify(userData.value));
    
    showSuccessToast('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.');
      handleLogout();
    } else {
      showErrorToast(error.response?.data?.message || 'Error updating profile');
    }
  } finally {
    isUpdatingProfile.value = false;
  }
};

const changePassword = async () => {
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
    showErrorToast('Please fill in all password fields');
    return;
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showErrorToast('New passwords do not match');
    return;
  }

  if (passwordForm.value.newPassword.length < 6) {
    showErrorToast('New password must be at least 6 characters long');
    return;
  }

  isChangingPassword.value = true;
  try {
    await profileService.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    });

    // Clear password form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    showPasswordForm.value = false;
    
    showSuccessToast('Password changed successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.');
      handleLogout();
    } else if (error.response && error.response.status === 400) {
      showErrorToast('Current password is incorrect');
    } else {
      showErrorToast(error.response?.data?.message || 'Error changing password');
    }
  } finally {
    isChangingPassword.value = false;
  }
};

const togglePasswordForm = () => {
  showPasswordForm.value = !showPasswordForm.value;
  if (!showPasswordForm.value) {
    // Clear form when hiding
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
};

// Navigation functions for admin pages
const goToAddAdmin = () => {
  router.push('/cmx-super/add-admin');
};

const goToEditAdmin = (admin) => {
  router.push(`/cmx-super/edit-admin/${admin._id}`);
};

// Admin Management Functions
const loadAdmins = async (params = {}) => {
  isLoadingAdmins.value = true;
  try {
    const apiParams = {
      page: params.page || adminPagination.value.page,
      limit: params.limit || 10,
      ...params
    };

    if (adminStatusFilter.value) {
      apiParams.status = adminStatusFilter.value;
    }
    if (adminSearchQuery.value) {
      apiParams.search = adminSearchQuery.value;
    }

    const response = await adminService.getAdmins(apiParams);
    
    if (response && response.success) {
      // Handle both direct array response and nested data response
      if (Array.isArray(response.data)) {
        admins.value = response.data;
      } else if (response.data && response.data.admins) {
        admins.value = response.data.admins;
        if (response.data.pagination) {
          adminPagination.value = response.data.pagination;
        }
      } else {
        admins.value = [];
      }
      
      // Auto-expand admin list if there are admins and it's not already shown
      if (admins.value.length > 0 && !showAdminList.value) {
        showAdminList.value = true;
      }
    }
  } catch (error) {
    console.error('Error loading admins:', error);
    if (error.response && error.response.status === 401) {
      showErrorToast('Session expired. Please login again.');
      handleLogout();
    } else {
      // Mock data for development
      admins.value = [
        {
          _id: '1',
          username: 'admin_user1',
          email: 'admin1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '+1234567890',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          username: 'admin_user2',
          email: 'admin2@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          phoneNumber: '+1234567891',
          isActive: false,
          lastLogin: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          createdAt: new Date(Date.now() - 604800000).toISOString() // 1 week ago
        },
        {
          _id: '3',
          username: 'admin_user3',
          email: 'admin3@example.com',
          firstName: 'Mike',
          lastName: 'Johnson',
          phoneNumber: '+1234567892',
          isActive: true,
          lastLogin: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          createdAt: new Date(Date.now() - 2592000000).toISOString() // 30 days ago
        }
      ];
      
      // Auto-expand the admin list when there's data
      showAdminList.value = true;
    }
  } finally {
    isLoadingAdmins.value = false;
  }
};

const loadAdminStats = async () => {
  try {
    const response = await adminService.getAdminStats();
    if (response && response.success && response.data) {
      adminStats.value = response.data;
    }
  } catch (error) {
    console.error('Error loading admin stats:', error);
    // Mock stats for development
    adminStats.value = {
      total: 15,
      active: 12,
      inactive: 3,
      recentLogins: 8,
      createdThisMonth: 2
    };
  }
};

const createAdmin = async () => {
  if (!validateAdminForm(createAdminForm.value)) return;
  
  isSubmittingAdmin.value = true;
  try {
    const response = await adminService.createAdmin(createAdminForm.value);
    
    showSuccessToast('Admin created successfully');
    
    // Reset form and close modal
    createAdminForm.value = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    };
    showCreateAdminForm.value = false;
    
    // Reload admins list
    await loadAdmins();
    await loadAdminStats();
    
  } catch (error) {
    console.error('Error creating admin:', error);
    if (error.response && error.response.status === 400) {
      showErrorToast('Admin with this username or email already exists');
    } else if (error.response && error.response.status === 403) {
      showErrorToast('Access denied. Only super admins can create admins.');
    } else {
      showErrorToast('Error creating admin. Please try again.');
    }
  } finally {
    isSubmittingAdmin.value = false;
  }
};

const editAdmin = (admin) => {
  selectedAdmin.value = admin;
  editAdminForm.value = {
    username: admin.username,
    email: admin.email,
    firstName: admin.firstName,
    lastName: admin.lastName,
    phoneNumber: admin.phoneNumber || ''
  };
  showEditAdminForm.value = true;
};

const updateAdmin = async () => {
  if (!selectedAdmin.value || !validateEditAdminForm(editAdminForm.value)) return;
  
  isSubmittingAdmin.value = true;
  try {
    await adminService.updateAdmin(selectedAdmin.value._id, editAdminForm.value);
    
    showSuccessToast('Admin updated successfully');
    showEditAdminForm.value = false;
    selectedAdmin.value = null;
    
    await loadAdmins();
    
  } catch (error) {
    console.error('Error updating admin:', error);
    if (error.response && error.response.status === 400) {
      showErrorToast('Username or email already exists');
    } else {
      showErrorToast('Error updating admin. Please try again.');
    }
  } finally {
    isSubmittingAdmin.value = false;
  }
};

const toggleAdminStatus = async (admin) => {
  try {
    const newStatus = !admin.isActive;
    await adminService.toggleAdminStatus(admin._id, newStatus);
    
    admin.isActive = newStatus;
    showSuccessToast(`Admin ${newStatus ? 'activated' : 'deactivated'} successfully`);
    
    await loadAdminStats();
    
  } catch (error) {
    console.error('Error toggling admin status:', error);
    showErrorToast('Error updating admin status');
  }
};

const openResetPasswordForm = (admin) => {
  selectedAdmin.value = admin;
  resetPasswordForm.value = {
    newPassword: '',
    confirmPassword: ''
  };
  showResetPasswordForm.value = true;
};

const resetAdminPassword = async () => {
  if (!selectedAdmin.value || !validateResetPasswordForm()) return;
  
  isSubmittingAdmin.value = true;
  try {
    await adminService.resetAdminPassword(selectedAdmin.value._id, resetPasswordForm.value.newPassword);
    
    showSuccessToast('Admin password reset successfully');
    showResetPasswordForm.value = false;
    selectedAdmin.value = null;
    
  } catch (error) {
    console.error('Error resetting admin password:', error);
    showErrorToast('Error resetting admin password');
  } finally {
    isSubmittingAdmin.value = false;
  }
};

const deleteAdmin = async (admin) => {
  if (!confirm(`Are you sure you want to delete admin "${admin.username}"? This will deactivate the admin account.`)) {
    return;
  }
  
  try {
    await adminService.deleteAdmin(admin._id);
    
    showSuccessToast('Admin deleted successfully');
    await loadAdmins();
    await loadAdminStats();
    
  } catch (error) {
    console.error('Error deleting admin:', error);
    showErrorToast('Error deleting admin');
  }
};

// Validation functions
const validateAdminForm = (form) => {
  if (!form.username?.trim()) {
    showErrorToast('Username is required');
    return false;
  }
  if (!form.email?.trim()) {
    showErrorToast('Email is required');
    return false;
  }
  if (!form.password?.trim()) {
    showErrorToast('Password is required');
    return false;
  }
  if (form.password.length < 6) {
    showErrorToast('Password must be at least 6 characters');
    return false;
  }
  if (!form.firstName?.trim()) {
    showErrorToast('First name is required');
    return false;
  }
  if (!form.lastName?.trim()) {
    showErrorToast('Last name is required');
    return false;
  }
  return true;
};

const validateEditAdminForm = (form) => {
  if (!form.username?.trim()) {
    showErrorToast('Username is required');
    return false;
  }
  if (!form.email?.trim()) {
    showErrorToast('Email is required');
    return false;
  }
  if (!form.firstName?.trim()) {
    showErrorToast('First name is required');
    return false;
  }
  if (!form.lastName?.trim()) {
    showErrorToast('Last name is required');
    return false;
  }
  return true;
};

const validateResetPasswordForm = () => {
  if (!resetPasswordForm.value.newPassword?.trim()) {
    showErrorToast('New password is required');
    return false;
  }
  if (resetPasswordForm.value.newPassword.length < 6) {
    showErrorToast('Password must be at least 6 characters');
    return false;
  }
  if (resetPasswordForm.value.newPassword !== resetPasswordForm.value.confirmPassword) {
    showErrorToast('Passwords do not match');
    return false;
  }
  return true;
};

// Admin search and pagination
let adminSearchTimeout = null;
const handleAdminSearch = () => {
  clearTimeout(adminSearchTimeout);
  adminSearchTimeout = setTimeout(() => {
    adminPagination.value.page = 1;
    loadAdmins();
  }, 500);
};

const applyAdminFilters = () => {
  adminPagination.value.page = 1;
  loadAdmins();
};

const changeAdminPage = (page) => {
  if (page >= 1 && page <= adminPagination.value.totalPages) {
    adminPagination.value.page = page;
    loadAdmins({ page });
  }
};

const getAdminVisiblePages = () => {
  const total = adminPagination.value.totalPages;
  const current = adminPagination.value.page;
  const pages = [];
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (current > 3) {
      pages.push('...');
    }
    
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    if (current < total - 2) {
      pages.push('...');
    }
    
    if (!pages.includes(total)) {
      pages.push(total);
    }
  }
  
  return pages.filter(page => page !== '...' || true);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ============= SUBSCRIPTION MANAGEMENT FUNCTIONS =============

// Load subscription plans from API
const loadSubscriptionPlans = async () => {
  loadingSubscriptions.value = true;
  try {
    const response = await subscriptionService.getPlans();
    
    if (response && response.success && response.data) {
      subscriptionPlans.value = response.data;
      lastSubscriptionUpdate.value = new Date().toLocaleString();
    } else {
      throw new Error('Failed to load plans');
    }
  } catch (error) {
    console.error('Error loading subscription plans:', error);
    
    // Fallback to mock data for development
    subscriptionPlans.value = [
      {
        _id: '66db1234567890abcdef1234',
        name: 'Basic Plan',
        description: 'Perfect for small businesses getting started',
        price: 29.99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: [
          {
            name: 'Up to 3 Shops',
            description: 'Manage up to 3 shops',
            included: true,
            limit: 3
          },
          {
            name: 'Basic Support',
            description: 'Email support during business hours',
            included: true,
            limit: null
          },
          {
            name: 'Basic Analytics',
            description: 'Simple reporting and analytics',
            included: true,
            limit: null
          }
        ],
        limitations: {
          maxShops: 3,
          maxUsers: 10,
          maxStorage: 50,
          maxCustomers: 1000
        },
        isActive: true,
        isPopular: false,
        sortOrder: 1,
        trialDays: 7,
        subscriberCount: 45,
        createdAt: new Date(Date.now() - 2592000000).toISOString()
      },
      {
        _id: '66db1234567890abcdef1237',
        name: 'Professional Plan',
        description: 'Perfect for growing businesses with advanced features',
        price: 79.99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: [
          {
            name: 'Unlimited Shops',
            description: 'Create and manage unlimited shops',
            included: true,
            limit: null
          },
          {
            name: 'Priority Support',
            description: '24/7 priority customer support',
            included: true,
            limit: null
          },
          {
            name: 'Advanced Analytics',
            description: 'Detailed business insights and reporting',
            included: true,
            limit: null
          },
          {
            name: 'API Access',
            description: 'Full API access for integrations',
            included: true,
            limit: 10000
          }
        ],
        limitations: {
          maxShops: null,
          maxUsers: 100,
          maxStorage: 500,
          maxCustomers: 10000
        },
        isActive: true,
        isPopular: true,
        sortOrder: 2,
        trialDays: 14,
        subscriberCount: 128,
        createdAt: new Date(Date.now() - 2592000000).toISOString()
      },
      {
        _id: '66db1234567890abcdef1240',
        name: 'Enterprise Plan',
        description: 'For large organizations with custom requirements',
        price: 299.99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: [
          {
            name: 'Everything in Professional',
            description: 'All professional features included',
            included: true,
            limit: null
          },
          {
            name: 'Custom Integrations',
            description: 'Custom API integrations and webhooks',
            included: true,
            limit: null
          },
          {
            name: 'Dedicated Account Manager',
            description: 'Personal account manager for enterprise support',
            included: true,
            limit: null
          }
        ],
        limitations: {
          maxShops: null,
          maxUsers: null,
          maxStorage: null,
          maxCustomers: null
        },
        isActive: true,
        isPopular: false,
        sortOrder: 3,
        trialDays: 30,
        subscriberCount: 23,
        createdAt: new Date(Date.now() - 2592000000).toISOString()
      }
    ];
    lastSubscriptionUpdate.value = new Date().toLocaleString();
    showErrorToast('Using mock subscription data for development');
  } finally {
    loadingSubscriptions.value = false;
  }
};

// Load user subscriptions from API
const loadUserSubscriptions = async () => {
  loadingUserSubscriptions.value = true;
  try {
    const response = await subscriptionService.getSubscriptions(subscriptionFilters.value);
    
    if (response && response.success && response.data) {
      userSubscriptions.value = response.data;
      lastSubscriptionUpdate.value = new Date().toLocaleString();
    } else {
      throw new Error('Failed to load subscriptions');
    }
  } catch (error) {
    console.error('Error loading user subscriptions:', error);
    
    // Fallback to mock data for development
    userSubscriptions.value = [
      {
        _id: '66db1234567890abcdef7000',
        userId: {
          _id: '66db1234567890abcdef6000',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        },
        shopId: {
          _id: '66db1234567890abcdef5000',
          name: "Joe's Auto Repair",
          email: 'contact@joesauto.com'
        },
        planId: {
          _id: '66db1234567890abcdef1237',
          name: 'Professional Plan',
          price: 79.99,
          currency: 'USD',
          billingCycle: 'monthly'
        },
        status: 'active',
        currentPeriodStart: new Date(Date.now() - 604800000).toISOString(),
        currentPeriodEnd: new Date(Date.now() + 2419200000).toISOString(),
        daysRemaining: 30,
        paymentHistory: [
          { date: new Date().toISOString(), amount: 79.99, status: 'success' },
          { date: new Date(Date.now() - 2592000000).toISOString(), amount: 79.99, status: 'success' }
        ]
      },
      {
        _id: '66db1234567890abcdef7003',
        userId: {
          _id: '66db1234567890abcdef6001',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com'
        },
        shopId: {
          _id: '66db1234567890abcdef5001',
          name: "Smith's Garage",
          email: 'info@smithsgarage.com'
        },
        planId: {
          _id: '66db1234567890abcdef1234',
          name: 'Basic Plan',
          price: 29.99,
          currency: 'USD',
          billingCycle: 'monthly'
        },
        status: 'trial',
        currentPeriodStart: new Date(Date.now() - 432000000).toISOString(),
        currentPeriodEnd: new Date(Date.now() + 172800000).toISOString(),
        daysRemaining: 2,
        paymentHistory: []
      }
    ];
    lastSubscriptionUpdate.value = new Date().toLocaleString();
    showErrorToast('Using mock subscription data for development');
  } finally {
    loadingUserSubscriptions.value = false;
  }
};

// Refresh all subscription data
const refreshSubscriptionData = async () => {
  await Promise.all([
    loadSubscriptionPlans(),
    loadUserSubscriptions()
  ]);
  showSuccessToast('Subscription data refreshed successfully');
};

// Navigation functions
const goToAddPlan = () => {
  router.push('/cmx-super/add-plan');
};

const goToEditPlan = (planId) => {
  router.push(`/cmx-super/edit-plan/${planId}`);
};

// Plan management functions
const duplicatePlan = async (originalPlan) => {
  try {
    const duplicatedPlan = {
      ...originalPlan,
      name: `${originalPlan.name} (Copy)`,
      isActive: false,
      isPopular: false,
      sortOrder: originalPlan.sortOrder + 1
    };
    
    delete duplicatedPlan._id;
    delete duplicatedPlan.subscriberCount;
    delete duplicatedPlan.createdAt;
    delete duplicatedPlan.updatedAt;
    
    const response = await subscriptionService.createPlan(duplicatedPlan);
    
    if (response && response.success) {
      showSuccessToast('Plan duplicated successfully');
      await loadSubscriptionPlans();
    } else {
      throw new Error('Failed to duplicate plan');
    }
  } catch (error) {
    console.error('Error duplicating plan:', error);
    showErrorToast(subscriptionService.constructor.getErrorMessage(error));
  }
};

const confirmDeletePlan = async (plan) => {
  if (confirm(`Are you sure you want to delete the plan "${plan.name}"? This action cannot be undone and will affect existing subscriptions.`)) {
    await deletePlan(plan._id);
  }
};

const deletePlan = async (planId) => {
  try {
    const response = await subscriptionService.deletePlan(planId);
    
    if (response && response.success) {
      showSuccessToast('Plan deleted successfully');
      await loadSubscriptionPlans();
    } else {
      throw new Error('Failed to delete plan');
    }
  } catch (error) {
    console.error('Error deleting plan:', error);
    showErrorToast(subscriptionService.constructor.getErrorMessage(error));
  }
};

// Subscription management functions
const viewPlanSubscriptions = (planId) => {
  activeSubscriptionTab.value = 'subscriptions';
  subscriptionFilters.value = {
    status: '',
    shopId: '',
    userId: ''
  };
  // Note: API doesn't support planId filter, so we'll show all and let user filter manually
  loadUserSubscriptions();
};

const viewSubscriptionDetails = (subscription) => {
  // Could open a modal or navigate to a detailed view
  console.log('View subscription details:', subscription);
  showSuccessToast('Subscription details feature coming soon');
};

const viewPaymentHistory = (subscription) => {
  // Could open a modal showing payment history
  console.log('View payment history:', subscription);
  showSuccessToast('Payment history feature coming soon');
};

const pauseSubscription = async (subscription) => {
  if (confirm(`Are you sure you want to pause the subscription for ${subscription.userId?.firstName} ${subscription.userId?.lastName}?`)) {
    try {
      // API call would go here
      showSuccessToast('Subscription paused successfully');
      await loadUserSubscriptions();
    } catch (error) {
      console.error('Error pausing subscription:', error);
      showErrorToast('Error pausing subscription');
    }
  }
};

const resumeSubscription = async (subscription) => {
  try {
    // API call would go here
    showSuccessToast('Subscription resumed successfully');
    await loadUserSubscriptions();
  } catch (error) {
    console.error('Error resuming subscription:', error);
    showErrorToast('Error resuming subscription');
  }
};

const cancelSubscription = async (subscription) => {
  if (confirm(`Are you sure you want to cancel the subscription for ${subscription.userId?.firstName} ${subscription.userId?.lastName}? This action cannot be undone.`)) {
    try {
      // API call would go here
      showSuccessToast('Subscription cancelled successfully');
      await loadUserSubscriptions();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      showErrorToast('Error cancelling subscription');
    }
  }
};

// Filter functions
const clearSubscriptionFilters = () => {
  subscriptionFilters.value = {
    status: '',
    shopId: '',
    userId: ''
  };
  loadUserSubscriptions();
};

const debounceLoadSubscriptions = () => {
  clearTimeout(subscriptionFilterTimeout);
  subscriptionFilterTimeout = setTimeout(() => {
    loadUserSubscriptions();
  }, 500);
};

const exportSubscriptions = () => {
  try {
    const csvData = userSubscriptions.value.map(sub => ({
      User: `${sub.userId?.firstName} ${sub.userId?.lastName}`,
      Email: sub.userId?.email,
      Shop: sub.shopId?.name,
      Plan: sub.planId?.name,
      Status: sub.status,
      'Monthly Revenue': sub.planId?.price,
      'Period Start': sub.currentPeriodStart,
      'Period End': sub.currentPeriodEnd,
      'Days Remaining': sub.daysRemaining
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showSuccessToast('Subscriptions exported successfully');
  } catch (error) {
    console.error('Error exporting subscriptions:', error);
    showErrorToast('Error exporting subscriptions');
  }
};

// Utility functions
const formatPrice = (price, currency = 'USD') => {
  return subscriptionService.constructor.formatPrice(price, currency);
};

const formatBillingCycle = (billingCycle) => {
  return subscriptionService.constructor.formatBillingCycle(billingCycle);
};

const calculateMonthlyEquivalent = (price, billingCycle) => {
  return subscriptionService.constructor.calculateMonthlyEquivalent(price, billingCycle);
};

const formatSubscriptionStatus = (status) => {
  return subscriptionService.constructor.formatSubscriptionStatus(status);
};

// Add subscription data loading to onMounted
const originalOnMounted = onMounted;
onMounted(() => {
  const superAdminData = localStorage.getItem('superAdminData');
  if (!superAdminData) {
    router.push('/cmx-super/login');
    return;
  }
  userData.value = JSON.parse(superAdminData);
  
  // Initialize profile form with current user data
  if (userData.value) {
    profileForm.value = {
      firstName: userData.value.firstName || '',
      lastName: userData.value.lastName || '',
      phoneNumber: userData.value.phoneNumber || ''
    };
  }
  
  loadShops();
  loadAdminStats();
  loadAdmins();
  
  // Load subscription data
  loadSubscriptionPlans();
  loadUserSubscriptions();
});
</script>

<style scoped>
.dashboard-container {
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

/* ============= COMPACT DASHBOARD CARDS ============= */
.compact-dashboard-card {
  background: white;
  border: 1px solid #EEEEEE;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 90px;
  position: relative;
}

.compact-dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #ccdff0;
}

/* Active/Selected Card Styles */
.compact-dashboard-card.active-card {
  border: 2px solid #027A2B;
  box-shadow: 0 4px 15px rgba(2, 122, 43, 0.2);
  transform: translateY(-2px);
}

.compact-dashboard-card.active-card:hover {
  border-color: #027A2B;
  box-shadow: 0 8px 25px rgba(2, 122, 43, 0.25);
}

.compact-dashboard-card.active-card .card-header-compact {
  background: linear-gradient(135deg, #ccdff0 0%, #a8d0e8 100%);
  position: relative;
}

.compact-dashboard-card.active-card .card-header-compact::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-top: 15px solid #027A2B;
}

.compact-dashboard-card.active-card .card-content-compact {
  background: linear-gradient(135deg, #f2f7fd 0%, #e8f4f8 100%);
}

.compact-dashboard-card.active-card .icon-section {
  background: rgba(2, 122, 43, 0.1);
  border: 1px solid rgba(2, 122, 43, 0.2);
}

.compact-dashboard-card.active-card .icon-section i {
  color: #027A2B;
}

.compact-dashboard-card.active-card .stats-section .count {
  color: #027A2B;
  font-weight: 800;
}

.compact-dashboard-card.active-card .card-title-compact {
  color: #027A2B;
  font-weight: 700;
}

.card-header-compact {
  background: #ccdff0;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.icon-section {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.compact-dashboard-card:hover .icon-section {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.icon-section i {
  font-size: 16px;
  color: #2d3748;
}

.stats-section {
  text-align: right;
}

.stats-section .count {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  line-height: 1;
}

.stats-section .label {
  font-size: 11px;
  color: #4a5568;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.card-content-compact {
  background: #f2f7fd;
  padding: 8px 16px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title-compact {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  line-height: 1.2;
}

.card-desc {
  font-size: 12px;
  color: #718096;
  margin: 0;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .compact-dashboard-card {
    height: 85px;
  }
  
  .card-header-compact {
    height: 48px;
    padding: 10px 14px;
  }
  
  .icon-section {
    width: 30px;
    height: 30px;
  }
  
  .icon-section i {
    font-size: 15px;
  }
  
  .stats-section .count {
    font-size: 16px;
  }
  
  .card-content-compact {
    height: 37px;
    padding: 6px 14px;
  }
  
  .card-title-compact {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .compact-dashboard-card {
    height: 80px;
    margin-bottom: 15px;
  }
  
  .card-header-compact {
    height: 45px;
    padding: 8px 12px;
  }
  
  .icon-section {
    width: 28px;
    height: 28px;
  }
  
  .icon-section i {
    font-size: 14px;
  }
  
  .stats-section .count {
    font-size: 15px;
  }
  
  .stats-section .label {
    font-size: 10px;
  }
  
  .card-content-compact {
    height: 35px;
    padding: 5px 12px;
  }
  
  .card-title-compact {
    font-size: 12px;
  }
  
  .card-desc {
    font-size: 11px;
  }
}

@media (max-width: 576px) {
  .compact-dashboard-card {
    height: 75px;
  }
  
  .card-header-compact {
    height: 42px;
  }
  
  .card-content-compact {
    height: 33px;
  }
}

.table {
  margin-bottom: 0;
}

.table th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
}

.btn-primary {
  background-color: #027A2B;
  border-color: #027A2B;
}

.btn-primary:hover {
  background-color: #025c20;
  border-color: #025c20;
}

.badge {
  padding: 0.5em 0.75em;
}

.bg-success {
  background-color: #027A2B !important;
}

.btn-outline-primary {
  color: #027A2B;
  border-color: #027A2B;
}

.btn-outline-primary:hover {
  background-color: #027A2B;
  border-color: #027A2B;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.fas {
  font-size: 0.875rem;
}

.shop-logo {
  object-fit: cover;
}

.pagination .page-link {
  color: #027A2B;
  border-color: #dee2e6;
}

.pagination .page-item.active .page-link {
  background-color: #027A2B;
  border-color: #027A2B;
}

.pagination .page-link:hover {
  color: #025c20;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.spinner-border.text-primary {
  color: #027A2B !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #027A2B;
  box-shadow: 0 0 0 0.2rem rgba(2, 122, 43, 0.25);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.text-muted {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}

/* Dashboard Cards */
.dashboard-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #027A2B;
}

.card-icon {
  transition: all 0.3s ease;
}

.dashboard-card:hover .card-icon i {
  transform: scale(1.1);
}

.card-stats {
  margin-top: 1rem;
}

.module-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-card .card-body {
  padding: 2rem 1.5rem;
}

.dashboard-card .card-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.dashboard-card .card-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Settings Module Styles */
.border-custom {
  border: 1px solid #EEEEEE !important;
}

.bg-custom-header {
  background-color: #ccdff0 !important;
}

.bg-custom-cell {
  background-color: #f2f7fd !important;
}

.form-label {
  color: #495057;
  font-weight: 500;
}

.form-control:focus {
  border-color: #027A2B;
  box-shadow: 0 0 0 0.2rem rgba(2, 122, 43, 0.25);
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
  color: white;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.card-header {
  border-bottom: 1px solid #EEEEEE;
}

.fw-semibold {
  font-weight: 600 !important;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.badge.bg-success {
  background-color: #027A2B !important;
}

/* Profile form animations */
.form-control {
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn {
  transition: all 0.15s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 1rem !important;
  }
  
  .d-flex.gap-2 {
    flex-direction: column;
  }
  
  .d-flex.gap-2 .btn {
    margin-bottom: 0.5rem;
  }
}
.btn-group .btn {
  margin-right: 2px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}

/* Modal Styles */
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-content {
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  padding: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
}

/* Admin Management Specific Styles */
.table th {
  background-color: #f2f7fd;
  border-bottom: 2px solid #EEEEEE;
  font-weight: 600;
  color: #2d3748;
}

.table td {
  vertical-align: middle;
  padding: 0.75rem;
}

.badge {
  font-size: 0.8rem;
}

.page-link {
  color: #027A2B;
  border-color: #EEEEEE;
}

.page-item.active .page-link {
  background-color: #027A2B;
  border-color: #027A2B;
}

.page-link:hover {
  color: #025c20;
  background-color: #f2f7fd;
  border-color: #EEEEEE;
}

@media (max-width: 768px) {
  .btn-group {
    flex-direction: column;
  }
  
  .btn-group .btn {
    margin-right: 0;
    margin-bottom: 2px;
  }
  
  .modal-dialog {
    margin: 0.5rem;
    max-width: calc(100% - 1rem);
  }
  
  .table-responsive {
    font-size: 0.85rem;
  }
}

/* Subscription Management Styles */
.analytics-card {
  transition: transform 0.2s ease-in-out;
}

.analytics-card:hover {
  transform: translateY(-2px);
}

.analytics-icon {
  opacity: 0.8;
}

.plan-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.plan-card.border-warning {
  border-width: 2px;
  position: relative;
}

.plan-card.border-warning::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ffc107, #ffca2c);
  border-radius: 10px;
  z-index: -1;
}

.pricing-display .price-amount {
  font-weight: bold;
  color: #027A2B;
}

.monthly-equivalent {
  margin-top: 0.25rem;
}

.features-list ul {
  max-height: 120px;
  overflow-y: auto;
}

.features-list li {
  font-size: 0.9rem;
}

.limitations {
  background-color: rgba(248, 249, 250, 0.5);
  border-radius: 6px;
  padding: 0.75rem;
}

.text-small {
  font-size: 0.85rem;
}

.stat-item {
  padding: 0.5rem;
}

.user-info, .shop-info, .plan-info, .period-info, .revenue-info {
  font-size: 0.9rem;
}

.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  color: #6c757d;
  font-weight: 500;
}

.nav-tabs .nav-link.active {
  background-color: transparent;
  color: #027A2B;
  border-bottom-color: #027A2B;
}

.nav-tabs .nav-link:hover {
  color: #027A2B;
  border-color: transparent;
}

.subscription-filters .form-control:focus,
.subscription-filters .form-select:focus {
  border-color: #027A2B;
  box-shadow: 0 0 0 0.2rem rgba(2, 122, 43, 0.25);
}

/* ============= SUBSCRIPTION MANAGEMENT STYLES ============= */

/* Analytics Cards */
.analytics-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.analytics-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.analytics-card .card-body {
  padding: 1.5rem;
}

.analytics-card .analytics-icon {
  opacity: 0.8;
}

.analytics-card h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.analytics-card h6 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.9;
}

.analytics-card small {
  opacity: 0.8;
  font-size: 0.75rem;
}

/* Plan Cards */
.plan-card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid #f8f9fa;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.plan-card.border-warning {
  border-color: #ffc107 !important;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.2);
}

.plan-card.border-warning:hover {
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
}

.plan-card .card-header {
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.25rem;
}

.plan-card .pricing-display {
  text-align: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.plan-card .price-amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: #027A2B;
  margin-bottom: 0;
}

.plan-card .monthly-equivalent {
  margin-top: 0.5rem;
}

.plan-card .features-list ul {
  max-height: 120px;
  overflow-y: auto;
}

.plan-card .features-list li {
  padding: 0.25rem 0;
  font-size: 0.9rem;
}

.plan-card .limitations {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.plan-card .limitations .row > div {
  padding: 0.25rem 0.5rem;
}

.plan-card .plan-stats {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.plan-card .stat-item {
  padding: 0.5rem 0;
}

.plan-card .stat-item strong {
  font-size: 1.25rem;
  display: block;
}

.plan-card .card-footer {
  background-color: #fff;
  border-top: 1px solid #f8f9fa;
  padding: 1rem 1.25rem;
  border-radius: 0 0 10px 10px;
}

/* Tab Styles */
.nav-tabs {
  border-bottom: 2px solid #e9ecef;
}

.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  background: transparent;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-tabs .nav-link:hover {
  border: none;
  color: #027A2B;
  background-color: #f8f9fa;
}

.nav-tabs .nav-link.active {
  color: #027A2B;
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #027A2B;
}

/* Subscription Table Styles */
.table th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  font-weight: 600;
  font-size: 0.875rem;
  color: #495057;
  white-space: nowrap;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #f8f9fa;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.user-info,
.shop-info,
.plan-info,
.period-info,
.revenue-info {
  line-height: 1.4;
}

.user-info strong,
.shop-info strong,
.plan-info strong,
.period-info strong,
.revenue-info strong {
  font-size: 0.9rem;
  color: #212529;
}

.user-info small,
.shop-info small,
.plan-info small,
.period-info small,
.revenue-info small {
  font-size: 0.775rem;
  color: #6c757d;
}

/* Status Badges */
.badge {
  font-size: 0.75rem;
  padding: 0.5em 0.75em;
  font-weight: 500;
}

.badge i {
  margin-right: 0.25rem;
}

/* Dropdown Styles */
.dropdown-menu {
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item i {
  width: 16px;
  text-align: center;
}

/* Filter Card */
.card-title i {
  color: #027A2B;
}

/* Responsive adjustments for subscription management */
@media (max-width: 992px) {
  .analytics-card h3 {
    font-size: 1.5rem;
  }
  
  .plan-card .price-amount {
    font-size: 2rem;
  }
  
  .table-responsive {
    font-size: 0.8rem;
  }
  
  .user-info,
  .shop-info,
  .plan-info {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .analytics-card {
    margin-bottom: 1rem;
  }
  
  .nav-tabs .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .plan-card {
    margin-bottom: 1.5rem;
  }
  
  .table th,
  .table td {
    padding: 0.5rem 0.25rem;
  }
}

/* Utility classes for subscription management */
.text-small {
  font-size: 0.875rem;
}

.opacity-50 {
  opacity: 0.5;
}

.border-custom {
  border: 1px solid #EEEEEE !important;
}

.bg-custom-header {
  background-color: #ccdff0 !important;
}

.bg-custom-cell {
  background-color: #f2f7fd !important;
}
</style>
