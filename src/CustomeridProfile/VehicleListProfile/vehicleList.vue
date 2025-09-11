<script setup>
import View from "../Icons/View.png";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showErrorToast, showSuccessToast } from "../../toster";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { computed } from "vue";

const store = useStore();
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);
const AuthToken = localStorage.getItem("AuthToken");
const route = useRoute();
const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;
const vehicalList = ref(null);
const emits = defineEmits(["reRenderList"]);

//Add New Vehicle

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
    localStorage.clear();
    router.push("/login");
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

const handleFormSubmit = async (
  values,
  endpoint,
  resetFormCallback,
  closeButtonId
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(`${apiUrl}/${endpoint}`, values, config);
    const closeButton = document.getElementById(closeButtonId);
    if (response.data.success) {
      closeButton.click();
      showSuccessToast(response.data.msg);
      resetFormCallback();
      emits("reRenderList");
    }
  } catch (error) {
    handleError(error);
  }
};

const schema = yup.object().shape({
  vin: yup.string().required("VIN is required"),
  year: yup.string().required("Year is required"),
  make: yup.string().required("Make is required"),
  model: yup.string().required("Model is required"),
  engine: yup.string().required("Engine is required"),
  exteriorColor: yup.string().required("Exterior color is required"),
  exteriorCode: yup.string().required("Exterior code is required"),
  interiorColor: yup.string().required("Interior color is required"),
  trimCode: yup.string().required("Trim code is required"),
  vehicleCondition: yup.string().required("Vehicle condition is required"),
  odometer: yup.string().required("Odometer is required"),
  productionDate: yup.string().required("Production date is required"),
  licensePlate: yup.string().required("License plate is required"),
  state: yup.string().required("State is required"),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });

const { value: vin, errorMessage: vinErrorMessage } = useField("vin");
const { value: year, errorMessage: yearErrorMessage } = useField("year");
const { value: make, errorMessage: makeErrorMessage } = useField("make");
const { value: model, errorMessage: modelErrorMessage } = useField("model");
const { value: engine, errorMessage: engineErrorMessage } = useField("engine");
const {
  value: exteriorColor,
  errorMessage: exteriorColorErrorMessage,
} = useField("exteriorColor");
const {
  value: exteriorCode,
  errorMessage: exteriorCodeErrorMessage,
} = useField("exteriorCode");
const {
  value: interiorColor,
  errorMessage: interiorColorErrorMessage,
} = useField("interiorColor");
const { value: trimCode, errorMessage: trimCodeErrorMessage } = useField(
  "trimCode"
);
const {
  value: vehicleCondition,
  errorMessage: vehicleConditionErrorMessage,
} = useField("vehicleCondition");
const { value: odometer, errorMessage: odometerErrorMessage } = useField(
  "odometer"
);
const {
  value: productionDate,
  errorMessage: productionDateErrorMessage,
} = useField("productionDate");
const {
  value: licensePlate,
  errorMessage: licensePlateErrorMessage,
} = useField("licensePlate");
const { value: state, errorMessage: stateErrorMessage } = useField("state");

const handleAddNewVehical = handleSubmit(async (value) => {
  value.customerId = storeCustomerDetails.value._id;
  await handleFormSubmit(
    value,
    "customerVehical/register",
    resetForm,
    "closeButtonVehical"
  );
});

