<script setup>
import { ref, watch, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useStore } from "vuex";

const store = useStore();
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const date = ref({
  Estimateappointment: null,
});
const props = defineProps(["customerData"]);
const customerData = ref("");
watch(props, () => {
  customerData.value = props.customerData;
});
</script>
<template>
  <div class="row">
    <div class="col-sm-12 col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="esAppo d-flex align-items-center gap-4">
            <i class="fa-regular fa-clock"></i>
            <div>
              <p>Estimate Appointment</p>
              <hr />
              <VueDatePicker
                v-model="date.Estimateappointment"
                select-text="Apply"
                position="left"
                time-picker-inline
                :is-24="false"
                  week-start="0"
              >
              </VueDatePicker>
              <p>
                September 21 , Thursday <br />
                8:00am - 9:00am EST
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-4">
        <div class="card-body">
          <div class="esAppo d-flex align-items-center gap-4">
            <div class="mt-1">
              <p class="datexlable">Invite to Welcome Form via Chatlink?</p>
              <div class="card">
                <div class="card-body">
                  <div class="form-check form-switch">
                    <label class="form-check-label" for="mySwitch">Yes</label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="mySwitch"
                      name="darkmode"
                      value="yes"
                      checked
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="esAppo">
            <div class="mt-1">
              <p class="datexlable">First name</p>
              <div class="customerXBox">
                <input
                  :value="customerData.firstName"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Last name</p>
              <div class="customerXBox">
                <input
                  :value="customerData.lastName"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Cell # / Phone 1</p>
              <div class="customerXBox">
                <input
                  :value="customerData.phone"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">Email</p>
              <div class="customerXBox">
                <input
                  :value="customerData.email"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-3">
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
                      value="yes"
                      checked
                    />
                  </div>
                  <div class="form-check form-switch">
                    <label class="form-check-label" for="OptOut">Opt Out</label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="OptOut"
                      name="darkmode"
                      value="yes"
                      checked
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
                      value="yes"
                      checked
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
              >
                Invite Chatlink
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="esAppo">
            <div class="mt-4">
              <p class="datexlable">Customer #</p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  type="text"
                  :placeholder="`${
                    storeCustomerDetails?.customerId
                      ? storeCustomerDetails.customerId.toUpperCase()
                      : 'C00001'
                  }`"
                  disabled
                />
              </div>
            </div>
            <div class="mt-4">
              <p class="datexlable">New Estimate #</p>
              <div class="customerXBox">
                <input
                  class="form-control"
                  :placeholder="`${
                    storeEstimateDetails?.estimateId
                      ? storeEstimateDetails.estimateId.toUpperCase()
                      : 'E00001'
                  }`"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-light mt-4">
                Assign IDs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
