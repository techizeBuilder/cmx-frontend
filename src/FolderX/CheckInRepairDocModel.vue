<script setup>
import { watch } from "vue";
import view from "./Icons/View.png";
import { useStore } from "vuex";
import { computed } from "vue";
import { jsPDF } from "jspdf";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const handleChekRepair = () => {
  document.getElementById("closeButtonCheckRepairModel").click();
};

watch(storeEstimateDetails, () => {
  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqq", storeEstimateDetails.value);
});

const downloadPdf = (document) => {
  const pdfContent = `
  <table border="1" cellpadding="5" cellspacing="0">
    <tr>
      <th>${route.params.id} | ${storeEstimateDetails.value.lastName}</th>
    </tr>
    <tr>
      <td>${storeEstimateDetails.value.vehicalId.model}</td>   
    </tr>
    <tr>
      <td>${storeEstimateDetails.value.insurance}</td>
    </tr>
    <tr>
      <td>${storeEstimateDetails.value.driver}</td>
    </tr>
  </table>
`;
  const pdf = new jsPDF();
  pdf.fromHTML(
    pdfContent,
    3.5,
    2.5,
    {
      width: 180,
    },
    function () {
      pdf.save(`${document}.pdf`);
    }
  );
};
</script>
<template>
  <div class="modal" id="CheckRepairModel">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <h5 class="m-0" :style="{ color: '#636363' }">
                      Check In - Repair Order Documents
                    </h5>
                    <button
                      id="closeButtonCheckRepairModel"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive myestimateprotable mt-5 p-4">
              <table class="table table-bordered text-center table-striped">
                <thead>
                  <tr class="p-2">
                    <th class="text-center text-nowrap">Select</th>
                    <th class="text-nowrap">Document Name</th>
                    <th class="text-nowrap">Document Preview</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="p-2">
                    <td class="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>
                      1. Key Tag (Dymo 3.5 x 2.5 Size)
                    </td>
                    <td class="text-center">
                      <img
                        @click="downloadPdf('newPdf')"
                        :src="view"
                        alt="view"
                        :style="{ width: '28px', cursor: 'pointer' }"
                      />
                    </td>
                  </tr>
                  <tr class="p-2">
                    <td class="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>
                      2. Windshield RO# Tag
                    </td>
                    <td class="text-center">
                      <img
                        :src="view"
                        alt="view"
                        :style="{ width: '28px', cursor: 'pointer' }"
                      />
                    </td>
                  </tr>
                  <tr class="p-2">
                    <td class="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>
                      3. Windshield QA
                    </td>
                    <td class="text-center">
                      <img
                        :src="view"
                        alt="view"
                        :style="{ width: '28px', cursor: 'pointer' }"
                      />
                    </td>
                  </tr>
                  <tr class="p-2">
                    <td class="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>
                      4. Check In Sheet
                    </td>
                    <td class="text-center">
                      <img
                        :src="view"
                        alt="view"
                        :style="{ width: '28px', cursor: 'pointer' }"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end mb-4 p-4">
              <button
                @click="handleChekRepair"
                type="button"
                class="btn btn-light text-nowrap"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
