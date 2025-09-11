<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import Uplaod from "../Icons/Uplaod.png";
import { ref } from "vue";
const appoinmentData = ref({
  appointmentType: "Estimate Appointment",
  durationOfAppointment: 15,
});

const emit = defineEmits(["search"]);

const handleAppoinment = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/estimateAppoinment/register/${shopId}`,
      appoinmentData.value,
      config
    );
    showSuccessToast(response.data.msg);
    appoinmentData.value = {};
    await fetchAppoinment();
  } catch (error) {
    console.log(error);
  }
};

defineExpose({ appoinmentData });
</script>
<template>
  <div class="px-3 mt-4 vdatepicktimedit">
    <div class="d-flex align-items-end justify-content-end mb-4 gap-4">
      <router-link to="/officex" class="btn btn-light text-nowrap">
        Welcome Form</router-link
      >
      <router-link
        to="/officex"
        class="btn btn-light text-nowrap"
        :style="{ backgroundColor: '#FF8080' }"
      >
        Delete Appointment</router-link
      >
      <router-link to="/officex" class="btn btn-light text-nowrap">
        Back</router-link
      >

      <button
        @click="handleAppoinment"
        type="button"
        class="btn btn-light text-nowrap"
      >
        Save
      </button>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-4 paddWFR">
        <div class="esAppo">
          <div class="mt-1">
            <p class="datexlable">First name</p>
            <div class="customerXBox">
              <input
                v-model="appoinmentData.firstName"
                @input="emit('search', appoinmentData.firstName)"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Last name</p>
            <div class="customerXBox">
              <input
                v-model="appoinmentData.lastName"
                @input="emit('search', appoinmentData.lastName)"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Cell # / Phone 1</p>
            <div class="customerXBox">
              <input
                v-model="appoinmentData.phone"
                @input="emit('search', appoinmentData.phone)"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Email</p>
            <div class="customerXBox">
              <input
                v-model="appoinmentData.email"
                @input="emit('search', appoinmentData.email)"
                class="form-control"
                type="email"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Insurance?</p>
            <div class="customerXBox">
              <input
                v-model="appoinmentData.insurance"
                @input="emit('search', appoinmentData.insurance)"
                class="form-control"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 paddWFR borderRL">
        <div class="esAppo">
          <div class="mt-1">
            <p class="datexlable">Appointment Type</p>
            <div class="customerXBox">
              <input
                v-model="appoinmentData.appointmentType"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Estimate Appointment Date | Time</p>
            <div class="customerXBox">
              <VueDatePicker
                v-model="appoinmentData.estimateAppointmentDate"
                select-text="Apply"
                position="left"
                time-picker-inline
                :is-24="false"
                week-start="0"
              >
              </VueDatePicker>
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Duration of Appointment</p>
            <div class="customerXBox">
              <select
                v-model="appoinmentData.durationOfAppointment"
                class="form-select"
              >
                <option value="15">15 Minute</option>
                <option value="30">30 Minute</option>
                <option value="45">45 Minute</option>
                <option value="60">60 Minute</option>
              </select>
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Estimator</p>
            <div class="customerXBox">
              <select v-model="appoinmentData.estimator" class="form-select">
                <option selected>Estimator new</option>
              </select>
            </div>
          </div>
          <div class="mt-4">
            <label class="form-check-label">
              Chatlink Opt In? &nbsp;&nbsp;
              <input
                v-model="appoinmentData.chatlinkOpt"
                class="form-check-input"
                type="checkbox"
                name="remember"
              />
            </label>
          </div>
          <div class="mt-4">
            <label class="form-check-label">
              Welcome Form Completed? &nbsp;&nbsp;
              <input
                v-model="appoinmentData.welcomeFormComp"
                class="form-check-input"
                type="checkbox"
                name="remember"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 paddWFR">
        <div class="newSweCard">
          <div>
            <div class="mb-3">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="remember"
                />&nbsp;&nbsp; Customer Profile #
              </label>
            </div>
            <div class="mb-3">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="remember"
                />&nbsp;&nbsp; Estimate Profile #
              </label>
            </div>
            <button
              type="button"
              class="btn btn-light text-nowrap mt-1"
              :style="{ backgroundColor: '#FF8100' }"
            >
              Open New Profile #?
            </button>
          </div>
        </div>

        <div class="esAppo">
          <div class="mt-4">
            <p class="datexlable">Customer Profile #</p>
            <div class="customerXBox d-flex align-items-center gap-2">
              <img :src="Uplaod" alt="Uplaod" />
              <input
                class="form-control"
                type="text"
                placeholder="C000001"
                disabled
                v-model="appoinmentData.customerProfile"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable">Estimate Profile #</p>
            <div class="customerXBox d-flex align-items-center gap-2">
              <img :src="Uplaod" alt="Uplaod" />
              <input
                class="form-control"
                type="text"
                placeholder="E000001"
                disabled
                v-model="appoinmentData.estimateProfile"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.newSweCard {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  border-radius: 5px;
  background-color: #e6f0ff;
}
.form-check-input {
  margin-top: 2px !important;
}
.borderRL {
  border-left: 1px solid #636363;
  border-right: 1px solid #636363;
}
.paddWFR {
  padding: 0 3rem;
}
</style>
