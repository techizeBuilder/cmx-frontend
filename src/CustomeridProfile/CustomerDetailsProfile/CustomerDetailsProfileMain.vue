<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast, showSuccessToast } from "../../toster";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();
const AuthToken = localStorage.getItem("AuthToken");
const companyNameCheck = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const edit = ref(true);
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Invalid phone number format"
    )
    .required("Phone number is required")
    .label("Phone number"),
  phone2: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Invalid phone number format"
    )
    .required("Phone number is required")
    .label("Phone number"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup
    .string()
    .required("Zip code is required")
    .matches(/^\d{5}$/, "Zip code must be 5 digits"),
  companyName: yup
    .string()
    .test("companyName", "Company name is required", function (value) {
      if (companyNameCheck.value) {
        return !!value; // return true if value is not empty or null
      } else {
        return true; // return true if companyNameCheck is false
      }
    }),
  country: yup.string(),
});

const { handleSubmit, setValues } = useForm({ validationSchema: schema });

const { value: country, errorMessage: countryErrorMessage } = useField(
  "country"
);
const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
  "firstName"
);
const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
  "lastName"
);
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: phone2, errorMessage: phone2ErrorMessage } = useField("phone2");
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: address, errorMessage: addressErrorMessage } = useField(
  "address"
);
const { value: city, errorMessage: cityErrorMessage } = useField("city");
const { value: state, errorMessage: stateErrorMessage } = useField("state");
const { value: zipCode, errorMessage: zipCodeErrorMessage } = useField(
  "zipCode"
);
const { value: companyName, errorMessage: companyNameErrorMessage } = useField(
  "companyName"
);

const onSubmit = handleSubmit(async (value) => {
  try {
    value.customerId = localStorage.getItem("customerId");
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    value.phone = formatPhoneNumberToDigit(value.phone);
    value.phone2 = formatPhoneNumberToDigit(value.phone2);
    const sendData = await axios.post(
      `${apiUrl}/customer/update/detail`,
      value,
      config
    );
    showSuccessToast(sendData.data.msg);
    // document.getElementById("CustomerDetailCloseButton").click();
    edit.value = true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      showErrorToast(error.response.data.message);
      localStorage.clear();
      router.push("/login");
    } else if (error.response) {
      console.log("An error occurred while fetching data", error);
    } else {
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
});
const handleEdit = () => {
  edit.value = !edit.value;
};

const id = ref(null);
onMounted(async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const customerId = route.params.customerId;
    const sendData = await axios.get(
      `${apiUrl}/customer/search/Customers/${customerId}`,
      config
    );
    setValues(sendData.data.data);
    phone.value = formatPhoneNumber(phone.value);
    phone2.value = formatPhoneNumber(phone2.value);
    store.dispatch("setCustomerDetails", sendData.data.data);
    localStorage.setItem("customerId", sendData.data.data._id);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      showErrorToast(error.response.data.message);
      localStorage.clear();
      router.push("/login");
    } else if (error.response) {
      console.log("An error occurred while fetching data", error);
    } else {
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
});

function formatPhoneNumber(input) {
  if (input) {
    let phoneInput = input.replace(/\D+/g, "");
    phoneInput = phoneInput.substring(0, 10);
    if (phoneInput.length >= 4 && phoneInput.length <= 6) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(3)}`;
    } else if (phoneInput.length >= 7) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(
        3,
        6
      )}-${phoneInput.slice(6, 10)}`;
    } else {
      return phoneInput;
    }
  }
  return input;
}

function formatPhoneNumberToDigit(input) {
  let phoneInput = input.replace(/\D+/g, "");
  if (phoneInput.length >= 4 && phoneInput.length <= 6) {
    return phoneInput.slice(0, 3) + phoneInput.slice(3);
  } else if (phoneInput.length >= 7) {
    return (
      phoneInput.slice(0, 3) + phoneInput.slice(3, 6) + phoneInput.slice(6)
    );
  } else {
    return phoneInput;
  }
}
</script>

<template>
  <div class="estimatedetailsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#CUSTOMER"
            >Customer Details</a
          >
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <div class="d-flex align-items-end gap-4 justify-content-end">
              <button
                type="button"
                @click="handleEdit"
                v-if="edit"
                class="btn btn-light text-nowrap"
              >
                <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
              </button>
              <button
                type="button"
                @click="onSubmit"
                v-else
                style="background-color: #6bfa65;"
                class="btn btn-light text-nowrap"
              >
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
        <h6>Customer ID: {{ id }}</h6>
        <div class="mt-3">
          <p class="datexlable">
            First name<span v-if="firstNameErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="firstName"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Last name<span v-if="lastNameErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="lastName"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Phone / Cell 1<span v-if="phoneErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="phone"
              @input="() => (phone = formatPhoneNumber(phone))"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Phone 2<span v-if="phone2ErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="phone2"
              @input="() => (phone2 = formatPhoneNumber(phone2))"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Email Address<span v-if="emailErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="email"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec">
        <div class="mt-3">
          <p class="datexlable">
            Address<span v-if="addressErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="address"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            City<span v-if="cityErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="city"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            State
            <span v-if="stateErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <select v-model="state" :disabled="edit" class="form-select">
              <option value="">-</option>
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Zip Code<span v-if="zipCodeErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <input
              v-model="zipCode"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Country<span v-if="countryErrorMessage" class="errors">*</span>
          </p>
          <div class="customerXBox">
            <select v-model="country" :disabled="edit" class="form-select">
              <option value="">-</option>
              <option value="United States">United States</option>
              <!-- <option value="Canada">Canada</option> -->
              <!-- <option value="Mexico">Mexico</option> -->
            </select>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
        <div class="mt-3">
          <p class="datexlable">Is this a Company?</p>
          <div
            class="customerXBox"
            style="display: inline-block; padding: 5px 9px 5px 0px;"
          >
            <input
              class="form-check-input"
              type="checkbox"
              style="width: 25px; height: 25px;"
              v-model="companyNameCheck"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">
            Company Name<span v-if="companyNameErrorMessage" class="errors"
              >*</span
            >
          </p>
          <div class="customerXBox">
            <input
              v-model="companyName"
              :disabled="edit"
              class="form-control"
              type="text"
            />
          </div>
        </div>
      </div>
    </div></div
></template>
<style>
.errors {
  color: red;
}
</style>
