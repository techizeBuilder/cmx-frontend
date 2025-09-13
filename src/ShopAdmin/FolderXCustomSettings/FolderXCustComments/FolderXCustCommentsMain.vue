<script setup>
import CustomerComments from "./CustomerComments.vue";
import InsuranceComments from "./InsuranceComments.vue";
import PartsComments from "./PartsComments.vue";
import PaymentsComments from "./PaymentsComments.vue";
import RepairsComments from "./RepairsComments.vue";
import SupplementComments from "./SupplementComments.vue";
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";
import { showErrorToast, showSuccessToast } from "../../../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const shopId = localStorage.getItem("shopId");
const AuthToken = localStorage.getItem("AuthToken");
const customerCommentData = ref({});

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

const featchData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/shopDefaultComments/get/all/commensts/${shopId}`,
      config
    );
    customerCommentData.value = response.data.data;
  } catch (error) {
    handleError(error);
  }
};

onMounted(async () => {
  await featchData();
});
const refreshData = async () => {
  await featchData();
};
</script>

<template>
  <div class="shoppage-section">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs m-0">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#ComCustomer"
            >Customer</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ComInsurance"
            >Insurance</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ComParts">Parts</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ComPayments"
            >Payments</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ComRepairs"
            >Repairs</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ComSupplement"
            >Supplement</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first">
      <div class="tab-content">
        <div class="tab-pane show active" id="ComCustomer">
          <CustomerComments
            :customerCommentData="customerCommentData.Customer"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane " id="ComInsurance">
          <InsuranceComments
            :customerCommentData="customerCommentData.Insurance"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane " id="ComParts">
          <PartsComments
            :customerCommentData="customerCommentData.Parts"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane" id="ComPayments">
          <PaymentsComments
            :customerCommentData="customerCommentData.Payments"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane" id="ComRepairs">
          <RepairsComments
            :customerCommentData="customerCommentData.Repairs"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane" id="ComSupplement">
          <SupplementComments
            :customerCommentData="customerCommentData.Supplement"
            @elementAdded="refreshData"
          />
        </div>
      </div>
    </div>
  </div>
</template>
