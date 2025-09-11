<script setup>
import set from "../Icons/set.png";
import DropdownIcons from "../Icons/Dropdown.png";
import settingIcons from "../Icons/setting.png";

let FolderLayoutItem = [
  { name: "Stage" },
  { name: "Target Date" },
  { name: "Days to Repair" },
  { name: "Arrival Date | Time" },
  { name: "Completed Date" },
  { name: "Year" },
  { name: "Make" },
  { name: "Model" },
  { name: "Last Name, First Name" },
  { name: "Insurance" },
  { name: "Estimator " },
  { name: "Body Tech" },
  { name: "Paint Tech" },
  { name: "Frame Tech" },
  { name: "Mech Tech" },
  { name: "Detail Tech" },
  { name: "Sublet" },
  { name: "Estimate Amount" },
  { name: "Total Hours" },
  { name: "Body Hours" },
  { name: "Mech Hours" },
  { name: "Frame Hours" },
  { name: "Paint Hours" },
];
let StagesItems = [
  {
    id: 1,
    backgroundColor: "#CFAF00",
    category: "Come Back",
  },
  {
    id: 2,
    backgroundColor: "#C0FFB5",
    category: "Arrived",
  },
  {
    id: 3,
    backgroundColor: "#FFF975",
    category: "Repair Plan",
  },
  {
    id: 4,
    backgroundColor: "#FFC487",
    category: "Supplement Hold",
  },
  {
    id: 5,
    backgroundColor: "#FF8200",
    category: "Supplement Approved",
  },
  {
    id: 6,
    backgroundColor: "#CECECE",
    category: "Parts Hold",
  },
  {
    id: 7,
    backgroundColor: "#787878",
    category: "Parts Delivered",
  },
  {
    id: 8,
    backgroundColor: "#C9DEFF",
    category: "Body | Frame | Mech",
  },
  {
    id: 9,
    backgroundColor: "#C9DEFF",
    category: "Frame",
  },
  {
    id: 10,
    backgroundColor: "#C9DEFF",
    category: "Mech",
  },
  {
    id: 11,
    backgroundColor: "#4D93FF",
    category: "sublet | offsite",
  },
  {
    id: 12,
    backgroundColor: "#00FFFF",
    category: "Paint",
  },
  {
    id: 13,
    backgroundColor: "#0066FF",
    category: "Reassembly",
  },
  {
    id: 14,
    backgroundColor: "#EBA07F",
    category: "ADAS",
  },
  {
    id: 15,
    backgroundColor: "#B947FF",
    category: "Detail",
  },
  {
    id: 16,
    backgroundColor: "#027A2B",
    category: "Completed",
  },
  {
    id: 17,
    backgroundColor: "#D30E0E",
    category: "Total Loss",
  },
];
</script>

<template>
  <div class="dropdown set">
    <button
      type="button"
      class="btn btn-light dropdown-toggle d-flex align-items-center justify-content-center gap-2 px-4"
      data-bs-toggle="dropdown"
    >
      <img :src="set" alt="set" :style="{ width: '25px' }" />
      Settings
    </button>
    <ul class="dropdown-menu mt-1" :style="{ backgroundColor: '#D9D9D9' }">
      <li
        class="p-2 d-flex align-items-center gap-2 cursor-pointer"
        :style="{ fontWeight: '600' }"
        data-bs-toggle="offcanvas"
        data-bs-target="#FolderLayout"
      >
        <img :src="set" alt="set" :style="{ width: '25px' }" />Folder Layout
      </li>

      <li
        class="p-2 d-flex align-items-center gap-2 cursor-pointer"
        :style="{ fontWeight: '600' }"
        data-bs-toggle="offcanvas"
        data-bs-target="#StageLayout"
      >
        <img :src="set" alt="set" :style="{ width: '25px' }" />Stage Layout
      </li>
    </ul>

    <div class="offcanvas offcanvas-end" id="FolderLayout">
      <div class="offcanvas-header">
        <h4 class="offcanvas-title">
          <img :src="set" alt="set" :style="{ width: '25px' }" /> FlowX
        </h4>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="input-container mb-4" :style="{ width: '250px' }">
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
        <ul class="Tul pt-1">
          <li v-for="items in FolderLayoutItem">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="items.name"
                :name="items.name"
                value="yes"
              />
              <label class="form-check-label ms-3" :for="items.name">
                {{ items.name }}</label
              >
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="offcanvas offcanvas-end" id="StageLayout">
      <div class="offcanvas-header">
        <h4 class="offcanvas-title">
          <img :src="set" alt="set" :style="{ width: '25px' }" />
          Stages
        </h4>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="input-container mb-4 ps-4" :style="{ width: '350px' }">
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
        <ul class="Uplist">
          <li>
            <img :src="settingIcons" alt="settingIcons" />
            Update Colors
          </li>
          <li>
            <img :src="settingIcons" alt="settingIcons" />
            Update Stage Name
          </li>
          <li>
            <img :src="settingIcons" alt="settingIcons" />
            Add New Stage
          </li>
        </ul>
        <ul class="Tul pt-1">
          <li v-for="items in StagesItems">
            <div class="form-check form-switch d-flex align-items-center gap-4">
              <input
                class="form-check-input"
                type="checkbox"
                :id="items.category"
                :name="items.category"
                value="yes"
              />
              <img :src="DropdownIcons" alt="DropdownIcons" />
              <span
                class="stagColor"
                :style="`background-color: ${items.backgroundColor}`"
              ></span>
              <label class="form-check-label" :for="items.name">
                {{ items.category }}</label
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.set .btn-light.dropdown-toggle {
  background-color: #d9d9d9;
  box-shadow: none;
}

.set ul.dropdown-menu {
  background-color: #d9d9d9;
}

.set ul.dropdown-menu.show:before {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 14px;
  width: 10px;
  height: 10px;
  background-color: #d9d9d9;
  transform: translateY(-50%) rotate(45deg);
  z-index: 0;
}

.Tul {
  list-style: none;
  padding-bottom: 2rem;
}

.Tul li {
  color: #787878;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.stagColor {
  width: 20px;
  height: 20px;
  display: block;
}

.Uplist {
  list-style: none;
  padding-bottom: 2rem;
}
</style>
