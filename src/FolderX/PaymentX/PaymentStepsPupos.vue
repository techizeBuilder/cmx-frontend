<script></script>
<template>
  <div class="popover__wrapper">
    <h2 class="popover__title">
      <img src="../Icons/summaryInfo.png" alt="summaryInfo" />
    </h2>
    <div class="popover__content">
      <div
        class="d-flex justify-content-between align-items-center popover__content_head"
      >
        <h6 class="mb-0">Payment Steps</h6>
        <img
          src="../Icons/summaryInfo.png"
          alt="summaryInfo"
          :style="{ width: '25px' }"
        />
      </div>
      <span>
        <p class="popover__message">Step 1: Edit Amount Due</p>
        <p class="popover__message">Step 2: Post Payment</p>
        <p class="popover__message">Step 3: View Summary</p>
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
  margin-top: 1.5rem;
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
  width: auto;
  min-width: 270px;
}

.popover__content:before {
  position: absolute;
  z-index: -1;
  content: "";

  top: -8px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #fff transparent;
  transition-duration: 0.3s;
  transition-property: transform;
}

.popover__wrapper:hover .popover__content {
  z-index: 10;
  opacity: 1;
  visibility: visible;
  transform: translate(0, -20px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}

.popover__message {
  text-align: left;
  margin-bottom: 0.8rem;
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
