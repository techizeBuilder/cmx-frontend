<template>
  <custom-card
    title="RO Quick View"
    cardTextStyle="pb-7"
  >
    <v-row>
      <v-col
        cols="9"
        md="10"
        class="pb-1"
      >
        <custom-field
          v-model="inputValue"
          id="quick-search"
          append-inner-icon="mdi-magnify"
          placeholder="Quick Search"
          hide-details
          clearable
          @keydown.enter.prevent="onSearch"
        />
      </v-col>

      <v-col
        cols="3"
        md="2"
        class="d-flex align-center"
      >
        <help-menu
          style="margin-left: auto"
          :options="[
            'Customer ID',
            'Estimate ID',
            'RO #',
            'First Name',
            'Last Name',
            'Company',
            'Customer Phone',
          ]"
          :optionsSecond="[
            'Last 6 of VIN',
            'Year, Make or Model',
            'Claim#',
            'Insurance',
            'Email',
            'Vehicle',
          ]"
        />
      </v-col>
      <v-col
        cols="10"
        class="pt-0"
      >
        <custom-btn
          id="quick-search-btn"
          class="rounded-lg float-right bg-btn my-elevation"
          @click="onSearch"
        >
          Search
        </custom-btn>
      </v-col>
    </v-row>
  </custom-card>
</template>

<script setup>
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import HelpMenu from '@/components/HelpMenu.vue';
import { ref } from 'vue';

const $emit = defineEmits(["onInputChange"]);

const inputValue = ref(null);

const onSearch = () => {
  $emit("onInputChange", inputValue.value);
};

</script>
