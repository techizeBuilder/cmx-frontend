<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const edit = ref(true);
const handleEdit = () => {
  edit.value = !edit.value;
};
const schema = yup.object().shape({
  policy: yup.string(),
  claim: yup.string(),
  dateOfLoss: yup.string(),
  deductible: yup.string(),
  lossType: yup.string(),
  InsuredOrClaimant: yup.string(),
  InsuranceName: yup.string(),
  phone1: yup.string(),
  phone2: yup.string(),
  email: yup.string(),
  AdjusterName: yup.string(),
  InsuranceAddress: yup.string(),
  City: yup.string(),
  State: yup.string(),
  ZipCode: yup.string(),
  Country: yup.string(),
  Company: yup.string(),
  companyPhone1: yup.string(),
  companyPhone2: yup.string(),
  companyEmail: yup.string(),
  companyAppraiserName: yup.string(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
});

const { value: claim, errorMessage: claimErrorMessage } = useField("claim");
const { value: policy, errorMessage: policyErrorMessage } = useField("policy");
const { value: dateOfLoss, errorMessage: dateOfLossErrorMessage } = useField(
  "dateOfLoss"
);
const { value: deductible, errorMessage: deductibleErrorMessage } = useField(
  "deductible"
);
const { value: lossType, errorMessage: lossTypeErrorMessage } = useField(
  "lossType"
);
const {
  value: InsuredOrClaimant,
  errorMessage: InsuredOrClaimantErrorMessage,
} = useField("InsuredOrClaimant");
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
const {
  value: InsuranceAddress,
  errorMessage: InsuranceAddressErrorMessage,
} = useField("InsuranceAddress");
const { value: City, errorMessage: CityErrorMessage } = useField("City");
const { value: State, errorMessage: StateErrorMessage } = useField("State");
const { value: ZipCode, errorMessage: ZipCodeErrorMessage } = useField(
  "ZipCode"
);
const { value: Country, errorMessage: CountryErrorMessage } = useField(
  "Country"
);
const { value: Company, errorMessage: CompanyErrorMessage } = useField(
  "Company"
);
const {
  value: companyPhone1,
  errorMessage: companyPhone1ErrorMessage,
} = useField("companyPhone1");
const {
  value: companyPhone2,
  errorMessage: companyPhone2ErrorMessage,
} = useField("companyPhone2");
const {
  value: companyEmail,
  errorMessage: companyEmailErrorMessage,
} = useField("companyEmail");
const {
  value: companyAppraiserName,
  errorMessage: companyAppraiserNameErrorMessage,
} = useField("companyAppraiserName");

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
    // document.getElementById("CollapsecmsoneInsuranceCloseButton").click();
    edit.value = true;
  } catch (error) {
    console.log(error);
  }
});

