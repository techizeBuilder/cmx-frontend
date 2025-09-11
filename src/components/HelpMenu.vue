<template>
  <v-menu
    v-model="menuOpen"
    :open-on-hover="true"
    :close-on-content-click="false"
    :offset="$vuetify.display.xs ? 2 : 8"
    :open-delay="100"
    class="menu-container"
    :class="{ xs: $vuetify.display.xs }"
  >
    <template v-slot:activator="{ props }">
      <v-img
        id="menuActivator1"
        v-bind="props"
        :src="getImageUrl('icons/summaryInfo.png')"
        alt="summaryInfo1"
        class="mt-2 cursor-pointer"
        max-width="35"
        width="35"
        @click="menuOpen = !menuOpen"
      />
    </template>

    <custom-card
      id="menuCard"
      cardTextStyle="pt-0 px-0"
      :width="$vuetify.display.smAndUp ? 370 : 250"
      class="overflow-x-hidden"
    >
      <v-row>
        <v-col
          cols="12"
          class="px-10 pt-5 d-flex align-center justify-space-between"
          style="background-color: #d9d9d9"
        >
          <h6
            v-if="props.optionsSecond === true"
            class="mb-0"
          >
            Follow-Up
          </h6>
          <h6
            v-else
            class="mb-0"
          >
            {{ props.optionsSecond ? 'Search by:' : 'Quick Guide' }}
          </h6>
          <v-img
            v-bind="props"
            :src="getImageUrl('icons/summaryInfo.png')"
            alt="summaryInfo"
            class="mt-2"
            max-width="25"
            width="25"
          />
        </v-col>
        <v-col
          cols="12"
          class="pt-4 px-7 d-flex justify-space-between"
        >
          <ul class="ps-4">
            <li
              v-if="!props.optionsSecond"
              class="list-unstyled"
            >
              Search by:
            </li>
            <li v-for="item in props.options">{{ item }}</li>
          </ul>
          <ul
            class="ps-4"
            v-if="props.optionsSecond"
          >
            <li v-for="item in props.optionsSecond">{{ item }}</li>
          </ul>
        </v-col>
      </v-row>
    </custom-card>
  </v-menu>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import CustomCard from '../shared/components/CustomCard.vue';
import { useDisplay } from 'vuetify';
import { getImageUrl } from '@/composables';

const props = defineProps(['options', 'optionsSecond', 'width']);

const vuetifyDisplay = useDisplay();
const menuOpen = ref(false);

const adjustMenuCard = () => {
  setTimeout(() => {
    const menuCardEl = document.getElementById('menuCard');
    if (!menuCardEl) return;

    const activatorEl = document.getElementById('menuActivator');
    if (activatorEl) {
      const activatorTop = activatorEl.getBoundingClientRect().top;

      const isAtBottom = activatorTop < 0;

      menuCardEl.parentElement.classList.toggle('top', !isAtBottom);
      menuCardEl.parentElement.classList.toggle('bottom', isAtBottom);
    }
  }, 0);
};

watch(menuOpen, (isOpen) => {
  if (isOpen) {
    adjustMenuCard();
  }
});

onMounted(() => {
  if (vuetifyDisplay.smAndUp) {
    document.addEventListener('scroll', adjustMenuCard);
  }
});
</script>

<style lang="scss">
.menu-container {
  .v-overlay__content:before {
    position: absolute;
    z-index: -1;
    content: '';
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #d9d9d9 transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }
  .v-overlay__content.bottom:before {
    top: -8px;
    left: 7px;
    transform: rotate(0deg);
  }
}
.menu-container.xs {
  .v-overlay__content.bottom:before {
    left: 0px;
    top: 0px;
    // transform: rotate(0deg);
  }
}
</style>
