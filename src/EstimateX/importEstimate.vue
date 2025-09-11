<script setup></script>
<template>
  <div class="ImportEstimatepage mt-3 px-3 py-3 mb-4">
    <div class="d-flex justify-content-between align-items-center gap-3">
      <div class="impactBox" :style="{ maxWidth: '140px' }">
        <div class="d-flex align-items-center flex-column">
          <button
            type="button"
            class="btn px-4"
            data-bs-toggle="modal"
            data-bs-target="#SelectModule"
            style="background-color: #ff8100; color: #ffffff;"
          >
            Select
          </button>
          <div class="text-center mt-3">
            <p class="m-0">0</p>
            <p class="m-0">Open File</p>
          </div>
        </div>
      </div>
      <div class="impactBox">
        <div class="m-0">
          <p class="m-0">Owner</p>
          <div class="table-responsive detialsAnna">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th class="text-start text-nowrap">First Name</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Last Name</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Company Name</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Email</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="impactBox">
        <div class="m-0">
          <p class="m-0">Vehicle</p>
          <div class="table-responsive detialsAnna">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th class="text-start text-nowrap">Vin</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">year</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Make</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Model</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="impactBox">
        <div class="m-0">
          <p class="m-0">Insurance</p>
          <div class="table-responsive detialsAnna">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th class="text-start text-nowrap">Insurance Name</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Claim#</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Deductible</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">&nbsp;</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="impactBox">
        <div class="m-0">
          <p class="m-0">&nbsp;</p>
          <div class="table-responsive detialsAnna">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th class="text-start text-nowrap">Estimate Platform Name</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Estimate Amount</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Estimate Stage</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">&nbsp;</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="impactBox">
        <div class="m-0">
          <p class="m-0">&nbsp;</p>
          <div class="table-responsive detialsAnna">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th class="text-start text-nowrap">
                    <b>Estimate Date | Time</b>
                  </th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Estimate Date | Time</th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">
                    <b>Import Date | Time</b>
                  </th>
                </tr>
                <tr>
                  <th class="text-start text-nowrap">Import Date | Time</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ImportEstimatepage {
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.impactBox {
  width: 100%;
}
</style>
