<template>
  <div class="field-label-container">
    <div
      v-if="showLabel"
      class="mb-1 label"
    >
      <span>
        <span
          :class="{
            'font-weight-600': strongLabel,
          }"
        >
          {{ label.replace(/\b\w/g, (char) => char.toUpperCase()) }}
        </span>
        <span
          v-if="required && label"
          style="color: red"
          >*</span
        >
      </span>
    </div>
    <component
      v-if="customDefinedProps.mask"
      :is="componentType"
      :type="
        props.type !== 'password' || showPassword
          ? 'text'
          : 'password'
      "
      class="general-field-class"
      v-bind="customDefinedProps"
      v-on="customDefinedProps.listeners || {}"
      v-mask="customDefinedProps.mask"
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
    </component>
    <component
      v-else
      :is="componentType"
      :type="
        props.type !== 'password' || showPassword
          ? 'text'
          : 'password'
      "
      class="general-field-class"
      v-bind="customDefinedProps"
      v-on="customDefinedProps.listeners || {}"
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
    </component>
  </div>
</template>

<script setup>
import { merge, startCase } from 'lodash';
import { onMounted, shallowRef } from 'vue';
import { computed, useAttrs } from 'vue';
import { ref } from 'vue';
import { useSlots } from 'vue';

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
  requiredError: {
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
  showPlaceholder: {
    type: Boolean,
    default: true,
  },
  strongLabel: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'text',
  },
  prefix: {
    type: String,
    default: '',
  },
  showPrependIcon: {
    type: Boolean,
    default: () => true,
  },
});

const componentType = shallowRef(
  props.type === 'textarea' ? 'v-textarea' : 'v-text-field'
);

const $attrs = useAttrs();
const showPassword = ref(false);

const fieldTypeProps = computed(() => {
  return {
    phoneNumber: {
      mask: ['XXX-XXX-XXXX'],
      listeners: {
        keypress: allowOnlyNumber,
      },
    },
    password: {
      prependInnerIcon: 'mdi-lock',
      appendInnerIcon: showPassword.value ? 'mdi-eye' : 'mdi-eye-off',
      type: showPassword.value ? 'text' : 'password',
      // counter: 8,
      listeners: {
        'click:appendInner': () => {
          showPassword.value = !showPassword.value;
        },
      },
    },
    number: {
      listeners: {
        keypress: allowOnlyNumber,
      },
    },
    email: {
      prependInnerIcon: 'mdi-email',
    },
  };
});

const defaultProps = computed(() => {
  return {
    id: props.id,
    density: 'compact',
    variant: 'outlined',
    flat: true,
    class: 'general-field-class',
    color: 'blue',
    required: props.required,
    hideDetails: 'auto',
    name: (props.label || 'Name Not Added').toUpperCase(),
    rules: props.rules,
    prefix: props.prefix,
  };
});
const customDefinedProps = computed(() => {
  let computedProps = merge(
    defaultProps.value,
    $attrs,
    fieldTypeProps.value[props.type] || {}
  );
  if (props.showPlaceholder) {
    computedProps.placeholder =
      $attrs.placeholder || `Enter ${props.label || 'field'}`;
  }
  if (props.required) {
    computedProps.rules = [
      (v) => !!v || `${props.label || 'Field'} is required!`,
    ];
  }
  if (!props.showPrependIcon) {
    computedProps.prependInnerIcon = undefined;
  }
  return computedProps;
});

const allowOnlyNumber = ($event) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    $event.preventDefault();
  }
};

// onMounted(() => {
//   showPassword.value =
// })
</script>
<style lang="scss">
.general-field-class {
  .v-field {
    border-radius: 5px;
    font-size: 16px !important;
    // Make input text selectable even when disabled
    user-select: text !important;
    // Keep text color the same when disabled
    color: #222 !important;
    
    .v-text-field__prefix {
      .v-text-field__prefix__text {
        font-size: 16px;
      }
    }
  }
  .v-field--disabled {
    color: #222 !important; // Same as enabled
    --v-disabled-opacity: 1 !important;
    background-color: rgba(var(--v-theme-secondary));
    user-select: text !important;
  }
  .v-field:not(.v-field--disabled) {
    --v-theme-secondary: white;
  }
  .v-label {
    font-size: 16px !important;
    color: #222 !important;
    user-select: text !important;
  }
}
</style>
