<script setup>
import { ref, computed, watch } from "vue";
import calenderIcons from "../Icons/calenderIcons.png";
import { useStore } from "vuex";
import VueDatePicker from "@vuepic/vue-datepicker";
import axios from "axios";
import { showSuccessToast } from "../../toster";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const date = ref({
  appointmentDate: null,
  vehicalArrivalDate: null,
  authorizationSigned: null,
  customerRentalCompany: null,
  targetDate: null,
  pickupDate: null,
  customerNotified: null,
  vehicalDelivered: null,
  appTowDrop: "Appointment",
  totalJobHour: null,
  cycleTime: null,
  daysForParts: null,
  appointmentDateCheck: false,
  vehicalArrivalDateCheck: false,
  authorizationSignedCheck: false,
  customerRentalCompanyCheck: false,
  targetDateCheck: false,
  pickupDateCheck: false,
  customerNotifiedCheck: false,
  vehicalDeliveredCheck: false,
  appTowDropCheck: false,
  totalJobHourCheck: false,
  cycleTimeCheck: false,
  daysForPartsCheck: false,
});

const handleClick = (value, name) => {
  if (!value) {
    date.value[name] = !date.value[name] ? new Date() : date.value[name];
  } else {
    date.value[name] = null;
  }
};

const handleUpdate = async () => {
  try {
    date.value.estimateId = storeEstimateDetails.value._id;
    const response = await axios.post(
      `${apiUrl}/folderxDates/register`,
      date.value
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    edit.value = true;
  } catch (error) {
    console.log(error);
  }
};

watch(storeEstimateDetails, async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/folderxDates/get/Dates/${storeEstimateDetails.value?._id}`
    );
    const { data } = response.data;

    date.value = data;
    store.dispatch("setDatesDetails", data);
  } catch (error) {
    console.log(error);
  }
});

const edit = ref(true);
const handleEdit = () => {
  edit.value = !edit.value;
};

const handleEstimateDate = (totalJobHour, cycleTime, daysForParts) => {
  if (isNaN(cycleTime) || Number(cycleTime) === 0) {
    return 0;
  }
  return isNaN(
    parseFloat(totalJobHour) / (Number(cycleTime) + Number(daysForParts))
  )
    ? 0
    : (
        parseFloat(totalJobHour) / Number(cycleTime) +
        Number(daysForParts)
      ).toFixed(2);
};
</script>
<template>
  <div class="estimatedetailsection dateFolderxs vdatepicktimedit">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#DATES"
            >Dates</a
          >
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <div class="d-flex align-items-end gap-4 justify-content-end">
              <button
                type="button"
                class="btn btn-light"
                @click="handleEdit"
                v-if="edit"
              >
                <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
              </button>
              <button
                type="button"
                :disabled="edit"
                class="btn btn-light"
                @click="handleUpdate"
                v-else
                :style="{ 'background-color': '#6BFA65' }"
              >
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row px-xl-5 cutsomerRow">
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol p-4">
        <h6>Dates I</h6>
        <div>
          <div>
            <div>
              <p class="datexlable">Appointment | Tow | Drop</p>
              <div class="datexBox" style="overflow: hidden;">
                <input
                  class="form-check-input"
                  :disabled="edit"
                  v-model="date.appTowDropCheck"
                  type="checkbox"
                />
                <select
                  v-model="date.appTowDrop"
                  @change="date.appTowDropCheck = true"
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
              <p class="datexlable">Appointment Date | Time</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.appointmentDateCheck"
                  :disabled="edit"
                  @click="
                    handleClick(date.appointmentDateCheck, 'appointmentDate')
                  "
                />
                <VueDatePicker
                  v-model="date.appointmentDate"
                  @update:model-value="date.appointmentDateCheck = true"
                  @cleared="date.appointmentDateCheck = false"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                  :disabled="edit"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Vehicle Arrival Date | Time</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.vehicalArrivalDateCheck"
                  @click="
                    handleClick(
                      date.vehicalArrivalDateCheck,
                      'vehicalArrivalDate'
                    )
                  "
                  :disabled="edit"
                />
                <VueDatePicker
                  v-model="date.vehicalArrivalDate"
                  @update:model-value="date.vehicalArrivalDateCheck = true"
                  @cleared="date.vehicalArrivalDateCheck = false"
                  :disabled="edit"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>
            <!-- <div class="mt-4">
              <p class="datexlable">Authorization Signed</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.authorizationSigned"
                  @click="
                    handleClick(
                      date.authorizationSigned,
                      'authorizationSigned'
                    )
                  "
                  :disabled="edit"
                />
                <VueDatePicker
                  v-model="date.authorizationSigned"
                  @update:model-value="date.authorizationSigned = true"
                  @cleared="date.authorizationSigned = false"
                  :disabled="edit"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div> -->
            <!-- <div class="mt-4">
              <p class="datexlable">Customer Rental Company</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.customerRentalCompany"
                  @click="
                    handleClick(
                      date.customerRentalCompany,
                      'customerRentalCompany'
                    )
                  "
                  :disabled="edit"
                />
                <VueDatePicker
                  :disabled="edit"
                  v-model="date.customerRentalCompany"
                  @update:model-value="date.customerRentalCompany = true"
                  @cleared="date.customerRentalCompany = false"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec p-4">
        <h6>Dates II</h6>
        <div>
          <div>
            <div class="mt-0">
              <p class="datexlable">Total Job Hours</p>
              <div class="datexBox" style="overflow: hidden;">
                <input
                  class="form-check-input"
                  :disabled="edit"
                  v-model="date.totalJobHourCheck"
                  type="checkbox"
                />
                <input
                  class="form-control"
                  type="text"
                  :disabled="edit"
                  @input="
                    () => {
                      if (
                        date.totalJobHour &&
                        Number(date.totalJobHour) !== 0
                      ) {
                        date.totalJobHourCheck = true;
                      } else {
                        date.totalJobHourCheck = false;
                      }
                    }
                  "
                  v-model="date.totalJobHour"
                  placeholder="Enter Total Job Hours"
                />
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Cycle Time</p>
              <div class="datexBox" style="overflow: hidden;">
                <input
                  class="form-check-input"
                  :disabled="edit"
                  v-model="date.cycleTimeCheck"
                  type="checkbox"
                />
                <input
                  class="form-control"
                  type="text"
                  v-model="date.cycleTime"
                  @input="
                    () => {
                      if (date.cycleTime && Number(date.cycleTime) !== 0) {
                        date.cycleTimeCheck = true;
                      } else {
                        date.cycleTimeCheck = false;
                      }
                    }
                  "
                  :disabled="edit"
                  placeholder="Enter the Cycle Target Days"
                />
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Add days for parts</p>
              <div class="datexBox" style="overflow: hidden;">
                <input
                  class="form-check-input"
                  :disabled="edit"
                  v-model="date.daysForPartsCheck"
                  type="checkbox"
                />
                <input
                  class="form-control"
                  type="text"
                  v-model="date.daysForParts"
                  @input="
                    () => {
                      if (
                        date.daysForParts &&
                        Number(date.daysForParts) !== 0
                      ) {
                        date.daysForPartsCheck = true;
                      } else {
                        date.daysForPartsCheck = false;
                      }
                    }
                  "
                  :disabled="edit"
                  placeholder="Enter parts days"
                />
              </div>
            </div>

            <div class="mt-4">
              <p class="datexlable">Target Date</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.targetDateCheck"
                  @click="handleClick(date.targetDateCheck, 'targetDate')"
                  :disabled="edit"
                />
                <VueDatePicker
                  v-model="date.targetDate"
                  @update:model-value="date.targetDateCheck = true"
                  @cleared="date.targetDateCheck = false"
                  :disabled="edit"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">
                Estimated Days to Repairs
                <span class="p-2" style="background-color: #e6f0ff;">
                  {{
                    handleEstimateDate(
                      date.totalJobHour,
                      date.cycleTime,
                      date.daysForParts
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mt-4 mt-sm-0 cutsomerCol p-4">
        <h6>Dates III</h6>
        <div>
          <div>
            <div class="mt-4">
              <p class="datexlable">Ready for Pickup</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.pickupDateCheck"
                  :disabled="edit"
                  @click="handleClick(date.pickupDateCheck, 'pickupDate')"
                />
                <VueDatePicker
                  :disabled="edit"
                  @update:model-value="date.pickupDateCheck = true"
                  @cleared="date.pickupDateCheck = false"
                  v-model="date.pickupDate"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Customer Notified</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.customerNotifiedCheck"
                  @click="
                    handleClick(date.customerNotifiedCheck, 'customerNotified')
                  "
                  :disabled="edit"
                />
                <VueDatePicker
                  v-model="date.customerNotified"
                  @update:model-value="date.customerNotifiedCheck = true"
                  @cleared="date.customerNotifiedCheck = false"
                  :disabled="edit"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Vehicle Delivered</p>
              <div class="datexBox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="date.vehicalDeliveredCheck"
                  @click="
                    handleClick(date.vehicalDeliveredCheck, 'vehicalDelivered')
                  "
                  :disabled="edit"
                />
                <VueDatePicker
                  v-model="date.vehicalDelivered"
                  @update:model-value="date.vehicalDeliveredCheck = true"
                  @cleared="date.vehicalDeliveredCheck = false"
                  :disabled="edit"
                  select-text="Apply"
                  position="left"
                  time-picker-inline
                  :is-24="false"
                    week-start="0"
                >
                  <template #input-icon>
                    <img
                      class="input-slot-image"
                      src="../Icons/calenderIcons.png"
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.dateFolderxs .card {
  min-height: 460px;
  box-shadow: 0 4px 4px 0 #00000040;
}
</style>
