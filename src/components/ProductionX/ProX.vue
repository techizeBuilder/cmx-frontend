<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="2"
        md="1"
        class="pl-1"
        :class="{
          'px-0': vuetifyDisplay.xs.value,
        }"
      >
        <v-img
          :src="getImageUrl('icons/set.png')"
          width="25"
          max-width="25"
        />

        <custom-card
          flat
          cardTextStyle="pa-0"
          class="border-a pa-2 mt-4"
          :class="{
            'px-1': vuetifyDisplay.xs.value,
          }"
        >
          <div class="d-flex flex-column">
            <v-tooltip
              v-for="(nav, index) in quickNavigation"
              :key="index"
              :text="nav.title"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-card
                  class="mb-2 pa-1 py-2 cursor-pointer elevation-3"
                  :class="{
                    'px-0': vuetifyDisplay.xs.value,
                  }"
                  :style="{
                    'border-left': `${
                      vuetifyDisplay.xs.value ? 5 : 8
                    }px  solid ${nav.background}`,
                  }"
                  v-bind="props"
                  @click="
                    activeWindow = Math.floor(index / itemsPerPage)
                  "
                >
                  <span
                    class="font-weight-600 sidebar-label rounded-md"
                    :class="{
                      'ml-1': vuetifyDisplay.smAndUp,
                    }"
                  >
                    {{ index }}
                  </span>
                </v-card>
              </template>
            </v-tooltip>
          </div>
        </custom-card>
      </v-col>

      <v-col
        cols="10"
        md="11"
      >
        <v-window
          v-model="activeWindow"
          show-arrows
          class="pro-x-window"
        >
          <v-window-item
            v-for="page in totalPages"
            :key="page"
          >
            <v-row>
              <v-col
                v-for="(nav, index) in paginatedItems"
                :key="index"
                :cols="12 / itemsPerPage"
              >
                <body-tech-child
                  :config="nav"
                  :list-index="nav.originalIndex"
                  :dragged-task="draggedTask"
                  :mapped-stages="mappedStages"
                  @drag-complete="onDragComplete"
                  @handle-item-stage-change="handleItemStageChange"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <template v-slot:prev="{ props }">
            <custom-btn
              id="move-prev"
              color="blue"
              size="x-small"
              icon
              class="rounded-md"
              @click="props.onClick"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </custom-btn>
          </template>
          <template v-slot:next="{ props }">
            <custom-btn
              id="move-next"
              color="blue"
              size="x-small"
              icon
              class="rounded-md"
              @click="props.onClick"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </custom-btn>
          </template>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import BodyTechChild from './BodyTechChild.vue';
import { computed } from 'vue';
import _ from 'lodash';
import { useDisplay } from 'vuetify';
import { getImageUrl } from '@/composables';

const vuetifyDisplay = useDisplay();

