<script setup>
import EstimateXPage from "./EstimateXPage.vue";
import InsuranceEstimateX from "./InsuranceEstimateX.vue";
import ScratchPad from "./ScratchPad.vue";
</script>

<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Estimate">
            Estimate</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#InsuranceEstimate">
            Insurance&nbsp;Estimate</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ScratchPad">
            Scratch&nbsp;Pad</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Estimate">
          <EstimateXPage />
        </div>
        <div class="tab-pane show" id="InsuranceEstimate">
          <InsuranceEstimateX />
        </div>
        <div class="tab-pane show" id="ScratchPad">
          <ScratchPad />
        </div>
      </div>
    </div>
  </div>
</template>
