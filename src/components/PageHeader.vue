<template>
  <v-col
    cols="12"
    class="d-flex flex-column justify-start pb-1"
    v-bind="attrs"
  >
    <component
      class="header-link"
      :is="to ? 'router-link' : 'span'"
      :class="{
        'text-header-link': to,
      }"
      :to="to"
      v-bind="titleProps"
    >
      {{ title.toUpperCase() }}
    </component>
    <div
      v-if="subtitles.length"
      class="d-flex ga-2"
      :class="{
        'flex-column': $vuetify.display.xs,
      }"
    >
      <template
        v-for="(subtitle, index) in subtitles"
        :key="index"
      >
        <div class="d-flex ga-2">
          <component
            :is="subtitle.to ? 'router-link' : 'span'"
            class="font-weight-medium"
            :class="{
              'text-header-link': subtitle.to
            }"
            :to="subtitle.to"
            v-bind="subtitleProps"
          >
            {{ subtitle.title }}
          </component>
          <span v-if="index !== subtitles.length - 1">|</span>
        </div>
      </template>
    </div>
  </v-col>
  <v-col
    v-if="!hideDivider"
    cols="12"
    class="py-0"
    :class="[`mb-${mb}`]"
  >
    <v-divider class="mb-2" />
  </v-col>
</template>

<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  mb: {
    type: String,
    default: '4',
  },
  titleProps: {
    type: Object,
    default: () => ({}),
  },
  hideDivider: {
    type: Boolean,
    default: () => false,
  },
  subtitles: {
    type: Array,
    default: () => [],
  },
  subtitleProps: {
    type: Object,
    default: () => ({}),
  },
});

const refreshPage = () => {
  location.reload();
};
</script>

<style lang="scss">
.text-header-link {
  color: #565655;
  text-decoration: underline !important;
}

.header-link {
  // color: #636363;
  color: #565655;
  font-size: 1.3rem;
  font-weight: 800;
}
</style>
