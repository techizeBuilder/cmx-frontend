<template>
  <v-menu>
    <template #activator="{ props }">
      <custom-btn
        id="menu-btn"
        v-bind="{ ...props, ...btnProps }"
      >
        <slot name="btn">
          {{ text }}
        </slot>
      </custom-btn>
    </template>

    <custom-card cardTextStyle="pa-1">
      <v-list
        density="compact"
        class="pa-0"
        v-bind="listProps"
      >
        <v-list-item
          v-for="(item, index) in list"
          :key="index"
          :value="item"
          @click="
            () => {
              emits('click:list-item', item);
            }
          "
        >
          {{ item }}
        </v-list-item>
      </v-list>
    </custom-card>
  </v-menu>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomCard from '@/shared/components/CustomCard.vue';

const emits = defineEmits(['click:list-item']);
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: [],
  },
  listProps: {
    type: Object,
    default: () => {},
  },
  btnProps: {
    type: Object,
    default: () => {},
  },
});
</script>
