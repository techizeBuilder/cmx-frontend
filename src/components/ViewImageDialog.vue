<template>
  <v-dialog
    v-model="toggleDialog"
    fullscreen
    transition="dialog-bottom-transition"
    overlay
    class="image-dialog"
  >
    <template #default="{ isActive }">
      <v-row
        class="mx-16 my-auto"
        style="max-height: 100vh"
      >
        <v-col
          cols="11"
          class="d-flex align-center justify-end pr-0"
          style="max-height: 100vh"
        >
          <v-img
            :src="getImageUrl(src)"
            width="100%"
            contain
          />
        </v-col>
        <v-col
          cols="1"
          class="d-flex justify-end position-absolute ga-2 pl-0"
          style="right: 10px"
        >
          <custom-btn
            v-for="(action, index) in actions"
            :key="index"
            id="close-btn"
            color="white"
            variant="tonal"
            icon
            size="small"
            class="close-btn rounded-md"
            @click="action.onClick"
          >
            <v-icon size="large">
              {{ action.icon }}
            </v-icon>
          </custom-btn>
        </v-col>
      </v-row>
    </template>
  </v-dialog>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import { ref } from 'vue';
import { computed } from 'vue';
import { getImageUrl } from '@/composables';

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  src: {
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

const actions = ref([
  {
    icon: 'mdi-magnify-plus-outline',
  },
  {
    icon: 'mdi-fullscreen',
  },
  {
    icon: 'mdi-close',
    onClick: () => {
      toggleDialog.value = !toggleDialog.value;
    },
  },
]);
</script>
