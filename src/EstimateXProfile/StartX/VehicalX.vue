<script setup>
import PointofImpactvue from "./PointofImpactvue.vue";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import axios from "axios";
import { showSuccessToast } from "../../toster";

const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const edit = ref(true);
const store = useStore();
const storeVehicalDetails = computed(() => store.getters.getVehicals);
const schema = yup.object().shape({
  vehicleCondition: yup.string().required(),
  vehicalTow: yup.string().required(),
  year: yup.string().required(),
  make: yup.string().required(),
  model: yup.string().required(),
  exteriorColor: yup.string().required(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
});

const { value: vehicalTow, errorMessage: vehicalTowErrorMessage } = useField(
  "vehicalTow"
);
const {
  value: vehicleCondition,
  errorMessage: vehicleConditionErrorMessage,
} = useField("vehicleCondition");
const { value: year, errorMessage: yearErrorMessage } = useField("year");
const { value: make, errorMessage: makeErrorMessage } = useField("make");
const { value: model, errorMessage: modelErrorMessage } = useField("model");
const {
  value: exteriorColor,
  errorMessage: exteriorColorErrorMessage,
} = useField("exteriorColor");

watch(storeVehicalDetails, () => {
  setValues(storeVehicalDetails.value ? storeVehicalDetails.value : {});
});

const handleEdit = () => {
  edit.value = !edit.value;
};
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
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="row pt-sm-4 cutsomerRow justify-content-center">
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-3 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <button type="button" class="btn btn-light text-nowrap">
              &nbsp; Link
            </button>
            <button
              type="button"
              class="btn btn-light text-nowrap"
              @click="handleEdit"
              v-if="edit"
            >
              &nbsp; Edit
            </button>
            <button
              type="button"
              class="btn btn-light text-nowrap"
              @click="onSubmit"
              v-else
              style="background-color: #6bfa65;"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-6 cutsomerCol">
      <div class="row">
        <div class="col-sm-12 col-md-8">
          <div class="mt-4">
            <p class="datexlable">
              Vehicle Drivable or Unsafe to Drive?<span
                v-if="vehicleConditionErrorMessage"
                class="errors"
                >*</span
              >
            </p>
            <div class="customerXBox">
              <select
                v-model="vehicleCondition"
                class="form-select"
                :disabled="edit"
              >
                <option selected disabled>Select</option>
                <option value="Item1">Item1</option>
                <option value="Item1">Item2</option>
                <option value="Item1">Item 3</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-4 mt-3 mt-sm-0 d-flex justify-content-end align-items-end"
        ></div>
      </div>
      <div class="col-sm-12 col-md-8">
        <div class="mt-4">
          <p class="datexlable">
            Vehicle Needs Towed?<span
              v-if="vehicalTowErrorMessage"
              class="errors"
              >*</span
            >
          </p>
          <div class="customerXBox">
            <select v-model="vehicalTow" class="form-select" :disabled="edit">
              <option selected disabled>Select</option>
              <option value="Item1">Item1</option>
              <option value="Item1">Item2</option>
              <option value="Item1">Item 3</option>
            </select>
          </div>
        </div>
      </div>
      <hr class="md-4" />
      <div class="col-sm-12 col-md-4">
        <p class="datexlable">
          Year<span v-if="yearErrorMessage" class="errors">*</span>
        </p>
        <div class="customerXBox">
          <input
            class="form-control"
            type="text"
            v-model="year"
            :disabled="edit"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-8">
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
      <div class="col-sm-12 col-md-8">
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
      <div class="col-sm-12 col-md-4">
        <p class="datexlable">
          Exterior Color<span v-if="exteriorColorErrorMessage" class="errors"
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
    <div
      class="col-sm-12 col-md-6 col-lg-4 cutsomerCol mt-4 mt-sm-0 staffxRowSec"
    >
      <h4 class="text-center">Point Of Impact</h4>
      <PointofImpactvue :edit="edit" />
      <ul class="mt-2">
        <li class="Orange">Orange: Primary Point of Impact</li>
        <li class="Orange">
          Light Orange: Secondary Point of Impact
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.staffxRowSec {
  border-left: 1px solid #636363;
}
</style>
