<template>
  <v-dialog
    v-model="toggleDialog"
    width="550"
    persistent
  >
    <custom-card
      cardTextStyle="pa-3"
      class="rounded-lg"
    >
      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center justify-space-between"
          style="border-bottom: 2px solid #63636336"
        >
          <slot name="title">
            <span class="font-16">{{ title }}</span>
          </slot>

          <custom-btn
            id="modal-close"
            icon
            variant="text"
            size="small"
            @click="toggleDialog = !toggleDialog"
          >
            <v-icon
              size="large"
              color="grey-darken-3"
            >
              mdi-close
            </v-icon>
          </custom-btn>
        </v-col>

        <v-col
          cols="12"
          class="d-flex justify-end ga-3 my-2"
        >
          <custom-btn
            id="confirm-btn"
            color="blue"
            @click="() => emits('confirm')"
          >
            Yes
          </custom-btn>
          <custom-btn
            id="cancel-btn"
            color="error"
            @click="() => emits('cancel')"
          >
            No
          </custom-btn>
        </v-col>
      </v-row>
    </custom-card>
  </v-dialog>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue', 'confirm', 'cancel']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  title: {
    type: String,
    default: () => {},
  },
});

const toggleDialog = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});
</script>
