<template>
  <ScheduleXCalendar
    :calendar-app="computedCalendarAppInstance"
    class="schedule-x-calendar"
  >
    <template #headerContent>
      <v-row>
        <v-col
          cols="12"
          class="d-flex ga-5"
        >
          <div class="d-flex ga-2">
            <custom-btn
              id="left-chevron-btn"
              icon
              variant="text"
              @click="emits('click:previousWeek')"
            >
              <v-icon size="30">mdi-chevron-left</v-icon>
            </custom-btn>
            <custom-btn
              id="right-chevron-btn"
              icon
              variant="text"
              @click="emits('click:nextWeek')"
            >
              <v-icon size="30">mdi-chevron-right</v-icon>
            </custom-btn>
          </div>
          <h3>
            {{ moment(selectedDays[0]).format('MMMM YYYY') }}
          </h3>
        </v-col>
      </v-row>
    </template>
  </ScheduleXCalendar>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import moment from 'moment';

import CustomBtn from '@/shared/components/CustomBtn.vue';
import { ScheduleXCalendar } from '@schedule-x/vue';
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';

const emits = defineEmits(['click:nextWeek', 'click:previousWeek']);
const props = defineProps({
  selectedDays: {
    type: Array,
    required: true,
  },
  selectedWeek: {
    type: String,
    required: true,
  },
  selectedTime: {
    type: String,
    default: () => '',
  },
});

const calendarEventModal = createEventModalPlugin();
const calendarControlsPlugin = createCalendarControlsPlugin();

const computedCalendarAppInstance = computed(() => {
  const dateMoment = moment(props.selectedDays[0]);
  const startDate = dateMoment.format('YYYY-MM-DD');
  const config = {
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: 1,
        title: 'Event 1',
        start: '2023-12-19',
        end: '2023-12-19',
      },
      {
        id: 2,
        title: 'Event 2',
        start: '2023-12-20 12:00',
        end: '2023-12-20 13:00',
      },
    ],
    calendars: {
      personal: {
        colorName: 'personal',
        lightColors: {
          main: '#1976d2',
          container: '#fff5aa',
          onContainer: '#594800',
        },
      },
    },
    weekOptions: {
      gridHeight: 2500,
      nDays: props.selectedDays.length || 7,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
    },
    dayBoundaries: {
      start: props.selectedTime || '08:00',
      end: moment(props.selectedTime || '08:00', 'HH:mm')
        .add(8, 'hour')
        .format('HH:mm'),
    },
    firstDayOfWeek: dateMoment.day(),
    selectedDate: startDate,
  };

  const plugins = [
    createDragAndDropPlugin(),
    createResizePlugin(),
    calendarEventModal,
    calendarControlsPlugin,
  ];

  const instance = createCalendar(config, plugins);
  // console.log(instance, 'instance');
  return instance;
});

const calendarCheckboxChange = (e) => {
  console.log(e.target.id, 'e.target.id');
  console.log(e.target.checked, 'e.target.checked');
};

const createCheckboxesInCalendar = () => {
  setTimeout(() => {
    const elements = document.querySelectorAll(
      '.sx__week-grid__date'
    );

    elements.forEach((el, index) => {
      const elChildren = el.querySelector('input');
      if (elChildren) {
        el.removeChild(elChildren);
      }
      const labelEl = el.querySelectorAll('.sx__week-grid__day-name');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `${
        labelEl[0].innerHTML || labelEl[0].innerText
      }-${index}`;
      checkbox.name = 'example';
      checkbox.checked = false;
      checkbox.classList.add('calendar-checkbox');
      checkbox.addEventListener('change', calendarCheckboxChange);
      el.appendChild(checkbox);
    });
  }, 500);
};

onMounted(() => {
  createCheckboxesInCalendar();
});
</script>
