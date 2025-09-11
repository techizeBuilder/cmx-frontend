<script setup>
import PaymentXEditAmountDue from "./PaymentXEditAmountDue.vue";
import PaymentXSummary from "./PaymentXSummary.vue";
import PaymentXRecordPayment from "./PaymentXRecordPayment.vue";
import Record from "../Icons/Record.png";
import Edit from "../Icons/Edit.png";

</script>

<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Summary">
            <i
              class="fa-regular fa-file-lines"
              :style="{ fontSize: '22px' }"
            ></i>
            Summary</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#RecordPayment">
            <img :src="Record" alt="Record" />Post&nbsp;Payment</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#EditAmount">
            <img :src="Edit" alt="Edit" />
            Edit&nbsp;Amount&nbsp;Due</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Summary">
          <PaymentXSummary />
        </div>
        <div class="tab-pane show" id="RecordPayment">
          <PaymentXRecordPayment />
        </div>
        <div class="tab-pane show" id="EditAmount">
          <PaymentXEditAmountDue />
        </div>
      </div>
    </div>
  </div>
</template>
