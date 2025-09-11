<template>
  <dynamic-panel-content
    id="RO_Archived"
    v-model:tab="currentTab"
    :tabs="tabs"
    :isLoading="isLoading"
    @update:filters="handleFilters"
    @update:search="onSearch"
    @run:clicked="handleFilters"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';

import DynamicPanelContent from './DynamicPanelContent.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomSelect from '@/shared/components/CustomSelect.vue';

const store = useStore();
const currentTab = ref(1);
const isLoading = ref(false);
const data = ref([]);

const HEADERS = [
  {
    title: '',
    value: '$$link',
    valueFrom: 'repairOrdreId',
    linkPrefix: 'floderxmain',
  },
  {
    title: 'RO #',
    value: '$$default',
    valueFrom: 'repairOrdreId',
  },
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
  {
    title: 'Estimator',
    value: '$$default',
    valueFrom: 'estimator',
  },
  {
    title: 'Total',
    value: '$$date',
    valueFrom: 'total',
  },
  {
    title: 'Date Closed',
    value: '$$date',
    valueFrom: 'dateClosed',
  },
];

const tabs = computed(() => {
  return [
    {
      title: 'RO Archived',
      btnsConfig: [],
      tableProps: {
        noDataText: 'No Repair Order Archived Found!',
        headers: HEADERS,
        items: data.value,
      },
      filters: [
        {
          fields: [
            {
              name: 'ESTIMATOR',
              cols: 6,
              md: 3,
              config: { items: shopEstimators.value },
            },
            {
              name: 'INSURANCE',
              cols: 6,
              md: 3,
            },
          ],
        },
        {
          fields: [
            {
              cols: 6,
              md: 3,
              vModel: 'selectedMonth',
              id: 'selectedMonth',
              component: CustomSelect,
              props: {
                clearable: true,
                hideDetails: true,
                label: 'Month',
                items: moment.months(),
              },
            },
            {
              cols: 6,
              md: 3,
              vModel: 'selectedYear',
              id: 'selectedYear',
              component: CustomField,
              config: {
                mask: ['####'],
              },
              props: {
                clearable: true,
                label: 'Enter Year',
                type: 'number',
                rules: [
                  (v) =>
                    v
                      ? moment(v, 'YYYY', true).isValid() ||
                        'Year is Invalid!'
                      : true,
                ],
              },
            },
          ],
        },
        {
          fields: [
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
    },
  ];
});

const shopEstimators = computed(() => {
  return store.getters.estimatorsList;
});

const fetchData = async () => {
  isLoading.value = true;
  store.dispatch('fetchEstimator');
  data.value = await store.dispatch('fetchArchivedRepairOrders', 25);
  isLoading.value = false;
};
const onSearch = async (filters = {}) => {
  if (filters.search) {
    isLoading.value = true;
    const response = await store.dispatch(
      'searchArchivedRepairOrders',
      filters.search
    );
    data.value = response;
    isLoading.value = false;
  } else {
    fetchData();
  }
};
const handleFilters = () => {};

onMounted(() => {
  fetchData();
});
</script>
