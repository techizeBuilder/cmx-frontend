<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import { pick } from "lodash";

const edit = ref(true);
const props = defineProps([
  "data",
  "userId",
  "handleUpdateAll",
  "handleAddEmploy",
  'loginInfo',
]);
const userId = props.userId;
const handleUpdateAll = props.handleUpdateAll;
const handleAddEmploy = props.handleAddEmploy;
const loginInfo = props.loginInfo;
const schema = yup.object().shape({
  firstName: yup.string().min(3).required("firstName is required"),
  address: yup.string().required("address is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  zipCode: yup.string().required("zipCode is required"),
  country: yup.string().required("country is required"),
  email: yup.string().email().required("email is required"),
  note1: yup.string().required("note1 is required"),
  note2: yup.string().required("note2 is required"),
  hireDate: yup.string().required("hireDate is required"),
  lastName: yup.string().min(3).required("lastName is required"),
  phone: yup.string().required("phone is required"),
  phone2: yup.string().required("phone2 plate is required"),
  terminationDate: yup.string().required("terminationDate is required"),
  dob: yup.string().required("dob is required"),
  employeeTile: yup.string().required("employeeTile is required"),
  activeStatue: yup.boolean(),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: pick(props.data, Object.keys(schema.fields)),
});

const {
  value: activeStatue,
  errorMessage: activeStatueErrorMessage,
} = useField("activeStatue");
const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
  "firstName"
);
const { value: address, errorMessage: addressErrorMessage } = useField(
  "address"
);
const { value: city, errorMessage: cityErrorMessage } = useField("city");
const { value: state, errorMessage: stateErrorMessage } = useField("state");
const { value: zipCode, errorMessage: zipCodeErrorMessage } = useField(
  "zipCode"
);
const { value: country, errorMessage: countryErrorMessage } = useField(
  "country"
);
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: note1, errorMessage: note1ErrorMessage } = useField("note1");
const { value: note2, errorMessage: note2ErrorMessage } = useField("note2");
const { value: hireDate, errorMessage: hireDateErrorMessage } = useField(
  "hireDate"
);
const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
  "lastName"
);
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: phone2, errorMessage: phone2ErrorMessage } = useField("phone2");
const {
  value: terminationDate,
  errorMessage: terminationDateErrorMessage,
} = useField("terminationDate");
const { value: dob, errorMessage: dobErrorMessage } = useField("dob");
const {
  value: employeeTile,
  errorMessage: employeeTileErrorMessage,
} = useField("employeeTile");

const handleSubmitAdjust = handleSubmit(async (value) => {
  if (!userId) {
    console.log(loginInfo());
    value.shopId = localStorage.getItem("shopId");
    await handleAddEmploy(value);
  } else {
    console.log(loginInfo());
    value.userId = userId;
    await handleUpdateAll(value);
  }
  edit.value = true;
});

onMounted(() => {
  if (props.data) {
    resetForm();
  }
});

watch(props, (newProps) => {
  if (newProps.data) {
    setValues(newProps.data);
  }
});
</script>
<template>
  <div class="estimatedetailsection contactDEmp">
    <div class="p-2 text-end">
      <button
        type="button"
        @click="() => (edit = false)"
        class="btn btn-light text-nowrap"
        v-if="edit"
      >
        <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
      </button>
      <button
        v-else
        :style="{ 'background-color': '#6BFA65' }"
        type="button"
        class="btn btn-light text-nowrap flex-1"
        @click="handleSubmitAdjust"
      >
        <i class="fa-regular fa-floppy-disk"></i> Save
      </button>
    </div>
    <div class="EmpFrame">
      <h5 class="mb-4 fw-bold">Contact Details</h5>
      <div class="row g-5">
        <div class="col-sm-12 col-md-4">
          <div class="d-flex gap-2 flex-row">
            <h5 class="mb-0">Active User</h5>
            <div class="form-check form-switch">
              <input
                v-model="activeStatue"
                class="form-check-input"
                type="checkbox"
                :style="{ width: '40px' }"
                :disabled="edit"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-6">
              <label id="firstName" for="text" class="form-label"
                >First Name<span v-if="firstNameErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="firstName"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6">
              <label for="text" class="form-label"
                >Last Name<span v-if="lastNameErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="lastName"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-sm-12">
              <label for="Salary" class="form-label"
                >Employee Title<span
                  v-if="employeeTileErrorMessage"
                  class="errors"
                  >*</span
                ></label
              >
              <select
                v-model="employeeTile"
                :disabled="edit"
                class="form-select"
                id="Salary"
                name="Salary"
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
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-sm-12">
              <label for="text" class="form-label"
                >Address<span v-if="addressErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="address"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >City<span v-if="cityErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="city"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >State<span v-if="stateErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="state"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Zip Code<span v-if="zipCodeErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="zipCode"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Country<span v-if="countryErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="country"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-4 WorkEs pt-5">
          <div class="row">
            <div class="col-sm-12">
              <label for="text" class="form-label"
                >Work Email<span v-if="emailErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="email"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Cell# 1<span v-if="phoneErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="phone"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Note1<span v-if="note1ErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="note1"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Telephone 2<span v-if="phone2ErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="phone2"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Note2<span v-if="note2ErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="note2"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <h6 class="mt-5 mb-3">Date</h6>
          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Hire Date<span v-if="hireDateErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="hireDate"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Termination Date<span
                  v-if="terminationDateErrorMessage"
                  class="errors"
                  >*</span
                ></label
              >
              <input
                v-model="terminationDate"
                :disabled="edit"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label"
                >Date of Birth<span v-if="dobErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="dob"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-4">
          <h6 class="mb-4">Emergency Contact</h6>
          <div class="row">
            <div class="col-sm-12">
              <label for="text" class="form-label">#1 Full Name</label>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Telephone 1</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Relationship</label>
              <input type="text" class="form-control" />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Telephone 2</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Relationship</label>
              <input type="text" class="form-control" />
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-sm-12 mt-2">
              <label for="text" class="form-label">#2 Full Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Telephone 1</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Relationship</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Telephone 2</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-sm-6 mt-2">
              <label for="text" class="form-label">Relationship</label>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
label {
  font-weight: 500;
  font-size: 13px;
}
.contactDEmp {
  min-width: 1100px;
}
.WorkEs {
  border-left: 4px solid #ededed;
  border-right: 4px solid #ededed;
}
.btn-employee {
  border-radius: 3.381px;
  border: 0.66px solid #d2d4d7;
  background: rgba(0, 102, 255, 0.4);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #000000;
}

.EmpFrame {
  background: rgba(210, 212, 215, 0.2);
  padding: 20px 30px;
  min-height: 470px;
}
</style>
