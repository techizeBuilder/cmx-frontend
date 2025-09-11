<template>
  <v-form ref="genericForm">
    <v-row
      :justify="justifyRow"
      v-bind="rowProps"
    >
      <v-col
        v-for="(config, index) in fieldsConfig"
        :key="index"
        :cols="config.cols"
        :xl="config.md"
        :md="config.md"
        :sm="config.sm"
        v-bind="config.colProps"
      >
        <component
          v-if="config.type || config.id"
          :is="COMPONENT_TYPES[config.type] || COMPONENT_TYPES.field"
          :disabled="disabled"
          v-bind="{
            ...config,
            ...COMPONENT_DEFAULT_PROPS[config.type],
          }"
          v-model="payload[config.vModel]"
          v-on="config.listeners ?? {}"
        ></component>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import CustomField from '@/shared/components/CustomField.vue';
import CustomSelect from '@/shared/components/CustomSelect.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import SelectVehicle from '@/components/CustomerProfile/SelectVehicle.vue';
import { cloneDeep, isEqual } from 'lodash';
import { computed, onMounted } from 'vue';
import { ref, watch } from 'vue';
import { VCheckbox, VDivider, VSwitch } from 'vuetify/components';

const COMPONENT_TYPES = {
  select: CustomSelect,
  field: CustomField,
  switch: VSwitch,
  btn: CustomBtn,
  divider: VDivider,
  selectVehicle: SelectVehicle,
  checkbox: VCheckbox,
};

const COMPONENT_DEFAULT_PROPS = {
  switch: {
    class: 'custom-switch',
  },
};

const emits = defineEmits(['update:payload']);
const props = defineProps({
  fieldsConfig: {
    type: Array,
    default: () => {},
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  data: {
    type: Object,
    default: () => {},
  },
  justifyRow: {
    type: String,
    default: () => {},
  },
  allowCloneData: {
    type: Boolean,
    default: () => true,
  },
  rowProps: {
    type: Object,
    default: () => {},
  },
});

const genericForm = ref(null);
const payload = ref({});
const previousPayload = ref({});
const valid = ref(false);

const isFormDirty = computed(() => {
  return fieldsUpdated.value.length > 0;
});
const fieldsUpdated = computed(() => {
  return props.fieldsConfig
    .filter((fc) => fc.vModel)
    .map((fc) => fc.vModel)
    .filter(
      (key) =>
        !isEqual(payload.value[key], previousPayload.value[key])
    );
});

const resetForm = async () => {
  genericForm.value.reset();
};
const createPayload = () => {
  if (props.allowCloneData) {
    payload.value = cloneDeep(props.data || {});
    previousPayload.value = cloneDeep(props.data || {});
  } else {
    payload.value = props.data ?? {};
  }
};
const validate = async () => {
  const response = await genericForm.value.validate();
  return response.valid;
};

watch(props, () => {
  if (props.data) {
    createPayload();
  }
});
watch(
  payload,
  async (newVal) => {
    emits('update:payload', {
      payload: newVal,
      isValid: valid.value,
      isDirty: isFormDirty.value,
      fieldsUpdated: fieldsUpdated.value,
      validate,
    });
  },
  {
    deep: true,
  }
);

onMounted(() => {
  createPayload();
});

defineExpose({
  resetForm,
  validate,
  isFormDirty,
  payload,
  fieldsUpdated,
});
</script>
