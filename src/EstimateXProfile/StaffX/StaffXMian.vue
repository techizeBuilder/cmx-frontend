<script setup>
import axios from "axios";
import { ref, computed, watch } from "vue";
import { showSuccessToast } from "../../toster";
import { useStore } from "vuex";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const staff = ref([]);
const selectStaff = ref({});
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const edit = ref(true);

const handleEdit = () => {
  edit.value = !edit.value;
};

const handleSave = async () => {
  // document.getElementById("CollapsecmsoneStaffCloseButton").click();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/staffs/${storeEstimateDetails.value?._id}`,
      selectStaff.value
    );
    edit.value = true;
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    edit.value = true;
    console.log(error);
  }
};

const getStaffByRole = (role) => {
  const staffMember = staff.value.find((item) => item.employeeTile === role);
  return staffMember ? staffMember.StaffList : [];
};

const getFirstNameById = (role, id) => {
  const staffMember = staff.value.find((item) => item.employeeTile === role);
  const staffName = staffMember.StaffList.find((item) => item._id === id);
  return staffName ? staffName.firstName : null;
};

const staffKey = {
  EstimatorStaff: "Estimator",
  BodyTechStaff: "Body Technician",
  PainterStaff: "Painter",
  FrameTechStaff: "Frame Technician",
  DetailTechStaff: "Detail Technician",
  OfficeStaff: "Office",
  ProductMangStaff: "Shop Manager",
};

let staffName = {};

const updateStaff = () => {
  for (let key in storeEstimateDetails.value?.estimateStaff) {
    selectStaff.value[key] = storeEstimateDetails.value?.estimateStaff[key];

    staffName[staffKey[key]] = getFirstNameById(
      staffKey[key],
      storeEstimateDetails.value?.estimateStaff[key]
    );
  }
  store.dispatch("setStaffNames", staffName);
};

watch(storeEstimateDetails, async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/user/all/users/${storeEstimateDetails.value?.shopId}`,
      config
    );
    staff.value = response.data.data;
    updateStaff();
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#STAFF"
            >Staff</a
          >
        </li>
      </ul>
      <!-- <small>
        FolderX# XXXXXXXX | Owner Last Name, Owner First name | YEAR, MAKE,
        MODEL | 17 DIGIT VIN# |
      </small> -->
      <h5 class="px-5 pt-4">Assign Staff</h5>
    </div>
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div
          class="d-lg-flex align-items-end gap-4 mt-2 mb-4 justify-content-end"
        >
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <button
              v-if="edit"
              @click="handleEdit"
              type="button"
              class="btn btn-light text-nowrap"
            >
              <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
            </button>
            <button
              v-else
              style="background-color: #6bfa65;"
              type="button"
              class="btn btn-light text-nowrap"
              @click="handleSave"
            >
              <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8 mx-auto">
        <div class="row pt-2 pt-sm-0 stafRow">
          <div class="col-sm-12 col-md-6 stafrCol">
            <div class="mt-sm-3 mt-0">
              <p class="datexlable">Estimator</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.EstimatorStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole('Estimator')"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">Body Technician</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.BodyTechStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole('Body Technician')"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">Painter Technician</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.PainterStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole('Painter')"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">Frame Technician</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.FrameTechStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole('Frame Technician')"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">Detail Technician</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.DetailTechStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole(
                      'Detail Technician'
                    )"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 ps-lg-5 cutsomerCol staffxRowSec">
            <div class="mt-3">
              <p class="datexlable">Office</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.OfficeStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole('Office')"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <p class="datexlable">Production Management</p>
              <div class="stafXBox">
                <select
                  v-model="selectStaff.ProductMangStaff"
                  :disabled="edit"
                  class="form-select"
                >
                  <option selected value="">-</option>
                  <option
                    v-for="(staff, index) in getStaffByRole('Shop Manager')"
                    :key="index"
                    :value="staff._id"
                  >
                    {{ staff.firstName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (min-width: 767px) {
  .stafRow {
    padding: 0 0 4rem 0;
  }

  .stafRow .staffxRowSec {
    border-left: 1px solid #636363;
  }
}
</style>
