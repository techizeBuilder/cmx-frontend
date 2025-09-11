<template>
  <v-container
    fluid
    class="pt-2 px-3"
  >
    <v-row>
      <page-header
        title="Customer Profile"
        mb="0"
        cols="6"
        hide-divider
        :title-props="{
          style: {
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'end',
          },
        }"
      />
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-menu :offset="4">
          <template v-slot:activator="{ props }">
            <custom-btn
              id="customer-profile-options-btn"
              color="grey-lighten-2"
              class="float-right"
              append-icon="mdi-chevron-down"
              v-bind="props"
            >
              Options
            </custom-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in optionsList"
              :key="index"
              :value="index"
              v-bind="item"
            >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        class="pt-0"
        :class="{
          'px-3': vuetifyDisplay.smAndUp.value,
        }"
      >
        <v-skeleton-loader
          v-if="isLoading"
          type="list-item-two-line"
          class="border-md border-opacity-25 px-5 py-3"
        >
        </v-skeleton-loader>
        <custom-key-value-pair
          v-else
          flat
          class="my-elevation px-5 py-3 custom-key-value-details"
          :config="[
            {
              title: 'Customer ID:',
              value: customerDetails.customerId ?? '-',
            },
            {
              title: 'Customer Name:',
              value: `${customerDetails.firstName ?? '-'} ${
                customerDetails.lastName
              }`,
            },
            {
              title: 'Company Name:',
              value: customerDetails.companyName || '-',
            },
            { title: 'Phone:', value: customerDetails.phone ?? '-' },
          ]"
        />
      </v-col>

      <v-col cols="12">
        <custom-expansion-panel
          v-model="activePanels"
          :panels="panels"
        ></custom-expansion-panel>
      </v-col>

      <scroll-to-top />
    </v-row>

    <estimate-profile-modal
      v-model="openEstimateProfileModal"
      :disable-form="disableForm"
      :fields-config="estimateProfileFieldsConfig"
      :is-loading="isLoading"
      :data="{
        fileType: 'New Estimate Profile',
        ...customerDetails,
      }"
      @close="openEstimateProfileModal = !openEstimateProfileModal"
      @onSubmit="handleNewEstimateProfile"
    />

    <create-update-vehicle-modal
      v-model="openAddVehicleModal"
      :disable-form="disableForm"
      :fields-config="addNewVehicleModalFieldsConfig"
      :is-loading="isLoading"
      :data="selectedVehicleDetails"
      @close="openAddVehicleModal = !openAddVehicleModal"
      @onSubmit="handleAddVehicle"
      @onUpdate="updateCustomerVehicle"
    />
  </v-container>
</template>

<script setup>
import { showErrorToast } from '@/toster';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import PageHeader from '@/components/PageHeader.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomKeyValuePair from '@/shared/components/CustomKeyValuePair.vue';
import EstimateProfileModal from '@/shared/modals/EstimateProfileModal.vue';
import CreateUpdateVehicleModal from '@/shared/modals/CreateUpdateVehicleModal.vue';
import { useDisplay } from 'vuetify';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { showSuccessToast } from '@/toster';
import CustomerDetails from '@/components/CustomerProfile/CustomerDetails.vue';
import VehicleList from '@/components/CustomerProfile/VehicleList.vue';
import { handleError } from '@/handleError';
// import RepairOrder from '@/components/CustomerProfile/RepairOrder.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import ChatLinkX from '@/components/CustomerProfile/ChatLinkX.vue';
import Comments from '@/components/CustomerProfile/Comments.vue';
import EstimateProfile from '@/components/Dashboard/EstimateProfile.vue';
import RepairOrder from '@/components/Dashboard/RepairOrder.vue';

const store = useStore();
const vuetifyDisplay = useDisplay();
const route = useRoute();
const router = useRouter();

