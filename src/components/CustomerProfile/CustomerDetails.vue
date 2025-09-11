<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template #content-0>
      <v-container v-if="currentTab === 1">
        <v-row class="mt-0">
          <v-col
            cols="8"
            class="d-flex align-center ga-4"
          >
            <v-icon color="warning">mdi-alert</v-icon>
            <span class="text-link">
              Updating this profile will change ALL existing RO's that
              are open. Only enter 1 person in each profile
            </span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="4"
            class="d-flex justify-end ga-3"
          >
            <custom-btn
              v-if="!disableForm"
              id="cancel-btn"
              color="btn"
              prepend-icon="cancel"
              :disabled="isLoading"
              @click="disableForm = !disableForm"
            >
              Cancel
            </custom-btn>
            <custom-btn
              id="edit-shop-details"
              :color="disableForm ? 'btn' : 'myGreen'"
              :prepend-icon="disableForm ? 'edit' : 'save'"
              :loading="isLoading"
              @click="
                disableForm
                  ? (disableForm = !disableForm)
                  : saveCustomerDetails()
              "
            >
              {{ disableForm ? 'Edit' : 'Save' }}
            </custom-btn>
          </v-col>
          <v-col
            cols="12"
            class="pb-0 font-16 d-flex ga-2"
          >
            <span>Customer ID:</span>
            <span>{{ props.customerDetails._id ?? 'XXXXXX' }}</span>
          </v-col>
          <generic-form-cols
            ref="customerDetailsFormRef"
            :disabled="disableForm"
            :data="computedCustomerDetails"
            :forms-config="customerDetailsFieldConfig"
          />
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { ref, computed } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import GenericFormCols from '@/components/GenericFormCols.vue';
import { useStore } from 'vuex';
import { handleError } from '@/handleError';
import { showSuccessToast } from '@/toster';
import { formatPhoneNumberToDigit } from '@/composables';

const store = useStore();
const emits = defineEmits(['reload:data']);
const props = defineProps({
  customerDetails: {
    type: Object,
    default: () => {},
  },
});

const customerDetailsFormRef = ref(null);
const currentTab = ref(1);
const disableForm = ref(true);
const isLoading = ref(false);
const tabs = ref([
  {
    title: 'Customer Details',
    genericFormsCount: 3,
  },
]);

const customerDetailsFieldConfig = ref([
  {
    cols: 3,
    config: [
      {
        id: 'firstName',
        vModel: 'firstName',
        label: 'First Name',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'lastName',
        vModel: 'lastName',
        label: 'Last Name',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'phone',
        vModel: 'phone',
        label: 'Phone / Cell 1',
        type: 'phoneNumber',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
      },
      {
        id: 'phone2',
        vModel: 'phone2',
        label: 'Phone 2',
        type: 'phoneNumber',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
      },
      {
        id: 'email-address',
        vModel: 'email',
        label: 'Email Address',
        strongLabel: true,
        bgColor: 'secondary',
        type: 'email',
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
        vModel: 'address',
        label: 'Address',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'city',
        vModel: 'city',
        label: 'city',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'state',
        vModel: 'state',
        label: 'State',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'zipCode',
        vModel: 'zipCode',
        label: 'Zip Code',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'country',
        vModel: 'country',
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
        id: 'isThisACompany',
        vModel: 'isCompany',
        label: 'Is This A Company',
        type: 'checkbox',
        color: 'blue',
        hideDetails: 'auto',
        cols: 12,
      },
      {
        id: 'companyName',
        vModel: 'companyName',
        label: 'Company Name',
        cols: 12,
      },
    ],
  },
]);

const computedCustomerDetails = computed(() => {
  return {
    ...props.customerDetails,
    isCompany: props.customerDetails.companyName !== '',
  };
});

const saveCustomerDetails = async () => {
  const isFormValid =
    await customerDetailsFormRef.value.validateForm();

  if (isFormValid) {
    const payload = customerDetailsFormRef.value.updatedPayload;
    payload.phone = formatPhoneNumberToDigit(payload.phone);
    payload.phone2 = formatPhoneNumberToDigit(payload.phone2);

    isLoading.value = true;
    payload.customerId = props.customerDetails._id;
    const response = await store.dispatch(
      'updateCustomerDetails',
      payload
    );
    if (!response.success) {
      return handleError(response);
    }
    showSuccessToast(response.msg);
    emits('reload:data');
    isLoading.value = false;
    disableForm.value = true;
  }
};
</script>
