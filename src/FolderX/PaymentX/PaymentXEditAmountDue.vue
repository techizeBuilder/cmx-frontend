<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import { useStore } from "vuex";
import { watch, computed, ref } from "vue";
import axios from "axios";
import { showSuccessToast } from "../../toster";
import uploadIconsss from "../../assets/uploadIcon.png";
import debounce from "lodash/debounce";
import filesIcon from "../Icons/filesIcon.png";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import LvProgressBar from "lightvue/progress-bar";

const isLoading = ref(false);
const store = useStore();
const userData = JSON.parse(localStorage.getItem("userData"));
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const storePaymentDoc = computed(() => store.getters.getPaymentDoc);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
let PayItem = ref([
  { name: "Customer", price: "0.00" },
  { name: "Insurance", price: "0.00" },
  { name: "Grand Total", price: "0.00" },
  { name: "Total Posted", price: "0.00" },
]);

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

const EditField = ref({});

const paymentKeys = [
  "paymentFrom",
  "paymentAmountDue",
  "paymentproofOfPayment",
  "verifiedDate",
  "secured",
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
        : null;
    return acc;
  }, {});
}

const fileInput = ref(null);
const modelField = ref(null);
const progress = ref(0);

const handleDocument = async (e) => {
  try {
    // isLoading.value = true;
    const formData = new FormData();
    formData.append("paymentDoc", e.target.files[0]);
    formData.append("staffId", `${userData.lastName}${userData.firstName}`);
    formData.append("verifiedDate", new Date());
    formData.append(
      "paymentFrom",
      paymentAmount.value[modelField.value]?.paymentFrom ?? "Customer"
    );
    const paymentDueData = paymentAmount.value[modelField.value]
      .paymentAmountDue
      ? hasDecimalExceeded(
          paymentAmount.value[modelField.value].paymentAmountDue
        )
        ? parseFloat(paymentAmount.value[modelField.value].paymentAmountDue)
        : parseFloat(
            paymentAmount.value[modelField.value].paymentAmountDue
          ).toFixed(2)
      : (0.0).toFixed(2);
    formData.append("paymentAmountDue", paymentDueData);

    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/paymentAmount/file/Upload/${storeEstimateDetails.value?._id}/${modelField.value}`,
      formData,
      config
    );
    EditField.value[modelField.value] = true;
    const intervalId = setInterval(() => {
      let newValue = progress.value + Math.floor(Math.random() * 10) + 1;
      if (newValue >= 100) {
        newValue = 0;
        progress.value = 0;
        clearInterval(intervalId);
        showSuccessToast(response.data.msg);
        setTimeout(() => {
          showSuccessToast("You can now view it in the Document tab.");
        }, 5000);
        store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
        document.getElementById("closeButtonUpload").click();
      }
      progress.value = newValue;
    }, 500);
    // isLoading.value = false;

    fileInput.value.type = "";
    fileInput.value.type = "file";
  } catch (error) {
    // isLoading.value = false;
    document.getElementById("closeButtonUpload").click();
    console.log(error);
  }
};

const mainEdit = ref(false);
const handleMainEdit = () => {
  mainEdit.value = !mainEdit.value;
};

const supplementExtra = ref(0);

const validatePaymentAmount = (paymentAmount) => {
  const errors = {};
  Object.keys(paymentAmount).forEach((key) => {
    const payment = paymentAmount[key];
    if (
      !payment.paymentAmountDue ||
      isNaN(parseFloat(payment.paymentAmountDue))
    ) {
      errors[key] = {
        ...errors[key],
        paymentAmountDue:
          "Payment amount due is required and must be a valid number",
      };
    }
    if (!payment.paymentFrom || payment.paymentFrom === "") {
      errors[key] = {
        ...errors[key],
        paymentFrom: "Payment from is required",
      };
    }
  });
  return errors;
};

const errors = ref({});
const handleSavePaymentAmount = async () => {
  // errors.value = validatePaymentAmount(paymentAmount.value);
  // if (Object.values(errors.value).length === 0) {
  try {
    isLoading.value = true;
    const filterData = Object.values(paymentAmount.value)
      .filter((item) => paymentTypes.value.includes(item.key))
      .map((item) => {
        if (isNaN(parseFloat(item.paymentAmountDue))) {
          item.paymentAmountDue = "0.00";
          return;
        }
        item.paymentAmountDue = hasDecimalExceeded(item.paymentAmountDue)
          ? parseFloat(item.paymentAmountDue)
          : parseFloat(item.paymentAmountDue).toFixed(2);
        return item;
      });
    const response = await axios.post(
      `${apiUrl}/estimateProfile/paymentAmount/Update/${storeEstimateDetails.value?._id}`,
      { paymentAmount: filterData }
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    showSuccessToast(response.data.msg);
    mainEdit.value = false;
    isLoading.value = false;
    // document.getElementById("flushCollapsecmsoneCloseButton").click();
  } catch (error) {
    console.log(error);
  }
  // }
};

const updatePaymentAmount = async (key) => {
  try {
    const response = await axios.post(
      `${apiUrl}/estimateProfile/Update/Fields/${storeEstimateDetails.value?._id}/${key}`,
      paymentAmount.value[key]
    );
    console.log(response);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

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

const noOfSupplement = () => {
  UpdateFieldsFunc(supplementExtra.value);
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

const handleAmountDue = (item) => {
  if (isNaN(parseFloat(paymentAmount.value[item].paymentAmountDue))) {
    paymentAmount.value[item].paymentAmountDue = "0.00";
  }
  paymentAmount.value[item].paymentAmountDue = parseFloat(
    paymentAmount.value[item].paymentAmountDue !== ""
      ? paymentAmount.value[item].paymentAmountDue
      : 0
  ).toFixed(2);
  if (
    paymentAmount.value[item].paymentAmountDue === "" ||
    parseFloat(paymentAmount.value[item].paymentAmountDue) === 0
  ) {
    EditField.value[item] = false;
    return;
  }
  EditField.value[item] = true;
};

const debouncedHandleAmountInput = debounce(
  (item) => handleAmountDue(item),
  1500
);

watch(
  EditField,
  () => {
    Object.keys(EditField.value).forEach((key) => {
      const value = EditField.value[key];
      const existingPayment = storeEstimateDetails.value?.paymentAmount.find(
        (item) => item.key === key
      );
      paymentAmount.value[key].staffId = value
        ? `${userData.firstName} ${userData.lastName}`
        : null;
      paymentAmount.value[key].verifiedDate = value ? new Date() : null;
    });
    calculateAmount();
    store.dispatch("setPaymentFields", EditField.value);
  },
  { deep: true }
);

watch(storeEstimateDetails, () => {
  if (supplementExtra.value > 0) {
    UpdateFieldsFunc(supplementExtra.value);
    storeEstimateDetails.value?.paymentAmount.forEach((item) => {
      paymentAmount.value[item.key] = { ...item, staffId: item.staffId };
      if (parseFloat(item.paymentAmountDue) > 0.0) {
        EditField.value[item.key] = true;
      } else {
        EditField.value[item.key] = false;
      }
    });
    calculateAmount();
  } else {
    const supplementPattern = /^supplement\d+$/;
    let supplementCount = -1;
    storeEstimateDetails.value?.paymentAmount.forEach((item) => {
      if (supplementPattern.test(item.key)) {
        supplementCount++;
      }
    });
    supplementExtra.value = supplementCount === -1 ? 0 : supplementCount;
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
  }
});

const fileInputPop = ref();
const handlePop = async (e) => {
  const formData = new FormData();
  formData.append("popFile", e.target.files[0]);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/upload/POP/${storeEstimateDetails.value?._id}`,
      formData,
      config
    );
    showSuccessToast(response.data.msg);
    document.getElementById("closeButtonPOPModel").click();
    this.$refs.fileInputPop.value = null;
  } catch (error) {
    console.log(error);
  }
};

