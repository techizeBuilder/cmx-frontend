<template>
  <div>
    <div
      v-if="showLabel"
      class="mb-1"
    >
      <span>
        <span
          :class="{
            'font-weight-600': strongLabel,
          }"
        >
          {{ label }}
        </span>
        <span
          v-if="required"
          style="color: red"
          >*</span
        >
      </span>
    </div>
    <v-select
      :id="id"
      :rules="rules"
      color="blue"
      hide-details="auto"
      density="compact"
      variant="outlined"
      :placeholder="placeholder || `Select ${label}`"
      open-on-clear
      :menu-props="{
        maxWidth: '312px !important',
        class: 'custom-select-overlay',
      }"
      v-bind="computedAttrs"
      class="general-field-class custom-select"
      :model-value="modelValue"
      @update:modelValue="val => emit('update:modelValue', val)"
    >
      <template
        v-for="(slotName, index) in Object.keys(slots)"
        :key="index"
        #[slotName]="data"
      >
        <slot
          :name="slotName"
          v-bind="data || {}"
        />
      </template>
    </v-select>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { useSlots } from 'vue';

const attrs = useAttrs();
const slots = useSlots();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  strongLabel: {
    type: Boolean,
    default: false,
  },
  addDefaultValue: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: [String, Number, Object, Array, Boolean],
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);

const rules = computed(() => {
  const computedRules = [];
  if (props.required) {
    computedRules.push(
      (val) => !!val || `${props.label || 'Field'} is required`
    );
  }
  return computedRules;
});
const computedAttrs = computed(() => {
  const $attrs = JSON.parse(JSON.stringify(attrs));
  if ($attrs.listProps) {
    $attrs.listProps.density = 'compact';
  } else {
    $attrs.listProps = { density: 'compact' };
  }
  return $attrs;
});
</script>
<style lang="scss">
.custom-select {
  font-size: 16px !important;
  .v-select__selection {
    font-size: 16px !important;
    color: #222 !important;
    user-select: text !important;
  }
  .v-label {
    font-size: 16px !important;
    color: #222 !important;
    user-select: text !important;
  }
  .v-input--is-disabled {
    color: #222 !important;
    user-select: text !important;
  }
}
.custom-select-overlay {
  .v-select__content {
    overflow: auto;

    &::-webkit-scrollbar {
      height: 10px;
    }
  }
}
</style>
