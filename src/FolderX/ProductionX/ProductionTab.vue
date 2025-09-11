<script setup>
import { ref, computed, watch } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import calenderIcons from "../Icons/calenderIcons.png";
import axios from "axios";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const edit = ref(true);
const data = ref({
  vehicalInShopCheckBox: false,
  vehicalInShopTextArea: "",
  vehicalInShopDate: "",
  repairPlanCopleteCheckBox: false,
  repairPlanCopleteTextArea: "",
  repairPlanCopleteDate: "",
  supplementHoldCheckBox: false,
  supplementHoldTextArea: "",
  supplementHoldDate: "",
  supplementApprovedCheckBox: false,
  supplementApprovedTextArea: "",
  supplementApprovedDate: "",
  vehicalQualityCheckCheckBox: false,
  vehicalQualityCheckTextArea: "",
  vehicalQualityCheckDate: "",
  vehicalTestDriveCheckBox: false,
  vehicalTestDriveTextArea: "",
  vehicalTestDriveDate: "",
  vehicalCompleteCheckBox: false,
  vehicalCompleteTextArea: "",
  vehicalCompleteDate: "",
  preScanCheckBox: false,
  preScanTextArea: "",
  preScanSelect: "",
  preScanDate: "",
  postScanCheckBox: false,
  postScanTextArea: "",
  postScanSelect: "",
  postScanDate: "",
  alignmentScanCheckBox: false,
  alignmentScanTextArea: "",
  alignmentScanSelect: "",
  alignmentScanDate: "",
  wheelSubletCheckBox: false,
  wheelSubletTextArea: "",
  wheelSubletSelect: {
    leftFront: false,
    leftRear: false,
    rightFront: false,
    rightRear: false,
  },
  wheelSubletDate: "",
  subletRepairCheckBox: false,
  subletRepairTextArea: "",
  subletRepairNotes: "",
  subletRepairDate: "",
  dealerShipCheckBox: false,
  dealerShipTextArea: "",
  dealerShipNotes: "",
  dealerShipDate: "",
  custom1CheckBox: false,
  custom1TextArea: "",
  custom1Notes: "",
  custom1Date: "",
  custom2CheckBox: false,
  custom2TextArea: "",
  custom2Notes: "",
  custom2Date: "",
  custom3CheckBox: false,
  custom3TextArea: "",
  custom3Notes: "",
  custom3Date: "",
});

const handleCheckMark = (check, textArea, date, text) => {
  if (data.value[check]) {
    data.value[textArea] = text;
    data.value[date] = new Date();
  }
};

