<script setup>
import { watch, ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast, showSuccessToast } from "../../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();
const props = defineProps(["customerData"]);
const permissions = ref({});
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  firstName: yup.string().required("first Name is required"),
  lastName: yup.string().required("last Name is required"),
  employeeTile: yup.string().required("title is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.customerData,
});
watch(props, (newValue) => {
  setValues(newValue.customerData);
  permissions.value = {
    Office: props.customerData.permissions
      ? props.customerData.permissions.includes("Office")
        ? true
        : false
      : false,
    Estimator: props.customerData.permissions
      ? props.customerData.permissions.includes("Estimator")
        ? true
        : false
      : false,
    Parts: props.customerData.permissions
      ? props.customerData.permissions.includes("Parts")
        ? true
        : false
      : false,
    Technician: props.customerData.permissions
      ? props.customerData.permissions.includes("Technician")
        ? true
        : false
      : false,
    Accounting: props.customerData.permissions
      ? props.customerData.permissions.includes("Accounting")
        ? true
        : false
      : false,
    Manager: props.customerData.permissions
      ? props.customerData.permissions.includes("Manager")
        ? true
        : false
      : false,
  };
});
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
  "firstName"
);
const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
  "lastName"
);
const {
  value: employeeTile,
  errorMessage: employeeTileErrorMessage,
} = useField("employeeTile");
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
const handleSave = handleSubmit(async (value) => {
  const truePermissions = Object.keys(permissions.value).filter(
    (key) => permissions.value[key]
  );
  value.permissions = truePermissions;
  value.userId = value._id;
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.post(
      `${apiUrl}/user/update/data`,
      value,
      config
    );
    showSuccessToast(gotData.data.msg);
  } catch (error) {
    handleError(error);
  }
});

