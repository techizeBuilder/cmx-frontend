<script setup>
const ProduDataTop = [
  {
    Id: "estAppText",
    className: "ESTIMATEAPPOINTMENT",
    Heading: "ESTIMATE APPOINTMENT",
    Number: "7",
    Link: "",
    Hdata: "TODAY",
  },
  {
    Id: "DropOffText",
    className: "DropOffAppointment",
    Heading: "Drop Off Appointment",
    Number: "12",
    Link: "BodyTechA",
    Hdata: "TODAY",
  },
  {
    Id: "ReadyforpickupText",
    className: "Readyforpickup",
    Heading: "Ready for pickup",
    Number: "8",
    Link: "BodyTechA",
    Hdata: "ALL",
  },
];
</script>
<script>
export default {
  props: {
    showhideaccordion: Function,
  },
};
</script>
<template>
  <div class="partstopdetials mt-2 mb-5">
    <div class="d-flex flex-wrap gap-4">
      <div
        class="productionxBox"
        :class="item.className"
        v-for="(item, index) in ProduDataTop"
        v-bind:key="index"
      >
        <div class="d-flex justify-content-between align-items-start">
          <p class="proHead m-0">{{ item.Heading }}</p>
          <div class="btn-group dropend">
            <a
              href="javascript:void(0)"
              class="dropdown-toggle text-black"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Update</a></li>
              <li><a class="dropdown-item" href="#">Pending</a></li>
            </ul>
          </div>
        </div>
        <a
          v-bind:href="`#${item.Id}`"
          v-on:click="showhideaccordion(item.Id)"
          class="text-black"
          v-smooth-scroll="{ offset: -58 }"
        >
          <h1 class="mt-2 text-center">{{ item.Number }}</h1>
          <p class="proH">{{ item.Hdata }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.productionxBox {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.productionxBox p.proHead {
  color: #000;
  font-size: 13px;
  line-height: 15px;
  min-height: 30px;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.productionxBox h1 {
  font-weight: 700;
}

.productionxBox .proH {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 8px;
  margin: 0;
  min-height: 0;
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
}

.productionxBox.TechBox p {
  color: #fff;
}

.productionxBox.ESTIMATEAPPOINTMENT {
  border: 3px solid #fff;
  background: #f0f511;
}

.productionxBox.DropOffAppointment {
  border: 3px solid #fff;
  background: #ccdff1;
}

.productionxBox.Readyforpickup {
  border: 3px solid #fff;
  background: #4dac73;
}
</style>
