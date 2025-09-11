<script setup>
import flexIcon from "../../Icons/flexIcon.png";
import Uplaod from "../../Icons/Uplaod.png";
import Photor from "../../Icons/Photor.png";
import FileAx from "../../Icons/FileAx.png";
import printAX from "../../Icons/printAX.png";
import ChatAx from "../../Icons/ChatAx.png";
import FIcon from "../../Icons/FIcon.png";
import { ref, watch } from "vue";
import cmx from "../../Icons/cmx.jpeg";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const isOpenTimeline = ref(false);
const isOpenTimelineupdate = ref(false);

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

const colors = {
  NotApply: "#D9D9D9",
  NeedAction: "#F0F511",
  processed: "#2858FF",
  completed: "#008836",
};
const timeLineColor = ref({});
const timeLine = ref(null);
const handleColor = (value, col) => {
  if (col) {
    timeLineUpdate.value[
      Object.keys(colors).find((key) => colors[key] === col)
    ] = true;
    updateId.value = Object.keys(colors).find((key) => colors[key] === col);
  }
  isOpenTimelineupdate.value = !isOpenTimelineupdate.value;
  timeLine.value = value;
};
const handleClose = () => {
  isOpenTimelineupdate.value = false;
  timeLineColor.value[timeLine.value] = colors[updateId.value];
  timeLine.value = null;
  timeLineUpdate.value = {
    default: true,
  };
  updateId.value = "default";
};

const timeLineUpdate = ref({
  default: true,
});
const updateId = ref("default");
const handleUpadte = (value) => {
  updateId.value = value;
};
watch(
  timeLineUpdate,
  () => {
    for (let key in timeLineUpdate.value) {
      if (key !== updateId.value) {
        timeLineUpdate.value[key] = false;
      }
    }
  },
  { deep: true }
);

