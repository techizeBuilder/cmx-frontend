<script setup>
import { ref, watch, computed } from "vue";
import SearchPopup from "./SearchPopup.vue";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useStore } from "vuex";

const store = useStore();
const storeCustomerList = computed(() => store.getters.getCustomerList);
const storeEstimateList = computed(() => store.getters.getEstimateList);
const storeRepairOrderList = computed(() => store.getters.getRepairOrderList);
const selected = ref([]);
const options = ref([
  { name: "Customer Profile", value: "Customer Profile" },
  { name: "Estimate Profile", value: "Estimate Profile" },
  { name: "RO", value: "RO" },
  { name: "Accounts Receivable", value: "Accounts Receivable" },
  { name: "RO Archived", value: "RO Archived" },
]);
const clearAll = () => {
  selected.value = [];
};
const selectAll = () => {
  if (selected.value.length === options.value.length) {
    selected.value = [];
  } else {
    selected.value = options.value;
  }
};
const emit = defineEmits(["inputValue"]);
const inputValue = ref("");
// const handleChange = () => {
//   emit("inputValue", inputValue.value);
// };

const handleSearch = () => {
  emit("inputValue", inputValue.value);
};

watch(selected, () => {
  console.log("This is New Selected", selected.value);
  // console.log("Repair List",storeRepairOrderList.value);
  // console.log("Estimate List",storeEstimateList.value);
  // console.log("Custimer List",storeCustomerList.value);
});
</script>
<template>
  <div class="left-box">
    <div class="div-s">
      <div class="boxxx">
        <p>RO Quick View</p>
      </div>
    </div>
    <div class="py-4">
      <div class="inner-box justify-center">
        <div class="search-container">
          <div class="searchbtnblock">
            <div class="input-container col-md-12">
              <input
                placeholder="Quick Search"
                v-model="inputValue"
                class="form-control"
                id="search"
                @keydown.enter.prevent="handleSearch"
              />
              <!-- @input="handleChange" -->
              <i
                class="fa-solid fa-magnifying-glass icon"
                style="border-left: thin;"
              ></i>
            </div>
            <button @click="handleSearch" ype="button" class="btn btn-light">
              Search
            </button>
          </div>
          <SearchPopup
            style="margin-left: auto;"
            :options="[
              'Customer ID',
              'Estimate ID',
              'RO #',
              'First Name',
              'Last Name',
              'Company',
              'Customer Phone',
            ]"
            :optionsSecond="[
              'Last 6 of VIN',
              'Year, Make or Model',
              'Claim#',
              'Insurance',
              'Email',
              'Vehicle',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.multiselect__select {
  display: none;
}
.search-container {
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
.searchbtnblock {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  gap: 5px;
  width: 100%;
}
.multiselect__strong {
  display: none;
}
.multiselect__content-wrapper {
  display: block !important;
}
</style>
