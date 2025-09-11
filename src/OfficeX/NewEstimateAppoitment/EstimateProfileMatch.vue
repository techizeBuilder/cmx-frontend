<script setup>
import { onMounted } from "vue";
import Uplaod from "../Icons/Uplaod.png";
import { ref } from "vue";
import axios from "axios";
let customers = ref([]);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const shopId = localStorage.getItem("shopId");
const staticData = ref([]);

const featchAllEstimate = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/get/all/${shopId}/${item}`,
      config
    );
    customers.value = response.data.data;
    staticData.value = response.data.data;
  } catch (error) {
    handleError(error);
  }
};

onMounted(async () => {
  await featchAllEstimate(100);
});

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D+/g, "");
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
}

const searchEstimate = async (text) => {
  if (text.trim()) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/estimateProfile/search/${shopId}/${text}`,
        config
      );
      customers.value = response.data.data;
    } catch (error) {
      handleError(error);
    }
  } else {
    customers.value = staticData.value;
  }
};

const emit = defineEmits(["estimateLink"]);

defineExpose({ searchEstimate });
</script>
<template>
  <div class="mt-3 px-5">
    <div :style="{ borderTop: '1px dashed #787878' }">
      <h6 class="mb-3 mt-4">Estimate Profile Match</h6>
      <div class="cmx-dashcusprosection">
        <div class="row">
          <div class="col-lg-12">
            <div class="staffsectiontableresponsive">
              <div class="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th :style="{ backgroundColor: '#D9D9D9' }"></th>
                      <th class="text-center">Link</th>
                      <th class="text-center">Estimate Profile #</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone 1</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Add table rows (data) here -->
                    <!-- Example: -->
                    <tr
                      v-if="customers && customers.length !== 0"
                      v-for="(item, index) in customers"
                      :key="index"
                    >
                      <td class="text-uppercase text-center">
                        <img
                          :src="Uplaod"
                          alt="Uplaod"
                          :style="{ width: '18px' }"
                        />
                      </td>
                      <td class="text-uppercase text-center">
                        <i
                          @click="emit('estimateLink', item.estimateId)"
                          type="button"
                          class="fa-solid fa-link"
                        ></i>
                      </td>
                      <td class="text-uppercase text-underline text-center">
                        {{ item.estimateId }}
                      </td>
                      <td class="text-capitalize">{{ item.firstName }}</td>
                      <td class="text-capitalize">{{ item.lastName }}</td>
                      <td>{{ formatPhoneNumber(item.phone) }}</td>
                      <td
                        class="link-primary text-underline"
                        @click="handleCustomer(item._id, item.estimateId)"
                        role="button"
                      >
                        {{ item.email }}
                      </td>
                    </tr>

                    <!-- Add more rows as needed -->
                    <tr v-else>
                      <td
                        colspan="12"
                        class="text-center text-danger font-weight-bold py-3"
                      >
                        No Estimate Profile Found!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
