<script setup>
import axios from "axios";
import { showSuccessToast } from "../../toster";
import { useStore } from "vuex";
import { watch, computed, ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import uploadIconsss from "../../assets/uploadIcon.png";
import Loading from "vue-loading-overlay";
import debounce from "lodash/debounce";
import filesIcon from "../Icons/filesIcon.png";
import "vue-loading-overlay/dist/css/index.css";

const staffId = localStorage.getItem("userId");
const store = useStore();
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentDoc = computed(() => store.getters.getPaymentDoc);
const isLoading = ref(false);
const props = defineProps(["postPayment", "paymentAmount", "complete"]);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const splitField = ref(null);
const splitFieldNo = ref(1);
const fileUploaded = ref(false);

const paymentLable = {
  recordOfEstimate: "Record of Estimate",
  supplement1: "Supplement 1",
  supplement2: "Supplement 2",
  supplement3: "Supplement 3",
  supplement4: "Supplement 4",
  supplement5: "Supplement 5",
  supplement6: "Supplement 6",
  supplement7: "Supplement 7",
  deductible: "Deductible",
  customerPay: "Customer Pay",
  betterment: "Betterment",
  appearanceAllowance: "Appearance Allowance",
  other: "Other",
  totalLossCharges: "Total Loss Charges",
};

const PaymentKeys = [
  "paymentAmount",
  "PaymentType",
  "Transaction",
  "VerifiedDate",
];
const payments = ref([{ ...createpaymetsObj() }]);
function createpaymetsObj() {
  return PaymentKeys.reduce((acc, key) => ({ ...acc, [key]: null }), {});
}

const handleSplitModel = (item) => {
  payments.value = [];
  splitField.value = item;
  const foundPayments = storeEstimateDetails.value.paymentAmount.find((val) => {
    return val.key === item;
  })?.payments;
  if (foundPayments && foundPayments.length > 0) {
    splitFieldNo.value = foundPayments.length;
    foundPayments.forEach((item) => {
      const paymetsObj = createpaymetsObj();
      paymetsObj.paymentAmount = item.paymentAmount;
      paymetsObj.PaymentType = item.PaymentType;
      paymetsObj.Transaction = item.Transaction;
      paymetsObj.VerifiedDate = item.VerifiedDate;
      paymetsObj._id = item._id;
      paymetsObj.DocumentId = item.DocumentId;
      paymetsObj.created_at = item.created_at;
      paymetsObj.staffId = item.staffId;
      payments.value.push(paymetsObj);
    });
  } else {
    splitFieldNo.value = 1;
    payments.value.push({ ...createpaymetsObj() });
  }
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

const handleAllPayments = async () => {
  try {
    isLoading.value = true;
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/all/Payment/${storeEstimateDetails.value._id}/${splitField.value}`,
      payments.value,
      config
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    isLoading.value = false;
    showSuccessToast(response.data.msg);
    setTimeout(() => {
      showSuccessToast("You Can See the Document in the Documents Sections");
    }, 5000);
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};

const documentPayment = async (id, index) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    payments.value[index].staffId = staffId;
    payments.value[index].docIds = id;
    if (!payments.value[index]._id) {
      await axios.post(
        `${apiUrl}/estimateProfile/payment/Document/${storeEstimateDetails.value._id}/${splitField.value}`,
        payments.value[index],
        config
      );
    } else {
      await axios.post(
        `${apiUrl}/estimateProfile/payment/Update/Document/${storeEstimateDetails.value._id}/${splitField.value}`,
        payments.value[index],
        config
      );
    }
    store.dispatch("setPaymentDoc", { paymentDocBoll: false, newDocId: null });
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    store.dispatch("setPaymentDoc", { paymentDocBoll: false, newDocId: null });
    console.log(error);
  }
};

const handleAddLine = () => {
  splitFieldNo.value++;
  payments.value.push({ ...createpaymetsObj() });
};

const handleSplitPostPayment = (item) => {
  if (isNaN(parseFloat(payments.value[item].paymentAmount))) {
    payments.value[item].paymentAmount = "0.00";
    return;
  }
  return (payments.value[item].paymentAmount = parseFloat(
    payments.value[item].paymentAmount !== ""
      ? payments.value[item].paymentAmount
      : 0
  ).toFixed(2));
};

const debouncedHandleSplitPostPayment = debounce(
  (item) => handleSplitPostPayment(item),
  800
);

const handleDocumentModel = async (index) => {
  store.dispatch("setPaymentDoc", { paymentDocBoll: true, newDocId: null });
  const accordionButton = document.getElementById(
    "mainFolderXDocumentCollapsecmxelDOCUMENTS"
  );
  const isAccordionOpen =
    accordionButton.getAttribute("aria-expanded") === "true";

  if (!isAccordionOpen) {
    accordionButton.click();
  }

  document.getElementById("closeButtonPaymentModel").click();
  const modal = new bootstrap.Modal(
    document.getElementById("DocumentUploadFolderXModule")
  );
  modal.show();

  const modalHiddenHandler = () => {
    const PaymentModel = new bootstrap.Modal(
      document.getElementById("PostPaymentUploadModul")
    );
    PaymentModel.show();
  };

  const secondModalHiddenHandler = async () => {
    const accordionButton = document.getElementById(
      "mainFolderXDocumentCollapsecmxelDOCUMENTS"
    );
    const isAccordionOpen =
      accordionButton.getAttribute("aria-expanded") === "false";

    if (!isAccordionOpen) {
      accordionButton.click();
    }
    if (storePaymentDoc.value.newDocId !== null) {
      await documentPayment(storePaymentDoc.value.newDocId, index);
    }
    document
      .getElementById("DocumentUploadFolderXModule")
      .removeEventListener("hidden.bs.modal", modalHiddenHandler);
    document
      .getElementById("DocumentUploadFolderXModule")
      .removeEventListener("hidden.bs.modal", secondModalHiddenHandler);
  };

  document
    .getElementById("DocumentUploadFolderXModule")
    .addEventListener("hidden.bs.modal", modalHiddenHandler);

  document
    .getElementById("DocumentUploadFolderXModule")
    .addEventListener("hidden.bs.modal", secondModalHiddenHandler);
};

watch(storeEstimateDetails, () => {
  handleSplitModel(splitField.value);
});

watch(props, () => {
  handleSplitModel(props.postPayment);
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
  <div class="modal" id="PostPaymentUploadModul">
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
                    <h5 class="m-0" :style="{ color: '#636363' }">
                      <!-- {{
                        props.complete
                          ? "Complete Split Payment"
                          : "Split Payment"
                      }} -->
                      Post Payment
                    </h5>
                    <button
                      id="closeButtonPaymentModel"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row py-2">
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn btn-light px-4"
                    @click="handleAddLine"
                    v-if="!props.complete"
                  >
                    Add Line Item
                  </button>
                </div>
                <div class="col text-end">
                  <button
                    type="button"
                    class="btn btn-light px-4"
                    @click="
                      () => {
                        handleAllPayments();
                      }
                    "
                    style="background-color: #6bfa65;"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div class="space-btm-space">
                <div
                  class="table-responsive myestimateprotable"
                  style="overflow-x: initial;"
                >
                  <table class="table table-bordered text-center table-striped">
                    <thead>
                      <tr>
                        <th>Payment Info</th>
                        <th class="text-nowrap">
                          Post Payment Type
                        </th>
                        <th class="text-nowrap">Post Payment</th>
                        <th class="text-nowrap">Upload</th>
                        <th class="text-nowrap">Transition #</th>
                        <th class="text-nowrap">Date | Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in splitFieldNo">
                        <td class="">{{ paymentLable[splitField] }}</td>
                        <td>
                          <select
                            v-model="payments[index].PaymentType"
                            class="form-select"
                          >
                            <option disabled></option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Coupon">Coupon</option>
                            <option value="EFT">EFT</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td>
                          <input
                            class="form-control"
                            v-model="payments[index].paymentAmount"
                            @input="debouncedHandleSplitPostPayment(index)"
                          />
                        </td>
                        <td class="text-center">
                          <div class="row align-items-center">
                            <div class="col d-flex justify-content-between">
                              <button
                                type="button"
                                class="file btn btn-light btn-sm"
                                @click="handleDocumentModel(index)"
                              >
                                <img
                                  :src="uploadIconsss"
                                  alt="DownloadIcon"
                                  :style="{ width: '15px' }"
                                />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <input
                            class="form-control"
                            v-model="payments[index].Transaction"
                          />
                        </td>
                        <td>
                          <VueDatePicker
                            select-text="Apply"
                            position="left"
                              week-start="0"
                            time-picker-inline
                            v-model="payments[index].VerifiedDate"
                          >
                            <a class="input-button" title="toggle" data-toggle>
                              <i class="fa-solid fa-calendar-days"></i>
                            </a>
                          </VueDatePicker>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="py-2">
                    <table>
                      <tr>
                        <td class="px-4">Total Amount Due</td>
                        <td class="px-3">Post Payment</td>
                      </tr>
                      <tr>
                        <td class="text-center">
                          ${{ props.paymentAmount?.paymentAmountDue }}
                        </td>
                        <td class="text-center">
                          ${{ props.paymentAmount?.postPayment }}
                        </td>
                      </tr>
                    </table>
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
