<script setup>
import VehicleInfo from "../Icons/VehicleInfo.svg";
import pointOfImpact from "../Icons/pointOfImpact.png";
import PointofImpactvue from "./PointofImpact.vue";
import pump from "./pump.png";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { watch, computed, ref } from "vue";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../toster";
import VueDatePicker from "@vuepic/vue-datepicker";

const edit = ref(true);
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const store = useStore();
const storeVehicalDetails = computed(() => store.getters.getVehicals);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);

const handleEdit = () => {
  edit.value = !edit.value;
};

const schema = yup.object().shape({
  vin: yup.string(),
  year: yup.string(),
  make: yup.string(),
  model: yup.string(),
  engine: yup.string(),
  exteriorColor: yup.string(),
  exteriorCode: yup.string(),
  interiorColor: yup.string(),
  trimCode: yup.string(),
  vehicleCondition: yup.string(),
  odometer: yup.string(),
  productionDate: yup.string(),
  licensePlate: yup.string(),
  state: yup.string(),
  priorityDamage: yup.string(),
  milegeIn: yup.string(),
  milegeOut: yup.string(),
  country: yup.string(),
  impactReport: yup.string(),
  fuelsMark: yup.string(),
  fuelsFilled: yup.string(),
});

const { handleSubmit, setValues } = useForm({ validationSchema: schema });

const { value: fuelsFilled, errorMessage: fuelsFilledErrorMessage } = useField(
  "fuelsFilled"
);
const { value: fuelsMark, errorMessage: fuelsMarkErrorMessage } = useField(
  "fuelsMark"
);
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
  value: priorityDamage,
  errorMessage: priorityDamageErrorMessage,
} = useField("priorityDamage");
const {
  value: productionDate,
  errorMessage: productionDateErrorMessage,
} = useField("productionDate");
const {
  value: licensePlate,
  errorMessage: licensePlateErrorMessage,
} = useField("licensePlate");
const { value: state, errorMessage: stateErrorMessage } = useField("state");
const { value: milegeIn, errorMessage: milageInErrorMessage } = useField(
  "milegeIn"
);
const { value: milegeOut, errorMessage: milegeOutErrorMessage } = useField(
  "milegeOut"
);
const { value: country, errorMessage: countryErrorMessage } = useField(
  "country"
);
const {
  value: impactReport,
  errorMessage: impactReportErrorMessage,
} = useField("impactReport");
watch(storeVehicalDetails, () => {
  setValues(storeVehicalDetails.value ? storeVehicalDetails.value : {});
});

const onSubmit = handleSubmit(async (value) => {
  try {
    value.vehicalId = storeVehicalDetails.value._id;
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const sendData = await axios.post(
      `${apiUrl}/customerVehical/update/details`,
      value,
      config
    );
    showSuccessToast(sendData.data.msg);
    store.dispatch("setVehicals", sendData.data.data);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    // document.getElementById("CollapsecmsoneVehicalCloseButton");
    edit.value = true;
  } catch (error) {
    console.log(error);
  }
});

