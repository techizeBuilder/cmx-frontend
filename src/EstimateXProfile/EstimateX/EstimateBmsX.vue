<script setup>
import Parts from "./Icons/Parts.png";
</script>
<template>
  <ul class="link-section w-auto PartsStageW">
    <li class="li-estimssr" id="uyu">
      <div class="accordion accordion-flush" id="accordPartsStage">
        <div class="accordion-item">
          <div class="pages">
            <div
              class="accordion-button collapsed folderXAccor"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsPartsStage"
              aria-expanded="false"
            >
              <div class="accomdationset-head gap-3">
                <img class="sidebar-icon" :src="Parts" alt="Parts" />
                <h3>Parts Stage</h3>
              </div>
            </div>
          </div>
          <div
            id="flush-collapsPartsStage"
            class="accordion-collapse collapse"
            data-bs-parent="#accordPartsStage"
          >
            <div class="card mt-2">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="PartsBox">
                      <label
                        for="DonotOrder"
                        class="PartsboxA"
                        :style="{ background: '#FBFCFF' }"
                      >
                        <h6 class="m-0">Do not Order</h6>
                        <input type="checkbox" id="DonotOrder" />
                      </label>
                      <label
                        for="NEEDS"
                        class="PartsboxA"
                        :style="{ background: '#F0F511' }"
                      >
                        <h6 class="m-0">NEEDS ORDERED</h6>
                        <input type="checkbox" id="NEEDS" />
                      </label>
                      <label
                        for="ORDEREDr"
                        class="PartsboxA"
                        :style="{ background: '#ccdff1' }"
                      >
                        <h6 class="m-0">ORDERED</h6>
                        <input type="checkbox" id="ORDEREDr" />
                      </label>
                      <label
                        for="DELIVERYE"
                        class="PartsboxA"
                        :style="{ background: '#B9DBC7' }"
                      >
                        <h6 class="m-0">PARTIAL DELIVERY</h6>
                        <input type="checkbox" id="DELIVERYE" />
                      </label>
                      <label
                        for="ArrivedW"
                        class="PartsboxA"
                        :style="{ background: '#4DAC73' }"
                      >
                        <h6 class="m-0">Arrived 100%</h6>
                        <input type="checkbox" id="ArrivedW" />
                      </label>
                      <label
                        for="PENDINGE"
                        class="PartsboxA"
                        :style="{ background: '#F0C9C9' }"
                      >
                        <h6 class="m-0">PENDING RETURNs</h6>
                        <input type="checkbox" id="PENDINGE" />
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="PartSBox">
                      <label
                        for="RETURNSD"
                        class="PartsboxA"
                        :style="{ background: '#FF4C4C' }"
                      >
                        <h6 class="m-0">RETURNs</h6>
                        <input type="checkbox" id="RETURNSD" />
                      </label>
                      <label
                        for="supplementholda"
                        class="PartsboxA"
                        :style="{ background: '#F6F7C9' }"
                      >
                        <h6 class="m-0">supplement hold</h6>
                        <input type="checkbox" id="supplementholda" />
                      </label>
                      <label
                        for="supplementapproved"
                        class="PartsboxA"
                        :style="{ background: '#FFAA52' }"
                      >
                        <h6 class="m-0">supplement approved</h6>
                        <input type="checkbox" id="supplementapproved" />
                      </label>
                      <label
                        for="PartsE"
                        class="PartsboxA"
                        :style="{ background: '#9747FF' }"
                      >
                        <h6 class="m-0" :style="{ color: '#fff' }">
                          100% Parts to Tech
                        </h6>
                        <input type="checkbox" id="PartsE" />
                      </label>
                      <label
                        for="PARTSSTOCK"
                        class="PartsboxA"
                        :style="{ background: '#D2D4D7' }"
                      >
                        <h6 class="m-0">pARTS sTOCK</h6>
                        <input type="checkbox" id="PARTSSTOCK" />
                      </label>
                      <label
                        for="Backordered"
                        class="PartsboxA"
                        :style="{ background: '#00FFFF' }"
                      >
                        <h6 class="m-0">Back ordered</h6>
                        <input type="checkbox" id="Backordered" />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end my-2">
                  <button class="btn btn-light">Update Status</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<style scoped>
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
</style>
