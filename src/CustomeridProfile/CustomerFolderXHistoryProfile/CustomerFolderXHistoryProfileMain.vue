<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showErrorToast } from "../../toster";
import { computed } from "vue";
import { watch } from "vue";

const store = useStore();
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);
const router = useRouter();
const route = useRoute();
const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      console.log(errorMsg);
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    showErrorToast(error.response.message);
    router.push("/login");
  } else if (error.response) {
    showErrorToast(error.response.data.message);
    console.log("An error occurred while fetching data", error);
  } else {
    showErrorToast("Some Error Occured!!!");
    console.log(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
};

const vehicalData = ref([]);

watch(storeCustomerDetails, async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/customerVehical/cutomer/vehicals/${storeCustomerDetails.value._id}`,
      config
    );
    vehicalData.value = gotData.data.data;
  } catch (error) {
    handleError(error);
  }
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#CustomerFolderXHistory"
            >Customer RO History</a
          >
        </li>
      </ul>
    </div>

    <div class="table-responsive mystripetable mt-3">
      <table class="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th class="text-nowrap">FolderX#</th>
            <th class="text-nowrap">Year</th>
            <th class="text-nowrap">Make</th>
            <th class="text-nowrap">Model</th>
            <th class="text-nowrap">VIN</th>
            <th class="text-nowrap">Insurance</th>
            <th class="text-nowrap">Amount</th>
            <th class="text-nowrap">Balance</th>
            <th class="text-nowrap">Date Closed</th>
            <th class="text-nowrap">Estimator Name</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <td class="text-center text-underline">
              00000000
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>12345678901234567</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="text-center">
            <td class="text-center text-underline">
              00000000
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
th {
  vertical-align: middle;
  background-color: #ccdff1;
}

td {
  vertical-align: middle;
  text-align: center;
}

div#myModal {
  z-index: 9999;
}
</style>
