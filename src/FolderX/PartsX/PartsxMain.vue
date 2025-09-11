<script setup>
import PartsXStageMain from "./PartsXStageMain.vue";

import PartsDropMain from "./PartsDropdown/PartsDropMain.vue";

import "./PartsXstyle.css";
</script>

<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#PartsXMain"
          >
            Parts</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="PartsXMain">
          <div
            class="d-lg-flex align-items-end flex-column justify-content-end mt-4"
          >
            <div class="PartsXStage">
              <div class="paBox">
                <h6 class="m-0">
                  Do not Order
                </h6>
              </div>
            </div>
          </div>
          <PartsXStageMain />
       
        </div>
      </div>
    </div>
  </div>
</template>
