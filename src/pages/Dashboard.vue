<template>
  <v-row>
    <page-header
      title="CMX Dashboard"
      to="/"
      hide-divider
      class="mt-2"
    />

    <v-col
      cols="12"
      md="8"
      sm="8"
    >
      <custom-expansion-panel
        v-model="activeDailyActivityPanel"
        :panels="[{ title: 'Daily Activity', icon: '' }]"
      >
        <template #content-0>
          <quick-view :search-input="searchInput" />
        </template>
      </custom-expansion-panel>
    </v-col>

    <v-col
      cols="12"
      class="mt-3"
    >
      <custom-expansion-panel
        v-model="activePanels"
        :panels="panels"
      />
    </v-col>

    <scroll-to-top />
  </v-row>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { useStore } from 'vuex';

import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import QuickSearch from '@/components/Dashboard/QuickSearch.vue';
import QuickView from '@/components/Dashboard/QuickView.vue';
import CustomerProfile from '@/components/Dashboard/CustomerProfile.vue';
import EstimateProfile from '@/components/Dashboard/EstimateProfile.vue';
import RepairOrder from '@/components/Dashboard/RepairOrder.vue';
import AccountsReceivable from '@/components/Dashboard/AccountsReceivable.vue';
import ROArchived from '@/components/Dashboard/ROArchived.vue';
import PageHeader from '@/components/PageHeader.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const store = useStore();
const searchInput = ref('');
const activePanels = ref([]);
const activeDailyActivityPanel = ref([0]);
const panels = ref([
  {
    title: 'Customer Profile',
    icon: 'Customerpro.png',
    component: shallowRef(CustomerProfile),
  },
  {
    title: 'Estimate Profile',
    icon: 'EstimateProfile.png',
    component: shallowRef(EstimateProfile),
  },
  {
    title: 'RO - Repair Order',
    icon: 'FolderX.png',
    component: shallowRef(RepairOrder),
  },
  {
    title: 'Accounts Receivable',
    icon: 'FolderAccount.png',
    component: shallowRef(AccountsReceivable),
  },
  {
    title: 'RO Archived',
    icon: 'FolderArchived.png',
    component: shallowRef(ROArchived),
  },
]);

const onInputChange = (value) => {
  searchInput.value = value;
};

onMounted(async () => {
  store.dispatch('fetchShopDetails');
});
</script>
