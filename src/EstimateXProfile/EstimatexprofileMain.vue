<script setup>
import expandImg from "../assets/expandImg.png";
import zoomout from "../assets/zoomout.png";
import scrollTopIcons from "../assets/scrollTopIcons.png";
import TopFolderxLink from "./TopFolderxLink.vue";
import EstimateDates from "./EstimateDates.vue";

import Payment from "./Icons/Payment.png";
import Comments from "./Icons/Comments.png";
import Chatlink from "./Icons/Chatlink.png";
import ESign from "./Icons/ESign.png";
import Date from "./Icons/Date.png";
import CUSTOMER from "./Icons/CUSTOMER.png";
import VEHICLE from "./Icons/VEHICLE.png";
import INSURANCE from "./Icons/INSURANCE.png";
import PHOTOS from "./Icons/PHOTOS.png";
import ESTIMATE from "./Icons/ESTIMATE.png"; 
import STAFF from "./Icons/STAFF.png";
 
import DOCUMENTS from "./Icons/DOCUMENTS.png";
 
import Start from "./Icons/Start.svg";
import FollowUp from "./Icons/FollowUp.svg";

import FolderXPaymentMain from "./PaymentX/FolderXPaymentMain.vue";
import TopPaymentBlock from "./TopPaymentBlock.vue";
import TopTimeline from "./TopTimeline.vue";
import FolderxDetialsMain from "./FolderxDetials/FolderxDetialsMain.vue";
import FolderXCommentMain from "./CommentX/FolderXCommentMain.vue";

import DatesXMain from "./DatesX/DatesXMain.vue";
import CustomerXMain from "./CustomerX/CustomerXMain.vue";
import StaffXMian from "./StaffX/StaffXMian.vue";
import VehicleXMain from "./VehicleX/VehicleXMain.vue";
import EsignxMain from "./EsignX/EsignxMain.vue";
import InsuranceXMain from "./InsuranceX/InsuranceXMain.vue";
import EstimateXMain from "./EstimateX/EstimateXMain.vue";
import PhotosXMain from "./PhotosX/PhotosXMain.vue";
import DocumentsXMain from "./DocumentsX/DocumentsXMain.vue";
import ChatlinkXMain from "./ChatlinkX/ChatlinkXMain.vue";
import ActivityXmain from "./ActivityX/ActivityXmain.vue";
import EstimateStartMain from "./StartX/EstimateStartMain.vue";
import EstimateFollowUpMain from "./FollowUpX/EstimateFollowUpMain.vue";
import TopTimeLineModel from "./TopTimeLineModel.vue";
import axios from "axios";
import {   ref, computed, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showSuccessToast } from "../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { handleError } from "../handleError";

const isLoading = ref(true);
const store = useStore();
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const userId = localStorage.getItem("userId");
const apiUrl = import.meta.env.VITE_API_URL;
const route = useRoute();
const router = useRouter();
const estimateData = ref("");
const customerData = ref("");
const vehicalData = ref("");
const getData = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateProfile/customer/Vehical/data/${route.params.id}`
    );
    estimateData.value = response.data.data;
    customerData.value = response.data.data.customerId;
    vehicalData.value = response.data.data.vehicalId;

    store.dispatch("setCustomerDetails", customerData.value);
    store.dispatch("setEstimateDetails", estimateData.value);
    store.dispatch("setVehicals", vehicalData.value);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    router.push(`/pageNotFound`);
    console.log(error);
  }
};

const estimateActivity = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateProfile/Activity/${route.params.id}/${userId}`
    );
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(async () => {
  try {
    await getData();
    await estimateActivity();
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    router.push("/pageNotFound");
  }
});

/* const showhideaccordionref = ref('')

function showhideaccordion(id) {
    console.log("id",id)
    showhideaccordionref.value = id
}  */

function scrollToTop() {
  window.scrollTo(0, 0);
}

