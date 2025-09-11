<script setup>
import CustomerX from "./CustomerX.vue";
import VehicalX from "./VehicalX.vue";
import InsuranceX from "./InsuranceX.vue";
import SafeX from "./SafeX.vue";
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="estimatedetailsection my-0">
          <ul class="link-section">
            <li class="li-estimssr" id="CustomerX">
              <div class="accordion accordion-flush" id="accordionCustomerX">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmsCustomer"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <h3>Customer</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmsCustomer"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionCustomerX"
                  >
                    <CustomerX />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-estimssr" id="VehicleX">
              <div class="accordion accordion-flush" id="accordionVehicleX">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmsVehicle"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <h3>Vehicle</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmsVehicle"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionVehicleX"
                  >
                    <VehicalX />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-estimssr" id="InsuranceX">
              <div class="accordion accordion-flush" id="accordionInsuranceX">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmsInsurance"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <h3>Insurance</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmsInsurance"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionInsuranceX"
                  >
                    <InsuranceX />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-estimssr" id="SaleX">
              <div class="accordion accordion-flush" id="accordionSaleX">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmsSale"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <h3>Sale</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmsSale"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionSaleX"
                  >
                    <SafeX />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.li-estimssr {
  border-bottom: 1px solid #787878;
}

.PartsXStage > h6 {
  color: #ff8100;
}

.paBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 15px;
  border: 1.832px solid #d2d4d7;
  background: #fbfcff;
  box-shadow: 0px 2.443px 2.443px 0px rgba(0, 0, 0, 0.25);
}

th {
  vertical-align: middle;
  background-color: #ccdff1;
}

td {
  vertical-align: middle;
}

.PartsStageW {
  max-width: 650px;
}

.PartsboxA {
  border: 3.8px solid #fff;
  box-shadow: 0px 2.443px 2.443px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 7px;
}

.PartsboxA h6 {
  font-weight: 600;
  text-transform: uppercase;
}

.EsBox {
  min-width: 150px;
}

.EsBox label {
  font-size: 12px;
}

.edsTable thead tr th {
  font-size: 12px;
  color: #434343;
  font-weight: 500;
  padding: 5px 8px !important;
}

.edsTable tbody tr td {
  background-color: #e6f0ff;
  padding: 5px 8px !important;
}

.edsTable table {
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
}

.edsTable {
  min-width: 225px;
  margin-bottom: 0;
}
</style>
