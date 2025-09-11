<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { showSuccessToast } from "../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
// const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const isOpenTimelineupdate = ref(false);
const fieldIndex = ref(null);

let PayItem = ref([
  { name: "Arrived", background: "white", key: "Arrived" },
  { name: "Estimate Approved", background: "white", key: "EstimateApproved" },
  { name: "Parts Ordered", background: "white", key: "PartsOrdered" },
  { name: "Parts Arrived", background: "white", key: "PartsArrived" },
  { name: "Repair Plan", background: "white", key: "RepairPlan" },
  { name: "Supplement Hold", background: "white", key: "SupplementHold" },
  { name: "Supplment Approved", background: "white", key: "SupplmentApproved" },
  { name: "Body Frame", background: "white", key: "BodyFrame" },
  { name: "Mechanical", background: "white", key: "Mechanical" },
  { name: "Paint", background: "white", key: "Paint" },
  { name: "Reassembly", background: "white", key: "Reassembly" },
  { name: "ADAS Mechanical", background: "white", key: "ADASMechanical" },
  { name: "Detail", background: "white", key: "Detail" },
  { name: "Ready for Pickup", background: "white", key: "ReadyforPickup" },
  { name: "Delivered", background: "white", key: "Delivered" },
  { name: "Paid in Full", background: "white", key: "PaidInFull" },
]);

const colorLabel = {
  Default: "Default",
  "Not Apply": "NotApply",
  "Needs Action": "NeedsAction",
  Processed: "Processed",
  Completed: "Completed",
};

const colorType = {
  white: "Default",
  "#D9D9D9": "Not Apply",
  "#F0F511": "Needs Action",
  "#2858FF": "Processed",
  "#008836": "Completed",
};

const colors = {
  Default: "white",
  NotApply: "#D9D9D9",
  NeedsAction: "#F0F511",
  Processed: "#2858FF",
  Completed: "#008836",
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
      colors[colorLabel[storeEstimateDetails.value.StatusUpdate[item.key]]];
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
              <div class="paymentContentHead">{{ Item.name }}</div>
              <div
                type="button"
                class="paymentContentDeck tooltipFolderX"
                data-bs-toggle="modal"
                data-bs-target="#TimeLineFolderXModel"
              >
                <span
                  v-if="colorType[Item.background] !== 'Default'"
                  class="tooltipFolderXtext"
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
</template>
<style scoped>
.paymentContentDeck.tooltipFolderX {
  position: relative;
  opacity: 1;
}

.paymentContentDeck.tooltipFolderX .tooltipFolderXtext {
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

.paymentContentDeck.tooltipFolderX:hover .tooltipFolderXtext {
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
