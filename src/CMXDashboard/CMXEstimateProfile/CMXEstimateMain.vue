<script setup>
import { onMounted, computed, watch } from "vue";
import { showErrorToast } from "../../toster";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import openicon from "../Icons/openicon.png";
import SearchPopup from "../SearchPopup.vue";
import filter from "../Icons/filter.png";
import debounce from "lodash/debounce";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();
const storeShopDetails = computed(() => store.getters.getShopDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const storeEstimateList = computed(() => store.getters.getEstimateList);
const shopId = localStorage.getItem("shopId");
const router = useRouter();
const props = defineProps(["title"]);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const estimateData = ref([]);
const staticData = ref([]);
const seacrhYear = ref("");
const Month = ref(0);
const search = ref(null);

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

const featchAllEstimate = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/get/all/${shopId}/${item}`,
      config
    );
    estimateData.value = response.data.data;
    store.dispatch("setEstimateList", estimateData.value);
    staticData.value = response.data.data;
    return response.data.totalCount;
  } catch (error) {
    handleError(error);
  }
};

onMounted(async () => {
  await featchEstimator();
  await handleArchive(25);
});

const handleSearch = async (e) => {
  if (e.target.value) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/estimateProfile/search/${shopId}/${e.target.value}`,
        config
      );
      estimateData.value = response.data.data;
    } catch (error) {
      handleError(error);
    }
  } else {
    estimateData.value = staticData.value;
  }
};
const handleYearMonth = async () => {
  const yearRegex = /^(19|20)\d{2}$/;
  if (seacrhYear.value && yearRegex.test(seacrhYear.value)) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/estimateProfile/search/year/${shopId}/${seacrhYear.value}/${Month.value}`,
        config
      );
      estimateData.value = response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
};

const formatDate = (date) => {
  const newDate = new Date(date);
  return moment(newDate).tz("America/New_York").format("MM/DD/YYYY - hh:mm A");
};
const handleEstimate = (item) => {
  router.push(`/estimatexprofile/${item}`);
};

const debounceHandleSearch = debounce(async function (e) {
  await handleSearch(e);
}, 500);

const debounceHandleInsuarnceSearch = debounce(async function () {
  await searchInsuarnce();
}, 500);

const insuranceSearch = ref("");
const searchInsuarnce = async () => {
  if (insuranceSearch.value) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/estimateProfile/search/insurance/${shopId}/${insuranceSearch.value}`,
        config
      );
      estimateData.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    estimateData.value = staticData.value;
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
        `${apiUrl}/estimateProfile/byDays/${shopId}/${days.value}`,
        config
      );
      estimateData.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    estimateData.value = staticData.value;
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
    handleError(error);
  }
};

const debounceHandleAllFilter = debounce(async function () {
  await handleAllFilter(selectVal.value);
}, 500);

const totalCount = ref(0);
const estimatro = ref("");
const handleAllFilter = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/all/Filter/${shopId}/${item}`,
      {
        estimatro: estimatro.value,
        insuranceSearch: insuranceSearch.value,
        days: days.value,
      },
      config
    );
    estimateData.value = response.data.data;
    store.dispatch("setEstimateList", response.data.data);
    return response.data.totalCount;
  } catch (error) {
    console.log(error);
  }
};

const estimateDefaultAssign = ref(false);
const handleDefault = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/shop/default/Estimate/${shopId}`,
      {
        Estimator: estimatro.value,
        Insurance: insuranceSearch.value,
        Days: days.value,
        estimateDefaultAssign: estimateDefaultAssign.value,
      },
      config
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    console.log(error);
  }
};

watch(storeShopDetails, async () => {
  if (storeShopDetails.value.estimateDefaultAssign) {
    estimateDefaultAssign.value = storeShopDetails.value.estimateDefaultAssign;
    estimatro.value = storeShopDetails.value.EstimateDefault.Estimator;
    insuranceSearch.value = storeShopDetails.value.EstimateDefault.Insurance;
    days.value = storeShopDetails.value.EstimateDefault.Days;
    totalCount.value = await handleAllFilter(25);
  } else {
    totalCount.value = await featchAllEstimate(25);
  }
});

const handleStaffName = (item) => {
  if (item) {
    const firstName = shopEstimator.value.find((val) => val._id === item)
      .firstName;
    return firstName;
  }
};

