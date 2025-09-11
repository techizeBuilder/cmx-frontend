<script setup>
import ProductionTab from "./ProductionTab.vue";
</script>

<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#productionfortab"
          >
            Production</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#flaghours">
            Flag Hours</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="productionfortab">
          <ProductionTab />
        </div>
        <div class="tab-pane show" id="flaghours">
          <p>flaghours</p>
        </div>
      </div>
    </div>
  </div>
</template>