watch(storeEstimateDetails, async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/repairOrderProduction/get/${storeEstimateDetails.value._id}`,
      config
    );
    if (response.data.success) {
      data.value = response.data.data;
      store.dispatch("setProductionDetails", response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
});

const handleProduction = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.post(
      `${apiUrl}/repairOrderProduction/register/${storeEstimateDetails.value._id}`,
      data.value,
      config
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    edit.value = true;
  } catch (error) {
    console.log(error);
    edit.value = true;
  }
};
</script>
<template>
  <div class="p-2 text-end">
    <button type="button" @click="() => (edit = false)" class="btn btn-light text-nowrap" v-if="edit">
      <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
    </button>
    <button v-else :style="{ 'background-color': '#6BFA65' }" type="button" class="btn btn-light text-nowrap flex-1"
      @click="handleProduction">
      <i class="fa-regular fa-floppy-disk"></i> Save
    </button>
  </div>
  <div class="estimatedetailsection mt-5 proTabfolderx">
    <div class="row g-4">
      <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-4 boxps">
        <h6>Production I</h6>

        <div class="ProducXSA">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Vehicle In Shop</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.vehicalInShopCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'vehicalInShopCheckBox',
                      'vehicalInShopTextArea',
                      'vehicalInShopDate',
                      'Started'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.vehicalInShopTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.vehicalInShopDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Repair Plan Completed</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.repairPlanCopleteCheckBox"
                  :disabled="edit" @change="
                    handleCheckMark(
                      'repairPlanCopleteCheckBox',
                      'repairPlanCopleteTextArea',
                      'repairPlanCopleteDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.repairPlanCopleteTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.repairPlanCopleteDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Supplement Hold</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.supplementHoldCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'supplementHoldCheckBox',
                      'supplementHoldTextArea',
                      'supplementHoldDate',
                      'Hold'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.supplementHoldTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.supplementHoldDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Supplement Approved</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.supplementApprovedCheckBox"
                  :disabled="edit" @change="
                    handleCheckMark(
                      'supplementApprovedCheckBox',
                      'supplementApprovedTextArea',
                      'supplementApprovedDate',
                      'Approved'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.supplementApprovedTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.supplementApprovedDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-4 boxps boxCe">
        <h6>Production II</h6>

        <div class="ProducXSB">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Vehicle Quality Check</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.vehicalQualityCheckCheckBox"
                  :disabled="edit" @change="
                    handleCheckMark(
                      'vehicalQualityCheckCheckBox',
                      'vehicalQualityCheckTextArea',
                      'vehicalQualityCheckDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.vehicalQualityCheckTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.vehicalQualityCheckDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Vehicle Test Drive</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.vehicalTestDriveCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'vehicalTestDriveCheckBox',
                      'vehicalTestDriveTextArea',
                      'vehicalTestDriveDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.vehicalTestDriveTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.vehicalTestDriveDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">Vehicle Completed</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.vehicalCompleteCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'vehicalCompleteCheckBox',
                      'vehicalCompleteTextArea',
                      'vehicalCompleteDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.vehicalCompleteTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.vehicalCompleteDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 boxps  ">
        <h6>Production III</h6>

        <div class="ProducXSC">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Pre Scan</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.preScanCheckBox" :disabled="edit" @change="
                  handleCheckMark(
                    'preScanCheckBox',
                    'preScanTextArea',
                    'preScanDate',
                    'Completed'
                  )
                  " />
                <input class="form-control" type="text" v-model="data.preScanTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <select v-model="data.preScanSelect" :disabled="edit" class="form-select" required>
                  <option value="">-</option>
                  <option value="Required">Required</option>
                </select>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.preScanDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Post Scan</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.postScanCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'postScanCheckBox',
                      'postScanTextArea',
                      'postScanDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.postScanTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <select v-model="data.postScanSelect" :disabled="edit" class="form-select">
                  <option value="">-</option>
                  <option value="Required">Required</option>
                </select>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.postScanDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Alignment</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.alignmentScanCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'alignmentScanCheckBox',
                      'alignmentScanTextArea',
                      'alignmentScanDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.alignmentScanTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <select v-model="data.alignmentScanSelect" :disabled="edit" class="form-select">
                  <option value="">-</option>
                  <option value="Required">2 Wheel</option>
                  <option value="Required">4 Wheel</option>
                </select>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.alignmentScanDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Wheel Sublet</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.wheelSubletCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'wheelSubletCheckBox',
                      'wheelSubletTextArea',
                      'wheelSubletDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.wheelSubletTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="wheelRadio">
                <div>
                  <label>LF</label>
                  <input v-model="data.wheelSubletSelect.leftFront" :disabled="edit" class="form-check-input"
                    type="checkbox" />
                </div>
                <div>
                  <label>LR</label>
                  <input v-model="data.wheelSubletSelect.leftRear" :disabled="edit" class="form-check-input"
                    type="checkbox" />
                </div>
                <div>
                  <label>RF</label>
                  <input v-model="data.wheelSubletSelect.rightFront" :disabled="edit" class="form-check-input"
                    type="checkbox" />
                </div>
                <div>
                  <label>RR</label>
                  <input v-model="data.wheelSubletSelect.rightRear" :disabled="edit" class="form-check-input"
                    type="checkbox" />
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.wheelSubletDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Sublet Repair</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.subletRepairCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'subletRepairCheckBox',
                      'subletRepairTextArea',
                      'subletRepairDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.subletRepairTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <input class="form-control border-0" type="text" placeholder="Enter Notes"
                  v-model="data.subletRepairNotes" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.subletRepairDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Dealership</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.dealerShipCheckBox" :disabled="edit"
                  @change="
                    handleCheckMark(
                      'dealerShipCheckBox',
                      'dealerShipTextArea',
                      'dealerShipDate',
                      'Completed'
                    )
                    " />
                <input class="form-control" type="text" v-model="data.dealerShipTextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <input class="form-control border-0" type="text" placeholder="Enter Notes"
                  v-model="data.dealerShipNotes" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.dealerShipDate" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Custom I</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.custom1CheckBox" :disabled="edit" @change="
                  handleCheckMark(
                    'custom1CheckBox',
                    'custom1TextArea',
                    'custom1Date',
                    'Completed'
                  )
                  " />
                <input class="form-control" type="text" v-model="data.custom1TextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <input class="form-control border-0" type="text" placeholder="Enter Notes" v-model="data.custom1Notes"
                  :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.custom1Date" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Custom II</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.custom2CheckBox" :disabled="edit" @change="
                  handleCheckMark(
                    'custom2CheckBox',
                    'custom2TextArea',
                    'custom2Date',
                    'Completed'
                  )
                  " />
                <input class="form-control" type="text" v-model="data.custom2TextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <input class="form-control border-0" type="text" placeholder="Enter Notes" v-model="data.custom2Notes"
                  :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.custom2Date" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">Custom III</p>
              <div class="datexBoxproduction">
                <input class="form-check-input" type="checkbox" v-model="data.custom3CheckBox" :disabled="edit" @change="
                  handleCheckMark(
                    'custom3CheckBox',
                    'custom3TextArea',
                    'custom3Date',
                    'Completed'
                  )
                  " />
                <input class="form-control" type="text" v-model="data.custom3TextArea" :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <input class="form-control border-0" type="text" placeholder="Enter Notes" v-model="data.custom3Notes"
                  :disabled="edit" />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <p class="datexlableproduction">&nbsp;</p>
              <div class="datexBoxproduction">
                <VueDatePicker v-model="data.custom3Date" :disabled="edit" :enable-time-picker="false"
                  week-start="0"
                  select-text="Apply">
                  <template #input-icon>
                    <img class="input-slot-image" src="../Icons/calenderIcons.png" />
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
<style scoped>
.proTabfolderx .flatpickr-months {
  margin: 15px 0;
}

.hProHeigh {
  min-height: 400px;
}

.datexBoxproduction .flatpickr {
  align-items: center;
  width: 100%;
}

.calenderIcons {
  width: 20px;
  margin-right: 10px;
  margin-top: -3px;
}

.datexBoxproduction .flatpickr input.flatpickr-input {
  border: none;
}

.slot-icon {
  height: 20px;
  width: auto;
}

.datexBoxproduction {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;


}

.datexBoxproduction .form-check-input {
  border: 1px solid #e5e5e5;
  width: 18px;
  height: 18px;
  margin: 5px 1px 5px 10px;
}

.datexBoxproduction .form-control,
.datexBoxproduction .flatpickr input.flatpickr-input {
  border: none;
  border-radius: 0;
  background-color: transparent;
  border-left: 1px solid #e5e5e5;
  padding: 6px 6px;
}

input.dp__disabled.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
  border: none;
}

.datexBoxproduction .flatpickr input.flatpickr-input {
  width: 92%;
  border: none;
}

.datexBoxproduction .flatpickr input.flatpickr-input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

.datexlableproduction {
  color: #000;
  text-align: left;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 4px;
}

.wheelRadio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 8px 15px 4px 15px;
  max-width: 150px;
  margin: 0 auto;
}

.wheelRadio div label {
  line-height: 8px;
}

.wheelRadio div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.boxCe {
  border-left: 1px solid #636363;
  border-right: 1px solid #636363;
}

.boxps {
  padding: 0 2rem;
}
</style>
