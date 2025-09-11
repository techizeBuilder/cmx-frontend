<script setup>
import cus01 from "./Icons/cus01.png";
import vehi01 from "./Icons/vehi01.png";
import Link01 from "./Icons/Link01.png";
import clock01 from "./Icons/clock01.png";
import plus from "./Icons/plus.png";
import * as yup from "yup";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { showSuccessToast, showErrorToast } from "../toster";
import { onMounted, ref } from "vue";
import openicon from "./Icons/openicon.png";

const companyNameCheck = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const store = useStore();
const router = useRouter();
const shopId = localStorage.getItem("shopId");

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
  country: yup.string().required("country is required"),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });

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

const onSubmit = async () => {
  try {

    const data = {
      shopId,
      firstName: firstName?.value ?? '',
      lastName: lastName?.value ?? '',
      phone: phone?.value ?? '',
      phone2: phone2?.value ?? '',
      email: email?.value ?? '',
      address: address?.value ?? '',
      city: city?.value ?? '',
      state: state?.value ?? '',
      zipCode: zipCode?.value ?? '',
      country: country?.value ?? '',
      companyNameCheck: companyNameCheck?.value ?? '',
      companyName: companyName?.value ?? '',
    };

    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.phone.trim() ||
      !data.phone2.trim() ||
      !data.email.trim() ||
      !data.address.trim() ||
      !data.city.trim() ||
      !data.state.trim() ||
      !data.zipCode.trim() ||
      !data.country.trim()
    ) {
      showErrorToast('Please fill all required fields');
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };

    const response = await axios.post(
      `${apiUrl}/customer/register`,
      data,
      config
    );


    if (response.data.success) {
      showSuccessToast(response.data.msg);
      router.push(`/customeridprofile/${response.data.data.customerId}`);
      resetForm();
    } else {
      console.error('Error: Unable to register customer');
    }

  } catch (error) {
    handleError(error);
  }
};

const foundData = ref([]);
const onUpdate = async (value) => {
  if (value) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const gotData = await axios.get(
        `${apiUrl}/shop/searchCustomer/1/25/${shopId}/${value}`,
        config
      );
      foundData.value = gotData.data?.data[0]?.customers;
    } catch (error) {
      handleError(error);
    }
  }
};
const handleCustomer = (item, customerId) => {
  localStorage.setItem("cId", customerId);
  router.push(`/customeridprofile/${item}`);
};

const featchData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const allData = await axios.get(
      `${apiUrl}/shop/getAllCustomer/${shopId}/1`,
      config
    );
    foundData.value = allData.data?.data[0]?.customers;
  } catch (error) {
    handleError(error);
  }
};

onMounted(async () => {
  await featchData();
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
  <div class="px-3 mt-5">
    <div class="estimatedetailsection px-lg-5">
      <div class="d-flex justify-content-between">
        <h3 class="m-0">Add New Customer</h3>
        <button @click="$router.go(-1)" class="btn btn-light px-5">Back</button>
      </div>
      <div class="row pt-4 pt-sm-0 mt-5 cutsomerRow">
        <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
          <div class="mt-3">
            <p class="datexlable">
              First name<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="firstName" class="form-control" type="text" @input="onUpdate(firstName)" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Last name<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="lastName" class="form-control" type="text" @input="onUpdate(lastName)" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Phone / Cell 1<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="phone" class="form-control" type="text" @input="
                () => {
                  onUpdate(phone);
                  phone = formatPhoneNumber(phone);
                }
              " />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Phone 2<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="phone2" class="form-control" type="text" @input="
                () => {
                  onUpdate(phone2);
                  phone2 = formatPhoneNumber(phone2);
                }
              " />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Email Address<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="email" class="form-control" type="text" @input="onUpdate(email)" />
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec">
          <div class="mt-3">
            <p class="datexlable">
              Address<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="address" class="form-control" type="text" @input="onUpdate(address)" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              City<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="city" class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              State<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="state" class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Zip Code<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="zipCode" class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Country<span  class="errors">*</span>
            </p>
            <div class="customerXBox">
              <select v-model="country" class="form-select">
                <option disabled value="">Country</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
          <div class="mt-3">
            <p class="datexlable">Is this a Company?</p>
            <div class="customerXBox" style="display: inline-block; padding: 5px 9px 5px 0px;">
              <input class="form-check-input" type="checkbox" style="width: 25px; height: 25px;"
                v-model="companyNameCheck" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">
              Company Name<span v-if="companyNameErrorMessage" class="errors">*</span>
            </p>
            <div class="customerXBox">
              <input v-model="companyName" class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-5">
            <button @click="onSubmit" type="button" class="btn btn-light px-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr class="hr" />

  <div class="row p-2">
    <div class="col-lg-12">
      <div class="staffsectiontableresponsive">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  Customer Profile #
                </th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Phone 1</th>
                <th>Phone 2</th>
              </tr>
            </thead>
            <tbody>
              <!-- Add table rows (data) here -->
              <!-- Example: -->
              <tr v-if="foundData?.length > 0" v-for="Items in foundData">
                <td class="text-center">
                  <a :href="`/customeridprofile/${Items.customerId}`" target="_self">
                    <img :src="openicon" alt="openicon" :style="{ width: '15px' }" role="button" />
                  </a>
                </td>
                <td class="text-uppercase">{{ Items.customerId }}</td>
                <td class="text-capitalize">{{ Items.lastName }}</td>
                <td class="text-capitalize">{{ Items.firstName }}</td>
                <td>{{ formatPhoneNumber(Items.phone) }}</td>
                <td>{{ formatPhoneNumber(Items.phone2) }}</td>
              </tr>
              <tr v-else v-for="n in 4">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <!-- Add more rows as needed -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.errors {
  color: red;
}
</style>
