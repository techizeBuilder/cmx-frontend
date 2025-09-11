<script setup>
import ShopDetails from "./ShopDetails.vue";
import Rates from "./Rates.vue";
import Setting from "./Setting.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast } from "../../toster";
import axios from "axios";

const isAuthenticatedComponent = ref(false);
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const route = useRoute();

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push("/login");
  } else if (error.response) {
    localStorage.clear();
    router.push("/login");
    showErrorToast(error.response.data.msg);
    console.error("An error occurred while fetching data", error);
  } else {
    showErrorToast("Some Error Occurred!!!!");
    console.error(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
};

onMounted(() => {
  axios
    .post(`${apiUrl}/api/auth/check`, { token: AuthToken })
    .then((response) => {
      isAuthenticatedComponent.value = response.data.success;
    })
    .catch((error) => {
      handleError(error);
    });
});
</script>

<template>
  <div class="shoppage-section">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#tabmobileone"
            >Shop Details</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#tabmobiletwo"
            >Default Shop Rates</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#tabmobilethree"
            >Settings</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first">
      <div class="tab-content">
        <div
          v-if="isAuthenticatedComponent"
          class="tab-pane show active"
          id="tabmobileone"
        >
          <ShopDetails />
        </div>
        <div v-if="isAuthenticatedComponent" class="tab-pane" id="tabmobiletwo">
          <Rates />
        </div>
        <div
          v-if="isAuthenticatedComponent"
          class="tab-pane"
          id="tabmobilethree"
        >
          <Setting />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
