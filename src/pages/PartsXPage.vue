<template>
  <v-row class="header-links-wrapper">
    <v-col cols="12">
      <v-menu>
        <template #activator="{ props }">
          <custom-btn
            id="options"
            color="accent"
            append-icon="mdi-chevron-down"
            class="float-right"
            v-bind="props"
          >
            Options
          </custom-btn>
        </template>

        <custom-card cardTextStyle="pa-0">
          <v-list density="compact">
            <v-list-item @click="() => {}"> Open New RO </v-list-item>
            <v-list-item @click="() => {}"> Print Tags </v-list-item>
            <v-list-item @click="() => {}"> Print Final </v-list-item>
          </v-list>
        </custom-card>
      </v-menu>
    </v-col>

    <v-col
      v-for="(link, index) in topHeaderLinks"
      :key="index"
      cols="6"
      md="2"
      sm="3"
    >
      <header-card
        :link="link"
        @click:link="linkClicked"
      />
    </v-col>

    <v-spacer class="w-100" />

    <v-col
      v-for="(link, index) in linksSection"
      :key="index"
      cols="6"
      md="2"
      sm="3"
    >
      <header-card
        :link="link"
        @click:link="linkClicked"
      />
    </v-col>

    <v-col
      cols="12"
      class="d-flex justify-end ga-5 my-2"
    >
      <v-img
        :src="getImageUrl('icons/zoomout.png')"
        alt="zoomout"
        width="23"
        max-width="23"
      />
      <v-img
        :src="getImageUrl('icons/expand.png')"
        alt="expandImg"
        width="23"
        max-width="23"
      />
    </v-col>

    <v-col cols="12">
      <custom-expansion-panel
        v-model="activePanels"
        :panels="panels"
        multiple
      >
        <template
          v-for="(panel, index) in panels"
          :key="index"
          #[`content-${index}`]
        >
          <custom-data-table
            :id="`${panel.title}--${index}`"
            :headers="panel.headers"
            :items="panel.items"
          >
            <template #headers="{ columns, isSorted, toggleSort }">
              <tr class="text-center table-header-row">
                <template
                  v-for="column in columns"
                  :key="column.key"
                >
                  <th
                    colspan="1"
                    rowspan="1"
                    class="v-data-table__td v-data-table-column--align-start v-data-table__th text-center"
                    :style="{
                      backgroundColor: `${
                        column.color ||
                        'rgba(var(--custom-table-header-color))'
                      } !important`,
                      width: column.width || '200px',
                      minWidth: column.minWidth,
                    }"
                  >
                    <span class="mr-2 fw-bold">
                      {{
                        column.title || _.startCase(column.valueFrom)
                      }}
                    </span>
                  </th>
                </template>
              </tr>
            </template>

            <template #item.$$action="{ item, column }">
              <custom-drop-down
                :list="['Action', 'Update', 'Pending']"
                location="right"
                :btn-props="{
                  icon: true,
                  variant: 'text',
                  size: 'small',
                  color: 'blue',
                }"
              >
                <template #btn>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </template>
              </custom-drop-down>
            </template>
          </custom-data-table>
        </template>
      </custom-expansion-panel>
    </v-col>

    <scroll-to-top />
  </v-row>
</template>

<script setup>
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import CustomDropDown from '@/shared/components/CustomDropDown.vue';
import HeaderCard from '@/components/ProductionX/HeaderCard.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { ref } from 'vue';
import { getImageUrl } from '@/composables';

const topHeaderLinks = ref([
  {
    id: 'all-vehicles',
    className: 'bg-white',
    title: 'All Vehicles',
    number: '59',
  },
  {
    id: 'needs-ordered',
    className: 'bg-yellow',
    title: 'Needs Ordered',
    number: '7',
    belowNumberText: 'Parts',
  },
  {
    id: 'ordered',
    className: 'bg-blue',
    title: 'Ordered',
    number: '12',
    belowNumberText: 'Parts',
  },
  {
    id: 'partial-delivery',
    className: 'bg-light-green',
    title: 'Partial Delivery',
    number: '8',
    belowNumberText: 'Parts',
  },
  {
    id: 'delivered-100',
    className: 'bg-green',
    title: 'Delivered 100%',
    number: '8',
    belowNumberText: 'Parts',
  },
]);

