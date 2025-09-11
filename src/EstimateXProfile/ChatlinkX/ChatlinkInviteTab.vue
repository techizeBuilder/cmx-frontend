<script setup>
import axios from "axios";
import { computed } from "vue";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";
import { watch } from "vue";
import { ref } from "vue";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const permission = ref({ otpPermission: false, smsPermission: false });

function formatPhoneNumber(phone) {
  if (phone) {
    const cleaned = phone.replace(/\D+/g, "");
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
}

const handlePermission = async (type, value) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/permission/${type}/${value}/${storeEstimateDetails.value._id}`,
      config
    );
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

const handleInvite = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/invite/chatlink/${storeEstimateDetails.value._id}`,
      config
    );
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

watch(storeEstimateDetails, () => {
  permission.value = storeEstimateDetails.value;
});
</script>
<template>
  <div class="px-3 mt-4 m-auto">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="card mt-2">
          <div class="card-body">
            <div class="esAppo">
              <div class="mt-4">
                <p class="datexlable">First name</p>
                <div class="customerXBox">
                  <input
                    disabled
                    :value="storeEstimateDetails?.firstName"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Last name</p>
                <div class="customerXBox">
                  <input
                    disabled
                    :value="storeEstimateDetails?.lastName"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Cell # / Phone 1</p>
                <div class="customerXBox">
                  <input
                    disabled
                    :value="formatPhoneNumber(storeEstimateDetails?.phone)"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Email</p>
                <div class="customerXBox">
                  <input
                    disabled
                    :value="storeEstimateDetails?.email"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="esAppo">
              <div class="mt-4">
                <p class="datexlable">
                  Ask Customer: Do you authorize our shop to send SMS? You are
                  able to Opt Out at any time.
                </p>
                <div class="card">
                  <div
                    class="card-body d-flex align-items-center justify-content-between"
                  >
                    <div class="form-check form-switch">
                      <label class="form-check-label" for="OptIN">Opt IN</label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="OptIN"
                        name="darkmode"
                        v-model="permission.otpPermission"
                        @change="
                          handlePermission(
                            'otpPermission',
                            permission.otpPermission
                          )
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Customer SMS Sent?</p>
                <div class="card">
                  <div class="card-body">
                    <div class="form-check form-switch">
                      <label class="form-check-label" for="Sent">Sent</label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Sent"
                        name="darkmode"
                        v-model="permission.smsPermission"
                        @change="
                          handlePermission(
                            'smsPermission',
                            permission.smsPermission
                          )
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-light mt-4 mx-auto"
                  :style="{ background: '#00FF51' }"
                  @click="handleInvite"
                >
                  Invite Chatlink
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
