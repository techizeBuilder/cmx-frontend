<script setup>
const props = defineProps(["options", "optionsSecond", "width"]);
</script>
<template>
  <div class="popover__wrapper">
    <a href="javascript:void(0)">
      <h2 class="popover__title m-0 p-0">
        <img :style="{width: props.width || '35px'}" src="./Icons/summaryInfo.png" alt="summaryInfo" />
      </h2>
    </a>
    <div class="popover__content">
      <div
        class="d-flex justify-content-between align-items-center popover__content_head"
      >
        <h6 v-if="props.optionsSecond === true" class="mb-0">
          Follow-Up
        </h6>
        <h6 v-else class="mb-0">
          {{ props.optionsSecond ? "Search by:" : "Quick Guide" }}
        </h6>
        <img
          src="./Icons/summaryInfo.png"
          alt="summaryInfo"
          :style="{ width: '25px' }"
        />
      </div>
      <span class="d-flex gap-4">
        <ul :class="props.optionsSecond ? 'ps-4' : 'ps-4 list-unstyled'">
          <li v-if="!props.optionsSecond">Search by:</li>
          <li v-for="item in props.options">{{ item }}</li>
        </ul>
        <ul class="ps-4" v-if="props.optionsSecond">
          <li v-for="item in props.optionsSecond">{{ item }}</li>
        </ul>
      </span>
    </div>
  </div>
</template>
<style scoped>
.popover__title {
  font-size: 24px;
  line-height: 36px;
  text-decoration: none;
  color: rgb(228, 68, 68);
  text-align: center;
  padding: 15px 0;
}

.popover__wrapper {
  position: relative;
  margin-left: 2rem;
  display: inline-block;
}

.popover__content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  transform: translate(0, 10px);
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  width: max-content;
  min-width: 270px;
}

.popover__content:before {
  position: absolute;
  z-index: -1;
  content: "";
  top: -8px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #d9d9d9 transparent;
  transition-duration: 0.3s;
  transition-property: transform;
}

.popover__wrapper:hover .popover__content {
  z-index: 10;
  opacity: 1;
  visibility: visible;
  transform: translate(0, 5px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}

.popover__content span {
  padding: 1rem;
  display: block;
}

.popover__content .popover__content_head {
  border-radius: 5px 5px 0px 0px;
  background: #d9d9d9;
  padding: 1rem;
}
</style>
