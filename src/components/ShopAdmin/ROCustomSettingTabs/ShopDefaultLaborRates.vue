<template>
  <v-container >
    <v-row
      justify="center"
      class="default-labor-rates-container my-1"
    >
      <v-col cols="3">
        <custom-select
          id="shopRatesType"
          v-model="shopRatesType"
          :items="['Default Shop Rates']"
        />
      </v-col>

      <v-col
        cols="9"
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
          id="edit-save-form-btn"
          :color="disableForm ? 'btn' : 'myGreen'"
          :prepend-icon="disableForm ? 'edit' : 'save'"
          :loading="isLoading"
          @click="
            disableForm
              ? (disableForm = !disableForm)
              : saveShopLaborRates()
          "
        >
          {{ disableForm ? 'Edit' : 'Save' }}
        </custom-btn>
      </v-col>

      <v-col
        cols="6"
        md="5"
        sm="5"
        class="border-a border-md rounded-md mr-5"
      >
        <custom-data-table
          id="labor-rates-table"
          :headers="laborTypeHeaders"
          hide-default-footer
          :items="laborTypeItems"
          disable-sort
          :color-even-rows="false"
        />
        <custom-data-table
          id="labor-flat-rates-table"
          :headers="[
            {
              title: 'Supplies',
              value: '$$default',
              valueFrom: 'supplies',
            },
            {
              title: 'Flat Rate',
              value: '$$inputField',
              valueFrom: 'flatRate',
              width: '340',
              fieldProps: {
                type: 'number',
                prefix: '$',
                disabled: disableForm,
              },
            },
          ]"
          hide-default-footer
          :items="laborFlatRatesItems"
          class="mt-1"
          disable-sort
          :color-even-rows="false"
        />
      </v-col>

      <v-col
        cols="6"
        md="5"
        sm="5"
        :class="{ 'ml-5': $vuetify.display.smAndUp }"
      >
        <v-row class="border-a border-md rounded-md">
          <v-col cols="12">
            <custom-data-table
              id="labor-tax-type-table"
              :headers="[
                {
                  title: 'Apply',
                  value: '$$checkbox',
                  valueFrom: 'apply',
                  width: '30',
                },
                {
                  title: 'Tax Type',
                  value: '$$default',
                  valueFrom: 'taxType',
                  width: '165',
                },
                {
                  title: 'Tax Rate',
                  value: '$$inputField',
                  valueFrom: 'taxRate',
                  fieldProps: {
                    type: 'number',
                    suffix: '%',
                    disabled: disableForm,
                  },
                },
              ]"
              :items="taxRateItems"
              hide-default-footer
              disable-sort
              :color-even-rows="false"
            />
          </v-col>
        </v-row>

        <v-row class="mt-5 border-a border-md rounded-md">
          <v-col cols="5">
            <v-card
              class="rounded-0"
              style="border: 1px solid #bdbdbd"
              flat
            >
              <v-card-text class="pa-3">
                <v-row>
                  <v-col
                    cols="12"
                    class="px-0 py-2 text-center bg-primary text-blueText font-weight-bold"
                  >
                    Apply Tiered Tax
                  </v-col>
                  <v-col
                    cols="12"
                    class="pa-0 d-flex justify-center"
                  >
                    <v-checkbox
                      v-model="applyTieredTax"
                      color="blue"
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="7"
            class="pb-2"
          >
            <custom-data-table
              id="labor-tiered-tax-table"
              :headers="[
                {
                  title: 'Apply',
                  value: '$$checkbox',
                  valueFrom: 'apply',
                  width: '30',
                  fieldProps: {
                    disabled: !applyTieredTax,
                  },
                },
                {
                  title: 'Tiered Tax',
                  value: '$$default',
                  valueFrom: 'tieredType',
                  width: '165',
                },
              ]"
              :items="laborTieredTaxItems"
              hide-default-footer
              disable-sort
              :color-even-rows="false"
            />
          </v-col>
          <v-col
            cols="12"
            class="pt-0"
          >
            <custom-data-table
              id="labor-rate-threshold-table1"
              :headers="[
                {
                  title: 'Rate 1',
                  value: '$$inputField',
                  valueFrom: 'rate1',
                  fieldProps: {
                    type: 'number',
                    suffix: '%',
                    disabled: !applyTieredTax || disableForm,
                  },
                },
                {
                  title: 'Threshold 1',
                  value: '$$inputField',
                  valueFrom: 'threshold1',
                  fieldProps: {
                    type: 'number',
                    prefix: '$',
                    disabled: !applyTieredTax || disableForm,
                  },
                },
              ]"
              :items="rate1ThresholdItems"
              hide-default-footer
              disable-sort
              :color-even-rows="false"
            />
            <custom-data-table
              id="labor-rate-threshold-table2"
              class="mt-2"
              :headers="[
                {
                  title: 'Rate 2',
                  value: '$$inputField',
                  valueFrom: 'rate2',
                  fieldProps: {
                    type: 'number',
                    suffix: '%',
                    disabled: !applyTieredTax || disableForm,
                  },
                },
                {
                  title: 'Threshold 2',
                  value: '$$inputField',
                  valueFrom: 'threshold2',
                  fieldProps: {
                    type: 'number',
                    prefix: '$',
                    disabled: !applyTieredTax || disableForm,
                  },
                },
              ]"
              :items="rate2ThresholdItems"
              hide-default-footer
              disable-sort
              :color-even-rows="false"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import CustomSelect from '@/shared/components/CustomSelect.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import { useStore } from 'vuex';
