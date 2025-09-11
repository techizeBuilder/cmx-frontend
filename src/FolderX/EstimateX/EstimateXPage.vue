<script setup>
import { ref } from "vue";
import Laber from "./Icons/Laber.png";
import summarys from "./Icons/summarys.png";
import BMC from "./Icons/BMC.png";

import LaborRatesX from "./LaborRatesX.vue";
import SummaryXpages from "./SummaryXpages.vue";
import EstimateBmsX from "./EstimateBmsX.vue";

const mainEdit = ref(true);

const handleSave = () => {
  mainEdit.value = true;
};
</script>
<template>
  <div class="estimatedetailsection">
    <div class="d-lg-flex align-items-end flex-column justify-content-end mt-4">
      <div class="PartsXStage">
        <h6 class="m-0">Parts Stage</h6>
        <div class="paBox">
          <h6 class="m-0">Do not Order</h6>
        </div>
      </div>
    </div>
    <div class="sectionaccomadation my-0">
      <ul class="link-section">
        <li class="li-estimssr" id="paymentX">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <div class="pages">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapsecmsone"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <img class="sidebar-icon" :src="Laber" alt="Laber" />
                    <h3>Labor Rate & Tax</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapsecmsone"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <LaborRatesX />
              </div>
            </div>
          </div>
        </li>
        <li class="li-estimssr" id="SummaryX">
          <div class="accordion accordion-flush" id="accordionSummaryX">
            <div class="accordion-item">
              <div class="pages">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapsecmsSummary"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <img class="sidebar-icon" :src="summarys" alt="summarys" />
                    <h3>Summary</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapsecmsSummary"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionSummaryX"
              >
                <SummaryXpages />
              </div>
            </div>
          </div>
        </li>
        <EstimateBmsX />

        <div class="row">
          <div class="col-lg-12 col-rowset">
            <div
              class="d-lg-flex align-items-end gap-4 mb-3 justify-content-end"
            >
              <div class="d-flex align-items-end gap-4 justify-content-end">
                <button type="button" class="btn btn-light text-nowrap">
                  <i class="fa-solid fa-print" data-v-9bb28f40=""></i>&nbsp;
                  Print
                </button>
                <button type="button" class="btn btn-light text-nowrap">
                  &nbsp; Cancel
                </button>
                <button
                  v-if="mainEdit"
                  type="button"
                  class="btn btn-light text-nowrap"
                  @click="mainEdit = false"
                >
                  <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
                </button>
                <button
                  style="background-color: #6bfa65;"
                  v-else
                  type="button"
                  class="btn btn-light text-nowrap"
                  @click="handleSave"
                >
                  <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="d-flex align-items-end gap-2 mb-4 justify-content-between mt-4"
        >
          <div class="EsBox">
            <div class="input-group">
              <input
                class="form-control border-end-0 border"
                type="search"
                value="Quick Search"
                id="example-search-input"
                placeholder="Quick Search"
              />
              <span class="input-group-append">
                <button
                  class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                  type="button"
                >
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>

          <div class="EsBox">
            <label for="STAGE1" class="form-label mb-0"
              ><i class="fa-solid fa-filter"></i> Part Type</label
            >
            <select class="form-select" id="STAGE1" name="sellist1">
              <option disabled selected></option>
              <option>OEM</option>
              <option>OEM Discount</option>
              <option>Aftermarket</option>
              <option>Recycled</option>
              <option>Reconditioned</option>
              <option>Core Fee</option>
              <option>Tire </option>
            </select>
          </div>
          <div class="EsBox">
            <label for="Operation1" class="form-label mb-0"
              ><i class="fa-solid fa-filter"></i> Operation</label
            >
            <select class="form-select" id="Operation1" name="sellist2">
              <option disabled selected></option>
              <option>Replace</option>
              <option>Repair</option>
              <option>Refinish</option>
              <option>Remove & Install</option>
              <option>Overhaul</option>
              <option>Section</option>
              <option>Align</option>
              <option>Sublet</option>
              <option>Blend</option>
              <option>PDR</option>
              <option>None </option>
            </select>
          </div>
          <div class="EsBox">
            <label for="Operation1" class="form-label mb-0"
              ><i class="fa-solid fa-filter"></i> Labor Type</label
            >
            <select class="form-select" id="Operation1" name="sellist2">
              <option disabled selected></option>
              <option>BODY</option>
              <option>PAINT</option>
              <option>MECH</option>
              <option>FRAME</option>
              <option>STRUCTURE</option>
              <option>DIAGNOSTIC</option>
              <option>ELECTRICAL</option>
              <option>GLASS</option>
              <option>Aluminum </option>
            </select>
          </div>
          <div class="EsBox">
            <label for="Operation1" class="form-label mb-0"
              ><i class="fa-solid fa-filter"></i> ESTIMATE STAGE FILTER</label
            >
            <select class="form-select" id="Operation1" name="sellist2">
              <option disabled selected></option>
              <option>EOR</option>
              <option>S1</option>
              <option>S2</option>
              <option>S3</option>
              <option>S4</option>
              <option>S5</option>
              <option>S6</option>
            </select>
          </div>
        </div>
        <div class="d-lg-flex align-items-end gap-4 justify-content-end mb-4">
          <div class="edsTable">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th class="text-nowrap">Estimate Total</th>
                  <th class="text-nowrap">Total hours</th>
                  <th class="text-nowrap">Days to Repair</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td class="text-center">-</td>
                  <td class="text-center">-</td>
                  <td class="text-center">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-rowset">
            <div class="table-responsive mystripetable">
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <th class="text-nowrap"><input type="checkbox" /></th>
                    <th class="text-nowrap">Est.<br />Line</th>
                    <th class="text-nowrap">
                      Est. <br />
                      Stage
                    </th>
                    <th>
                      Line <br />
                      Notes
                    </th>
                    <th class="text-nowrap">Operation</th>
                    <th class="text-nowrap">Part Type</th>
                    <th class="text-nowrap">Labor Type</th>
                    <th class="text-nowrap" :style="{ minWidth: '330px' }">
                      Estimate <br />
                      Description
                    </th>
                    <th class="text-nowrap">
                      Part <br />
                      Number
                    </th>
                    <th class="text-nowrap">Qty</th>
                    <th class="text-nowrap">
                      Markup <br />
                      Discounts -/+ %
                    </th>
                    <th class="text-nowrap">
                      Estimate<br />
                      Amount
                    </th>
                    <th class="text-nowrap">
                      Body <br />
                      Labor
                    </th>
                    <th class="text-nowrap">
                      Refinish <br />
                      Labor
                    </th>
                    <th class="text-nowrap">
                      Labor <br />
                      Tax
                    </th>
                    <th class="text-nowrap">
                      Parts <br />
                      Tax
                    </th>
                    <th class="text-nowrap">
                      Paint <br />
                      Supplies
                    </th>
                    <th class="text-nowrap">Adjustment</th>
                    <th class="text-nowrap">Adjustment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <td class="text-center"><input type="checkbox" /></td>
                    <td class="text-center">1</td>
                    <td class="text-center">S01</td>
                    <td class="text-center">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <rect width="15" height="15" fill="url(#pattern0)" />
                        <defs>
                          <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlink:href="#image0_2924_3850"
                              transform="scale(0.0078125)"
                            />
                          </pattern>
                          <image
                            id="image0_2924_3850"
                            width="128"
                            height="128"
                            xlink:href="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                    </td>
                    <td class="text-center text-nowrap">
                      <select class="text-center">
                        <option>Replace</option>
                        <option>Repair</option>
                        <option>Refinish</option>
                        <option>Remove & Install</option>
                        <option>Overhaul</option>
                        <option>Section</option>
                        <option>Align</option>
                        <option>Sublet</option>
                        <option>Blend</option>
                        <option>PDR</option>
                        <option>None</option>
                      </select>
                    </td>
                    <td class="text-center text-nowrap">
                      <select class="text-center">
                        <option>OEM</option>
                        <option>OEM Discount</option>
                        <option>Aftermarket</option>
                        <option>Recycled</option>
                        <option>Reconditioned</option>
                        <option>Core Fee</option>
                        <option>Tire </option>
                      </select>
                    </td>
                    <td class="text-center text-nowrap">
                      <select class="text-center">
                        <option>BODY</option>
                        <option>PAINT</option>
                        <option>MECH </option>
                        <option>FRAME</option>
                        <option>STRUCTURE</option>
                        <option>DIAGNOSTIC</option>
                        <option>ELECTRICAL</option>
                        <option>GLASS</option>
                        <option>Aluminum</option>
                        <option>-</option>
                        <option>-</option>
                      </select>
                    </td>

                    <td class="text-left">
                      RT Front Door Panel with Moudling RT Front Door Panel with
                      MoudlingRT Front Door Panel with Moudling
                    </td>
                    <td class="text-center">ABCDEFG-123456</td>
                    <td class="text-center">1</td>
                    <td class="text-center">+25%</td>
                    <td class="text-center">1,403.19</td>
                    <td class="text-center">2.5</td>
                    <td class="text-center"></td>
                    <td class="text-center"><input type="checkbox" /></td>
                    <td class="text-center"><input type="checkbox" /></td>
                    <td class="text-center"><input type="checkbox" /></td>
                    <td class="text-center">
                      <i
                        class="fa-solid fa-list"
                        :style="{ fontSize: '20px' }"
                      ></i>
                    </td>
                    <td class="text-center">
                      A50 <br />
                      B50
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ul>
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
