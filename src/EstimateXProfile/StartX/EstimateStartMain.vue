<script setup>
import EstimateAppinmentTab from "./EstimateAppinmentTab.vue";
import EstimateWelcomeFormTab from "./EstimateWelcomeFormTab.vue";
import { watch, ref } from "vue";

const props = defineProps(["customerData"]);
const customerData = ref("");
watch(props, () => {
  customerData.value = props.customerData;
});
</script>
<template>
  <div>
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#EstimateAppoitment"
          >
            Estimate Appoitment</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#WelcomeForm">
            Welcome Form</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="cmx-tabsection">
    <div class="tab-content">
      <div class="tab-pane show active" id="EstimateAppoitment">
        <div class="estimatedetailsection">
          <div class="row">
            <div class="col-lg-12 col-rowset">
              <div class="d-flex justify-content-between pb-5 mt-4">
                <EstimateAppinmentTab :customerData="customerData" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane" id="WelcomeForm">
        <div class="estimatedetailsection">
          <div class="row">
            <div class="col-lg-12 col-rowset">
              <div class="d-flex justify-content-between pb-5 mt-4">
                <EstimateWelcomeFormTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
