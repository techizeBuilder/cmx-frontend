<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template #content-0>
      <v-container fluid>
        <v-row class="appointment-panel">
          <v-col
            cols="12"
            class="d-flex justify-space-between"
          >
            <div
              class="w-25 d-flex align-center justify-space-between"
            >
              <p class="mb-0 text-subtitle-1">EST</p>
              <custom-select
                v-model="selectedWeek"
                id="select-week"
                :items="['1 Week', '2 Weeks']"
                hide-details
                @update:modelValue="onWeekSelection"
              />
            </div>
            <div class="w-25">
              <custom-field
                id="search-estimate"
                placeholder="VIN, RO, Last Name"
                append-inner-icon="mdi-magnify"
                clearable
                @click:append-inner=""
              />
            </div>
          </v-col>

          <v-col cols="3">
            <custom-card
              cardTextStyle="pa-0 d-flex justify-center"
              flat
              class="border-a"
            >
              <v-row>
                <v-col
                  cols="12"
                  class="pb-0"
                >
                  <v-window v-model="activeWindowIndex">
                    <v-window-item>
                      <custom-date-picker
                        ref="datePickerRef"
                        v-model="selectedDays"
                      >
                        <!-- <template #actions>
													<div class="w-100 d-flex flex-column">
														<div>
															<custom-btn
																id="dateTimeBtn"
																icon
																block
																density="compact"
																@click="
																	activeWindowIndex === 0
																		? activeWindowIndex++
																		: --activeWindowIndex
																"
															>
																<v-icon color="grey-darken-1">
																	mdi-clock-outline
																</v-icon>
															</custom-btn>
														</div>
														<div class="mt-2 text-center">
															<span>{{ formattedDates }}</span>
														</div>
													</div>
												</template> -->
                      </custom-date-picker>
                    </v-window-item>
                    <v-window-item>
                      {{ selectedTime }}
                      <custom-time-range
                        v-model="selectedTime"
                        @update:modelValue="
                          (v) => console.log(v, 'v')
                        "
                      />
                    </v-window-item>
                  </v-window>
                </v-col>
                <v-col
                  cols="12"
                  class="text-center pt-0"
                >
                  <custom-btn
                    id="window-toggle-btn"
                    icon
                    block
                    density="comfortable"
                    variant="text"
                    class="mb-2 rounded-md"
                    @click="
                      () =>
                        activeWindowIndex === 0
                          ? activeWindowIndex++
                          : activeWindowIndex--
                    "
                  >
                    <v-icon>
                      {{
                        activeWindowIndex === 0
                          ? 'mdi-clock-outline'
                          : 'mdi-calendar-outline'
                      }}
                    </v-icon>
                  </custom-btn>

                  <p class="formatted-date-time text-grey-darken-3">
                    {{ formattedDateTimeText }}
                  </p>
                </v-col>
              </v-row>
            </custom-card>

            <custom-card
              class="mt-3 border-a shop-closed-card"
              hide-header-bg
              cardTextStyle="pa-0 mb-3"
              :cardTitleStyle="{ 'mt-3': true }"
            >
              <template #title>
                <h6 class="mb-0">Shop Closed</h6>
              </template>
              <v-row class="px-4">
                <v-col
                  cols="12"
                  class="pb-0"
                >
                  <v-checkbox
                    color="blue"
                    hide-details
                    density="compact"
                  >
                    <span class="text-black">Saturday</span>
                  </v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  class="pt-0"
                >
                  <v-checkbox
                    color="blue"
                    hide-details
                    density="compact"
                  >
                    <span class="text-black">Sunday</span>
                  </v-checkbox>
                </v-col>
              </v-row>
            </custom-card>

            <custom-card
              flat
              class="mt-4"
            >
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex align-center ga-3"
                >
                  <h6 class="mb-0">Estimator</h6>
                  <v-img
                    :src="getImageUrl('icons/estimator.svg')"
                    max-width="28"
                    width="28"
                  />
                </v-col>
                <v-col
                  v-for="(est, index) in estimators"
                  :key="index"
                  cols="12"
                  class="py-0 px-0"
                >
                  <v-checkbox
                    v-model="est.checked"
                    color="blue"
                    hide-details
                    class="estimator-checkbox"
                  >
                    <span class="text-black">{{ est.title }}</span>
                    <span class="text-black append">3</span>
                  </v-checkbox>
                </v-col>
              </v-row>
            </custom-card>
          </v-col>

          <v-col cols="9">
            <custom-calendar
              v-if="showCalendar"
              :selectedDays="selectedDays"
              :selectedWeek="selectedWeek"
              @click:nextWeek="() => updateWeek(7)"
              @click:previousWeek="() => updateWeek(-7)"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template
      v-for="item in [1, 2]"
      :key="item"
      #[`content-${item}`]
    >
      <v-container fluid>
        <v-row justify="end">
          <v-col cols="4">
            <custom-field
              id="search-estimate-list"
              placeholder="VIN, RO, Last Name, Cell, Cust ID"
              append-inner-icon="mdi-magnify"
              clearable
              @click:append-inner=""
            />
          </v-col>
          <v-col cols="12">
            <custom-data-table
              id="estimate-list-table"
              :headers="estimateListHeaders"
              :items="[]"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import moment from 'moment';
