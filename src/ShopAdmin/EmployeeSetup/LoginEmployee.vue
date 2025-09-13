<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { onMounted, watch } from "vue";

const props = defineProps(["data"]);
const schema = yup.object().shape({
  userName: yup.string().min(8).required("userName is required"),
  password: yup.string().min(6).required("password is required"),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    userName: props.data.userName,
    password: props.data.showPassword,
  },
});

const { value: userName, errorMessage: userNameErrorMessage } = useField(
  "userName"
);
const { value: password, errorMessage: passwordErrorMessage } = useField(
  "password"
);

const handleloginInfo = handleSubmit((value) => {
  return value;
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

defineExpose({
  handleloginInfo,
});
</script>
<template>
  <div class="estimatedetailsection loginEm">
    <div class="EmpFrame">
      <p class="mb-5"><b> Login</b></p>

      <div class="mt-5">
        <label for="text" class="form-label"
          >User name<span v-if="userNameErrorMessage" class="errors"
            >*</span
          ></label
        >
        <input v-model="userName" type="text" class="form-control" />
      </div>
      <div class="mt-4">
        <label for="text" class="form-label"
          >Password<span v-if="passwordErrorMessage" class="errors"
            >*</span
          ></label
        >
        <input v-model="password" type="text" class="form-control" />
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-employee">Send SMS</button>
        <button class="btn btn-employee">Send Email</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.loginEm {
  min-width: 260px;
}
label {
  font-weight: 500;
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
