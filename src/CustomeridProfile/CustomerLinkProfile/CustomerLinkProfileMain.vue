<script setup>
import View from "../Icons/View.png";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../toster";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";

const store = useStore();
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();

const handleFormSubmit = async (
  values,
  endpoint,
  resetFormCallback,
  closeButtonId
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(`${apiUrl}/${endpoint}`, values, config);
    const closeButton = document.getElementById(closeButtonId);
    if (response.data.success) {
      closeButton.click();
      showSuccessToast(response.data.msg);
      resetFormCallback();
    }
  } catch (error) {
    handleError(error);
  }
};

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

const familyMember = ref(null);

watch(storeCustomerDetails, async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const responseData = await axios.get(
      `${apiUrl}/customer/family/member/linked/${storeCustomerDetails.value._id}`,
      config
    );
    familyMember.value = responseData.data.data;
    store.dispatch("setFamilyMenbers", responseData.data.data);
  } catch (error) {
    if (error.response && error.response.data.msg instanceof Array) {
      error.response.data.msg.forEach((errorMsg) => {
        console.log(errorMsg);
        showErrorToast(errorMsg);
      });
      console.log("An error occurred while fetching data", error);
    } else if (error.response && error.response.status === 401) {
      showErrorToast(error.response.data.message);
      localStorage.clear();
      showErrorToast(error.response.message);
      router.push("/login");
    } else if (error.response) {
      showErrorToast(error.response.data.message);
      console.log("An error occurred while fetching data", error);
    } else {
      showErrorToast("Some Error Occured!!!");
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
});
//Add New Customer Profile Link
const customerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
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
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
});

const {
  handleSubmit: handleCustomerSubmit,
  resetForm: resetFormCustomer,
} = useForm({
  validationSchema: customerSchema,
});

const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
  "firstName"
);
const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
  "lastName"
);
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: phone2, errorMessage: phone2ErrorMessage } = useField("phone2");
const { value: email, errorMessage: emailErrorMessage } = useField("email");

const handleLinkCustomer = handleCustomerSubmit(async (value) => {
  value.customerId = localStorage.getItem("cId");
  value.shopId = localStorage.getItem("shopId");
  value.id = storeCustomerDetails.value._id;
  await handleFormSubmit(
    value,
    "customer/link/customer/member",
    resetFormCustomer,
    "closeButton"
  );
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#CustomerLink"
            >Customer Link</a
          >
        </li>
      </ul>
    </div>

    <div class="cmx-tabsection">
      <div class="estimatedetailsection">
        <div class="row">
          <div class="col-lg-12 col-rowset">
            <div
              class="d-flex align-items-end gap-sm-3 gap-2 justify-content-end flex-wrap"
            >
              <button type="button" class="btn btn-light text-nowrap">
                <i class="fa-solid fa-link-slash"></i>
                &nbsp; Un-Link
              </button>
              <button
                type="button"
                class="btn btn-light text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#CustomerProfileLinkModule"
              >
                <i class="fa-solid fa-link"></i>
                &nbsp;Customer Link
              </button>

              <button type="button" class="btn btn-light text-nowrap px-3">
                <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
              </button>

              <button type="button" class="btn btn-light text-nowrap px-3">
                <i class="fa-regular fa-floppy-disk"></i>&nbsp; Save
              </button>

              <router-link
                to="/newcustomer"
                type="button"
                class="btn btn-light text-nowrap"
                ><i class="fa-regular fa-square-plus"></i>&nbsp; Add New
                Customer</router-link
              >
            </div>
          </div>
        </div>

        <div class="table-responsive mystripetable mt-3">
          <table class="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th class="text-nowrap">Customer Link</th>
                <th class="text-nowrap">Customer ID</th>
                <th class="text-nowrap">Last Name</th>
                <th class="text-nowrap">First Name</th>
                <th class="text-nowrap">Phone / Cell 1</th>
                <th class="text-nowrap">Phone 2</th>
                <th class="text-nowrap">Owner?</th>
                <th class="text-nowrap">Driver?</th>
                <th class="text-nowrap">Relationship</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(item, index) in familyMember"
                v-if="familyMember && familyMember.length !== 0"
                :key="index"
              >
                <td class="text-center"><input type="checkbox" /></td>
                <td class="text-center">
                  {{ index + 1 }}
                </td>
                <td>{{ item._id }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ item.firstName }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.phone2 }}</td>
                <td>{{ item.owner }}</td>
                <td>{{ item.driver }}</td>
                <td>{{ item.relationship }}</td>
              </tr>
              <tr v-else>
                <td
                  colspan="11"
                  class="text-center text-danger font-weight-bold py-3"
                >
                  No Customer Profile Found!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade login-popup-dashtwo" id="CustomerProfileLinkModule">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <h5 class="m-0" :style="{ color: '#636363' }">
                      Add New Customer Profile Link
                    </h5>
                    <button
                      id="closeButton"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="space-btm-space">
                <h6 class="mb-3">Customer Details</h6>
                <div class="row">
                  <div class="col-lg-6 px-4">
                    <div class="mt-3">
                      <p class="datexlable">
                        First name<span
                          v-if="firstNameErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="firstName"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">
                        Last name<span
                          v-if="lastNameErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="lastName"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">
                        Phone / Cell 1<span
                          v-if="phoneErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="phone"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">
                        Phone 2<span v-if="phone2ErrorMessage" class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="phone2"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 px-4">
                    <div class="mt-3">
                      <p class="datexlable">
                        Email Address<span
                          v-if="emailErrorMessage"
                          class="errors"
                          >*</span
                        >
                      </p>
                      <div class="customerXBox">
                        <input
                          v-model="email"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Owner
                          </p>
                          <div class="customerXBox">
                            <select class="form-select">
                              <option selected disabled>Owner</option>
                              <option>-</option>
                              <option>-</option>
                              <option>-</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="mt-4">
                          <p class="datexlable">
                            Driver
                          </p>
                          <div class="customerXBox">
                            <select class="form-select">
                              <option selected disabled>Driver</option>
                              <option>-</option>
                              <option>-</option>
                              <option>-</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="datexlable">Relationship?</p>
                      <div class="customerXBox">
                        <select class="form-select">
                          <option selected disabled>Relationship?</option>
                          <option>-</option>
                          <option>-</option>
                          <option>-</option>
                        </select>
                      </div>
                    </div>
                    <div class="mt-4">
                      <div class="form-check d-flex align-items-center gap-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="SameAdd"
                          name="option1"
                          value="something"
                          style="width: 25px; height: 25px;"
                        />
                        <label class="form-check-label" for="SameAdd"
                          >Same Address as Primary</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="col-12 mt-5">
                    <div class="btn-btn d-flex justify-content-end gap-4">
                      <button class="btn btn-light text-nowrap" type="button">
                        Cancel
                      </button>
                      <button
                        @click="handleLinkCustomer"
                        class="btn btn-light text-nowrap"
                        type="submit"
                      >
                        <i class="fa-regular fa-floppy-disk"></i> Save
                      </button>
                    </div>
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
th {
  vertical-align: middle;
  background-color: #ccdff1;
}

td {
  vertical-align: middle;
  text-align: center;
}


div#myModal {
  z-index: 9999;
}
</style>
