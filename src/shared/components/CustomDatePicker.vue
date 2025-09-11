<template>
  <v-date-picker
    v-model="selectedDate"
    hide-header
    range
    show-adjacent-months
    multiple="range"
    color="#f3f3f3"
    class="date-time-picker"
    v-bind="$slots"
  >
    <template
      v-for="(index, slot) in $slots"
      :key="index"
      #[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </v-date-picker>
</template>

<script setup>
import { onMounted } from 'vue';
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Date, Array],
    default: () => {},
  },
});

const selectedDate = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

const setSelectedDaysColor = (timeout = 0) => {
  setTimeout(() => {
    const els = document.querySelectorAll(
      '.v-date-picker-month__day--selected'
    );
    if (els?.length) {
      els[0].children[0].style.color = 'white';
      els[0].children[0].style.backgroundColor = '#1976d2';
      els[els.length - 1].children[0].style.color = 'white';
      els[els.length - 1].children[0].style.backgroundColor =
        '#1976d2';
    }
  }, timeout);
};

onMounted(() => {
  setSelectedDaysColor();
});

defineExpose({
  setSelectedDaysColor,
})
</script>

<style lang="scss">
.date-time-picker {
  width: 100%;

  .v-picker__actions {
    justify-content: center;
    width: 100%;
  }
  #dateTimeBtn {
    min-width: 100% !important;
  }

  .v-btn.v-date-picker-month__day-btn {
    border-radius: 4px;
  }

  .v-date-picker-years::-webkit-scrollbar {
    height: 7px;
  }
}
</style>
