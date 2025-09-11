<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-end ga-3"
      >
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
        <custom-btn
          id="save-btn"
          color="grey-lighten-3"
        >
          Save
        </custom-btn>
      </v-col>

      <v-col
        cols="12"
        class="pb-0"
      >
        <span class="font-16 ml-7">Authorization For Repairs 1</span>
      </v-col>
      <v-col
        cols="12"
        class="pt-1 d-flex ga-5"
      >
        <v-switch
          color="blue"
          hide-details
          density="comfortable"
        />
        <custom-field
          id="field-xyz"
          type="textarea"
          class="w-100"
          :show-placeholder="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
</script>
