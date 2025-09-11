<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
  </custom-tabs>
</template>

<script setup>
import CustomTabs from '@/shared/components/CustomTabs.vue';
import { shallowRef } from 'vue';
import { ref } from 'vue';
import ProX from './ProX.vue';

const currentTab = ref(1);
const tabs = ref([
  {
    title: 'ProX',
    img: 'icons/Flowx.png',
    component: shallowRef(ProX),
  },
  {
    title: 'Prox Dates',
    img: 'icons/Date.png',
  },
  {
    title: 'ProX List',
    img: 'icons/List.png',
  },
  {
    title: 'Hours Tracker',
  },
]);
</script>
