<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { inject, onMounted } from "vue";
import { ref } from "vue";
//import 'datatables.net-colReorder';
DataTable.use(DataTablesCore);
const options = {
  colReorder: true,
};
const staffData = ref();
const featchData = inject("featchDeactive");

onMounted(async () => {
  try {
    const data = await featchData(1);
    staffData.value = data;
  } catch (error) {
    console.log(error);
  }
});

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
          <DataTable
            :options="options"
            class="display text-center"
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
                <td class="text-center">Inactive</td>
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
        <option value="4">75</option>
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
</template>
