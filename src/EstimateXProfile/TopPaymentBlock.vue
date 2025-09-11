<script setup>
import FolderXSlider from "./FolderXSlider.vue";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
let PayItem = ref([
  { name: "Customer", price: "$0.00" },
  { name: "Insurance", price: "$0.00" },
  { name: "Grand Total", price: "$0.00" },
  { name: "Total Posted", price: "$0.00" },
]);
let PaymentAccounts = [
  { name: "Delivered", price: "-" },
  { name: "Days in AR ", price: "-" },
  { name: "AR Balance", price: "-" },
  { name: "Paid in Full", price: "-" },
];
let AuditItem = [
  { name: "Estimate Database Closed?", price: "-" },
  { name: "RO Closed", price: "-" },
  { name: "RO Closed Date", price: "-" },
];
let custTot = 0;
let insTot = 0;
let totalPost = 0;
watch(storeEstimateDetails, () => {
  custTot = 0;
  insTot = 0;
  totalPost = 0;
  storeEstimateDetails.value?.paymentAmount?.map((item) => {
    if (item.paymentFrom === "Customer") {
      custTot += parseFloat(item.paymentAmountDue);
      totalPost += parseFloat(item.postPayment);
    } else if (item.paymentFrom === "Insurance") {
      insTot += parseFloat(item.paymentAmountDue);
      totalPost += parseFloat(item.postPayment);
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
          ? (custTot + insTot)?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : (custTot + insTot).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;
      default:
        if (totalPost !== null && totalPost !== undefined) {
          item.price = !hasDecimalExceeded(totalPost)
            ? totalPost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : totalPost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          item.price = ""; // or some default value
        }
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
</script>
<template>
  <div class="card">
    <div class="card-body">
      <div class="d-sm-flex d-block gap-3 flex-wrap">
        <div class="PayBoxAs PayBox1">
          <div class="d-sm-flex d-block align-items-center gap-2">
            <div class="FolderXSliderMain">
              <FolderXSlider />
            </div>
            <div class="PaymentBox w-100">
              <a :href="'#paymentX'" v-smooth-scroll="{ offset: -50 }">
                <h6 class="paymentHead">Payment</h6>
              </a>
              <div class="d-flex w-100">
                <div
                  class="paymentContent"
                  v-for="(Item, index) in PayItem"
                  v-bind:key="index"
                >
                  <div class="paymentContentHead">
                    <div>
                      {{ Item.name }}
                    </div>
                  </div>
                  <div class="paymentContentDeck">${{ Item.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="PayBoxAs PayBox2 ps-lg-4">
          <div class="PaymentBox">
            <a :href="'#paymentX'" v-smooth-scroll="{ offset: -50 }">
              <h4 class="paymentHead">Payment - Accounts Receivable</h4>
            </a>
            <div class="d-flex">
              <div
                class="paymentContent"
                v-for="(Item, index) in PaymentAccounts"
                v-bind:key="index"
              >
                <div class="paymentContentHead">{{ Item.name }}</div>
                <div class="paymentContentDeck">{{ Item.price }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="PayBoxAs PayBox3">
          <div class="PaymentBox">
            <a :href="'#paymentX'" v-smooth-scroll="{ offset: -50 }">
              <h4 class="paymentHead">Final Audit</h4>
            </a>
            <div class="d-flex">
              <div
                class="paymentContent"
                v-for="(Item, index) in AuditItem"
                v-bind:key="index"
              >
                <div class="paymentContentHead text-sm-wrap text-nowrap">
                  {{ Item.name }}
                </div>
                <div class="paymentContentDeck">{{ Item.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