const startFancy = () => {
  const fancyboxImages = [{ src: cmx }];
  Fancybox.show(fancyboxImages);
};
</script>
<template>
  <div
    class="topVgZ d-flex justify-content-between position-relative"
    :style="{ backgroundColor: element.Color }"
  >
    <div class="d-flex gap-2 align-items-center">
      <span class="StagNum">{{ index + 1 }}</span>
      <div class="tooltips">
        <img class="cursor-pointer" :src="Uplaod" alt="Uplaod" />
        <span class="tooltiptext">Open FoldX </span>
      </div>
      <div class="tooltips" @click="isOpenTimeline = false">
        <!-- <img
          class="cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#PhotoViewModul"
          :src="Photor"
          alt="Photor"
        /> -->
        <img
          class="cursor-pointer"
          @click="startFancy()"
          :src="Photor"
          alt="Photor"
        />
        <span class="tooltiptext">View Photos </span>
      </div>
      <div class="tooltips">
        <img class="cursor-pointer" :src="FileAx" alt="FileAx" />
        <span class="tooltiptext">View Estimate </span>
      </div>
      <div class="tooltips">
        <img class="cursor-pointer" :src="printAX" alt="printAX" />
        <span class="tooltiptext">Print File </span>
      </div>

      <div class="tooltips">
        <!-- <img class="cursor-pointer" data-bs-toggle="modal" data-bs-target="#TimelineModul" :src="ChatAx" alt="ChatAx" /> -->
        <img
          class="cursor-pointer"
          @click="isOpenTimeline = !isOpenTimeline"
          :src="ChatAx"
          alt="ChatAx"
        />

        <span class="tooltiptext">Timeline </span>
      </div>
      <div class="tooltips">
        <img class="cursor-pointer" :src="FIcon" alt="FIcon" />
        <span class="tooltiptext">Flag Tech </span>
      </div>
    </div>
    <div>
      <i
        class="fa-solid fa-grip-vertical"
        role="button"
        @click="handleDragable"
        :style="{
          color: isDraggable ? '#0066ee' : null,
        }"
      ></i>
    </div>

    <div class="timeLineBox OpenTimelineupdate" v-show="isOpenTimelineupdate">
      <div class="card-body">
        <div class="card mt-">
          <div class="timeLineBoxtop">
            <p class="m-0">RO Timeline update</p>
            <div class="cursor-pointer" @click="handleClose">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div class="pl-4 p8" style="padding: 4px 8px;">
            <p class="m-0">Select a category</p>
          </div>

          <div class="pTableFlow px-5 mt-4 mb-4">
            <table class="table table-bordered table-sm">
              <tbody>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span class="DotA"></span>
                    </div>
                  </td>
                  <td class="text-center TimeAZ justify-content-center">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="mySwitch"
                        name="darkmode"
                        v-model="timeLineUpdate.default"
                        @click="handleUpadte('default')"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ background: '#D9D9D9' }"
                      ></span>
                      Not Apply
                    </div>
                  </td>
                  <td class="text-center TimeAZ justify-content-center">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="mySwitch"
                        name="darkmode"
                        v-model="timeLineUpdate.NotApply"
                        @click="handleUpadte('NotApply')"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ background: '#F0F511' }"
                      ></span>
                      Needs Action
                    </div>
                  </td>
                  <td class="text-center TimeAZ justify-content-center">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="mySwitch"
                        name="darkmode"
                        v-model="timeLineUpdate.NeedAction"
                        @click="handleUpadte('NeedAction')"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ background: '#2858FF' }"
                      ></span>
                      Processed
                    </div>
                  </td>
                  <td class="text-center TimeAZ justify-content-center">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="mySwitch"
                        name="darkmode"
                        v-model="timeLineUpdate.processed"
                        @click="handleUpadte('processed')"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ background: '#008836' }"
                      ></span>
                      Completed
                    </div>
                  </td>
                  <td class="text-center TimeAZ justify-content-center">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="mySwitch"
                        name="darkmode"
                        v-model="timeLineUpdate.completed"
                        @click="handleUpadte('completed')"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="timeLineBox" v-show="isOpenTimeline">
      <div class="card-body">
        <div class="card mt-">
          <div class="timeLineBoxtop">
            <p class="m-0">RO Timeline</p>
            <div class="cursor-pointer" @click="isOpenTimeline = false">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div class="pTableFlow px-2">
            <table class="table table-bordered table-sm mt-1 mb-0">
              <tbody>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Arrived }"
                        @click="handleColor('Arrived', timeLineColor.Arrived)"
                      ></span>
                      Arrived
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Mechanical }"
                        @click="
                          handleColor('Mechanical', timeLineColor.Mechanical)
                        "
                      ></span>
                      Mechanical
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{
                          backgroundColor: timeLineColor.EstimateAppvd,
                        }"
                        @click="
                          handleColor(
                            'EstimateAppvd',
                            timeLineColor.EstimateAppvd
                          )
                        "
                      ></span>
                      Estimate Appvd
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Paint }"
                        @click="handleColor('Paint', timeLineColor.Paint)"
                      ></span>
                      Paint
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.PartsOrdered }"
                        @click="
                          handleColor(
                            'PartsOrdered',
                            timeLineColor.PartsOrdered
                          )
                        "
                      ></span>
                      Parts Ordered
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Sublet }"
                        @click="handleColor('Sublet', timeLineColor.Sublet)"
                      ></span>
                      Sublet
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.PartsArrived }"
                        @click="
                          handleColor(
                            'PartsArrived',
                            timeLineColor.PartsArrived
                          )
                        "
                      ></span>
                      Parts Arrived
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Reassembly }"
                        @click="
                          handleColor('Reassembly', timeLineColor.Reassembly)
                        "
                      ></span>
                      Reassembly
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.RepairPlan }"
                        @click="
                          handleColor('RepairPlan', timeLineColor.RepairPlan)
                        "
                      ></span>
                      Repair Plan
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.ADAS }"
                        @click="handleColor('ADAS', timeLineColor.ADAS)"
                      ></span>
                      ADAS
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.SuppHold }"
                        @click="handleColor('SuppHold', timeLineColor.SuppHold)"
                      ></span>
                      Supp. Hold
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Detail }"
                        @click="handleColor('Detail', timeLineColor.Detail)"
                      ></span>
                      Detail
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.SuppApproved }"
                        @click="
                          handleColor(
                            'SuppApproved',
                            timeLineColor.SuppApproved
                          )
                        "
                      ></span>
                      Supp. Approved
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{
                          backgroundColor: timeLineColor.ReadyforPickup,
                        }"
                        @click="
                          handleColor(
                            'ReadyforPickup',
                            timeLineColor.ReadyforPickup
                          )
                        "
                      ></span>
                      Ready for Pickup
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Body }"
                        @click="handleColor('Body', timeLineColor.Body)"
                      ></span>
                      Body
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Delivered }"
                        @click="
                          handleColor('Delivered', timeLineColor.Delivered)
                        "
                      ></span>
                      Delivered
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.Frame }"
                        @click="handleColor('Frame', timeLineColor.Frame)"
                      ></span>
                      Frame
                    </div>
                  </td>
                  <td class="text-center TimeAZ">
                    <div class="TimeAZ">
                      <span
                        class="DotA"
                        :style="{ backgroundColor: timeLineColor.PaidinFull }"
                        @click="
                          handleColor('PaidinFull', timeLineColor.PaidinFull)
                        "
                      ></span>
                      Paid in Full
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end my-2">
              <button type="button" class="btn btn-light me-2">
                Save
              </button>
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

.timeLineBox {
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  margin: 0 5px;
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

.DotA {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  box-shadow: 0px 4.258px 4.258px rgba(0, 0, 0, 0.25);
  display: inline-block;
  border: 1px solid #eee;
  cursor: pointer;
}

.timeLineBoxtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: #d9d9d9;
}

.TimeAZ {
  display: flex;
  justify-content: start;
  gap: 8px;
  align-items: center;
  padding: 0px 2px;
  text-wrap: nowrap;
}
.OpenTimelineupdate {
  z-index: 99999;
}
</style>
