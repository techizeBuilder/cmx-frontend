<!-- shop profile -->
<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template #content-0>
      <v-container v-if="currentTab === 1" ref="tabContentRefs[0]" class="pa-0" style="margin-top:0;padding-top:0;">
        <v-row
          justify="center"
          class="my-4"
        >
          <v-col cols="6">
            <p class="font-16">
              Shop ID: {{ shopProfileDetails?.shopId || 'XXXXX' }}
            </p>
          </v-col>
          <v-col
            cols="6"
            class="d-flex justify-end ga-3"
          >
            <custom-btn
              v-if="!disableForm[0]"
              id="cancel-btn"
              color="btn"
              prepend-icon="cancel"
              :disabled="isLoading"
              @click="disableForm[0] = true"
            >
              Cancel
            </custom-btn>
            <custom-btn
              id="edit-shop-details"
              :color="disableForm[0] ? 'btn' : 'myGreen'"
              :prepend-icon="disableForm[0] ? 'edit' : 'save'"
              :loading="isLoading"
              @click="
                disableForm[0]
                  ? (disableForm[0] = false)
                  : saveShopDetails(0)
              "
            >
              {{ disableForm[0] ? 'Edit' : 'Save' }}
            </custom-btn>
          </v-col>
          <generic-form-cols
            ref="shopProfileFormRefs"
            :disabled="disableForm[0]"
            :data="shopProfileDetails"
            :forms-config="shopDetailsFieldConfig"
          />
        </v-row>
      </v-container>
    </template>

    <template #content-1>
      <v-container v-if="currentTab === 2" ref="tabContentRefs[1]" class="pa-0" style="margin-top:0;padding-top:0;">
        <v-row justify="center" class="my-4">
          <v-col
            cols="12"
            class="d-flex justify-end ga-3"
          >
            <custom-btn
              v-if="!disableForm[1]"
              id="cancel-btn"
              color="btn"
              prepend-icon="cancel"
              :disabled="isLoading"
              @click="disableForm[1] = true"
            >
              Cancel
            </custom-btn>
            <custom-btn
              id="edit-shop-logo"
              :loading="isLoading"
              :color="disableForm[1] ? 'btn' : 'myGreen'"
              :prepend-icon="disableForm[1] ? 'edit' : 'save'"
              @click="
                disableForm[1]
                  ? (disableForm[1] = false)
                  : uploadLogo()
              "
            >
              {{ disableForm[1] ? 'Edit' : 'Save' }}
            </custom-btn>
          </v-col>
          <v-col
            cols="12"
            class="pb-0"
          >
            <p class="font-16">Shop Logo Upload</p>
          </v-col>
          <v-col
            cols="3"
            class="pt-0"
          >
            <v-file-upload
              v-model="uploadedLogo"
              clearable
              :disabled="disableForm[1]"
              accept=".png, .jpeg, .svg"
            >
              <template #icon>
                <v-icon size="46"> mdi-cloud-upload-outline </v-icon>
              </template>
              <!-- <template #title>
                <p class="font-16">Drag and drop file here!</p>
              </template> -->
              <template #browse="{ props }">
                <custom-btn
                  id="browse-files"
                  color="grey-darken-3"
                  v-bind="props"
                >
                  Browse Files
                </custom-btn>
              </template>
            </v-file-upload>
          </v-col>
          <v-col
            cols="3"
            class="pt-0"
          >
            <div
              class="border-md w-100 d-flex flex-column align-center px-2 p-2"
            >
              <div
                v-if="shopLogoImgConfig.success"
                class="w-100"
              >
                <custom-btn
                  id="remove-icon-btn"
                  icon
                  height="25"
                  max-width="25"
                  color="grey-darken-3"
                  class="float-right"
                  :loading="isLoading"
                  style="padding: 0 !important"
                  @click="removeShopLogo"
                >
                  <v-icon>mdi-close</v-icon>
                </custom-btn>
              </div>
              <v-img
                v-if="shopLogoImgConfig.success"
                :src="`${apiUrl}${shopProfileDetails.shopLogo}`"
                :lazy-src="`${apiUrl}${shopProfileDetails.shopLogo}`"
                max-width="150"
                max-height="150"
                width="150"
                height="150"
                alt="shop-logo"
              >
                <template v-slot:placeholder>
                  <div
                    class="d-flex align-center justify-center fill-height"
                  >
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
              <p
                v-else
                class="font-weight-medium mb-0"
              >
                {{ shopLogoImgConfig.text }}
              </p>
            </div>
            <p
              v-if="shopLogoImgConfig.success"
              class="font-weight-medium mb-0"
            >
              {{ shopLogoImgConfig.text }}
            </p>
            <p class="font-weight-medium text-grey">
              {{ logoImageType }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- <template #content-2>
      <v-container v-if="currentTab === 3" ref="tabContentRefs[2]" class="pa-0" style="margin-top:0;padding-top:0;">
        <v-row justify="center" class="my-4">
          <v-col
            cols="12"
            class="d-flex justify-end ga-3"
          >
            <custom-btn
              v-if="!disableForm[2]"
              id="cancel-btn"
              color="btn"
              prepend-icon="cancel"
              :disabled="isLoading"
              @click="disableForm[2] = true"
            >
              Cancel
            </custom-btn>
            <custom-btn
              id="edit-shop-logo"
              :color="disableForm[2] ? 'btn' : 'myGreen'"
              :prepend-icon="disableForm[2] ? 'edit' : 'save'"
              @click="
                disableForm[2]
                  ? (disableForm[2] = false)
                  : saveShopDetails(2)
              "
            >
              {{ disableForm[2] ? 'Edit' : 'Save' }}
            </custom-btn>
          </v-col>

          <v-col cols="12">
            <generic-form
              ref="shopProfileFormRefs"
              :fields-config="shopAdminFieldConfig"
              :disabled="disableForm[2]"
              :data="shopProfileDetails"
            />
          </v-col>
        </v-row>
      </v-container>
    </template> -->

    <!-- <template #content-3>
      <shop-default-labor-rates />
    </template>

    <template #content-4>
      <v-container>
        <v-row>
          <v-col cols="12">
            <p>Contact Support to update default</p>
          </v-col>

          <v-col cols="12">
            <generic-form
              ref="shopProfileFormRefs"
              class="ro-settings-component"
              :fields-config="shopROCustomSettings"
              :disabled="disableForm[3]"
              :data="{
                customerNumber: '001',
                invoiceNumber: '001',
                estimateNumber: '10001',
                purchaseOrderNumber: '500',
                repairOrderNumber: '10100',
                vendorNumber: '701',
              }"
              :row-props="{
                style: {
                  columnGap: '45px',
                },
              }"
            />
          </v-col>
        </v-row>
      </v-container>
    </template> -->
  </custom-tabs>