const customerDetails = ref({});
const activePanels = ref([]);
const isLoading = ref(false);
const disableForm = ref(false);
const openEstimateProfileModal = ref(false);
const openAddVehicleModal = ref(false);
const selectedVehicleDetails = ref({});
const optionsList = ref([
  {
    title: 'New - Customer Profile',
    to: '/newcustomer',
  },
  {
    title: 'New - Estimate Profile',
    onClick: () => {
      openEstimateProfileModal.value =
        !openEstimateProfileModal.value;
    },
  },
  { title: 'New - RO Repair Order' },
]);
const panels = computed(() => {
  return [
    {
      title: 'Customer Detail',
      component: CustomerDetails,
      props: {
        customerDetails: customerDetails.value,
      },
      listeners: {
        'reload:data': () => {
          fetchData();
        },
      },
    },
    {
      title: 'Vehicle List',
      component: VehicleList,
      props: {
        customerId: customerDetails.value._id,
        fetchVehicleDetails: fetchVehicleDetails,
      },
      listeners: {
        'open:newVehicleModal': ({ item = {} } = {}) => {
          openAddVehicleModal.value = !openAddVehicleModal.value;
          selectedVehicleDetails.value = item;
        },
      },
    },
    {
      title: 'Chatlink',
      component: ChatLinkX,
    },
    {
      title: 'Comments',
      component: Comments,
    },
    {
      title: 'Estimate Profile',
      component: EstimateProfile,
    },
    {
      title: 'RO - Repair Order',
      component: RepairOrder,
    },
    {
      title: 'Customer Profile - Activity',
    },
  ];
});

const estimateProfileFieldsConfig = computed(() => {
  return [
    {
      id: 'select-new-file-type',
      vModel: 'fileType',
      label: 'Select New File Type',
      bgColor: 'secondary',
      type: 'select',
      hint: 'New Repair Order',
      persistentHint: true,
      items: ['New Estimate Profile', 'New Folder X'],
      cols: 6,
    },
    {
      type: 'divider',
      cols: 12,
      class: 'my-1 form-divider',
      colProps: { class: 'py-0' },
    },
    {
      id: 'first-name',
      vModel: 'firstName',
      label: 'First Name',
      bgColor: 'secondary',
      strongLabel: true,
      cols: 6,
    },
    {
      id: 'email-address',
      vModel: 'email',
      label: 'Email Address',
      bgColor: 'secondary',
      strongLabel: true,
      cols: 6,
    },
    {
      id: 'last-name',
      vModel: 'lastName',
      label: 'Last Name',
      bgColor: 'secondary',
      strongLabel: true,
      cols: 6,
    },
    {
      id: 'select-vehicle',
      vModel: 'selectVehicle',
      label: 'Select Vehicle',
      bgColor: 'secondary',
      strongLabel: true,
      type: 'selectVehicle',
      required: true,
      cols: 6,
      customerDetails: customerDetails.value,
      listeners: {
        'click:addVehicleBtn': () => {
          openEstimateProfileModal.value =
            !openEstimateProfileModal.value;
          setTimeout(() => {
            openAddVehicleModal.value = !openAddVehicleModal.value;
          }, 50);
        },
      },
    },
    {
      id: 'phone',
      vModel: 'phone',
      label: 'Phone / Cell 1',
      type: 'phoneNumber',
      bgColor: 'secondary',
      strongLabel: true,
      cols: 6,
    },
    {
      // extra space
    },
    {
      id: 'phone2',
      vModel: 'phone2',
      label: 'Phone 2',
      type: 'phoneNumber',
      bgColor: 'secondary',
      strongLabel: true,
      cols: 6,
    },
  ];
});
const addNewVehicleModalFieldsConfig = computed(() => {
  return [
    {
      id: 'vin',
      vModel: 'vin',
      label: 'Vin',
      bgColor: 'secondary',
      required: true,
      cols: 4,
    },
    {
      id: 'decode-btn',
      text: 'Decode',
      type: 'btn',
      color: 'grey-lighten-2',
      cols: 2,
      colProps: {
        class: 'd-flex align-end',
      },
    },
    {
      id: 'exterior-color',
      vModel: 'exteriorColor',
      label: 'Exterior Color',
      bgColor: 'secondary',
      cols: 3,
    },
    {
      id: 'exterior-code',
      vModel: 'exteriorCode',
      label: 'Exterior Code',
      bgColor: 'secondary',
      cols: 3,
    },
    {
      id: 'year',
      vModel: 'year',
      label: 'Year',
      bgColor: 'secondary',
      required: true,
      cols: 6,
    },
    {
      id: 'interior-color',
      vModel: 'interiorColor',
      label: 'Interior Color',
      bgColor: 'secondary',
      cols: 3,
    },
    {
      id: 'trim-code',
      vModel: 'trimCode',
      label: 'Trim Code',
      bgColor: 'secondary',
      cols: 3,
    },
    {
      id: 'make',
      vModel: 'make',
      label: 'Make',
      bgColor: 'secondary',
      required: true,
      cols: 6,
    },
    {
      id: 'vehicle-condition',
      vModel: 'vehicleCondition',
      label: 'Vehicle Condition',
      bgColor: 'secondary',
      type: 'select',
      items: ['New', 'Clean', 'Fair', 'Poor'],
      clearable: true,
      cols: 6,
    },
    {
      id: 'model',
      vModel: 'model',
      label: 'Model',
      bgColor: 'secondary',
      required: true,
      cols: 6,
    },
    {
      id: 'odometer-in',
      vModel: 'milegeIn',
      label: 'Odometer IN',
      bgColor: 'secondary',
      required: true,
      cols: 3,
    },
    {
      id: 'production-date',
      vModel: 'productionDate',
      label: 'Production Date',
      bgColor: 'secondary',
      cols: 3,
    },
    {
      id: 'engine',
      vModel: 'engine',
      label: 'Engine',
      bgColor: 'secondary',
      cols: 6,
    },
    {
      id: 'license-plate',
      vModel: 'plate',
      label: 'License Plate',
      bgColor: 'secondary',
      cols: 3,
    },
    {
      id: 'state',
      vModel: 'state',
      label: 'State',
      bgColor: 'secondary',
      cols: 3,
    },
  ];
});

