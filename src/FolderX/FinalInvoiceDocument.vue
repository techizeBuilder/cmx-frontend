<script setup>
import view from "./Icons/View.png";

const handleIvoice = () => {
  document.getElementById("closeButtonFinalInvoicetModel").click();
};
</script>
<template>
  <div class="modal" id="FinalIvoiceModel">
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
                      Final Invoice Documents
                    </h5>
                    <button
                      id="closeButtonFinalInvoicetModel"
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
                      1. Final Invoice - Cover Sheet
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
                      2. Final Invoice - Estimate
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
                      3. Final Invoice Warranty
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
                @click="handleIvoice"
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
