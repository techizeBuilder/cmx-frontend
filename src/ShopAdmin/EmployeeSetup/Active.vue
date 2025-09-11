<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { inject, onMounted } from "vue";
import { ref } from "vue";

DataTable.use(DataTablesCore);
const options = { colReorder: true };

const staffDataPromise = inject("staffData");
const featchData = inject("featchData");
const staffData = ref(null);

staffDataPromise.then((value) => {
  staffData.value = value;
});
const handleUpdate = (value) => {
  console.log("handleUpdate>>>>", value);
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
    <!-- <div class="row">
            <div class="col-lg-12">
                <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">

                    <div class="d-flex align-items-end gap-4  justify-content-end">
                        <div class="d-flex align-items-end gap-4  justify-content-end">
                            <button type="button" class="btn btn-light text-nowrap" data-bs-toggle="modal"
                                data-bs-target="#updatetitle">
                                UPDATE TITLE LIST</button>  
                          
                            <button type="button" class="btn btn-light text-nowrap px-4"
                                :style="{ backgroundColor: '#2400FF', boxShadow: 'none', color: '#fff' }">
                                Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    <div class="row">
      <div class="col-lg-12">
        <div class="staffsectiontableresponsive mystaffTable">
          <router-link
            to="/AddStaff"
            class="btn btn-light text-nowrap px-4 addBtnx"
            :style="{ backgroundColor: '#FF8100' }"
          >
            AddStaff</router-link
          >
          <DataTable
            :options="options"
            class="display text-center p-4"
            width="100%"
            :key="staffData"
          >
            <thead>
              <tr class="text-center">
                <th class="text-center">Action</th>
                <th class="text-center">Status</th>
                <th class="text-center">Title</th>
                <th class="text-center" sortable @sort="sortTable('firstName')">
                  First Name
                </th>
                <th class="text-center" sortable @sort="sortTable('lastName')">
                  Last Name
                </th>
                <th class="text-center">Email</th>
                <th class="text-center">Cell #</th>
                <th class="text-center">User ID</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <!-- Add table rows (data) here -->
              <!-- Example: -->
              <tr class="text-center" v-for="item in staffData">
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
                      <li>
                        <router-link
                          :to="`/updateStaff/${item._id}`"
                          class="dropdown-item"
                          >UPDATE</router-link
                        >
                        <!-- <button
                          @click="handleUpdate(item)"
                          class="dropdown-item"
                          href="#"
                        >
                          UPDATE
                        </button> -->
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="text-center">Active</td>
                <td class="text-center">{{ item["employeeTile"] }}</td>
                <td class="text-center">{{ item["userName"] }}</td>
                <td class="text-center">{{ item["lastName"] }}</td>
                <td class="text-center">{{ item["email"] }}</td>
                <td class="text-center">{{ item["phone"] }}</td>
                <td class="text-center">{{ item["userName"] }}</td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <div class="navigation-sectionsame">
    <div class="box">
      <select v-model="selectFilter" @change="handleFilter" class="form-select">
        <option value="1">10</option>
        <option value="2">25</option>
        <option value="3">50</option>
        <option value="4">100</option>
      </select>
    </div>
    <div class="boxsg">
      <div class="sect-box-arrow">
        <i type="button" @click="handleDec" class="fa-solid fa-angle-left"></i>
        <div class="box-count">{{ selectFilter }}</div>
        <i type="button" @click="handleInc" class="fa-solid fa-angle-right"></i>
      </div>
    </div>
  </div>
  <div class="modal fade login-popup-dashtwo" id="updatetitle">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Update Title</p>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="space-btm-space">
                <div class="row">
                  <div class="col-lg-6">
                    <p class="datexlable">Enter new title</p>
                    <div class="customerXBox">
                      <input class="form-control" type="text" />
                    </div>
                    <button type="button" class="btn btn-light mt-3">
                      Add
                    </button>
                  </div>

                  <div class="col-lg-6">
                    <p class="datexlable">Title List</p>
                    <div class="card pb-2">
                      <div class="card-body TitleOverflow">
                        <ul class="noList">
                          <li>CEO (Chief Executive Officer)</li>
                          <li>Owner</li>
                          <li>NVP (National Vice President)</li>
                          <li>RVP (Regional Vice President)</li>
                          <li>COO (Chief Operating Officer)</li>
                          <li>Director</li>
                          <li>Controller</li>
                          <li>Administrative</li>
                          <li>Accountant</li>
                          <li>Office</li>
                          <li>Shop Foreman</li>
                          <li>Shop Manager</li>
                          <li>Estimator</li>
                          <li>Parts</li>
                          <li>Body Technician</li>
                          <li>Frame Technician</li>
                          <li>Painter</li>
                          <li>Detailer Technician</li>
                          <li>Paint Prepper</li>
                          <li>Maintenance Technician</li>
                          <li>Parts Delivery Driver</li>
                          <li>Shop Helper</li>
                        </ul>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-light mt-1"
                        :style="{ fontSize: '12px' }"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div class="col-12 mt-4">
                    <div class="btn-btn d-flex justify-content-between gap-5">
                      <button class="Cancel" type="button">Cancel</button>
                      <button class="submit" type="submit">Save</button>
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
<style scoped>
.TitleOverflow {
  max-height: 250px;
  overflow-y: auto;
}

.noList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.addBtnx {
  position: absolute;
  right: 75px;
}
</style>