const activeWindow = ref(0);
const draggedTask = ref({});
const dummyData = ref([
  {
    id: 1,
    color: '#CFAF00',
    folderX: 'XXXXXX001',
    stage: '',
    target: '25/01/2024',
    daysToRepair: '001',
    arrival: 'MM/DD/YYYY HH:MM PM',
    started: 'MM/DD/YYYY HH:MM PM',
    completed: 'MM/DD/YYYY',
    year: '2024',
    make: 'cars',
    model: 'vxi New',
    lastName: 'Patidar',
    firstName: 'Manash',
    insurance: '',
    estimator: 'Full Name',
    bodyTech: 'Full Name',
    paintTech: 'Full Name',
    frameTech: 'Full Name',
    mechTech: 'Full Name',
    detailTech: 'Full Name',
    preScan: '-',
    postScan: '-',
    adas: '-',
    estimateAmount: '$00,000.00',
    totalHrs: '28.5',
    body: '14.0',
    mech: '2.0',
    frame: '4.5',
    paint: '8.0',
    totalParts: '005',
    ordered: '002',
    delivered: '003',
  },
  {
    id: 2,
    color: '#CFAF00',
    folderX: 'XXXXXX002',
    stage: '',
    target: '25/01/2024',
    daysToRepair: '001',
    arrival: 'MM/DD/YYYY HH:MM PM',
    completed: 'MM/DD/YYYY',
    year: '2024',
    make: 'cars',
    model: 'vxi New',
    lastName: 'Patidar',
    firstName: 'Manash',
    insurance: '',
    estimator: 'Full Name',
    bodyTech: 'Full Name',
    paintTech: 'Full Name',
    frameTech: 'Full Name',
    mechTech: 'Full Name',
    detailTech: 'Full Name',
    preScan: '-',
    postScan: '-',
    adas: '-',
    estimateAmount: '$00,000.00',
    totalHrs: '28.5',
    body: '14.0',
    mech: '2.0',
    frame: '4.5',
    paint: '8.0',
    totalParts: '005',
    ordered: '002',
    delivered: '003',
  },
]);
const quickNavigation = ref([
  {
    title: 'Come Back',
    background: '#CFAF00',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Arrived',
    background: '#C0FFB5',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Repair Plan',
    background: '#FFF975',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Supplement Hold',
    background: '#FFC487',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Supplement Approved',
    background: '#FF8200',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Parts Hold',
    background: '#CECECE',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Parts Delivered',
    background: '#787878',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Body',
    background: '#ccdff1',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Frame',
    background: '#ccdff1',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Mechanical',
    background: '#ccdff1',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Sublet | Offsite',
    background: '#ccdff1',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Paint',
    background: '#00FFFF',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Reassembly',
    background: '#3685FF',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'ADAS',
    background: '#E69B7A',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Detail',
    background: '#B947FF',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Completed',
    background: '#027A2B',
    data: _.cloneDeep(dummyData.value),
  },
  {
    title: 'Total Loss',
    background: '#D30E0E',
    data: _.cloneDeep(dummyData.value),
  },
]);
const mappedStages = ref([
  'Come Back',
  'Arrived',
  'Repair Plan',
  'Supplement Hold',
  'Supplement Approved',
  'Parts hold',
  'Parts delivered',
  'Body data',
  'frame data',
]);

const paginatedItems = computed(() => {
  const arr = quickNavigation.value.map((item, i) => ({
    ...item,
    originalIndex: i,
  }));

  return arr.slice(
    activeWindow.value * itemsPerPage.value,
    activeWindow.value * itemsPerPage.value + itemsPerPage.value
  );
});
const itemsPerPage = computed(() => {
  const thresholds = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  };
  return thresholds[vuetifyDisplay.name.value];
});
const totalPages = computed(() => {
  return Math.ceil(quickNavigation.value.length / itemsPerPage.value);
});

const onDragComplete = ({ targetListIndex, targetItemIndex }) => {
  const sourceListIndex = draggedTask.value.listIndex;
  const sourceItemIndex = draggedTask.value.itemIndex;

  const task = quickNavigation.value[sourceListIndex]?.data.splice(
    sourceItemIndex,
    1
  )[0];

  if (!task) return;

  quickNavigation.value[targetListIndex].data.splice(
    targetItemIndex,
    0,
    task
  );
};
const handleItemStageChange = ({ stage, itemIndex, listIndex }) => {
  const targetListIndex = quickNavigation.value.findIndex(
    (i) => i.title === stage
  );

  draggedTask.value.listIndex = listIndex;
  draggedTask.value.itemIndex = itemIndex;

  onDragComplete({
    targetListIndex,
    targetItemIndex: 0,
  });
};
</script>

<style lang="scss">
.sidebar-label {
  background-color: #eeeeee;
  width: fit-content;
  padding: 3px 6px;
}

.pro-x-window {
  height: 100%;

  .v-window__controls {
    z-index: 999;
    top: -150px;
  }
}
</style>
