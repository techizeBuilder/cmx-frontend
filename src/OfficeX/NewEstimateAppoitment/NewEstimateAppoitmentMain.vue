<script setup>
import NewEstimateApppoitmentTop from "./NewEstimateApppoitmentTop.vue";
import CustomerProfileMatch from "./CustomerProfileMatch.vue";
import EstimateProfileMatch from "./EstimateProfileMatch.vue";
import { ref } from "vue";

const topAppRef = ref();
const custAppRef = ref();
const estAppRef = ref();

const handleSearch = async (text) => {
  await custAppRef.value.searchCustomer(text);
  await estAppRef.value.searchEstimate(text);
};

const handleCustomerLink = (customerId) => {
  topAppRef.value.appoinmentData.customerProfile = customerId;
};

const handleEstimateLink = (estimateId) => {
  topAppRef.value.appoinmentData.estimateProfile = estimateId;
};
</script>

<template>
  <div class="px-3">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/officex">New Estimate Appoitment </router-link>
      </div>
    </div>
    <NewEstimateApppoitmentTop ref="topAppRef" @search="handleSearch" />

    <CustomerProfileMatch ref="custAppRef" @customerLink="handleCustomerLink" />
    <EstimateProfileMatch ref="estAppRef" @estimateLink="handleEstimateLink" />
  </div>
  <!-- The Modal -->
</template>

<style scoped></style>
