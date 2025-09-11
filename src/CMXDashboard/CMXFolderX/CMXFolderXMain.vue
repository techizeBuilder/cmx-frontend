<script setup>
import openicon from "../Icons/openicon.png";
import { useRouter } from "vue-router";
import SearchPopup from "../SearchPopup.vue";
import axios from "axios";
import { onMounted, ref, computed, watch } from "vue";
import debounce from "lodash/debounce";
import { useStore } from "vuex";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(false);
const store = useStore();
const storeShopDetails = computed(() => store.getters.getShopDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const shopId = localStorage.getItem("shopId");
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const search = ref(null);
const handleRo = (item) => {
  router.push(`/floderxmain/${item}`);
};
const handleSearch = async (e) => {
  if (e.target.value) {
    try {
      const response = await axios.get(
        `${apiUrl}/repairOrder/search/${shopId}/${e.target.value}`
      );
      repairOrderList.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    repairOrderList.value = staticData.value;
  }
};
const repairOrderList = ref([]);
const staticData = ref([]);

const featchRepair = async (item) => {
  try {
    // const response = await axios.get(
    //   `${apiUrl}/repairOrder/get/all/${shopId}/${item}`
    // );
    // repairOrderList.value = response.data.data;
    // store.dispatch("setRepairOrderList", repairOrderList.value);
    // staticData.value = response.data.data;
    // return response.data.totalCount;


    staticData.value = store.dispatch('fetchRepairOrderList', item);
    return staticData.value.length;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  isLoading.value = true;
  await featchEstimator();
  isLoading.value = false;
});
const formatDate = (date) => {
  const newDate = new Date(date);
  return moment(newDate).tz("America/New_York").format("MM/DD/YYYY - hh:mm A");
};
const debounceHandleSearch = debounce(async function (e) {
  await handleSearch(e);
}, 500);

const debounceHandleInsuarnceSearch = debounce(async function () {
  await handleInsurance();
}, 500);

const insuranceSearch = ref("");
const handleInsurance = async (req, res) => {
  if (insuranceSearch.value) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/repairOrder/get/Insurance/${shopId}/${insuranceSearch.value}`,
        config
      );
      repairOrderList.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    repairOrderList.value = staticData.value;
  }
};

const days = ref(0);
const handleDays = async () => {
  if (days.value) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/repairOrder/get/days/repair/${shopId}/${days.value}`,
        config
      );
      repairOrderList.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    repairOrderList.value = staticData.value;
  }
};

const shopEstimator = ref([]);
const featchEstimator = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/user/get/all/user/${shopId}`,
      config
    );
    shopEstimator.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const estimatro = ref("");
const repairOrderDefaultAssign = ref(false);
const handleDefault = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/shop/default/repair/Order/${shopId}`,
      {
        Estimator: estimatro.value,
        Insurance: insuranceSearch.value,
        Days: days.value,
        repairOrderDefaultAssign: repairOrderDefaultAssign.value,
      },
      config
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    console.log(error);
  }
};

const debounceHandleAllFilter = debounce(async function () {
  await handleAllFilter(selectVal.value);
}, 500);