watch(storeCustomerDetails, async () => {
  const customerId = storeCustomerDetails.value._id;
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/customerVehical/cutomer/vehicals/${customerId}`,
      config
    );
    vehicalList.value = gotData?.data?.data[0]?.customerVehicals;
    localStorage.setItem("vehicalId", vehicalList?.value[0]?._id);
    store.dispatch("setVehicalId", vehicalList?.value[0]?._id);
    store.dispatch("setVehicals", vehicalList?.value);
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
});

const handleVehicalList = (item) => {
  localStorage.setItem("vehicalId", item);
  store.dispatch("setVehicalId", item);
};
</script>
<template>
  <div class="cmx-tabsection">
    <div class="estimatedetailsection">
      <div class="row">
        <div class="col-lg-12 col-rowset">
          <div
            class="d-flex align-items-end gap-sm-3 gap-2 justify-content-between flex-wrap mt-2 mt-sm-4"
          >
            <div class="w-25">
              <div class="input-group">
                <input
                  class="form-control border-end-0 border"
                  type="search"
                  placeholder="YYYY, Make, Model, VIN"
                />
                <span class="input-group-append">
                  <button
                    class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                    type="button"
                  >
                    <i
                      class="fa fa-search"
                      style="color: #ff810080; font-size: 20px;"
                    >
                    </i>
                  </button>
                </span>
              </div>
            </div>
            <div
              class="d-flex align-items-end gap-sm-3 gap-2 justify-content-between flex-wrap"
            >
              <button type="button" class="btn btn-light text-nowrap">
                <i class="fa-regular fa-square-minus"></i>
                &nbsp; Remove Vehicle
              </button>

              <button type="button" class="btn btn-light text-nowrap px-3">
                <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
              </button>

              <button type="button" class="btn btn-light text-nowrap px-3">
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button>

              <button
                type="button"
                id="AddNewVehicleButton"
                class="btn btn-light text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#AddNewVehicleModule"
              >
                <i class="fa-regular fa-square-plus"></i>
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive mystripetable mt-3">
        <table class="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th class="text-nowrap">Vehicle #</th>
              <th class="text-nowrap">Year</th>
              <th class="text-nowrap">Make</th>
              <th class="text-nowrap">Model</th>
              <th class="text-nowrap">VIN</th>
              <th class="text-nowrap">Mileage OUT</th>
              <th class="text-nowrap">Plate #</th>
              <th class="text-nowrap">Plate State</th>
              <th class="text-nowrap">Exterior Color</th>
              <th class="text-nowrap">View</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="(item, index) in vehicalList"
              v-if="vehicalList && vehicalList.length !== 0"
              :key="index"
              @click="handleVehicalList(item._id)"
              role="button"
            >
              <td class="text-center"><input type="checkbox" /></td>
              <td class="text-center">
                {{ index + 1 }}
              </td>
              <td>{{ item.year }}</td>
              <td>{{ item.make }}</td>
              <td>{{ item.model }}</td>
              <td>{{ item.vin }}</td>
              <td>{{ item.year }}</td>
              <td></td>
              <td></td>
              <td>{{ item.exteriorColor }}</td>
              <td class="text-center">
                <img
                  :src="View"
                  alt="View"
                  :style="{ width: '22px', cursor: 'pointer' }"
                />
              </td>
            </tr>
            <tr v-else>
              <td
                colspan="12"
                class="text-center text-danger font-weight-bold py-3"
              >
                No Vehical available!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="modal fade login-popup-dashtwo" id="AddNewVehicleModule">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <h5 class="m-0" :style="{ color: '#636363' }">
                      Add New Vehicle
                    </h5>
                    <button
                      id="closeButtonVehical"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="space-btm-space">
                <div class="row">
                  <div class="col-lg-6 px-4">
                    <div class="row">
                      <div class="col-sm-12 col-md-8">
                        <div class="mt-4">
                          <p class="datexlable">
                            VIN<span v-if="vinErrorMessage" class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="vin"
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

                    <div class="mt-4">
                      <p class="datexlable">
                        Year<span v-if="yearErrorMessage" class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="year"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>

                    <div class="mt-4">
                      <p class="datexlable">
                        Make<span v-if="makeErrorMessage" class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="make"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">
                        Model<span v-if="modelErrorMessage" class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="model"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">
                        Engine<span v-if="engineErrorMessage" class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="engine"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 px-4">
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Exterior Color<span
                              v-if="exteriorColorErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="exteriorColor"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Exterior Code<span
                              v-if="exteriorCodeErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="exteriorCode"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Interior Color<span
                              v-if="interiorColorErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="interiorColor"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Trim Code<span
                              v-if="trimCodeErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="trimCode"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-12">
                        <div class="mt-4">
                          <p class="datexlable">
                            Vehicle Condition<span
                              v-if="vehicleConditionErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="vehicleCondition"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Odometer<span
                              v-if="odometerErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="odometer"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Production Date<span
                              v-if="productionDateErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="productionDate"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            License Plate<span
                              v-if="licensePlateErrorMessage"
                              class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="licensePlate"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            State<span v-if="stateErrorMessage" class="errors"
                              >*</span
                            >
                          </p>
                          <div class="customerXBox">
                            <input
                              v-model="state"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 mt-5">
                    <div class="btn-btn d-flex justify-content-end gap-4">
                      <button class="btn btn-light text-nowrap" type="button">
                        Cancel
                      </button>
                      <button
                        @click="handleAddNewVehical"
                        class="btn btn-light text-nowrap"
                        type="submit"
                      >
                        <i class="fa-regular fa-floppy-disk"></i> Save
                      </button>
                    </div>
                  </div>
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
  vertical-align: middle;
  background-color: #ccdff1;
}

td {
  vertical-align: middle;
  text-align: center;
}

div#myModal {
  z-index: 9999;
}
</style>
