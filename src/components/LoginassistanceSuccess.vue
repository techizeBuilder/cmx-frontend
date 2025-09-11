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
    /* const apiUrl = import.meta.env.VITE_API_URL;
      const loginUrl = `${apiUrl}/user/login`;
      const receivedData = await axios.post(loginUrl, value);    
      showSuccessToast(receivedData.data.msg);
      router.push({ path: "/" }); */
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
          <h5 class="fw-600">Login assistance</h5>
          <p :style="{ fontSize: '14px' }" class="fw-300 mb-5">
            A password has been sent to your email. Please follow the link for
            login assistance. .
          </p>
          <p class="text-center">
            <button
              type="button"
              class="btn px-4 py-2"
              :style="{ backgroundColor: '#F0F511' }"
            >
              <RouterLink
                class="text-black"
                to="/login"
                :style="{ fontSize: '13px', fontWeight: '600' }"
              >
                Back To Login</RouterLink
              >
            </button>
          </p>
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
  height: 85vh;
  text-align: center;
  padding-top: 28vh;
}

.loginBody .form-label {
  font-size: 16px;
  margin-bottom: 3px;
}
</style>
