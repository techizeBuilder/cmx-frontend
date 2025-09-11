<script setup>
import InviteChat from "./InviteChat.vue";
import { watch, ref } from "vue";

const props = defineProps(["customerData"]);
const customerData = ref("");
watch(props, () => {
  customerData.value = props.customerData;
});

const emit = defineEmits(["SelectText"]);
const handleText = (text) => {
  emit("SelectText", text);
};

function formatPhoneNumber(phone) {
  if (phone) {
    const cleaned = phone.replace(/\D+/g, "");
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
}
</script>
<template>
  <div class="px-3" :style="{ width: '600px' }">
    <div class="dtopbtn d-flex gap-4 justify-content-center pb-2">
      <button class="btn btn-light">
        <i class="fa-solid fa-circle" :style="{ color: '#00FF51' }"></i>
        &nbsp;Opt In
      </button>
      <!-- <button class="btn btn-light">
        <i class="fa-solid fa-print"></i>&nbsp; Print
      </button> -->
    </div>
    <hr :style="{ color: '#E6EBF5', borderWidth: '2px', opacity: 1 }" />
    <div class="d-block dcustometDe mt-4 mb-4">
      <h6 class="fw-bold text-center mb-4">
        {{ customerData?.firstName?.toUpperCase() }}
      </h6>
      <p class="mb-1">Phone : {{ formatPhoneNumber(customerData?.phone) }}</p>
      <p>Email : {{ customerData.email }}</p>
    </div>
    <hr
      class="py-2"
      :style="{ color: '#E6EBF5', borderWidth: '2px', opacity: 1 }"
    />
    <p class="mb-1">
      <i class="fa-solid fa-link"></i>
      <span :style="{ color: '#91929E' }"> Customer ID:</span>&nbsp;
      <span :style="{ color: '#0066FF', textDecoration: 'underline' }">
        <a
          :href="`/customeridprofile/${customerData.customerId?.customerId}`"
          target="_self"
          >{{ customerData.customerId?.customerId }}</a
        ></span
      >
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
        {{ customerData.year }} <br />
        {{ customerData.make }}<br />
        {{ customerData.model }}<br />
        {{ customerData.insurance }}<br />
      </span>
    </p>

    <hr :style="{ color: '#E6EBF5', borderWidth: '2px', opacity: 1 }" />

    <InviteChat @SelectText="handleText" />
  </div>
</template>

<style scoped>
.customerRatingR .checked,
.GoogleRatingR .checked {
  color: orange;
}
</style>