import _ from 'lodash';
import { getImageUrl } from '@/composables';

import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomSelect from '@/shared/components/CustomSelect.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomDatePicker from '@/shared/components/CustomDatePicker.vue';
import CustomTimePicker from '@/shared/components/CustomTimePicker.vue';
import CustomTimeRange from '@/shared/components/CustomTimeRange.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import CustomCalendar from '@/shared/components/CustomCalendar.vue';
import { VCheckbox } from 'vuetify/components';

const today = moment();

const showCalendar = ref(true);
const datePickerRef = ref(null);
const currentTab = ref(1);
const activeWindowIndex = ref(0);
const selectedDays = ref([]);
const selectedTime = ref([today.format('HH:mm'), null]);
const selectedWeek = ref('1 Week');

const tabs = ref([
  {
    title: 'Estimate Calendar',
  },
  {
    title: 'Estimate List',
  },
  {
    title: 'Missed Appointment',
  },
]);
const estimators = ref([
  {
    title: 'Estimator 1',
    checked: true,
  },
  {
    title: 'Estimator 2',
  },
  {
    title: 'Estimator 3',
  },
  {
    title: 'Estimator 4',
  },
]);
const estimateListHeaders = ref([
  { title: 'Customer #', value: '$$default', valueFrom: 'customer' },
  {
    title: 'Last Activity Date',
    value: '$$default',
    valueFrom: 'lastActivityDate',
  },
  {
    title: 'Appt Date Missed',
    value: '$$default',
    valueFrom: 'apptDateMissed',
  },
  { title: 'First Name', value: '$$default', valueFrom: 'firstName' },
  { title: 'Last Name', value: '$$default', valueFrom: 'lastName' },
  { title: 'Year', value: '$$default', valueFrom: 'year' },
  { title: 'Make', value: '$$default', valueFrom: 'make' },
  { title: 'Model', value: '$$default', valueFrom: 'model' },
  { title: 'Phone 1', value: '$$default', valueFrom: 'phone_1' },
  { title: 'Phone 2', value: '$$default', valueFrom: 'phone_2' },
  { title: 'Email', value: '$$default', valueFrom: 'email' },
]);

const formattedDateTimeText = computed(() => {
  const days = _.cloneDeep(selectedDays.value);
  if (days.length) {
    let formattedStr =
      moment(days[0], 'YYYY-MM-DD').format('MM/DD/YYYY') +
      ', ' +
      selectedTime.value;
    if (days.length > 1) {
      formattedStr +=
        ' - ' +
        moment(days[days.length - 1], 'YYYY-MM-DD').format(
          'MM/DD/YYYY'
        ) +
        ', ' +
        selectedTime.value;
    }
    return formattedStr;
  }
  return '';
});

watch(
  [selectedDays, currentTab, activeWindowIndex],
  (newValues, oldValues) => {
    if (newValues.some((val, idx) => val !== oldValues[idx])) {
      const timeout = selectedDays.value !== oldValues[0] ? 0 : 500;
      datePickerRef.value?.setSelectedDaysColor(timeout);

      showCalendar.value = false;
      setTimeout(() => {
        showCalendar.value = true;
      }, 0);
    }
  }
);

const updateWeek = (days) => {
  const start = moment(selectedDays.value[0]).add(days, 'days');
  const nDays = selectedWeek.value === '1 Week' ? 7 : 14;
  selectedDays.value = Array.from(
    { length: nDays },
    (_, i) =>
      new Date(
        start
          .clone()
          .startOf('week')
          .add(i, 'days')
          .format('YYYY-MM-DD')
      )
  );
};

const onWeekSelection = () => {
  const startDate = selectedDays.value[0]
    ? moment(selectedDays.value[0])
    : today;
  const nDays = selectedWeek.value === '1 Week' ? 7 : 14;
  selectedDays.value = Array.from(
    { length: nDays },
    (_, i) =>
      new Date(
        startDate
          .clone()
          .startOf('week')
          .add(i, 'days')
          .format('YYYY-MM-DD')
      )
  );
};

onMounted(() => {
  onWeekSelection();
});
</script>

<style lang="scss">
.formatted-date-time {
  padding-inline: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
}

.appointment-panel {
  .v-selection-control {
    --v-input-control-height: 32px;
  }
  .v-selection-control__wrapper {
    flex-direction: row-reverse;
    width: 100%;
    justify-content: start;
  }
}

.estimator-checkbox {
  .append {
    padding: 1px 8px;
    border-radius: 5px;
    background-color: #eee;
    margin-inline: 2px 14px;
  }
}

.schedule-x-calendar {
  .sx__week-grid__hour:first-child {
    visibility: visible;
    border-top: none;

    .sx__week-grid__hour-text {
      margin-top: 8px;
    }
  }

  .sx__week-grid__date--is-today {
    .sx__week-grid__date-number,
    .sx__week-grid__day-name {
      background-color: transparent;
      color: var(--sx-color-neutral);
    }
  }

  .calendar-checkbox {
    transition: all 0.3s ease;
    cursor: pointer;
    width: 19px;
    height: 19px;
    border-width: 2px;

    &:hover {
      border-color: #1565c0;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    }

    &:checked {
      content: '';
      border: solid white;
      border-width: 0 0 2px 2px;
    }
  }
}
</style>
