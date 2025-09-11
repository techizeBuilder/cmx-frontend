<script setup>
import { ref } from "vue";
import InviteChat from "./InviteChat.vue";

const customerData = ref([]);
const vehicalData = ref([]);
const handleCustomer = async (customerDataFound) => {
  customerData.value = customerDataFound.customerId;
  vehicalData.value = customerDataFound.vehicalId;
};

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D+/g, "");
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
}

const emit = defineEmits(["chatLinkData"]);
const handleChat = (item) => {
  emit("chatLinkData", item);
};

defineExpose({ handleCustomer });
</script>
<template>
  <div class="px-3" :style="{ width: '450px' }">
    <div class="dtopbtn d-flex gap-4 justify-content-center">
      <button class="btn btn-light">
        <i class="fa-solid fa-circle" :style="{ color: '#00FF51' }"></i>
        &nbsp;Opt In
      </button>
    </div>
    <hr :style="{ color: '#E6EBF5', borderWidth: '2px', opacity: 1 }" />
    <div class="d-block dcustometDe mt-3 mb-3">
      <h6 class="fw-bold text-center mb-3">
        {{
          customerData?.firstName
            ? customerData?.firstName?.toUpperCase()
            : "Customer Name"
        }}
      </h6>
      <p class="mb-1">
        Phone :
        {{
          customerData?.phone
            ? formatPhoneNumber(customerData?.phone)
            : "XXXXXXXX"
        }}
      </p>
      <p>
        Email :
        {{ customerData?.email ? customerData?.email : "XXXXXXXX@gmail.com" }}
      </p>
    </div>
    <hr
      class="py-1"
      :style="{ color: '#E6EBF5', borderWidth: '2px', opacity: 1 }"
    />
    <p class="mb-1">
      <i class="fa-solid fa-link"></i>
      <span :style="{ color: '#91929E' }"> Customer ID:</span>&nbsp;
      <a
        :href="`/customeridprofile/${customerData._id}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span :style="{ color: '#0066FF', textDecoration: 'underline' }">{{
          customerData?.customerId ? customerData?.customerId : "000000"
        }}</span>
      </a>
    </p>
    <p class="mb-1">
      <i class="fa-solid fa-link"></i>
      <span :style="{ color: '#91929E' }"> RO:</span>&nbsp;
      <span :style="{ color: '#0066FF', textDecoration: 'underline' }"
        >000000</span
      >
    </p>
    <p class="ps-4 mb-1">
      <span :style="{ color: '#91929E' }">RO Status: Open</span>
    </p>
    <p class="ps-4">
      <span :style="{ color: '#91929E' }">
        {{ vehicalData?.year ? vehicalData?.year : "Year" }} <br />
        {{ vehicalData?.make ? vehicalData?.make : "Make" }}<br />
        {{ vehicalData?.model ? vehicalData?.model : "Model" }}<br />
        Insurance<br />
      </span>
    </p>

    <hr :style="{ color: '#E6EBF5', borderWidth: '2px', opacity: 1 }" />

    <InviteChat @chatLinkData="handleChat" />
  </div>
</template>

<style scoped>
.customerRatingR .checked,
.GoogleRatingR .checked {
  color: orange;
}
</style>
