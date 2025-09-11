<template>
  <v-col
    v-for="(col, index) in formsConfig"
    :key="index"
    :cols="col.cols || 5"
    class="pt-4 pb-8"
    :class="{
      'd-flex justify-center divider-column': col.divider,
      'px-0': vuetifyDisplay.xs.value,
    }"
    v-bind="col.colProps"
  >
    <!-- :class="{
      'border-r border-black':
        index === 0 || index !== formsConfig.length - 1,
    }" -->
    <v-divider
      v-if="col.divider"
      vertical
      class="h-100 opacity-100"
    />
    <template v-else>
      <p
        v-if="col.title"
        class="font-16 font-weight-medium"
        :class="[`text-${col.titleAlign}`]"
      >
        {{ col.title }}
      </p>
      <generic-form
        v-if="col.config?.length"
        ref="genericFormRefs"
        :disabled="disabled"
        :data="payload"
        :fields-config="col.config"
        :justify-row="col.justify"
        v-bind="col.formProps"
        @update:payload="payloadUpdated"
        :allowCloneData="false"
      />
      <component
        v-else-if="col.component"
        :disabled="disabled"
        :data="payload"
        :is="col.component"
        v-bind="col.formProps"
        v-on="col.on || {}"
        @update:payload="payloadUpdated"
      ></component>
    </template>
  </v-col>
</template>

<script setup>
import GenericForm from '@/shared/forms/GenericForm.vue';
import { onMounted, ref } from 'vue';
import { computed, useAttrs } from 'vue';
import { useDisplay } from 'vuetify';

const vuetifyDisplay = useDisplay();
const emits = defineEmits(['update:payload']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  formsConfig: {
    type: Array,
    default: [],
  },
  data: {
    type: Object,
    default: {},
  },
});

const genericFormRefs = ref(null);

const payload = computed({
  get() {
    return props.data;
  },
  set(val) {
    console.log(val, 'val');
  },
});
const isFormDirty = computed(() => {
  return genericFormRefs.value
    .map((form) => form.isFormDirty)
    .some((formDirty) => formDirty);
});
const updatedPayload = computed(() => {
  const updatedPayloadFields = genericFormRefs.value.reduce(
    (acc, form) => {
      form.fieldsUpdated.forEach((field) => {
        acc[field] = form.payload[field];
      });
      return acc;
    },
    {}
  );

  return {
    ...payload.value,
    ...updatedPayloadFields,
  };
});

const payloadUpdated = (formResponse) => {
  emits('update:payload', formResponse);
};
const validateForm = async () => {
  if (Array.isArray(genericFormRefs.value)) {
    const validForm = (
      await Promise.all(
        genericFormRefs.value.map((form) => form?.validate())
      )
    ).every((value) => value);
    return validForm;
  }
  console.log('Validation not checked!');
  return false;
};
const resetForms = async () => {
  if (Array.isArray(genericFormRefs.value)) {
    genericFormRefs.value.forEach((form) => form.resetForm());
  }
};

defineExpose({
  genericFormRefs,
  validateForm,
  resetForms,
  isFormDirty,
  updatedPayload,
});
</script>

<style lang="scss" scoped>
.divider-column {
  max-width: 5.2% !important;
}

.v-col-3 {
  min-width: 28.2% !important;
}
// .v-col-5 {
//   min-width: 47% !important;
// }
</style>
