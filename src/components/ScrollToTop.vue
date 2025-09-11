<template>
  <v-col
    cols="12"
    class="d-flex justify-end my-5"
  >
    <custom-btn
      id="scroll-to-top-btn"
      icon
      variant="text"
      class="rounded-xl"
      @click="scrollToTop"
    >
      <v-img
        :src="getImageUrl('icons/scrollToTop.svg')"
        style="width: 20px"
      />
    </custom-btn>
  </v-col>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import { getImageUrl } from '@/composables';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>
