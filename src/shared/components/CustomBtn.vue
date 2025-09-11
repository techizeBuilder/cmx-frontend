<template>
  <v-btn
    ref="customBtn"
    :id="id"
    v-bind="$attrs"
    class="px-5 custom-btn"
    :icon="icon"
    :prepend-icon="prependIcon"
    :class="{
      'rounded-md': !icon,
    }"
  >
    <template
      v-for="(slotName, index) in Object.keys(slots)"
      :key="index"
      #[slotName]="data"
    >
      <slot
        :name="slotName"
        v-bind="data || {}"
      />
    </template>
    <template
      v-if="BTN_ICONS_PATH[prependIcon]"
      #prepend
    >
      <v-img
        :src="getImageUrl(`icons/${BTN_ICONS_PATH[prependIcon]}`)"
        max-width="22"
        min-width="22"
      />
    </template>
  </v-btn>
</template>

<script setup>
import { onMounted, useSlots } from 'vue';
import { getImageUrl } from '@/composables';
import { ref } from 'vue';

const slots = useSlots();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: Boolean,
    default: false,
  },
  prependIcon: {
    type: String,
    default: '',
  },
  textBold: {
    type: Boolean,
    default: () => true,
  },
  textWrap: {
    type: Boolean,
    default: () => true,
  },
});

const customBtn = ref(null);

const BTN_ICONS_PATH = {
  edit: 'edit.png',
  save: 'save.png',
  cancel: 'cancel.png',
};

onMounted(() => {
  if (props.textBold) {
    customBtn.value.$el.classList?.add('text-bold');
  }
  if (props.textWrap) {
    customBtn.value.$el.classList?.add('text-wrap');
  }
});
</script>

<style lang="scss">
.custom-btn.text-wrap {
  .v-btn__content {
    white-space: wrap;
  }
}
.custom-btn.text-bold {
  .v-btn__content {
    font-weight: 700;
  }
}
</style>
