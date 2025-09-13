<script setup>
import { onUpdated, ref, watch } from "vue";
import timeMoveIcons from "../icons/timeMove.png";
let TimelineItem = [
  { name: "Arrived" },
  { name: "Estimate Approved" },
  { name: "Parts Ordered" },
  { name: "Parts Arrived" },
  { name: "Repair Plan" },
  { name: "Supplement Hold" },
  { name: "Supplment Approved" },
  { name: "Body Frame" },
  { name: "Mechanical" },
  { name: "Paint" },
  { name: "Reassembly" },
  { name: "ADAS Mechanical" },
  { name: "Detail" },
  { name: "Ready for Pickup" },
  { name: "Delivered" },
];

const customTimeLine = ref(TimelineItem.map((item) => item.name));
const defaultCheck = ref(true);
const customCheck = ref(false);

const handleCustomTimeLineInputs = (e) => {
  const value = e.target.value;
  const isChecked = e.target.checked;

  if (isChecked) {
    customTimeLine.value.push(value);
  } else {
    const index = customTimeLine.value.indexOf(value);
    if (index !== -1) {
      customTimeLine.value.splice(index, 1);
    }
  }
};
const handleDefaultTimeLineInputs = (e) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    customTimeLine.value = TimelineItem.map((item) => item.name);
  } else {
    customTimeLine.value = [];
  }
};

const props = defineProps(["data"]);

watch(customCheck, (value) => {
  if (value) {
    defaultCheck.value = false;
    customTimeLine.value = [];
  } else {
    defaultCheck.value = true;
    customTimeLine.value = TimelineItem.map((item) => item.name);
  }
});
watch(defaultCheck, (value) => {
  if (value) {
    customCheck.value = false;
    customTimeLine.value = TimelineItem.map((item) => item.name);
  } else {
    customCheck.value = true;
    customTimeLine.value = [];
  }
});

defineExpose({
  customTimeLine,
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="mt-3 ps-4">
      <p class="noteP">
        Notice: Custom changes to Timeline will change the timeline to open
        RO files.
      </p>
    </div>

    <div class="row mt-5">
      <div class="col-sm-8 m-auto">
        <div class="row g-5">
          <div class="col-sm-5">
            <div class="tBox">
              <h5 class="Thtxt">Default Timeline</h5>
              <div class="d-flex justify-content-end pe-4">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="time"
                    name="times"
                    value="yes"
                    v-model="defaultCheck"
                    @click="handleDefaultTimeLineInputs"
                  />
                </div>
              </div>

              <ul class="Tul pt-4">
                <li v-for="items in TimelineItem">
                  {{ items.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-5">
            <div class="tBox">
              <h5 class="Thtxt">Custom Timeline</h5>
              <div class="d-flex   justify-content-between pe-1">
                <div class="form-check form-switch d-flex justify-content-end">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="time"
                    name="times"
                    value="yes"
                    v-model="customCheck"
                  />
                </div>
                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    class="btn btn-light text-decoration-none"
                    :disabled="defaultCheck"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-light text-decoration-none"
                    :disabled="defaultCheck"
                  >
                    Save
                  </button>
                </div>
              </div>

              <ul class="Tul pt-4">
                <li v-for="items in TimelineItem">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="items.name"
                      :name="items.name"
                      :value="items.name"
                      :checked="defaultCheck ? false : null"
                      @change="handleCustomTimeLineInputs"
                      :disabled="defaultCheck"
                    />
                    <img
                      :src="timeMoveIcons"
                      class="ms-2"
                      alt="timeMoveIcons"
                    />
                    <label class="form-check-label ms-3" :for="items.name">
                      {{ items.name }}</label
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
p.noteP {
  color: #d30e0e;
  margin: 0;
  font-size: 13px;
}

.tBox {
  border-radius: 0px 0px 5px 5px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

h5.Thtxt {
  border-radius: 5px 5px 0px 0px;
  border: 1px solid #d2d4d7;
  background: #ccdff0;
  color: #787878;
  padding: 0.5rem 1rem;
  letter-spacing: 0.1rem;
}

.Tul {
  list-style: none;
  padding-bottom: 2rem;
}

.Tul li {
  color: #787878;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}
</style>
