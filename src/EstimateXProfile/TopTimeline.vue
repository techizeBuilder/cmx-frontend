<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { showSuccessToast } from "../toster";
import { onMounted } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
// const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const isOpenTimelineupdate = ref(false);
const fieldIndex = ref(null);
const openUpadateModel = (item) => {
  updateId.value =
    storeEstimateDetails.value.StatusUpdate[PayItem.value[item].key];
  isOpenTimelineupdate.value = true;
  fieldIndex.value = item;
};

let PayItem = ref([
  { name: "Arrived", background: "#ffffff", key: "Arrived" },
  { name: "Estimate Approved", background: "#ffffff", key: "EstimateApproved" },
  { name: "Parts Ordered", background: "#ffffff", key: "PartsOrdered" },
  { name: "Parts Arrived", background: "#ffffff", key: "PartsArrived" },
  { name: "Repair Plan", background: "#ffffff", key: "RepairPlan" },
  { name: "Supplement Hold", background: "#ffffff", key: "SupplementHold" },
  {
    name: "Supplment Approved",
    background: "#ffffff",
    key: "SupplmentApproved",
  },
  { name: "Body Frame", background: "#ffffff", key: "BodyFrame" },
  { name: "Mechanical", background: "#ffffff", key: "Mechanical" },
  { name: "Paint", background: "#ffffff", key: "Paint" },
  { name: "Reassembly", background: "#ffffff", key: "Reassembly" },
  { name: "ADAS Mechanical", background: "#ffffff", key: "ADASMechanical" },
  { name: "Detail", background: "#ffffff", key: "Detail" },
  { name: "Ready for Pickup", background: "#ffffff", key: "ReadyforPickup" },
  { name: "Delivered", background: "#ffffff", key: "Delivered" },
  { name: "Paid in Full", background: "#ffffff", key: "PaidInFull" },
]);

const colorLabel = {
  Default: "Default",
  "Not Apply": "NotApply",
  "Needs Action": "NeedsAction",
  Processed: "Processed",
  Completed: "Completed",
};

const colors = {
  Default: "white",
  NotApply: "#D9D9D9",
  NeedsAction: "#F0F511",
  Processed: "#2858FF",
  Completed: "#008836",
};

const colorType = {
  white: "Default",
  "#D9D9D9": "Not Apply",
  "#F0F511": "Needs Action",
  "#2858FF": "Processed",
  "#008836": "Completed",
};

const timeLineUpdate = ref({
  Default: true,
  NotApply: false,
  NeedsAction: false,
  Processed: false,
  Completed: false,
});
const updateId = ref("");
const handleUpadte = async (value) => {
  updateId.value = value;
  PayItem.value[fieldIndex.value].background =
    colors[colorLabel[updateId.value]];
  await handleUpdateStatus(updateId.value);
};

