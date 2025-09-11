<template>
  <custom-expansion-panel
    expand-all
    :scrollToActivePanel="false"
    title-gap="4"
    :panels="[
      {
        title: config.title,
        background: config.background,
      },
    ]"
    :title-props="{
      class: 'rounded-md',
    }"
    :text-props="{
      class:
        'body-tech-panel rounded-lg overflow-auto elevation-0 border-a pt-4',
      style: {
        'max-height': '835px',
      },
    }"
  >
    <template #title-prepend-0>
      <span class="bg-grey-lighten-2 px-2 py-1 rounded">
        {{ config.data?.length || 0 }}
      </span>
    </template>
    <template #content-0>
      <v-row
        v-if="!config.data?.length"
        justify="center"
        @dragover="onDragOver"
        @drop="() => onDrop(itemIndex)"
      >
        <p class="mb-0 font-weight-600 text-error">No Data to show</p>
      </v-row>
      <v-row
        v-for="(item, itemIndex) in config.data"
        :key="itemIndex"
        :id="`item-${itemIndex}-${listIndex}`"
        class="body-tech-content my-elevation rounded-md"
        :class="{
          'mt-6': itemIndex > 0,
        }"
        @dragover="onDragOver"
        @drop="() => onDrop(itemIndex)"
      >
        <!-- Header Links -->
        <v-col
          cols="12"
          class="d-flex pa-1 rounded-md"
          :class="{
            'px-2': vuetifyDisplay.xs.value,
          }"
          :style="{
            backgroundColor: config.background,
          }"
        >
          <div
            class="d-flex align-center border-a rounded-md border-black py-0 px-3"
          >
            <strong>{{ item.id }}</strong>
          </div>
          <div class="ml-2 d-flex ga-2">
            <v-tooltip
              v-for="(link, i) in flowXBodyTopLinks"
              :key="i"
              :text="link.title"
              location="top"
            >
              <template #activator="{ props }">
                <v-img
                  :src="getImageUrl(`icons/${link.icon}`)"
                  width="19"
                  max-width="19"
                  v-bind="props"
                  class="cursor-pointer"
                  @click="link.onClick"
                />
              </template>
            </v-tooltip>
          </div>

          <custom-btn
            v-if="vuetifyDisplay.smAndUp.value"
            :id="`btn-${listIndex}--${itemIndex}`"
            size="x-small"
            height="26"
            width="8"
            variant="text"
            :draggable="true"
            class="ml-auto cursor-grab"
            @dragstart="(event) => onDragStart(event, itemIndex)"
          >
            <v-icon size="25">mdi-drag</v-icon>
          </custom-btn>
        </v-col>

        <!-- Job Details (Expand Btn) -->
        <v-col
          :cols="12"
          :md="item.toggleJobDetails ? 12 : 6"
          class="px-1 pb-1"
        >
          <custom-btn
            id="expand-btn"
            block
            class="expand-btn"
            :class="{
              'py-7':
                vuetifyDisplay.smAndUp.value &&
                !item.toggleJobDetails,
            }"
            color="#eff4fe"
            flat
            @click="
              _.isBoolean(item.toggleJobDetails)
                ? (item.toggleJobDetails = !item.toggleJobDetails)
                : (item.toggleJobDetails = true)
            "
          >
            <v-icon
              size="23"
              class="mr-1"
            >
              {{
                item.toggleJobDetails
                  ? 'mdi-chevron-double-up'
                  : 'mdi-chevron-double-down'
              }}
            </v-icon>
            Job Details
          </custom-btn>
        </v-col>
        <template v-if="!item.toggleJobDetails">
          <!-- Image -->
          <v-col
            cols="12"
            md="6"
            class="px-1 pb-1"
          >
            <v-img
              :src="getImageUrl('icons/cmx.jpeg')"
              class="rounded-md"
            />
          </v-col>

          <!-- Actions -->
          <v-col
            cols="6"
            class="pt-0"
          >
            <div class="d-flex align-center">
              <a
                href=""
                class="font-16"
              >
                {{ item.folderX }}
              </a>
              <v-tooltip
                text="Off Express Repair"
                location="bottom"
              >
                <template #activator="{ props }">
                  <custom-btn
                    id="flex-btn"
                    icon
                    variant="text"
                    size="small"
                    v-bind="props"
                  >
                    <v-img
                      :src="getImageUrl('icons/flexIcon.png')"
                      width="22"
                      max-width="22"
                    />
                  </custom-btn>
                </template>
              </v-tooltip>
            </div>
            <custom-drop-down
              text="Stage"
              :btn-props="{
                'append-icon': 'mdi-menu-down',
                flat: true,
              }"
              :list="mappedStages.filter((i) => i !== config.title)"
              @click:list-item="
                (stage) => dropDownClicked(stage, itemIndex)
              "
            />
          </v-col>

          <!-- Timeline Details -->
          <v-col cols="12">
            <div class="d-flex flex-wrap">
              <span class="font-weight-600">Target: </span>
              <span class="ml-1">{{ item.target }}</span>

              <span
                class="font-weight-600"
                :class="{ 'ml-auto': vuetifyDisplay.smAndUp.value }"
              >
                Days:
              </span>
              <span class="ml-1">
                {{ item.daysToRepair }}
              </span>
            </div>
            <div>
              <span class="font-weight-600">Arrival: </span>
              <span class="ml-1">{{ item.arrival }}</span>
            </div>
            <div>
              <span class="font-weight-600">Started: </span>
              <span class="ml-1">{{ item.started }}</span>
            </div>
            <div>
              <span class="font-weight-600">Completed: </span>
              <span class="ml-1">{{ item.completed }}</span>
            </div>
          </v-col>

          <v-col
            cols="12"
            class="pa-0"
          >
            <v-divider class="my-2" />
          </v-col>

          <v-col cols="12">
            <span>{{
              `${item.year} ${item.make} ${item.model}`
            }}</span>
            <br />
            <span>{{ `${item.lastName}, ${item.firstName}` }}</span>
          </v-col>
        </template>
        <template v-else>
          <!-- Tech Details -->
          <v-col
            cols="12"
            class="px-0"
          >
            <custom-key-value-pair
              flat
              class="border-a"
              :config="[
                {
                  title: 'Estimator:',
                  value: item.estimator,
                },
                {
                  title: 'Body Tech:',
                  value: item.bodyTech,
                },
                {
                  title: 'Paint Tech:',
                  value: item.paintTech,
                },
                {
                  title: 'Frame Tech:',
                  value: item.frameTech,
                },
                {
                  title: 'Mech Tech:',
                  value: item.mechTech,
                },
                {
                  title: 'Detail Tech:',
                  value: item.detailTech,
                },
              ]"
            />
          </v-col>
          <!-- Estimate Amount + Table -->
          <v-col
            cols="12"
            class="px-0 pt-0"
          >
            <custom-key-value-pair
              flat
              class="border-a"
              :config="[
                {
                  title: 'Estimate Amount:',
                  value: '$000,000.00',
                },
              ]"
            />
            <custom-data-table
              id="body-tech-table"
              normalize-table
              hideDefaultFooter
              :headers="[
                {
                  title: 'Total Hrs',
                  value: '$$default',
                  valueFrom: 'totalHrs',
                },
                {
                  title: 'Body',
                  value: '$$default',
                  valueFrom: 'body',
                },
                {
                  title: 'Mech',
                  value: '$$default',
                  valueFrom: 'mech',
                },
                {
                  title: 'Frame',
                  value: '$$default',
                  valueFrom: 'frame',
                },
                {
                  title: 'Paint',
                  value: '$$default',
                  valueFrom: 'paint',
                },
              ]"
              :items="[item]"
            />
          </v-col>
          <!-- Second Table -->
          <v-col
            cols="12"
            class="px-0 pt-0"
          >
            <custom-data-table
              id="body-tech-table"
              normalize-table
              hideDefaultFooter
              class="border-t"
              :headers="[
                {
                  title: 'Total Parts',
                  value: '$$default',
                  valueFrom: 'totalParts',
                },
                {
                  title: 'Ordered',
                  value: '$$default',
                  valueFrom: 'ordered',
                },
                {
                  title: 'Delivered',
                  value: '$$default',
                  valueFrom: 'delivered',
                },
              ]"
              :items="[item]"
            />
          </v-col>
        </template>
      </v-row>
    </template>
  </custom-expansion-panel>

  <confirmation-modal
    v-model="toggleConfirmationModal"
    :title="`Update Stage? :- ${config.title}?`"
    @cancel="toggleConfirmationModal = !toggleConfirmationModal"
    @confirm="confirmStageChange"
  />

  <view-image-dialog
    v-if="showImage"
    v-model="showImage"
    src="icons/cmx.jpeg"
  />
