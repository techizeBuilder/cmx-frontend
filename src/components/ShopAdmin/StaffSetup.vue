<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
    @update:modelValue="tabChanged"
  >
    <template
      v-for="(tab, index) in tabs"
      :key="index"
      #[`content-${index}`]
    >
      <v-container
        fluid
        class="mt-3"
      >
        <v-row>
          <v-col
            v-if="tab.isActiveStaffTab"
            cols="4"
            md="3"
            sm="4"
            class="d-flex ga-3"
          >
            <custom-field
              v-model="quickSearch"
              id="quick-search"
              placeholder="Quick Search"
              append-inner-icon="mdi-magnify"
              clearable
              class="w-100"
              @update:modelValue="searchStaff"
            />
            <help-menu
              :options="searchFields"
              @select="onSearchFieldChange"
              :selected="selectedSearchField"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            v-if="tab.isActiveStaffTab"
            cols="4"
          >
            <custom-btn
              id="add-new-staff"
              color="accent"
              class="float-right"
              to="/Shop_Profile/staff"
            >
              Add New Staff
            </custom-btn>
          </v-col>

          <v-col cols="12">
            <custom-data-table
              id="staff-data-table"
              :headers="headers"
              :items="staffSetupTableItems"
              :loading="isLoading"
              density="comfortable"
            ></custom-data-table>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import HelpMenu from '@/components/HelpMenu.vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import { handleError } from '@/handleError';

const store = useStore();

const quickSearch = ref(null);
const isLoading = ref(false);
const currentTab = ref(1);
const activeStaffList = ref([]);
const inActiveStaffList = ref([]);
const searchFields = [
  { label: 'Employee Title', value: 'employeeTile' },
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'User ID', value: 'userName' },
];
const selectedSearchField = ref(searchFields[0].value);

const tabs = ref([
  {
    title: 'Active',
    isActiveStaffTab: true,
  },
  {
    title: 'Inactive',
  },
]);
const headers = ref([
  {
    title: '',
    value: '$$link',
    valueFrom: '_id',
    linkPrefix: 'Shop_Profile/staff',
    width: '60px',
  },
  {
    title: 'Status',
    value: '$$default',
    valueFrom: 'activeStatue',
    getValue: (item) => {
      return item.activeStatue ? 'Active' : 'InActive';
    },
  },
  {
    title: 'Title',
    value: '$$default',
    valueFrom: 'employeeTile',
  },
  {
    title: 'First Name',
    value: '$$default',
    valueFrom: 'firstName',
  },
  {
    title: 'Last Name',
    value: '$$default',
    valueFrom: 'lastName',
  },
  {
    title: 'Email',
    value: '$$default',
    valueFrom: 'email',
  },
  {
    title: 'Cell #',
    value: '$$phoneNumber',
    valueFrom: 'phone',
    sortable: false,
    cellProps: {
      // style: {
      //   textWrap: 'nowrap',
      // },
    },
  },
  {
    title: 'User ID',
    value: '$$default',
    valueFrom: 'userName',
  },
]);

const activeTabObj = computed(() => {
  return tabs.value[currentTab.value - 1];
});
const staffSetupTableItems = computed(() => {
  return activeTabObj.value.isActiveStaffTab
    ? activeStaffList.value
    : inActiveStaffList.value;
});

const fetchData = async (page) => {
  isLoading.value = true;
  const isActiveStaffTab = activeTabObj.value.isActiveStaffTab;
  const response = await store.dispatch('fetchStaffList', {
    page,
    search: isActiveStaffTab ? quickSearch.value : null,
    searchField: isActiveStaffTab ? selectedSearchField.value : null,
    isActive: isActiveStaffTab,
  });
  isLoading.value = false;

  if (!response.data) {
    return handleError(response);
  }
  const users = response.data[0]?.users || response.data;

  if (isActiveStaffTab) {
    activeStaffList.value = users;
  } else {
    inActiveStaffList.value = users;
  }
};
const tabChanged = () => {
  fetchData(1);
};
const searchStaff = debounce(async () => {
  await fetchData(1);
}, 500);

const onSearchFieldChange = (field) => {
  selectedSearchField.value = field.value || field;
  fetchData(1);
};

onMounted(async () => {
  await fetchData(1);
});
</script>
