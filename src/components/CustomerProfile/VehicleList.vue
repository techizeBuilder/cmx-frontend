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
            md="3"
            sm="6"
          >
            <custom-field
              v-model="searchInput"
              id="vehicle-search"
              placeholder="Quick Search"
              append-inner-icon="mdi-magnify"
              class="w-100"
              hide-details
              clearable
              @keydown.enter.prevent="handleSearch"
              @update:modelValue="handleOnSearchChange"
              @click:appendInner="handleSearch"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="6"
            class="d-flex justify-end ga-3"
          >
            <custom-btn
              id="add-vehicle-btn"
              color="my-grey"
              prepend-icon="mdi-plus-circle"
              :disabled="isLoading"
              @click="() => emits('open:newVehicleModal')"
            >
              Add Vehicle
            </custom-btn>
            <custom-btn
              id="remove-vehicle-btn"
              color="my-grey"
              prepend-icon="mdi-minus-circle-outline"
              :disabled="isLoading"
              @click="removeVehicles"
            >
              Remove Vehicle
            </custom-btn>
          </v-col>

          <v-col
            cols="12"
            class="py-0"
          >
            <custom-data-table
              id="vehicle-list-table"
              v-model="selectedVehicles"
              :loading="isLoading"
              :search="searchInput"
              :headers="tableHeaders"
              :items="customerVehiclesList"
              return-object
              show-select
              row-clickable
              no-data-text="No Vehicles Found!"
              @click:row="vehicleSelected"
            >
            </custom-data-table>
          </v-col>

          <v-col
            cols="12"
            class="mt-2"
          >
            <custom-expansion-panel
              v-model="activePanels"
              :panels="[{ title: 'Vehicle Details' }]"
              :scroll-to-active-panel="false"
              :titleProps="{
                class: 'elevation-2',
              }"
              :textProps="{
                class: 'elevation-2',
              }"
            >
              <template #content-0>
                <v-row justify="center">
                  <generic-form-cols
                    :disabled="disableForm"
                    :data="selectedVehicleDetails"
                    :forms-config="vehicleDetailsFieldConfig"
                  />
                </v-row>
              </template>
            </custom-expansion-panel>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import GenericFormCols from '@/components/GenericFormCols.vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import { showSuccessToast } from '@/toster';

const store = useStore();
const emits = defineEmits(['open:newVehicleModal']);
const props = defineProps({
  fetchVehicleDetails: {
    type: Function,
    default: () => {},
  },
  customerId: {
    type: String,
    default: () => {},
  },
});

const selectedVehicles = ref([]);
const selectedVehicleDetails = ref({});
const searchInput = ref(null);
const currentTab = ref(1);
const isLoading = ref(false);
const disableForm = ref(false);
const activePanels = ref([]);
const tabs = ref([
  {
    title: 'Vehicle List',
  },
]);
const tableHeaders = ref([
  {
    title: 'Vehicle #',
    value: '$$numbering',
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
    title: 'Mileage In',
    value: '$$default',
    valueFrom: 'milegeIn',
  },
  {
    title: 'Plate #',
    value: '$$default',
    valueFrom: 'plate',
  },
  {
    title: 'Plate State',
    value: '$$default',
    valueFrom: 'plateState',
  },
  {
    title: 'Exterior Color',
    value: '$$default',
    valueFrom: 'exteriorColor',
  },
  {
    title: 'View',
    value: '$$link',
    valueFrom: 'phone2',
    onClick: (item) => {
      emits('open:newVehicleModal', item);
    },
  },
]);
const vehicleDetailsFieldConfig = ref([
  {
    cols: 3,
    config: [
      {
        id: 'vin',
        vModel: 'vin',
        label: 'VIN',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 8,
        required: true,
      },
      {
        id: 'decode-btn',
        text: 'Decode',
        type: 'btn',
        cols: 4,
        color: 'grey-lighten-2',
        colProps: {
          class: 'd-flex align-end',
        },
      },
      {
        id: 'year',
        vModel: 'year',
        label: 'Year',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
        required: true,
      },
      {
        id: 'productionDate',
        vModel: 'productionDate',
        label: 'Production Date',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'make',
        vModel: 'make',
        label: 'Make',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'model',
        vModel: 'model',
        label: 'Model',
        type: 'phoneNumber',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
        required: true,
      },
      {
        id: 'engine',
        vModel: 'engine',
        label: 'Engine',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 12,
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
        id: 'exteriorColor',
        vModel: 'exteriorColor',
        label: 'Exterior Color',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'exteriorCode',
        vModel: 'exteriorCode',
        label: 'Exterior Code',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'interiorColor',
        vModel: 'interiorColor',
        label: 'Interior Color',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'trimCode',
        vModel: 'trimCode',
        label: 'Trim Code',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
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
        id: 'mileageIn',
        vModel: 'milegeIn',
        label: 'Mileage In',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'mileageOut',
        vModel: 'milegeOut',
        label: 'Mileage Out',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'licensePlate',
        vModel: 'plate',
        label: 'License Plate',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'state',
        vModel: 'state',
        label: 'State',
        strongLabel: true,
        bgColor: 'secondary',
        cols: 6,
      },
      {
        id: 'vehicleCondition',
        vModel: 'vehicleCondition',
        label: 'Vehicle Condition',
        strongLabel: true,
        type: 'select',
        items: ['New', 'Clean', 'Fair', 'Poor'],
        bgColor: 'secondary',
        cols: 12,
      },
    ],
  },
]);

const customerVehiclesList = computed(() => {
  const { data } = store.getters.customerVehicleDetails;
  return data ? data[0].customerVehicals : [];
});

const fetchData = async () => {
  isLoading.value = true;
  await props.fetchVehicleDetails();
  isLoading.value = false;
};
const handleSearch = async () => {};
const vehicleSelected = ({ item }) => {
  selectedVehicleDetails.value = item;
};
const removeVehicles = async () => {
  const vehicleIds = selectedVehicles.value.map((v) => v._id);
  isLoading.value = true;
  const response = await store.dispatch('deleteCustomerVehicles', {
    customerId: props.customerId,
    vehicleIds,
  });
  if (response.success) {
    showSuccessToast(response.msg);
    isLoading.value = false;
    await fetchData();
  }
  isLoading.value = false;
};

const handleOnSearchChange = debounce(() => {
  if (!searchInput.value) {
    handleSearch(null);
  }
}, 0);

onMounted(() => {
  // fetchData();
});
</script>