</template>

<script setup>
import { onMounted, ref, watch, computed, nextTick } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';

// API Configuration
const apiUrl = import.meta.env.VITE_API_URL;
import GenericForm from '@/shared/forms/GenericForm.vue';
import GenericFormCols from '@/components/GenericFormCols.vue';
import { useStore } from 'vuex';
import { isArray, isEmpty, isEqual } from 'lodash';
import { handleError } from '@/handleError';
import { showErrorToast, showSuccessToast } from '@/toster';
import { formatPhoneNumberToDigit } from '@/composables';
import axios from 'axios';
import ShopDefaultLaborRates from '@/components/ShopAdmin/ShopDefaultLaborRates.vue';

const store = useStore();
const shopId = localStorage.getItem('shopIdStr');
const authToken = localStorage.getItem('authToken');
const uploadedLogo = ref(null);
const shopProfileFormRefs = ref(null);
const disableForm = ref([true, true, true, true, true]); // One per tab
const isLoading = ref(true);
const shopProfileDetails = ref({});
const currentTab = ref(1);
const tabs = ref([
  {
    title: 'Shop Details',
    genericFormsCount: 3,
  },
  {
    title: 'Shop Logo',
  },
  // {
  //   title: 'Shop Admin',
  //   genericFormsCount: 1,
  // },
  // {
  //   title: 'Shop Default Labor Rates',
  // },
  // {
  //   title: 'Shop RO Settings',
  // },
]);
const shopDetailsFieldConfig = ref([
  {
    cols: 3,
    config: [
      {
        id: 'shopName',
        vModel: 'name', // Changed from 'shopName' to 'name'
        name: 'name',
        label: 'Shop Name',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'shopPhone',
        vModel: 'phone', // Changed from 'phone1' to 'phone'
        name: 'phone',
        label: 'Shop Phone',
        type: 'phoneNumber',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'shopEmail',
        vModel: 'email',
        name: 'email',
        label: 'Shop Email',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
      },
      {
        id: 'shopWebsite',
        vModel: 'website',
        name: 'website',
        label: 'Shop Website',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
    ],
  },
  {
    divider: true,
    cols: 1,
  },
  {
    cols: 3,
    config: [
      {
        id: 'address',
        vModel: 'street', // Changed from 'address' to 'street'
        name: 'street',
        label: 'Street Address', // Updated label
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'city',
        vModel: 'city',
        name: 'city',
        label: 'City',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'state',
        vModel: 'state',
        name: 'state',
        label: 'State',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'zipCode',
        vModel: 'zipCode',
        name: 'zipCode',
        label: 'Zip Code',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'country',
        vModel: 'country',
        name: 'country',
        label: 'Country',
        type: 'select',
        items: ['USA'],
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
    ],
  },
  {
    divider: true,
    cols: 1,
  },
  {
    cols: 3,
    config: [
      {
        id: 'country',
        vModel: 'country',
        name: 'country',
        label: 'Country',
        strongLabel: true,
        bgColor: 'secondary',
        type: 'select',
        items: ['USA'],
        cols: 12,
        required: true,
      },
      {
        id: 'timeZone',
        vModel: 'timeZone',
        name: 'timeZone',
        label: 'Time Zone',
        strongLabel: true,
        bgColor: 'secondary',
        type: 'select',
        items: [
          'America/New_York',    // EST/EDT
          'America/Chicago',     // CST/CDT  
          'America/Denver',      // MST/MDT
          'America/Los_Angeles', // PST/PDT
          'Pacific/Honolulu',    // HST
        ],
        listProps: {
          minWidth: '700px',
        },
        cols: 12,
        required: true,
      },
      {
        id: 'dateFormat',
        vModel: 'dateFormat',
        name: 'dateFormat',
        label: 'Date Format',
        strongLabel: true,
        bgColor: 'secondary',
        type: 'select',
        items: ['MM/DD/YYYY'],
        cols: 12,
        required: true,
      },
      {
        id: 'timeFormat',
        vModel: 'timeFormat',
        name: 'timeFormat',
        label: 'Time Format',
        strongLabel: true,
        bgColor: 'secondary',
        type: 'select',
        items: ['HH:MM AM/PM'],
        cols: 12,
        required: true,
      },
    ],
  },
]);
const shopAdminFieldConfig = ref([
  {
    id: 'adminContactName',
    vModel: 'adminName', // Changed to match admin.name
    label: 'Admin Contact Name',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 12,
    class: 'd-flex flex-column w-50',
    required: true,
  },
  {
    id: 'adminContactPhone',
    vModel: 'adminPhone', // Changed to match admin.phone
    label: 'Admin Contact Phone#',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 12,
    class: 'd-flex flex-column w-50',
    required: true,
    type: 'phoneNumber',
  },
  {
    id: 'adminEmail',
    vModel: 'adminEmail', // Changed to match admin.email
    label: 'Admin Email',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 12,
    class: 'd-flex flex-column w-50',
    required: true,
  },
]);
const shopROCustomSettings = ref([
  {
    id: 'customerNumber',
    vModel: 'customerNumber',
    label: 'Customer #',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 3,
    prefix: 'C',
  },
  {
    id: 'invoiceNumber',
    vModel: 'invoiceNumber',
    label: 'Invoice #',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 3,
    prefix: 'INV',
  },
  {
    cols: 4,
  },
  {
    id: 'estimateNumber',
    vModel: 'estimateNumber',
    label: 'Estimate #',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 3,
    prefix: 'E',
  },
  {
    id: 'purchaseOrderNumber',
    vModel: 'purchaseOrderNumber',
    label: 'Purchase Order #',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 3,
    prefix: 'PO',
  },
  {
    cols: 4,
  },
  {
    id: 'repairOrderNumber',
    vModel: 'repairOrderNumber',
    label: 'Repair Order #',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 3,
    prefix: 'RO',
  },
  {
    id: 'vendorNumber',
    vModel: 'vendorNumber',
    label: 'Vendor #',
    strongLabel: true,
    bgColor: 'secondary',
    cols: 3,
    prefix: 'V',
  },
]);

const shopLogoImgConfig = computed(() => {
  const fileName = shopProfileDetails.value.shopLogo
    ?.split('/')
    ?.pop();
  return fileName
    ? { text: fileName, success: true }
    : {
        text: 'No logo uploaded yet!',
        success: false,
      };
});
const logoImageType = computed(() => {
  const fileTypes = {
    png: 'image/png',
  };
  return fileTypes[shopLogoImgConfig.value.text.split('.').pop()];
});

const fetchData = async (forceFetch = false) => {
  isLoading.value = true;
  try {
    const data = await store.dispatch('fetchShopDetails', forceFetch);
    if (isEmpty(data)) {
      return handleError(new Error('No data received'));
    }
    
    // Map the nested API response to flat structure for form fields
    const mappedData = {
      // Basic shop info
      name: data.name,
      shopId: data.shopId,
      shopLogo: data.logo,
      
      // Contact info (from contact object)
      phone: data.contact?.phone,
      email: data.contact?.email,
      website: data.contact?.website,
      
      // Address info (from address object)
      street: data.address?.street,
      city: data.address?.city,
      state: data.address?.state,
      zipCode: data.address?.zipCode,
      country: data.address?.country,
      
      // Settings info (from settings object)
      timeZone: data.settings?.timeZone,
      dateFormat: data.settings?.dateFormat,
      timeFormat: data.settings?.timeFormat,
      
      // Admin info (from admin object)
      adminName: data.admin?.name,
      adminPhone: data.admin?.phone,
      adminEmail: data.admin?.email,
    };
    
    shopProfileDetails.value = mappedData;
    isLoading.value = false;
  } catch (error) {
    handleError(error);
    isLoading.value = false;
  }
};
const uploadShopDetails = async (payload, removeLogo = false, tabIdx) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    
    // Add shop details to FormData
    formData.append('shopName', payload.name || '');
    formData.append('shopPhone', formatPhoneNumberToDigit(payload.phone) || '');
    formData.append('shopEmail', payload.email || '');
    formData.append('shopWebsite', payload.website || '');
    
    // Add address details
    formData.append('address', payload.street || '');
    formData.append('city', payload.city || '');
    formData.append('state', payload.state || '');
    formData.append('zipCode', payload.zipCode || '');
    formData.append('country', payload.country || '');
    
    // Add settings
    formData.append('timeZone', payload.timeZone || '');
    formData.append('dateFormat', payload.dateFormat || '');
    formData.append('timeFormat', payload.timeFormat || '');
    
    // Add admin details
    formData.append('adminName', payload.adminName || '');
    formData.append('adminPhone', formatPhoneNumberToDigit(payload.adminPhone) || '');
    formData.append('adminEmail', payload.adminEmail || '');

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`${apiUrl}/user/shops/${shopId}`, formData, config);
    
    if (!response.data.success) {
      showErrorToast('Failed to update shop details');
      return;
    }

    await fetchData(true);
    showSuccessToast('Shop details updated successfully');
    disableForm.value[tabIdx] = true;
  } catch (error) {
    console.error('Error updating shop details:', error);
    if (error.response?.data?.message) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast('Failed to update shop details');
    }
  } finally {
    isLoading.value = false;
  }
};
const uploadLogo = async (removeLogo = false, tabIdx = 1) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    
    // Add logo file if uploading new logo
    if (uploadedLogo.value && !removeLogo) {
      formData.append('logo', uploadedLogo.value);
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`${apiUrl}/user/shops/${shopId}`, formData, config);
    
    if (!response.data.success) {
      showErrorToast('Failed to update shop logo');
      return;
    }

    uploadedLogo.value = null;
    await fetchData(true);
    showSuccessToast('Shop logo updated successfully');
    disableForm.value[tabIdx] = true;
  } catch (error) {
    console.error('Error updating shop logo:', error);
    if (error.response?.data?.message) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast('Failed to update shop logo');
    }
  } finally {
    isLoading.value = false;
  }
};