watch(storeEstimateDetails, async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/insurance/details/${storeEstimateDetails.value._id}`,
      config
    );
    store.dispatch("setInsuranceDetails", response.data.data[0]);
    setValues(response.data.data[0] ? response.data.data[0] : {});
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#INSURANCE"
            >INSURANCE</a
          >
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">
          <div
            class="d-flex align-items-end gap-4 justify-content-end mt-2 mt-sm-4"
          >
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
    <div class="row px-sm-5 pt-2 pt-sm-0 cutsomerRow">
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
        <h6>INSURANCE</h6>
        <div class="mt-3">
          <p class="datexlable">
            Policy #
            <span v-if="policyErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              v-model="policy"
              :disabled="edit"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Claim #<span v-if="claimErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
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
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              v-model="dateOfLoss"
              :disabled="edit"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                Deductible<span v-if="deductibleErrorMessage" class="errors"
                  >*</span
                >
              </p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="deductible"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 mt-3">
            <p class="datexlable">Waved</p>
            <div
              class="customerXBox"
              style="display: inline-block; padding: 5px 9px 5px 0px;"
            >
              <input
                class="form-check-input"
                type="checkbox"
                style="width: 25px; height: 25px;"
                :disabled="edit"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3 mt-3">
            <p class="datexlable">None</p>
            <div
              class="customerXBox"
              style="display: inline-block; padding: 5px 9px 5px 0px;"
            >
              <input
                class="form-check-input"
                type="checkbox"
                style="width: 25px; height: 25px;"
                :disabled="edit"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec">
        <div class="mt-3">
          <p class="datexlable">
            Loss Type<span v-if="lossTypeErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <select class="form-select" :disabled="edit" v-model="lossType">
              <option value="Collision">Collision</option>
              <option value="Comprehensive">Comprehensive</option>
              <option value="Liability">Liability</option>
            </select>
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Insured or Claimant<span
              v-if="InsuredOrClaimantErrorMessage"
              class="errors"
              >*</span
            >
          </p>
          <div class="customerXBox">
            <select
              class="form-select"
              :disabled="edit"
              v-model="InsuredOrClaimant"
            >
              <option value="Claimant">Claimant</option>
              <option value="Self Pay">Self Pay</option>
            </select>
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Insurance Name<span v-if="InsuranceNameErrorMessage" class="errors"
              >*</span
            >
          </p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              v-model="InsuranceName"
              :disabled="edit"
            />
          </div>
        </div>
        <div class="row mt-sm-4">
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                Phone 1<span v-if="phone1ErrorMessage" class="errors">*</span>
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
                Phone 2<span v-if="phone2ErrorMessage" class="errors">*</span>
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
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Email Address<span v-if="emailErrorMessage" class="errors">*</span>
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
        <div class="mt-3">
          <p class="datexlable">
            Adjuster Name<span v-if="AdjusterNameErrorMessage" class="errors"
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
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
        <div class="mt-3">
          <p class="datexlable">
            Insurance Address<span
              v-if="InsuranceAddressErrorMessage"
              class="errors"
              >*</span
            >
          </p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              v-model="InsuranceAddress"
              :disabled="edit"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                City<span v-if="CityErrorMessage" class="errors">*</span>
              </p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="City"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                State<span v-if="StateErrorMessage" class="errors">*</span>
              </p>
              <div class="customerXBox">
                <select class="form-select" v-model="State" :disabled="edit">
                  <option selected disabled>Country</option>
                  <option value="France">France</option>
                  <option value="France">France</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                Zip Code<span v-if="ZipCodeErrorMessage" class="errors">*</span>
              </p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="ZipCode"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                Country<span v-if="CountryErrorMessage" class="errors">*</span>
              </p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="Country"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12 mt-sm-4">
            <div class="mt-3">
              <p class="datexlable">
                Appraiser | Company<span
                  v-if="CompanyErrorMessage"
                  class="errors"
                  >*</span
                >
              </p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  type="text"
                  v-model="Company"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                Phone 1<span v-if="companyPhone1ErrorMessage" class="errors"
                  >*</span
                >
              </p>
              <div class="customerXBox">
                <input
                  v-model="companyPhone1"
                  class="form-control"
                  type="text"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="mt-3">
              <p class="datexlable">
                Phone 2<span v-if="companyPhone2ErrorMessage" class="errors"
                  >*</span
                >
              </p>
              <div class="customerXBox">
                <input
                  v-model="companyPhone2"
                  class="form-control"
                  type="text"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div class="mt-3">
              <p class="datexlable">
                Email Address<span
                  v-if="companyEmailErrorMessage"
                  class="errors"
                  >*</span
                >
              </p>
              <div class="customerXBox">
                <input
                  v-model="companyEmail"
                  class="form-control"
                  type="text"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div class="mt-3">
              <p class="datexlable">
                Appraiser Name<span
                  v-if="companyAppraiserNameErrorMessage"
                  class="errors"
                  >*</span
                >
              </p>
              <div class="customerXBox">
                <input
                  v-model="companyAppraiserName"
                  class="form-control"
                  type="text"
                  :disabled="edit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
