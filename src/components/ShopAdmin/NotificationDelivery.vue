<template>
  <v-row>
    <v-col cols="12">
      <v-switch
        color="blue"
        label="System Notification"
        inset
        hide-details
      ></v-switch>

      <custom-field
        id="notification-delivery-email"
        placeholder="Enter Email"
        class="mb-4"
        :model-value="localEmail"
        @update:modelValue="onEmailInput"
        :required="true"
        :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Enter a valid email']"
        :disabled="props.disabled"
      >
        <template #prepend>
          <v-switch
            color="blue"
            inset
            density="compact"
            hide-details
          ></v-switch>
        </template>
      </custom-field>

      <custom-field
        id="notification-delivery-email"
        placeholder="Enter Cell # SMS"
      >
        <template #prepend>
          <v-switch
            color="blue"
            inset
            density="compact"
            hide-details
          ></v-switch>
        </template>
      </custom-field>
    </v-col>
  </v-row>
</template>

<script setup>
import CustomField from '@/shared/components/CustomField.vue';

import { ref, watch } from 'vue';
const emits = defineEmits(['update:payload']);
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const localEmail = ref(props.data?.notificationEmail || '');

watch(() => props.data?.notificationEmail, (val) => {
  localEmail.value = val || '';
});

function onEmailInput(val) {
  localEmail.value = val;
  emits('update:payload', { notificationEmail: val });
}
</script>
