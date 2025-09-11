<script setup>
import PaymentStepsPupos from "./PaymentStepsPupos.vue";
import { useStore } from "vuex";
import { watch, computed, ref } from "vue";
import CashIcon from "../Icons/CashIcon.svg";
import HourGlassIcon from "../Icons/HourGlassIcon.svg";
import LockIcon from "../Icons/LockIcon.svg";
import moment from "moment";
import "moment-timezone";
import uploadIconsss from "../../assets/uploadIcon.png";
import checkIcons from "../Icons/checkIcon.png";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);

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

const paymentKeys = [
  "paymentFrom",
  "paymentAmountDue",
  "paymentproofOfPayment",
  "verifiedDate",
  "postPayment",
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
  return paymentKeys.reduce((acc, key) => ({ ...acc, [key]: null }), {});
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

watch(storeEstimateDetails, () => {
  const supplementPattern = /^supplement\d+$/;
  let supplementCount = -1;
  storeEstimateDetails.value.paymentAmount.forEach((item) => {
    if (supplementPattern.test(item.key)) {
      supplementCount++;
    }
  });
  UpdateFieldsFunc(supplementCount);
  let sum = 0;
  let cusSum = 0;
  let insSum = 0;
  storeEstimateDetails.value.paymentAmount.map((item) => {
    paymentAmount.value[item.key] = item;
    if (typeof paymentAmount.value[item.key].postPayment !== "undefined") {
      sum += Number(paymentAmount.value[item.key].postPayment);
    }
    if (
      typeof paymentAmount.value[item.key].paymentAmountDue !== "undefined" &&
      paymentAmount.value[item.key].paymentFrom === "Customer"
    ) {
      cusSum += Number(paymentAmount.value[item.key].paymentAmountDue);
    }
    if (
      typeof paymentAmount.value[item.key].paymentAmountDue !== "undefined" &&
      paymentAmount.value[item.key].paymentFrom === "Insurance"
    ) {
      insSum += Number(paymentAmount.value[item.key].paymentAmountDue);
    }
  });
  PayItem.value.map((item) => {
    switch (item.name) {
      case "Customer":
        item.price = !hasDecimalExceeded(cusSum) ? cusSum.toFixed(2) : cusSum;
        break;
      case "Insurance":
        item.price = !hasDecimalExceeded(insSum) ? insSum.toFixed(2) : insSum;
        break;
      case "Grand Total":
        item.price = !hasDecimalExceeded(cusSum + insSum)
          ? (cusSum + insSum).toFixed(2)
          : cusSum + insSum;
        break;
      default:
        item.price = !hasDecimalExceeded(sum) ? sum.toFixed(2) : sum.toFixed(2);
    }
  });
});

function hasDecimalExceeded(num) {
  const numStr = num.toString();
  const decimalIndex = numStr.indexOf(".");
  if (decimalIndex !== -1) {
    const decimalDigits = numStr.substring(decimalIndex + 1);
    return decimalDigits.length < 2;
  }
  return false;
}

const handleDocument = () => {
  console.log("The target File Summary", e.target.files[0]);
};

const handleTimeZone = (item) => {
  const newDate = new Date(item);
  return moment(newDate).tz("America/New_York").format("MM/DD/YYYY - hh:mm A");
};
</script>
<template>
  <div class="estimatedetailsection">
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div
          class="d-md-flex align-items-center gap-4 mb-4 justify-content-between"
        >
          <PaymentStepsPupos />
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
                    <div class="text-nowrap">
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
              <h5>Recorded Payment Summary</h5>
              <div class="table-responsive myestimateprotable">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th class="text-nowrap ps-0 ps-sm-5 ms-0 ms-sm-5">
                        Payment Info
                      </th>
                      <th class="text-nowrap text-center">Collect From</th>
                      <th class="text-nowrap text-center">Amount Due</th>
                      <th class="text-nowrap text-center">Total Posted</th>
                      <th class="text-nowrap text-center">Staff Name</th>
                      <th class="text-nowrap text-center">Date | Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="text-center"
                      v-for="(Item, index) in paymentTypes"
                      v-bind:key="index"
                    >
                      <td class="ps-0 ps-sm-5 ms-0 ms-sm-5 text-center">
                        {{ paymentLable[Item] }}
                      </td>
                      <td class="text-center">
                        {{ paymentAmount[Item].paymentFrom }}
                      </td>
                      <td>
                        <div class="text-center">
                          <div class="flex-grow-1">
                            <!-- <img
                              v-if="
                                paymentAmount[Item].paymentAmountDue &&
                                paymentAmount[Item].paymentAmountDue !== '0.00'
                              "
                              :src="CashIcon"
                              alt="CashIcon"
                              :style="{ width: '25px' }"
                            /> -->
                          </div>
                          <div class="ms-2">
                            {{
                              paymentAmount[Item].paymentAmountDue
                                ? `$${paymentAmount[Item].paymentAmountDue}`
                                : null
                            }}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <div class="flex-grow-1">
                            <!-- <img
                              v-if="
                                paymentAmount[Item].postPayment &&
                                paymentAmount[Item].postPayment !== '0.00'
                              "
                              :src="checkIcons"
                              alt="checkIcons"
                              style="width: 25px;"
                            /> -->
                          </div>
                          <div class="ms-2">
                            {{
                              paymentAmount[Item].postPayment
                                ? `$${paymentAmount[Item].postPayment}`
                                : null
                            }}
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        {{ paymentAmount[Item].staffId }}
                      </td>
                      <td>
                        <div class="text-center">
                          {{
                            paymentAmount[Item].verifiedDate
                              ? handleTimeZone(paymentAmount[Item].verifiedDate)
                              : null
                          }}
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
</template>
