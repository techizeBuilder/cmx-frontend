<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storeInsuranceDetails = computed(() => store.getters.getInsuranceDetails);
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const edit = ref(true);
const handleEdit = () => {
  edit.value = !edit.value;
};

const schema = yup.object().shape({
  claim: yup.string().required(),
  dateOfLoss: yup.string().required(),
  deductible: yup.string().required(),
  InsuranceName: yup.string().required(),
  phone1: yup.string().required(),
  phone2: yup.string().required(),
  email: yup.string().required(),
  AdjusterName: yup.string().required(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
});

const { value: claim, errorMessage: claimErrorMessage } = useField("claim");
const { value: dateOfLoss, errorMessage: dateOfLossErrorMessage } = useField(
  "dateOfLoss"
);
const { value: deductible, errorMessage: deductibleErrorMessage } = useField(
  "deductible"
);
const {
  value: InsuranceName,
  errorMessage: InsuranceNameErrorMessage,
} = useField("InsuranceName");
const { value: phone1, errorMessage: phone1ErrorMessage } = useField("phone1");
const { value: phone2, errorMessage: phone2ErrorMessage } = useField("phone2");
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const {
  value: AdjusterName,
  errorMessage: AdjusterNameErrorMessage,
} = useField("AdjusterName");

watch(storeInsuranceDetails, () => {
  setValues(storeInsuranceDetails.value ? storeInsuranceDetails.value : {});
});

const onSubmit = handleSubmit(async (value) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    value.estimateId = storeEstimateDetails.value._id;
    value.staffId = localStorage.getItem("userId");
    const response = await axios.post(
      `${apiUrl}/insurance/register`,
      value,
      config
    );
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="estimatedetailsection">
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
              v-else
              @click="onSubmit"
              style="background-color: #6bfa65;"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8 mx-auto">
        <div class="row pt-2 pt-sm-0 stafRow">
          <div class="col-sm-12 col-md-6 stafrCol">
            <div class="mt-sm-3 mt-0">
              <p class="datexlable">Who is paying for damages?</p>
              <div class="stafXBox">
                <select class="form-select" :disabled="edit">
                  <option selected disabled>Select</option>
                  <option value="Item1">Item1</option>
                  <option value="Item1">Item2</option>
                  <option value="Item1">Item 3</option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">
                Insurance Name? or (Self pay)<span
                  v-if="InsuranceNameErrorMessage"
                  class="errors"
                  >*</span
                >
              </p>
              <div class="stafXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="InsuranceName"
                  :disabled="edit"
                />
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">
                Claim #<span v-if="claimErrorMessage" class="errors">*</span>
              </p>
              <div class="stafXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="claim"
                  :disabled="edit"
                />
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">
                Date of Loss<span v-if="dateOfLossErrorMessage" class="errors"
                  >*</span
                >
              </p>
              <div class="stafXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="dateOfLoss"
                  :disabled="edit"
                />
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">
                Deductible<span v-if="deductibleErrorMessage" class="errors"
                  >*</span
                >
              </p>
              <div class="stafXBox d-flex align-items-center">
                <input
                  class="form-control me-2"
                  type="text"
                  v-model="deductible"
                  :disabled="edit"
                />
                <div class="form-check">
                  <label class="form-check-label" for="deductibleCheckbox"
                    >None</label
                  >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="deductibleCheckbox"
                    style="width: 25px; height: 25px;"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 ps-lg-5 cutsomerCol staffxRowSec">
            <div class="mt-3">
              <p>For faster service please provide the following?</p>
              <p class="datexlable">
                Insurance Name<span
                  v-if="InsuranceNameErrorMessage"
                  class="errors"
                  >*</span
                >
              </p>
              <div class="stafXBox">
                <input
                  class="form-control me-2"
                  type="text"
                  v-model="InsuranceName"
                  :disabled="edit"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="mt-3">
                  <p class="datexlable">
                    Insurance Phone 1<span
                      v-if="phone1ErrorMessage"
                      class="errors"
                      >*</span
                    >
                  </p>
                  <div class="customerXBox">
                    <input
                      class="form-control"
                      type="text"
                      v-model="phone1"
                      :disabled="edit"
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="mt-3">
                  <p class="datexlable">
                    Insurance Phone 2<span
                      v-if="phone2ErrorMessage"
                      class="errors"
                      >*</span
                    >
                  </p>
                  <div class="customerXBox">
                    <input
                      class="form-control"
                      type="text"
                      v-model="phone2"
                      :disabled="edit"
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 mt-sm-4">
                <div class="mt-3">
                  <p class="datexlable">
                    Insurance Email Address<span
                      v-if="emailErrorMessage"
                      class="errors"
                      >*</span
                    >
                  </p>
                  <div class="customerXBox">
                    <input
                      class="form-control"
                      type="text"
                      v-model="email"
                      :disabled="edit"
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 mt-sm-4">
                <div class="mt-3">
                  <p class="datexlable">
                    Adjuster Name<span
                      v-if="AdjusterNameErrorMessage"
                      class="errors"
                      >*</span
                    >
                  </p>
                  <div class="customerXBox">
                    <input
                      class="form-control"
                      type="text"
                      v-model="AdjusterName"
                      :disabled="edit"
                    />
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
@media only screen and (min-width: 767px) {
  .stafRow {
    padding: 0 0 4rem 0;
  }

  .stafRow .staffxRowSec {
    border-left: 1px solid #636363;
  }
}
</style>