</template>

<script setup>
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomDropDown from '@/shared/components/CustomDropDown.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomKeyValuePair from '@/shared/components/CustomKeyValuePair.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import ViewImageDialog from '@/components/ViewImageDialog.vue';
import { ref } from 'vue';
import _ from 'lodash';
import { useDisplay } from 'vuetify';
import { getImageUrl } from '@/composables';

const vuetifyDisplay = useDisplay();
const emits = defineEmits(['dragComplete', 'handleItemStageChange']);
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
  listIndex: {
    type: Number,
    default: () => {},
  },
  draggedTask: {
    type: Object,
    default: () => {},
  },
  mappedStages: {
    type: Array,
    default: () => {},
  },
});

const toggleConfirmationModal = ref(false);
const showImage = ref(false);
const selectedItem = ref({});
const flowXBodyTopLinks = ref([
  { title: 'View Folder X', icon: 'openicon.png' },
  {
    title: 'View Photos',
    icon: 'photo.png',
    onClick: () => {
      showImage.value = !showImage.value;
    },
  },
  { title: 'View Estimate', icon: 'file.png' },
  { title: 'Print File', icon: 'print.png' },
  { title: 'Timeline', icon: 'chatAX.png' },
  { title: 'Flag Tech', icon: 'f-icon.png' },
]);

