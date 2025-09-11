<template>
  <v-row>
    <page-header
      title="Import Estimate"
      to="/"
      mb="1"
    />

    <v-col cols="12">
      <custom-field
        id="quick search"
        placeholder="Quick Search"
        append-inner-icon="mdi-magnify"
        class="w-50"
        clearable
        bg-color="white"
        @click:appendInner="() => {}"
      />

      <custom-select
        id="select-filter"
        placeholder="Select Filter"
        class="w-40 mt-4"
        bg-color="white"
        hide-details
        :items="[
          'Filter',
          'Date',
          'Last name',
          'Insurance',
          'Claim',
          'Estimate Date',
          'Imported Date',
          'Estimate Platform',
          'Estimate Amount',
          'Vehicle Year',
          'Vehicle Make',
          'VIN',
        ]"
      />
    </v-col>

    <v-col
      v-for="(item, index) in estimates"
      :key="index"
      cols="12"
    >
      <custom-card class="import-estimate">
        <v-row>
          <v-col
            cols="2"
            class="px-0 d-flex flex-column justify-center align-center text-center"
          >
            <custom-btn
              id="select-estimate"
              color="#ff8100"
              @click="toggleDialog = !toggleDialog"
            >
              Select
            </custom-btn>

            <div class="mt-5 font-16 font-weight-regular">
              <p class="mb-0">0</p>
              <p>Open File</p>
            </div>
          </v-col>
          <v-col cols="2">
            <p
              class="mb-0"
              style="font-size: 16px"
            >
              Owner
            </p>
            <custom-key-value-pair
              background-color="#e6f0ff"
              :config="[
                {
                  title: 'First Name',
                },
                {
                  title: 'Last Name',
                },
                {
                  title: 'Company Name',
                },
                {
                  title: 'Email',
                },
              ]"
            />
          </v-col>
          <v-col cols="2">
            <p
              class="mb-0"
              style="font-size: 16px"
            >
              Vehicle
            </p>
            <custom-key-value-pair
              background-color="#e6f0ff"
              :config="[
                {
                  title: 'VIN',
                },
                {
                  title: 'Year',
                },
                {
                  title: 'Make',
                },
                {
                  title: 'Model',
                },
              ]"
            />
          </v-col>
          <v-col cols="2">
            <p
              class="mb-0"
              style="font-size: 16px"
            >
              Insurance
            </p>
            <custom-key-value-pair
              background-color="#e6f0ff"
              :config="[
                {
                  title: 'Insurance Name',
                },
                {
                  title: 'Claim #',
                },
                {
                  title: 'Deductible',
                },
                {
                  title: '',
                },
              ]"
            />
          </v-col>
          <v-col
            cols="2"
            class="mt-6"
          >
            <custom-key-value-pair
              background-color="#e6f0ff"
              :config="[
                {
                  title: 'Estimate Platform Name',
                },
                {
                  title: 'Estimate Amount',
                },
                {
                  title: 'Estimate Stage',
                },
                {
                  title: '',
                },
              ]"
            />
          </v-col>
          <v-col
            cols="2"
            class="mt-6"
          >
            <custom-key-value-pair
              background-color="#e6f0ff"
              :config="[
                {
                  title: 'Estimate Date | Time',
                  strong: true,
                },
                {
                  title: 'Estimate Date | Time',
                },
                {
                  title: 'Import Date | Time',
                  strong: true,
                },
                {
                  title: 'Import Date | Time',
                },
              ]"
            />
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
  </v-row>

  <v-dialog
    v-model="toggleDialog"
    width="500"
    transition="dialog-bottom-transition"
  >
    <custom-card cardTextStyle="pa-0 overflow-hidden">
      <v-row class="pa-2">
        <v-col
          cols="12"
          class="d-flex align-center justify-space-between bg-secondary px-4 pt-3"
        >
          <h4 class="mb-0">Select Action</h4>
          <custom-btn
            id="close-modal-btn"
            icon
            size="small"
            variant="text"
            @click="toggleDialog = !toggleDialog"
          >
            <v-icon
              size="26"
              color="grey-darken-2"
            >
              mdi-close
            </v-icon>
          </custom-btn>
        </v-col>

        <v-col
          cols="12"
          class="py-5 px-7"
        >
          <p class="mb-10 font-16 font-weight-regular">
            Customer Full Name
          </p>

          <custom-btn
            id="create-estimate-profile"
            block
            color="#FDAD0E"
            class="my-7"
          >
            <template #prepend>
              <v-img
                :src="getImageUrl('icons/createEstimateProfile.png')"
                alt="createEst"
                width="18"
                max-width="18"
                class="mr-2"
              />
            </template>
            Create Estimate Profile
          </custom-btn>
          <custom-btn
            id="create-folder-x"
            block
            color="#FF8100"
            class="mb-10"
          >
            <template #prepend>
              <v-img
                :src="getImageUrl('icons/CreateFolderx.png')"
                alt="createEst"
                width="18"
                max-width="18"
                class="mr-2"
              />
            </template>
            Create Folder X
          </custom-btn>
        </v-col>

        <v-col
          cols="12"
          class="d-flex justify-space-between px-7 mb-4"
        >
          <custom-btn
            id="create-btn"
            color="#D1D1D1"
          >
            Create
          </custom-btn>
          <custom-btn
            id="import-btn"
            color="#D1D1D1"
          >
            Import
          </custom-btn>
        </v-col>
      </v-row>
    </custom-card>
  </v-dialog>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomSelect from '@/shared/components/CustomSelect.vue';
import CustomKeyValuePair from '@/shared/components/CustomKeyValuePair.vue';
import { ref } from 'vue';
import { getImageUrl } from '@/composables';

const toggleDialog = ref(false);
const estimates = ref([
  {
    title: '',
  },
  {
    title: '',
  },
  {
    title: '',
  },
]);
</script>

<style lang="scss">
.import-estimate {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) !important;

  .key-value {
    .key {
      font-size: 12px !important;
    }
  }
}
</style>
