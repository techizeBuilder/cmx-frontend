<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast } from "../../toster";
import { ref } from "vue";
import { showSuccessToast } from "../../toster";
import debounce from "lodash/debounce";

const apiUrl = import.meta.env.VITE_API_URL;
const shopId = localStorage.getItem("shopId");
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();

let EstimateItem = [
  { Code: "B", LaborType: "BODY", EstimateRates: "$0.00" },
  { Code: "P", LaborType: "PAINT", EstimateRates: "$0.00" },
  { Code: "M", LaborType: "MECHANICAL", EstimateRates: "$0.00" },
  { Code: "F", LaborType: "FRAME", EstimateRates: "$0.00" },
  { Code: "S", LaborType: "STRUCTURE", EstimateRates: "$0.00" },
  { Code: "D", LaborType: "Diagnostic LABOR", EstimateRates: "$0.00" },
  { Code: "E", LaborType: "ELECTRICAL", EstimateRates: "$0.00" },
  { Code: "G", LaborType: "GLASS", EstimateRates: "$0.00" },
  { Code: "PDR", LaborType: "PDR", EstimateRates: "$0.00" },
  { Code: "ALM", LaborType: "ALM", EstimateRates: "$0.00" },
  { Code: "-", LaborType: "-", EstimateRates: "$0.00" },
  { Code: "-", LaborType: "-", EstimateRates: "$0.00" },
];

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push("/login");
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error("An error occurred while fetching data", error);
  } else {
    showErrorToast("Some Error Occurred!!!!");
    console.error(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
};

const data = ref({});
const editMain = ref(true);

const handleDoller = (item, index) => {
  if (isNaN(parseFloat(item).toFixed(2))) {
    data.value[index] = "0.00";
  } else {
    data.value[index] = parseFloat(item).toFixed(2);
  }
};

const debouncedhandleDoller = debounce(
  (item, index) => handleDoller(item, index),
  1500
);

const handleSave = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/shopRates/register/${shopId}`,
      data.value,
      config
    );
    showSuccessToast(response.data.msg);
    editMain.value = true;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/shopRates/getShopRated/${shopId}`,
      config
    );
    if (gotData.data.data.length !== 0) {
      data.value = gotData.data.data[0];
    }
  } catch (error) {
    handleError(error);
  }
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12 col-rowset">
      <div class="d-lg-flex align-items-end gap-4 mt-2 mb-0">
        <div class="me-auto ps-5">
          <select class="form-select">
            <option value="Default Shop Rates">Default Shop Rates</option>
            <option value="Imported Rates">Imported Rates</option>
          </select>
        </div>
        <div class="d-flex align-items-end gap-4 justify-content-end">
          <button type="button" class="btn btn-light text-nowrap">
            &nbsp; Cancel
          </button>
          <button
            v-if="editMain"
            @click="editMain = !editMain"
            type="button"
            class="btn btn-light text-nowrap"
          >
            <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
          </button>
          <button
            @click="handleSave"
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
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-11 mx-auto">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6">
          <div class="card mt-3">
            <div class="card-body">
              <div class="mt-0">
                <div class="table-responsive mystripetable">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th class="text-nowrap">Code</th>
                        <th class="text-nowrap">Labor Type</th>
                        <th class="text-nowrap">Estimate Rates</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="text-center"
                        v-for="(Item, index) in EstimateItem"
                        v-bind:key="index"
                      >
                        <td class="text-center">{{ Item.Code }}</td>
                        <td class="text-start">{{ Item.LaborType }}</td>
                        <td class="text-center d-flex">
                          <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </div>
                          <input
                            class="form-control"
                            :disabled="editMain"
                            placeholder="0.00"
                            @input="
                              debouncedhandleDoller(
                                data[
                                  Item?.LaborType.toLowerCase().replace(
                                    /\s/g,
                                    ''
                                  )
                                ],
                                Item?.LaborType.toLowerCase().replace(/\s/g, '')
                              )
                            "
                            v-model="
                              data[
                                Item?.LaborType.toLowerCase().replace(/\s/g, '')
                              ]
                            "
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="mt-5">
                <div class="table-responsive mystripetable">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr class="table-primary">
                        <th>Supplies</th>
                        <th>Flat Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="text-center table-primary">
                        <td class="text-start">Paint Supplies</td>
                        <td class="text-center d-flex">
                          <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </div>
                          <input
                            class="form-control"
                            :disabled="editMain"
                            placeholder="0.00"
                            @input="
                              debouncedhandleDoller(
                                data.paintSupplies,
                                'paintSupplies'
                              )
                            "
                            v-model="data.paintSupplies"
                          />
                        </td>
                      </tr>
                      <tr class="text-center table-primary">
                        <td class="text-start">Body Supplies</td>
                        <td class="text-center d-flex">
                          <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </div>
                          <input
                            class="form-control"
                            :disabled="editMain"
                            placeholder="0.00"
                            @input="
                              debouncedhandleDoller(
                                data.bodySupplies,
                                'bodySupplies'
                              )
                            "
                            v-model="data.bodySupplies"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6 pt-sm-2 mt-md-5">
          <div class="card">
            <div class="card-body">
              <div class="mt-0">
                <div class="table-responsive mystripetable">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr class="table-primary">
                        <th>Apply</th>
                        <th>Tax Type</th>
                        <th>Tax Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="text-center table-primary">
                        <td class="text-center">
                          <input class="form-check-input" type="checkbox" />
                        </td>
                        <td class="text-start">PARTS TAX RATE</td>
                        <td class="text-center d-flex">
                          <input
                            class="form-control"
                            :disabled="editMain"
                            placeholder="0.00"
                            @input="
                              debouncedhandleDoller(
                                data.partsTaxRate,
                                'partsTaxRate'
                              )
                            "
                            v-model="data.partsTaxRate"
                          />
                          <div class="input-group-prepend">
                            <span class="input-group-text">%</span>
                          </div>
                        </td>
                      </tr>
                      <tr class="text-center table-primary">
                        <td class="text-center">
                          <input class="form-check-input" type="checkbox" />
                        </td>
                        <td class="text-start">LABOR TAX</td>
                        <td class="text-center d-flex">
                          <input
                            class="form-control"
                            :disabled="editMain"
                            placeholder="0.00"
                            @input="
                              debouncedhandleDoller(data.labourTax, 'labourTax')
                            "
                            v-model="data.labourTax"
                          />
                          <div class="input-group-prepend">
                            <span class="input-group-text">%</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-12 col-md-5">
                  <div class="table-responsive mystripetable">
                    <table class="table table-bordered text-center">
                      <thead>
                        <tr class="table-primary">
                          <th>Apply Tiered Tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="text-center">
                          <td class="text-center">
                            <input class="form-check-input" type="checkbox" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-sm-12 col-md-7">
                  <div class="table-responsive mystripetable">
                    <table class="table table-bordered text-center">
                      <thead>
                        <tr class="table-primary">
                          <th>Apply</th>
                          <th>Tiered Tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="text-center table-primary">
                          <td class="text-center">
                            <input class="form-check-input" type="checkbox" />
                          </td>
                          <td class="text-center">Parts</td>
                        </tr>
                        <tr class="text-center table-primary">
                          <td class="text-center">
                            <input class="form-check-input" type="checkbox" />
                          </td>
                          <td class="text-center">Labor</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="mt-4 pt-2">
                <div class="table-responsive mystripetable">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr class="table-primary">
                        <th>Rate 1</th>
                        <th>Threshold 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="text-center table-primary">
                        <td class="text-center">
                          <div class="input-group">
                            <input
                              class="form-control"
                              :disabled="editMain"
                              placeholder="0.00"
                              @input="
                                debouncedhandleDoller(data.rate1, 'rate1')
                              "
                              v-model="data.rate1"
                            />
                            <div class="input-group-prepend">
                              <span class="input-group-text">%</span>
                            </div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input
                              class="form-control"
                              :disabled="editMain"
                              placeholder="0.00"
                              @input="
                                debouncedhandleDoller(
                                  data.threshold1,
                                  'threshold1'
                                )
                              "
                              v-model="data.threshold1"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="mt-4">
                <div class="table-responsive mystripetable">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr class="table-primary">
                        <th>Rate 2</th>
                        <th>Threshold 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="text-center table-primary">
                        <td class="text-center">
                          <div class="input-group">
                            <input
                              class="form-control"
                              :disabled="editMain"
                              placeholder="0.00"
                              @input="
                                debouncedhandleDoller(data.rate2, 'rate2')
                              "
                              v-model="data.rate2"
                            />
                            <div class="input-group-prepend">
                              <span class="input-group-text">%</span>
                            </div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input
                              class="form-control"
                              :disabled="editMain"
                              placeholder="0.00"
                              @input="
                                debouncedhandleDoller(
                                  data.threshold2,
                                  'threshold2'
                                )
                              "
                              v-model="data.threshold2"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
th {
  background-color: #ccdff1;
}

tbody,
td,
tfoot,
thead,
tr {
  background-color: #fff;
}
</style>
