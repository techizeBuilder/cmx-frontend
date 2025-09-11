<script setup>
import pointOfImpact from "../Icons/pointOfImpact.png";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps(["customerData"]);
const schema = yup.object().shape({
  vehicalDrivable: yup.string().required("repair vehicalDrivable is required"),
  year: yup.string().required("year is required"),
  needsTow: yup.string().required("needsTow is required"),
  make: yup.string().required("make is required"),
  model: yup.string().required("model is required"),
  exteriorColor: yup.string().required("exteriorColor is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.customerData,
});
const {
  value: vehicalDrivable,
  errorMessage: vehicalDrivableErrorMessage,
} = useField("vehicalDrivable");
const { value: year, errorMessage: yearErrorMessage } = useField("year");
const { value: needsTow, errorMessage: needsTowErrorMessage } = useField(
  "needsTow"
);
const { value: make, errorMessage: makeErrorMessage } = useField("make");
const { value: model, errorMessage: modelErrorMessage } = useField("model");
const {
  value: exteriorColor,
  errorMessage: exteriorColorErrorMessage,
} = useField("exteriorColor");

const handleSubmitStep2 = handleSubmit((value) => {
  return value;
});

defineExpose({
  handleSubmitStep2,
});
</script>
<template>
  <div class="row pt-sm-4 cutsomerRow">
    <div class="col-sm-12 col-md-6 col-lg-6 cutsomerCol cutsomerRowSec">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="mt-4">
            <p class="datexlable">Vehicle Drivable or Unsafe to Drive?</p>
            <div class="customerXBox">
              <select class="form-select" v-model="vehicalDrivable">
                <option value="Drivable">Drivable</option>
                <option value="Not Drivable">Not Drivable</option>
                <option value="Unsafe to Drive">Unsafe to Drive</option>
              </select>
              <span class="errors">{{ vehicalDrivableErrorMessage }}</span>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12">
          <div class="mt-4">
            <p class="datexlable">Vehicle Needs Towed?</p>
            <div class="customerXBox">
              <select class="form-select" v-model="needsTow">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span class="errors">{{ needsTowErrorMessage }}</span>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="mt-4">
            <p class="datexlable">Year</p>
            <div class="customerXBox">
              <input class="form-control" type="text" v-model="year" />
              <span class="errors">{{ yearErrorMessage }}</span>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12">
          <div class="mt-4">
            <p class="datexlable">Make</p>
            <div class="customerXBox">
              <input class="form-control" type="text" v-model="make" />
              <span class="errors">{{ makeErrorMessage }}</span>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12">
          <div class="mt-4">
            <p class="datexlable">Model</p>
            <div class="customerXBox">
              <input class="form-control" type="text" v-model="model" />
              <span class="errors">{{ modelErrorMessage }}</span>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="mt-4">
            <p class="datexlable">Exterior Color</p>
            <div class="customerXBox">
              <input class="form-control" type="text" v-model="exteriorColor" />
              <span class="errors">{{ exteriorColorErrorMessage }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-6 cutsomerCol mt-4 mt-sm-0">
      <div>
        <img
          :src="pointOfImpact"
          alt="pointOfImpact"
          class="img-fluid"
          :style="{ width: '380px' }"
        />
      </div>
      <ul class="mt-2">
        <li class="Orange">Orange: Primary Point of Impact</li>
        <li class="Orange">Light Orange: Secondary Point of Impact</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.Orange {
  font-size: 12px;
}
</style>
