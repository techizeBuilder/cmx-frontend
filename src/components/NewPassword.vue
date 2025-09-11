<script setup>
import axios from "axios";
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import cmxLogo01 from "../assets/cmxLogo01.png";
import { showSuccessToast, showErrorToast } from "../toster";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const schema = yup.object().shape({
  password: yup.string().min(6).required("Password is required"),
  nextPassword: yup
    .string()
    .required("Enter Your Password again")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: password, errorMessage: passwordErrorMessage } = useField(
  "password",
  schema.fields.password
);
const {
  value: nextPassword,
  errorMessage: nextPasswordErrorMessage,
} = useField("nextPassword", schema.fields.nextPassword);

const onSubmit = handleSubmit(async (value) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loginUrl = `${apiUrl}/user/password/otp/change`;
    const receivedData = await axios.post(loginUrl, {
      newPassword: value.password,
      userId: "65d5dc0c210edd61a6d42e8e",
      token: route.params.Token,
    });
    if (receivedData.data.success) {
      localStorage.clear();
      showSuccessToast(receivedData.data.msg);
      router.push({ path: "/login" });
    }
  } catch (error) {
    if (error.response && error.response.data.msg instanceof Array) {
      error.response.data.msg.forEach((errorMsg) => {
        console.log(errorMsg);
        showErrorToast(errorMsg);
      });
      console.log("An error occurred while fetching data", error);
    } else if (error.response) {
      console.log(error.response.data.msg);
      showErrorToast(error.response.data.msg);
      console.log("An error occurred while fetching data", error);
    } else {
      showErrorToast("Some Error Occured!!!!!");
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
});
</script>

<template>
  <div style="background-color: #fcfcfc;" class="full-page">
    <div class="d-flex align-items-center justify-content-center">
      <div class="loginBox">
        <div class="loginLogo">
          <img :src="cmxLogo01" alt="cmxLogo01" class="img-fluid" />
        </div>
        <div class="loginBody">
          <h5 class="fw-bold">New Password</h5>
          <form class="mt-5" @submit.prevent="onSubmit">
            <div class="mb-4 mt-3">
              <label for="password" class="form-label">Enter Password</label>
              <input
                type="text"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Enter Password"
                name="password"
              />
              <span class="errors">{{ passwordErrorMessage }}</span>
            </div>
            <div class="mb-4 mt-3">
              <label for="nextPassword" class="form-label"
                >Re-Enter Password</label
              >
              <input
                type="text"
                v-model="nextPassword"
                class="form-control"
                id="nextPassword"
                placeholder="Re-Enter Password"
                name="nextPassword"
              />
              <span class="errors">{{ nextPasswordErrorMessage }}</span>
            </div>
            <button type="submit" class="btn btn-primary px-4 py-2">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.full-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcfcfc;
}
.errors {
  color: red;
}
.loginBox {
  width: 450px;
  margin-top: 2rem;
  background-color: #fff;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.loginLogo {
  background-color: #000;
  padding: 3px 5px;
  border-radius: 5px 5px 0px 0px;
}

.loginLogo img {
  width: 135px;
}

.loginBody {
  padding: 1.5rem 2.8rem;
}

.loginBody .form-label {
  font-size: 16px;
  margin-bottom: 3px;
}
</style>
