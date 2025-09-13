<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import checkIcons from "../icons/checkIcons.png";
import StafhrModule from "./StafhrModule.vue";
import { inject } from "vue";
import { ref } from "vue";

DataTable.use(DataTablesCore);

const staffDataPromise = inject("staffData");
const featchData = inject("featchData");
const staffData = ref(null);

staffDataPromise.then((value) => {
  staffData.value = value;
});

const customerData = ref([]);
const handleUpdateModel = (item) => {
  customerData.value = item;
};

const selectFilter = ref(1);
const handleFilter = async () => {
  staffData.value = await featchData(selectFilter.value);
};

const handleDec = async () => {
  if (Number(selectFilter.value) > 1) {
    selectFilter.value = Number(selectFilter.value) - 1;
    await handleFilter();
  }
};

const handleInc = async () => {
  if (Number(selectFilter.value) < 4) {
    selectFilter.value = Number(selectFilter.value) + 1;
    await handleFilter();
  }
};
</script>

<template>
  <div class="staffpermissionsection">
    <div class="row">
      <div class="col-lg-12">
        <div class="staffsectiontableresponsive">
          <DataTable class="display" width="100%" :key="staffData">
            <thead>
              <tr>
                <th class="text-center">Action</th>
                <th class="text-center">Status</th>
                <th class="text-center">Title</th>
                <th class="text-center" sortable @sort="sortTable('firstName')">
                  First&nbsp;Name
                </th>
                <th class="text-center" sortable @sort="sortTable('lastName')">
                  Last&nbsp;Name
                </th>
                <th class="text-center">Shop&nbsp;Admin</th>
                <th class="text-center">Office</th>
                <th class="text-center">Estimator</th>
                <th class="text-center">Parts</th>
                <th class="text-center">Technician</th>
                <th class="text-center">Manager</th>
                <th class="text-center">Accounting</th>
              </tr>
            </thead>
            <tbody>
              <!-- Add table rows (data) here -->
              <!-- Example: -->

              <tr v-for="item in staffData">
                <td class="text-center">
                  <div class="btn-group dropend">
                    <a
                      href="javascript:void(0)"
                      class="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-ellipsis"></i>
                    </a>
                    <ul class="dropdown-menu">
                      <!-- <li><a class="dropdown-item" href="#">Action</a></li> -->
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#UpdateStaff"
                          @click="handleUpdateModel(item)"
                          >Update</a
                        >
                      </li>
                      <!-- <li><a class="dropdown-item" href="#">Pending</a></li> -->
                    </ul>
                  </div>
                </td>
                <td class="text-center">unAction</td>
                <td class="text-center">Title</td>
                <td class="text-center">{{ item["firstName"] }}</td>
                <td class="text-center">{{ item["lastName"] }}</td>
                <td class="text-center">
                  <img
                    v-if="item['permissions']?.length === 6"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>
                <td class="text-center">
                  <img
                    v-if="item['permissions']?.includes('Office')"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>

                <td class="text-center">
                  <img
                    v-if="item['permissions']?.includes('Estimator')"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>
                <td class="text-center">
                  <img
                    v-if="item['permissions']?.includes('Parts')"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>
                <td class="text-center">
                  <img
                    v-if="item['permissions']?.includes('Technician')"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>
                <td class="text-center">
                  <img
                    v-if="item['permissions']?.includes('Accounting')"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>
                <td class="text-center">
                  <img
                    v-if="item['permissions']?.includes('Manager')"
                    :src="checkIcons"
                    alt="checkIcons"
                  />
                </td>
              </tr>

              <!-- Add more rows as needed -->
            </tbody>
          </DataTable>
        </div>
        <div class="navigation-sectionsame">
          <div class="box">
            <select
              v-model="selectFilter"
              @change="handleFilter"
              class="form-select"
            >
              <option value="1">10</option>
              <option value="2">25</option>
              <option value="3">50</option>
              <option value="4">75</option>
            </select>
          </div>
          <div class="boxsg">
            <div class="sect-box-arrow">
              <i
                type="button"
                @click="handleDec"
                class="fa-solid fa-angle-left"
              ></i>
              <div class="box-count">{{ selectFilter }}</div>
              <i
                type="button"
                @click="handleInc"
                class="fa-solid fa-angle-right"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade login-popup-dashtwo" id="UpdateStaff">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body mymodules">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Action: Edit, add staff</p>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>

            <div class="shoppage-section">
              <div class="scrool-delevry">
                <ul class="nav nav-nav nav-tabs">
                  <li class="nav-item">
                    <a
                      class="nav-link show active"
                      data-bs-toggle="tab"
                      href="#stafHrOne"
                      >Staff Setup</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#stafHrTwo"
                      >Staff HR</a
                    >
                  </li>
                </ul>
              </div>
              <div class="select-option-first p-3 m-3">
                <div class="tab-content">
                  <div class="tab-pane show active" id="stafHrOne">
                    <StafhrModule :customerData="customerData" />
                  </div>
                  <div class="tab-pane" id="stafHrTwo">
                    <h1>mansih01</h1>
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
<style scoped>
.mymodules {
  background-color: #fff !important;
}
</style>
