<script setup>
import cmxLogo01 from "../assets/cmxLogo01.png";
import OrImg from "../assets/OrImg.png";
import axios from "axios";
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { showSuccessToast, showErrorToast } from "../toster";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const schema = yup.object().shape({
  shopId: yup.string().required("Shop ID is required"),
  Username: yup.string().min(6).required("Username is required"),
});

const { handleSubmit, errors: formErrors } = useForm({
  validationSchema: schema,
});
const { value: shopId } = useField("shopId", schema.fields.shopId);
const { value: Username } = useField("Username", schema.fields.Username);
const onSubmit = handleSubmit(async (value) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loginUrl = `${apiUrl}/user/loginassistance`;
    const receivedData = await axios.post(loginUrl, value);
    showSuccessToast(receivedData.data.msg);
    router.push({ path: "/loginassistance-success" });
  } catch (error) {
    if (error.response && error.response.data.msg instanceof Array) {
      error.response.data.msg.forEach((errorMsg) => {
        // console.log(errorMsg);
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
  <div style="background-color: #fcfcfc;">
    <div class="d-flex align-items-center justify-content-center">
      <div class="loginBox">
        <div class="loginLogo">
          <img :src="cmxLogo01" alt="cmxLogo01" class="img-fluid" />
        </div>
        <div class="loginBody">
          <h5 class="fw-bold">Login assistance</h5>
          <form class="mt-5" @submit.prevent="onSubmit">
            <div>
              <span class="errors" v-if="Object.keys(formErrors).length !== 0"
                >Enter the following information:</span
              >
            </div>
            <div class="mb-4 mt-4">
              <label for="ShopID" class="form-label">Shop / Vendor ID</label>
              <input
                type="text"
                v-model="shopId"
                class="form-control"
                id="ShopID"
                placeholder="Shop ID"
                name="ShopID"
              />
            </div>
            <div class="mb-4 mt-3">
              <label for="Username" class="form-label">Your Username</label>
              <input
                type="text"
                v-model="Username"
                class="form-control"
                id="Username"
                placeholder="Username"
                name="Username"
              />
            </div>

            <div
              class="form-check mb-4 d-flex justify-content-center align-items-center"
            >
              <button
                type="submit"
                class="btn px-4 py-2"
                :style="{ backgroundColor: '#F0F511' }"
              >
                Login
              </button>
            </div>
            <p :style="{ fontSize: '13px' }">
              If you do not know your Shop or Vendor ID & Username, please
              contact your Shop / Vendor Admin.
            </p>
            <p class="text-center">
              <RouterLink
                class="text-black"
                to="/login"
                :style="{ fontSize: '13px', fontWeight: '700' }"
                >Back To Login</RouterLink
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
