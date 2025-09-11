<template>
  <div class="tabs-container">
    <div class="tabs-inner-wrapper">
      <v-tabs
        v-model="currentTab"
        hide-slider
        selected-class="active-tab"
        class="tabs border-a"
        v-bind="attrs"
      >
        <v-tab
          v-for="(tab, index) in tabs"
          :value="index + 1"
          class="border-r"
        >
          <slot
            :name="'title-' + index"
            v-bind="tab"
          >
            <v-img
              v-if="tab.img"
              :src="getImageUrl(tab.img)"
              width="19"
              max-width="19"
              class="mr-2"
              v-bind="tab.imgProps"
            />
            <span class="font-14">{{ tab.title }}</span>
          </slot>
        </v-tab>
      </v-tabs>
      <v-tabs-window
        v-model="currentTab"
        touchless
      >
        <v-tabs-window-item
          v-for="(tab, index) in tabs"
          :value="index + 1"
          class="tab-window-item"
          :transition="false"
          :reverse-transition="false"
        >
          <slot
            :name="'content-' + index"
            v-bind="tab"
          >
            <component
              v-if="tab.component"
              v-bind="tab.props"
              :is="tab.component"
              v-on="tab.listeners ?? {}"
            />
            <span
              v-else
              class="font-16"
            >
              {{ tab.title }}
            </span>
          </slot>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { getImageUrl } from '@/composables';

const attrs = useAttrs();
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: () => '',
  },
  tabs: {
    type: Array,
    default: () => [],
  },
});
const $emit = defineEmits(['update:modelValue']);

const currentTab = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    $emit('update:modelValue', val);
  },
});
</script>

<style lang="scss">
.tabs {
  background-color: white;

  .v-btn {
    font-weight: 600 !important;
  }
}

.active-tab {
  background-color: #0066ff1c !important;
  background-color: rgba(var(--v-theme-secondary)) !important;
}

.tabs-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  .tabs-inner-wrapper {
    min-width: fit-content;
  }

  &::-webkit-scrollbar {
    height: 7px;
  }
}
</style>
