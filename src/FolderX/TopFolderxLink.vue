<script setup>
let Links = [
  { name: "PAYMENT", link: "#paymentX", id: "paymentX" },
  { name: "COMMENTS", link: "#COMMENTSX", id: "COMMENTSX" },
  { name: "CHATLINK", link: "#CHATLINKX", id: "CHATLINKX" },
  { name: "E-SIGN", link: "#ESIGNX", id: "ESIGNX" },
  { name: "DATES", link: "#DATESX", id: "DATESX" },
  { name: "CUSTOMER", link: "#CUSTOMERX", id: "CUSTOMERX" },
  { name: "VEHICLE", link: "#VEHICLEX", id: "VEHICLEX" },
  { name: "INSURANCE", link: "#INSURANCEX", id: "INSURANCEX" },
  { name: "PHOTO", link: "#PHOTOSXFolder", id: "PHOTOSXFolder" },
  { name: "ESTIMATE", link: "#ESTIMATEX", id: "ESTIMATEX" },
  { name: "PRODUCTION", link: "#PRODUCTIONXFolder", id: "PRODUCTIONXFolder" },
  { name: "PARTS", link: "#PARTSX", id: "PARTSX" },
  { name: "STAFF", link: "#STAFFXFolder", id: "STAFFXFolder" },

  { name: "DOCUMENTS", link: "#DOCUMENTSX", id: "DOCUMENTSX" },
  // { name: "ACTIVITY", link: "#ACTIVITYX", id: "ACTIVITYX" },
  { name: "REPORTS", link: "#REPORTSX", id: "REPORTSX" },
  { name: "FINAL", link: "#FINALX", id: "FINALX" },
  //     { name: 'TOTAL LOSS', link: '#TOTALLOSSX', id: 'TOTALLOSSX' },
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
  <div class="card">
    <div class="card-body">
      <div
        class="d-flex align-items-center justify-content-start gap-1 flex-sm-wrap overflow-auto"
      >
        <div class="boxLi" v-for="(Items, index) in Links" v-bind:key="index">
          <a
            v-on:click="showhideaccordion(Items.id)"
            :href="Items.link"
            v-smooth-scroll="{ offset: -81 }"
          >
            {{ Items.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
