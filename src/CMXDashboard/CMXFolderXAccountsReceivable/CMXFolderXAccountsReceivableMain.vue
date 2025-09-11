<script setup>
import openicon from "../Icons/openicon.png";
import { useRouter } from "vue-router";
import SearchPopup from "../SearchPopup.vue";
import { ref } from "vue";

const router = useRouter();
const handleCustomer = (item) => {
  router.push("/floderxmain");
};

const accountReciavable = ref([]);
</script>

<template>
  <div class="accordion-body">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#ActiveTab"
            >Accounts Receivable</a
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
            style="
              margin-right: 16px;
              background-color: #d2d4d7;
              text-shadow: 0 0 black;
            "
          >
            Print
          </button>
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
    <div
      class="cmx-dashcusprosection d-flex align-items-center flex-wrap gap-sm-4 gap-1 mt-3 mt-sm-0 justify-sm-content-between"
    >
      <div class="card totalBa">
        <p class="mb-0">Total Balance</p>
        <p class="mb-0">$0.00</p>
      </div>
      <div class="card totalBa">
        <p class="mb-0">Average Days</p>
        <p class="mb-0 totalbes">000</p>
      </div>
    </div>
    <div
      class="p-4 d-flex flex-row bd-highlight mb-3 justify-content-center gap-4"
    >
      <div class="form-group p-2">
        <select class="form-select">
          <option selected disabled>Estimator</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
        </select>
      </div>
      <div class="form-group p-2">
        <select class="form-select">
          <option selected disabled>Insurance</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
        </select>
      </div>
      <div class="form-group p-2">
        <select class="form-select">
          <option selected disabled>Days in Estimate Profile</option>
          <option value="01">1 - 10 Days</option>
          <option value="02">11 - 20 Days</option>
          <option value="03">21 - 30 Days</option>
          <option value="04">31 - 40 Days</option>
          <option value="04">41 - 50 Days</option>
          <option value="04">51 - 60 Days</option>
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
        />
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
                    <th>Day Counter</th>
                    <th>Balance</th>
                    <th>Date Closed</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Add table rows (data) here -->
                  <!-- Example: -->
                  <tr
                    v-if="accountReciavable && accountReciavable.length !== 0"
                    v-for="item in accountReciavable"
                  >
                    <td class="min-15 text-center">
                      <img
                        :src="openicon"
                        alt="openicon"
                        :style="{ width: '15px' }"
                        @click="handleCustomer"
                        role="button"
                      />
                    </td>
                    <td>{{ item._id }}</td>
                    <td>{{ item.lastName }}</td>
                    <td>{{ item.firstName }}</td>
                    <td>{{ item.year }}</td>
                    <td>{{ item.make }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.vin }}</td>
                    <td>{{ item.insurance }}</td>
                    <td>{{ item.dayCount }}</td>
                    <td>{{ item.balance }}</td>
                    <td>{{ item.dateClose }}</td>
                  </tr>

                  <!-- Add more rows as needed -->
                  <tr v-else>
                    <td
                      colspan="12"
                      class="text-center text-danger font-weight-bold py-3"
                    >
                      No Accounts Receivable Found!
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
