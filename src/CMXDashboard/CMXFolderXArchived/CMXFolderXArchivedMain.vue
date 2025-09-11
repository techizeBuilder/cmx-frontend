<script setup>
import { onMounted } from "vue";
import openicon from "../Icons/openicon.png";
import SearchPopup from "../SearchPopup.vue";
import axios from "axios";
import { ref } from "vue";

const shopId = localStorage.getItem("shopId");
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");

const repairArchihveList = ref([]);
const handleArchive = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/repairOrder/get/all/Archived/:${item}/${shopId}`,
      config
    );
    repairArchihveList.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await handleArchive(25);
});

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

const formatDate = (date) => {
  const newDate = new Date(date);
  return moment(newDate).tz("America/New_York").format("MM/DD/YYYY - hh:mm A");
};
</script>

<template>
  <div class="accordion-body">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#ActiveTab"
            >RO Archived</a
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
          >
            View All
          </button>
        </div>
      </div>
    </div>

    <div class="row justify-content-end">
      <div class="col-sm-12 col-md-9 mx-auto">
        <div class="row justify-content-center">
          <div class="col-md-3">
            <div class="mb-3">
              <label for="estimator" class="form-label">Estimator</label>
              <select class="form-select" id="estimator">
                <option value="" disabled selected></option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <label for="months" class="form-label">Insurance</label>
              <select class="form-select" id="months">
                <option value="" disabled selected></option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <label for="months" class="form-label">Select Month</label>
              <select class="form-select" id="months">
                <option value="" disabled selected></option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <label for="year" class="form-label">Enter Year</label>
              <input type="text" class="form-control" id="year" required />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cmx-dashcusprosection">
      <div class="row">
        <div class="d-flex flex-wrap align-items-center mb-4">
          <div class="input-group w-25">
            <input
              class="form-control border-end-0 border"
              type="search"
              placeholder="Quick Search"
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
          <!-- <div
            class="d-flex align-items-end gap-4 mt-3 mt-sm-0 justify-content-end"
          >
            <button type="button" class="btn viewall">View All</button>
            <div class="edit-section gap-4">
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
            </div>
          </div> -->
        </div>
        <div class="col-lg-12">
          <div class="staffsectiontableresponsive">
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th class="text-center"></th>
                    <th>RO #</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>VIN</th>
                    <th>Insurance</th>
                    <th>Estimator</th>
                    <th>Total</th>
                    <th>Date Closed</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Add table rows (data) here -->
                  <!-- Example: -->
                  <tr
                    v-if="repairArchihveList && repairArchihveList.length !== 0"
                    v-for="item in repairArchihveList"
                  >
                    <td class="min-15 text-center">
                      <img
                        :src="openicon"
                        alt="openicon"
                        :style="{ width: '15px' }"
                      />
                    </td>
                    <td>
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

                  <!-- Add more rows as needed -->
                  <tr v-else>
                    <td
                      colspan="12"
                      class="text-center text-danger font-weight-bold py-3"
                    >
                      No Repair Order Archived Found!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="navigation-sectionsame">
        <div class="box">
          <select class="form-select" style="border: 0.898px solid #000;">
            <option selected>25</option>
            <option value="1">50</option>
            <option value="2">75</option>
            <option value="3">100</option>
          </select>
        </div>
        <div class="boxsg">
          <div class="sect-box-arrow">
            <i class="fa-solid fa-angle-left"></i>
            <div class="box-count">01</div>
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
