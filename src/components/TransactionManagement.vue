<template>
  <div class="transaction-management">
    <!-- Loading Overlay -->
    <div v-if="initialLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading transaction data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="alert alert-danger" role="alert">
      <h4 class="alert-heading">
        <i class="fas fa-exclamation-triangle me-2"></i>Error Loading Transactions
      </h4>
      <p class="mb-3">{{ errorMessage }}</p>
      <button class="btn btn-outline-danger" @click="retryLoad">
        <i class="fas fa-redo me-1"></i>Retry
      </button>
    </div>

    <!-- Main Content -->
    <div v-else>
    <!-- Transaction Statistics Cards -->
    <div class="row mb-4">
      <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <div class="card stats-card bg-primary text-white">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <div class="card-title h6 mb-0">Total Revenue</div>
              <div class="h4 mb-0">
                ${{ statistics?.overview?.totalRevenue?.toFixed(2) || '0.00' }}
              </div>
              <small class="opacity-75">This Period</small>
            </div>
            <div class="stats-icon">
              <i class="fas fa-dollar-sign fa-2x"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <div class="card stats-card bg-success text-white">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <div class="card-title h6 mb-0">Total Transactions</div>
              <div class="h4 mb-0">{{ statistics?.overview?.totalTransactions || 0 }}</div>
              <small class="opacity-75">{{ statistics?.overview?.completedTransactions || 0 }} Completed</small>
            </div>
            <div class="stats-icon">
              <i class="fas fa-receipt fa-2x"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <div class="card stats-card bg-warning text-white">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <div class="card-title h6 mb-0">Pending Payments</div>
              <div class="h4 mb-0">{{ statistics?.overview?.pendingTransactions || 0 }}</div>
              <small class="opacity-75">Awaiting Processing</small>
            </div>
            <div class="stats-icon">
              <i class="fas fa-clock fa-2x"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <div class="card stats-card bg-info text-white">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <div class="card-title h6 mb-0">Average Transaction</div>
              <div class="h4 mb-0">
                ${{ statistics?.overview?.averageTransactionAmount?.toFixed(2) || '0.00' }}
              </div>
              <small class="opacity-75">Per Transaction</small>
            </div>
            <div class="stats-icon">
              <i class="fas fa-chart-line fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Payment Status</label>
            <select class="form-select" v-model="filters.paymentStatus" @change="applyFilters">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Transaction Type</label>
            <select class="form-select" v-model="filters.isDummyTransaction" @change="applyFilters">
              <option value="">All Transactions</option>
              <option value="true">Dummy Transactions</option>
              <option value="false">Real Transactions</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Start Date</label>
            <input 
              type="date" 
              class="form-control" 
              v-model="filters.startDate"
              @change="applyFilters"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label">End Date</label>
            <input 
              type="date" 
              class="form-control" 
              v-model="filters.endDate"
              @change="applyFilters"
            />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-6">
            <label class="form-label">Search Transaction ID</label>
            <input 
              type="text" 
              class="form-control" 
              v-model="filters.transactionId"
              @input="applyFilters"
              placeholder="Enter transaction ID..."
            />
          </div>
          <div class="col-md-6 d-flex align-items-end">
            <button class="btn btn-outline-secondary me-2" @click="resetFilters">
              <i class="fas fa-undo me-1"></i>Reset Filters
            </button>
            <button class="btn btn-success" @click="exportTransactions">
              <i class="fas fa-download me-1"></i>Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">
          <i class="fas fa-list me-2"></i>Transaction History
        </h5>
        <button class="btn btn-outline-primary btn-sm" @click="refreshData" :disabled="loading">
          <i class="fas fa-sync me-1" :class="{ 'fa-spin': loading }"></i>Refresh
        </button>
      </div>

      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading transactions...</p>
        </div>

        <div v-else-if="transactions.length === 0" class="text-center py-5">
          <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
          <h5>No Transactions Found</h5>
          <p class="text-muted">Transaction management is working! Mock data will load here.</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Shop</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction._id">
                <td>
                  <code class="text-primary">{{ transaction.transactionId }}</code>
                </td>
                <td>
                  <div>
                    <strong>{{ transaction.userId.firstName }} {{ transaction.userId.lastName }}</strong>
                    <br>
                    <small class="text-muted">{{ transaction.userId.email }}</small>
                  </div>
                </td>
                <td>
                  <span class="badge bg-secondary">{{ transaction.shopId }}</span>
                </td>
                <td>
                  <div>
                    <strong>{{ transaction.planId.name }}</strong>
                    <br>
                    <small class="text-muted">{{ transaction.planId.billingCycle }}</small>
                  </div>
                </td>
                <td>
                  <strong>{{ transaction.currency }} {{ transaction.amount.toFixed(2) }}</strong>
                </td>
                <td>
                  <span 
                    class="badge" 
                    :class="getStatusBadgeClass(transaction.paymentStatus)"
                  >
                    {{ transaction.paymentStatus }}
                  </span>
                </td>
                <td>
                  <span class="badge bg-light text-dark">{{ transaction.paymentMethod }}</span>
                </td>
                <td>
                  <small>{{ formatDate(transaction.paymentDate) }}</small>
                </td>
                <td>
                  <span 
                    class="badge" 
                    :class="transaction.isDummyTransaction ? 'bg-warning' : 'bg-success'"
                  >
                    {{ transaction.isDummyTransaction ? 'Dummy' : 'Real' }}
                  </span>
                </td>
                <td>
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    @click="viewTransactionDetails(transaction)"
                    title="View Details"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.totalPages > 1" class="card-footer">
          <nav>
            <ul class="pagination justify-content-center mb-0">
              <li class="page-item" :class="{ disabled: !pagination.hasPrevPage }">
                <button class="page-link" @click="changePage(pagination.currentPage - 1)" :disabled="!pagination.hasPrevPage">
                  Previous
                </button>
              </li>
              
              <li 
                v-for="page in getPageNumbers()" 
                :key="page"
                class="page-item" 
                :class="{ active: page === pagination.currentPage }"
              >
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              
              <li class="page-item" :class="{ disabled: !pagination.hasNextPage }">
                <button class="page-link" @click="changePage(pagination.currentPage + 1)" :disabled="!pagination.hasNextPage">
                  Next
                </button>
              </li>
            </ul>
          </nav>
          
          <div class="text-center mt-2">
            <small class="text-muted">
              Showing {{ ((pagination.currentPage - 1) * pagination.limit) + 1 }} to 
              {{ Math.min(pagination.currentPage * pagination.limit, pagination.totalTransactions) }} of 
              {{ pagination.totalTransactions }} transactions
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div class="modal fade" id="transactionModal" tabindex="-1" ref="transactionModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-receipt me-2"></i>Transaction Details
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedTransaction">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Transaction ID</label>
                <p><code>{{ selectedTransaction.transactionId }}</code></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Invoice ID</label>
                <p><code>{{ selectedTransaction.invoiceId }}</code></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">User Details</label>
                <p>
                  {{ selectedTransaction.userId.firstName }} {{ selectedTransaction.userId.lastName }}<br>
                  <small class="text-muted">{{ selectedTransaction.userId.email }}</small><br>
                  <small class="text-muted">Username: {{ selectedTransaction.userId.userName }}</small>
                </p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Plan Details</label>
                <p>
                  {{ selectedTransaction.planId.name }}<br>
                  <small class="text-muted">{{ selectedTransaction.planId.billingCycle }} - {{ selectedTransaction.planId.currency }} {{ selectedTransaction.planId.price }}</small>
                </p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Amount</label>
                <p class="h5 text-success">{{ selectedTransaction.currency }} {{ selectedTransaction.amount.toFixed(2) }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Payment Status</label>
                <p>
                  <span 
                    class="badge fs-6" 
                    :class="getStatusBadgeClass(selectedTransaction.paymentStatus)"
                  >
                    {{ selectedTransaction.paymentStatus }}
                  </span>
                </p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Payment Method</label>
                <p>{{ selectedTransaction.paymentMethod }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Transaction Type</label>
                <p>
                  <span 
                    class="badge" 
                    :class="selectedTransaction.isDummyTransaction ? 'bg-warning' : 'bg-success'"
                  >
                    {{ selectedTransaction.isDummyTransaction ? 'Dummy Transaction' : 'Real Transaction' }}
                  </span>
                </p>
              </div>
              <div class="col-12 mb-3">
                <label class="form-label fw-bold">Description</label>
                <p>{{ selectedTransaction.description }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Created Date</label>
                <p>{{ formatDate(selectedTransaction.createdAt) }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Payment Date</label>
                <p>{{ formatDate(selectedTransaction.paymentDate) }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    
    </div> <!-- End of v-else -->
  </div> <!-- End of transaction-management -->
</template><script setup>
import { ref, onMounted } from 'vue';
import { transactionService } from '../SuperAdmin/services/transactionService';
import { showErrorToast, showSuccessToast } from '../toster';

// Reactive data
const initialLoading = ref(true);
const loading = ref(false);
const errorMessage = ref('');
const transactions = ref([]);
const pagination = ref(null);
const statistics = ref(null);
const selectedTransaction = ref(null);
const transactionModal = ref(null);

// Filters
const filters = ref({
  page: 1,
  limit: 20,
  paymentStatus: '',
  transactionType: '',
  isDummyTransaction: '',
  startDate: '',
  endDate: '',
  shopId: '',
  userId: '',
  planId: ''
});

// Lifecycle
onMounted(async () => {
  // Immediate localStorage check
  console.log('=== TransactionManagement onMounted ===');
  console.log('localStorage keys:', Object.keys(localStorage));
  console.log('superAdminToken:', localStorage.getItem('superAdminToken'));
  console.log('superAdminData:', localStorage.getItem('superAdminData'));
  console.log('======================================');
  
  await loadInitialData();
});

// Methods
const loadInitialData = async () => {
  // Check if SuperAdmin is authenticated
  const token = localStorage.getItem('superAdminToken');
  console.log('TransactionManagement - Authentication check:', {
    tokenExists: !!token,
    tokenLength: token ? token.length : 0,
    tokenValue: token === null ? 'NULL' : (token === undefined ? 'UNDEFINED' : 'HAS_VALUE'),
    isStringNull: token === 'null',
    component: 'TransactionManagement'
  });

  if (!token || token === 'null' || token === 'undefined') {
    errorMessage.value = 'SuperAdmin authentication required. Please log in.';
    initialLoading.value = false;
    return;
  }

  initialLoading.value = true;
  errorMessage.value = '';
  
  try {
    await Promise.all([
      loadTransactions(),
      loadStatistics()
    ]);
  } catch (error) {
    console.error('Error loading initial data:', error);
    errorMessage.value = error.message || 'Failed to load transaction data';
  } finally {
    initialLoading.value = false;
  }
};

const loadTransactions = async () => {
  loading.value = true;
  try {
    const data = await transactionService.getAllTransactions(filters.value);
    console.log('Transaction data:', data);
    transactions.value = data.transactions || [];
    pagination.value = data.pagination || null;
    
    if (transactions.value.length === 0 && filters.value.page > 1) {
      // If no transactions on current page but filters suggest there should be data, go to page 1
      filters.value.page = 1;
      await loadTransactions();
      return;
    }
  } catch (error) {
    console.error('Error loading transactions:', error);
    errorMessage.value = error.message || 'Failed to load transactions';
    throw error;
  } finally {
    loading.value = false;
  }
};

const loadStatistics = async () => {
  try {
    const data = await transactionService.getTransactionStatistics();
    statistics.value = data;
  } catch (error) {
    console.error('Error loading statistics:', error);
    // Don't throw error for statistics as it's not critical for the main functionality
  }
};

const applyFilters = () => {
  filters.value.page = 1; // Reset to first page when filtering
  loadTransactions();
};

const resetFilters = () => {
  filters.value = {
    page: 1,
    limit: 20,
    paymentStatus: '',
    transactionType: '',
    isDummyTransaction: '',
    startDate: '',
    endDate: '',
    shopId: '',
    userId: '',
    planId: ''
  };
  loadTransactions();
};

const refreshData = () => {
  loadInitialData();
};

const retryLoad = () => {
  loadInitialData();
};

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    filters.value.page = page;
    loadTransactions();
  }
};

const getPageNumbers = () => {
  if (!pagination.value) return [];
  
  const pages = [];
  const current = pagination.value.currentPage;
  const total = pagination.value.totalPages;
  
  // Show up to 5 page numbers
  const maxPages = 5;
  let start = Math.max(1, current - Math.floor(maxPages / 2));
  let end = Math.min(total, start + maxPages - 1);
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxPages && start > 1) {
    start = Math.max(1, end - maxPages + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
};

const viewTransactionDetails = async (transaction) => {
  try {
    const details = await transactionService.getTransactionById(transaction.transactionId);
    selectedTransaction.value = details;
    
    // Show modal using Bootstrap
    const modal = new window.bootstrap.Modal(transactionModal.value);
    modal.show();
  } catch (error) {
    console.error('Error viewing transaction details:', error);
    showErrorToast(error.message || 'Failed to load transaction details');
  }
};

const exportTransactions = async () => {
  try {
    const blob = await transactionService.exportTransactions(filters.value, 'csv');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showSuccessToast('Transactions exported successfully');
  } catch (error) {
    console.error('Error exporting transactions:', error);
    showErrorToast(error.message || 'Failed to export transactions');
  }
};

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    completed: 'bg-success',
    pending: 'bg-warning',
    failed: 'bg-danger',
    refunded: 'bg-info',
    cancelled: 'bg-secondary'
  };
  return statusClasses[status] || 'bg-secondary';
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.transaction-management {
  min-height: 100vh;
}

.stats-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.stats-card:hover {
  transform: translateY(-2px);
}

.stats-icon {
  opacity: 0.8;
}

.table th {
  border-top: none;
  font-weight: 600;
  color: #6c757d;
  font-size: 0.875rem;
}

.table td {
  vertical-align: middle;
  font-size: 0.875rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
}

code {
  background-color: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* Loading and empty states */
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
