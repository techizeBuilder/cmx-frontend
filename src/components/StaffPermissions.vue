<template>
  <div class="wrap">
    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <!-- Add Staff Modal -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Staff Member</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input 
              id="firstName"
              v-model="newStaff.firstName"
              type="text"
              class="form-input"
              placeholder="Enter first name"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input 
              id="lastName"
              v-model="newStaff.lastName"
              type="text"
              class="form-input"
              placeholder="Enter last name"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              id="email"
              v-model="newStaff.email"
              type="email"
              class="form-input"
              placeholder="Enter email address"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input 
              id="phone"
              v-model="newStaff.phone"
              type="tel"
              class="form-input"
              placeholder="Enter phone number"
            />
          </div>
          <div class="form-group">
            <label for="employeeTitle">Role/Title *</label>
            <select 
              id="employeeTitle"
              v-model="newStaff.employeeTile"
              class="form-input"
              required
            >
              <option value="">Select Role</option>
              <option v-for="title in EMPLOYEE_TITLES" 
                      :key="title" 
                      :value="title">
                {{ title }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="userName">Username *</label>
            <input 
              id="userName"
              v-model="newStaff.userName"
              type="text"
              class="form-input"
              placeholder="Enter username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password *</label>
            <input 
              id="password"
              v-model="newStaff.password"
              type="password"
              class="form-input"
              placeholder="Enter password"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
          <button class="modal-btn cancel" @click="closeModal">Cancel</button>
          <button class="modal-btn submit" 
                  @click="submitNewStaff"
                  :disabled="!isFormValid || loading">
            {{ loading ? 'Adding...' : 'Add Staff' }}
          </button>
        </div>
      </div>
    </div>

    <div class="header card"><h1>STAFF PERMISSIONS</h1></div>
    <div class="shell">
      <!-- Sidebar --> 
      <div class="team card">
        <div class="tools">
          <input v-model="searchTerm" class="search" placeholder="Search staff…"/>
          <select v-model="selectedType">
            <option value="All">All Staff Types</option>
            <option v-for="type in STAFF_TYPES" :key="type" :value="type">{{ type }}</option>
          </select>
          <div class="tools-row">
            <button @click="resetFilters" class="pillBtn">Reset</button>
            <button @click="addStaffMember" class="pillBtn">+ Add</button>
          </div>
        </div>
        <div class="muted" style="padding:8px 10px;font-size:12px">Select more than one staff member to apply batch permissions.</div>
        <div class="list">
          <div v-for="member in filteredStaff" 
               :key="member.id" 
               :class="['user', { active: member.id === focusId, selected: member.selected }]"
               @click="handleUserClick($event, member)">
            <input type="checkbox" 
                   :checked="member.selected"
                   @change="toggleSelection($event, member)"
                   :aria-label="'Select ' + member.name"/>
            <div class="userMain">
              <div class="name">{{ member.name }}</div>
              <div class="roleLine">
                <span class="staffTypeLabel">Staff Type:</span>
                <span class="staffTypeValue">{{ member.employeeTile }}</span>
              </div>
              <div class="email">{{ member.email }}</div>
            </div>
            <img class="userIcon" :alt="'icon'" :src="userIconBase64" />
          </div>
        </div>
      </div>

      <!-- Detail --> 
      <div class="detail card">
        <div class="bar">
          <div class="title">{{ selectedTitle }}</div>
          <div class="muted">{{ selectedNames }}</div>
          <div style="flex:1"></div>
          <div class="pillRow">
            Quick set all:
            <button v-for="level in LEVELS" 
                    :key="level"
                    class="pillBtn" 
                    @click="setAllPermissions(level)">
              {{ level.charAt(0).toUpperCase() + level.slice(1) }}
            </button>
          </div>
        </div>

        <div class="tableWrap">
          <table>
            <thead>
              <tr>
                <th style="width:40%">Module</th>
                <th v-for="level in LEVELS" 
                    :key="level" 
                    style="width:12%">
                  {{ level.charAt(0).toUpperCase() + level.slice(1) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="module in MODULES" :key="module">
                <td style="text-align:left;font-weight:600">{{ module }}</td>
                <td v-for="level in LEVELS" :key="level">
                  <button class="cellBtn" 
                          @click="setPermissionLevel(module, level)">
                    {{ getCurrentPermLevel(module) === level ? '✓' : '' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="padding:8px 12px" class="muted">
          Click a column to set the level for that module. Selected column shows a ✓ check.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Constants
import { staffPermissionsService, EMPLOYEE_TITLES } from '../services/staffPermissionsService';
import { showErrorToast } from '../toster';

// Constants for permission levels
const PERMISSION_LEVELS = ['none', 'view', 'edit', 'manager', 'admin'];

const MODULES = [
  "Office-X", "Parts-X", "Repair Order", "Tech-X", "Customer Profile",
  "Estimate Profile", "Vendor-X", "Accounts Receivable", "Shop Profile"
];

const LEVELS = ['none', 'view', 'edit', 'manager', 'admin'];

// Helper function to generate unique ID
const uid = () => Math.random().toString(36).slice(2, 10);

export default {
  name: 'StaffPermissions',
  data() {
    return {
      EMPLOYEE_TITLES,
      MODULES,
      PERMISSION_LEVELS,
      staff: [],
      focusId: null,
      searchTerm: '',
      selectedType: 'All',
      showAddModal: false,
      loading: false,
      errorMessage: '',
      shopId: localStorage.getItem('shopId') || JSON.parse(localStorage.getItem('shopProfile'))?.shopId?._id,
      newStaff: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        employeeTile: '',
        userName: '',
        password: '',
        permissions: this.createDefaultPermissions()
      },
      userIconBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAVpJREFUWIXtlrFqAkEURTe9COliHbWwFAJ2FmlExH/QD9CQLum1FvwIU0X9ABFC7Oy1FSRE1JAmdXKHzMo47My+nZl1Lbxwmre8uafYXcbzziRXoA2mYBYzrKPFOw9h5b8npiUKTBMQmIgCswQE3i8COoEOaDimQxXYefFlTxHYxiiwcy1QANmkBO7BD/gGpVML+OX+DlXCiYBcHkXCWkBVTpWwEggrp0gYC1DLwySMBKKW6yQiC5QDyhegCr6EGfvD1cAqQOLORqAXUJ7hz5bSnOUWrKWdvo1ACrzx+VIoVwmw5MEHn8/BtY2AL/EIbqS5SoAlD56kcmMBVXQCqpAE9jEKiC+u9kLSBc0AigSBomK3K3UYXcmGBIER8awjgRfi0oggMCaeNRAF2MViQ1h6JQgMCed88s6jpEEF1DWItx+VQC7kjArvso7JV+A0z97/i8R4SELASf4AhFQARyVXnl8AAAAASUVORK5CYII='
    }
  },
  computed: {
    filteredStaff() {
      return this.staff.filter(s => 
        (this.selectedType === 'All' || s.employeeTile === this.selectedType) &&
        (`${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    },
    
    isFormValid() {
      const { firstName, lastName, email, userName, password, employeeTile } = this.newStaff;
      return firstName && lastName && email && userName && password && employeeTile;
    },
    selectedStaff() {
      return this.staff.filter(s => s.selected);
    },
    currentStaffMember() {
      return this.staff.find(s => s.id === this.focusId);
    },
    selectedTitle() {
      return this.selectedStaff.length > 1 ? '' : this.currentStaffMember?.name || '';
    },
    selectedNames() {
      if (this.selectedStaff.length <= 1) return '';
      const names = this.selectedStaff.map(x => x.name).slice(0, 6).join(', ');
      return `Selected: ${this.selectedStaff.length} — ${names}${this.selectedStaff.length > 6 ? '…' : ''}`;
    }
  },
  methods: {
    canonicalType(role) {
      const r = (role || '').toLowerCase();
      if (r.includes('body')) return 'Body Technician';
      if (r.includes('painter')) return 'Painter Technician';
      if (r.includes('tech')) return 'Technician Other';
      if (r.includes('production')) return 'Production';
      if (r.includes('estimator')) return 'Estimator';
      if (r.includes('parts')) return 'Parts';
      if (r.includes('manager')) return 'Manager';
      if (r.includes('admin')) return 'Admin';
      if (r.includes('office')) return 'Office';
      return 'Office';
    },
    createAllNonePerms() {
      const perms = {};
      MODULES.forEach(m => perms[m] = 'none');
      return perms;
    },
    makeStaffMember(name, email, role) {
      return {
        id: uid(),
        name,
        email,
        role,
        type: this.canonicalType(role),
        selected: false,
        perms: this.createAllNonePerms()
      };
    },
    resetFilters() {
      this.searchTerm = '';
      this.selectedType = 'All';
      this.staff.forEach(s => s.selected = false);
      this.focusId = this.staff[0]?.id;
    },
    handleUserClick(event, member) {
      if (event.target.tagName !== 'INPUT') {
        this.focusId = member.id;
      }
    },
    toggleSelection(event, member) {
      member.selected = event.target.checked;
    },
    setAllPermissions(level) {
      if (!this.currentStaffMember) return;
      MODULES.forEach(m => {
        this.currentStaffMember.perms[m] = level;
      });
    },
    setPermissionLevel(module, level) {
      if (!this.currentStaffMember) return;
      this.currentStaffMember.perms[module] = level;
    },
    getCurrentPermLevel(module) {
      return this.currentStaffMember?.perms[module] || 'none';
    },
    addStaffMember() {
      this.showAddModal = true;
    },
    async submitNewStaff() {
      if (!this.isFormValid) return;
      
      this.loading = true;
      this.errorMessage = '';
      
      try {
        const staffData = {
          ...this.newStaff,
          shopId: this.shopId
        };
        
        const response = await staffPermissionsService.addStaffMember(staffData);
        
        if (response.success) {
          await this.loadStaffMembers();
          this.closeModal();
          // Show success message using your toast system
          this.$toast.success('Staff member added successfully');
        } else {
          this.errorMessage = response.message;
        }
      } catch (error) {
        this.errorMessage = error.message || 'Failed to add staff member';
        showErrorToast(this.errorMessage);
      } finally {
        this.loading = false;
      }
    },

    async loadStaffMembers() {
      this.loading = true;
      try {
        if (!this.shopId) {
          // Try to get shopId from store or other storage methods
          this.shopId = localStorage.getItem('shopId') || 
                       JSON.parse(localStorage.getItem('shopProfile'))?.shopId?._id;
          
          if (!this.shopId) {
            showErrorToast('Shop ID not found. Please log out and log in again.');
            return;
          }
        }
        
        console.log('Loading staff for shop:', this.shopId);
        const response = await staffPermissionsService.getAllStaff(this.shopId);
        if (response.success) {
          this.staff = response.data;
          if (this.staff.length > 0 && !this.focusId) {
            this.focusId = this.staff[0]._id;
          }
        } else {
          showErrorToast(response.message || 'Failed to load staff members');
        }
      } catch (error) {
        console.error('Staff loading error:', error);
        showErrorToast('Failed to load staff members');
      } finally {
        this.loading = false;
      }
    },

    async updatePermissions(staffId, permissions) {
      this.loading = true;
      try {
        const response = await staffPermissionsService.updatePermissions(staffId, permissions);
        if (response.success) {
          await this.loadStaffMembers();
          this.$toast.success('Permissions updated successfully');
        } else {
          showErrorToast(response.message);
        }
      } catch (error) {
        showErrorToast('Failed to update permissions');
      } finally {
        this.loading = false;
      }
    },

    async batchUpdatePermissions(permissions) {
      const selectedIds = this.selectedStaff.map(s => s._id);
      if (selectedIds.length === 0) return;

      this.loading = true;
      try {
        const response = await staffPermissionsService.batchUpdatePermissions(selectedIds, permissions);
        if (response.success) {
          await this.loadStaffMembers();
          this.$toast.success('Batch update completed successfully');
        } else {
          showErrorToast(response.message);
        }
      } catch (error) {
        showErrorToast('Failed to update permissions');
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.showAddModal = false;
      this.errorMessage = '';
      this.newStaff = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        employeeTile: '',
        userName: '',
        password: '',
        permissions: this.createDefaultPermissions()
      };
    },

    createDefaultPermissions() {
      const permissions = {};
      MODULES.forEach(module => {
        permissions[module] = 'none';
      });
      return permissions;
    }
  },
  async created() {
    await this.loadStaffMembers();
  }
}
</script>

<style>
:root {
  --page: #f7f9fc;
  --panel: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #e5e7eb;
  --th: #dbeafe;
  --thBorder: #cfe1f1;
  --row: #ffffff;
  --rowAlt: #f2f7ff;
}

* { box-sizing: border-box; }

.wrap {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
}

.shell {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
}

.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

.header h1 {
  font-size: 16px;
  margin: 0;
  font-weight: 800;
}

/* Sidebar */
.team .tools {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
  padding: 10px;
  border-bottom: 1px solid var(--border);
}

.team .search {
  flex: 1;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 8px 10px;
}

.batch {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 8px 10px;
  border-bottom: 1px solid var(--border);
}

.batch .btn {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 6px 8px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
}

.list {
  max-height: 72vh;
  overflow: auto;
}

.user {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid var(--border);
  position: relative;
  padding-right: 48px;
}

.user:hover {
  background: #f9fbff;
}

.roleSmall {
  color: var(--muted);
  font-size: 12px;
}

/* Detail */
.detail .bar {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--border);
}

.detail .title {
  font-weight: 800;
  font-size: 18px;
}

.pillRow {
  margin-left: auto;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  color: var(--muted);
}

.pillBtn {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 4px 8px;
  font-weight: 700;
  cursor: pointer;
}

/* Table */
.tableWrap {
  margin: 12px;
  border: 1px solid var(--border);
  border-radius: 0;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  background: var(--th);
  border-bottom: 1px solid var(--thBorder);
  font-size: 12px;
  padding: 12px 8px;
  text-align: center;
}

thead th:first-child,
tbody td:first-child {
  text-align: left;
}

tbody td {
  padding: 12px 8px;
  border-bottom: 1px solid var(--border);
  text-align: center;
}

tbody tr:nth-child(odd) {
  background: var(--row);
}

tbody tr:nth-child(even) {
  background: var(--rowAlt);
}

.sel {
  font-weight: 800;
}

.cellBtn {
  border: 1px solid var(--border);
  background: #fff;
  padding: 4px 8px;
  cursor: pointer;
  font-weight: 700;
}

.muted {
  color: var(--muted);
}

.user.active {
  background: #f2f7fd;
  outline: 2px solid #ccdff0;
}

.user.active:hover {
  background: #f2f7fd;
}

.user.selected {
  background: #ccdff0;
}

.user.selected:hover {
  background: #ccdff0;
}

/* Corner rules */
:root * {
  border-radius: 0;
}

button,
.btn,
.pillBtn {
  border-radius: 3px !important;
}

input[type="checkbox"] {
  border-radius: 3px !important;
}

/* Staff type labels */
.roleLine {
  margin-top: 2px;
  font-size: 12px;
  color: var(--muted);
}

.staffTypeLabel {
  margin-right: 4px;
  font-weight: 600;
}

/* Staff row icon */
.userIcon {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  object-fit: contain;
  image-rendering: auto;
  opacity: 1;
  z-index: 5;
  pointer-events: none;
  filter: drop-shadow(0 0 1px rgba(0,0,0,.2));
}

/* Responsive Design */
@media (max-width: 960px) {
  .shell {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .wrap {
    padding: 0 12px;
    margin: 16px auto;
  }

  /* Adjust sidebar for mobile */
  .team .tools {
    gap: 12px;
    padding: 12px;
  }

  .list {
    max-height: 50vh; /* Shorter list on mobile */
  }

  /* Make the detail section more compact */
  .detail .bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
  }

  .pillRow {
    margin-left: 0;
    flex-wrap: wrap;
    width: 100%;
  }

  .pillBtn {
    flex: 1;
    text-align: center;
    min-width: calc(50% - 6px); /* 2 buttons per row with gap */
  }

  /* Adjust table for mobile */
  .tableWrap {
    margin: 12px 0;
    overflow-x: auto;
  }

  table {
    min-width: 600px; /* Ensure minimum width for readability */
  }

  thead th,
  tbody td {
    padding: 8px 4px;
    font-size: 13px;
  }

  .cellBtn {
    padding: 4px;
    min-width: 40px;
  }

  /* Adjust user cards for mobile */
  .user {
    padding: 12px 40px 12px 8px;
  }

  .userIcon {
    right: 8px;
  }

  .name {
    font-size: 14px;
    word-break: break-word;
  }

  .email {
    font-size: 12px;
    word-break: break-all;
  }
}

/* Additional responsive adjustments for very small screens */
@media (max-width: 480px) {
  .wrap {
    padding: 0 8px;
    margin: 12px auto;
  }

  .header h1 {
    font-size: 14px;
  }

  .team .tools select,
  .team .tools input {
    font-size: 14px;
  }

  .pillBtn {
    padding: 6px 4px;
    font-size: 11px;
    min-width: calc(33.33% - 6px); /* 3 buttons per row with gap */
  }

  .detail .title {
    font-size: 16px;
  }

  .user {
    gap: 8px;
  }
}

/* Loading Styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  margin-right: auto;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--panel);
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--muted);
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text);
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 14px;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-btn.cancel {
  background: white;
  border: 1px solid var(--border);
  color: var(--text);
}

.modal-btn.submit {
  background: #2563eb;
  border: 1px solid #2563eb;
  color: white;
}

.modal-btn.submit:disabled {
  background: #93c5fd;
  border-color: #93c5fd;
  cursor: not-allowed;
}

.modal-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    margin: 10px;
  }

  .modal-header {
    padding: 12px 16px;
  }

  .modal-body {
    padding: 16px;
  }

  .modal-footer {
    padding: 12px 16px;
  }

  .form-input {
    font-size: 16px; /* Prevents zoom on mobile */
  }
}
</style>
