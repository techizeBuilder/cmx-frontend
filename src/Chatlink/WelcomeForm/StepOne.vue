<script setup>
import { ref, watch } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps(["customerData"]);

const schema = yup.object().shape({
  firstName: yup.string().required("repair firstName is required"),
  lastName: yup.string().required("lastName is required"),
  phone: yup.string().required("phone is required"),
  phone2: yup.string().required("phone2 is required"),
  email: yup.string().required("email is required"),
  address: yup.string().required("address is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  zipCode: yup.string().required("zipCode is required"),
  country: yup.string().required("country is required"),
  companyName: yup.string().required("companyName is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.customerData,
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
const { value: companyName, errorMessage: companyNameErrorMessage } = useField(
  "companyName"
);

const customerData = ref({});

watch(props, () => {
  customerData.value = props.customerData;
  setValues(props.customerData);
});

const handleSubmitStep1 = handleSubmit((value) => {
  return value;
});

defineExpose({
  handleSubmitStep1,
});
</script>
<template>
  <div class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
    <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
      <div class="mt-3">
        <p class="datexlable">First name</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="firstName" />
          <span class="errors">{{ firstNameErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Last name</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="lastName" />
          <span class="errors">{{ lastNameErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Phone / Cell 1</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="phone" />
          <span class="errors">{{ phoneErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Phone 2</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="phone2" />
          <span class="errors">{{ phone2ErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Email Address</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="email" />
          <span class="errors">{{ emailErrorMessage }}</span>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec">
      <div class="mt-3">
        <p class="datexlable">Address</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="address" />
          <span class="errors">{{ addressErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">City</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="city" />
          <span class="errors">{{ cityErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">State</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="state" />
          <span class="errors">{{ stateErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Zip Code</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="zipCode" />
          <span class="errors">{{ zipCodeErrorMessage }}</span>
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Country</p>
        <div class="customerXBox">
          <select v-model="country" class="form-select">
            <option selected disabled>Country</option>
            <option value="France">France</option>
            <option value="France">France</option>
            <option value="France">France</option>
          </select>
          <span class="errors">{{ countryErrorMessage }}</span>
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
          />
        </div>
      </div>
      <div class="mt-3">
        <p class="datexlable">Company Name</p>
        <div class="customerXBox">
          <input class="form-control" type="text" v-model="companyName" />
          <span class="errors">{{ companyNameErrorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
