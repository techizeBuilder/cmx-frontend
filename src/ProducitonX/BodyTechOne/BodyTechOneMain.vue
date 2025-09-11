<script setup>
import FlowXbodyMain from "./FlowXbody/FlowXbodyMain.vue";
import ListBodyTechMain from "./ListBodyTech/ListBodyTechMain.vue";
import DateTechMain from "./DateTech/DateTechMain.vue";
import Flowx from "../Icons/Flowx.png";
import Date from "../Icons/Date.png";
import List from "../Icons/List.png";
import SettingsBtn from "../FilterBtn/SettingsBtn.vue";
 
import SideBar from "../sideBar/SideBar.vue"; 
import set from "../Icons/set.png";
function increment() {
  window.dispatchEvent(new Event("resize"));
}
</script>
<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Estimate">
            <img class="sidebar-icon" :src="Flowx" alt="Flowx" width="20" />
            ProX</a
          >
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            data-bs-toggle="tab"
            href="#InsuranceEstimate"
            v-on:click="increment"
          >
            <img class="sidebar-icon" :src="Date" alt="Date" width="20" />
            ProX Dates</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ScratchPad">
            <img class="sidebar-icon" :src="List" alt="List" width="20" />
            ProX List</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#Hours">
            Hours Tracker</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Estimate">
          <div class="row">
            <div class="col-sm-12 col-md-1">
              <!-- <div class="input-container" :style="{ width: '250px' }">
                <div class="input-group flex-nowrap">
                  <input
                    class="form-control border col-sm-12"
                    type="search"
                    id="example-search-input"
                    placeholder="Quick Search"
                  />
                  <span class="input-group-append">
                    <button
                      class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                      type="button"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div> -->
              <div
                class="p-2"
                style="padding-right: 0.5rem; padding-left: 0.5rem;"
              >
                <div
                  class="d-flex align-items-center justify-content-left gap-2"
                >
                  <img :src="set" alt="set" :style="{ width: '25px' }" />
                  <!-- <b>Stages</b>  -->
                </div>
              </div>
              <SideBar />
            </div>
            <div class="col-sm-12 col-md-11">
              <FlowXbodyMain />
            </div>
          </div>
        </div>
        <div class="tab-pane show" id="InsuranceEstimate">
          <div
            class="d-flex align-items-center justify-content-end pe-3 py-4 gap-3"
          >
            <div class="input-container" :style="{ width: '250px' }">
              <div class="input-group flex-nowrap">
                <input
                  class="form-control border"
                  type="search"
                  id="example-search-input"
                  placeholder="Quick Search"
                />
                <span class="input-group-append">
                  <button
                    class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                    type="button"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <SettingsBtn />
          </div>
          <DateTechMain />
        </div>
        <div class="tab-pane show" id="ScratchPad">
          <div
            class="d-flex align-items-center justify-content-end pe-3 py-4 gap-3"
          >
            <div class="input-container" :style="{ width: '250px' }">
              <div class="input-group flex-nowrap">
                <input
                  class="form-control border"
                  type="search"
                  id="example-search-input"
                  placeholder="Quick Search"
                />
                <span class="input-group-append">
                  <button
                    class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                    type="button"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <SettingsBtn />
          </div>
          <ListBodyTechMain />
        </div>
        <div class="tab-pane show" id="Hours">
          <h6>Hours</h6>
        </div>
      </div>
    </div>
  </div>
</template>