// Dedicated function for logo updates only
const updateShopLogo = async (logoFile, tabIdx = 1) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`${apiUrl}/user/shops/${shopId}`, formData, config);
    
    if (!response.data.success) {
      showErrorToast('Failed to update logo');
      return false;
    }

    await fetchData(true);
    showSuccessToast('Logo updated successfully');
    if (tabIdx !== null) {
      disableForm.value[tabIdx] = true;
    }
    return true;
  } catch (error) {
    console.error('Error updating logo:', error);
    if (error.response?.data?.message) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast('Failed to update logo');
    }
    return false;
  } finally {
    isLoading.value = false;
  }
};
const saveShopDetails = async (tabIdx = 0) => {
  const isFormDirty = shopProfileFormRefs.value.isFormDirty;

  if (isFormDirty) {
    const isFormValid = shopProfileFormRefs.value.validateForm
      ? await shopProfileFormRefs.value.validateForm()
      : shopProfileFormRefs.value.validate();

    if (isFormValid) {
      await uploadShopDetails(
        shopProfileFormRefs.value.updatedPayload
          ? shopProfileFormRefs.value.updatedPayload
          : shopProfileFormRefs.value.payload,
        false,
        tabIdx
      );
      disableForm.value[tabIdx] = true;
    }
  } else {
    // No notification for no-op save
    isLoading.value = false;
    disableForm.value[tabIdx] = true;
  }
};
const createFormRefs = () => {
  shopProfileFormRefs.value = [];
  const numOfForms =
    tabs.value[currentTab.value - 1].genericFormsCount;
  if (numOfForms) {
    for (let i = 0; i < numOfForms; i++) {
      shopProfileFormRefs.value.push(ref(null));
    }
  }
};
const removeShopLogo = async () => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    // Just send an empty request to remove logo (API should handle logo removal when no logo field is provided)
    
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`${apiUrl}/user/shops/${shopId}`, formData, config);
    
    if (!response.data.success) {
      showErrorToast('Failed to remove shop logo');
      return;
    }

    uploadedLogo.value = null;
    await fetchData(true);
    showSuccessToast('Shop logo removed successfully');
  } catch (error) {
    console.error('Error removing shop logo:', error);
    if (error.response?.data?.message) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast('Failed to remove shop logo');
    }
  } finally {
    isLoading.value = false;
  }
};

