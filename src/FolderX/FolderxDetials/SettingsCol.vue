<script setup>
import set from "../Icons/set.png";
import DropdownIcons from "../Icons/Dropdown.png";
import settingIcons from "../Icons/setting.png";
import { ref } from "vue";

let StagesItems = [
  {
    id: 1,
    backgroundColor: "#FFFB9F",
    category: "Customer Pay",
  },
  {
    id: 2,
    backgroundColor: "#FFB5B5",
    category: "Total Loss",
  },
  {
    id: 3,
    backgroundColor: "#DDC2FF",
    category: "Insurance Name",
  },
  {
    id: 4,
    backgroundColor: "#9FFFC6",
    category: "Insurance Name",
  },
  {
    id: 5,
    backgroundColor: "#8DBBFF",
    category: "Insurance Name",
  },
  {
    id: 6,
    backgroundColor: "#CFAF00",
    category: "Insurance Name",
  },
  {
    id: 7,
    backgroundColor: "#A7FFFF",
    category: "Insurance Name",
  },
  {
    id: 8,
    backgroundColor: "#CECECE",
    category: "Insurance",
  },

];

const checkInput = ref(
  StagesItems.map((item) => {
    return false;
  })
);

const emit = defineEmits(["elementAdded"]);
const handleColor = (items) => {
  if (checkInput.value.every((item) => item === false)) {
    emit("elementAdded", { backgroundColor: "#E6F0FF" });
  } else {
    emit("elementAdded", items);
    checkInput.value.forEach((item, index) => {
      if (items.id !== StagesItems[index].id) {
        checkInput.value[index] = false;
      }
    });
  }
};
</script>

<template>
  <div class="dropdown setDashFex">
    <button type="button" class="btn" data-bs-toggle="dropdown">
      <img :src="set" alt="set" :style="{ width: '25px' }" />
    </button>
    <ul class="dropdown-menu Tul px-4 ms-1 py-4">
      <h5 class="offcanvas-title mb-4">
        <img :src="set" alt="set" :style="{ width: '25px' }" />
        RO Preview Colors
      </h5>
      <div class="input-container mb-4">
        <div class="input-group flex-nowrap">
          <input class="form-control border" type="search" id="example-search-input" placeholder="Quick Search" />
          <span class="input-group-append">
            <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
              type="button">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
      <li class="ps-5">
        <div class="form-check form-switch d-flex align-items-center gap-4">
          <span class="stagColor" :style="{ backgroundColor: '#E6F0FF' }"></span>
          <label class="form-check-label">Default </label>
        </div>
      </li>
      <li v-for="(items, index) in StagesItems">
        <div class="form-check form-switch d-flex align-items-center gap-4">
          <input class="form-check-input" type="checkbox" :id="items.category" :name="items.category"
            v-model="checkInput[index]" @change="handleColor(items)" />
          <img :src="DropdownIcons" alt="DropdownIcons" />
          <span class="stagColor" :style="`background-color: ${items.backgroundColor}`"></span>
          <label class="form-check-label" :for="items.category">
            {{ items.category }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown.setDashFex button.btn:focus {
  outline: none;
  box-shadow: none;
  border: none;
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
