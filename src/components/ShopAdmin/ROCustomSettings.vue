<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
  </custom-tabs>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import Timeline from './ROCustomSettingTabs/Timeline.vue';
import Comments from './ROCustomSettingTabs/Comments.vue';
import ESignature from './ROCustomSettingTabs/ESignature.vue';
import ChatLinkMessages from './ROCustomSettingTabs/ChatLinkMessages.vue';
import ROCustomColor from './ROCustomSettingTabs/ROCustomColor.vue';
import ShopDefaultLaborRates from './ROCustomSettingTabs/ShopDefaultLaborRates.vue';
import ShopROSettings from './ROCustomSettingTabs/ShopROSettings.vue';

const currentTab = ref(1);
const tabs = ref([
  {
    title: 'Timeline',
    component: shallowRef(Timeline),
  },
  {
    title: 'Comments',
    component: shallowRef(Comments),
  },
  {
    title: 'E-Signature',
    component: shallowRef(ESignature),
  },
  {
    title: 'ChatLink Messages',
    component: shallowRef(ChatLinkMessages),
  },
  {
    title: 'RO Custom Color',
    component: shallowRef(ROCustomColor),
  },
  {
    title: 'Shop Default Labor Rates',
    component: shallowRef(ShopDefaultLaborRates),
  },
  {
    title: 'Shop RO Settings',
    component: shallowRef(ShopROSettings),
  },
]);
</script>

<style lang="scss"></style>
