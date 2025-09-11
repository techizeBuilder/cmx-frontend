<script setup>
import vehicleA from "../Icons/vehicleA.png";
import axios from "axios";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showErrorToast } from "../../toster";

const store = useStore();
const storeVehicalDetails = computed(() => store.getters.getVehicalId);
const AuthToken = localStorage.getItem("AuthToken");
const route = useRoute();
const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;
const vehicalData = ref([]);
const vehicalId = ref(localStorage.getItem("vehicalId"));

const fetchData = async (value) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    if (value) {
      const vehicalDetail = await axios.get(
        `${apiUrl}/customerVehical/cutomer/vehicals/details/${value}`,
        config
      );
      const { data } = vehicalDetail.data;
      vehicalData.value = data;
    }
  } catch (error) {
    if (error.response && error.response.data.msg instanceof Array) {
      error.response.data.msg.forEach((errorMsg) => {
        console.log(errorMsg);
        showErrorToast(errorMsg);
      });
      console.log("An error occurred while fetching data", error);
    } else if (error.response && error.response.status === 401) {
      showErrorToast(error.response.data.message);
      localStorage.clear();
      showErrorToast(error.response.message);
      router.push("/login");
    } else if (error.response) {
      showErrorToast(error.response.data.message);
      console.log("An error occurred while fetching data", error);
    } else {
      showErrorToast("Some Error Occured!!!");
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
};

watch(storeVehicalDetails, async () => {
  await fetchData(storeVehicalDetails.value);
});
</script>

<template>
  <div class="estimatedetailsection mt-5 pb-5">
    <div class="sectionaccomadation my-0">
      <ul class="link-section">
        <li class="li-estimssr" id="VehicleDetails">
          <div
            class="accordion accordion-flush"
            id="accordionFlushVehicleDetails"
          >
            <div class="accordion-item">
              <div class="pages">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapsVehicleDetailsass"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <img class="sidebar-icon" :src="vehicleA" alt="vehicleA" />
                    <h3>Vehicle Details</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapsVehicleDetailsass"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushVehicleDetails"
              >
                <div class="row pt-sm-4 cutsomerRow">
                  <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
                    <div class="row">
                      <div class="col-sm-12 col-md-8">
                        <div class="mt-4">
                          <p class="datexlable">VIN</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.vin"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-12 col-md-4 mt-3 mt-sm-0 d-flex justify-content-end align-items-end"
                      >
                        <button type="button" class="btn btn-light">
                          Decode
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Year</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.year"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Production Date</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.productionDate"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <p class="datexlable">Make</p>
                      <div class="customerXBox">
                        <input
                          v-model="vehicalData.make"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">Model</p>
                      <div class="customerXBox">
                        <input
                          v-model="vehicalData.model"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">Engine</p>
                      <div class="customerXBox">
                        <input
                          v-model="vehicalData.engine"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec"
                  >
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Exterior Color</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.exteriorColor"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Exterior Code</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.exteriorCode"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Interior Color</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.interiorColor"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Trim Code</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.trimCode"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 col-md-6 col-lg-4 cutsomerCol mt-4 mt-sm-0"
                  >
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Mileage IN</p>
                          <div class="customerXBox">
                            <input class="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">Mileage OUT</p>
                          <div class="customerXBox">
                            <input class="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">License Plate</p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicalData.licensePlate"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">State</p>
                          <div class="customerXBox">
                            <select class="form-select">
                              <option selected disabled>Country</option>
                              <option>France</option>
                              <option>France</option>
                              <option>France</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-12">
                        <div class="mt-4">
                          <p class="datexlable">Vehicle Condition</p>
                          <div class="customerXBox">
                            <select class="form-select">
                              <option selected disabled>Country</option>
                              <option>France</option>
                              <option>France</option>
                              <option>France</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
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
</style>