const handleAllFilter = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/repairOrder/all/Filter/${shopId}/${item}}`,
      {
        estimatro: estimatro.value,
        insuranceSearch: insuranceSearch.value,
        days: days.value,
      },
      config
    );
    repairOrderList.value = response.data.data;
    store.dispatch("setRepairOrderList", repairOrderList.value);
    return response.data.totalCount;
  } catch (error) {
    console.log(error);
  }
};

watch(storeShopDetails, async () => {
  if (storeShopDetails.value.repairOrderDefaultAssign) {
    repairOrderDefaultAssign.value =
      storeShopDetails.value.repairOrderDefaultAssign;
    estimatro.value = storeShopDetails.value.RepairOrderDefault.Estimator;
    insuranceSearch.value = storeShopDetails.value.RepairOrderDefault.Insurance;
    days.value = storeShopDetails.value.RepairOrderDefault.Days;
    totalCount.value = await handleAllFilter(25);
  } else {
    totalCount.value = await featchRepair(25);
  }
});

const selectVal = ref(25);
const totalCount = ref(0);
const countVal = ref(1);
const countArray = [25, 50, 75, 100];

const handleSelect = async () => {
  if (storeShopDetails.value.repairOrderDefaultAssign) {
    await handleAllFilter(selectVal.value);
  } else {
    await featchRepair(selectVal.value);
  }
  countVal.value = countArray.indexOf(Number(selectVal.value)) + 1;
};

const handleInc = async () => {
  if (countVal.value < countArray.length) {
    countVal.value = countVal.value + 1;
    if (storeShopDetails.value.estimateDefaultAssign) {
      await handleAllFilter(countArray[countVal.value - 1]);
    } else {
      await featchRepair(countArray[countVal.value - 1]);
    }
    selectVal.value = countArray[countVal.value - 1];
  }
};

const handleDec = async () => {
  if (countVal.value > 1) {
    countVal.value = countVal.value - 1;
    if (storeShopDetails.value.estimateDefaultAssign) {
      await handleAllFilter(countArray[countVal.value - 1]);
    } else {
      await featchRepair(countArray[countVal.value - 1]);
    }
    selectVal.value = countArray[countVal.value - 1];
  }
};

const handleGrandTotal = (item) => {
  if (item.estimateId.paymentAmount) {
    const total = item.estimateId.paymentAmount.reduce(
      (acc, curr) => acc + (parseFloat(curr.postPayment) || 0),
      0
    );
    return isNaN(total)
      ? "0.00"
      : total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0.00";
  }
};

const handleViewAll = async () => {
  if (storeShopDetails.value.repairOrderDefaultAssign) {
    estimatro.value = storeShopDetails.value.RepairOrderDefault.Estimator;
    insuranceSearch.value = storeShopDetails.value.RepairOrderDefault.Insurance;
    days.value = storeShopDetails.value.RepairOrderDefault.Days;
    await handleAllFilter(selectVal.value);
  } else {
    estimatro.value = "";
    insuranceSearch.value = "";
    days.value = "";
    await featchRepair(selectVal.value);
  }
};
</script>

<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    background-color="#E6F0FF"
    color="#E6F0FF"
  />
  <div class="accordion-body no-select">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#ActiveTab"
            >FolderX</a
          >
        </li>
      </ul>
    </div>
    <div class="justify-content-end">
      <div class="row justify-content-end">
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
    <div
      class="p-2 d-flex flex-row bd-highlight mb-3 justify-content-center gap-4"
    >
      <div class="form-group p-2">
        Estimator
        <select
          @change="debounceHandleAllFilter"
          v-model="estimatro"
          class="form-select"
        >
          <option value="">-</option>
          <option
            v-for="item in shopEstimator"
            :value="item._id"
            :key="item._id"
            >{{ item.firstName }}</option
          >
        </select>
      </div>
      <div class="form-group p-2">
        Insurance
        <input
          class="form-control"
          type="search"
          value=""
          v-model="insuranceSearch"
          @input="debounceHandleAllFilter"
        />
      </div>
      <div class="form-group p-2">
        Days in Estimate Profile
        <select
          v-model="days"
          @change="debounceHandleAllFilter"
          class="form-select"
        >
          <option value="">-</option>
          <option value="1">1 - 10 Days</option>
          <option value="11">11 - 20 Days</option>
          <option value="21">21 - 30 Days</option>
          <option value="31">31 - 40 Days</option>
          <option value="41">41 - 50 Days</option>
          <option value="51">51 - 60 Days</option>
        </select>
      </div>
      <div class="p-2">
        <div>
          <label class="form-check-label" for="flexCheckDefault">
            Save as Default
          </label>
        </div>
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          v-model="repairOrderDefaultAssign"
          @change="handleDefault"
        />
      </div>
    </div>
    <div class="cmx-dashcusprosection">
      <div class="row">
        <div class="d-flex flex-wrap align-items-center mb-4">
          <div class="input-group" style="width: 240px;">
            <input
              class="form-control border-end-0 border"
              type="search"
              id="example-search-input"
              placeholder="Quick Search"
              @input="debounceHandleSearch"
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
              'RO #',
              'Last Name',
              'First Name',
              'Phone',
              'Email',
              'Insurance',
              'VIN',
              'Vehicle',
            ]"
          />
          <div
            class="d-flex align-items-end gap-4 justify-content-end mt-3 mt-sm-0"
          >
            <!-- <div class="edit-section gap-4">
              <div class="edit-section">
                <div class="form-cont">
                  <div class="form-group">
                    <input
                      type="text"
                      id="year"
                      name="year"
                      required=""
                      placeholder="Year"
                    />
                  </div>
                  <div class="form-group">
                    <select class="form-select">
                      <option selected disabled>Month</option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="col-lg-12">
          <div class="staffsectiontableresponsive">
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>RO #</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>VIN</th>
                    <th>Insurance</th>
                    <th>Total</th>
                    <th>Date Open</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Add table rows (data) here -->
                  <!-- Example: -->
                  <tr
                    v-if="repairOrderList && repairOrderList.length !== 0"
                    v-for="item in repairOrderList"
                  >
                    <td class="min-15 text-center">
                      <a
                        :href="`/floderxmain/${item.repairOrdreId}`"
                        target="_self"
                      >
                        <img
                          :src="openicon"
                          alt="openicon"
                          :style="{ width: '15px' }"
                          role="button"
                        />
                      </a>
                    </td>
                    <td>{{ item.repairOrdreId }}</td>
                    <td>{{ item?.estimateId?.lastName }}</td>
                    <td>{{ item?.estimateId?.firstName }}</td>
                    <td>
                      {{
                        item?.estimateId?.vehicalId?.length === 1
                          ? item?.estimateId?.vehicalId[0]?.year
                          : item?.estimateId?.vehicalId?.year
                      }}
                    </td>
                    <td>
                      {{
                        item?.estimateId?.vehicalId?.length === 1
                          ? item?.estimateId?.vehicalId[0]?.make
                          : item?.estimateId?.vehicalId?.make
                      }}
                    </td>
                    <td>
                      {{
                        item?.estimateId?.vehicalId?.length === 1
                          ? item?.estimateId?.vehicalId[0]?.model
                          : item?.estimateId?.vehicalId?.model
                      }}
                    </td>
                    <td>
                      {{
                        item?.estimateId?.vehicalId?.length === 1
                          ? item?.estimateId?.vehicalId[0]?.vin
                          : item?.estimateId?.vehicalId?.vin
                      }}
                    </td>
                    <td>{{ item?.estimateId?.insurance }}</td>
                    <td>
                      {{ handleGrandTotal(item) }}
                    </td>
                    <td>
                      {{
                        formatDate(
                          item?.estimateId?.vehicalId?.length === 1
                            ? item?.estimateId?.created_at
                            : item?.created_at
                        )
                      }}
                    </td>
                  </tr>
                  <tr v-else>
                    <td
                      colspan="12"
                      class="text-center text-danger font-weight-bold py-3"
                    >
                      No Repair Order Found!
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
            v-model="selectVal"
            @change="handleSelect"
            class="form-select"
            style="border: 0.898px solid #000;"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <span style="background-color: transparent;" class="input-group-text"
            >of {{ totalCount }}</span
          >
        </div>
        <div class="boxsg">
          <div class="sect-box-arrow">
            <button @click="handleDec" class="btn btn-light">
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <div class="box-count">{{ countVal }}</div>
            <button @click="handleInc" class="btn btn-light">
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
}
</style>