const onDragStart = (event, itemIndex) => {
  props.draggedTask.listIndex = props.listIndex;
  props.draggedTask.itemIndex = itemIndex;

  if (event) {
    const preview = document.getElementById(
      `item-${itemIndex}-${props.listIndex}`
    );
    event.dataTransfer.setDragImage(preview, 50, 50);
  }
};
const onDragOver = (event) => {
  event.preventDefault();
};
const onDrop = (targetItemIndex) => {
  emits('dragComplete', {
    targetListIndex: props.listIndex,
    targetItemIndex,
  });
  props.draggedTask.listIndex = null;
  props.draggedTask.itemIndex = null;
};
const dropDownClicked = (stage, itemIndex) => {
  selectedItem.value.stage = stage;
  selectedItem.value.itemIndex = itemIndex;
  selectedItem.value.listIndex = props.listIndex;
  toggleConfirmationModal.value = !toggleConfirmationModal.value;
};
const confirmStageChange = () => {
  emits('handleItemStageChange', selectedItem.value);
  toggleConfirmationModal.value = !toggleConfirmationModal.value;
};
</script>

<style lang="scss">
.expand-btn {
  .v-btn__content {
    text-wrap: wrap;
    color: rgba(var(--v-theme-grey)) !important;
  }
}

.body-tech-panel::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.body-tech-content {
  span,
  td,
  tr {
    font-size: 16px !important;
  }
}

.image-dialog {
  --v-overlay-opacity: 0.92;
}
</style>
