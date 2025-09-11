<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps(["customerData"]);
const schema = yup.object().shape({
  repairVehical: yup.string().required("repair repairVehical is required"),
  howSoon: yup.string().required("howSoon is required"),
  beenHereBefore: yup.string().required("beenHereBefore is required"),
  reference: yup.string().required("reference is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.customerData,
});
const {
  value: repairVehical,
  errorMessage: repairVehicalErrorMessage,
} = useField("repairVehical");
const { value: howSoon, errorMessage: howSoonErrorMessage } = useField(
  "howSoon"
);
const {
  value: beenHereBefore,
  errorMessage: beenHereBeforeErrorMessage,
} = useField("beenHereBefore");
const { value: reference, errorMessage: referenceErrorMessage } = useField(
  "reference"
);
const handleSubmitStep4 = handleSubmit((value) => {
  return value;
});

defineExpose({
  handleSubmitStep4,
});
</script>
<template>
  <div class="row">
    <div class="col-sm-12 col-md-4 mx-auto">
      <div class="mt-4">
        <p class="datexlable">Do you want us to Repair your vehicle?</p>
        <div class="customerXBox">
          <select class="form-select" v-model="repairVehical">
            <option value="ASAP">ASAP</option>
            <option value="Not sure">Not sure</option>
          </select>
          <span class="errors">{{ repairVehicalErrorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-4 mx-auto">
      <div class="mt-4">
        <p class="datexlable">How soon do you want to repair your vehicle?</p>
        <div class="customerXBox">
          <select class="form-select" v-model="howSoon">
            <option value="Yes">Yes</option>
            <option value="Not sure">Not sure</option>
          </select>
          <span class="errors">{{ howSoonErrorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-4 mx-auto">
      <div class="mt-4">
        <p class="datexlable">Have you been here before?</p>
        <div class="customerXBox">
          <select class="form-select" v-model="beenHereBefore">
            <option value="Yes">Yes </option>
            <option value="First time here">First time here</option>
          </select>
          <span class="errors">{{ beenHereBeforeErrorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-4 mx-auto">
      <div class="mt-4">
        <p class="datexlable">Who referred you here?</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="reference" />
          <span class="errors">{{ referenceErrorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-4 mx-auto">
      <div class="mt-4">
        <div class="chatCustate">
          <h5 class="m-0">How easy was this form?</h5>
          <small>5 Stars = Super Easy</small>
          <div class="customerRatingR mt-2">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.customerRatingR .checked,
.GoogleRatingR .checked {
  color: orange;
  font-size: 25px;
  margin: 0 4px;
}
</style>
