<script setup>
import { watch, ref } from "vue";

const props = defineProps(["position"]);
const positions = ref({});

watch(props, () => {
  positions.value.x = props.position.x;
  positions.value.y = props.position.y;
});
</script>
<template>
  <div
    class="modal"
    id="TimelineModul"
    :style="{ left: positions.x + 'px', bottom: positions.y + 'px' }"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <!-- Modal body -->
        <div class="modal-body p-0">
          <div class="timeLineBox">
            <div class="card-body p-0">
              <div class="card">
                <div class="timeLineBoxtop">
                  <p class="m-0">RO Timeline</p>
                  <div class="cursor-pointer" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </div>

                <div class="pTableFlow p-3">
                  <table class="table table-bordered table-sm mt-1mb-1">
                    <tbody>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Arrived
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Mechanical
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Estimate Appvd
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Paint
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Parts Ordered
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Sublet
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Parts Arrived
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Reassembly
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Repair Plan
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            ADAS
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Supp. Hold
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Detail
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Supp. Approved
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Ready for Pickup
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Body
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Delivered
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Frame
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Paid in Full
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-light my-4 px-4">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: absolute;
  z-index: 10040;
  top: "0px";
  overflow: auto;
  overflow-y: auto;
}
/* timeLineBoxtop */
.timeLineBoxtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #d9d9d9;
}

.TimeAZ {
  display: flex;
  justify-content: start;
  gap: 11px;
  align-items: center;
  padding: 3px 3px;
  text-wrap: nowrap;
}

.DotA {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  box-shadow: 0px 4.258px 4.258px rgba(0, 0, 0, 0.25);
  display: inline-block;
}

p.NumTos.m-0 {
  width: 35px;
  height: 25px;
  background-color: #eeeeee;
  text-align: center;
  border-radius: 4px;
  vertical-align: middle;
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
</style>
