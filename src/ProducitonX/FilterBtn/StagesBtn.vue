<script setup>
import set from "../Icons/set.png";
import Dropdown from "../Icons/Dropdown.png";
import setting from "../Icons/setting.png";
</script>
<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-light dropdown-toggle d-flex align-items-center justify-content-center gap-2 px-4"
      data-bs-toggle="dropdown"
    >
      <img :src="set" alt="set" :style="{ width: '25px' }" />
      Stages
    </button>
    <ul class="dropdown-menu" :style="{ width: '320px' }">
      <li class="ps-4 mb-3 mt-4">
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
      <li class="ps-4 mb-2 mt-4 d-flex align-items-center gap-2">
        <img :src="setting" alt="setting" /> Update Colors
      </li>
      <li class="ps-4 mb-2 mt-2 d-flex align-items-center gap-2">
        <img :src="setting" alt="setting" /> Update Stage Name
      </li>
      <li class="ps-4 mb-2 mt-2 d-flex align-items-center gap-2">
        <img :src="setting" alt="setting" /> Add New Stage
      </li>
      <li class="ps-4 mb-3 mt-4">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="ComeBack"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="ComeBack"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#CFAF00',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Come Back
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Arrived"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Arrived"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#C0FFB5',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Arrived
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="RepairPlan"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="RepairPlan"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#FFF975',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Repair Plan
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="SupplementHold"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="SupplementHold"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#FFC487',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Supplement Hold
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="SupplementApproved"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="SupplementApproved"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#FF8200',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Supplement Approved
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="PartsHold"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="PartsHold"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#CECECE',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Parts Hold
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="PartsDelivered"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="PartsDelivered"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#787878',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Parts Delivered
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Bodya"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Bodya"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#C9DEFF',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Body
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Frame"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Frame"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#C9DEFF',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Frame
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Mech"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Mech"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#C9DEFF',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Mech
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="SubletOffsite"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="SubletOffsite"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#4D93FF',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Sublet | Offsite
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Paints"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Paints"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#0FF',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Paint
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Reassembly"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Reassembly"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#06F',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Reassembly
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="ADAS"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="ADAS"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#EBA07F',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            ADAS
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Detail"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Detail"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#B947FF',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Detail
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Completed"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Completed"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#027A2B',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Completed
          </label>
        </div>
      </li>
      <li class="ps-4 mb-3 mt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="Completed"
            name="darkmode"
            value="yes"
            checked
          />
          <label
            class="form-check-label ps-2 d-flex align-items-center gap-3"
            for="Completed"
          >
            <img :src="Dropdown" alt="Dropdown" />
            <span
              :style="{
                backgroundColor: '#D30E0E',
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }"
            ></span>
            Total Loss
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>
