<script setup>
import PaymentXEditAmountDue from "./PaymentXEditAmountDue.vue";
import PaymentXSummary from "./PaymentXSummary.vue";
import PaymentXRecordPayment from "./PaymentXRecordPayment.vue";
import Record from "../Icons/Record.png";
import Edit from "../Icons/Edit.png";
import uploadIconsss from "../../assets/uploadIcon.png";
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
            <img :src="Record" alt="Record" />
            Post&nbsp;Payment</a
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
  <div class="modal" id="PaymentUploadModul">
    <div class="modal-dialog modal-lg modal-dialog-centered p-0 p-sm-5">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body text-center pt-5 px-sm-5">
          <h2 class="mb-4">Drag & Drop</h2>
          <div class="file">
            <img
              :src="uploadIconsss"
              alt="DownloadIcon"
              :style="{ width: '125px' }"
            />
            <input type="file" name="file" />
            <h4>Document upload</h4>
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
