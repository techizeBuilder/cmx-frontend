<script setup>
import { ref } from "vue";

import expandImg from "../assets/expandImg.png";
import zoomout from "../assets/zoomout.png";
import scrollTopIcons from "../assets/scrollTopIcons.png";
import TopFolderxLink from "./TopFolderxLink.vue";

import Payment from "./Icons/Payment.png";
import Comments from "./Icons/Comments.png";
import Chatlink from "./Icons/Chatlink.png";
import ESign from "./Icons/ESign.png";
import Date from "./Icons/Date.png";
import CUSTOMER from "./Icons/CUSTOMER.png";
import VEHICLE from "./Icons/VEHICLE.png";
import INSURANCE from "./Icons/INSURANCE.png";
import PHOTOS from "./Icons/PHOTOS.png";
import ESTIMATE from "./Icons/Estimate.png";
import PRODUCTION from "./Icons/PRODUCTION.png";
import STAFF from "./Icons/STAFF.png";
import PARTS from "./Icons/PARTS.png";
import SUBLET from "./Icons/SUBLET.png";
import DOCUMENTS from "./Icons/DOCUMENTS.png";
import ACTIVITY from "./Icons/ACTIVITY.png";
import REPORTS from "./Icons/REPORTS.png";
import FINAL from "./Icons/FINAL.png";
import TOTALLoss from "./Icons/TOTALLoss.png";

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

/* const showhideaccordionref = ref('')

function showhideaccordion(id) {
    console.log("id",id)
    showhideaccordionref.value = id
}  */

function scrollToTop() {
  window.scrollTo(0, 0);
}
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
  <nav
    class="navbar sticky-top py-0 FolderXNavbar"
    :style="{ backgroundColor: '#D8D8D8', borderRadius: '2px' }"
  >
    <div class="floderXhe">
      <p class="mb-0 px-2 py-0">
        <small
          >RO# XXXXXXXX | Owner Last Name, Owner First name | YEAR, MAKE,
          MODEL | 17 DIGIT VIN#</small
        >
      </p>
    </div>
  </nav>
  <div class="px-3">
    <div class="d-sm-flex align-items-center justify-content-end my-3">
      <div class="dropdown mb-sm-0 text-end">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
        >
          OPTIONS
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"> Open New RO</a></li>
          <li><a class="dropdown-item" href="#">Print Tags</a></li>
          <li><a class="dropdown-item" href="#">Print Final</a></li>
        </ul>
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
    <div class="cmxdashboard-set-main mt-3">
      <div class="d-sm-flex align-items-center justify-content-end mt-0">
        <div class="zoom-sign d-flex justify-content-end">
          <div class="img">
            <img class="zoomout" :src="zoomout" alt="zoomout" />
          </div>
          <div class="img">
            <img :src="expandImg" alt="expandImg" />
          </div>
        </div>
      </div>

      <div class="sectionaccomadation" :style="{ height: '240vh' }">
        <ul class="link-section">
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
                  <h6>PRODUCTION</h6>
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
                  <h6>PARTS</h6>
                </div>
              </div>
            </div>
          </li>
          <!-- <li class="li-drop" id="SUBLETX">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <div class="pages  ">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsecmxelSUBLET"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="SUBLET" alt="SUBLET" />
                                            <h3>SUBLET </h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsecmxelSUBLET" class="accordion-collapse collapse" :class="[showhideaccordionref=='SUBLETX'?'show':'hide']"
                                    data-bs-parent="#accordionFlushExample">
                                    <h6>SUBLET </h6>
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
          <li class="li-drop" id="ACTIVITYX">
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
          </li>
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
                  <h6>REPORTS</h6>
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
          <li class="li-drop" id="TOTALLOSSX">
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
          </li>
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
</template>

<style>
@import "./TopFolderxLink.css";

.FolderXNavbar.sticky-top {
  top: 3.4rem;
  z-index: 99;
}
</style>
