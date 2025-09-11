<template>
  <v-card
    :class="[link.className]"
    style="height: 100%"
  >
    <v-row class="pa-2">
      <v-col
        cols="12"
        class="d-flex justify-space-between pb-0"
      >
        <p
          class="font-weight-600 text-uppercase mb-0"
          style="letter-spacing: 2px"
        >
          {{ link.title }}
        </p>

        <v-menu
          width="150"
          location="right"
        >
          <template #activator="{ props }">
            <v-btn
              id="menu-activator-btn"
              icon
              variant="text"
              size="x-small"
              v-bind="props"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <custom-card cardTextStyle="pa-0">
            <v-list density="compact">
              <v-list-item @click="() => {}"> Action </v-list-item>
              <v-list-item @click="() => {}"> Update </v-list-item>
              <v-list-item @click="() => {}"> Pending </v-list-item>
            </v-list>
          </custom-card>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <a
          class="cursor-pointer"
          @click="() => emits('click:link', link)"
        >
          <h1 class="text-center font-weight-bold">
            {{ link.number || 10 }}
          </h1>
          <p
            v-if="link.belowNumberText"
            class="text-center font-weight-600 text-uppercase"
          >
            {{ link.belowNumberText }}
          </p>
          <p
            v-if="link.Hdata"
            class="mb-0"
          >
            {{ link.Hdata }}
          </p>
        </a>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import CustomCard from '@/shared/components/CustomCard.vue';

const emits = defineEmits(['click:link']);
const props = defineProps({
  link: {
    type: Object,
    default: () => {},
  },
});
</script>
