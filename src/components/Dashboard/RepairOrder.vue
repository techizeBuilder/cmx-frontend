<template>
  <dynamic-panel-content
    id="Repair_Order"
    v-model:tab="currentTab"
    :tabs="tabs"
    :isLoading="isLoading"
    @update:search="handleSearch"
    @update:filters="handleAllFilter"
    @run:clicked="handleAllFilter"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import 'vue-loading-overlay/dist/css/index.css';
import { showSuccessToast } from '../../toster';
import DynamicPanelContent from './DynamicPanelContent.vue';

const currentTab = ref(1);
const HEADERS = [
  {
    title: '',
    value: '$$link',
    valueFrom: 'repairOrdreId',
    linkPrefix: 'floderxmain',
  },
  { title: 'RO #', value: '$$default', valueFrom: 'repairOrdreId' },
  {
    title: 'Last Name',
    value: '$$default',
    valueFrom: 'estimateId.lastName',
  },
  {
    title: 'First Name',
    value: '$$default',
    valueFrom: 'estimateId.firstName',
  },
  {
    title: 'Year',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId[0].year',
    secondaryKey: 'estimateId.vehicalId.year',
  },
  {
    title: 'Make',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId[0].make',
    secondaryKey: 'estimateId.vehicalId.make',
  },
  {
    title: 'Model',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId[0].model',
    secondaryKey: 'estimateId.vehicalId.model',
  },
  {
    title: 'VIN',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId[0].vin',
    secondaryKey: 'estimateId.vehicalId.vin',
  },
  {
    title: 'Insurance',
    value: '$$default',
    valueFrom: 'estimateId.insurance',
  },
  { title: 'Total', value: '$$default', valueFrom: 'grandTotal' },
  {
    title: 'Date Open',
    value: '$$date',
    valueFrom: 'estimateId.created_at',
    secondaryKey: 'created_at',
  },
];
const isLoading = ref(false);
const store = useStore();
const repairOrderList = ref([]);
const staticData = ref([]);

const tabs = computed(() => [
  {
    title: 'FolderX',
    btnsConfig: [],
    filters: [
      {
        fields: [
          {
            name: 'ESTIMATOR',
            config: { items: shopEstimator.value },
          },
          {
            name: 'INSURANCE',
          },
        ],
      },
      {
        fields: [
          {
            spacer: true,
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
        'RO #',
        'Last Name',
        'First Name',
        'Phone',
        'Email',
        'Insurance',
        'VIN',
        'Vehicle',
      ],
    },
    tableProps: {
      noDataText: 'No Repair Order Found!',
      items: mappedItemsList.value,
      headers: HEADERS,
    },
  },
]);
const shopEstimator = computed(() => {
  return store.getters.estimatorsList;
});
const mappedItemsList = computed(() => {
  repairOrderList.value.forEach((li) => {
    if (li.estimateId.paymentAmount) {
      const total = li.estimateId.paymentAmount.reduce(
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
  return repairOrderList.value;
});

const handleSearch = async (appliedFilters) => {
  isLoading.value = true;
  if (appliedFilters.search) {
    repairOrderList.value = await store.dispatch(
      'searchRepairOrderList',
      appliedFilters.search
    );
  } else {
    repairOrderList.value = staticData.value;
  }
  isLoading.value = false;
};
const fetchRepairOrders = async (item) => {
  isLoading.value = true;
  staticData.value = await store.dispatch(
    'fetchRepairOrderList',
    item
  );
  repairOrderList.value = staticData.value;
  isLoading.value = false;
  return staticData.value.length;
};
const handleAllFilter = async (appliedFilters = {}, limit = 25) => {
  isLoading.value = true;
  const { data, totalCount } = await store.dispatch(
    'filterRepairOrders',
    {
      estimatro: appliedFilters.estimator,
      insuranceSearch: appliedFilters.insuranceSearch,
      days: appliedFilters.days,
      limit,
    }
  );
  repairOrderList.value = data;
  store.dispatch('setRepairOrderList', repairOrderList.value);
  isLoading.value = false;
  return totalCount;
};

onMounted(async () => {
  store.dispatch('fetchEstimator');
  fetchRepairOrders();
});
</script>

<style>
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
}
</style>
