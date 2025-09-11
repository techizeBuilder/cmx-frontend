<script setup>
import { onMounted, ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import userIcon from "./Icons/userIcon.png";
import axios from "axios";
import { useRouter } from "vue-router";
import { showErrorToast, showSuccessToast } from "../toster";
import { subscriptionService } from "../services/subscriptionService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const userId = ref();
const shopStr = localStorage.getItem("shopIdStr").toUpperCase();
const userData = ref();
const isLoading = ref(false);
const isUpdatingPassword = ref(false);
const isUpdatingUsername = ref(false);
const isUpdatingCredentials = ref(false);
const router = useRouter();

// Password update form data
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Username update form data
const usernameForm = ref({
  newUsername: ''
});

// Combined credentials form data
const credentialsForm = ref({
  newUsername: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Form validation errors
const passwordErrors = ref({});
const usernameErrors = ref({});
const credentialsErrors = ref({});

// Active tab for different update types
const activeTab = ref('profile'); // 'profile', 'password', 'username', 'credentials', 'subscription'

// Subscription related data
const subscriptionData = ref(null);
const subscriptionHistory = ref([]);
const isLoadingSubscription = ref(false);
const userRole = ref(localStorage.getItem('userRole') || '');
const isExemptUser = ref(false);
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Invalid phone number format"
    )
    .required("Phone number is required")
    .label("Phone number"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  shopId: yup.string().required("Shop ID is required"),
});

const { handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
});

const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
  "firstName"
);
const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
  "lastName"
);
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: shopId, errorMessage: shopIdErrorMessage } = useField("shopId");

onMounted(() => {
  isLoading.value = true;
  
  // Check if user is exempt from subscription requirements
  const exemptRoles = ['super-admin', 'superadmin', 'admin', 'administrator'];
  isExemptUser.value = exemptRoles.some(role => 
    userRole.value.toLowerCase().includes(role.toLowerCase())
  );
  
  const apiUrl = import.meta.env.VITE_API_URL;
  userId.value = localStorage.getItem("userId");
  const AuthToken = localStorage.getItem("AuthToken");
  const config = {
    headers: { Authorization: `Bearer ${AuthToken}` },
  };

  axios
    .get(`${apiUrl}/user/userdetail/${userId.value}`, config)
    .then((response) => {
      setValues(
        response.data.data
          ? {
              ...response.data.data,
              phone: formatPhoneNumber(response.data.data.phone),
            }
          : {}
      );
      userData.value = response.data.data;
      
      // Load subscription data if not exempt user
      if (!isExemptUser.value) {
        loadSubscriptionData();
      }
      
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      if (error.response && error.response.status === 401) {
        showErrorToast(error.response.data.message);
        localStorage.clear();
        showErrorToast(error.response.message);
        router.push("/login");
      } else if (error.response) {
        showErrorToast(error.response.data.message);
        console.log("An error occurred while fetching data", error);
      } else {
        showErrorToast("Some Error Occured!!!");
        console.log(
          "An error occurred while fetching data. Response was not available.",
          error
        );
      }
    });
});

// Validation functions
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

// API Integration Functions

