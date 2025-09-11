<script setup>
import set from "../Icons/set.png";
</script>
<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-light dropdown-toggle d-flex align-items-center justify-content-center gap-2 px-4"
      data-bs-toggle="dropdown"
    >
      <img :src="set" alt="set" :style="{ width: '25px' }" />
      FlowX
    </button>
    <ul class="dropdown-menu" :style="{ width: '300px' }">
      <li class="ps-4 mb-3 mt-3">
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
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Stage"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Stage">Stage</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="TargetDate"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="TargetDate"
            >Target Date</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="DaystoRepair"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="DaystoRepair"
            >Days to Repair</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Arrival DateTime"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Arrival DateTime"
            >Arrival Date | Time</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="CompletedDate"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="CompletedDate"
            >Completed Date</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Year"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Year">Year</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Make"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Make">Make</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Model"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Model">Model</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="LastNameFirstName"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="LastNameFirstName"
            >Last Name, First Name</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Insurance"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Insurance">Insurance</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Estimator"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Estimator">Estimator</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="BodyTech"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="BodyTech">Body Tech</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="PaintTech"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="PaintTech"
            >Paint Tech</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="FrameTech"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="FrameTech"
            >Frame Tech</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="MechTech"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="MechTech">Mech Tech</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="DetailTech"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="DetailTech"
            >Detail Tech</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Sublet"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="Sublet">Sublet</label>
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="EstimateAmount"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="EstimateAmount"
            >Estimate Amount</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="TotalHours"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="TotalHours"
            >Total Hours</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="BodyHours"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="BodyHours"
            >Body Hours</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="MechHours"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="MechHours"
            >Mech Hours</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="FrameHours"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="FrameHours"
            >Frame Hours</label
          >
        </div>
      </li>
      <li class="ps-4 mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="PaintHours"
            name="darkmode"
            value="yes"
            checked
          />
          <label class="form-check-label ps-2" for="PaintHours"
            >Paint Hours</label
          >
        </div>
      </li>
    </ul>
  </div></template
>
