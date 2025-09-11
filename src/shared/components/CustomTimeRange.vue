<template>
  <v-container fluid>
    <v-row
      v-for="(time, index) in computedTimeRange"
      :key="index"
      justify="center"
    >
      <v-col
        cols="3"
        class="d-flex flex-column justify-center align-center"
      >
        <custom-btn
          id="start-hr-up"
          icon
          variant="text"
          size="small"
          @click="() => updateStartTime(time, 'hr', 1)"
        >
          <v-icon size="35">mdi-chevron-up</v-icon>
        </custom-btn>
        <div
          class="border-a rounded-md py-1 px-3 cursor-pointer time-text"
        >
          <h3 class="mb-0">
            {{
              moment({
                hour: time.hr,
                minute: time.min,
              }).format('HH')
            }}
          </h3>
        </div>
        <custom-btn
          id="start-hr-down"
          icon
          variant="text"
          size="small"
          @click="() => updateStartTime(time, 'hr', -1)"
        >
          <v-icon size="35">mdi-chevron-down</v-icon>
        </custom-btn>
      </v-col>
      <v-col
        cols="2"
        class="d-flex align-center justify-center px-0"
      >
        <h3>:</h3>
      </v-col>
      <v-col
        cols="3"
        class="d-flex flex-column justify-center align-center"
      >
        <custom-btn
          id="start-hr-up"
          icon
          variant="text"
          size="small"
          @click="() => updateStartTime(time, 'min', 1)"
        >
          <v-icon size="35">mdi-chevron-up</v-icon>
        </custom-btn>
        <div
          class="d-flex border-a rounded-md py-1 px-3 cursor-pointer time-text"
        >
          <h3 class="mb-0">
            {{
              moment({
                hour: time.hr,
                minute: time.min,
              }).format('mm')
            }}
          </h3>
        </div>
        <custom-btn
          id="start-hr-down"
          icon
          variant="text"
          size="small"
          @click="() => updateStartTime(time, 'min', -1)"
        >
          <v-icon size="35">mdi-chevron-down</v-icon>
        </custom-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import moment from 'moment';
import { computed } from 'vue';
import { ref } from 'vue';

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const timeRange = ref([
  {
    hr: 1,
    min: 0,
  },
  {
    hr: 1,
    min: 0,
  },
]);

const computedTimeRange = computed({
  get() {
    // HH:mm -> { hr, min }
    const [startHr, startMin] = props.modelValue[0].split(':');
    const [endHr, endMin] = (props.modelValue[1] || '').split(':');
    timeRange.value = [
      { hr: startHr, min: startMin },
      { hr: endHr, min: endMin },
    ];
    return timeRange.value;
  },
  set() {
    const value = timeRange.value;
    emits('update:modelValue', [
      `${value[0].hr}:${value[0].min}`,
      `${value[1].hr}:${value[1].min}`,
    ]);
    props.modelValue[0] = `${value[0].hr}:${value[0].min}`;
    props.modelValue[1] = `${value[1].hr}:${value[1].min}`;
  },
});

const updateStartTime = (time, key, value) => {
  const assignValue = time[key] + value;
  if (value < 0) {
    time[key] = assignValue < 0 ? 23 : assignValue;
  } else {
    time[key] = assignValue > 23 ? 0 : assignValue;
  }
};
</script>

<style lang="scss" scoped>
.time-text {
  &:hover {
    background-color: #0000001a;
  }
}

.v-icon {
  color: #959595;
}
</style>