const handleDocuments = async (item) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/proofOfPayment/${
        storeEstimateDetails.value?._id
      }/${JSON.stringify(item)}`,
      config
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setDocumentCategory", null);
  } catch (error) {
    console.log(error);
  }
};

const handleDocumentModel = async () => {
  store.dispatch("setPaymentDoc", { paymentDocBoll: true, newDocId: null });
  store.dispatch("setDocumentCategory", "Proof of Payment");
  const accordionButton = document.getElementById(
    "mainDocumentCollapsecmxelDOCUMENTS"
  );
  const isAccordionOpen =
    accordionButton.getAttribute("aria-expanded") === "true";

  if (!isAccordionOpen) {
    accordionButton.click();
  }

  const modal = new bootstrap.Modal(
    document.getElementById("DocumentUploadModule")
  );
  modal.show();

  const secondModalHiddenHandler = async () => {
    store.dispatch("setDocumentCategory", null);
    const accordionButton = document.getElementById(
      "mainDocumentCollapsecmxelDOCUMENTS"
    );
    const isAccordionOpen =
      accordionButton.getAttribute("aria-expanded") === "false";

    if (!isAccordionOpen) {
      accordionButton.click();
    }
    if (storePaymentDoc.value.newDocId !== null) {
      await handleDocuments(storePaymentDoc.value.newDocId);
    }
    document
      .getElementById("DocumentUploadModule")
      .removeEventListener("hidden.bs.modal", secondModalHiddenHandler);
  };

  document
    .getElementById("DocumentUploadModule")
    .addEventListener("hidden.bs.modal", secondModalHiddenHandler);
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
              class="d-flex align-items-end gap-sm-4 gap-2 w-100 justify-sm-content-end d-flex-auto"
            >
              <!-- <button
                type="button"
                class="btn btn-light text-nowrap"
                :disabled="!mainEdit"
              >
                <i class="fa-solid fa-cloud-arrow-up"></i> Upload&nbsp;POP
              </button> -->
              <button
                @click="handleDocumentModel()"
                type="button"
                class="btn btn-light text-nowrap"
              >
                <i class="fa-solid fa-cloud-arrow-up"></i> Upload&nbsp;POP
              </button>
              <button
                @click="handleMainEdit"
                type="button"
                class="btn btn-light text-nowrap"
                v-if="!mainEdit"
              >
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </button>
              <button
                type="button"
                class="btn btn-light text-nowrap"
                :disabled="!mainEdit"
                @click="handleSavePaymentAmount"
                :style="{ 'background-color': '#6BFA65' }"
                v-if="mainEdit"
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
              <h5>Edit Amount Due</h5>
              <form action="#" class="w-auto mb-1">
                <select
                  v-model="supplementExtra"
                  @change="noOfSupplement"
                  :disabled="!mainEdit"
                  class="form-select w-auto"
                >
                  <option value="0">Supplements 1</option>
                  <option value="1">Supplements 2</option>
                  <option value="2">Supplements 3</option>
                  <option value="3">Supplements 4</option>
                  <option value="4">Supplements 5</option>
                  <option value="5">Supplements 6</option>
                  <option value="6">Supplements 7</option>
                </select>
              </form>
              <div
                class="table-responsive myestimateprotable"
                style="overflow-x: initial;"
              >
                <table class="table table-bordered text-center table-striped">
                  <thead>
                    <tr>
                      <th class="text-nowrap">Select</th>
                      <th class="text-nowrap">Payment Info</th>
                      <th class="text-nowrap" :style="{ minWidth: '150px' }">
                        From
                      </th>
                      <th class="text-nowrap">Amount Due</th>
                      <!-- <th class="text-nowrap">Upload File</th> -->
                      <th class="text-nowrap">Proof of Payment</th>
                      <th class="text-nowrap">Staff Name</th>
                      <th class="text-nowrap">Verified Date | Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in paymentTypes" class="text-center">
                      <td class="text-center">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="check1"
                          name="option1"
                          v-model="EditField[item]"
                          :disabled="!mainEdit"
                        />
                      </td>
                      <td class="text-left">{{ paymentLable[item] }}</td>
                      <td class="text-center">
                        <select
                          v-model="paymentAmount[item].paymentFrom"
                          :disabled="!mainEdit"
                          @change="
                            () => {
                              if (paymentAmount[item].paymentFrom !== '') {
                                EditField[item] = true;
                              } else {
                                EditField[item] = false;
                              }
                            }
                          "
                          class="form-select"
                        >
                          <option value="">-</option>
                          <option value="Customer">Customer</option>
                          <option value="Insurance">Insurance</option>
                        </select>
                        <!-- <span
                          :style="{ color: 'red' }"
                          v-if="errors[item]?.paymentFrom"
                          >{{ errors[item].paymentFrom }}</span
                        > -->
                      </td>
                      <td class="text-left">
                        <div class="input-group">
                          <span
                            class="input-group-text"
                            :style="{ backgroundColor: '#e6f0ff' }"
                            >$</span
                          >
                          <input
                            :disabled="!mainEdit"
                            v-model="paymentAmount[item].paymentAmountDue"
                            @input="() => debouncedHandleAmountInput(item)"
                            class="form-control"
                          />
                        </div>
                        <!-- <span
                          :style="{
                            color: 'red',
                          }"
                          v-if="errors[item]?.paymentAmountDue"
                          >{{ errors[item].paymentAmountDue }}</span
                        > -->
                      </td>
                      <!-- <td class="text-center">
                        <div
                          class="d-flex align-items-center justify-content-between"
                        >
                          <button
                            type="button"
                            class="btn btn-light btn-sm me-2"
                            :disabled="!mainEdit"
                            data-bs-toggle="modal"
                            data-bs-target="#PaymentEditUploadModul"
                            @click="() => (modelField = item)"
                          >
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-light btn-sm me-2"
                            v-if="paymentAmount[item].paymentproofOfPayment"
                          >
                            <a
                              :href="`${apiUrl}/payment/${paymentAmount[item].paymentproofOfPayment}`"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="ms-auto"
                            >
                              <img
                                :src="filesIcon"
                                alt="filesIcon"
                                :style="{ width: '15px' }"
                              />
                            </a>
                          </button>
                        </div>
                      </td> -->
                      <td class="text-center">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div class="w-100">
                            <select
                              v-model="
                                paymentAmount[item].paymentproofOfPayment
                              "
                              class="form-select"
                              style="width: 100%;"
                              :disabled="!mainEdit"
                            >
                              <option value="">-</option>
                              <option value="Secured">Secured</option>
                            </select>
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        <input
                          class="form-control"
                          :disabled="true"
                          v-model="paymentAmount[item].staffId"
                        />
                      </td>
                      <td class="text-center">
                        <div class="flatpickr">
                          <VueDatePicker
                            select-text="Apply"
                            position="left"
                            time-picker-inline
                              week-start="0"
                            v-model="paymentAmount[item].verifiedDate"
                            :disabled="!mainEdit"
                            @update:model-value="
                              () => {
                                if (paymentAmount[item].verifiedDate === null) {
                                  if (
                                    parseFloat(
                                      paymentAmount[item].paymentAmountDue
                                    ) > 0
                                  ) {
                                    return;
                                  }
                                  EditField[item] = false;
                                  return;
                                }
                                EditField[item] = true;
                              }
                            "
                          >
                            <a class="input-button" title="toggle" data-toggle>
                              <i class="fa-solid fa-calendar-days"></i>
                            </a>
                          </VueDatePicker>
                        </div>
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
  <div class="modal" id="PaymentEditUploadModul">
    <div class="modal-dialog modal-lg modal-dialog-centered p-0 p-sm-5">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            id="closeButtonUpload"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body text-center pt-5 px-sm-5">
          <h2 class="mb-4">Drag & Drop</h2>
          <div class="file">
            <div v-if="progress === 0">
              <img
                :src="uploadIconsss"
                alt="DownloadIcon"
                :style="{ width: '125px' }"
              />
              <input
                @input="handleDocument"
                ref="fileInput"
                type="file"
                name="file"
              />
              <h4>Document upload for {{ paymentLable[modelField] }}</h4>
            </div>
            <div v-else>
              <LvProgressBar :value="progress" />
            </div>
            <button
              class="btn mt-3"
              :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
            >
              Select documents
            </button>
          </div>

          <div class="d-flex gap-4 justify-content-end mt-4">
            <button
              type="button"
              class="btn btn-light"
              data-bs-dismiss="modal"
              :style="{
                backgroundColor: '#E0E0E0 !important',
                color: '#ffffff',
              }"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
