<template>
  <v-dialog
    v-model="toggleDialog"
    max-width="700"
  >
    <custom-card
      title="Open New File"
      :title-props="{
        class:
          'd-flex align-center justify-space-between pr-1 font-weight-medium',
      }"
      class="bg-secondary"
      :text-props="{
        style: {
          padding: '10px !important',
        },
      }"
    >
      <template #title-append>
        <custom-btn
          id="close-dialog"
          icon
          size="small"
          class="float-right"
          variant="text"
          color="link"
          @click="() => emits('close')"
        >
          <v-icon>mdi-close</v-icon>
        </custom-btn>
      </template>
      <v-row class="bg-white ma-1 rounded-lg">
        <v-col cols="12">
          <generic-form
            ref="estimateProfileModal"
            :fields-config="fieldsConfig"
            :disabled="disableForm"
            :data="data"
            @update:payload="payloadUpdated"
          />
        </v-col>
        <v-col
          cols="12"
          class="d-flex justify-end ga-4"
        >
          <custom-btn
            id="cancel-btn"
            color="btn"
            density="comfortable"
            :disabled="isLoading"
            @click="() => emits('close')"
          >
            Cancel
          </custom-btn>
          <custom-btn
            id="edit-btn"
            color="myGreen"
            density="comfortable"
            prepend-icon="mdi-content-save-outline"
            :loading="isLoading"
            @click="onSubmit"
          >
            Continue
          </custom-btn>
        </v-col>
      </v-row>
    </custom-card>
  </v-dialog>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import GenericForm from '@/shared/forms/GenericForm.vue';
import { ref } from 'vue';
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue', 'close', 'onSubmit']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => {},
  },
  disableForm: {
    type: Boolean,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: () => {},
  },
  fieldsConfig: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Object,
    default: () => {},
  },
});

const formPayload = ref({});

const toggleDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

const payloadUpdated = ({ payload }) => {
  formPayload.value = payload;
};
const onSubmit = () => {
  const fakeInsuranceId = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const payloadWithInsurance = {
    ...formPayload.value,
    insuranceId: fakeInsuranceId,
  };
  emits('onSubmit', payloadWithInsurance);
};
</script>
