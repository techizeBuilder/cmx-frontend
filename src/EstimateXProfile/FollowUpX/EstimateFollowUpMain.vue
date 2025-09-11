<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import SearchPopup from "../../CMXDashboard/SearchPopup.vue";
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";
import { computed, watch } from "vue";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const edit = ref(true);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");

const followUp = ref({ followUpStaff: "", followUpDate: "" });
const handleSave = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/update/follow/up/${storeEstimateDetails.value._id}`,
      followUp.value,
      config
    );
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
  edit.value = true;
};

watch(storeEstimateDetails, () => {
  followUp.value = storeEstimateDetails.value;
});
</script>
<template>
  <div class="scrool-delevry">
    <ul class="nav nav-nav nav-tabs mt-2">
      <li class="nav-item">
        <a class="nav-link show active" data-bs-toggle="tab" href="#Follow-Up">
          Follow-Up</a
        >
      </li>
    </ul>
  </div>
  <div class="cmx-tabsection">
    <div class="tab-content">
      <div class="tab-pane show active" id="Follow-Up">
        <div class="row">
          <div class="col-lg-12 col-rowset p-3">
            <div
              class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end"
            >
              <div class="d-flex align-items-end gap-4 justify-content-end">
                <div class="d-flex align-items-end gap-4 justify-content-end">
                  <button
                    @click="edit = false"
                    v-if="edit"
                    type="button"
                    class="btn btn-light"
                  >
                    <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-light"
                    v-else
                    :style="{ 'background-color': '#6BFA65' }"
                    @click="handleSave"
                  >
                    <i class="fa-regular fa-floppy-disk"></i> Save
                  </button>
                </div>
              </div>
            </div>
            <SearchPopup
              :options="[
                '1. Setup Follow-Up Reminders',
                '2. Staff will receive bell Notification',
              ]"
              :optionsSecond="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row px-xl-5 col-lg-4 mb-5">
    <div>
      <div>
        <p class="datexlable">Follow-Up Staff</p>
        <div class="datexBox" style="overflow: hidden;">
          <input class="form-check-input" type="checkbox" />
          <select
            v-model="followUp.followUpStaff"
            :disabled="edit"
            class="form-select"
          >
            <option value="">-</option>
            <option value="Appointment">Appointment</option>
            <option value="Tow">Tow</option>
            <option value="Drop">Drop</option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <p class="datexlable">Follow-Up Date and Time</p>
        <div class="datexBox">
          <input
            @input="
              (e) =>
                e.target.checked
                  ? (followUp.followUpDate = new Date())
                  : (followUp.followUpDate = null)
            "
            class="form-check-input"
            type="checkbox"
          />
          <VueDatePicker
            select-text="Apply"
            position="left"
            time-picker-inline
            :is-24="false"
            v-model="followUp.followUpDate"
            :disabled="edit"
              week-start="0"
          >
            <template #input-icon>
              <img
                style="width: auto; height: 20px;"
                class="input-slot-image px-2"
                src="../Icons/calenderIcons.png"
              />
            </template>
          </VueDatePicker>
        </div>
      </div>
    </div>
  </div>
</template>
