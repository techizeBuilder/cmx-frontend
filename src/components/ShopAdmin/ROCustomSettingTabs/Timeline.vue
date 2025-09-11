<template>
  <v-container
    fluid
    class="timeline-tab-container"
  >
    <v-row justify="center">
      <v-col cols="12">
        <p class="text-error font-13">
          Notice: Custom changes to Timeline will change the timeline
          to open RO files.
        </p>
      </v-col>

      <v-col
        cols="5"
        md="3"
        sm="3"
      >
        <custom-card
          flat
          class="border-md rounded-lg"
          cardTextStyle="pa-2"
        >
          <v-row>
            <v-col
              cols="12"
              class="bg-header"
            >
              <h5 class="mb-0 text-grey-darken-1">
                Default Timeline
              </h5>
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-end pr-7"
            >
              <v-switch
                v-model="defaultTimeLineSelected"
                color="blue"
                hide-details
                density="compact"
              />
            </v-col>

            <v-col
              cols="12"
              class="pt-0 px-5"
            >
              <p
                v-for="(item, index) in timelineItem"
                :key="index"
                class="mb-2 font-16 text-grey-darken-1"
              >
                {{ item.name }}
              </p>
            </v-col>
          </v-row>
        </custom-card>
      </v-col>

      <v-col
        cols="5"
        md="3"
        sm="3"
      >
        <custom-card
          flat
          class="border-md rounded-lg"
          cardTextStyle="pa-2"
        >
          <v-row>
            <v-col
              cols="12"
              class="bg-header"
            >
              <h5 class="mb-0 text-grey-darken-1">Custom Timeline</h5>
            </v-col>
            <v-col
              cols="6"
              class="d-flex pl-7"
            >
              <v-switch
                :model-value="!defaultTimeLineSelected"
                color="blue"
                hide-details
                density="compact"
                @update:modelValue="
                  defaultTimeLineSelected = !defaultTimeLineSelected
                "
              />
            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-end"
            >
              <custom-btn
                id="edit-btn"
                color="grey-lighten-3"
                density="comfortable"
              >
                Edit
              </custom-btn>
            </v-col>

            <v-col
              cols="12"
              class="pt-0 px-7"
            >
              <v-switch
                v-for="(item, index) in timelineItem"
                :key="index"
                v-model="customTimeLineSelected"
                hide-details
                :disabled="defaultTimeLineSelected"
                multiple
                color="blue"
                :value="item.name"
                density="compact"
              >
                <template #label>
                  <span class="ml-4 font-16 text-grey-darken-1">
                    {{ item.name }}
                  </span>
                </template>
              </v-switch>
            </v-col>
          </v-row>
        </custom-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import { ref, watch } from 'vue';

const defaultTimeLineSelected = ref(true);
const customTimeLineSelected = ref([]);
const timelineItem = ref([
  { name: 'Arrived' },
  { name: 'Estimate Approved' },
  { name: 'Parts Ordered' },
  { name: 'Parts Arrived' },
  { name: 'Repair Plan' },
  { name: 'Supplement Hold' },
  { name: 'Supplement Approved' },
  { name: 'Body Frame' },
  { name: 'Mechanical' },
  { name: 'Paint' },
  { name: 'Reassembly' },
  { name: 'ADAS Mechanical' },
  { name: 'Detail' },
  { name: 'Ready for Pickup' },
  { name: 'Delivered' },
]);

watch(defaultTimeLineSelected, (newVal) => {
  if (newVal) {
    customTimeLineSelected.value = [];
  } else {
    customTimeLineSelected.value = timelineItem.value.map(
      (i) => i.name
    );
  }
});
</script>

<style lang="scss">
.timeline-tab-container {
  .font-13 {
    font-size: 13px !important;
  }
}
</style>
