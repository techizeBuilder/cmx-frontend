<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { showSuccessToast, showErrorToast } from "../../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();
const signatureData = ref([]);

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

onMounted(async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const shopId = localStorage.getItem("shopId");
    const response = await axios.get(
      `${apiUrl}/customerSignature/getSignature/${shopId}`,
      config
    );
    signatureData.value = response.data.data[0]?.signature || ["", "", ""];
  } catch (error) {
    handleError(error);
  }
});

const handleUpdate = async () => {
  try {
    const shopId = localStorage.getItem("shopId");
    const updateData = await axios.post(`${apiUrl}/customerSignature/update`, {
      signature: signatureData.value,
      shopId: shopId,
    });
    showSuccessToast(updateData.data.msg);
  } catch (error) {
    handleError(error);
  }
};
</script>

<template>
  <div class="pb-2 mt-3">
    <div class="d-flex align-items-center gap-3 justify-content-end">
      <div class="d-flex justify-content-end gap-3">
        <button type="button" class="btn btn-light px-4" disabled>
          Cancel
        </button>
        <button type="button" class="btn btn-light px-4" disabled>Edit</button>
        <button
          type="button"
          class="btn btn-light px-4"
          disabled
          @click="handleUpdate"
        >
          Save
        </button>
      </div>
    </div>
  </div>
  <div>
    <div class="row">
      <div class="col-sm-11">
        <div class="px-5 mt-4">
          <h6 class="ms-sm-5 ms-0 ps-1">Authorization For Repairs I</h6>
          <div class="d-flex align-items-start gap-3 justify-content-end">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="time"
                name="times"
                value="yes"
              />
            </div>
            <textarea
              class="form-control"
              rows="8"
              name="text"
              v-model="signatureData[0]"
            >
            </textarea>
          </div>
        </div>
        <div class="px-5 mt-4">
          <h6 class="ms-sm-5 ms-0 ps-1">Authorization For Repairs II</h6>
          <div class="d-flex align-items-start gap-3 justify-content-end">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="time"
                name="times"
                value="yes"
              />
            </div>
            <textarea
              class="form-control"
              rows="8"
              name="text"
              v-model="signatureData[1]"
            >
            </textarea>
          </div>
        </div>
        <div class="px-5 mt-4">
          <h6 class="ms-sm-5 ms-0 ps-1">Authorization For Repairs III</h6>
          <div class="d-flex align-items-start gap-3 justify-content-end">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="time"
                name="times"
                value="yes"
              />
            </div>
            <textarea
              class="form-control"
              rows="8"
              name="text"
              v-model="signatureData[2]"
            >
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
