<template>
  <v-row class="header-links-wrapper">
    <v-col cols="12">
      <v-menu>
        <template #activator="{ props }">
          <custom-btn
            id="options"
            color="accent"
            append-icon="mdi-chevron-down"
            class="float-right"
            v-bind="props"
          >
            Options
          </custom-btn>
        </template>

        <custom-card cardTextStyle="pa-0">
          <v-list density="compact">
            <v-list-item @click="() => {}"> Open New RO </v-list-item>
            <v-list-item @click="() => {}"> Print Tags </v-list-item>
            <v-list-item @click="() => {}"> Print Final </v-list-item>
          </v-list>
        </custom-card>
      </v-menu>
    </v-col>

    <v-col
      v-for="(link, index) in topHeaderLinks"
      :key="index"
      cols="6"
      md="2"
      sm="3"
    >
      <header-card
        :link="link"
        @click:link="linkClicked"
      />
    </v-col>

    <v-spacer style="width: 100%" />

    <v-col
      v-for="(link, index) in linksSection"
      :key="index"
      cols="6"
      md="2"
      sm="3"
    >
      <header-card
        :link="link"
        @click:link="linkClicked"
      />
    </v-col>

    <v-col
      cols="12"
      class="d-flex justify-end ga-5"
    >
      <v-img
        :src="getImageUrl('icons/zoomout.png')"
        alt="zoomout"
        width="23"
        max-width="23"
      />
      <v-img
        :src="getImageUrl('icons/expand.png')"
        alt="expandImg"
        width="23"
        max-width="23"
      />
    </v-col>

    <v-col cols="12">
      <custom-expansion-panel
        :model-value="activePanels"
        :panels="panels"
        @update:modelValue="updateActivePanels"
      >
      </custom-expansion-panel>
    </v-col>

    <scroll-to-top />
  </v-row>
</template>

<script setup>
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import HeaderCard from '@/components/ProductionX/HeaderCard.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { ref } from 'vue';
import { shallowRef } from 'vue';

import BodyTech1 from '@/components/ProductionX/BodyTech1.vue';
import { getImageUrl } from '@/composables';

const topHeaderLinks = ref([
  {
    id: 'arrival-open-tech',
    className: 'bg-green',
    title: 'Arrival open tech',
    Number: '',
    Link: '',
    Hdata: 'H: 255',
  },
  {
    id: 'body-tech-1',
    className: 'bg-blue',
    title: 'Body Tech 1 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
  {
    id: 'body-tech-2',
    className: 'bg-blue',
    title: 'Body Tech 2 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
  {
    id: 'body-tech-3',
    className: 'bg-blue',
    title: 'Body Tech 3 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
  {
    id: 'body-tech-4',
    className: 'bg-blue',
    title: 'Body Tech 4 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
  {
    id: 'body-tech-5',
    className: 'bg-blue',
    title: 'Body Tech 5 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
  {
    id: 'body-tech-6',
    className: 'bg-blue',
    title: 'Body Tech 6 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
  {
    id: 'mech-tech-1',
    className: 'bg-blue',
    title: 'Mech Tech 7 <Full Name>',
    Number: '',
    Link: 'BodyTechA',
    Hdata: 'H: 255',
  },
]);

const linksSection = ref([
  {
    id: 'paint-tech-1',
    className: 'bg-neon-blue',
    title: 'Paint Tech 1 <Full Name>',
    Number: '',
    Link: '',
    Hdata: 'H: 255',
  },
  {
    id: 'paint-tech-2',
    className: 'bg-neon-blue',
    title: 'Paint Tech 2 <Full Name>',
    Number: '',
    Link: '',
    Hdata: 'H: 255',
  },
  {
    id: 'detail-tech-1',
    className: 'bg-purple',
    title: 'Detail Tech 1 <Full Name>',
    Number: '',
    Link: '',
    Hdata: 'H: 255',
  },
  {
    id: 'detail-tech-2',
    className: 'bg-purple',
    title: 'Detail Tech 2 <Full Name>',
    Number: '',
    Link: '',
    Hdata: 'H: 255',
  },
  {
    id: 'completed',
    className: 'bg-dark-green',
    title: 'Completed',
    Number: '',
    Link: '',
  },
]);

const activePanels = ref([]);

const panels = ref([
  { id: 'arrival-open-tech', title: 'Arrival - Open Tech' },
  {
    id: 'body-tech-1',
    title: 'Body Tech 1: Full Name',
    component: shallowRef(BodyTech1),
  },
  { id: 'body-tech-2', title: 'Body Tech 2: Full Name' },
  { id: 'body-tech-3', title: 'Body Tech 3: Full Name' },
  { id: 'body-tech-4', title: 'Body Tech 4: Full Name' },
  { id: 'body-tech-5', title: 'Body Tech 5: Full Name' },
  { id: 'body-tech-6', title: 'Body Tech 6: Full Name' },
  { id: 'mech-tech-1', title: 'MECH Tech 1: Full Name' },
  { id: 'paint-tech-1', title: 'paint Tech 1: Full Name' },
  { id: 'paint-tech-2', title: 'paint Tech 2: Full Name' },
  { id: 'detail-tech-1', title: 'Detail Tech 1: Full Name' },
  { id: 'detail-tech-2', title: 'Detail Tech 2: Full Name' },
  { id: 'completed', title: 'completed' },
]);

const linkClicked = (link) => {
  const index = panels.value.findIndex((p) => p.id === link.id);
  if (!activePanels.value.includes(index)) {
    activePanels.value.push(index);
  }
};

const updateActivePanels = (updatedPanels) => {
  activePanels.value = updatedPanels;
};
</script>

<style lang="scss">
.header-links-wrapper {
  a {
    color: black !important;
  }
  .bg-green {
    background-color: #00ff51 !important;
    color: black !important;
  }

  .bg-blue {
    background-color: #ccdff1 !important;
    color: black !important;
  }

  .bg-neon-blue {
    background-color: #00ffff !important;
    color: black !important;
  }

  .bg-purple {
    background-color: #b947ff !important;
    color: black !important;
  }

  .bg-dark-green {
    background-color: #008836 !important;
    color: black !important;
  }

  .v-card {
    border: 3px solid white;
  }
}
</style>
