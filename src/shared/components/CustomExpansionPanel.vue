<template>
  <v-expansion-panels
    v-model="expandedPanels"
    multiple
    hide-actions
    static
    class="ga-3"
    flat
    v-bind="attrs"
    @update:modelValue="panelsValueUpdated"
  >
    <v-expansion-panel
      v-for="(panel, idx) in panels"
      :id="`panel-${panel.title}`"
      :key="idx"
      class="expansion-panel"
      :style="{
        'border-bottom-left-radius': '5px !important',
        'border-bottom-right-radius': '5px !important',
        'border-top-left-radius': '5px !important',
        'border-top-right-radius': '5px !important',
      }"
      v-bind="panel.props"
    >
      <v-expansion-panel-title
        class="elevation-2"
        :class="{ 'my-elevation': !expandedPanels.includes(idx) }"
        :style="
          panel.background
            ? { 'border-left': `8px  solid ${panel.background}` }
            : {}
        "
        v-bind="titleProps"
      >
        <div class="d-flex align-center justify-space-between w-100">
          <div
            class="d-flex align-center"
            :class="{
              [`ga-${titleGap}`]: true,
            }"
          >
            <v-icon size="23">
              {{
                expandedPanels.includes(idx)
                  ? 'mdi-chevron-double-up'
                  : 'mdi-chevron-double-down'
              }}
            </v-icon>
            <slot :name="'title-prepend-' + idx">
              <v-img
                v-if="panel.icon"
                :src="getImageUrl(`icons/${panel.icon}`)"
                max-width="20"
                width="20"
                v-bind="panel.iconProps"
              />
            </slot>
            <slot
              :name="'title-' + idx"
              v-bind="panel"
            >
              <span class="font-16 font-weight-medium text-uppercase">
                {{ panel.title }}
              </span>
            </slot>
          </div>
          <slot
            :name="'appendIcon-' + idx"
            v-bind="panel"
            class="float-right"
          >
          </slot>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text
        class="my-elevation py-2"
        :class="{ 'panel-sm-text': $vuetify.display.xs }"
        :style="{ minHeight: panel.minHeight || '150px' }"
        v-bind="textProps"
      >
        <slot
          :name="'content-' + idx"
          v-bind="panel"
        >
          <component
            v-if="panel.component"
            :is="panel.component"
            v-bind="panel.props"
            v-on="panel.listeners || {}"
          />
          <template v-else>
            {{ panel }}
          </template>
          <!-- <div v-if="['Staff Permissions'].includes(panel.title)" style="min-height: 50px;"></div>
           <div v-if="['Staff Notifications'].includes(panel.title)" style="min-height: 150px;"></div>
          <div
            v-if="['API Gateway'].includes(panel.title)"
            style="min-height: 150px;"
          ></div> -->
        </slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { getImageUrl } from '@/composables';

const attrs = useAttrs();
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  panels: {
    type: Array,
    default: () => [],
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
  scrollToActivePanel: {
    type: Boolean,
    default: true,
  },
  textProps: {
    type: Object,
    default: () => {},
  },
  titleProps: {
    type: Object,
    default: () => {},
  },
  titleGap: {
    type: [String, Number],
    default: () => 7,
  },
});

let previouslyOpenedPanels = [];
const expandedPanels = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

const panelsValueUpdated = (activePanel = []) => {
  if (!props.scrollToActivePanel) return;
  const clickedPanelIndex = activePanel[activePanel.length - 1];
  if (
    !isNaN(+clickedPanelIndex) &&
    !previouslyOpenedPanels.includes(clickedPanelIndex)
  ) {
    const activePanelTitle = props.panels[clickedPanelIndex].title;
    const el = document.getElementById(`panel-${activePanelTitle}`);

    const elementTop = el.getBoundingClientRect().top + window.scrollY - 60;

    setTimeout(() => {
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth',
      });
      previouslyOpenedPanels.push(clickedPanelIndex);
    }, 400);
  } else {
    previouslyOpenedPanels = previouslyOpenedPanels.filter((i) =>
      activePanel.includes(i)
    );
  }
};

watch(props, (newValue) => {
  panelsValueUpdated(newValue.modelValue);
});

onMounted(() => {
  if (props.expandAll) {
    expandedPanels.value = props.panels.map((_, idx) => idx);
  }
});
</script>

<style lang="scss">
.panel-sm-text {
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
}
.panel-min-height {
  min-height: 150px; 
}
</style>
