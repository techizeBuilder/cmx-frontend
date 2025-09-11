<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps(["customerData"]);
const schema = yup.object().shape({
  payForDamage: yup.string().required("repair payForDamage is required"),
  insurance: yup.string().required("insurance is required"),
  claim: yup.string().required("claim is required"),
  dateOfLoss: yup.string().required("dateOfLoss is required"),
  deductible: yup.string().required("deductible is required"),
  insurancePhone: yup.string().required("insurancePhone is required"),
  insurancePhone2: yup.string().required("insurancePhone2 is required"),
  insuranceEmail: yup.string().required("insuranceEmail is required"),
  insuranceAdjusterName: yup
    .string()
    .required("insuranceAdjusterName is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.customerData,
});
const {
  value: payForDamage,
  errorMessage: payForDamageErrorMessage,
} = useField("payForDamage");
const { value: insurance, errorMessage: insuranceErrorMessage } = useField(
  "insurance"
);
const { value: claim, errorMessage: claimErrorMessage } = useField("claim");
const { value: dateOfLoss, errorMessage: dateOfLossErrorMessage } = useField(
  "dateOfLoss"
);
const { value: deductible, errorMessage: deductibleErrorMessage } = useField(
  "deductible"
);
const {
  value: insurancePhone,
  errorMessage: insurancePhoneErrorMessage,
} = useField("insurancePhone");
const {
  value: insurancePhone2,
  errorMessage: insurancePhone2ErrorMessage,
} = useField("insurancePhone2");
const {
  value: insuranceEmail,
  errorMessage: insuranceEmailErrorMessage,
} = useField("insuranceEmail");
const {
  value: insuranceAdjusterName,
  errorMessage: insuranceAdjusterNameErrorMessage,
} = useField("insuranceAdjusterName");

const handleSubmitStep3 = handleSubmit((value) => {
  return value;
});

defineExpose({
  handleSubmitStep3,
});
</script>
<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-8 mx-auto">
      <div class="row pt-sm-4 bordermid">
        <div class="col-sm-12 col-md-6 col-lg-6 cutsomerCol">
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="mt-4">
                <p class="datexlable">Who is paying for damages?</p>
                <div class="customerXBox">
                  <select class="form-select" v-model="payForDamage">
                    <option value="Self pay">Self pay </option>
                    <option value="My Insurance">My Insurance</option>
                    <option value="Other Party Insurance"
                      >Other Party Insurance</option
                    >
                  </select>
                  <span class="errors">{{ payForDamageErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-4">
                <p class="datexlable">Insurance Name? or (Self pay)</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" v-model="insurance" />
                  <span class="errors">{{ insuranceErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-4">
                <p class="datexlable">Claim #</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" v-model="claim" />
                  <span class="errors">{{ claimErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-4">
                <p class="datexlable">Date of Loss</p>
                <div class="customerXBox">
                  <input
                    class="form-control"
                    type="text"
                    v-model="dateOfLoss"
                  />
                  <span class="errors">{{ dateOfLossErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-8">
              <div class="mt-4">
                <p class="datexlable">Deductible</p>
                <div class="customerXBox">
                  <input
                    class="form-control"
                    type="text"
                    v-model="deductible"
                  />
                  <span class="errors">{{ deductibleErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-2">
              <div class="mt-4">
                <p class="datexlable">None</p>
                <div class="customerXBox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    style="width: 25px; height: 25px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-6 col-lg-6 cutsomerCol cutsomerRowSec mt-4 mt-sm-0"
        >
          <div class="row">
            <p>For faster service please provide the following?</p>

            <div class="col-sm-12 col-md-6">
              <div class="mt-4">
                <p class="datexlable">Insurance Phone 1</p>
                <div class="customerXBox">
                  <input
                    class="form-control"
                    type="text"
                    v-model="insurancePhone"
                  />
                  <span class="errors">{{ insurancePhoneErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="mt-4">
                <p class="datexlable">Insurance Phone 2</p>
                <div class="customerXBox">
                  <input
                    class="form-control"
                    type="text"
                    v-model="insurancePhone2"
                  />
                  <span class="errors">{{ insurancePhone2ErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-4">
                <p class="datexlable">Insurance Email Address</p>
                <div class="customerXBox">
                  <input
                    class="form-control"
                    type="text"
                    v-model="insuranceEmail"
                  />
                  <span class="errors">{{ insuranceEmailErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-4">
                <p class="datexlable">Insurance Adjuster Name</p>
                <div class="customerXBox">
                  <input
                    class="form-control"
                    type="text"
                    v-model="insuranceAdjusterName"
                  />
                  <span class="errors">{{
                    insuranceAdjusterNameErrorMessage
                  }}</span>
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
.bordermid .cutsomerCol {
  padding: 0 4rem;
}

.bordermid .cutsomerRowSec {
  border-left: 1px solid #636363;
}
</style>
