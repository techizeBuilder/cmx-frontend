<script setup>
import { ref, computed, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import uploadIconsss from "../../assets/uploadIcon.png";
import axios from "axios";
import { showSuccessToast } from "../../toster";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const userData = JSON.parse(localStorage.getItem("userData"));
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const route = useRoute();
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const date = ref({
  eSignature: null,
  eSignaturesDate: null,
  eSignaturesStaffId: null,
  eSignatureAuthorizationSigned: "Electronic Signature",
});
const checkboxes = ref({
  eSignatureAuthorizationSigned: false,
  SignatureDate: false,
});

const handleClick = (value, name) => {
  if (!value) {
    date.value[name] = !date.value[name] ? new Date() : date.value[name];
  } else {
    date.value[name] = null;
  }
};

const handleFile = (e) => {
  console.log(e.target.files[0]);
  date.value.eSignature = e.target.files[0];
  document.getElementById("closeButtonUploadEsignature").click();
};

const handleEsignature = async () => {
  try {
    date.value.estimateId = storeEstimateDetails.value?._id;
    const formData = new FormData();
    for (const key in date.value) {
      formData.append(key, date.value[key]);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/shop/esignature/${userData._id}`,
      formData,
      config
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    showSuccessToast(response.data.msg);
    mainEdit.value = true;
  } catch (error) {
    console.log(error);
  }
};

const staffCheck = ref(false);
const handleStaff = () => {
  if (!staffCheck.value) {
    date.value.eSignaturesStaffId = `${userData.firstName} ${userData.lastName}`;
  } else {
    date.value.eSignaturesStaffId = null;
  }
};

watch(storeEstimateDetails, () => {
  date.value = {
    eSignaturesDate: storeEstimateDetails.value?.eSignaturesDate,
    eSignaturesStaffId: storeEstimateDetails.value?.eSignaturesStaffId,
    eSignatureAuthorizationSigned:
      storeEstimateDetails.value?.eSignatureAuthorizationSigned,
  };
  checkboxes.value = {
    eSignatureAuthorizationSigned: storeEstimateDetails.value
      ?.eSignatureAuthorizationSigned
      ? true
      : false,
    SignatureDate: storeEstimateDetails.value?.eSignaturesDate ? true : false,
  };
  staffCheck.value = storeEstimateDetails.value?.eSignaturesStaffId
    ? true
    : false;
});

const handlePrint = () => {
  const printWindow = window.open("", "_blank");

  const printWindowLoadHandler = () => {
    const iframe = printWindow.document.getElementById("myIframe");

    const iframeLoadHandler = () => {
      printWindow.focus();
      printWindow.print();

      // Clean up the iframe load event listener
      iframe.removeEventListener("load", iframeLoadHandler);
      // Optionally close the print window after printing
      printWindow.close();
    };

    iframe.addEventListener("load", iframeLoadHandler);

    // Clean up the print window load event listener
    printWindow.removeEventListener("load", printWindowLoadHandler);
  };

  printWindow.addEventListener("load", printWindowLoadHandler);

  printWindow.document.write(
    `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body><iframe id="myIframe" src="${apiUrl}${storeEstimateDetails.value?.eSignatures}" width="100%" height="100%"></iframe></body></html>`
  );
  printWindow.document.close();
};

const mainEdit = ref(true);
const handleEdit = () => {
  mainEdit.value = !mainEdit.value;
};
</script>
<template>
  <div class="estimatedetailsection vdatepicktimedit">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Chatlink"
            >E-Signiture</a
          >
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <div
              class="d-flex align-items-end gap-4 w-100 justify-sm-content-end flex-wrap"
            >
              <button
                type="button"
                class="btn btn-light text-nowrap"
                @click="handlePrint"
                :disabled="storeEstimateDetails?.eSignatures ? false : true"
              >
                <i class="fa-solid fa-print"></i>&nbsp; Print E-Authorization
              </button>
              <button
                type="button"
                class="btn btn-light text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#EsignUploadModule"
              >
                <i class="fa-solid fa-cloud-arrow-up"></i> &nbsp; Upload
              </button>
              <button
                @click="handleEdit"
                v-if="mainEdit"
                type="button"
                class="btn btn-light text-nowrap"
              >
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </button>
              <button
                @click="handleEsignature"
                v-else
                type="button"
                class="btn btn-light text-nowrap"
                :style="{ 'background-color': '#6BFA65' }"
              >
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row px-sm-5 pb-5">
      <div class="col-sm-12 col-md-6 col-lg-5 col-xl-3">
        <div>
          <p class="datexlable">Authorization Signed?</p>
          <div class="datexBox" style="overflow: hidden;">
            <input
              :disabled="mainEdit"
              v-model="checkboxes.eSignatureAuthorizationSigned"
              class="form-check-input"
              type="checkbox"
            />
            <select
              v-model="date.eSignatureAuthorizationSigned"
              :disabled="mainEdit"
              class="form-select"
            >
              <option value="">-</option>
              <option value="Electronic Signature">Electronic Signature</option>
              <option value="Wet Signature">Wet Signature</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <p class="datexlable">Signature Date</p>
          <div class="datexBox">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="checkboxes.SignatureDate"
              :disabled="mainEdit"
              @click="handleClick(checkboxes.SignatureDate, 'eSignaturesDate')"
            />
            <VueDatePicker
              v-model="date.eSignaturesDate"
              :disabled="mainEdit"
              select-text="Apply"
              position="left"
              time-picker-inline
              :is-24="false"
                week-start="0"
            >
              <template #input-icon>
                <img
                  class="input-slot-image"
                  src="../Icons/calenderIcons.png"
                />
              </template>
            </VueDatePicker>
          </div>
        </div>
        <div class="mt-4">
          <p class="datexlable">Staff Name</p>
          <div class="datexBox" style="overflow: hidden;">
            <input
              v-model="staffCheck"
              @click="handleStaff"
              class="form-check-input"
              type="checkbox"
              :disabled="mainEdit"
            />
            <input
              v-model="date.eSignaturesStaffId"
              :disabled="mainEdit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="EsignUploadModule">
    <div class="modal-dialog modal-lg modal-dialog-centered p-0 p-sm-5">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            id="closeButtonUploadEsignature"
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
            <input
              ref="data.eSignature"
              @input="handleFile"
              type="file"
              name="file"
            />
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