import { handleError } from '@/handleError';
import { cloneDeep } from 'lodash';
import { showSuccessToast } from '@/toster';

const store = useStore();
const shopRatesType = ref('Default Shop Rates');
const disableForm = ref(true);
const isLoading = ref(false);
const backendItemsObject = ref({});
const componentsPayload = ref({});
const applyTieredTax = ref(false);
const laborTieredTaxItems = ref([
  {
    apply: false,
    tieredType: 'Parts',
  },
  {
    apply: false,
    tieredType: 'Labor',
  },
]);

const laborTypeHeaders = computed(() => {
  return [
    {
      title: 'Code',
      value: '$$default',
      valueFrom: 'code',
      width: '50',
      align: 'center',
    },
    {
      title: 'Labor Type',
      value: '$$default',
      valueFrom: 'laborType',
    },
    {
      title: 'Estimate Rates',
      value: '$$inputField',
      valueFrom: 'estimateRates',
      width: '260',
      fieldProps: {
        type: 'number',
        prefix: '$',
        disabled: disableForm.value,
      },
    },
  ];
});
const laborTypeItems = computed(() => {
  componentsPayload.value.laborTypes = [
    {
      code: 'B',
      laborType: 'BODY',
      estimateRates: backendItemsObject.value['body'] ?? '00.00',
    },
    {
      code: 'P',
      laborType: 'PAINT',
      estimateRates: backendItemsObject.value['paint'] ?? '00.00',
    },
    {
      code: 'M',
      laborType: 'MECHANICAL',
      estimateRates:
        backendItemsObject.value['mechanical'] ?? '00.00',
    },
    {
      code: 'F',
      laborType: 'FRAME',
      estimateRates: backendItemsObject.value['frame'] ?? '00.00',
    },
    {
      code: 'S',
      laborType: 'STRUCTURE',
      estimateRates: backendItemsObject.value['structure'] ?? '00.00',
    },
    {
      code: 'D',
      laborType: 'DIAGNOSTIC LABOR',
      estimateRates:
        backendItemsObject.value['diagnosticLabor'] ?? '00.00',
    },
    {
      code: 'E',
      laborType: 'ELECTRICAL',
      estimateRates:
        backendItemsObject.value['electrical'] ?? '00.00',
    },
    {
      code: 'G',
      laborType: 'GLASS',
      estimateRates: backendItemsObject.value['glass'] ?? '00.00',
    },
    {
      code: 'PDR',
      laborType: 'PDR',
      estimateRates: backendItemsObject.value['pdr'] ?? '00.00',
    },
    {
      code: 'ALM',
      laborType: 'Aluminum',
      estimateRates: backendItemsObject.value['alm'] ?? '00.00',
    },
    {
      code: '-',
      laborType: '-',
      estimateRates: backendItemsObject.value[''] ?? '00.00',
    },
    {
      code: '-',
      laborType: '-',
      estimateRates: backendItemsObject.value[''] ?? '00.00',
    },
  ];
  return componentsPayload.value.laborTypes;
});
const laborFlatRatesItems = computed(() => {
  componentsPayload.value.laborFlatRates = [
    {
      supplies: 'Paint Supplies',
      flatRate: backendItemsObject.value.paintSupplies ?? '00.00',
    },
    {
      supplies: 'Body Supplies',
      flatRate: backendItemsObject.value.bodySupplies ?? '00.00',
    },
  ];
  return componentsPayload.value.laborFlatRates;
});
const taxRateItems = computed(() => {
  componentsPayload.value.taxRates = [
    {
      apply: false,
      taxType: 'PARTS TAX RATE',
      taxRate: backendItemsObject.value.partsTaxRate ?? '00.00',
    },
    {
      apply: false,
      taxType: 'LABOR TAX',
      taxRate: backendItemsObject.value.labourTax ?? '00.00',
    },
  ];
  return componentsPayload.value.taxRates;
});
const rate1ThresholdItems = computed(() => {
  componentsPayload.value.rateThreshold1 = [
    {
      rate1: backendItemsObject.value.rate1 ?? '00.00',
      threshold1: backendItemsObject.value.threshold1 ?? '00.00',
    },
  ];
  return componentsPayload.value.rateThreshold1;
});
const rate2ThresholdItems = computed(() => {
  componentsPayload.value.rateThreshold2 = [
    {
      rate2: backendItemsObject.value.rate2 ?? '00.00',
      threshold2: backendItemsObject.value.threshold2 ?? '00.00',
    },
  ];
  return componentsPayload.value.rateThreshold2;
});

