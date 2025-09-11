<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p>Contact Support to update default</p>
      </v-col>

      <v-col cols="12">
        <generic-form
          ref="shopROSettingsFormRef"
          class="ro-settings-component"
          :fields-config="shopROCustomSettings"
          :disabled="disableForm"
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
</template>

<script setup>
import { ref } from 'vue';
import GenericForm from '@/shared/forms/GenericForm.vue';

// Form ref and state
const shopROSettingsFormRef = ref(null);
const disableForm = ref(true);

// Field configuration for RO settings
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
    cols: 4, // Empty column for spacing
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
    cols: 4, // Empty column for spacing
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
</script>

<style lang="scss" scoped>
.ro-settings-component {
  :deep(.general-field-class) {
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