const fetchVehicleDetails = async () => {
  if (!customerDetails.value._id) {
    return;
  }
  isLoading.value = true;
  const response = await store.dispatch('fetchCustomerVehicles', {
    customerId: customerDetails.value._id,
    force: true,
  });
  if (!response.data) {
    showErrorToast(isArray(response) ? response[0] : response);
  }
  isLoading.value = false;
};
const fetchData = async () => {
  isLoading.value = true;
  const response = await store.dispatch(
    'fetchCustomerDetails',
    route.params.id
  );
  if (!response.success) {
    return showErrorToast(response);
  }
  customerDetails.value = response.data;
  fetchVehicleDetails();
  isLoading.value = false;
};
const handleNewEstimateProfile = async (payload) => {
  payload.customerId = customerDetails.value._id;
  payload.shopId = store.getters.shopId;
  payload.vehicalId = payload.selectVehicle._id;

  isLoading.value = true;
  const response = await store.dispatch(
    'registerNewEstimateProfile',
    payload
  );
  if (response.success) {
    showSuccessToast(response.msg);
    router.push(`/estimatexprofile/${response.data.estimateId}`);
  }
  isLoading.value = false;
};
const resetVehicleModal = () => {
  openAddVehicleModal.value = false;
  selectedVehicleDetails.value = {};
};
const handleAddVehicle = async (payload) => {
  isLoading.value = true;
  payload.customerId = customerDetails.value._id;
  const response = await store.dispatch(
    'addNewCustomerVehicle',
    payload
  );
  if (!response.success) {
    return;
  }
  showSuccessToast(response.data.msg ?? response.msg);
  isLoading.value = false;
  resetVehicleModal();
  fetchData();
};
const updateCustomerVehicle = async (payload) => {
  isLoading.value = true;
  payload.vehicalId = payload._id;
  const response = await store.dispatch(
    'updateCustomerVehicles',
    payload
  );
  if (!response.success) {
    return handleError(response);
  }
  showSuccessToast(response.data.msg ?? response.msg);
  isLoading.value = false;
  resetVehicleModal();
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss">
.form-divider {
  --v-border-opacity: 0.5 !important;
}
</style>
