<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import CompletedStages from "./Stages/CompletedStages.vue";
import { useStore } from "vuex";
import { computed, watch } from "vue";
import _ from "lodash";

const store = useStore();
const storeSlide = computed(() => store.getters.getSlideNum);
import ADASStages from "./Stages/ADASStages.vue";

import vueDraggerData from "./vueDraggerData.vue";

import TimelineModul from "./Stages/TimelineModul.vue";

const modules = [Pagination, Navigation];
import vuedraggable from "vuedraggable";
import { ref } from "vue";
const colorChage = (e, list) => {
  console.log(e);
  console.log(list);
};
const isDraggable = ref(false);
const handleDragable = () => {
  isDraggable.value = !isDraggable.value;
};

const ComeBackData = ref([
  {
    id: 1,
    Color: "#CFAF00",
    floderX: "XXXXXX001",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
  {
    id: 2,
    Color: "#CFAF00",
    floderX: "XXXXXX002",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const ArrivalData = ref([
  {
    id: 3,
    Color: "#C0FFB5",
    floderX: "XXXXXX003",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
  {
    id: 4,
    Color: "#C0FFB5",
    floderX: "XXXXXX004",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const RepairPlanData = ref([
  {
    id: 5,
    Color: "#FFF975",
    floderX: "XXXXXX005",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
  {
    id: 6,
    Color: "#FFF975",
    floderX: "XXXXXX006",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const SupplementHoldData = ref([
  {
    id: 7,
    Color: "#FFC487",
    floderX: "XXXXXX007",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
  {
    id: 8,
    Color: "#FFC487",
    floderX: "XXXXXX008",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const SupplementApproved = ref([
  {
    id: 9,
    Color: "#FF8200",
    floderX: "XXXXXX009",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
  {
    id: 10,
    Color: "#FF8200",
    floderX: "XXXXXX010",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const Partsholddata = ref([
  {
    id: 11,
    Color: "#CECECE",
    floderX: "XXXXXX011",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const Partsdelivereddata = ref([
  {
    id: 12,
    Color: "#787878",
    floderX: "XXXXXX012",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const Bodydata = ref([
  {
    id: 13,
    Color: "#ccdff0",
    floderX: "XXXXXX013",
    STAGE: "",
    Target: "25/01/2024",
    DaystoRepair: "001",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const framedata = ref([
  {
    id: 14,
    Color: "#ccdff0",
    floderX: "XXXXXX0114",
    STAGE: "",
    Target: "26/04/2024",
    DaystoRepair: "100",
    Arrival: "MM/DD/YYYY HH:MM PM",
    Completed: "MM/DD/YYYY",
    YYYY: "2024",
    Make: "cars",
    Model: "vxi New",
    LastName: "Patidar",
    FirstName: "Manash",
    Insurance: "",
    Estimator: "Full Name",
    BodyTech: "Full Name",
    PaintTech: "Full Name",
    FrameTech: "Full Name",
    MechTech: "Full Name",
    DetailTech: "Full Name",
    PreScan: "-",
    PostScan: "-",
    ADAS: "-",
    EstimateAmount: "$00,000.00",
    TotalHrs: "28.5",
    Body: "14.0",
    Mech: "2.0",
    Frame: "4.5",
    Paint: "8.0",
    TotalParts: "005",
    Ordered: "002",
    Delivered: "003",
  },
]);
const pagination = {
  clickable: true, // Allow clicking on pagination bullets
};
const mySwiper = ref(null);

function clickPaginationBullet(index) {
  const paginationBullets = mySwiper.value?.$el.querySelectorAll(
    ".swiper-pagination-bullet"
  );
  if (index >= 0 && index < paginationBullets.length) {
    paginationBullets[index].click();
  }
}
watch(storeSlide, () => {
  clickPaginationBullet(storeSlide.value);
});

const idValue = ref(null);
const tranfValue = ref(null);
const nameValue = ref(null);
const handleTransfer = (id, tranf, name) => {
  idValue.value = id;
  tranfValue.value = tranf;
  nameValue.value = name;
  var modal = document.getElementById("myModal");
  var modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
};

const handleYesModel = () => {
  handleTransferData(idValue.value, tranfValue.value);
};

const handleTransferData = (id, tranf) => {
  const arrays = [
    ComeBackData,
    ArrivalData,
    RepairPlanData,
    SupplementHoldData,
    SupplementApproved,
    Partsholddata,
    Partsdelivereddata,
    Bodydata,
    framedata,
  ];
  let sourceArray = null;
  let targetArray = ref([]);

  // Find the source array that contains the item with the given id
  for (const arr of arrays) {
    if (arr.value.some((item) => item.id === id)) {
      sourceArray = arr;
      break;
    }
  }

  if (!sourceArray) {
    console.log(`Item with id ${id} not found in any array.`);
    return;
  }

  // Determine the target array based on the tranf parameter
  switch (tranf) {
    case "ComeBackData":
      targetArray = ComeBackData;
      break;
    case "ArrivalData":
      targetArray = ArrivalData;
      break;
    case "RepairPlanData":
      targetArray = RepairPlanData;
      break;
    case "SupplementHoldData":
      targetArray = SupplementHoldData;
      break;
    case "SupplementApproved":
      targetArray = SupplementApproved;
      break;
    case "Partsholddata":
      targetArray = Partsholddata;
      break;
    case "Partsdelivereddata":
      targetArray = Partsdelivereddata;
      break;
    case "Bodydata":
      targetArray = Bodydata;
      break;
    case "framedata":
      targetArray = framedata;
      break;
    default:
      console.log(`Invalid transfer target: ${tranf}`);
      return;
  }

  // Transfer the entire source array to the target array
  if (sourceArray.value.length > 0) {
    if (targetArray.value !== sourceArray.value) {
      const itemToMove = sourceArray.value.find((item) => item.id === id);
      targetArray.value.push(itemToMove);
      sourceArray.value.pop();
    }
  }
};
</script>

<template>
  <div class="FlowXbody FlowXbodymani">
    <swiper
      ref="mySwiper"
      class="mySwiper"
      :breakpoints="{
        1900: {
          slidesPerView: 5,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      }"
      :modules="modules"
      :slides-per-view="3"
      :pagination="pagination"
      :navigation="true"
    >
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <div class="accordion accordion-flush" id="accordionComeBack">
            <div class="flowbox ComeBackA">
              <div
                class="accordion-button collapsed folderXAccor"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapsecmsComeBack"
                aria-expanded="true"
              >
                <div
                  class="accomdationset-head"
                  :style="{ gap: '20px', marginLeft: '35px' }"
                >
                  <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                  <h3>Come Back</h3>
                </div>
              </div>
            </div>
            <div
              id="flush-collapsecmsComeBack"
              class="accordion-collapse collapse show show"
              data-bs-parent="#accordionComeBack"
              :style="{ minWidth: '350px', zIndex: '9999999' }"
            >
              <vuedraggable
                id="first"
                :disabled="!isDraggable"
                @change="colorChage"
                data-source="juju"
                :list="ComeBackData"
                class="list-group manish"
                group="a"
                item-key="name"
              >
                <template #item="{ element, index }">
                  <vueDraggerData
                    :itemData="{
                      element: element,
                      index: index,
                      isDraggable: isDraggable,
                      type: 'ComeBackData',
                    }"
                    @handleDragable="handleDragable"
                    @handleTransfer="handleTransfer"
                  />
                </template>
              </vuedraggable>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <div class="accordion accordion-flush" id="accordionArrivalAXD">
            <div class="flowbox ArrivalA">
              <div
                class="accordion-button collapsed folderXAccor"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapsecmsArrivalAXD"
                aria-expanded="true"
              >
                <div
                  class="accomdationset-head"
                  :style="{ gap: '20px', marginLeft: '35px' }"
                >
                  <p class="NumTos m-0">{{ ArrivalData.length }}</p>
                  <h3>Arrival</h3>
                </div>
              </div>
            </div>
            <div
              id="flush-collapsecmsArrivalAXD"
              class="accordion-collapse collapse show text-left"
              data-bs-parent="#accordionArrivalAXD"
            >
              <vuedraggable
                id="first"
                data-source="juju"
                :list="ArrivalData"
                group="a"
                item-key="name"
                :disabled="!isDraggable"
              >
                <template #item="{ element, index }">
                  <vueDraggerData
                    :itemData="{
                      element: element,
                      index: index,
                      isDraggable: isDraggable,
                      type: 'ArrivalData',
                    }"
                    @handleDragable="handleDragable"
                    @handleTransfer="handleTransfer"
                  />
                </template>
              </vuedraggable>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <div
            class="accordion accordion-flush listScrollAcco"
            id="accordionRepairPlan"
          >
            <div class="flowbox RepairPlanA">
              <div
                class="accordion-button collapsed folderXAccor"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseRepairPlan"
                aria-expanded="true"
              >
                <div
                  class="accomdationset-head"
                  :style="{ gap: '20px', marginLeft: '35px' }"
                >
                  <p class="NumTos m-0">
                    {{ RepairPlanData.length }}
                  </p>
                  <h3>Repair Plan</h3>
                </div>
              </div>
            </div>
            <div
              id="flush-collapseRepairPlan"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionRepairPlan"
              :style="{ minWidth: '350px' }"
            >
              <vuedraggable
                id="first"
                data-source="juju"
                :list="RepairPlanData"
                group="a"
                item-key="name"
                :disabled="!isDraggable"
              >
                <template #item="{ element, index }">
                  <vueDraggerData
                    :itemData="{
                      element: element,
                      index: index,
                      isDraggable: isDraggable,
                      type: 'RepairPlanData',
                    }"
                    @handleDragable="handleDragable"
                    @handleTransfer="handleTransfer"
                  />
                </template>
              </vuedraggable>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <div
            class="accordion accordion-flush listScrollAcco"
            id="accordionSupplementHoldStages"
          >
            <div>
              <div class="flowbox SupplementHoldA">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSupplementHoldStages"
                  aria-expanded="true"
                >
                  <div
                    class="accomdationset-head"
                    :style="{ gap: '20px', marginLeft: '35px' }"
                  >
                    <p class="NumTos m-0">
                      {{ SupplementHoldData.length }}
                    </p>
                    <h3>Supplement Hold</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseSupplementHoldStages"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionSupplementHoldStages"
                :style="{ minWidth: '350px' }"
              >
                <vuedraggable
                  id="first"
                  data-source="juju"
                  :list="SupplementHoldData"
                  group="a"
                  item-key="name"
                  :disabled="!isDraggable"
                >
                  <template #item="{ element, index }">
                    <vueDraggerData
                      :itemData="{
                        element: element,
                        index: index,
                        isDraggable: isDraggable,
                        type: 'SupplementHoldData',
                      }"
                      @handleDragable="handleDragable"
                      @handleTransfer="handleTransfer"
                    />
                  </template>
                </vuedraggable>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionSupplementApprovedStages"
              >
                <div>
                  <div class="flowbox SupplementApprovedA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseSupplementApprovedStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">
                          {{ SupplementApproved.length }}
                        </p>
                        <h3>Supplement Approved</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseSupplementApprovedStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionSupplementApprovedStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <vuedraggable
                      id="first"
                      data-source="juju"
                      :list="SupplementApproved"
                      group="a"
                      item-key="name"
                      :disabled="!isDraggable"
                    >
                      <template #item="{ element, index }">
                        <vueDraggerData
                          :itemData="{
                            element: element,
                            index: index,
                            isDraggable: isDraggable,
                            type: 'SupplementApproved',
                          }"
                          @handleDragable="handleDragable"
                          @handleTransfer="handleTransfer"
                        />
                      </template>
                    </vuedraggable>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionPartsHoldStages"
              >
                <div>
                  <div class="flowbox PartsHoldStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsePartsHoldStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ Partsholddata.length }}</p>
                        <h3>Parts Hold</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsePartsHoldStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionPartsHoldStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <vuedraggable
                      id="first"
                      data-source="juju"
                      :list="Partsholddata"
                      group="a"
                      item-key="name"
                      :disabled="!isDraggable"
                    >
                      <template #item="{ element, index }">
                        <vueDraggerData
                          :itemData="{
                            element: element,
                            index: index,
                            isDraggable: isDraggable,
                            type: 'Partsholddata',
                          }"
                          @handleDragable="handleDragable"
                          @handleTransfer="handleTransfer"
                        />
                      </template>
                    </vuedraggable>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionPartsDeliveredStages"
              >
                <div>
                  <div class="flowbox PartsDeliveredStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsePartsDeliveredStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">
                          {{ Partsdelivereddata.length }}
                        </p>
                        <h3>Parts Delivered</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsePartsDeliveredStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionPartsDeliveredStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <vuedraggable
                      id="first"
                      data-source="juju"
                      :list="Partsdelivereddata"
                      group="a"
                      item-key="name"
                      :disabled="!isDraggable"
                    >
                      <template #item="{ element, index }">
                        <vueDraggerData
                          :itemData="{
                            element: element,
                            index: index,
                            isDraggable: isDraggable,
                            type: 'Partsdelivereddata',
                          }"
                          @handleDragable="handleDragable"
                          @handleTransfer="handleTransfer"
                        />
                      </template>
                    </vuedraggable>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionBodyStages"
              >
                <div>
                  <div class="flowbox BodyStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseBodyStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ Bodydata.length }}</p>
                        <h3>Body</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseBodyStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionBodyStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <vuedraggable
                      id="first"
                      data-source="juju"
                      :list="Bodydata"
                      group="a"
                      item-key="name"
                      :disabled="!isDraggable"
                    >
                      <template #item="{ element, index }">
                        <vueDraggerData
                          :itemData="{
                            element: element,
                            index: index,
                            isDraggable: isDraggable,
                            type: 'Bodydata',
                          }"
                          @handleDragable="handleDragable"
                          @handleTransfer="handleTransfer"
                        />
                      </template>
                    </vuedraggable>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionFrameStages"
              >
                <div>
                  <div class="flowbox FrameStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFrameStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Frame</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseFrameStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionFrameStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <vuedraggable
                      id="first"
                      data-source="juju"
                      :list="framedata"
                      group="a"
                      item-key="name"
                      :disabled="!isDraggable"
                    >
                      <template #item="{ element, index }">
                        <vueDraggerData
                          :itemData="{
                            element: element,
                            index: index,
                            isDraggable: isDraggable,
                            type: 'framedata',
                          }"
                          @handleDragable="handleDragable"
                          @handleTransfer="handleTransfer"
                        />
                      </template>
                    </vuedraggable>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionMechanicalStages"
              >
                <div>
                  <div class="flowbox MechanicalStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseMechanicalStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Mechanical</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseMechanicalStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionMechanicalStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <MechanicalStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionSubletOffsiteStages"
              >
                <div>
                  <div class="flowbox SubletOffsiteStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseSubletOffsiteStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Sublet | Offsite</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseSubletOffsiteStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionSubletOffsiteStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <SubletOffsiteStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionExpressBodyStages"
              >
                <div>
                  <div class="flowbox ExpressBodyStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseExpressBodyStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Express Body</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseExpressBodyStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionExpressBodyStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <ExpressBodyStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionExpressPaintStages"
              >
                <div>
                  <div class="flowbox ExpressPaintStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseExpressPaintStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Express Paint</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseExpressPaintStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionExpressPaintStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <ExpressPaintStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionPaintStages"
              >
                <div>
                  <div class="flowbox PaintStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsePaintStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Paint</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsePaintStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionPaintStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <PaintStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionReassemblyStages"
              >
                <div>
                  <div class="flowbox ReassemblyStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseReassemblyStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Reassembly</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseReassemblyStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionReassemblyStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <ReassemblyStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionADASStages"
              >
                <div>
                  <div class="flowbox ADASStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseADASStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>ADAS</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseADASStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionADASStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <ADASStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-no-swiping w-100 flowXbodyAxy">
          <ul class="link-section">
            <li class="li-drop listScroll">
              <div
                class="accordion accordion-flush listScrollAcco"
                id="accordionCompletedStages"
              >
                <div>
                  <div class="flowbox CompletedStagesA">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseCompletedStages"
                      aria-expanded="true"
                    >
                      <div
                        class="accomdationset-head"
                        :style="{ gap: '20px', marginLeft: '35px' }"
                      >
                        <p class="NumTos m-0">{{ ComeBackData.length }}</p>
                        <h3>Completed</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapseCompletedStages"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionCompletedStages"
                    :style="{ minWidth: '350px' }"
                  >
                    <CompletedStages />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <div class="modal" id="myModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">Update Stage?:- {{ nameValue }}?</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-footer">
          <button
            @click="handleYesModel"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Yes
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.FlowXbody ul.link-section .li-drop .accomdationset-head h3 {
  text-wrap: nowrap;
}

.flowXbodyAxy .accordion {
  border: 1px solid #eee;
  border-radius: 5px;
}

.flowXbodyAxy .accordion .flowbox {
  box-shadow: 0px 4px 4px 0px #00000040;
}

.flowXbodyAxy .accordion .flowbox .accordion-button.folderXAccor {
  padding: 13px 20px !important;
}

.flowXbodyAxy .accordion .accordion-collapse {
  margin: 1rem 0rem;
  padding: 0 0.5rem;
}

p.NumTos.m-0 {
  width: 26px;
  height: 20px;
  background-color: #eeeeee;
  text-align: center;
  border-radius: 4px;
  vertical-align: middle;
  font-size: 13px;
  font-weight: 600;
}

.flowbox {
  position: relative;
}

.flowbox:before {
  content: "";
  position: absolute;
  left: 0px;
  height: 100%;
  width: 20px;
  z-index: 99;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.ComeBackA:before {
  border-left: 11px solid #cfaf00;
}

.ArrivalA:before {
  border-left: 11px solid #c0ffb5;
}

.RepairPlanA:before {
  border-left: 11px solid #fff975;
}

.SupplementHoldA:before {
  border-left: 11px solid #ffc487;
}

.SupplementApprovedA:before {
  border-left: 11px solid #ff8200;
}

.PartsHoldStagesA:before {
  border-left: 11px solid #cecece;
}

.PartsDeliveredStagesA:before {
  border-left: 11px solid #787878;
}

.BodyStagesA:before {
  border-left: 11px solid #ccdff0;
}

.FrameStagesA:before {
  border-left: 11px solid #ccdff0;
}

.MechanicalStagesA:before {
  border-left: 11px solid #ccdff0;
}

.SubletOffsiteStagesA:before {
  border-left: 11px solid #ccdff0;
}

.ExpressBodyStagesA:before {
  border-left: 11px solid #0ff;
}

.ExpressPaintStagesA:before {
  border-left: 11px solid #0ff;
}

.PaintStagesA:before {
  border-left: 11px solid #0ff;
}

.ReassemblyStagesA:before {
  border-left: 11px solid #3685ff;
}

.ADASStagesA:before {
  border-left: 11px solid #e69b7a;
}

.DetailStagesA:before {
  border-left: 11px solid #b947ff;
}

.CompletedStagesA:before {
  border-left: 11px solid #027a2b;
}

.TotalLossStagesA:before {
  border-left: 11px solid #d30e0e;
}

.tooltips {
  position: relative;
}

.tooltips .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 14px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltips:hover .tooltiptext {
  visibility: visible;
}

.pTableFlow {
  border-radius: 3px;
}

.pTableFlow table.table td {
  font-size: 16px;
}

.boxAX {
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #cacaca;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.topVgZ {
  padding: 4px 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.StagNum {
  border-radius: 5px;
  text-align: center;
  width: 30px;
  height: 25px;
  background-color: transparent;
  border: 1px solid #000;
  font-weight: 600;
}

.StagNum:hover {
  box-shadow: none;
}

input.StagNum:focus,
.StagNum:focus-visible {
  box-shadow: none;
  outline: none;
}

.list-group-item {
  border: none;
  margin: 0 20px;
}

.accordion-collapse.collapse {
  max-height: 420px;
  overflow-y: auto;
}
</style>
