<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const Items = ref([
  { text: "Come Back", background: "#CFAF00" },
  { text: "Arrived", background: "#C0FFB5" },
  { text: "Repair Plan", background: "#FFF975" },
  { text: "Supplement Hold", background: "#FFC487" },
  { text: "Supplement Appd", background: "#FF8200" },
  { text: "Parts Hold", background: "#CECECE" },
  { text: "Parts Delivered", background: "#787878" },
  { text: "Body", background: "#ccdff0" },
  { text: "Frame", background: "#ccdff0" },
  { text: "Mechanical", background: "#ccdff0" },
  { text: "Sublet | Offsite", background: "#ccdff0" },
  { text: "Paint", background: "#00FFFF" },
  { text: "Reassembly", background: "#3685FF" },
  { text: "ADAS", background: "#E69B7A" },
  { text: "Detail", background: "#B947FF" },
  { text: "Completed", background: "#027A2B" },
  { text: "Total Loss", background: "#D30E0E" },
]);
const handleClick = (index) => {
  const slideNum = Math.floor(index / 3);
  store.dispatch("setSlideNum", slideNum);
};
</script>
<template>
  <div class="card mt-2">
    <div class="col-sm-12">
      <div class="PartsBox p-2">
        <label
          for="DonotOrder"
          class="PartsboxA justify-content-left"
          v-for="(Item, Index) in Items"
          :key="Index"
          :style="{ 'border-left': `8px  solid ${Item.background}` }"
          @click="handleClick(Index)"
        >
          <div class="tooltips">
            <h6 class="m-0">
              <span class="px-2" style="background-color: #eeeeee;">
                {{ Index }}
              </span>
            </h6>
            <span
              class="tooltiptext"
              :style="{ backgroundColor: 'rgb(233 233 233)' }"
            >
              {{ Item.text }}
            </span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.PartsStageW {
  max-width: 650px;
}

.PartsboxA {
  border: 3.8px solid #fff;
  box-shadow: 0px 2.443px 2.443px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 7px;
}

.PartsboxA h6 {
  font-weight: 600;
  text-transform: uppercase;
}

.tooltips {
  position: relative;
}

.tooltips .tooltiptext {
  visibility: hidden;
  width: 120px;

  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 14px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltips:hover .tooltiptext {
  visibility: visible;
}
</style>
