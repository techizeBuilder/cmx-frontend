<script setup>
import scrollTopIcons from "../assets/scrollTopIcons.png";
import PlusIcons from "./Icons/PlusIcons.png";
import EstimateAppointmentMain from "./EstimateAppointment/EstimateAppointmentMain.vue";
import OfficeXTopDetials from "./OfficeXTopDetials.vue";
import ReadyforpickupMain from "./Readyforpickup/ReadyforpickupMain.vue";
import DeliveredpendingMain from "./Deliveredpending/DeliveredpendingMain.vue";

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
  <div class="px-3">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">OfficeX</router-link>
      </div>
    </div>

    <OfficeXTopDetials :showhideaccordion="showhideaccordion" />

    <div class="sectionaccomadation mt-5">
      <ul class="link-section">
        <li class="li-drop">
          <div class="accordion accordion-flush" id="accordionesappo">
            <div class="accordion-item">
              <div class="pages d-flex align-items-center">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseEstimateapp"
                  aria-expanded="true"
                >
                  <div class="accomdationset-head">
                    <h3>Estimate Appointment</h3>
                  </div>
                </div>
                <div class="accomdation-viewmore">
                  <div class="img">
                    <div class="dropdown">
                      <a
                        href="javascript:void(0)"
                        type="button"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <img
                          :src="PlusIcons"
                          alt="PlusIcons"
                          :style="{ width: '20px' }"
                        />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <router-link
                            to="/newestimateappoitment"
                            class="dropdown-item"
                            >New Estimate Appointment</router-link
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseEstimateapp"
                class="accordion-collapse collapse show"
                :class="[
                  showhideaccordionref == 'estAppText' ? 'show' : 'hide',
                ]"
                data-bs-parent="#accordionesappo"
              >
                <EstimateAppointmentMain />
              </div>
            </div>
          </div>
        </li>
        <li class="li-drop">
          <div class="accordion accordion-flush" id="accordioneDropOffApp">
            <div class="accordion-item">
              <div class="pages d-flex align-items-center">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseDropOffApp"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <h3>Drop Off Appointment</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseDropOffApp"
                class="accordion-collapse collapse"
                :class="[
                  showhideaccordionref == 'DropOffText' ? 'show' : 'hide',
                ]"
                data-bs-parent="#accordioneDropOffApp"
              >
                <p>Drop Off Appointment</p>
              </div>
            </div>
          </div>
        </li>
        <li class="li-drop">
          <div class="accordion accordion-flush" id="accordioneReadypic">
            <div class="accordion-item">
              <div class="pages d-flex align-items-center">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseReadypic"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <h3>Ready For Pickup</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseReadypic"
                class="accordion-collapse collapse"
                :class="[
                  showhideaccordionref == 'ReadyforpickupText'
                    ? 'show'
                    : 'hide',
                ]"
                data-bs-parent="#accordioneReadypic"
              >
                <ReadyforpickupMain />
              </div>
            </div>
          </div>
        </li>
        <li class="li-drop">
          <div class="accordion accordion-flush" id="accordioneDelivered">
            <div class="accordion-item">
              <div class="pages d-flex align-items-center">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseDelivered"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <h3>Delivered - Final Pending</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseDelivered"
                class="accordion-collapse collapse"
                data-bs-parent="#accordioneDelivered"
              >
                <DeliveredpendingMain />
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
</template>

<style></style>
