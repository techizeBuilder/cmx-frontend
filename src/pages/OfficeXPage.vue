<template>
  <v-row>
    <page-header
      title="OfficeX"
      to="/"
      mb="1"
    />

    <v-col
      v-for="(item, index) in topDetailsList"
      :key="index"
      cols="2"
      class="pt-0"
    >
      <v-card
        class="card-wrapper px-2 py-3"
        :style="{
          backgroundColor: item.bgColor,
        }"
      >
        <div>
          <div class="d-flex justify-space-between">
            <p class="justify-start mb-2">
              {{ item.title.toUpperCase() }}
            </p>
            <v-menu>
              <template #activator="{ props }">
                <v-btn
                  size="x-small"
                  variant="text"
                  icon="mdi-dots-vertical"
                  v-bind="props"
                />
              </template>
              <custom-card cardTextStyle="pa-2">
                <v-list
                  class="py-0"
                  density="compact"
                >
                  <v-list-item value="1">Action</v-list-item>
                  <v-list-item value="2">Update</v-list-item>
                  <v-list-item value="3">Pending</v-list-item>
                </v-list>
              </custom-card>
            </v-menu>
          </div>
          <h1 class="text-center font-weight-bold">
            {{ item.number }}
          </h1>
          <p class="text-center mb-0 font-weight-bold">
            {{ item.hdata }}
          </p>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12">
      <custom-expansion-panel
        v-model="activePanels"
        :panels="panels"
      >
        <template #appendIcon-0>
          <v-menu>
            <template #activator="{ props }">
              <custom-btn
                id="newEstimateAppointmentBtn"
                size="x-small"
                icon
                variant="text"
                v-bind="props"
                @click.stop
              >
                <v-icon>mdi-plus-circle</v-icon>
              </custom-btn>
            </template>

            <custom-card cardTextStyle="pa-2">
              <v-list
                class="py-0"
                density="compact"
              >
                <v-list-item
                  to="/newestimateappoitment"
                  value="1"
                >
                  New Estimate Appointment
                </v-list-item>
              </v-list>
            </custom-card>
          </v-menu>
        </template>
      </custom-expansion-panel>
    </v-col>

    <scroll-to-top />
  </v-row>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import EstimateAppointment from '@/components/OfficeX/EstimateAppointment.vue';
import ReadyForPickup from '@/components/OfficeX/ReadyForPickup.vue';
import DeliveredPanel from '@/components/OfficeX/DeliveredPanel.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const topDetailsList = ref([
  {
    title: 'ESTIMATE APPOINTMENT',
    number: '7',
    link: '',
    hdata: 'TODAY',
    bgColor: '#f0f511',
  },
  {
    title: 'Drop Off Appointment',
    number: '12',
    link: 'BodyTechA',
    hdata: 'TODAY',
    bgColor: '#ccdff1',
  },
  {
    title: 'Ready for pickup',
    number: '8',
    link: 'BodyTechA',
    hdata: 'ALL',
    bgColor: '#4dac73',
  },
]);
const panels = ref([
  {
    title: 'Estimate Appointment',
    component: shallowRef(EstimateAppointment),
  },
  {
    title: 'Drop Off Appointment',
    // component: shallowRef(EstimateAppointment),
  },
  {
    title: 'Ready For Pickup',
    component: shallowRef(ReadyForPickup),
  },
  {
    title: 'Delivered - Final Pending',
    component: shallowRef(DeliveredPanel),
  },
]);
const activePanels = ref([0]);
</script>

<style lang="scss">
.card-wrapper {
  border: 3px solid white;

  p {
    font-size: 13px;
    font-weight: 600;
  }

  div > div > p {
    letter-spacing: 2px;
  }
}
</style>
