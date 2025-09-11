<script setup>
import cmx from "../../Icons/cmx.jpeg";
import flexIcon from "../../Icons/flexIcon.png";
import Uplaod from "../../Icons/Uplaod.png";
import Photor from "../../Icons/Photor.png";
import FileAx from "../../Icons/FileAx.png";
import printAX from "../../Icons/printAX.png";
import ChatAx from "../../Icons/ChatAx.png";
import FIcon from "../../Icons/FIcon.png";
import { ref, watch } from "vue";
import vueDraggerNavBar from "./vueDraggerNavBar.vue";

const jobDetails = ref(true);
const props = defineProps(["itemData"]);
const isDraggable = ref(props.itemData.isDraggable);
const emit = defineEmits(["handleDragable", "handleTransfer"]);
const handleDragable = () => {
  emit("handleDragable");
  isDraggable.value = !isDraggable.value;
};
watch(props, () => {
  isDraggable.value = props.itemData.isDraggable;
});
const element = ref(props.itemData.element);
const index = ref(props.itemData.index);
const type = ref(props.itemData.type);

const handleTransfer = (item, tranf, name) => {
  emit("handleTransfer", item, tranf, name);
};
</script>
<template>
  <div class="mainbxayx" v-if="element">
    <vueDraggerNavBar
      :itemData="{
        element: element,
        index: index,
        isDraggable: isDraggable,
      }"
      @handleDragable="handleDragable"
    />

    <!-- <h4>{{ element.name }}</h4> -->
    <div class="boxayx">
      <div class="d-flex justify-content-between gap-2 w-100">
        <div class="w-100">
          <div class="jobcardxyz my-1">
            <div
              class="accordion-button collapsed folderXAccor p-0"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#${element.floderX}` + index"
              aria-expanded="true"
              @click="jobDetails = !jobDetails"
              :style="{
                backgroundColor: 'transparent !important',
              }"
            >
              <div
                class="accomdationset-head px-1"
                :style="{
                  marginLeft: '25px',
                }"
              >
                <p class="m-0">Job details</p>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between my-3" v-if="jobDetails">
            <div class="flodxys">
              <p class="m-0 folderLinks text-start">
                <a href=""> {{ element.floderX }}</a>
              </p>

              <div class="tooltips cursor-pointer text-start">
                <p
                  class="m-0 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  @click="handleDragable"
                >
                  Stage
                  {{ element.STAGE }}
                </p>
                <ul class="dropdown-menu stageDropWe">
                  <!-- Add your dropdown items here -->
                  <li
                    v-if="type !== 'ComeBackData'"
                    @click="
                      handleTransfer(element.id, 'ComeBackData', 'Come Back')
                    "
                  >
                    Come Back
                  </li>
                  <li
                    v-if="type !== 'ArrivalData'"
                    @click="
                      handleTransfer(element.id, 'ArrivalData', 'Arrival')
                    "
                  >
                    Arrival
                  </li>
                  <li
                    v-if="type !== 'RepairPlanData'"
                    @click="
                      handleTransfer(
                        element.id,
                        'RepairPlanData',
                        'Repair Plan'
                      )
                    "
                  >
                    Repair Plan
                  </li>
                  <li
                    v-if="type !== 'SupplementHoldData'"
                    @click="
                      handleTransfer(
                        element.id,
                        'SupplementHoldData',
                        'Supplement Hold'
                      )
                    "
                  >
                    Supplement Hold
                  </li>
                  <li
                    v-if="type !== 'SupplementApproved'"
                    @click="
                      handleTransfer(
                        element.id,
                        'SupplementApproved',
                        'Supplement Approved'
                      )
                    "
                  >
                    Supplement Approved
                  </li>
                  <li
                    v-if="type !== 'Partsholddata'"
                    @click="
                      handleTransfer(element.id, 'Partsholddata', 'Parts hold')
                    "
                  >
                    Parts hold
                  </li>
                  <li
                    v-if="type !== 'Partsdelivereddata'"
                    @click="
                      handleTransfer(
                        element.id,
                        'Partsdelivereddata',
                        'Parts delivered'
                      )
                    "
                  >
                    Parts delivered
                  </li>
                  <li
                    v-if="type !== 'Bodydata'"
                    @click="handleTransfer(element.id, 'Bodydata', 'Body data')"
                  >
                    Body data
                  </li>
                  <li
                    v-if="type !== 'framedata'"
                    @click="
                      handleTransfer(element.id, 'framedata', 'frame data')
                    "
                  >
                    frame data
                  </li>
                </ul>
                <span class="tooltiptext">Drag & Drop </span>
              </div>
            </div>
            <div>
              <!-- <img :src="flexIcon" alt="flexIcon" :style="{ width: '22px' }" /> -->
              <div class="tooltips">
                <img
                  class="cursor-pointer"
                  :src="flexIcon"
                  alt="flexIcon"
                  :style="{ width: '22px' }"
                />
                <span class="tooltiptext">Off Express Repair </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="jobDetails">
          <img
            :src="cmx"
            alt="cmx"
            :style="{
              width: '150px',
              borderRadius: '5px',
            }"
          />
        </div>
      </div>
      <div class="jobDrop">
        <div
          :id="`${element.floderX}` + index"
          class="accordion-collapse collapse"
          :data-bs-parent="`${element.floderX}` + index"
        >
          <div class="card mt-1">
            <div class="card-body py-1">
              <p class="m-0">
                <span class="fw-bold">Estimator:</span>
                {{ element.Estimator }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Body Tech:</span>
                {{ element.BodyTech }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Paint Tech:</span>
                {{ element.PaintTech }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Frame Tech:</span>
                {{ element.FrameTech }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Mech Tech:</span>
                {{ element.MechTech }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Detail Tech:</span>
                {{ element.DetailTech }}
              </p>
            </div>
          </div>

          <div class="pTableFlow">
            <table class="table table-bordered table-sm mt-1 mb-1">
              <thead>
                <tr>
                  <td class="text-start" colspan="5">
                    <span class="fw-bold">Estimate Amount:</span>
                    $00,000.00
                  </td>
                </tr>
                <tr>
                  <td class="text-center fw-bold">
                    Total Hrs
                  </td>
                  <td class="text-center fw-bold">
                    Body
                  </td>
                  <td class="text-center fw-bold">
                    Mech
                  </td>
                  <td class="text-center fw-bold">
                    Frame
                  </td>
                  <td class="text-center fw-bold">
                    Paint
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    {{ element.TotalHrs }}
                  </td>
                  <td class="text-center">
                    {{ element.Body }}
                  </td>
                  <td class="text-center">
                    {{ element.Mech }}
                  </td>
                  <td class="text-center">
                    {{ element.Frame }}
                  </td>
                  <td class="text-center">
                    {{ element.Paint }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pTableFlow">
            <table class="table table-bordered table-sm text-center">
              <thead>
                <tr>
                  <td class="text-center fw-bold">
                    Total Parts
                  </td>
                  <td class="text-center fw-bold">
                    Ordered
                  </td>
                  <td class="text-center fw-bold">
                    Delivered
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    {{ element.TotalParts }}
                  </td>
                  <td class="text-center">
                    {{ element.Ordered }}
                  </td>
                  <td class="text-center">
                    {{ element.Delivered }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="comTarget" v-if="jobDetails">
        <div class="pt-3 pb-2">
          <div class="d-flex justify-content-between">
            <p class="m-0">
              <span class="comTarget_span">Target:</span>
              <span class="comTarget_data"> {{ element.Target }}</span>
            </p>
            <p class="m-0">
              <span class="comTarget_span">Days:</span>
              <span class="comTarget_data">{{ element.DaystoRepair }}</span>
            </p>
          </div>
          <p class="m-0">
            <span class="comTarget_span">Arrival:</span>
            <span class="comTarget_data">{{ element.Arrival }}</span>
          </p>
          <p class="m-0">
            <span class="comTarget_span">Started:</span>
            <span class="comTarget_data"> {{ element.Arrival }}</span>
          </p>
          <p class="m-0">
            <span class="comTarget_span">Completed:</span>
            <span class="comTarget_data">{{ element.Completed }}</span>
          </p>
        </div>
      </div>
      <hr class="yearhr" />
      <div class="mt-1 comTarget yeardataaxy" v-if="jobDetails">
        <p class="m-0">
          {{ element.YYYY }} {{ element.Make }}
          {{ element.Model }}
        </p>
        <p class="m-0">
          {{ element.LastName }},
          {{ element.FirstName }}
        </p>
        <p class="m-0">
          {{ element.Insurance }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
}

.mainbxayx {
  margin-bottom: 1rem;
}

.boxayx {
  padding: 0.5rem 0.7rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.jobcardxyz {
  border: 1px solid #f5f5f6;
  background-color: #e0ebfd87;
  border-radius: 5px;
  padding: 3px 10px;
  color: #eee;
}

.jobcardxyz p {
  color: #0b0a12;
  opacity: 0.7;
}

.jobcardxyz .accordion-button.folderXAccor::after {
  opacity: 0.7;
}

.flodxys p,
.flodxys p a {
  color: #0b0a12;
  font-weight: 500;
}

.comTarget {
  text-align: left;
}

span.comTarget_span {
  font-weight: 600;
  color: #333333;
}

span.comTarget_span {
  margin-right: 0.5rem;
}

span.comTarget_data {
  color: #0b0a12;
  opacity: 0.7;
  font-size: 1rem;
}

hr.yearhr {
  border-color: rgba(0, 102, 255, 0.1);
  border-width: 2px;
  opacity: 1;
  margin: 0.5rem 0;
}

.yeardataaxy {
  padding-top: 0.5rem;
}

.yeardataaxy p {
  color: #000;
  opacity: 0.7;
  line-height: 1.4;
}
ul.dropdown-menu.stageDropWe li {
  padding: 5px 17px;
  border-bottom: 1px solid #e8e4e4;
  font-size: 14px;
}
ul.dropdown-menu.stageDropWe li:hover {
  background-color: #e0ebfd;
}
</style>