// 1. Update Password Only
const updatePassword = async () => {
  passwordErrors.value = {};
  
  // Frontend validation
  if (!passwordForm.value.currentPassword) {
    passwordErrors.value.currentPassword = 'Current password is required';
    return;
  }
  
  if (!passwordForm.value.newPassword) {
    passwordErrors.value.newPassword = 'New password is required';
    return;
  }
  
  if (!validatePassword(passwordForm.value.newPassword)) {
    passwordErrors.value.newPassword = 'Password must be at least 6 characters with at least one letter and one number';
    return;
  }
  
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordErrors.value.confirmPassword = 'Passwords do not match';
    return;
  }
  
  if (passwordForm.value.currentPassword === passwordForm.value.newPassword) {
    passwordErrors.value.newPassword = 'New password must be different from current password';
    return;
  }

  isUpdatingPassword.value = true;
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const AuthToken = localStorage.getItem("AuthToken");
    
    const response = await axios.put(
      `${apiUrl}/user/update-password`,
      {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword
      },
      {
        headers: { 
          Authorization: `Bearer ${AuthToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      showSuccessToast('Password updated successfully!');
      // Clear form
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
      passwordErrors.value = {};
    }
  } catch (error) {
    handleApiError(error, 'password');
  } finally {
    isUpdatingPassword.value = false;
  }
};

// 2. Update Username Only
const updateUsername = async () => {
  usernameErrors.value = {};
  
  // Frontend validation
  if (!usernameForm.value.newUsername) {
    usernameErrors.value.newUsername = 'New username is required';
    return;
  }
  
  if (!validateUsername(usernameForm.value.newUsername)) {
    usernameErrors.value.newUsername = 'Username must be 3-30 characters, alphanumeric and underscore only';
    return;
  }
  
  if (usernameForm.value.newUsername === userData.value?.userName) {
    usernameErrors.value.newUsername = 'New username must be different from current username';
    return;
  }

  isUpdatingUsername.value = true;
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const AuthToken = localStorage.getItem("AuthToken");
    
    const response = await axios.put(
      `${apiUrl}/user/update-username`,
      {
        newUsername: usernameForm.value.newUsername
      },
      {
        headers: { 
          Authorization: `Bearer ${AuthToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      showSuccessToast('Username updated successfully!');
      // Update local userData
      userData.value.userName = response.data.data.userName;
      // Clear form
      usernameForm.value = {
        newUsername: ''
      };
      usernameErrors.value = {};
    }
  } catch (error) {
    handleApiError(error, 'username');
  } finally {
    isUpdatingUsername.value = false;
  }
};

// 3. Update Credentials (Username and/or Password)
const updateCredentials = async () => {
  credentialsErrors.value = {};
  
  // Check if at least one field is being updated
  const isUpdatingUsernameField = credentialsForm.value.newUsername && 
    credentialsForm.value.newUsername !== userData.value?.userName;
  const isUpdatingPasswordField = credentialsForm.value.newPassword;
  
  if (!isUpdatingUsernameField && !isUpdatingPasswordField) {
    showErrorToast('Please provide at least one field to update (username or password)');
    return;
  }
  
  // Username validation if provided
  if (isUpdatingUsernameField && !validateUsername(credentialsForm.value.newUsername)) {
    credentialsErrors.value.newUsername = 'Username must be 3-30 characters, alphanumeric and underscore only';
    return;
  }
  
  // Password validation if provided
  if (isUpdatingPasswordField) {
    if (!credentialsForm.value.currentPassword) {
      credentialsErrors.value.currentPassword = 'Current password is required when updating password';
      return;
    }
    
    if (!validatePassword(credentialsForm.value.newPassword)) {
      credentialsErrors.value.newPassword = 'Password must be at least 6 characters with at least one letter and one number';
      return;
    }
    
    if (credentialsForm.value.newPassword !== credentialsForm.value.confirmPassword) {
      credentialsErrors.value.confirmPassword = 'Passwords do not match';
      return;
    }
    
    if (credentialsForm.value.currentPassword === credentialsForm.value.newPassword) {
      credentialsErrors.value.newPassword = 'New password must be different from current password';
      return;
    }
  }

  isUpdatingCredentials.value = true;
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const AuthToken = localStorage.getItem("AuthToken");
    
    const requestBody = {};
    
    if (isUpdatingUsernameField) {
      requestBody.newUsername = credentialsForm.value.newUsername;
    }
    
    if (isUpdatingPasswordField) {
      requestBody.currentPassword = credentialsForm.value.currentPassword;
      requestBody.newPassword = credentialsForm.value.newPassword;
    }
    
    const response = await axios.put(
      `${apiUrl}/user/update-credentials`,
      requestBody,
      {
        headers: { 
          Authorization: `Bearer ${AuthToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      const updatedFields = response.data.data.updatedFields;
      showSuccessToast(`${updatedFields.join(' and ')} updated successfully!`);
      
      // Update local userData if username was changed
      if (updatedFields.includes('username')) {
        userData.value.userName = response.data.data.userName;
      }
      
      // Clear form
      credentialsForm.value = {
        newUsername: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
      credentialsErrors.value = {};
    }
  } catch (error) {
    handleApiError(error, 'credentials');
  } finally {
    isUpdatingCredentials.value = false;
  }
};

// Common error handling function
const handleApiError = (error, formType) => {
  const errorTarget = formType === 'password' ? passwordErrors : 
                    formType === 'username' ? usernameErrors : credentialsErrors;
  
  if (error.response) {
    if (error.response.status === 401) {
      showErrorToast('Session expired. Please login again.');
      localStorage.clear();
      router.push("/login");
    } else if (error.response.status === 400) {
      const errorData = error.response.data;
      
      if (errorData.errors) {
        // Handle validation errors
        errorData.errors.forEach(err => {
          errorTarget.value[err.field] = err.message;
        });
      } else if (errorData.msg) {
        // Handle specific error messages
        if (errorData.msg.includes('Username already exists')) {
          errorTarget.value.newUsername = 'Username already exists';
        } else if (errorData.msg.includes('Current password is incorrect')) {
          errorTarget.value.currentPassword = 'Current password is incorrect';
        } else {
          showErrorToast(errorData.msg);
        }
      }
    } else if (error.response.status === 404) {
      showErrorToast('User not found');
      localStorage.clear();
      router.push("/login");
    } else {
      showErrorToast(error.response.data?.msg || 'An error occurred while updating');
    }
  } else {
    showErrorToast('Network error. Please try again.');
  }
};

// Subscription Functions
const loadSubscriptionData = async () => {
  if (isExemptUser.value) return;
  
  isLoadingSubscription.value = true;
  try {
    // Get current subscription
    const subscriptionResult = await subscriptionService.getCurrentSubscription();
    if (subscriptionResult.success) {
      subscriptionData.value = subscriptionService.formatSubscriptionData(subscriptionResult.data);
    }

    // Get subscription history
    const historyResult = await subscriptionService.getSubscriptionHistory();
    if (historyResult.success) {
      subscriptionHistory.value = historyResult.data || [];
    }
  } catch (error) {
    console.error('Error loading subscription data:', error);
    // Don't show error toast for subscription data loading
  } finally {
    isLoadingSubscription.value = false;
  }
};

const navigateToSubscriptionPlans = () => {
  router.push('/subscription-plans');
};

const getSubscriptionStatusBadge = (status) => {
  const statusConfig = {
    'active': { class: 'bg-success', text: 'Active', icon: 'fas fa-check-circle' },
    'expired': { class: 'bg-danger', text: 'Expired', icon: 'fas fa-exclamation-triangle' },
    'cancelled': { class: 'bg-secondary', text: 'Cancelled', icon: 'fas fa-times-circle' },
    'pending': { class: 'bg-warning', text: 'Pending', icon: 'fas fa-clock' }
  };
  
  return statusConfig[status?.toLowerCase()] || statusConfig['pending'];
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const isSubscriptionExpiring = (daysRemaining) => {
  return daysRemaining <= 7 && daysRemaining > 0;
};

function formatPhoneNumber(input) {
  if (input) {
    let phoneInput = input.replace(/\D+/g, "");
    phoneInput = phoneInput.substring(0, 10);
    if (phoneInput.length >= 4 && phoneInput.length <= 6) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(3)}`;
    } else if (phoneInput.length >= 7) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(
        3,
        6
      )}-${phoneInput.slice(6, 10)}`;
    } else {
      return phoneInput;
    }
  }
  return input;
}

function formatPhoneNumberToDigit(input) {
  let phoneInput = input.replace(/\D+/g, "");
  if (phoneInput.length >= 4 && phoneInput.length <= 6) {
    return phoneInput.slice(0, 3) + phoneInput.slice(3);
  } else if (phoneInput.length >= 7) {
    return (
      phoneInput.slice(0, 3) + phoneInput.slice(3, 6) + phoneInput.slice(6)
    );
  } else {
    return phoneInput;
  }
}
</script>

<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    color="#E6F0FF"
  />
  <div class="px-3">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">User Profile</router-link>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <div class="mt-3">
        <p class="datexlable">Shop ID</p>
        <div class="customerXBox">
          <input disabled :value="shopStr" class="form-control" type="text" />
        </div>
      </div>
    </div>

    <div class="sectionaccomadation mt-2">
      <ul class="link-section">
        <li class="li-drop">
          <div class="accordion accordion-flush" id="accordionesappo">
            <div class="accordion-item">
              <div class="pages">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseProfil"
                  aria-expanded="true"
                >
                  <div class="accomdationset-head">
                    <img class="sidebar-icon" :src="userIcon" alt="userIcon" />
                    <h3>User Profile</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseProfil"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionesappo"
              >
                <div class="">
                  <div class="scrool-delevry">
                    <ul class="nav nav-nav nav-tabs">
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ 'show active': activeTab === 'profile' }"
                          @click="activeTab = 'profile'"
                          href="#profile"
                          >User Profile</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ 'show active': activeTab === 'password' }"
                          @click="activeTab = 'password'"
                          href="#password"
                          >Update Password</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ 'show active': activeTab === 'username' }"
                          @click="activeTab = 'username'"
                          href="#username"
                          >Update Username</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ 'show active': activeTab === 'credentials' }"
                          @click="activeTab = 'credentials'"
                          href="#credentials"
                          >Update Both</a
                        >
                      </li>
                      <li v-if="!isExemptUser" class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ 'show active': activeTab === 'subscription' }"
                          @click="activeTab = 'subscription'; loadSubscriptionData()"
                          href="#subscription"
                          >Subscription
                          <span v-if="subscriptionData && isSubscriptionExpiring(subscriptionData.daysRemaining)" 
                                class="badge bg-warning ms-1">!</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <!-- Profile Tab Content -->
                  <div v-show="activeTab === 'profile'" class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
                    <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
                      <div class="mt-3">
                        <p class="datexlable">User Id</p>
                        <div class="customerXBox">
                          <input
                            class="form-control"
                            type="text"
                            :value="userData?.userName"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="mt-3">
                        <p class="datexlable">First name</p>
                        <div class="customerXBox">
                          <input
                            v-model="firstName"
                            class="form-control"
                            type="text"
                            disabled
                          />
                          <span class="errors">{{
                            firstNameErrorMessage
                          }}</span>
                        </div>
                      </div>
                      <div class="mt-3">
                        <p class="datexlable">Last name</p>
                        <div class="customerXBox">
                          <input
                            v-model="lastName"
                            class="form-control"
                            type="text"
                            disabled
                          />
                          <span class="errors">{{ lastNameErrorMessage }}</span>
                        </div>
                      </div>
                      <div class="mt-3">
                        <p class="datexlable">Phone / Cell 1</p>
                        <div class="customerXBox">
                          <input
                            v-model="phone"
                            @input="() => (phone = formatPhoneNumber(phone))"
                            class="form-control"
                            type="text"
                            disabled
                          />
                          <span class="errors">{{ phoneErrorMessage }}</span>
                        </div>
                      </div>

                      <div class="mt-3">
                        <p class="datexlable">Email Address</p>
                        <div class="customerXBox">
                          <input
                            v-model="email"
                            class="form-control"
                            type="text"
                            disabled
                          />
                          <span class="errors">{{ emailErrorMessage }}</span>
                        </div>
                      </div>
                      <p class="mt-5" :style="{ color: '#FF8100' }">
                        Contact your shop admin to update profile information.
                      </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec">
                      <div class="mt-3">
                        <p class="datexlable">Current Password</p>
                        <div class="customerXBox">
                          <input
                            :value="userData?.showPassword"
                            class="form-control"
                            type="password"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="mt-4 p-3" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
                        <h5 style="color: #007bff; margin-bottom: 15px;">
                          <i class="fas fa-key me-2"></i>Update Options Available
                        </h5>
                        <p class="mb-2">Use the tabs above to:</p>
                        <ul class="mb-0">
                          <li><strong>Update Password:</strong> Change your password securely</li>
                          <li><strong>Update Username:</strong> Change your username</li>
                          <li><strong>Update Both:</strong> Change username and password together</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Password Update Tab Content -->
                  <div v-show="activeTab === 'password'" class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
                    <div class="col-sm-12 col-lg-8">
                      <div class="card">
                        <div class="card-header bg-primary text-white">
                          <h5 class="mb-0"><i class="fas fa-lock me-2"></i>Update Password</h5>
                        </div>
                        <div class="card-body">
                          <form @submit.prevent="updatePassword">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">Current Password *</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="passwordForm.currentPassword"
                                      class="form-control"
                                      :class="{ 'is-invalid': passwordErrors.currentPassword }"
                                      type="password"
                                      placeholder="Enter current password"
                                      :disabled="isUpdatingPassword"
                                    />
                                    <span v-if="passwordErrors.currentPassword" class="errors">
                                      {{ passwordErrors.currentPassword }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">New Password *</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="passwordForm.newPassword"
                                      class="form-control"
                                      :class="{ 'is-invalid': passwordErrors.newPassword }"
                                      type="password"
                                      placeholder="Enter new password"
                                      :disabled="isUpdatingPassword"
                                    />
                                    <span v-if="passwordErrors.newPassword" class="errors">
                                      {{ passwordErrors.newPassword }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">Confirm New Password *</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="passwordForm.confirmPassword"
                                      class="form-control"
                                      :class="{ 'is-invalid': passwordErrors.confirmPassword }"
                                      type="password"
                                      placeholder="Confirm new password"
                                      :disabled="isUpdatingPassword"
                                    />
                                    <span v-if="passwordErrors.confirmPassword" class="errors">
                                      {{ passwordErrors.confirmPassword }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3 pt-4">
                                  <button
                                    type="submit"
                                    class="btn btn-primary w-100"
                                    :disabled="isUpdatingPassword"
                                  >
                                    <span v-if="isUpdatingPassword">
                                      <i class="fas fa-spinner fa-spin me-2"></i>Updating...
                                    </span>
                                    <span v-else>
                                      <i class="fas fa-save me-2"></i>Update Password
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <!-- Password Requirements -->
                            <div class="mt-4 p-3" style="background-color: #f8f9fa; border-radius: 8px;">
                              <h6 style="color: #007bff;">Password Requirements:</h6>
                              <ul class="small mb-0">
                                <li>At least 6 characters long</li>
                                <li>Contains at least one letter (a-z or A-Z)</li>
                                <li>Contains at least one number (0-9)</li>
                                <li>May include special characters (@$!%*?&)</li>
                              </ul>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Username Update Tab Content -->
                  <div v-show="activeTab === 'username'" class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
                    <div class="col-sm-12 col-lg-8">
                      <div class="card">
                        <div class="card-header bg-success text-white">
                          <h5 class="mb-0"><i class="fas fa-user me-2"></i>Update Username</h5>
                        </div>
                        <div class="card-body">
                          <form @submit.prevent="updateUsername">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">Current Username</p>
                                  <div class="customerXBox">
                                    <input
                                      :value="userData?.userName"
                                      class="form-control"
                                      type="text"
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">New Username *</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="usernameForm.newUsername"
                                      class="form-control"
                                      :class="{ 'is-invalid': usernameErrors.newUsername }"
                                      type="text"
                                      placeholder="Enter new username"
                                      :disabled="isUpdatingUsername"
                                    />
                                    <span v-if="usernameErrors.newUsername" class="errors">
                                      {{ usernameErrors.newUsername }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div class="row mt-3">
                              <div class="col-md-12">
                                <button
                                  type="submit"
                                  class="btn btn-success"
                                  :disabled="isUpdatingUsername"
                                >
                                  <span v-if="isUpdatingUsername">
                                    <i class="fas fa-spinner fa-spin me-2"></i>Updating...
                                  </span>
                                  <span v-else>
                                    <i class="fas fa-save me-2"></i>Update Username
                                  </span>
                                </button>
                              </div>
                            </div>
                            
                            <!-- Username Requirements -->
                            <div class="mt-4 p-3" style="background-color: #f8f9fa; border-radius: 8px;">
                              <h6 style="color: #28a745;">Username Requirements:</h6>
                              <ul class="small mb-0">
                                <li>3-30 characters long</li>
                                <li>Only letters (a-z, A-Z), numbers (0-9), and underscores (_)</li>
                                <li>Must be unique (not already taken)</li>
                              </ul>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Combined Credentials Update Tab Content -->
                  <div v-show="activeTab === 'credentials'" class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
                    <div class="col-sm-12 col-lg-10">
                      <div class="card">
                        <div class="card-header bg-warning text-dark">
                          <h5 class="mb-0"><i class="fas fa-cogs me-2"></i>Update Username & Password</h5>
                        </div>
                        <div class="card-body">
                          <form @submit.prevent="updateCredentials">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">Current Username</p>
                                  <div class="customerXBox">
                                    <input
                                      :value="userData?.userName"
                                      class="form-control"
                                      type="text"
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">New Username (optional)</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="credentialsForm.newUsername"
                                      class="form-control"
                                      :class="{ 'is-invalid': credentialsErrors.newUsername }"
                                      type="text"
                                      placeholder="Enter new username or leave empty"
                                      :disabled="isUpdatingCredentials"
                                    />
                                    <span v-if="credentialsErrors.newUsername" class="errors">
                                      {{ credentialsErrors.newUsername }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">Current Password (required if updating password)</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="credentialsForm.currentPassword"
                                      class="form-control"
                                      :class="{ 'is-invalid': credentialsErrors.currentPassword }"
                                      type="password"
                                      placeholder="Enter current password"
                                      :disabled="isUpdatingCredentials"
                                    />
                                    <span v-if="credentialsErrors.currentPassword" class="errors">
                                      {{ credentialsErrors.currentPassword }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">New Password (optional)</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="credentialsForm.newPassword"
                                      class="form-control"
                                      :class="{ 'is-invalid': credentialsErrors.newPassword }"
                                      type="password"
                                      placeholder="Enter new password or leave empty"
                                      :disabled="isUpdatingCredentials"
                                    />
                                    <span v-if="credentialsErrors.newPassword" class="errors">
                                      {{ credentialsErrors.newPassword }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                  <p class="datexlable">Confirm New Password</p>
                                  <div class="customerXBox">
                                    <input
                                      v-model="credentialsForm.confirmPassword"
                                      class="form-control"
                                      :class="{ 'is-invalid': credentialsErrors.confirmPassword }"
                                      type="password"
                                      placeholder="Confirm new password"
                                      :disabled="isUpdatingCredentials || !credentialsForm.newPassword"
                                    />
                                    <span v-if="credentialsErrors.confirmPassword" class="errors">
                                      {{ credentialsErrors.confirmPassword }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3 pt-4">
                                  <button
                                    type="submit"
                                    class="btn btn-warning w-100"
                                    :disabled="isUpdatingCredentials"
                                  >
                                    <span v-if="isUpdatingCredentials">
                                      <i class="fas fa-spinner fa-spin me-2"></i>Updating...
                                    </span>
                                    <span v-else>
                                      <i class="fas fa-save me-2"></i>Update Credentials
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <!-- Combined Requirements -->
                            <div class="mt-4 p-3" style="background-color: #f8f9fa; border-radius: 8px;">
                              <h6 style="color: #856404;">Update Requirements:</h6>
                              <div class="row">
                                <div class="col-md-6">
                                  <strong>Username:</strong>
                                  <ul class="small mb-2">
                                    <li>3-30 characters</li>
                                    <li>Letters, numbers, underscores only</li>
                                    <li>Must be unique</li>
                                  </ul>
                                </div>
                                <div class="col-md-6">
                                  <strong>Password:</strong>
                                  <ul class="small mb-0">
                                    <li>At least 6 characters</li>
                                    <li>At least one letter and one number</li>
                                    <li>Current password required</li>
                                  </ul>
                                </div>
                              </div>
                              <div class="mt-2">
                                <small class="text-muted">
                                  <i class="fas fa-info-circle me-1"></i>
                                  You can update username only, password only, or both together. At least one field must be provided.
                                </small>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Subscription Tab Content -->
                  <div v-show="activeTab === 'subscription'" class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
                    <div class="col-12">
                      <!-- Current Subscription Card -->
                      <div class="card mb-4">
                        <div class="card-header bg-info text-white">
                          <h5 class="mb-0">
                            <i class="fas fa-credit-card me-2"></i>Current Subscription
                          </h5>
                        </div>
                        <div class="card-body">
                          <div v-if="isLoadingSubscription" class="text-center py-4">
                            <i class="fas fa-spinner fa-spin fa-2x text-muted"></i>
                            <p class="mt-2 text-muted">Loading subscription data...</p>
                          </div>
                          
                          <div v-else-if="!subscriptionData" class="text-center py-4">
                            <div class="mb-3">
                              <i class="fas fa-exclamation-triangle fa-3x text-warning"></i>
                            </div>
                            <h4>No Active Subscription</h4>
                            <p class="text-muted">You don't have an active subscription. Subscribe to access all features.</p>
                            <button 
                              @click="navigateToSubscriptionPlans"
                              class="btn btn-primary btn-lg"
                            >
                              <i class="fas fa-shopping-cart me-2"></i>
                              View Subscription Plans
                            </button>
                          </div>
                          
                          <div v-else>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="subscription-info">
                                  <h4 class="text-primary">{{ subscriptionData.planName }}</h4>
                                  <div class="d-flex align-items-center mb-2">
                                    <span class="badge me-2" :class="getSubscriptionStatusBadge(subscriptionData.status).class">
                                      <i :class="getSubscriptionStatusBadge(subscriptionData.status).icon + ' me-1'"></i>
                                      {{ getSubscriptionStatusBadge(subscriptionData.status).text }}
                                    </span>
                                    <span v-if="subscriptionData.isOnTrial" class="badge bg-secondary">
                                      <i class="fas fa-gift me-1"></i>Trial
                                    </span>
                                  </div>
                                  
                                  <div class="subscription-details">
                                    <p class="mb-1">
                                      <strong>Price:</strong> 
                                      {{ subscriptionData.currency }} {{ subscriptionData.price }} / {{ subscriptionData.billingCycle }}
                                    </p>
                                    <p class="mb-1">
                                      <strong>Start Date:</strong> {{ subscriptionData.startDate }}
                                    </p>
                                    <p class="mb-1">
                                      <strong>End Date:</strong> {{ subscriptionData.endDate }}
                                    </p>
                                    <p class="mb-3">
                                      <strong>Days Remaining: </strong> 
                                      <span :class="{ 'text-danger': isSubscriptionExpiring(subscriptionData.daysRemaining), 'text-success': !isSubscriptionExpiring(subscriptionData.daysRemaining) }">
                                        {{ subscriptionData.daysRemaining }} days
                                      </span>
                                    </p>
                                    
                                    <!-- Expiration Warning -->
                                    <div v-if="isSubscriptionExpiring(subscriptionData.daysRemaining)" 
                                         class="alert alert-warning">
                                      <i class="fas fa-exclamation-triangle me-2"></i>
                                      Your subscription is expiring soon! Consider renewing to avoid service interruption.
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div class="col-md-6">
                                <div class="plan-features">
                                  <h5>Plan Features:</h5>
                                  <ul v-if="subscriptionData.features && subscriptionData.features.length > 0" 
                                      class="feature-list">
                                    <li v-for="(feature, index) in subscriptionData.features" :key="index">
                                      <i class="fas fa-check text-success me-2"></i>
                                      {{ feature.name }}
                                    </li>
                                  </ul>
                                  <p v-else class="text-muted">No specific features listed.</p>
                                  
                                  <div class="mt-3">
                                    <button 
                                      @click="navigateToSubscriptionPlans"
                                      class="btn btn-outline-primary me-2"
                                    >
                                      <i class="fas fa-sync-alt me-1"></i>
                                      Change Plan
                                    </button>
                                    <button 
                                      @click="loadSubscriptionData"
                                      class="btn btn-outline-secondary"
                                      :disabled="isLoadingSubscription"
                                    >
                                      <i class="fas fa-refresh me-1"></i>
                                      Refresh
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Subscription History Card -->
                      <div v-if="subscriptionData" class="card">
                        <div class="card-header bg-secondary text-white">
                          <h5 class="mb-0">
                            <i class="fas fa-history me-2"></i>Subscription History
                          </h5>
                        </div>
                        <div class="card-body">
                          <div v-if="subscriptionHistory.length === 0" class="text-center py-4">
                            <i class="fas fa-inbox fa-2x text-muted"></i>
                            <p class="mt-2 text-muted">No subscription history available.</p>
                          </div>
                          
                          <div v-else>
                            <div class="table-responsive">
                              <table class="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Plan</th>
                                    <th>Status</th>
                                    <th>Duration</th>
                                    <th>Amount</th>
                                    <th>Transaction</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="subscription in subscriptionHistory" :key="subscription._id">
                                    <td>
                                      <strong>{{ subscription.planId?.name || 'Unknown Plan' }}</strong>
                                      <br>
                                      <small class="text-muted">{{ subscription.planId?.billingCycle || 'N/A' }}</small>
                                    </td>
                                    <td>
                                      <span class="badge" :class="getSubscriptionStatusBadge(subscription.status).class">
                                        {{ getSubscriptionStatusBadge(subscription.status).text }}
                                      </span>
                                    </td>
                                    <td>
                                      <small>
                                        {{ formatDate(subscription.startDate) }}
                                        <br>
                                        to {{ formatDate(subscription.endDate) }}
                                      </small>
                                    </td>
                                    <td>
                                      <strong>{{ subscription.planId?.currency || '$' }} {{ subscription.planId?.price || '0.00' }}</strong>
                                    </td>
                                    <td>
                                      <strong>{{ subscription.paymentHistory[0]?.paymentIntentId || 'N/A' }}</strong>
                                    </td>
                                    <td>
                                      <div v-if="subscription.paymentHistory && subscription.paymentHistory.length > 0">
                                        <small v-for="payment in subscription.paymentHistory" :key="payment.transactionId" class="d-block">
                                          <code>{{ payment.transactionId }}</code>
                                          <br>
                                          <span class="badge" :class="payment.paymentStatus === 'completed' ? 'bg-success' : 'bg-warning'">
                                            {{ payment.paymentStatus }}
                                          </span>
                                        </small>
                                      </div>
                                      <small v-else class="text-muted">No transactions</small>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.errors {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

/* Enhanced Tab Styling */
.nav-tabs .nav-link {
  border: 1px solid transparent;
  color: #6c757d;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
  color: #007bff;
}

.nav-tabs .nav-link.active {
  color: #007bff;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  font-weight: 600;
}

/* Card Enhancements */
.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 2rem;
}

.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  font-weight: 600;
}

/* Form Control Enhancements */
.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

/* Button Enhancements */
.btn {
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  border-color: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 123, 255, 0.25);
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover:not(:disabled) {
  background-color: #218838;
  border-color: #218838;
  transform: translateY(-1px);
  box-shadow: 0 0.25rem 0.5rem rgba(40, 167, 69, 0.25);
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

.btn-warning:hover:not(:disabled) {
  background-color: #e0a800;
  border-color: #e0a800;
  color: #212529;
  transform: translateY(-1px);
  box-shadow: 0 0.25rem 0.5rem rgba(255, 193, 7, 0.25);
}

/* Loading Animation */
.fa-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Requirements Box Styling */
.requirements-box {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 4px solid #007bff;
}

/* Tab Content Animation */
.tab-content-panel {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Improvements */
@media (max-width: 768px) {
  .nav-tabs {
    flex-wrap: wrap;
  }
  
  .nav-tabs .nav-link {
    font-size: 14px;
    padding: 0.5rem 0.75rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}

/* Custom Scrollbar for Tab Navigation */
.scrool-delevry::-webkit-scrollbar {
  height: 4px;
}

.scrool-delevry::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scrool-delevry::-webkit-scrollbar-thumb {
  background: #007bff;
  border-radius: 4px;
}

.scrool-delevry::-webkit-scrollbar-thumb:hover {
  background: #0056b3;
}

/* Enhanced Input Focus States */
.customerXBox .form-control:focus + .input-decoration {
  transform: scaleX(1);
}

.input-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #007bff, #6610f2);
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

/* Subscription Specific Styles */
.subscription-info h4 {
  margin-bottom: 15px;
}

.subscription-details p {
  margin-bottom: 8px;
  color: #495057;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 5px 0;
  color: #495057;
}

.plan-features h5 {
  color: #495057;
  font-weight: 600;
  margin-bottom: 15px;
}

/* Subscription Status Badges */
.badge {
  font-size: 12px;
  font-weight: 500;
}

/* Table Enhancements */
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.table th {
  font-weight: 600;
  color: #495057;
  border-top: none;
}

.table td {
  vertical-align: middle;
}

/* Warning Alert Styling */
.alert-warning {
  border-left: 4px solid #ffc107;
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

/* Loading Spinner */
.fa-spinner.fa-spin {
  animation: spin 1s linear infinite;
}

/* Code styling for transaction IDs */
code {
  background-color: #f8f9fa;
  color: #e83e8c;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

/* Subscription Tab Badge */
.nav-link .badge {
  font-size: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Empty State Icons */
.fas.fa-inbox, .fas.fa-exclamation-triangle {
  opacity: 0.6;
}

/* Subscription card hover effects */
.card {
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Status Indicators */
.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-success {
  background-color: #28a745;
}

.status-warning {
  background-color: #ffc107;
}

.status-danger {
  background-color: #dc3545;
}

/* Icon Enhancements */
.fas {
  margin-right: 0.5rem;
}

/* Custom Badge Styles */
.badge-custom {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.875rem;
}

/* Tooltip Enhancement */
.tooltip-hint {
  position: relative;
  cursor: help;
}

.tooltip-hint::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  font-size: 12px;
  z-index: 1000;
}

.tooltip-hint:hover::after {
  opacity: 1;
}
</style>
