<template>
  <custom-select
    v-model="selectedItem"
    :loading="isLoading"
    :items="vehiclesList.customerVehicals"
    item-title="model"
    return-object
    v-bind="attrs"
  >
    <template #prepend-item>
      <div
        v-if="vehiclesList && vehiclesList.customerVehicals?.length"
        class="px-3 text-grey-darken-1 text-subtitle-2"
      >
        Select Vehicle
      </div>
    </template>

    <template #selection="{ item }">
      {{ getListItemTitle(item.raw) }}
    </template>

    <template #item="{ item, props: itemProps }">
      <v-list-item
        density="compact"
        v-bind="itemProps"
        :title="getListItemTitle(item.raw)"
      >
      </v-list-item>
    </template>

    <template #append-item>
      <custom-btn
        id="add-vehicles"
        flat
        color="grey-lighten-2"
        block
        @click="() => emits('click:addVehicleBtn')"
      >
        Add Vehicle
      </custom-btn>
    </template>

    <template #no-data>
      <span class="px-4 text-error text-subtitle-1">
        No vehicles found!
      </span>
    </template>
  </custom-select>
</template>

<script setup>
import CustomSelect from '@/shared/components/CustomSelect.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import { computed, onMounted } from 'vue';
import { ref, useAttrs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { showErrorToast } from '@/toster';
import { isArray } from 'lodash';

const route = useRoute();
const attrs = useAttrs();
const store = useStore();

const emits = defineEmits([
  'update:modelValue',
  'click:addVehicleBtn',
]);
const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: () => {},
  },
  customerDetails: {
    type: Object,
    default: () => {},
  },
});

const isLoading = ref(false);

const vehiclesList = computed(() => {
  const { data } = store.getters.customerVehicleDetails;
  return isArray(data) ? data[0] : {};
});
const selectedItem = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

const getListItemTitle = (item) => {
  return `${item.year ?? ''} ${item.make ?? ''} ${item.model ?? ''}`;
};

onMounted(() => {});
</script>

<style lang="scss">
.v-list {
  padding-bottom: 0 !important;
}
</style>
