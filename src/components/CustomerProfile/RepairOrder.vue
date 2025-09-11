<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template #content-0>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            class="py-0"
          >
            <custom-data-table
              id="customer-ro-history-table"
              :loading="isLoading"
              :headers="headers"
              :items="[]"
              row-clickable
              no-data-text="No Customer RO History Found!"
            >
            </custom-data-table>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { ref } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';

const props = defineProps({});

const currentTab = ref(1);
const isLoading = ref(false);
const tabs = ref([
  {
    title: 'Customer RO History',
  },
]);
const headers = ref([
  {
    title: 'FolderX#',
    value: '$$default',
    valueFrom: 'folderX',
    align: 'center',
  },
  {
    title: 'Year',
    value: '$$default',
    valueFrom: 'year',
  },
  {
    title: 'Make',
    value: '$$default',
    valueFrom: 'make',
  },
  {
    title: 'Make',
    value: '$$default',
    valueFrom: 'make',
  },
  {
    title: 'Model',
    value: '$$default',
    valueFrom: 'model',
  },
  {
    title: 'VIN',
    value: '$$default',
    valueFrom: 'vin',
  },
  {
    title: 'Insurance',
    value: '$$default',
    valueFrom: 'insurance',
  },
  {
    title: 'Amount',
    value: '$$default',
    valueFrom: 'amount',
  },
  {
    title: 'Balance',
    value: '$$default',
    valueFrom: 'balance',
  },
  {
    title: 'Date Closed',
    value: '$$default',
    valueFrom: 'dateClosed',
  },
  {
    title: 'Estimator Name',
    value: '$$default',
    valueFrom: 'estimatorName',
  },
]);
</script>