const selectVal = ref(25);
const handleSelect = async () => {
  if (storeShopDetails.value.estimateDefaultAssign) {
    await handleAllFilter(selectVal.value);
  } else {
    await featchAllEstimate(selectVal.value);
  }
  countVal.value = countArray.indexOf(Number(selectVal.value)) + 1;
};

const countVal = ref(1);
const countArray = [25, 50, 75, 100];

const handleInc = async () => {
  if (countVal.value < countArray.length) {
    countVal.value = countVal.value + 1;
    if (storeShopDetails.value.estimateDefaultAssign) {
      await handleAllFilter(countArray[countVal.value - 1]);
    } else {
      await featchAllEstimate(countArray[countVal.value - 1]);
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
      await featchAllEstimate(countArray[countVal.value - 1]);
    }
    selectVal.value = countArray[countVal.value - 1];
  }
};

const handleGrandTotal = (item) => {
  if (item.paymentAmount) {
    const total = item.paymentAmount.reduce(
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
  if (storeShopDetails.value.estimateDefaultAssign) {
    estimatro.value = storeShopDetails.value.EstimateDefault.Estimator;
    insuranceSearch.value = storeShopDetails.value.EstimateDefault.Insurance;
    days.value = storeShopDetails.value.EstimateDefault.Days;
    await handleAllFilter(selectVal.value);
  } else {
    estimatro.value = "";
    insuranceSearch.value = "";
    days.value = "";
    await featchAllEstimate(selectVal.value);
  }
};

const archiveList = ref([]);
const handleArchive = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/Archived/get/all/${item}/${shopId}`,
      config
    );
    archiveList.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const handleArchiveSearch = async (text) => {
  if (text) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const response = await axios.get(
        `${apiUrl}/estimateProfile/search/Archive/${shopId}/${text}`,
        config
      );
      archiveList.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="accordion-body no-select">
    <div class="cmx-dashcusprosection">
      <div class="scrool-delevry">
        <ul class="nav nav-nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link show active"
              data-bs-toggle="tab"
              href="#ActiveTab"
              >Estimate Profile</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#ArchivedTab"
              >Archived</a
            >
          </li>
        </ul>
      </div>
      <div class="cmx-tabsection">
        <div class="tab-content">
          <div class="tab-pane show active" id="ActiveTab">
            <div class="estimatedetailsection">
              <div>
                <div class="row">
                  <div class="col">
                    <p class="nav-link pl-2">60 Day Activity</p>
                  </div>
                  <div class="col text-right d-flex justify-content-end">
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
              <img :src="filter" />
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
                    v-model="estimateDefaultAssign"
                    @change="handleDefault"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-rowset">
                  <div class="d-flex flex-wrap align-items-center mb-4">
                    <div
                      class="input-group justify-content-center"
                      style="width: 240px;"
                    >
                      <input
                        class="form-control border-end-0 border"
                        type="search"
                        value=""
                        id="example-search-input"
                        v-model="search"
                        @input="debounceHandleSearch"
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
                        'Estimate #',
                        'Last Name',
                        'First Name',
                        'Phone',
                        'Email',
                        'VIN',
                        'Insurance',
                        'Estimator',
                        'Vehicle',
                      ]"
                    />
                    <div
                      class="d-flex align-items-end gap-4 mt-3 mt-sm-0 justify-content-end"
                    >
                      <!-- <div class="edit-section gap-4">
                        <div class="edit-section">
                          <div class="form-cont">
                            <div class="form-group">
                              <input
                                type="text"
                                id="year"
                                name="Year"
                                required=""
                                v-model="seacrhYear"
                                placeholder="Year"
                                @input="handleYearMonth"
                              />
                            </div>
                            <div class="form-group">
                              <select
                                v-model="Month"
                                @change="handleYearMonth"
                                class="form-select"
                              >
                                <option selected disabled>Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="staffsectiontableresponsive">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th class="text-center"></th>
                            <th>Estimate&nbsp;#</th>
                            <th>Last&nbsp;Name</th>
                            <th>First&nbsp;Name</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>VIN</th>
                            <th>Insurance</th>
                            <th>Estimator</th>
                            <th>Total</th>
                            <th>Estimator&nbsp;Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Add table rows (data) here -->
                          <!-- Example: -->
                          <tr
                            v-if="estimateData && estimateData.length !== 0"
                            v-for="item in estimateData"
                          >
                            <td class="min-15 text-center">
                              <a
                                :href="`/estimatexprofile/${item.estimateId}`"
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
                            <td>{{ item.estimateId }}</td>
                            <td>{{ item.lastName }}</td>
                            <td>{{ item.firstName }}</td>
                            <td>{{ item.vehicalId.year }}</td>
                            <td>{{ item.vehicalId.make }}</td>
                            <td>{{ item.vehicalId.model }}</td>
                            <td>{{ item.vehicalId.vin }}</td>
                            <td>{{ item?.insuranceId?.InsuranceName }}</td>
                            <td>
                              {{
                                item?.estimateStaff?.EstimatorStaff
                                  ? handleStaffName(
                                      item?.estimateStaff?.EstimatorStaff
                                    )
                                  : null
                              }}
                            </td>
                            <td>{{ handleGrandTotal(item) }}</td>
                            <td>{{ formatDate(item.created_at) }}</td>
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
                      <div class="navigation-sectionsame p-4">
                        <div class="box d-flex">
                          <select
                            @change="handleSelect"
                            class="form-select"
                            style="border: 0.898px solid #000;"
                            v-model="selectVal"
                          >
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                          </select>
                          <div
                            class="input-group-text"
                            style="background-color: transparent;"
                          >
                            of {{ totalCount }}
                          </div>
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
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane show" id="ArchivedTab">
            <div class="estimatedetailsection">
              <div class="row">
                <div class="col-lg-12 col-rowset pt-5">
                  <div
                    class="d-flex flex-wrap align-items-end gap-sm-4 mb-4 justify-content-between"
                  >
                    <div class="input-group w-25">
                      <input
                        class="form-control border-end-0 border"
                        type="search"
                        @input="handleArchiveSearch($event.target.value)"
                        id="example-search-input"
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
                    <div
                      class="d-flex align-items-end gap-4 mt-3 mt-sm-0 justify-content-end"
                    >
                      <button type="button" class="btn viewall">
                        View All
                      </button>
                      <div class="edit-section gap-4">
                        <div class="edit-section">
                          <div class="form-cont">
                            <div class="form-group">
                              <input
                                type="text"
                                id="year"
                                name="Year"
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
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="staffsectiontableresponsive">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th
                              class="text-center"
                              :style="{ minWidth: '15px' }"
                            ></th>
                            <th>Estimate #</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>VIN</th>
                            <th>Insurance</th>
                            <th>Estimator</th>
                            <th>Total</th>
                            <th>Estimator Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Add table rows (data) here -->
                          <!-- Example: -->
                          <tr
                            v-for="item in archiveList"
                            v-if="archiveList && archiveList.length !== 0"
                          >
                            <td class="min-15 text-center">
                              <img
                                :src="openicon"
                                alt="openicon"
                                :style="{ width: '15px' }"
                              />
                            </td>
                            <td>
                              {{
                                item?.estimateStaff?.EstimatorStaff
                                  ? handleStaffName(
                                      item?.estimateStaff?.EstimatorStaff
                                    )
                                  : null
                              }}
                            </td>
                            <td>{{ item.lastName }}</td>
                            <td>{{ item.firstName }}</td>
                            <td>{{ item.vehicalId.year }}</td>
                            <td>{{ item.vehicalId.make }}</td>
                            <td>{{ item.vehicalId.model }}</td>
                            <td>{{ item.vehicalId.vin }}</td>
                            <td>{{ item?.insuranceId?.InsuranceName }}</td>
                            <td>
                              {{
                                item?.estimateStaff?.EstimatorStaff
                                  ? handleStaffName(
                                      item?.estimateStaff?.EstimatorStaff
                                    )
                                  : null
                              }}
                            </td>
                            <td>{{ handleGrandTotal(item) }}</td>
                            <td>{{ formatDate(item.created_at) }}</td>
                          </tr>
                          <!-- Add more rows as needed -->

                          <tr v-else>
                            <td
                              colspan="12"
                              class="text-center text-danger font-weight-bold py-3"
                            >
                              No Archived Estimate Profile Found!
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="navigation-sectionsame p-4">
                        <div class="box d-flex">
                          <select
                            class="form-select"
                            style="border: 0.898px solid #000;"
                          >
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                          </select>
                          <div
                            class="input-group-text"
                            style="background-color: transparent;"
                          >
                            of
                          </div>
                        </div>
                        <div class="boxsg">
                          <div class="sect-box-arrow">
                            <button class="btn btn-light">
                              <i class="fa-solid fa-angle-left"></i>
                            </button>
                            <div class="box-count"></div>
                            <button class="btn btn-light">
                              <i class="fa-solid fa-angle-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
