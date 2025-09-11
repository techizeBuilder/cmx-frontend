<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import openicon from "../Icons/openicon.png";
import SearchPopup from "../SearchPopup.vue";
import debounce from "lodash/debounce";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const shopId = localStorage.getItem("shopId");
const maxPage = ref();
const customers = ref();
const page = ref(1);
const pageSize = ref(25);
const customersStatic = ref();
const search = ref("");
const totalCustomer = ref(0);

const fetchDataOnMount = async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const AuthToken = localStorage.getItem("AuthToken");
  if (!shopId) {
    return router.push({ path: "/login" });
  }

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/shop/getAllCustomer/${shopId}/${page.value}`,
      config
    );
    totalCustomer.value = response.data.totalCustomer;
    customersStatic.value = response.data.data[0].customers;
    customers.value = customersStatic.value;
    store.dispatch("setCustomerList", customers.value);
    maxPage.value = Math.ceil(customers.value.length / 25) - 1;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      router.push("/login");
    } else {
      console.log("An error occurred while fetching data", error);
    }
  }
};

onMounted(async () => {
  await fetchDataOnMount();
});

const fetchData = async () => {
  const AuthToken = localStorage.getItem("AuthToken");
  if (!shopId) {
    return router.push({ path: "/login" });
  }
  try {
    if (search.value.trim()) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/shop/searchCustomer/${page.value}/${
          pageSize.value
        }/${shopId}/${search.value ? search.value : null}`,
        config
      );

      customers.value = response?.data?.data[0]?.customers;
    } else {
      customers.value = customersStatic.value;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      router.push("/login");
    } else if (error.response) {
      console.log("An error occurred while fetching data", error);
    } else {
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
};

const handleChange = async () => {
  await fetchData();
};
const decPage = () => {
  if (!maxPage && !page.value === 1) {
    page.value--;
  }
};
const incPage = () => {
  if (!maxPage && !page.value === 1 && !(maxPage === page.value)) {
    page.value++;
  }
};

watch(pageSize, async () => {
  await fetchData();
});

const handleCustomer = (item, customerId) => {
  localStorage.setItem("cId", customerId);
  router.push(`/customeridprofile/${item}`);
};
const handleViewAll = () => {
  customers.value = customersStatic.value;
  search.value = "";
};
const debounceHandleSearch = debounce(async function () {
  await handleChange();
}, 500);

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D+/g, "");
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
}
</script>

<template>
  <div class="accordion-body no-select">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#ActiveTab"
            >Customer Profile</a
          >
        </li>
      </ul>
    </div>
    <div class="justify-content-end">
      <div class="row justify-content-end">
        <div class="accomdation-viewmore col-auto">
          <router-link to="/newcustomer" class="btn btn-light text-nowrap">
            <img
              src="../Icons/add-90-32.png"
              alt="add-90-32.png"
              :style="{ width: '20px', height: '20px' }"
            />
            New Customer</router-link
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn viewall"
            style="background-color: #d2d4d7; text-shadow: 0 0 black;"
            @click="handleViewAll"
          >
            View All
          </button>
        </div>
      </div>
    </div>
    <div class="cmx-dashcusprosection">
      <div class="d-flex align-items-center mb-4">
        <div class="input-group" style="width: 240px;">
          <input
            class="form-control border-end-0 border"
            type="search"
            @input="debounceHandleSearch"
            v-model="search"
            id="example-search-input"
            placeholder="Quick Search"
          />
          <span class="input-group-append">
            <button
              class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
              type="button"
            >
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
        <SearchPopup
          :options="[
            'Customer # ',
            'Last Name',
            'First Name',
            'Phone',
            'Email',
            'Insurance',
            'VIN',
            'Vehicle',
          ]"
        />
        <!-- <div class="headProps">
                    <h4 class="text-color"> {{ props.title }}</h4>
                </div> -->
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="staffsectiontableresponsive">
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th class="text-center"></th>
                    <th>Customer ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Phone 1</th>
                    <th>Phone 2</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Add table rows (data) here -->
                  <!-- Example: -->
                  <tr
                    v-if="customers && customers?.length !== 0"
                    v-for="(item, index) in customers"
                    :key="index"
                  >
                    <td class="min-15 text-center" role="button">
                      <a
                        :href="`/customeridprofile/${item.customerId}`"
                        target="_self"
                      >
                        <img
                          :src="openicon"
                          alt="openicon"
                          :style="{ width: '15px' }"
                        />
                      </a>
                    </td>
                    <td class="text-uppercase">{{ item.customerId }}</td>
                    <td class="text-capitalize">{{ item.lastName }}</td>
                    <td class="text-capitalize">{{ item.firstName }}</td>
                    <td>{{ formatPhoneNumber(item.phone) }}</td>
                    <td>{{ formatPhoneNumber(item.phone2) }}</td>
                  </tr>

                  <!-- Add more rows as needed -->
                  <tr v-else>
                    <td
                      colspan="6"
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
      <div class="navigation-sectionsame">
        <div class="box d-flex">
          <select
            v-model="pageSize"
            class="form-select"
            style="border: 0.898px solid #000;"
          >
            <option value="">-</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <span style="background-color: transparent;" class="input-group-text"
            >of {{ totalCustomer }}</span
          >
        </div>
        <div class="boxsg">
          <div class="sect-box-arrow">
            <i @click="decPage" class="fa-solid fa-angle-left"></i>
            <div class="box-count">{{ page }}</div>
            <i @click="incPage" class="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.no-select {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
}
</style>