const linksSection = ref([
  {
    id: 'pending-returns',
    className: 'bg-pink',
    title: 'Pending Returns',
    number: '10',
    belowNumberText: 'In Shop',
  },
  {
    id: 'returns',
    className: 'bg-red',
    title: 'Returns',
    number: '10',
    belowNumberText: 'Pending Credit',
  },
  {
    id: 'supplement-hold',
    className: 'bg-peach',
    title: 'Supplement Hold',
    number: '10',
    belowNumberText: 'Parts',
  },
  {
    id: 'supplement-approved',
    className: 'bg-orange',
    title: 'Supplement Approved',
    number: '8',
    belowNumberText: 'Parts',
  },
  {
    id: 'parts-stock',
    className: 'bg-gray',
    title: 'Parts Stock',
    number: '10',
    belowNumberText: 'Parts',
  },
  {
    id: '100%-parts-to-tech',
    className: 'bg-purple',
    title: '100% Parts To Tech',
    number: '9',
  },
]);

const activePanels = ref([]);

const panels = ref([
  {
    id: 'all-vehicles',
    title: 'All Vehicles',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'S.Hold',
        value: '$$default',
        valueFrom: 'sHold',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'S.Approved',
        value: '$$default',
        valueFrom: 'sApproved',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Parts Count',
        value: '$$default',
        valueFrom: 'partsCount',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Needs',
        value: '$$default',
        valueFrom: 'needs',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Ordered',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Arrived 100%',
        value: '$$default',
        valueFrom: 'arrived100%',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Partial',
        value: '$$default',
        valueFrom: 'partial',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'P.Return',
        value: '$$default',
        valueFrom: 'pReturn',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'PC Return',
        value: '$$default',
        valueFrom: 'pcReturn',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    items: [],
    background: '#000000',
    icon: 'allVehicles.png',
  },
  {
    id: 'needs-ordered',
    title: 'Needs Ordered',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Total Parts',
        value: '$$default',
        valueFrom: 'totalParts',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Needs Ordered',
        value: '$$default',
        valueFrom: 'needsOrdered',
        color: '#ccdff1',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    items: [],
    background: '#F0F511',
    icon: 'pendingOrder.png',
  },
  {
    id: 'ordered',
    title: 'Ordered',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Total Parts',
        value: '$$default',
        valueFrom: 'totalParts',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Needs Ordered',
        value: '$$default',
        valueFrom: 'needsOrdered',
        color: '#ccdff1',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#ccdff1',
    icon: 'order.png',
  },
  {
    id: 'partial-delivery',
    title: 'Partial Delivery',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'Preview',
        value: '$$default',
        valueFrom: 'preview',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Total Parts',
        value: '$$default',
        valueFrom: 'totalParts',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Ordered',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Partial',
        value: '$$default',
        valueFrom: 'partial',
        color: '#B9DBC7',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#B9DBC7',
    icon: 'partial.png',
  },
  {
    id: 'delivered-100',
    title: 'Delivered 100%',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Total Parts',
        value: '$$default',
        valueFrom: 'totalParts',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Ordered',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Delivered 100%',
        value: '$$default',
        valueFrom: 'delivered',
        color: '#4DAC73',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#4DAC73',
    icon: 'delivery.png',
  },
  {
    id: 'pending-returns',
    title: 'Pending Returns',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Parts Count',
        value: '$$default',
        valueFrom: 'partsCount',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'P.Return',
        value: '$$default',
        valueFrom: 'pReturn',
        color: '#F0C9C9',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#F0C9C9',
    icon: 'pendingReturn.png',
  },
  {
    id: 'returns',
    title: 'Pending Return Credit',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Parts Count',
        value: '$$default',
        valueFrom: 'partsCount',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'PC Return',
        value: '$$default',
        valueFrom: 'pReturn',
        color: '#FF4C4C',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#FF4C4C',
    icon: 'pending.png',
  },
  {
    id: 'supplement-hold',
    title: 'Supplement Hold',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'Parts Count',
        value: '$$default',
        valueFrom: 'partsCount',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'PC Return',
        value: '$$default',
        valueFrom: 'pReturn',
        color: '#FF4C4C',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#FFDDBA',
    icon: 'supplement.png',
  },
  {
    id: 'supplement-approved',
    title: 'Supplement Approved (Pending Color)',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'S.Approved',
        value: '$$default',
        valueFrom: 'partsCount',
        color: '#FFAA52',
      },
      {
        title: 'Parts Count',
        value: '$$default',
        valueFrom: 'pReturn',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Ordered',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Arrived 100%',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Partial',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'P.Return',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'PC Return',
        value: '$$default',
        valueFrom: 'ordered',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#FFAA52',
    icon: 'suppApproved.png',
  },
  {
    id: 'parts-stock',
    title: 'Parts Stock',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'Preview',
        value: '$$default',
        valueFrom: 'folderX',
        color: '#D2D4D7',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
        color: '#D2D4D7',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'year',
        color: '#D2D4D7',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'make',
        color: '#D2D4D7',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'model',
        color: '#D2D4D7',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'vin',
        color: '#D2D4D7',
      },
      {
        title: 'Part #',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: '#D2D4D7',
      },
      {
        title: 'Part Name',
        value: '$$default',
        valueFrom: 'paintTech',
        color: '#D2D4D7',
      },
      {
        title: 'Inventory Date',
        value: '$$default',
        valueFrom: 'paintTech',
        color: '#D2D4D7',
      },
      {
        title: 'Vendor',
        value: '$$default',
        valueFrom: 'paintTech',
        color: '#D2D4D7',
      },
      {
        title: 'MSRP',
        value: '$$default',
        valueFrom: 'paintTech',
        color: '#D2D4D7',
      },
      {
        title: 'Cost',
        value: '$$default',
        valueFrom: 'paintTech',
        color: '#D2D4D7',
      },
    ],
    background: '#D2D4D7',
    icon: 'partsStock.png',
  },
  {
    id: '100%-parts-to-tech',
    title: 'Parts To Tech 100%',
    headers: [
      {
        title: ' ',
        value: '$$action',
      },
      {
        title: 'FolderX',
        value: '$$default',
        valueFrom: 'folderX',
      },
      {
        title: 'Action Date',
        value: '$$default',
        valueFrom: 'actionDate',
      },
      {
        title: 'Timeline',
        value: '$$default',
        valueFrom: 'timeline',
      },
      {
        title: 'V.Arrival',
        value: '$$default',
        valueFrom: 'vArrival',
      },
      {
        title: 'V.Target',
        value: '$$default',
        valueFrom: 'vTarget',
      },
      {
        title: 'S.Hold',
        value: '$$default',
        valueFrom: 'partsCount',
        color: '#F6F7C9',
      },
      {
        title: 'S.Approved',
        value: '$$default',
        valueFrom: 'pReturn',
        color: '#FFAA52',
      },
      {
        title: 'Parts Count',
        value: '$$default',
        valueFrom: 'year',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Needs',
        value: '$$default',
        valueFrom: 'make',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Ordered',
        value: '$$default',
        valueFrom: 'model',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Arrived 100%',
        value: '$$default',
        valueFrom: 'vin',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Partial',
        value: '$$default',
        valueFrom: 'bodyTech',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'P.Return',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'PC Return',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 102, 255, 0.09)',
      },
      {
        title: 'Year',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Make',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Model',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'VIN',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(255, 129, 0, 0.40)',
      },
      {
        title: 'Body Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
      {
        title: 'Paint Tech',
        value: '$$default',
        valueFrom: 'paintTech',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    ],
    background: '#9747FF',
    icon: 'partsToTech.png',
  },
]);

