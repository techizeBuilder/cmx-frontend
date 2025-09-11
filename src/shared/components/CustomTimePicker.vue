<template>
  <v-time-picker
    v-model="selectedTime"
    format="24hr"
    scrollable
    multiple
    class="time-picker"
    color="blue"
    @update:hour="hourUpdated"
  >
    <template
      v-for="(index, slot) in $slots"
      :key="index"
      #[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </v-time-picker>
</template>

<script setup>
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: () => {},
  },
});

const selectedTime = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

const hourUpdated = (hr) => {
  const [hours, minutes] = selectedTime.value.split(':');
  const newTime = `${hr}:${minutes}`;
  selectedTime.value = newTime;
};
</script>

<style lang="scss">
.time-picker {
  width: 100% !important;
  padding: 16px !important;

  .v-picker-title {
    visibility: hidden;
    display: none;
  }

  .v-time-picker-controls {
    margin-bottom: 12px;

    .v-btn {
      width: 86px;
      height: 70px;
      font-size: 60px;
    }
  }

  #dateTimeBtn {
    min-width: 100% !important;
  }

  .v-picker__actions {
    justify-content: center;
    width: 100%;
    margin-top: 12px;
  }

  .v-time-picker-clock {
    width: 200px;
    height: 200px;
  }
}
</style>
