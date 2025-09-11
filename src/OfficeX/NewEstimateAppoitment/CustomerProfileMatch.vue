<script setup>
import { onMounted } from "vue";
import Uplaod from "../Icons/Uplaod.png";
import axios from "axios";
import { ref } from "vue";
let customers = ref([]);
const customersStatic = ref([]);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const shopId = localStorage.getItem("shopId");

const featchData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const allData = await axios.get(
      `${apiUrl}/shop/getAllCustomer/${shopId}/1`,
      config
    );
    customers.value = allData.data?.data[0]?.customers;
    customersStatic.value = allData.data?.data[0]?.customers;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await featchData();
});

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D+/g, "");
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
}

const searchCustomer = async (text) => {
  const AuthToken = localStorage.getItem("AuthToken");
  if (!shopId) {
    return router.push({ path: "/login" });
  }
  try {
    if (text.trim()) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/shop/searchCustomer/1/25/${shopId}/${text}`,
        config
      );

      customers.value = response?.data?.data[0]?.customers;
    } else {
      customers.value = customersStatic.value;
    }
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["customerLink"]);

defineExpose({ searchCustomer });
</script>
<template>
  <div class="mt-5 px-5">
    <div :style="{ borderTop: '1px dashed #787878' }">
      <h6 class="mb-3 mt-4">Customer Profile Match</h6>
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
                      <th class="text-center">Customer Profile #</th>
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
                          @click="emit('customerLink', item.customerId)"
                          type="button"
                          class="fa-solid fa-link"
                        ></i>
                      </td>
                      <td class="text-uppercase text-underline text-center">
                        {{ item.customerId }}
                      </td>
                      <td class="text-capitalize">{{ item.firstName }}</td>
                      <td class="text-capitalize">{{ item.lastName }}</td>
                      <td>{{ formatPhoneNumber(item.phone) }}</td>
                      <td
                        class="link-primary text-underline"
                        @click="handleCustomer(item._id, item.customerId)"
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
                        No Customer Profile Found!
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