const linkClicked = (link) => {
  const index = panels.value.findIndex((p) => p.id === link.id);
  if (!activePanels.value.includes(index)) {
    activePanels.value.push(index);
  }
};
</script>

<style lang="scss" scoped>
.header-links-wrapper {
  a {
    color: black !important;
  }
  .bg-light-green {
    background-color: #b9dbc7 !important;
    color: black !important;
  }

  .bg-blue {
    background-color: #ccdff1 !important;
    color: black !important;
  }

  .bg-yellow {
    background-color: #f0f511 !important;
    color: black !important;
  }

  .bg-green {
    background-color: #4dac73 !important;
    color: black !important;
  }

  .bg-pink {
    background-color: #f0c9c9 !important;
    color: black !important;
  }

  .bg-red {
    background-color: #ff4c4c !important;
    color: black !important;
  }

  .bg-peach {
    background-color: #ffddba !important;
    color: black !important;
  }

  .bg-orange {
    background-color: #ffaa52 !important;
    color: black !important;
  }

  .bg-gray {
    background-color: #d2d4d7 !important;
    color: black !important;
  }

  .bg-purple {
    background-color: #9747ff !important;
    color: black !important;
  }

  .v-card {
    border: 3px solid white;
  }
}

.custom-data-table {
  --custom-table-header-color: 240, 241, 243;
}
</style>