const handleUpdateStatus = async (value) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/status/Updates/${
        storeEstimateDetails.value._id
      }/${PayItem.value[fieldIndex.value].key}/${value}`,
      config
    );
    showSuccessToast(response.data.msg);
    // store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    console.log(error);
  }
};

watch(
  updateId,
  () => {
    for (let key in timeLineUpdate.value) {
      if (key !== colorLabel[updateId.value]) {
        timeLineUpdate.value[key] = false;
      } else {
        timeLineUpdate.value[key] = true;
      }
    }
  },
  { deep: true }
);
watch(storeEstimateDetails, () => {
  PayItem.value.map((item) => {
    item.background =
      colors[colorLabel[storeEstimateDetails.value?.StatusUpdate[item.key]]] ||
      "white";
  });
});
</script>
<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex gap-4">
        <div class="PaymentBox w-100">
          <div class="d-flex">
            <div
              class="paymentContent flex-fill"
              v-for="(Item, index) in PayItem"
              v-bind:key="index"
            >
              <div class="paymentContentHead">
                {{ Item.name }}
              </div>
              <div
                type="button"
                class="paymentContentDeck tooltip"
                data-bs-toggle="modal"
                data-bs-target="#TimeLineModel"
              >
                <span
                  v-if="colorType[Item.background] !== 'Default'"
                  class="tooltiptext"
                  :style="{
                    backgroundColor: Item.background,
                    color:
                      colorType[Item.background] === 'Needs Action' ||
                      colorType[Item.background] === 'Not Apply'
                        ? 'black'
                        : '',
                  }"
                  >{{ colorType[Item.background] }}</span
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 122.88 122.88"
                  :fill="Item.background"
                  width="25"
                  height="25"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  style="enable-background: new 0 0 128.88 12.88;"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      class="st0"
                      d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44C27.51,122.88,0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    class="timeLineBox heightYu OpenTimelineupdate"
    v-show="isOpenTimelineupdate"
  >
    <div class="card-body">
      <div class="card mt-">
        <div class="timeLineBoxtop">
          <p class="m-0">RO Timeline update</p>
          <div
            class="cursor-pointer"
            @click="() => (isOpenTimelineupdate = false)"
          >
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div class="pl-4 p8" style="padding: 4px 8px;">
          <p class="m-0">Select a category</p>
        </div>

        <div class="pTableFlow px-5 mt-4 mb-4">
          <table class="table table-bordered table-sm">
            <tbody>
              <tr>
                <td>
                  <div class="TimeAZ">
                    <span class="DotA"></span>
                  </div>
                </td>
                <td class="text-center TimeAZ justify-content-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="mySwitch"
                      name="darkmode"
                      v-model="timeLineUpdate.Default"
                      @input="handleUpadte('Default')"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="TimeAZ">
                    <span
                      class="DotA"
                      :style="{ background: '#D9D9D9' }"
                    ></span>
                    Not Apply
                  </div>
                </td>
                <td class="text-center TimeAZ justify-content-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="mySwitch"
                      name="darkmode"
                      v-model="timeLineUpdate.NotApply"
                      @input="handleUpadte('Not Apply')"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="TimeAZ">
                    <span
                      class="DotA"
                      :style="{ background: '#F0F511' }"
                    ></span>
                    Needs Action
                  </div>
                </td>
                <td class="text-center TimeAZ justify-content-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="mySwitch"
                      name="darkmode"
                      v-model="timeLineUpdate.NeedsAction"
                      @input="handleUpadte('Needs Action')"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="TimeAZ">
                    <span
                      class="DotA"
                      :style="{ background: '#2858FF' }"
                    ></span>
                    Processed
                  </div>
                </td>
                <td class="text-center TimeAZ justify-content-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="mySwitch"
                      name="darkmode"
                      v-model="timeLineUpdate.Processed"
                      @input="handleUpadte('Processed')"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="TimeAZ">
                    <span
                      class="DotA"
                      :style="{ background: '#008836' }"
                    ></span>
                    Completed
                  </div>
                </td>
                <td class="text-center TimeAZ justify-content-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="mySwitch"
                      name="darkmode"
                      v-model="timeLineUpdate.Completed"
                      @input="handleUpadte('Completed')"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> -->
</template>
<style scoped>
.paymentContentDeck.tooltip {
  position: relative;
  opacity: 1;
}

.paymentContentDeck.tooltip .tooltiptext {
  color: #fff;
  font-weight: 600;
  visibility: hidden;
  width: 120px;
  background-color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  left: 50%;
  margin-left: -60px;
  bottom: 100%;
  position: absolute;
  z-index: 1;
}

.paymentContentDeck.tooltip:hover .tooltiptext {
  visibility: visible;
}

.heightYu {
  height: 500px;
  margin-bottom: 7px;
}
.DotA {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  box-shadow: 0px 4.258px 4.258px rgba(0, 0, 0, 0.25);
  display: inline-block;
  border: 1px solid #eee;
  cursor: pointer;
}
.timeLineBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 300px;
  padding: 16px;
}

.timeLineBoxtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: #d9d9d9;
  border-bottom: 1px solid #ccc;
}
</style>
