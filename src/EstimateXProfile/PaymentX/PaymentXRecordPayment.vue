<script setup>
import { useStore } from "vuex";
import { watch, computed, ref } from "vue";
import axios from "axios";
import Record from "../Icons/Record.png";
import { showSuccessToast } from "../../toster";
import billIcon from "../Icons/billIcon.png";
import splitIcon from "../Icons/splitIcon.png";
import PaymentModule from "./PaymentModule.vue";
import thumbUp from "../Icons/thumbUp.png";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const store = useStore();
const isLoading = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storepaymentFields = computed(() => store.getters.getPaymentFields);
const storeDocumentList = computed(() => store.getters.getDocumentList);
const postPayment = ref(null);
const completeSplit = ref(false);
let PayItem = ref([
  { name: "Customer", price: "0.00" },
  { name: "Insurance", price: "0.00" },
  { name: "Grand Total", price: "0.00" },
  { name: "Total Posted", price: "0.00" },
]);
const EditField = ref({});
const editField = ref("");
const handleEdit = (value) => {
  editField.value = value;
};

const paymentLable = {
  recordOfEstimate: "Record of Estimate",
  supplement1: "Supplement 1",
  deductible: "Deductible",
  customerPay: "Customer Pay",
  betterment: "Betterment",
  appearanceAllowance: "Appearance Allowance",
  other: "Other",
  totalLossCharges: "Total Loss Charges",
};

const paymentTypes = ref([
  "recordOfEstimate",
  "supplement1",
  "deductible",
  "customerPay",
  "betterment",
  "appearanceAllowance",
  "other",
  "totalLossCharges",
]);

const mainEdit = ref(false);
const handleMainEdit = () => {
  mainEdit.value = !mainEdit.value;
};

const paymentKeys = [
  "paymentFrom",
  "paymentAmountDue",
  "postPayment",
  "PaymentType",
  "transaction",
  "creditCardType",
  "verifiedDate",
];

const staticPaymentAmount = {
  recordOfEstimate: { key: "recordOfEstimate", ...createPaymentObject() },
  supplement1: { key: "supplement1", ...createPaymentObject() },
  deductible: { key: "deductible", ...createPaymentObject() },
  customerPay: { key: "customerPay", ...createPaymentObject() },
  betterment: { key: "betterment", ...createPaymentObject() },
  appearanceAllowance: { key: "appearanceAllowance", ...createPaymentObject() },
  other: { key: "other", ...createPaymentObject() },
  totalLossCharges: { key: "totalLossCharges", ...createPaymentObject() },
};
const paymentAmount = ref(staticPaymentAmount);

function createPaymentObject() {
  return paymentKeys.reduce((acc, key) => {
    acc[key] =
      key === "paymentAmountDue"
        ? (0.0).toFixed(2)
        : key === "paymentFrom"
        ? "Customer"
        : key === "postPayment"
        ? (0.0).toFixed(2)
        : null;
    return acc;
  }, {});
}

const UpdateFieldsFunc = (val) => {
  const def = [
    "recordOfEstimate",
    "supplement1",
    "deductible",
    "customerPay",
    "betterment",
    "appearanceAllowance",
    "other",
    "totalLossCharges",
  ];
  paymentTypes.value = def;
  for (let i = 0; i < val; i++) {
    const index = paymentTypes.value.indexOf("supplement1") + i;
    paymentTypes.value.splice(index + 1, 0, `supplement${i + 2}`);
    paymentLable[`supplement${i + 2}`] = `Supplement ${i + 2}`;
    if (!paymentAmount.value[`supplement${i + 2}`]) {
      paymentAmount.value[`supplement${i + 2}`] = {
        key: `supplement${i + 2}`,
        ...createPaymentObject(),
      };
    }
  }
};