const handleDecode = async () => {
  try {
    if (!vin.value || vin.value.length !== 17) {
      showErrorToast("Invalid VIN. Please enter a 17-character VIN.");
      return;
    }
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin.value}?format=json`
    );
    const result = response.data.Results[0];

    if (
      result.ErrorCode !== "0" ||
      !result.Model ||
      !result.Make ||
      !result.ModelYear
    ) {
      showErrorToast("The VIN is invalid. Please check the VIN and try again.");
      return;
    }

    model.value = result.Model;
    year.value = result.ModelYear;
    make.value = result.Make;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Comments">
            Vehicle Info</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Comments">
          <div class="estimatedetailsection">
            <div class="row">
              <div class="col-lg-12 col-rowset">
                <div
                  class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end"
                >
                  <div
                    class="d-flex align-items-end gap-sm-4 gap-2 justify-content-end"
                  >
                    <button type="button" class="btn btn-light text-nowrap">
                      <i class="fa-solid fa-print"></i>&nbsp; Print Check IN
                    </button>
                    <button
                      type="button"
                      class="btn btn-light text-nowrap"
                      @click="handleEdit"
                      v-if="edit"
                    >
                      <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-light text-nowrap"
                      v-else
                      style="background-color: #6bfa65;"
                      @click="onSubmit"
                    >
                      <i class="fa-regular fa-floppy-disk"></i> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-sm-4 cutsomerRow">
              <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
                <div class="row">
                  <div class="col-sm-12 col-md-8">
                    <div class="mt-4">
                      <p class="datexlable">
                        VIN<span v-if="vinErrorMessage" class="errors">*</span>
                      </p>
                      <div class="customerXBox">
                        <input
                          class="form-control"
                          type="text"
                          v-model="vin"
                          :disabled="edit"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 col-md-4 mt-3 mt-sm-0 d-flex justify-content-end align-items-end"
                  >
                    <button
                      @click="handleDecode"
                      type="button"
                      class="btn btn-light"
                    >
                      Decode
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="mt-4">
                      <p class="datexlable">
                        Year<span v-if="yearErrorMessage" class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <!-- <input
                          class="form-control"
                          type="text"
                          v-model="year"
                          :disabled="edit"
                        /> -->
                        <VueDatePicker
                          v-model="year"
                          :disabled="edit"
                          week-start="0"
                          year-picker
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
                          class="form-control"
                          type="text"
                          v-model="productionDate"
                          :disabled="edit"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <p class="datexlable">
                    Make<span v-if="makeErrorMessage" class="errors">*</span>
                  </p>
                  <div class="customerXBox">
                    <input
                      class="form-control"
                      type="text"
                      v-model="make"
                      :disabled="edit"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <p class="datexlable">
                    Model<span v-if="modelErrorMessage" class="errors">*</span>
                  </p>
                  <div class="customerXBox">
                    <input
                      class="form-control"
                      type="text"
                      v-model="model"
                      :disabled="edit"
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
                      class="form-control"
                      type="text"
                      v-model="engine"
                      :disabled="edit"
                    />
                  </div>
                </div>
                <hr class="mt-5" />
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
                          class="form-control"
                          type="text"
                          v-model="exteriorColor"
                          :disabled="edit"
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
                          class="form-control"
                          type="text"
                          v-model="exteriorCode"
                          :disabled="edit"
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
                          class="form-control"
                          type="text"
                          v-model="interiorColor"
                          :disabled="edit"
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
                          class="form-control"
                          type="text"
                          v-model="trimCode"
                          :disabled="edit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec"
              >
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <div class="d-flex gap-2 align-items-center">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="check1"
                        name="option1"
                        :style="{ width: '25px', height: '25px' }"
                        v-model="fuelsMark"
                      /><span v-if="fuelsMarkErrorMessage" class="errors"
                        >*</span
                      >
                      <img :src="pump" alt="pump" class="img-fluid" />
                      <div class="range-slider vehicleRange w-100">
                        <div
                          class="d-flex justify-content-between align-items-center"
                          :style="{ marginBottom: '-10px', padding: '0 12px' }"
                        >
                          <small>E</small>
                          <small>1/4</small>
                          <small>1/2</small>
                          <small>3/4</small>
                          <small>F</small>
                        </div>

                        <div class="slidecontainer">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            class="slider"
                            id="myRange"
                            v-model="fuelsFilled"
                          /><span v-if="fuelsFilledErrorMessage" class="errors"
                            >*</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="mt-4">
                      <p class="datexlable">
                        Mileage IN<span
                          v-if="milageInErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          class="form-control"
                          type="text"
                          v-model="milegeIn"
                          :disabled="edit"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="mt-4">
                      <p class="datexlable">
                        Mileage OUT<span
                          v-if="milegeOutErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          class="form-control"
                          type="text"
                          v-model="milegeOut"
                          :disabled="edit"
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
                          class="form-control"
                          type="text"
                          v-model="licensePlate"
                          :disabled="edit"
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
                        <select
                          class="form-select"
                          v-model="state"
                          :disabled="edit"
                        >
                          <option selected disabled>Country</option>
                          <option value="France">France</option>
                          <option value="France">France</option>
                          <option value="France">France</option>
                        </select>
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
                        <select
                          class="form-select"
                          v-model="vehicleCondition"
                          :disabled="edit"
                        >
                          <option value="">-</option>
                          <option value="New">New</option>
                          <option value="Clean">Clean</option>
                          <option value="Fair">Fair</option>
                          <option value="Poor">Poor</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-12">
                    <div class="mt-4">
                      <p class="datexlable">
                        Prior Damage Report<span
                          v-if="priorityDamageErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <textarea
                          class="form-control"
                          rows="8"
                          name="text"
                          style="resize: none;"
                          v-model="priorityDamage"
                          :disabled="edit"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol mt-4 mt-sm-0">
                <div>
                  <h4 class="text-center">Point Of Impact</h4>
                  <PointofImpactvue :edit="edit" />
                </div>
                <div class="mt-4">
                  <p class="datexlable">
                    Impact Report<span
                      v-if="impactReportErrorMessage"
                      class="errors"
                      >*</span
                    >
                  </p>
                  <div class="customerXBox">
                    <textarea
                      class="form-control"
                      rows="3"
                      name="text"
                      v-model="impactReport"
                      :disabled="edit"
                      style="resize: none;"
                    ></textarea>
                  </div>
                </div>
                <ul class="mt-2">
                  <li class="Orange">Orange: Primary Point of Impact</li>
                  <li class="Orange">
                    Light Orange: Secondary Point of Impact
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.Orange {
  font-size: 12px;
}

.vehicleRange .slidecontainer {
  width: 100%;
  /* Width of the outside container */
}

/* The slider itself */
.vehicleRange .slider {
  -webkit-appearance: none;
  /* Override default CSS styles */
  appearance: none;
  width: 100%;
  height: 3px;
  background: #434343;
  outline: none;
  opacity: 0.8;

  -webkit-transition: 0.2s;
  /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.vehicleRange .slider:hover {
  opacity: 1;
  /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.vehicleRange .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Override default look */
  appearance: none;
  width: 30px;
  /* Set a specific slider handle width */
  height: 30px;
  /* Slider handle height */

  background-image: url("./Polygon.png");
  background-repeat: no-repeat;

  background-position: bottom;
  /* Green background */
  cursor: pointer;
  margin-top: 0px;
  /* Cursor on hover */
}

.vehicleRange .slider::-moz-range-thumb {
  width: 30px;
  /* Set a specific slider handle width */
  height: 30px;
  /* Slider handle height */

  background-image: url("./Polygon.png");
  background-repeat: no-repeat;

  background-position: bottom;
  /* Green background */
  cursor: pointer;
  margin-top: 0px;
  /* Cursor on hover */
}
</style>