const handleSendEmail = async (userId, email) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/user/password/otp/${email}/${userId}`,
      config
    );
    showSuccessToast(gotData.data.msg);
  } catch (error) {
    handleError(error);
  }
};
</script>
<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <div
        class="row p-4"
        :style="{
          backgroundColor: 'rgba(210, 212, 215, 0.15)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '5px',
        }"
      >
        <div class="col-sm-12 col-md-6">
          <div class="row">
            <div class="col-sm-12">
              <label for="Salary" class="form-label">Title</label>
              <select
                class="form-select"
                id="Salary"
                name="Salary"
                :value="employeeTile"
              >
                <option value="" selected="">
                  Select Title
                </option>
                <!-- Add options for countries here -->
                <option value="CEO">CEO (Chief Executive Officer) </option>
                <option value="Owner"> Owner </option>
                <option value="NVP">
                  NVP (National Vice President)
                </option>
                <option value="RVP">RVP (Regional Vice President) </option>
                <option value="COO">COO (Chief Operating Officer) </option>
                <option value="Director"> Director </option>
                <option value="Controller">
                  Controller
                </option>
                <option value="Administrative">
                  Administrative
                </option>
                <option value="Accountant">
                  Accountant
                </option>
                <option value="Office"> Office </option>
                <option value="Shop Foreman">
                  Shop Foreman
                </option>
                <option value="Shop Manager">
                  Shop Manager
                </option>
                <option value="Estimator">
                  Estimator
                </option>
                <option value="Parts"> Parts </option>
                <option value="Body Technician">
                  Body Technician
                </option>
                <option value="Frame Technician">
                  Frame Technician
                </option>
                <option value="Painter"> Painter </option>
                <option value="Detailer Technician">
                  Detailer Technician
                </option>
                <option value="Paint Prepper">
                  Paint Prepper
                </option>
                <option value="Maintenance Technician">
                  Maintenance Technician
                </option>
                <option value="Parts Delivery Driver">
                  Parts Delivery Driver
                </option>
                <option value="Shop Helper">
                  Shop Helper
                </option>
              </select>
              <span class="errors">{{ employeeTileErrorMessage }}</span>
            </div>
            <div class="col-sm-12 mt-3">
              <label for="text" class="form-label">First Name</label>
              <input type="text" class="form-control" :value="firstName" />
              <span class="errors">{{ firstNameErrorMessage }}</span>
            </div>
            <div class="col-sm-12 mt-3">
              <label for="text" class="form-label">Last Name</label>
              <input type="text" class="form-control" :value="lastName" />
              <span class="errors">{{ lastNameErrorMessage }}</span>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 WorkEs">
          <div class="row">
            <div class="col-sm-12">
              <label for="text" class="form-label">Work Email</label>
              <input type="text" class="form-control" :value="email" />
              <span class="errors">{{ emailErrorMessage }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 mt-3">
              <label for="text" class="form-label">Cell# 1</label>
              <input type="text" class="form-control" :value="phone" />
              <span class="errors">{{ phoneErrorMessage }}</span>
            </div>
          </div>
          <div class="col-sm-12 mt-3">
            <label for="Salary" class="form-label">Status</label>
            <select class="form-select" id="Salary" name="Salary">
              <option value="" selected="">
                Status
              </option>
            </select>
          </div>
        </div>
      </div>
      <div
        class="row p-4 mt-3"
        :style="{
          backgroundColor: 'rgba(210, 212, 215, 0.15)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '5px',
        }"
      >
        <div class="col-sm-12 col-md-6 m-0">
          <label for="text" class="form-label">User ID</label>
          <input
            type="text"
            class="form-control"
            :value="props.customerData._id"
          />
        </div>

        <div class="col-sm-12 col-md-6 WorkEs m-0">
          <label for="text" class="form-label">Password</label>
          <input
            type="text"
            class="form-control"
            :value="props.customerData.password"
          />
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-light mt-2"
              :style="{ backgroundColor: '#0066FF66' }"
              @click="
                handleSendEmail(
                  props.customerData._id,
                  props.customerData.email
                )
              "
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-4 px-4">
      <div
        class="estimatedetailsection premEmpo"
        :style="{
          backgroundColor: 'rgba(210, 212, 215, 0.15)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '5px',
        }"
      >
        <div class="EmpFrame">
          <p class="datexlable"><b> Permissions</b></p>

          <div class="mt-0">
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="Office"
                name="sa"
                style="width: 25px; height: 25px;"
                v-model="permissions.Office"
              />
              <label class="form-check-label ms-2 mt-1" for="Office"
                >Office</label
              >
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="Estimator"
                name="s"
                style="width: 25px; height: 25px;"
                v-model="permissions.Estimator"
              />
              <label class="form-check-label ms-2 mt-1" for="Estimator"
                >Estimator</label
              >
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="Parts"
                name="se"
                style="width: 25px; height: 25px;"
                v-model="permissions.Parts"
              />
              <label class="form-check-label ms-2 mt-1" for="Parts"
                >Parts</label
              >
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="Technician"
                name="ss"
                style="width: 25px; height: 25px;"
                v-model="permissions.Technician"
              />
              <label class="form-check-label ms-2 mt-1" for="Technician"
                >Technician</label
              >
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="Accounting"
                name="ss"
                style="width: 25px; height: 25px;"
                v-model="permissions.Accounting"
              />
              <label class="form-check-label ms-2 mt-1" for="Accounting"
                >Accounting</label
              >
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="Manager"
                name="ss"
                style="width: 25px; height: 25px;"
                v-model="permissions.Manager"
              />
              <label class="form-check-label ms-2 mt-1" for="Manager"
                >Manager</label
              >
            </div>
          </div>
          <hr class="my-5" />
          <div class="form-check mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              id="ShopsAdmin"
              name="ss"
              style="width: 25px; height: 25px;"
              :checked="props.customerData?.permissions?.length === 6"
            />
            <label class="form-check-label ms-2 mt-1" for="ShopsAdmin"
              >Shop Admin</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 mt-5">
      <div class="btn-btn d-flex justify-content-center gap-5">
        <button class="Cancel" type="button">Cancel</button>
        <button class="submit" type="submit" @click="handleSave">Save</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
label {
  font-weight: 500;
  font-size: 13px;
}
.premEmpo {
  min-width: 250px;
}
label {
  font-weight: 500;
}

.EmpFrame {
  padding: 20px 20px;
  min-height: 460px;
}
</style>
