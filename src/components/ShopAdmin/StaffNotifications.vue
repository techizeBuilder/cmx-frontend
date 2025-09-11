<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
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
            cols="3"
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
              @update:modelValue="searchStaffNotifications"
            />
            <help-menu
              :options="searchFields"
              @select="onSearchFieldChange"
              :selected="selectedSearchField"
            />
          </v-col>
          <v-col cols="12">
            <custom-data-table
              id="staff-notifications-data-table"
              :headers="headers"
              :items="tab.items"
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
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import GenericForm from '@/shared/forms/GenericForm.vue';
import HelpMenu from '@/components/HelpMenu.vue';
import { useStore } from 'vuex';
import { showErrorToast } from '@/toster';

const store = useStore();

const isLoading = ref(false);
const quickSearch = ref(null);
const currentTab = ref(1);
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
    items: [],
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
      return 'Active';
    },
  },
  {
    title: 'Title',
    value: '$$default',
    valueFrom: 'employeeTile',
    getValue: (item) => {
      return 'Title';
    },
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
    title: 'Shop Admin',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.length === 6;
    },
  },
  {
    title: 'Office',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.includes('Office');
    },
  },
  {
    title: 'Estimator',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.includes('Estimator');
    },
  },
  {
    title: 'Parts',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.includes('Parts');
    },
  },
  {
    title: 'Technician',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.includes('Technician');
    },
  },
  {
    title: 'Manager',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.includes('Manager');
    },
  },
  {
    title: 'Accounting',
    value: '$$boolean',
    align: 'center',
    getValue: (item) => {
      return item['notification']?.includes('Accounting');
    },
  },
]);

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log('An error occurred while fetching data', error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push('/login');
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error('An error occurred while fetching data', error);
  } else {
    showErrorToast('Some Error Occurred!!!!');
    console.error(
      'An error occurred while fetching data. Response was not available.',
      error
    );
  }
};
const fetchData = async (page) => {
  if (tabs.value[currentTab.value - 1].items.length > 0 && !quickSearch.value) return;

  const response = await store.dispatch('fetchStaffList', {
    page,
    isActive: tabs.value[currentTab.value - 1].isActiveStaffTab,
    search: quickSearch.value,
    searchField: selectedSearchField.value,
  });

  if (!response.data) {
    return handleError(response);
  }
  const users = response.data.length
    ? response.data[0].users
    : response.data;

  if (users.length > 0) {
    return (tabs.value[currentTab.value - 1].items = users);
  } else {
    return (tabs.value[currentTab.value - 1].items = []);
  }
};

const searchStaffNotifications = async () => {
  await fetchData(1);
};

const onSearchFieldChange = (field) => {
  selectedSearchField.value = field.value || field;
  fetchData(1);
};

watch(currentTab, async () => {
  await fetchData(1);
});

watch(quickSearch, (val) => {
  if (!val) {
    fetchData(1);
  }
});

onMounted(async () => {
  isLoading.value = true;
  await fetchData(1);
  isLoading.value = false;
});
</script>
