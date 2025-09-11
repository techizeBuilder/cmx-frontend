<template>
  <dynamic-panel-content
    id="Estimate_Profile"
    v-model:tab="currentTab"
    :tabs="tabs"
    :isLoading="isLoading"
    @update:filters="handleFilters"
    @update:search="onSearch"
    @run:clicked="handleFilters"
  >
    <template #topLeft0>
      <v-col
        cols="8"
        md="6"
        sm="7"
        class="d-flex pt-0 ga-1"
      >
        <v-icon size="28">mdi-filter</v-icon>
        <p class="mb-2">60 Day Activity</p>
      </v-col>
    </template>
  </dynamic-panel-content>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { showErrorToast } from '../../toster';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DynamicPanelContent from './DynamicPanelContent.vue';

const HEADERS = [
  {
    title: '',
    value: '$$link',
    valueFrom: 'estimateId',
    linkPrefix: 'estimatexprofile',
  },
  {
    title: 'Estimate #',
    value: '$$default',
    valueFrom: 'estimateId',
  },
  { title: 'Last Name', value: '$$default', valueFrom: 'lastName' },
  { title: 'First Name', value: '$$default', valueFrom: 'firstName' },
  { title: 'Year', value: '$$default', valueFrom: 'vehicalId.year' },
  { title: 'Make', value: '$$default', valueFrom: 'vehicalId.make' },
  {
    title: 'Model',
    value: '$$default',
    valueFrom: 'vehicalId.model',
  },
  { title: 'VIN', value: '$$default', valueFrom: 'vehicalId.vin' },
  {
    title: 'Insurance',
    value: '$$default',
    valueFrom: 'insuranceId.InsuranceName',
  },
  {
    title: 'Estimator',
    value: '$$default',
    valueFrom: 'estimatorName',
  },
  { title: 'Total', value: '$$default', valueFrom: 'grandTotal' },
  {
    title: 'Estimate Date',
    value: '$$date',
    valueFrom: 'created_at',
  },
];
const currentTab = ref(1);
const isLoading = ref(false);

const tabs = computed(() => [
  {
    title: 'Estimate Profile',
    btnsConfig: [],
    tableProps: {
      noDataText: 'No Estimate Profile Found!',
      headers: HEADERS,
      items: mapValuesInList(estimateData.value),
    },
    filters: [
      {
        fields: [
          {
            name: 'ESTIMATOR',
            config: { items: shopEstimator.value },
          },
          {
            name: 'DAYS',
          },
        ],
      },
      {
        fields: [
          {
            name: 'INSURANCE',
          },
          {
            name: 'SAVE_AS_DEFAULT',
            colProps: {
              class: 'pt-0',
            },
            config: {
              class: 'mb-2',
            },
          },
        ],
      },
    ],
    helpMenuProps: {
      options: [
        'Estimate #',
        'Last Name',
        'First Name',
        'Phone',
        'Email',
        'VIN',
        'Insurance',
        'Estimator',
        'Vehicle',
      ],
    },
    fetch: fetchAllEstimate,
    searchFunc: handleEstimateProfileSearch,
  },
  {
    title: 'Archived',
    tableProps: {
      noDataText: 'No Archived Estimate Profile Found!',
      headers: HEADERS,
      items: mapValuesInList(archiveList.value),
    },
    hideHelpMenu: true,
    fetch: handleArchive,
    searchFunc: handleArchiveSearch,
  },
]);

const store = useStore();
const router = useRouter();
const props = defineProps(['title']);
const estimateData = ref([]);
const staticData = ref([]);
const shopEstimator = ref([]);
const archiveList = ref([]);

watch(currentTab, (newValue) => {
  if (newValue === 1) {
    fetchAllEstimate();
  } else {
    handleArchive(25);
  }
});

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log('An error occurred while fetching data', error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push('/login');
  } else if (error.response) {
    localStorage.clear();
    router.push('/login');
    showErrorToast(error.response.data.msg);
    console.error('An error occurred while fetching data', error);
  } else {
    showErrorToast('Some Error Occurred!!!!');
    console.error(
      'An error occurred while fetching data. Response was not available.',
      error
    );
  }
};
const fetchAllEstimate = async (limit) => {
  try {
    const [data, totalCount] = await store.dispatch(
      'fetchAllEstimate',
      limit
    );
    estimateData.value = data;
    staticData.value = estimateData.value;
    return totalCount;
  } catch (error) {
    handleError(error);
  }
};
const mapValuesInList = (items) => {
  const list = items;
  list.forEach((li) => {
    if (li.staffId) {
      const te = shopEstimator.value.find(
        (se) => se._id === li.staffId
      );
      li.estimatorName = te.firstName;
    }
    if (li.paymentAmount) {
      const total = li.paymentAmount.reduce(
        (acc, curr) => acc + (parseFloat(curr.postPayment) || 0),
        0
      );
      li.grandTotal = isNaN(total)
        ? '0.00'
        : total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      li.grandTotal = '0.00';
    }
  });
  return list;
};
const handleEstimateProfileSearch = async (filtersApplied = {}) => {
  if (filtersApplied.search) {
    try {
      estimateData.value = await store.dispatch(
        'searchEstimateProfile',
        filtersApplied.search
      );
    } catch (error) {
      handleError(error);
    }
  } else {
    estimateData.value = staticData.value;
  }
};
const onSearch = (filtersApplied) => {
  const searchFunc = tabs.value[currentTab.value - 1].searchFunc;
  searchFunc(filtersApplied);
};
const fetchEstimator = async () => {
  try {
    isLoading.value = true;
    const [data] = await store.dispatch('fetchEstimator');
    shopEstimator.value = data;
  } catch (error) {
    handleError(error);
  }
  isLoading.value = false;
};
const handleFilters = (filters = {}) => {
  handleFilterForEstimate(filters);
};
const handleFilterForEstimate = async ({
  estimator,
  insuranceSearch,
  days,
  limit = 25,
}) => {
  if (estimator || insuranceSearch || days) {
    const [data, totalCount] = await store.dispatch(
      'filterEstimateProfile',
      {
        estimatro: estimator,
        insuranceSearch,
        days,
        limit,
      }
    );
    estimateData.value = data;
    return totalCount;
  }
};
const handleArchive = async (limit = 25) => {
  isLoading.value = true;
  archiveList.value = await store.dispatch(
    'fetchArchivedEstimateProfile',
    limit
  );
  isLoading.value = false;
};
const handleArchiveSearch = async (filtersApplied) => {
  if (filtersApplied.search) {
    const response = await store.dispatch(
      'searchArchivedEstimateProfile',
      filtersApplied.search
    );
    if (response.data) {
      archiveList.value = response.data;
    } else {
      archiveList.value = [];
    }
  } else {
    handleArchive();
  }
};

onMounted(async () => {
  fetchAllEstimate();
  fetchEstimator();
  // await handleArchive(25);
});
</script>
