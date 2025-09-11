<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import cmxLogo01 from "../assets/cmxLogo01.png";
import OrImg from "../assets/OrImg.png";
import { showSuccessToast, showErrorToast } from "../toster";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";

const passwordShow = ref(false);
const vendarShow = ref(false);

const store = useStore();
const router = useRouter();
const rememberMe = ref(false);
const schema = yup.object().shape({
  shopId: yup.string().required("Shop ID is required"),
  Username: yup.string().min(6).required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const { handleSubmit, errors: formErrors } = useForm({
  validationSchema: schema,
});

const { value: shopId } = useField("shopId", schema.fields.shopId);
const { value: Username } = useField("Username", schema.fields.Username);
const { value: password } = useField("password", schema.fields.password);
onMounted(() => {
  if (localStorage.getItem("is_remember")) {
    rememberMe.value = true;
    shopId.value = localStorage.getItem("remember_shopId") || "";
    Username.value = localStorage.getItem("remember_username") || "";
    password.value = localStorage.getItem("remember_password") || "";
  }
 
});
const onSubmit = handleSubmit(async (value) => {
  try {
    /* if (!rememberMe.value) {
      const alertEl = document.createElement("div");
      alertEl.className = "alert alert-warning alert-dismissible fade show";
      alertEl.setAttribute("role", "alert");
      alertEl.textContent = "Please check the 'Remember me' box to continue.";
      document.body.insertBefore(alertEl, document.body.firstChild);
      setTimeout(() => {
        document.body.removeChild(alertEl);
      }, 3000);
      return;
    } */
    if (rememberMe.value) {
      localStorage.setItem("is_remember", rememberMe.value);
      localStorage.setItem("remember_shopId", value.shopId);
      localStorage.setItem("remember_username", value.Username);
      localStorage.setItem("remember_password", value.password);
    } else {
      localStorage.removeItem("is_remember");
      localStorage.removeItem("remember_shopId");
      localStorage.removeItem("remember_username");
      localStorage.removeItem("remember_password");
    }

    const loginUrl = `/user/login`;
    const receivedData = await axios.post(loginUrl, value);
    if (receivedData.data.success) {
      store.dispatch("setShopId", receivedData.data.data.shopId._id);
      // store.dispatch("setUserId", receivedData.data.data.id);
      localStorage.setItem("AuthToken", receivedData.data.token);
      localStorage.setItem("shopId", receivedData.data.data.shopId._id);
      localStorage.setItem(
        "shopData",
        JSON.stringify(receivedData.data.data.shopId)
      );
      localStorage.setItem("shopIdStr", shopId.value);
      localStorage.setItem("userId", receivedData.data.data._id);
      localStorage.setItem("userData", JSON.stringify(receivedData.data.data));

      /* if (rememberMe.value) {
        localStorage.setItem(
          "userData",
          JSON.stringify(receivedData.data.data)
        );
      } */
      showSuccessToast(receivedData.data.msg);
      router.push({ path: "/" });
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
      showErrorToast("Some Error Occurred!!!!!");
      console.log(
        "An error occurred while fetching data. Response was not available.",
        error
      );
    }
  }
});
</script>

<template>
  <div style="background-color: #fcfcfc;">
    <div class="d-flex align-items-center justify-content-center">
      <div class="loginBox">
        <div class="loginLogo">
          <img :src="cmxLogo01" alt="cmxLogo01" class="img-fluid" />
        </div>
        <div class="loginBody">
          <h5 class="fw-bold">Shop Login</h5>
          <form class="mt-5" @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <span class="errors" v-if="Object.keys(formErrors).length !== 0"
                >Incorrect Information Entered</span
              >
            </div>
            <label for="ShopID" class="form-label">Shop / Vendar:</label>
            <div class="input-group mb-3">
              <input
                :type="vendarShow ? 'text' : 'password'"
                v-model="shopId"
                class="form-control"
                id="ShopID"
                placeholder="Shop ID"
                name="ShopID"
              />
              <span
                @click="() => (vendarShow = !vendarShow)"
                class="input-group-text"
                id="basic-addon1"
              >
                <i v-if="vendarShow" class="fa-regular fa-eye"></i>
                <i v-else class="fa-regular fa-eye-slash"></i>
              </span>
            </div>
            <div class="mb-4 mt-3">
              <label for="Username" class="form-label">Username</label>
              <input
                type="text"
                v-model="Username"
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
                :style="{ backgroundColor: '#e8f0fe' }"
                id="basic-addon1"
              >
                <i v-if="passwordShow" class="fa-regular fa-eye"></i>
                <i v-else class="fa-regular fa-eye-slash"></i>
              </span>
            </div>
            <div
              class="form-check mb-4 d-flex justify-content-between align-items-center"
            >
              <label class="form-check-label">
                <input
                  class="form-check-input mt-0"
                  type="checkbox"
                  name="remember"
                  v-model="rememberMe"
                />
                Remember me
              </label>
              <button type="submit" class="btn btn-primary px-4 py-2">
                Login
              </button>
            </div>
            <h6>
              Don’t have an Account? &nbsp;&nbsp;
              <a href="#" class="text-decoration-underline">Learn More</a>
            </h6>
            <div class="my-4">
              <img :src="OrImg" alt="OrImg" />
            </div>
            <p class="text-center">
              <RouterLink class="text-black" to="/loginassistance"
                >Need Help Signing in?</RouterLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

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