const tabContentRefs = [ref(null), ref(null), ref(null), ref(null), ref(null)];

function getStickyHeaderHeight() {
  // Try v-app-bar first (Vuetify), fallback to .main-header-dashboard
  const appBar = document.querySelector('.v-app-bar');
  if (appBar) return appBar.offsetHeight;
  const header = document.querySelector('.main-header-dashboard');
  return header ? header.offsetHeight : 64; // fallback to 64px
}

function scrollTabIntoView(tabIdx) {
  nextTick(() => {
    const el = tabContentRefs[tabIdx - 1]?.value;
    if (el) {
      const headerHeight = getStickyHeaderHeight();
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}

watch(currentTab, (val) => {
  scrollTabIntoView(val);
});

onMounted(() => {
  fetchData();
  scrollTabIntoView(currentTab.value);
});

function formatPhoneNumber(input) {
  if (input) {
    let phoneInput = input.replace(/\D+/g, '');
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
</script>

<style lang="scss">

@media (min-width: 992px) {
  html, body, .font-16, .v-application, .v-container, .v-row, .v-col, .general-field-class, .label, .v-input, .v-select, .v-text-field, .v-label, .v-field, .v-btn__content {
    font-size: 14px !important;
  }
  a, .text-link, .router-link, .v-btn--link, .v-list-item__content a {
    font-size: 14px !important;
    text-decoration: underline;
  }
}

.general-field-class, .label, .v-label, .v-input, .v-select, .v-text-field, .v-field {
  font-size: 14px !important;
}

@media (max-width: 991px) {
  html, body, .font-16, .v-application, .v-container, .v-row, .v-col, .general-field-class, .label, .v-input, .v-select, .v-text-field, .v-label, .v-field, .v-btn__content {
    font-size: 14px !important;
  }
  .v-container, .v-row, .v-col {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
  .v-row {
    row-gap: 12px !important;
  }
  .v-col {
    margin-bottom: 8px !important;
  }
}

.v-file-upload {
  padding-block: 12px !important;

  .v-file-upload-icon {
    font-size: inherit;
    margin-bottom: 0;
  }

  .v-file-upload-divider {
    margin-block: 2px !important;
  }

  .v-file-upload-title {
    font-size: 16px;
  }
}

.ro-settings-component {
  .general-field-class {
    .v-field {
      color: black !important;
      font-weight: 600 !important;

      .v-text-field__prefix {
        opacity: 1;
        font-weight: 500;
        padding-inline: 16px 10px;
        border-right: 2px solid rgba(black, 0.2) !important;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>

