<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template #content-0>
      <v-container fluid>
        <v-row justify="end">
          <v-col cols="4">
            <custom-field
              id="readyForPickupListSearch"
              placeholder="VIN, RO, Last Name, Cell, Cust ID"
              v-model="customFieldValue"
            />
          </v-col>
          <v-col cols="12">
            <custom-data-table
              id="readyForPickupTable"
              :headers="headers"
              :items="deliveredList"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { ref } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';

const currentTab = ref(0);
const tabs = ref([{ title: 'Delivered' }]);
const customFieldValue = ref('');
const deliveredList = ref([]);
const headers = ref([
  { title: 'RO #', value: '$$default', valueFrom: 'ro' },
  { title: 'RO Status', value: '$$default', valueFrom: 'roStatus' },
  { title: 'Delivered', value: '$$default', valueFrom: 'delivered' },
  { title: 'Delivery Date', value: '$$default', valueFrom: 'date' },
  { title: 'First Name', value: '$$default', valueFrom: 'firstName' },
  { title: 'Last Name', value: '$$default', valueFrom: 'lastName' },
  { title: 'Year', value: '$$default', valueFrom: 'year' },
  { title: 'Make', value: '$$default', valueFrom: 'make' },
  { title: 'Model', value: '$$default', valueFrom: 'model' },
  { title: 'Insurance', value: '$$default', valueFrom: 'insurance' },
]);
</script>

<style scoped>
/* Add any custom styles here */
</style>