const handleSavePostPayment = async () => {
  isLoading.value = true;
  try {
    const filterData = Object.values(paymentAmount.value).filter((item) =>
      paymentTypes.value.includes(item.key)
    );
    const response = await axios.post(
      `${apiUrl}/estimateProfile/paymentAmount/Update/${storeEstimateDetails.value?._id}`,
      { paymentAmount: filterData }
    );
    mainEdit.value = false;
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    showSuccessToast(response.data.msg);
    setTimeout(() => {
      showSuccessToast("You Can See the Document in the Documents Sections");
    }, 5000);
    // document.getElementById("flushCollapsecmsoneCloseButton").click();
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};

const validatePaymentAmount = (paymentAmount) => {
  const errors = {};
  if (!paymentAmount.PaymentType) {
    errors[paymentAmount.key] = {
      ...errors,
      PaymentType: "Payment Type due is required",
    };
  }
  return errors;
};

const errors = ref({});
const handleFullPayment = async (file, lable) => {
  // errors.value = validatePaymentAmount(paymentAmount.value[lable]);
  // if (Object.values(errors.value).length === 0) {
  try {
    isLoading.value = true;
    const formData = new FormData();
    for (const key in paymentAmount.value[lable]) {
      formData.append(key, paymentAmount.value[lable][key]);
    }
    formData.append("UploadData", file);
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/full/Payment/${storeEstimateDetails.value?._id}/${lable}`,
      formData,
      config
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    showSuccessToast(response.data.msg);
    setTimeout(() => {
      showSuccessToast("You Can See the Document in the Documents Sections");
    }, 5000);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
  // }
};

const handleEditPostPayment = async (val) => {
  try {
    const response = await axios.post(
      `${apiUrl}/estimateProfile/Update/Fields/${storeEstimateDetails.value?._id}/${val}`,
      paymentAmount.value[val]
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

const calculateAmount = () => {
  let custTot = 0;
  let insTot = 0;
  let totalPost = 0;
  Object.values(paymentAmount.value).map((item) => {
    if (EditField.value[item.key]) {
      if (item.paymentFrom === "Customer") {
        custTot += parseFloat(item.paymentAmountDue);
        totalPost += parseFloat(item.postPayment);
      } else if (item.paymentFrom === "Insurance") {
        insTot += parseFloat(item.paymentAmountDue);
        totalPost += parseFloat(item.postPayment);
      }
    }
  });
  PayItem.value.map((item) => {
    switch (item.name) {
      case "Customer":
        item.price = !hasDecimalExceeded(custTot)
          ? custTot.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : custTot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      case "Insurance":
        item.price = !hasDecimalExceeded(insTot)
          ? insTot.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : insTot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      case "Grand Total":
        item.price = !hasDecimalExceeded(custTot + insTot)
          ? (custTot + insTot).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : (custTot + insTot).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      default:
        item.price = !hasDecimalExceeded(totalPost)
          ? totalPost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : totalPost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });
};

function hasDecimalExceeded(num) {
  const numStr = num.toString();
  const decimalIndex = numStr.indexOf(".");
  if (decimalIndex !== -1) {
    const decimalDigits = numStr.substring(decimalIndex + 1);
    return decimalDigits.length < 2;
  }
  return false;
}

const shouldSplitDisplayButton = (item) => {
  return (
    (paymentAmount.value[item].paymentAmountDue >= "0.00" &&
      paymentAmount.value[item].paymentAmountDue !==
        paymentAmount.value[item].postPayment) ||
    paymentAmount.value[item].PaymentType !== "Split" ||
    (paymentAmount.value[item].paymentAmountDue === "0.00" &&
      paymentAmount.value[item].postPayment === "0.00")
  );
};

const shouldSplitDisable = (item) => {
  return !(
    mainEdit.value &&
    paymentAmount.value[item].PaymentType === "Split" &&
    parseFloat(paymentAmount.value[item].paymentAmountDue) > 0
  );
};

const shouldFullDisplayButton = (item) => {
  return (
    (paymentAmount.value[item].paymentAmountDue >= "0.00" &&
      paymentAmount.value[item].paymentAmountDue !==
        paymentAmount.value[item].postPayment) ||
    paymentAmount.value[item].PaymentType === "Split" ||
    (paymentAmount.value[item].paymentAmountDue === "0.00" &&
      paymentAmount.value[item].postPayment === "0.00")
  );
};

const shouldFullDisable = (item) => {
  return !(
    mainEdit.value &&
    paymentAmount.value[item].PaymentType !== "Split" &&
    parseFloat(paymentAmount.value[item].paymentAmountDue) > 0
  );
};

watch(storeEstimateDetails, () => {
  if (storeEstimateDetails.value.StatusUpdate.Delivered === "Completed") {
    deliverMark.value = true;
  }
  const supplementPattern = /^supplement\d+$/;
  let supplementCount = -1;
  storeEstimateDetails.value?.paymentAmount.forEach((item) => {
    if (supplementPattern.test(item.key)) {
      supplementCount++;
    }
  });
  UpdateFieldsFunc(supplementCount);
  storeEstimateDetails.value?.paymentAmount.forEach((item) => {
    paymentAmount.value[item.key] = { ...item, staffId: item.staffId };
    if (parseFloat(item.paymentAmountDue) > 0.0) {
      EditField.value[item.key] = true;
    } else {
      EditField.value[item.key] = false;
    }
  });
  calculateAmount();
});
watch(
  EditField,
  () => {
    calculateAmount();
  },
  { deep: true }
);
watch(
  storepaymentFields,
  () => {
    EditField.value = storepaymentFields.value;
  },
  { deep: true }
);

const getDocumentFileRefName = (documentId) => {
  const findDoc = storeDocumentList.value.find((val) => val._id === documentId);
  return findDoc ? findDoc.FileRefName : null;
};

const handleDocName = (documentId) => {
  const findDoc = storeDocumentList.value.find((val) => val._id === documentId);
  return findDoc ? findDoc.DocumentshowName : "Not Found";
};

const deliverMark = ref(false);
const handleDelivered = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateProfile/update/delivered/${deliverMark.value}/${storeEstimateDetails.value?._id}`
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    console.log(error);
  }
};

const startFancy = (id) => {
  const url = `${apiUrl}/documents/${getDocumentFileRefName(id)}`;
  Fancybox.show([
    {
      src: url,
    },
  ]);
};
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
  <div class="estimatedetailsection">
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <div
              class="d-flex align-items-end gap-4 w-100 justify-sm-content-end flex-wrap"
            >
              <button type="button" class="btn btn-light text-nowrap">
                <label>
                  <input
                    :disabled="!mainEdit"
                    class="form-check-input"
                    type="checkbox"
                    v-model="deliverMark"
                    @change="handleDelivered"
                  />&nbsp; Mark Vehicle Delivered
                </label>
              </button>
              <button
                type="button"
                class="btn btn-light px-4"
                @click="handleMainEdit"
                v-if="!mainEdit"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-light text-nowrap"
                @click="handleSavePostPayment"
                :disabled="!mainEdit"
                v-else
                style="background-color: #6bfa65;"
              >
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-10 col-lg-12 col-rowset">
        <div class="card">
          <div class="card-body">
            <div class="PaymentBox">
              <div class="d-flex justify-content-start overflow-auto">
                <div
                  class="paymentContentEstpro"
                  v-for="(Item, index) in PayItem"
                  v-bind:key="index"
                >
                  <div class="paymentContentHeadEstimateX">
                    <div>
                      {{ Item.name }}
                    </div>
                  </div>
                  <div class="paymentContentDeckEstimateX">
                    ${{ Item.price }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <h5>Post Payment</h5>

              <div
                class="table-responsive myestimateprotable"
                style="overflow-x: initial;"
              >
                <table class="table table-bordered text-center table-striped">
                  <thead>
                    <tr>
                      <th class="text-nowrap">Select</th>
                      <th class="text-nowrap">Payment Info</th>
                      <th class="text-nowrap">From</th>
                      <th class="text-nowrap">Amount Due</th>
                      <th class="text-nowrap">Post Payment</th>
                      <th class="text-nowrap">Post</th>
                      <!-- <th class="text-nowrap">Full Payment</th>
                      <th class="text-nowrap">Split Payment</th> -->
                      <th class="text-nowrap">Staff Name</th>
                      <th class="text-nowrap">View Posted Payment</th>
                      <th class="text-nowrap">Date | Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in paymentTypes">
                      <td class="text-center">
                        <input
                          @click="handleEdit(item)"
                          v-model="EditField[item]"
                          :disabled="true"
                          class="form-check-input"
                          type="checkbox"
                        />
                      </td>
                      <td class="">{{ paymentLable[item] }}</td>
                      <td class="text-center">
                        <select
                          v-model="paymentAmount[item].paymentFrom"
                          :disabled="!mainEdit"
                          class="form-select w-auto"
                        >
                          <option value="">-</option>
                          <option value="Customer">Customer</option>
                          <option value="Insurance">Insurance</option>
                        </select>
                      </td>
                      <td class="text-left">
                        
                          <div class="input-group">
                            <span class="input-group-text" :style="{backgroundColor: '#e6f0ff'}">$</span>
                            <input
                            :disabled="true"
                            v-model="paymentAmount[item].paymentAmountDue"
                            class="form-control"
                          />
                          </div>
                    
                      </td>
                      <td class="text-center">
                         
                          <div class="input-group">
                            <span class="input-group-text" :style="{backgroundColor: '#e6f0ff'}">$</span>
                         
                          <input
                            :disabled="true"
                            v-model="paymentAmount[item].postPayment"
                            class="form-control"
                          />
                       
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="file btn btn-light text-nowrap"
                          :disabled="
                            !mainEdit ||
                            paymentAmount[item].paymentAmountDue === '0.00'
                          "
                          data-bs-toggle="modal"
                          data-bs-target="#PostPaymentUploadModul"
                          @click="
                            () => {
                              postPayment = item;
                            }
                          "
                        >
                          <img :src="Record" alt="Record" />
                        </button>
                      </td>
                      <!-- <td class="text-center">
                        <button
                          type="button"
                          class="file btn btn-light text-nowrap"
                          :style="{
                            backgroundColor: '#FAF165',
                          }"
                          :disabled="shouldFullDisable(item)"
                          v-if="shouldFullDisplayButton(item)"
                        >
                          <input
                            type="file"
                            name="file"
                            @change="
                              handleFullPayment($event.target.files[0], item);
                              $event.target.value = null;
                            "
                          />
                          <img
                            :src="uploadIconsss"
                            :style="{ width: '15px' }"
                            alt="Record"
                          />
                        </button>
                        <div v-else>
                          <a
                            v-if="paymentAmount[item]?.paymentproofOfPayment"
                            :href="`${apiUrl}/payment/${paymentAmount[item]?.paymentproofOfPayment}`"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img :src="thumbUp" alt="thumb-up" />
                          </a>
                        </div>
                      </td>
                      <td class="text-center">
                        <button
                          type="button"
                          class="btn btn-light text-nowrap"
                          v-if="shouldSplitDisplayButton(item)"
                          :disabled="shouldSplitDisable(item)"
                          :style="{
                            backgroundColor: '#6BFA65',
                          }"
                          data-bs-toggle="modal"
                          data-bs-target="#PostPaymentUploadModul"
                          @click="
                            () => {
                              postPayment = item;
                              completeSplit = false;
                            }
                          "
                        >
                          <img :src="splitIcon" alt="Record" />
                        </button>
                        <div v-else>
                          <img
                            role="button"
                            data-bs-toggle="modal"
                            data-bs-target="#PostPaymentUploadModul"
                            @click="
                              () => {
                                postPayment = item;
                                completeSplit = true;
                              }
                            "
                            :src="thumbUp"
                            alt="thumb-up"
                          />
                        </div>
                      </td> -->
                      <td class="text-center">
                        <input
                          :disabled="true"
                          v-model="paymentAmount[item].staffId"
                          class="form-control"
                        />
                      </td>
                      <td>
                        <div class="d-flex gap-2">
                          <div
                            v-for="item in paymentAmount[item].payments"
                            :key="item.DocumentId"
                          >
                            <div
                              class="tooltipPayment d-inline"
                              v-for="docId in item.DocumentIds"
                            >
                              <button
                                @click="startFancy(docId)"
                                class="btn btn-light p-1"
                              >
                                <span
                                  class="tooltipPaymenttext p-0"
                                  style="
                                    border: 1px solid #d1d1d1;
                                    border-radius: 2px;
                                  "
                                >
                                  <div
                                    style="
                                      background-color: #c0d9ff;
                                      padding: 4px 0;
                                    "
                                  >
                                    Document Name
                                  </div>
                                  <div style="padding: 3px 0;">
                                    {{ handleDocName(docId) }}
                                  </div>
                                </span>
                                <img :src="billIcon" alt="billIcon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <VueDatePicker
                          select-text="Apply"
                          position="left"
                          time-picker-inline
                          v-model="paymentAmount[item].verifiedDate"
                          :disabled="true"
                            week-start="0"
                        >
                          <a class="input-button" title="toggle" data-toggle>
                            <i class="fa-solid fa-calendar-days"></i>
                          </a>
                        </VueDatePicker>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PaymentModule
    :postPayment="postPayment"
    :paymentAmount="paymentAmount[postPayment]"
    :complete="completeSplit"
  />
</template>
<style>
.tooltipPayment {
  position: relative;
  opacity: 1;
}

.tooltipPayment .tooltipPaymenttext {
  visibility: hidden;
  width: 120px;
  background-color: #fff;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  left: 50%;
  margin-left: -60px;
  bottom: 100%;
  /* Position the tooltipPayment */
  position: absolute;
  z-index: 1;
}

.tooltipPayment:hover .tooltipPaymenttext {
  visibility: visible;
}
</style>
