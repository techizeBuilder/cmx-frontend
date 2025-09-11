<template>
  <dynamic-panel-content
    id="Customer_Profile"
    v-model:tab="currentTab"
    :tabs="tabs"
    :isLoading="isLoading"
    @update:search="handleChange"
  />
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import DynamicPanelContent from './DynamicPanelContent.vue';

const currentTab = ref(1);
const isLoading = ref(false);
const page = ref(1);
const itemsPerPage = ref(10);
const offset = ref(0);
const HEADERS = [
  {
    title: '',
    value: '$$link',
    valueFrom: 'customerId',
    linkPrefix: 'customer-profile',
  },
  {
    title: 'Customer ID',
    value: '$$default',
    valueFrom: 'customerId',
  },
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
    title: 'Phone 1',
    value: '$$phoneNumber',
    valueFrom: 'phone',
    minWidth: '150px',
    sortable: false,
  },
  {
    title: 'Phone 2',
    value: '$$phoneNumber',
    valueFrom: 'phone2',
    minWidth: '150px',
    sortable: false,
  },
];

const store = useStore();
const customers = ref();
const customersStatic = ref();
const search = ref('');
const totalCustomer = ref(0);

const tabs = computed(() => [
  {
    title: 'Customer Profile',
    btnsConfig: [
      {
        title: 'New Customer',
        prependIcon: 'mdi-plus-circle-outline',
        to: '/newcustomer',
        onClick: () => {},
      },
      {
        title: 'View All',
        onClick: () => {},
      },
    ],
    helpMenuProps: {
      options: [
        'Customer # ',
        'Last Name',
        'First Name',
        'Phone',
        'Email',
        'Insurance',
        'VIN',
        'Vehicle',
      ],
    },
    tableProps: {
      noDataText: 'No Customer Profile Found!',
      headers: HEADERS,
      items: customers.value,
      itemsPerPage: itemsPerPage.value,
      page: page.value,
      events: {
        'update:options': onOptionsChange,
      },
    },
  },
]);

const fetchDataOnMount = async () => {
  isLoading.value = true;
  const [totalCustomerCount, customersResponseList] =
    await store.dispatch('fetchCustomers', page.value);
  totalCustomer.value = totalCustomerCount;
  customersStatic.value = customersResponseList;
  customers.value = customersStatic.value;
  isLoading.value = false;
};

onMounted(async () => {
  await fetchDataOnMount();
});

const onOptionsChange = (options) => {
  if (
    itemsPerPage.value !== options.itemsPerPage ||
    page.value !== options.page
  ) {
    itemsPerPage.value = options.itemsPerPage;
    page.value = options.page;
    offset.value =
      options.page * options.itemsPerPage - options.itemsPerPage;
  }
};

const fetchData = async (filtersApplied = {}) => {
  if (filtersApplied.search?.trim()) {
    const response = await store.dispatch('searchCustomer', {
      page: page.value,
      pageSize: itemsPerPage.value,
      search: filtersApplied.search,
    });
    customers.value = response;
  } else {
    customers.value = customersStatic.value;
  }
};

const handleChange = async (filtersApplied) => {
  await fetchData(filtersApplied);
};

watch(itemsPerPage, async () => {
  await fetchData();
});

const handleViewAll = () => {
  customers.value = customersStatic.value;
  search.value = '';
};
</script>

<style lang="scss"></style>
