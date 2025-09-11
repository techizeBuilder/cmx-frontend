<script setup>
import cmx from "../Icons/cmx.jpeg";
import flexIcon from "../Icons/flexIcon.png";
import Uplaod from "../Icons/Uplaod.png";
import Photor from "../Icons/Photor.png";
import FileAx from "../Icons/FileAx.png";
import printAX from "../Icons/printAX.png";
import ChatAx from "../Icons/ChatAx.png";
import FIcon from "../Icons/FIcon.png";
import { ref, watch } from "vue"; 

const jobDetails = ref(true);
const props = defineProps(["itemData"]);
const isDraggable = ref(props.itemData.isDraggable);
const emit = defineEmits(["handleDragable"]);
const handleDragable = () => {
  emit("handleDragable");
  isDraggable.value = !isDraggable.value;
};
watch(props, () => {
  isDraggable.value = props.itemData.isDraggable;
});
const element = ref(props.itemData.element);
const index = ref(props.itemData.index);
</script>
<template>
  <div class="list-group-item p-0 mb-4 boxAX" v-if="element">
    <vueDraggerNavBar
      :itemData="{
        element: element,
        index: index,
        isDraggable: isDraggable,
      }"
      @handleDragable="handleDragable"
    />
    <div class="card-body py-1 px-0">
      <div class="card border-0 px-0 mt-1">
        <div class="card-body px-3 border-0 py-1">
          <h4>{{ element.name }}</h4>
          <div class="d-flex justify-content-between gap-2">
            <div class="w-100">
              <div class="card pages py-1 px-2">
                <div class="card-body p-0">
                  <div
                    class="accordion-button collapsed folderXAccor p-0"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#${element.floderX}` + index"
                    aria-expanded="true"
                    @click="jobDetails = !jobDetails"
                  >
                    <div
                      class="accomdationset-head"
                      :style="{
                        gap: '20px',
                        marginLeft: '35px',
                      }"
                    >
                      <h3>Job details</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card py-1 px-2 mt-1" v-if="jobDetails">
                <div class="card-body p-0">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="m-0 folderLinks">
                        <a href=""> {{ element.floderX }}</a>
                      </p>

                      <div class="tooltips cursor-pointer">
                        <p class="m-0 folderLinks" @click="handleDragable">
                          STAGE
                          {{ element.STAGE }}
                        </p>
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
                <table
                  class="table table-bordered table-sm mt-1 text-center mb-1"
                >
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
          <div class="card mt-1 comTarget" v-if="jobDetails">
            <div class="card-body py-1">
              <div class="d-flex justify-content-between">
                <p class="m-0">
                  <span class="fw-bold">Target:</span>
                  {{ element.Target }}
                </p>
                <p class="m-0">
                  <span class="fw-bold">Days:</span>
                  {{ element.DaystoRepair }}
                </p>
              </div>
              <p class="m-0">
                <span class="fw-bold">Arrival:</span>
                {{ element.Arrival }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Started:</span>
                {{ element.Arrival }}
              </p>
              <p class="m-0">
                <span class="fw-bold">Completed:</span>
                {{ element.Completed }}
              </p>
            </div>
          </div>
          <div class="card mt-1 comTarget" v-if="jobDetails">
            <div class="card-body py-1">
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
      </div>
    </div>
  </div>
</template>
<style scoped>
.FlowXbody ul.link-section .li-drop .accomdationset-head h3 {
  text-wrap: nowrap;
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

.pages:before {
  content: "";
  position: absolute;
  left: -20px;
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
}
</style>
