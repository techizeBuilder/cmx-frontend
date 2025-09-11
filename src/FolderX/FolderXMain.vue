<script setup>
import expandImg from "../assets/expandImg.png";
import zoomout from "../assets/zoomout.png";
import scrollTopIcons from "../assets/scrollTopIcons.png";
import TopFolderxLink from "./TopFolderxLink.vue";
import FinalInvoiceDocument from "./FinalInvoiceDocument.vue";
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
import PRODUCTION from "./Icons/PRODUCTION.png";
import STAFF from "./Icons/STAFF.png";
import PARTS from "./Icons/PARTS.png";
import SUBLET from "./Icons/SUBLET.png";
import DOCUMENTS from "./Icons/DOCUMENTS.png";
import ACTIVITY from "./Icons/ACTIVITY.png";
import REPORTS from "./Icons/REPORTS.png";
import FINAL from "./Icons/FINAL.png";
import TOTALLoss from "./Icons/TOTALLoss.png";
import ProductionXMain from "./ProductionX/ProductionXMain.vue";
// import FolderXPaymentMain from "../EstimateXProfile/PaymentX/FolderXPaymentMain.vue";
import FolderXPaymentMain from "./PaymentX/FolderXPaymentMain.vue";
import TopPaymentBlock from "./TopPaymentBlock.vue";
import TopTimeline from "./TopTimeline.vue";
import FolderxDetialsMain from "./FolderxDetials/FolderxDetialsMain.vue";
import FolderXCommentMain from "./CommentX/FolderXCommentMain.vue";
import CheckInRepairDocModel from "./CheckInRepairDocModel.vue";
import DatesXMain from "../EstimateXProfile/DatesX/DatesXMain.vue";
// import DatesXMain from "./DatesX/DatesXMain.vue";
import CustomerXMain from "../EstimateXProfile/CustomerX/CustomerXMain.vue";
// import CustomerXMain from "./CustomerX/CustomerXMain.vue";
import StaffXMian from "../EstimateXProfile/StaffX/StaffXMian.vue";
// import StaffXMian from "./StaffX/StaffXMian.vue";
import VehicleXMain from "../EstimateXProfile/VehicleX/VehicleXMain.vue";
// import VehicleXMain from "./VehicleX/VehicleXMain.vue";
import EsignxMain from "../EstimateXProfile/EsignX/EsignxMain.vue";
// import EsignxMain from "./EsignX/EsignxMain.vue";
import InsuranceXMain from "../EstimateXProfile/InsuranceX/InsuranceXMain.vue";
// import InsuranceXMain from "./InsuranceX/InsuranceXMain.vue";
import EstimateXMain from "./EstimateX/EstimateXMain.vue";
import PhotosXMain from "../EstimateXProfile/PhotosX/PhotosXMain.vue";
// import PhotosXMain from "./PhotosX/PhotosXMain.vue";
// import DocumentsXMain from "../EstimateXProfile/DocumentsX/DocumentsXMain.vue";
import DocumentsXMain from "./DocumentsX/DocumentsXMain.vue";
import ChatlinkXMain from "../EstimateXProfile/ChatlinkX/ChatlinkXMain.vue";
// import ChatlinkXMain from "./ChatlinkX/ChatlinkXMain.vue";
// import ActivityXmain from "./ActivityX/ActivityXmain.vue";
import PartsxMain from "./PartsX/PartsxMain.vue";
import ReportsXMain from "./ReportsX/ReportsXMain.vue";
import TopTimeLineModel from "./TopTimeLineFolderXModel.vue";
import { useRoute } from "vue-router";
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(true);
const apiUrl = import.meta.env.VITE_API_URL;
const store = useStore();
const storeVehicalDetails = computed(() => store.getters.getVehicals);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);
const storeRODetails = computed(() => store.getters.getRepairDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
// console.log("After Value", storeVehicalDetails.value);
const route = useRoute();
/* const showhideaccordionref = ref('')

function showhideaccordion(id) {
    console.log("id",id)
    showhideaccordionref.value = id
}  */

function scrollToTop() {
  window.scrollTo(0, 0);
}

const getData = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/repairOrder/estimate/customer/Vehical/data/${route.params.id}`
    );
    isLoading.value = false;
    store.dispatch(
      "setCustomerDetails",
      response.data.data.estimateId.customerId
    );
    store.dispatch("setEstimateDetails", response.data.data.estimateId);
    store.dispatch("setVehicals", response.data.data.estimateId.vehicalId);
    store.dispatch("setRepairDetails", response.data.data);
    store.dispatch("setPaymentDetails", {
      customerTotal: response.data.customerTotal,
      InsuranceTotal: response.data.InsuranceTotal,
      total: response.data.customerTotal + response.data.InsuranceTotal,
    });
    console.log("Repair Order Data >>>>>>>>>>>", response.data);
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};

onMounted(async () => {
  await getData();
});
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
  <FinalInvoiceDocument />
  <CheckInRepairDocModel />
  <div class="px-0">
    <div
      class="p-3 d-flex justify-content-between sticky-top"
      style="background-color: #e6f0ff; top: 58px; z-index: 99;"
    >
      <div class="myEstiproQws d-flex">
        <div class="large">
          <!-- Estimate Profile: {{ estimateData.estimateId }} -->
          Repair Order:
          <a
          :style="{color: 'inherit', cursor: 'pointer'}"
            v-on:click="showhideaccordion('CUSTOMERX')"
            href="#CUSTOMERX"
            v-smooth-scroll="{ offset: -81 }"
          >
          {{ storeRODetails ? storeRODetails.repairOrdreId : "000000" }}
          [{{ storeCustomerDetails?.customerId?.toUpperCase() }}]  
          </a>
        
        </div>
        <div class="large">
      
          {{ storeEstimateDetails?.lastName?.toUpperCase() }},
          {{ storeEstimateDetails?.firstName?.toUpperCase() }} |
          {{ storeVehicalDetails?.year }},
          {{ storeVehicalDetails?.make?.toUpperCase() }},
          {{ storeVehicalDetails?.model?.toUpperCase() }} |
          {{ storeVehicalDetails?.vin }}
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="dropdown">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            :style="{ backgroundColor: '#D2D4D7' }"
          >
            OPTIONS
          </button>
          <ul class="dropdown-menu">
            <li data-bs-toggle="modal" data-bs-target="#CheckRepairModel">
              <a class="dropdown-item" href="#"> Check In Documents</a>
            </li>
            <li data-bs-toggle="modal" data-bs-target="#FinalIvoiceModel">
              <a class="dropdown-item" href="#">Final Invoice</a>
            </li>
            <li><a class="dropdown-item" href="#">Open New RO</a></li>
          </ul>
        </div>
      </div>
    </div>
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
    <div class="cmxdashboard-set-main mt-5">
     

      <div class="sectionaccomadation" :style="{ height: '240vh' }">
        <ul class="link-section">
          <li class="li-drop" id="paymentX">
            <div class="accordion accordion-flush" id="accordionFlushExample1">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsone"
                    aria-expanded="false"
                    id="flushFoldexCollapsecmsoneCloseButton"
                  >
                    <div class="accomdationset-head">
                      <img class="sidebar-icon" :src="Payment" alt="Payment" />
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
                      <h3>CHATLINK</h3>
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
                  <ChatlinkXMain />
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
                  :class="[showhideaccordionref == 'ESIGNX' ? 'show' : 'hide']"
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
                  :class="[showhideaccordionref == 'DATESX' ? 'show' : 'hide']"
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
                  <CustomerXMain />
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
                    id="FoldexCollapsecmsoneVehicalCloseButton"
                  >
                    <div class="accomdationset-head">
                      <img class="sidebar-icon" :src="VEHICLE" alt="VEHICLE" />
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
                    id="FoldexCollapsecmsoneInsuranceCloseButton"
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
          <li class="li-drop" id="PRODUCTIONXFolder">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxelPRODUCTION"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <img
                        class="sidebar-icon"
                        :src="PRODUCTION"
                        alt="PRODUCTION "
                      />
                      <h3>PRODUCTION</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxelPRODUCTION"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'PRODUCTIONXFolder'
                      ? 'show'
                      : 'hide',
                  ]"
                  data-bs-parent="#accordionFlushExample"
                >
                  <ProductionXMain />
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
          <li class="li-drop" id="PARTSX">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxelPARTS"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <img class="sidebar-icon" :src="PARTS" alt="PARTS " />
                      <h3>PARTS</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxelPARTS"
                  class="accordion-collapse collapse"
                  :class="[showhideaccordionref == 'PARTSX' ? 'show' : 'hide']"
                  data-bs-parent="#accordionFlushExample"
                >
                  <PartsxMain />
                </div>
              </div>
            </div>
          </li>

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
                    id="mainFolderXDocumentCollapsecmxelDOCUMENTS"
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
          <li class="li-drop" id="REPORTSX">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxelREPORTS"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <img class="sidebar-icon" :src="REPORTS" alt="REPORTS" />
                      <h3>REPORTS</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxelREPORTS"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'REPORTSX' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionFlushExample"
                >
                  <ReportsXMain />
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="FINALX">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxelFINAL"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <img class="sidebar-icon" :src="FINAL" alt="FINAL" />
                      <h3>FINAL</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxelFINAL"
                  class="accordion-collapse collapse"
                  :class="[showhideaccordionref == 'FINALX' ? 'show' : 'hide']"
                  data-bs-parent="#accordionFlushExample"
                >
                  <h6>FINAL</h6>
                </div>
              </div>
            </div>
          </li>
          <!-- <li class="li-drop" id="TOTALLOSSX">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxelTOTALLoss"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <img
                        class="sidebar-icon"
                        :src="TOTALLoss"
                        alt="TOTALLoss"
                      />
                      <h3>TOTAL LOSS ESTIMATOR</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxelTOTALLoss"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'TOTALLOSSX' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionFlushExample"
                >
                  <h6>TOTALLoss</h6>
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
  <TopTimeLineModel />
</template>

<style>
@import "./TopFolderxLink.css";

.FolderXNavbar.sticky-top {
  top: 3.4rem;
  z-index: 99;
}
.myEstiproQws {
  font-size: 19px;
  color: #636363;
  font-weight: 400;
}
</style>
