<script setup>
import VehicleDetails from "./VehicleDetails.vue";
import VehicleList from "./vehicleList.vue";

const emits = defineEmits(["reRender"]);
const handleListRerender = () => {
  emits("reRender");
};
</script>

<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Estimate">
            Vehicle List</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Estimate">
          <VehicleList @reRenderList="handleListRerender" />
          <VehicleDetails />
        </div>
      </div>
    </div>
  </div>
</template>