const handleRo = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post(`${apiUrl}/repairOrder/register`, {
      estimateId: storeEstimateDetails.value._id,
    });
    isLoading.value = false;
    showSuccessToast(response.data.msg);
    router.push(`/floderxmain/${response.data.data.repairOrdreId}`);
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};
watch(storePaymentRefresh, async () => {
  await getData();
});
</script>
<script>
export default {
  data() {
    return {
      showhideaccordionref: "",
    };
  },
  methods: {
    showhideaccordion(id) {
      this.showhideaccordionref = id;
    },
  },
};
</script>
<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    color="#E6F0FF"
  />
  <div :style="{ backgroundColor: '#F4F8F8', borderRadius: '2px' }">
    <!-- :key="storePaymentRefresh" -->
    <div
      class="p-3 d-flex flex-column justify-content-between sticky-top"
      style="background-color: #f0f511; top: 58px; z-index: 99;"
    >
      <div class="large d-flex justify-content-between align-items-center">
        <h3 class="myEstiproQws d-flex align-items-center m-0">
          Estimate Profile:
          <a
          :style="{paddingLeft:'2px', color: 'inherit', cursor: 'pointer'}"
            v-on:click="showhideaccordion('CUSTOMERX')"
            href="#CUSTOMERX"
            v-smooth-scroll="{ offset: -81 }"
          >
           {{ estimateData.estimateId }}  [{{ customerData?.customerId?.toUpperCase() }}]</a>

         
          <!-- <div class="estiProuis ps-2"> -->
          <div class="myEstiproQws ps-1"> 
            {{ estimateData?.lastName?.toUpperCase() }},
            {{ estimateData?.firstName?.toUpperCase() }} |
            {{ vehicalData?.year?.toUpperCase() }},
            {{ vehicalData?.make?.toUpperCase() }},
            {{ vehicalData?.model?.toUpperCase() }} | {{ vehicalData?.vin }}
          </div>
        </h3>
        <div class="d-flex align-items-center gap-2">
          <div class="dropdown">
            <button
              type="button"
              class="btn dropdown-toggle btn-sm"
              data-bs-toggle="dropdown"
              :style="{ backgroundColor: '#D2D4D7' }"
            >
              OPTIONS
            </button>
            <div class="dropdown">
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <button
                    type="button"
                    class="dropdown-item btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#ConvertToRoModel"
                  >
                    Convert to RO
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-3 mt-4">
      <section class="topFolderxLink mt-1 mb-3">
        <TopFolderxLink :showhideaccordion="showhideaccordion" />
      </section>
      <section class="topFolderxLink mb-3">
        <TopPaymentBlock />
      </section>
      <section class="topFolderxLink mb-3">
        <TopTimeline />
      </section>
      <section class="topFolderxLink mb-3">
        <FolderxDetialsMain />
      </section>
      <div class="cmxdashboard-set-main mt-3">
        <div class="sectionaccomadation" :style="{ height: '240vh' }">
          <ul class="link-section">
            <li class="li-drop" id="StartX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmszero"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img class="sidebar-icon" :src="Start" alt="Start" />
                        <h3>START</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmszero"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'StartX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <EstimateStartMain :customerData="estimateData" />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="FollowUpX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmsminusone"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="FollowUp"
                          alt="FollowUp"
                        />
                        <h3>FOLLOW-UP</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmsminusone"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'FollowUpX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <EstimateFollowUpMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="paymentX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmsone"
                      aria-expanded="false"
                      id="flushCollapsecmsoneCloseButton"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="Payment"
                          alt="Payment"
                        />
                        <h3>PAYMENT</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmsone"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'paymentX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <FolderXPaymentMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="COMMENTSX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxtwo"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="Comments"
                          alt="Customerpro"
                        />
                        <h3>COMMENTS</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxtwo"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'COMMENTSX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <FolderXCommentMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="CHATLINKX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxthree"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="Chatlink"
                          alt="Chatlink"
                        />
                        <h3>CHATLINX</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxthree"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'CHATLINKX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <ChatlinkXMain :customerData="estimateData" />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="ESIGNX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxfour"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img class="sidebar-icon" :src="ESign" alt="ESign" />
                        <h3>E-SIGNITURE</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxfour"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'ESIGNX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <EsignxMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="DATESX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxfive"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img class="sidebar-icon" :src="Date" alt="Date" />
                        <h3>DATES</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxfive"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'DATESX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <DatesXMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="CUSTOMERX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxsix"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="CUSTOMER"
                          alt="CUSTOMER"
                        />
                        <h3>CUSTOMER</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxsix"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'CUSTOMERX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <CustomerXMain :customerId="estimateData.customerId" />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="VEHICLEX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxseven"
                      aria-expanded="false"
                      id="CollapsecmsoneVehicalCloseButton"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="VEHICLE"
                          alt="VEHICLE"
                        />
                        <h3>VEHICLE</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxseven"
                    class="accordion-collapse collapse"
                    :class="[showhideaccordionref == 'VEHICLEX' ? 'show' : '']"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <VehicleXMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="INSURANCEX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxeight"
                      aria-expanded="false"
                      id="CollapsecmsoneInsuranceCloseButton"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="INSURANCE"
                          alt="INSURANCE"
                        />
                        <h3>INSURANCE</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxeight"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'INSURANCEX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <InsuranceXMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop" id="PHOTOSXFolder">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxten"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img class="sidebar-icon" :src="PHOTOS" alt="PHOTOS" />
                        <h3>PHOTOS</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxten"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'PHOTOSXFolder' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <PhotosXMain />
                  </div>
                </div>
              </div>
            </li>

            <li class="li-drop" id="ESTIMATEX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxeleven"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="ESTIMATE"
                          alt="ESTIMATE "
                        />
                        <h3>ESTIMATE</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxeleven"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'ESTIMATEX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <EstimateXMain />
                  </div>
                </div>
              </div>
            </li>

            <li class="li-drop" id="STAFFXFolder">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxelSTAFF"
                      aria-expanded="false"
                      id="CollapsecmsoneStaffCloseButton"
                    >
                      <div class="accomdationset-head">
                        <img class="sidebar-icon" :src="STAFF" alt="STAFF " />
                        <h3>STAFF</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxelSTAFF"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'STAFFXFolder' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <StaffXMian />
                  </div>
                </div>
              </div>
            </li>

            <!-- <li class="li-drop" id="SUBLETX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxelSUBLET"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img class="sidebar-icon" :src="SUBLET" alt="SUBLET" />
                        <h3>SUBLET</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxelSUBLET"
                    class="accordion-collapse collapse"
                    :class="[showhideaccordionref == 'SUBLETX' ? 'show' : 'hide']"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <h6>SUBLET</h6>
                  </div>
                </div>
              </div>
            </li> -->
            <li class="li-drop" id="DOCUMENTSX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxelDOCUMENTS"
                      aria-expanded="false"
                      id="mainDocumentCollapsecmxelDOCUMENTS"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="DOCUMENTS"
                          alt="DOCUMENTS"
                        />
                        <h3>DOCUMENTS</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxelDOCUMENTS"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'DOCUMENTSX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <DocumentsXMain />
                  </div>
                </div>
              </div>
            </li>
            <!-- <li class="li-drop" id="ACTIVITYX">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsecmxelACTIVITY"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="ACTIVITY"
                          alt="ACTIVITY"
                        />
                        <h3>ACTIVITY</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsecmxelACTIVITY"
                    class="accordion-collapse collapse"
                    :class="[
                      showhideaccordionref == 'ACTIVITYX' ? 'show' : 'hide',
                    ]"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <ActivityXmain />
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
          <div
            class="d-flex justify-content-end cursor-pointer mt-5"
            :style="{ marginRight: '20px' }"
            @click="scrollToTop"
          >
            <img
              :src="scrollTopIcons"
              alt="scrollTopIcons"
              class="img-fluid"
              :style="{ width: '24px' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="ConvertToRoModel"
    tabindex="-1"
    aria-labelledby="ConvertToRoModelLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-warning text-white">
          <h5 class="modal-title" id="ConvertToRoModelLabel">
            Notice
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeRoConverModel"
          ></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">
            Do you want to convert Estimate into Repair Order(R.O.)?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            No
          </button>
          <button
            @click="handleRo"
            type="button"
            class="btn btn-light"
            data-bs-dismiss="modal"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <TopTimeLineModel />
</template>

<style>
@import "./EstimateStyle.css";

.FolderXNavbar.sticky-top {
  top: 3.4rem;
}
.myEstiproQws {
  font-size: 19px;
  color: #636363;
  font-weight: 400;
}
.estiProuis {
  font-size: 16px;
  color: #636363;
  font-weight: 300;
}
</style>
