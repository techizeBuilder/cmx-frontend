<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import openicon from "./Icons/openicon.png";
import { watch, computed, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
//import 'datatables.net-colReorder';
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(false);
const shopId = localStorage.getItem("shopId");
const apiUrl = import.meta.env.VITE_API_URL;
const store = useStore();
const storeRepairOrderList = computed(() => store.getters.getRepairOrderList);
const repairList = ref([]);
DataTable.use(DataTablesCore);
let dataTableInstance;
const options = {
  colReorder: true,
  searching: true,
  initComplete: function () {
    // Access DataTable instance
    dataTableInstance = this.api();
  },
};

const handleSearch = async (item) => {
  if (item) {
    try {
      const response = await axios.get(
        `${apiUrl}/repairOrder/search/${shopId}/${item}`
      );
      repairList.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    repairList.value = [...Object.values(storeRepairOrderList.value)];
  }
};

const props = defineProps(["tableSearch"]);
watch(props, () => {
  handleSearch(props.tableSearch);
  // dataTableInstance.search(props.tableSearch).draw();
});

watch(storeRepairOrderList, () => {
  if (storeRepairOrderList.value) {
    repairList.value = [...Object.values(storeRepairOrderList.value)];
  }
});
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
  <div class="left-box no-select">
    <div class="div-s">
      <div class="boxxx">
        <!-- <p>Quick View Last 50 RO Activity (Open)</p> -->
        <p>Quick View FolderX Activity (Open)</p>
      </div>
    </div>

    <div class="table-set-holdcmsdash quickview">
      <div class="staffsectiontableresponsive">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>RO #</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>VIN</th>
            </tr>
          </thead>
          <tbody>
            <!-- Add table rows (data) here -->
            <!-- Example: -->
            <tr
              v-if="repairList && repairList.length !== 0"
              v-for="item in repairList"
            >
              <td class="min-15 text-center">
                <a :href="`/floderxmain/${item.repairOrdreId}`" target="_self">
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
                  item?.estimateId?.vehicalId.length === 1
                    ? item?.estimateId?.vehicalId[0]?.year
                    : item?.estimateId?.vehicalId?.year
                }}
              </td>
              <td>
                {{
                  item?.estimateId?.vehicalId.length === 1
                    ? item?.estimateId?.vehicalId[0]?.make
                    : item?.estimateId?.vehicalId?.make
                }}
              </td>
              <td>
                {{
                  item?.estimateId?.vehicalId.length === 1
                    ? item?.estimateId?.vehicalId[0]?.model
                    : item?.estimateId?.vehicalId?.model
                }}
              </td>
              <td>
                {{
                  item?.estimateId?.vehicalId.length === 1
                    ? item?.estimateId?.vehicalId[0]?.vin
                    : item?.estimateId?.vehicalId?.vin
                }}
              </td>
            </tr>

            <!-- Add more rows as needed -->
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
</template>
<style setup>
.dataTables_filter {
  display: none;
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
}
</style>
