<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { showSuccessToast } from "../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
let PayItem = ref([
  { name: "Arrived", key: "Arrived" },
  { name: "Estimate Approved", key: "EstimateApproved" },
  { name: "Parts Ordered", key: "PartsOrdered" },
  { name: "Parts Arrived", key: "PartsArrived" },
  { name: "Repair Plan", key: "RepairPlan" },
  { name: "Supplement Hold", key: "SupplementHold" },
  { name: "Supplment Approved", key: "SupplmentApproved" },
  { name: "Body Frame", key: "BodyFrame" },
  { name: "Mechanical", key: "Mechanical" },
  { name: "Paint", key: "Paint" },
  { name: "Reassembly", key: "Reassembly" },
  { name: "ADAS Mechanical", key: "ADASMechanical" },
  { name: "Detail", key: "Detail" },
  { name: "Ready for Pickup", key: "ReadyforPickup" },
  { name: "Delivered", key: "Delivered" },
  { name: "Paid in Full", key: "PaidInFull" },
]);
const upTimeLine = ref({});
const allComp = ref(false);
const isLoading = ref(false);

const handleAllComplete = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/update/time/line/all/${storeEstimateDetails.value?._id}`,
      upTimeLine.value,
      config
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    allComp.value = false;
    document.getElementById("closeButtonTimeModel").click();
    document.getElementById("closeButtonTimeCheckModel").click();
  } catch (error) {
    console.log(error);
  }
};

watch(storeEstimateDetails, () => {
  PayItem.value.map((item) => {
    upTimeLine.value[item.key] =
      storeEstimateDetails.value?.StatusUpdate[item.key];
  });
});

const closeModal = (modalId) => {
  PayItem.value.map((item) => {
    upTimeLine.value[item.key] =
      storeEstimateDetails.value?.StatusUpdate[item.key];
  });
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.hide();
};

const openModal = (modalId) => {
  upTimeLine.value = Object.fromEntries(
    Object.entries(upTimeLine.value).map(([key, value]) => [key, "Completed"])
  );
  allComp.value = false;
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
  setTimeout(() => {
    allComp.value = !allComp.value;
  }, 0);
};
</script>
<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    background-color="#E6F0FF"
    color="#E6F0FF"
  />
  <div
    class="modal fade"
    id="TimeLineFolderXModel"
    tabindex="-1"
    role="dialog"
    aria-labelledby="TimeLineFolderXModelTitle"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100 p-2"
                  >
                    <div>
                      Update Timeline
                    </div>
                    <div class="d-flex gap-3 align-items-center">
                      <button
                        @click="handleAllComplete"
                        type="button"
                        class="btn btn-success"
                      >
                        Save
                      </button>

                      <button
                        id="closeButtonTimeModel"
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div v-for="item in PayItem">
                <div
                  class="d-flex align-items-center justify-content-between p-1"
                >
                  <div class="me-3">
                    {{ item.name }}
                  </div>
                  <div class="d-flex ms-auto timeLineFields">
                    <div class="form-check form-switch manis me-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked1"
                        :checked="upTimeLine[item.key] === 'Default'"
                        @click="
                          (e) => {
                            if (e.target.checked) {
                              upTimeLine[item.key] = 'Default';
                            } else {
                              e.target.checked = true;
                              upTimeLine[item.key] = 'Default';
                            }
                          }
                        "
                      />
                    </div>
                    <div class="form-check form-switch manisA me-3 tooltip">
                      <span class="tooltiptext"
                        ><i
                          class="fa-solid fa-circle"
                          style="color: #d9d9d9;"
                        ></i>
                        Not Apply</span
                      >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked2"
                        :checked="upTimeLine[item.key] === 'Not Apply'"
                        @click="
                          (e) => {
                            if (e.target.checked) {
                              upTimeLine[item.key] = 'Not Apply';
                            } else {
                              upTimeLine[item.key] = 'Default';
                            }
                          }
                        "
                      />
                    </div>
                    <div class="form-check form-switch manisB me-3 tooltip">
                      <span class="tooltiptext"
                        ><i
                          class="fa-solid fa-circle"
                          style="color: #f0f511;"
                        ></i>
                        Needs Action</span
                      >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked3"
                        :checked="upTimeLine[item.key] === 'Needs Action'"
                        @click="
                          (e) => {
                            if (e.target.checked) {
                              upTimeLine[item.key] = 'Needs Action';
                            } else {
                              upTimeLine[item.key] = 'Default';
                            }
                          }
                        "
                      />
                    </div>
                    <div class="form-check form-switch manisC me-3 tooltip">
                      <span class="tooltiptext"
                        ><i
                          class="fa-solid fa-circle"
                          style="color: #2858ff;"
                        ></i>
                        Processed</span
                      >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked4"
                        :checked="upTimeLine[item.key] === 'Processed'"
                        @click="
                          (e) => {
                            if (e.target.checked) {
                              upTimeLine[item.key] = 'Processed';
                            } else {
                              upTimeLine[item.key] = 'Default';
                            }
                          }
                        "
                      />
                    </div>
                    <div class="form-check form-switch manisD tooltip">
                      <span class="tooltiptext"
                        ><i
                          class="fa-solid fa-circle"
                          style="color: #008836;"
                        ></i>
                        Completed</span
                      >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked5"
                        :checked="upTimeLine[item.key] === 'Completed'"
                        @click="
                          (e) => {
                            if (e.target.checked) {
                              upTimeLine[item.key] = 'Completed';
                            } else {
                              upTimeLine[item.key] = 'Default';
                            }
                          }
                        "
                      />
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div class="d-flex justify-content-between p-2">
                <div>
                  Mark ALL Completed
                </div>
                <div class="form-check form-switch manisFS mr-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked1"
                    v-model="allComp"
                    @click="() => openModal('TimeLineFolderXModelCheck')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="TimeLineFolderXModelCheck"
    tabindex="-1"
    role="dialog"
    aria-labelledby="TimeLineFolderXModelCheckTitle"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100 p-2"
                  >
                    Notice
                    <button
                      id="closeButtonTimeCheckModel"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      @click="closeModal('TimeLineFolderXModelCheck')"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="container"
              style="
                width: 300px;
                height: 150px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 20px;
              "
            >
              Are you sure you want to mark all as Complete?
              <button
                class="btn btn-success"
                style="width: 100%; margin-top: auto;"
                @click="handleAllComplete"
              >
                Mark All as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tooltip {
  position: relative;
  opacity: 1;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  left: 50%;
  margin-left: -60px;
  bottom: 100%;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.manis.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(173, 205, 255)'/%3e%3c/svg%3e");
}
.manis.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(173, 205, 255)'/%3e%3c/svg%3e");
}
.manis.form-switch .form-check-input:checked {
  background-color: rgb(173, 205, 255);
  border-color: #ccdff1;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}

.manisA.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(217, 217, 217)'/%3e%3c/svg%3e");
}
.manisA.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(217, 217, 217)'/%3e%3c/svg%3e");
}
.manisA.form-switch .form-check-input:checked {
  background-color: rgb(217, 217, 217);
  border-color: #d9d9d9;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}

.manisB.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(240, 245, 17)'/%3e%3c/svg%3e");
}
.manisB.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(240, 245, 17)'/%3e%3c/svg%3e");
}
.manisB.form-switch .form-check-input:checked {
  background-color: rgb(240, 245, 17);
  border-color: #f0f511;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}

.manisC.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(40, 88, 255)'/%3e%3c/svg%3e");
}
.manisC.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(40, 88, 255)'/%3e%3c/svg%3e");
}
.manisC.form-switch .form-check-input:checked {
  background-color: rgb(40, 88, 255);
  border-color: #2858ff;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}

.manisD.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(0, 136, 54)'/%3e%3c/svg%3e");
}
.manisD.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb(0, 136, 54)'/%3e%3c/svg%3e");
}
.manisD.form-switch .form-check-input:checked {
  background-color: rgb(0, 136, 54);
  border-color: #008836;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}
.manisFS.form-switch .form-check-input {
  background-color: #008836;
  border-color: #008836;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}
.timeLineFields .form-check-input {
  width: 2.7em !important;
}
</style>
