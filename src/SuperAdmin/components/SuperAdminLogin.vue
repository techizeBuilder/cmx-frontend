<template>
  <div style="background-color: #fcfcfc">
    <div class="d-flex align-items-center justify-content-center" style="height: 100vh">
      <div class="loginBox">
        <div class="loginLogo">
          <img :src="cmxLogo01" alt="cmxLogo01" class="img-fluid" />
        </div>
        <div class="loginBody">
          <h5 class="fw-bold">Super Admin Login</h5>
          <form class="mt-5" @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <span class="errors" v-if="Object.keys(formErrors).length !== 0">
                Incorrect Information Entered
              </span>
            </div>

            <div class="mb-4 mt-3">
              <label for="Username" class="form-label">Username</label>
              <input
                type="text"
                v-model="username"
                class="form-control"
                id="Username"
                placeholder="Username"
                name="Username"
              />
            </div>

            <label for="pwd" class="form-label">Password:</label>
            <div class="input-group mb-3">
              <input
                :type="passwordShow ? 'text' : 'password'"
                v-model="password"
                class="form-control"
                id="pwd"
                placeholder="Password"
                name="pswd"
              />
              <span
                @click="() => (passwordShow = !passwordShow)"
                class="input-group-text"
                style="background-color: #e8f0fe"
                id="basic-addon1"
              >
                <i v-if="passwordShow" class="fa-regular fa-eye"></i>
                <i v-else class="fa-regular fa-eye-slash"></i>
              </span>
            </div>

            <div class="form-check mb-4 d-flex justify-content-end align-items-center">
              <button type="submit" class="btn btn-primary px-4 py-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import cmxLogo01 from "../../assets/cmxLogo01.png";
import { showSuccessToast, showErrorToast } from "../../toster";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const passwordShow = ref(false);

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const { handleSubmit, errors: formErrors } = useForm({
  validationSchema: schema,
});

const { value: username } = useField("username", schema.fields.username);
const { value: password } = useField("password", schema.fields.password);

const onSubmit = handleSubmit(async (value) => {
  try {
    const loginUrl = "http://localhost:8001/superadmin/login";
    const response = await axios.post(loginUrl, value);
    
    if (response.data.token) {
      localStorage.setItem("superAdminToken", response.data.token);
      localStorage.setItem("superAdminData", JSON.stringify(response.data.user));
      showSuccessToast("Login Successful");
      router.push("/cmx-super/dashboard");
    }
  } catch (error) {
    if (error.response && error.response.data.msg) {
      showErrorToast(error.response.data.msg);
    } else {
      showErrorToast("Login failed. Please try again.");
    }
  }
});
</script>

<style scoped>
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
