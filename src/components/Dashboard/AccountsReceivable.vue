<template>
  <dynamic-panel-content
    id="Accounts_Receivable"
    v-model:tab="currentTab"
    :tabs="tabs"
    @update:tab="() => {}"
    @update:search="() => {}"
    @update:filters="() => {}"
  >
    <template #topLeft0>
      <v-row class="my-1">
        <v-col
          cols="6"
          md="3"
          sm="5"
        >
          <custom-card
            class="text-center pa-0"
            card-text-style="py-2 px-1"
            elevation="3"
          >
            <span>
              <strong class="font-12">Total Balance</strong>
              <br />
              <strong class="font-12">$0.00</strong>
            </span>
          </custom-card>
        </v-col>
        <v-col
          cols="6"
          md="3"
          sm="5"
        >
          <custom-card
            class="text-center pa-0"
            card-text-style="py-2 px-1"
            elevation="3"
          >
            <span>
              <strong class="font-12">Average Days</strong>
              <br />
              <strong class="font-12">0</strong>
            </span>
          </custom-card>
        </v-col>
      </v-row>
    </template>
  </dynamic-panel-content>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import CustomCard from '@/shared/components/CustomCard.vue';
import DynamicPanelContent from './DynamicPanelContent.vue';

const HEADERS = [
  // {
  //   title: '',
  //   value: '$$link',
  //   valueFrom: 'repairOrdreId',
  //   linkPrefix: 'floderxmain',
  // },
  { title: 'RO #', value: '$$default', valueFrom: 'repairOrdreId' },
  {
    title: 'Last Name',
    value: '$$default',
    valueFrom: 'lastName',
  },
  {
    title: 'First Name',
    value: '$$default',
    valueFrom: 'firstName',
  },
  {
    title: 'Year',
    value: '$$default',
    valueFrom: 'vehicalId.year',
  },
  {
    title: 'Make',
    value: '$$default',
    valueFrom: 'vehicalId.make',
  },
  {
    title: 'Model',
    value: '$$default',
    valueFrom: 'vehicalId.model',
  },
  {
    title: 'VIN',
    value: '$$default',
    valueFrom: 'vehicalId.vin',
  },
  {
    title: 'Insurance',
    value: '$$default',
    valueFrom: 'insurance',
  },
  {
    title: 'Day Counter',
    value: '$$default',
    valueFrom: 'grandTotal',
  },
  {
    title: 'Balance',
    value: '$$date',
    valueFrom: 'created_at',
  },
  {
    title: 'Day Closed',
    value: '$$date',
    valueFrom: 'created_at',
  },
];

const store = useStore();
const currentTab = ref(1);
const isLoading = ref(false);

const tabs = computed(() => [
  {
    title: 'Account Receivable',
    topLeftColProps: {
      cols: 12,
      md: 6,
      sm: 6,
    },
    btnsConfig: [],
    tableProps: {
      noDataText: 'No Accounts Receivable Found!',
      headers: HEADERS,
      items: [],
    },
    filters: [
      {
        fields: [
          {
            name: 'ESTIMATOR',
            config: { items: shopEstimators.value },
          },
          { name: 'DAYS' },
        ],
      },
      {
        fields: [
          { name: 'INSURANCE' },
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
]);

const shopEstimators = computed(() => {
  return store.getters.estimatorsList;
});

onMounted(() => {
  store.dispatch('fetchEstimator');
});
</script>
