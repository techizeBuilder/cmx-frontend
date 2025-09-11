<script setup>
import Sub from "./Icons/Sub.png";
import captcha from "./Icons/captcha.png";
import Vue3Signature from "vue3-signature";
import { onMounted, ref, watch,onBeforeUnmount } from "vue";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toster";
import { useRoute } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("comment firstName is required"),
  lastName: yup.string().required("lastName is required"),
  phone: yup.string().required("phone is required"),
  text1: yup.string().required("text1 is required"),
  text2: yup.string().required("text2 is required"),
  text3: yup.string().required("text3 is required"),
});
const { handleSubmit, setValues, resetForm, values } = useForm({
  validationSchema: schema,
});
const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
  "firstName"
);
const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
  "lastName"
);
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: text1, errorMessage: text1ErrorMessage } = useField("text1");
const { value: text2, errorMessage: text2ErrorMessage } = useField("text2");
const { value: text3, errorMessage: text3ErrorMessage } = useField("text3");

const props = defineProps(["signatures"]);
const route = useRoute();
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const signatureData = ref(null);
const urlImg = ref(null);
const imageFiles = ref(null);

const clearSignature = () => {
  signatureData.value.clear();
};

const handleUrl = async () => {
  try {
    const response = await fetch(urlImg.value);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      if (base64String) {
        signatureData.value.fromDataURL(base64String);
      } else {
        console.error("Failed to convert image to Base64.");
      }
    };
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Error fetching or converting image to Base64:", error);
  }
};

const saveSignature = (t) => {
  const base64String = signatureData.value.save(t);
  const base64Data = base64String.split(",")[1]; // Extract the Base64 data portion after the comma
  const binaryString = atob(base64Data);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([byteArray], { type: "image/png" });
  const file = new File([blob], "eSignature.png", { type: "image/png" });
  urlImg.value = signatureData.value.save(t);
  imageFiles.value = file;
  console.log(imageFiles.value);
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

const handleSubmitForm = handleSubmit(async (value) => {
  try {
    const formData = new FormData();
    formData.append("eSignature", imageFiles.value);
    formData.append("estimateToken", route.params.token);
    for (const key in value) {
      formData.append(key, value[key]);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/esignature`,
      formData,
      config
    );
    console.log(response);
    showSuccessToast(response.data.msg);
  } catch (error) {
    handleError(error);
  }
});

onMounted(() => {
  const modalElement = document.getElementById("customerSetting");
  const modal = new bootstrap.Modal(modalElement);
  modalElement.addEventListener("hidden.bs.modal", clearSignature);
});

onBeforeUnmount(() => {
  const modalElement = document.getElementById("customerSetting");
  const modal = new bootstrap.Modal(modalElement);
  modalElement.removeEventListener("hidden.bs.modal", clearSignature);
})

watch(props, async () => {
  text1.value = props?.signatures?.textArea[0]?.text1;
  text2.value = props?.signatures?.textArea[0]?.text2;
  text3.value = props?.signatures?.textArea[0]?.text3;
  urlImg.value = `${apiUrl}${props.signatures.eSignatures}`;
  setValues(props.signatures);
});
</script>
<template>
  <h5 class="text-center pt-5 pb-4 fw-bold">Authorization For Repairs</h5>
  <div class="row">
    <div class="col-sm-12 col-md-7 mx-auto">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="mt-4">
            <div class="customerXBox">
              <textarea
                class="form-control"
                rows="8"
                name="text"
                v-model="text1"
              ></textarea>
              <span class="errors">{{ text1ErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="customerXBox">
              <textarea
                class="form-control"
                rows="8"
                name="text"
                v-model="text2"
              ></textarea>
              <span class="errors">{{ text2ErrorMessage }}</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="customerXBox">
              <textarea
                class="form-control"
                rows="8"
                name="text"
                v-model="text3"
              ></textarea>
              <span class="errors">{{ text3ErrorMessage }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="form-check mb-2 mt-4 d-flex justify-content-between align-items-center"
      >
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="checkbox"
            name="remember"
            required
          />
          I have read in full and except all the terms and conditions.
        </label>
      </div>
      <p class="ps-4">Auto Date | Time</p>

      <div class="row">
        <div class="col-sm-12 col-md-7 ms-auto">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div class="mt-3">
                <p class="datexlable">First name</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" v-model="firstName" />
                  <span class="errors">{{ firstNameErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="mt-3">
                <p class="datexlable">Last name</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" v-model="lastName" />
                  <span class="errors">{{ lastNameErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-3">
                <p class="datexlable">Phone Number</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" v-model="phone" />
                  <span class="errors">{{ phoneErrorMessage }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="mt-3">
                <div class="customerXBox">
                  <img
                    class="form-control"
                    rows="8"
                    name="text"
                    :src="urlImg"
                    v-if="urlImg"
                    @click="handleUrl()"
                    data-bs-toggle="modal"
                    data-bs-target="#customerSetting"
                  />
                  <textarea
                    v-else
                    data-bs-toggle="modal"
                    data-bs-target="#customerSetting"
                    class="form-control"
                    rows="8"
                    name="text"
                  ></textarea>
                </div>
                <p class="datexlable">Apply Signature</p>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <img
                :src="captcha"
                alt="captcha"
                :style="{ width: '330px', margin: '2rem 0' }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-5">
        <button class="btn btnCls">Cancel</button>
        <button class="btn btnSubmit" @click="handleSubmitForm">
          <img :src="Sub" alt="Sub" />
          Submit E-Signature
        </button>
      </div>
    </div>
  </div>
  <div
    class="modal fade login-popup-dashtwo"
    id="customerSetting"
    tabindex="-1"
    aria-labelledby="customerSettingLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body mymodules">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Signature</p>
                    <button
                      id="closeCommentModel"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      @click="clearSignature"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Vue3Signature
                ref="signatureData"
                :w="'1280px'"
                :h="'400px'"
                class="example"
              ></Vue3Signature>
              <button @click="clearSignature">Clear Signature</button>
              <button
                @click="saveSignature('image/jpeg')"
                data-bs-dismiss="modal"
              >
                Save Signature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btnCls {
  background: #fff;
  box-shadow: 0px 3.331px 3.331px 0px rgba(0, 0, 0, 0.15);
}

.btnSubmit {
  border-radius: 4.163px;
  background: rgba(0, 136, 54, 0.61);
  box-shadow: 0px 3.331px 3.331px 0px rgba(0, 0, 0, 0.15);
}
</style>
