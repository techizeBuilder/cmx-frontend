<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        class="d-flex justify-end ga-3"
      >
        <custom-btn
          id="add-btn"
          color="grey-lighten-3"
        >
          Add
        </custom-btn>
        <custom-btn
          id="cancel-btn"
          color="grey-lighten-3"
        >
          Cancel
        </custom-btn>
        <custom-btn
          id="edit-btn"
          color="grey-lighten-3"
        >
          Edit
        </custom-btn>
      </v-col>

      <v-col
        cols="6"
        md="4"
        sm="5"
      >
        <custom-card
          flat
          class="border-md"
          card-text-style="pa-7"
        >
          <v-row>
            <v-col
              cols="12"
              class="d-flex align-center ga-3"
            >
              <v-img
                :src="getImageUrl('icons/set.png')"
                width="24"
                max-width="24"
              />
              <h5 class="mb-0">File Custom Color</h5>
            </v-col>

            <v-col cols="12">
              <custom-field
                id="quick-search"
                placeholder="Quick Search"
                append-inner-icon="mdi-magnify"
                clearable
                @click:appendInner="() => {}"
              />
            </v-col>

            <v-col
              cols="12"
              class="px-6"
            >
              <v-switch
                v-for="(item, index) in items"
                :key="index"
                color="blue"
                density="compact"
                hide-details
              >
                <template #label>
                  <div
                    :style="{
                      backgroundColor: item.color,
                      width: '20px',
                      height: '20px',
                    }"
                    class="rounded ml-4"
                  />
                  <span class="ml-4 text-grey-darken-2">
                    {{ item.title }}
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
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomField from '@/shared/components/CustomField.vue';
import { getImageUrl } from '@/composables';
import { ref } from 'vue';

const items = ref([
  {
    id: 1,
    color: '#FFFB9F',
    title: 'Customer Pay',
  },
  {
    id: 2,
    color: '#FFB5B5',
    title: 'Total Loss',
  },
  {
    id: 3,
    color: '#DDC2FF',
    title: 'Insurance Name',
  },
  {
    id: 4,
    color: '#9FFFC6',
    title: 'Insurance Name',
  },
  {
    id: 5,
    color: '#8DBBFF',
    title: 'Insurance Name',
  },
  {
    id: 6,
    color: '#CFAF00',
    title: 'Insurance Name',
  },
  {
    id: 7,
    color: '#A7FFFF',
    title: 'Insurance Name',
  },
  {
    id: 8,
    color: '#CECECE',
    title: 'Insurance',
  },
]);
</script>
