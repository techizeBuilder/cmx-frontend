<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
      sm="6"
      class="d-flex align-center ga-3"
    >
      <custom-field
        v-model="searchInput"
        id="daily-activity-search"
        placeholder="Quick Search"
        append-inner-icon="mdi-magnify"
        class="w-100"
        hide-details
        clearable
        @keydown.enter.prevent="handleSearch"
        @update:modelValue="handleOnSearchChange"
        @click:appendInner="handleSearch"
      />
      <help-menu
        style="margin-left: auto"
        :options="[
          'Customer ID',
          'Estimate ID',
          'RO #',
          'First Name',
          'Last Name',
          'Company',
          'Customer Phone',
        ]"
        :optionsSecond="[
          'Last 6 of VIN',
          'Year, Make or Model',
          'Claim#',
          'Insurance',
          'Email',
          'Vehicle',
        ]"
      />
      <custom-btn
        id="quick-search-btn"
        density="comfortable"
        class="rounded-lg float-right bg-btn my-elevation"
        @click="handleSearch"
      >
        Search
      </custom-btn>
    </v-col>
    <v-col cols="12">
      <custom-data-table
        id="quick-ro-data-table"
        :headers="headers"
        :items="repairList"
        :loading="isLoading"
        hide-default-footer
        fixed-header
        class="quick-RO-data-table"
        no-data-text="No Repair Order Found!"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import HelpMenu from '@/components/HelpMenu.vue';
import { debounce } from 'lodash';

const store = useStore();

const headers = [
  {
    title: '',
    value: '$$link',
    valueFrom: 'repairOrdreId',
    linkPrefix: 'floderxmain',
    actions: [{ title: 'Update', to: '' }],
  },
  { title: 'RO #', value: '$$default', valueFrom: 'repairOrdreId' },
  {
    title: 'First Name',
    value: '$$default',
    valueFrom: 'estimateId.firstName',
  },
  {
    title: 'Last Name',
    value: '$$default',
    valueFrom: 'estimateId.lastName',
  },
  {
    title: 'Year',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId.year',
    secondaryKey: 'estimateId[0].vehicalId.year',
  },
  {
    title: 'Make',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId.make',
    secondaryKey: 'estimateId[0].vehicalId.make',
  },
  {
    title: 'Model',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId.model',
    secondaryKey: 'estimateId[0].vehicalId.model',
  },
  {
    title: 'VIN',
    value: '$$default',
    valueFrom: 'estimateId.vehicalId.vin',
    secondaryKey: 'estimateId[0].vehicalId.vin',
  },
];

const searchInput = ref(null);
const isLoading = ref(false);
const repairList = ref([]);

const storeRepairOrderList = computed(
  () => store.getters.getRepairOrderList
);

const fetchData = async () => {
  isLoading.value = true;
  repairList.value = await store.dispatch('fetchRepairOrderList');
  isLoading.value = false;
};
const handleSearch = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const search = searchInput.value;
  if (search) {
    const response = await store.dispatch(
      'searchRepairOrderList',
      search
    );
    repairList.value = response.map((i) => {
      if (Array.isArray(i.estimateId.vehicalId)) {
        const temp = i.estimateId.vehicalId;
        i.estimateId.vehicalId = {
          year: temp[0].year,
          make: temp[0].make,
          model: temp[0].model,
          vin: temp[0].vin,
        };
      }
      return i;
    });
  } else {
    repairList.value = JSON.parse(
      JSON.stringify(storeRepairOrderList.value)
    );
    repairList.value = repairList.value.map((i) => {
      if (Array.isArray(i.estimateId.vehicalId)) {
        const temp = i.estimateId.vehicalId;
        i.estimateId.vehicalId = {
          year: temp[0].year,
          make: temp[0].make,
          model: temp[0].model,
          vin: temp[0].vin,
        };
      }
      return i;
    });
  }
  isLoading.value = false;
};
const handleOnSearchChange = debounce(() => {
  if (!searchInput.value) {
    handleSearch(null);
  }
}, 0);

onMounted(async () => {
  fetchData();
});
</script>

<style lang="scss">
.quick-RO-data-table {
  .v-table__wrapper {
    max-height: 335px;
    overflow-y: auto;
  }
}
</style>