const fetchLaborRates = async () => {
  isLoading.value = true;
  const response = await store.dispatch('fetchShopLaborRates');
  if (!response.data) {
    return handleError(response);
  }
  if (response.data.length) {
    backendItemsObject.value = response.data[0];
  }
  isLoading.value = false;
};
const createPayloadToUpdate = () => {
  const initialValues = componentsPayload.value;
  const payload = {
    ...Object.fromEntries(
      initialValues.laborTypes
        .filter(({ laborType }) => laborType !== '-')
        .map(({ laborType, estimateRates }) => [
          laborType.toLowerCase().replace(/\s+/g, ''),
          estimateRates,
        ])
    ),
    partsTaxRate: initialValues.taxRates.find(
      (t) => t.taxType === 'PARTS TAX RATE'
    )?.taxRate,
    labourTax: initialValues.taxRates.find(
      (t) => t.taxType === 'LABOR TAX'
    )?.taxRate,
    paintSupplies: initialValues.laborFlatRates.find(
      (f) => f.supplies === 'Paint Supplies'
    )?.flatRate,
    bodySupplies: initialValues.laborFlatRates.find(
      (f) => f.supplies === 'Body Supplies'
    )?.flatRate,
    rate1: initialValues.rateThreshold1[0]?.rate1,
    rate2: initialValues.rateThreshold2[0]?.rate2,
    threshold1: initialValues.rateThreshold1[0]?.threshold1,
    threshold2: initialValues.rateThreshold2[0]?.threshold2,
  };

  return Object.keys(payload).reduce((acc, key) => {
    const payloadItem = payload[key] ?? '00';
    if (!isNaN(payloadItem)) {
      acc[key] = Number(payloadItem).toFixed(2);
    }
    return acc;
  }, {});
};
const saveShopLaborRates = async () => {
  isLoading.value = true;

  const formattedPayload = createPayloadToUpdate();

  const { msg } = await store.dispatch(
    'updateShopLaborRates',
    formattedPayload
  );
  if (msg) {
    showSuccessToast(msg);
    disableForm.value = true;
    await fetchLaborRates();
  }
  isLoading.value = false;
};

watch(disableForm, () => {
  if (disableForm.value && !isLoading.value) {
    backendItemsObject.value = cloneDeep(backendItemsObject.value);
  }
});

onMounted(() => {
  fetchLaborRates();
});
</script>

<style lang="scss">
.default-labor-rates-container {
  .custom-data-table {
    --v-table-header-height: 35px !important;
    --v-table-row-height: 30px !important;

    .v-table__wrapper {
      border-radius: 0px;
    }
  }
}
</style>
