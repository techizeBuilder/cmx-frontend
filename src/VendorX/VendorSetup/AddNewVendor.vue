<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const schema = yup.object().shape({
  vendorName: yup.string().required("vendorName is required"),
  vendorFirstName: yup.string().required("vendorFirstName is required"),
  vendorLastName: yup.string().required("vendorLastName is required"),
  vendorPhoneMain: yup.string().required("vendorPhoneMain is required"),
  vendorPhoneDirect: yup.string().required("vendorPhoneDirect is required"),
  vendorEmail: yup.string().required("vendorEmail is required"),
  vendorWebsite: yup.string().required("vendorWebsite is required"),
  vendorAddress: yup.string().required("vendorAddress is required"),
  vendorCity: yup.string().required("vendorCity is required"),
  vendorState: yup.string().required("vendorState is required"),
  vendorZipCode: yup.string().required("vendorZipCode is required"),
  // VendorType: yup.string().required("VendorType is required"),
  // vendorDealerShipBrand: yup
  //   .string()
  //   .required("vendorDealerShipBrand is required"),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const {
  value: vendorName,
  errorMessage: vendorNameErrorMessAddress,
} = useField("vendorName");
const {
  value: vendorFirstName,
  errorMessage: vendorFirstNameErrorMessage,
} = useField("vendorFirstName");
const {
  value: vendorLastName,
  errorMessage: vendorLastNameErrorMessage,
} = useField("vendorLastName");
const {
  value: vendorPhoneMain,
  errorMessage: vendorPhoneMainErrorMessage,
} = useField("vendorPhoneMain");
const {
  value: vendorPhoneDirect,
  errorMessage: vendorPhoneDirectErrorMessage,
} = useField("vendorPhoneDirect");
const { value: vendorEmail, errorMessage: vendorEmailErrorMessage } = useField(
  "vendorEmail"
);
const {
  value: vendorWebsite,
  errorMessage: vendorWebsiteErrorMessage,
} = useField("vendorWebsite");
const {
  value: vendorAddress,
  errorMessage: vendorAddressErrorMessage,
} = useField("vendorAddress");
const { value: vendorState, errorMessage: vendorStateErrorMessage } = useField(
  "vendorState"
);
const { value: vendorCity, errorMessage: vendorCityErrorMessage } = useField(
  "vendorCity"
);
const {
  value: vendorZipCode,
  errorMessage: vendorZipCodeErrorMessage,
} = useField("vendorZipCode");
// const { value: VendorType, errorMessage: VendorTypeErrorMessage } = useField(
//   "VendorType"
// );
// const {
//   value: vendorDealerShipBrand,
//   errorMessage: vendorDealerShipBrandErrorMessage,
// } = useField("vendorDealerShipBrand");

const handleValues = handleSubmit(async (value) => {
  try {
    value.shopId = localStorage.getItem("shopId");
    value.userName  = 'UserName';
    value.password = 'Password';
    console.log(value);
    const response = await axios.post(`${apiUrl}/vendor/register`,value);
    console.log(response.data.msg);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="px-3 mt-4">
    <div class="d-flex align-items-end gap-4 justify-content-between">
      <div>
        <div
          class="text-center d-flex align-items-end gap-5 justify-content-center"
        >
          <p class="m-0">Active</p>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="mySwitch"
              name="darkmode"
              checked="checked"
              value="yes"
              style="font-size: 25px;"
            />
          </div>
        </div>
        <h6 class="mt-4">Vendor#: XXXXXXX</h6>
      </div>
      <div class="d-flex align-items-end gap-4 justify-content-between">
        <button type="button" class="btn btn-light text-nowrap">
          <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
        </button>
        <button
          @click="handleValues"
          type="button"
          class="btn btn-light text-nowrap"
        >
          <i class="fa-regular fa-floppy-disk"></i> Save
        </button>
      </div>
    </div>

    <div class="mt-4">
      <div class="row px-lg-5 pt-4 pt-sm-0">
        <div class="col-sm-12 col-md-6 col-lg-4 pe-5">
          <div class="mt-3">
            <p class="datexlable">Vendor Name</p>
            <div class="customerXBox">
              <input v-model="vendorName" class="form-control" type="text" />
              <span class="errors">{{ vendorNameErrorMessAddress }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">First name</p>
            <div class="customerXBox">
              <input
                v-model="vendorFirstName"
                class="form-control"
                type="text"
              />
              <span class="errors">{{ vendorFirstNameErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Last name</p>
            <div class="customerXBox">
              <input
                v-model="vendorLastName"
                class="form-control"
                type="text"
              />
              <span class="errors">{{ vendorLastNameErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Phone / Main</p>
            <div class="customerXBox">
              <input
                v-model="vendorPhoneMain"
                class="form-control"
                type="text"
              />
              <span class="errors">{{ vendorPhoneMainErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Phone / Direct</p>
            <div class="customerXBox">
              <input
                v-model="vendorPhoneDirect"
                class="form-control"
                type="text"
              />
              <span class="errors">{{ vendorPhoneDirectErrorMessage }}</span>
            </div>
          </div>

          <div class="mt-3">
            <p class="datexlable">Primary Email Address</p>
            <div class="customerXBox">
              <input v-model="vendorEmail" class="form-control" type="text" />
              <span class="errors">{{ vendorEmailErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Dealership website</p>
            <div class="customerXBox">
              <input v-model="vendorWebsite" class="form-control" type="text" />
              <span class="errors">{{ vendorWebsiteErrorMessage }}</span>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 venderLine px-5">
          <div class="mt-3">
            <p class="datexlable">Vendor Address</p>
            <div class="customerXBox">
              <input v-model="vendorAddress" class="form-control" type="text" />
              <span class="errors">{{ vendorAddressErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Vendor City</p>
            <div class="customerXBox">
              <input v-model="vendorCity" class="form-control" type="text" />
              <span class="errors">{{ vendorCityErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Vendor State</p>
            <div class="customerXBox">
              <select v-model="vendorState" class="form-select">
                <option value="Vendor State">Vendor State</option>
                <option value="Vendor State">Vendor State</option>
                <option value="Vendor State">Vendor State</option>
              </select>
              <span class="errors">{{ vendorStateErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Vendor Zip Code</p>
            <div class="customerXBox">
              <input v-model="vendorZipCode" class="form-control" type="text" />
              <span class="errors">{{ vendorZipCodeErrorMessage }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.venderLine {
  border-left: 1px solid #000;
}
</style>
