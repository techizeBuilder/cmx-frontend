<template>
  <v-card
    class="rounded-md"
    :class="{ 'my-elevation': !flat }"
    :flat="flat"
  >
    <v-card-title
      v-if="title || $slots.title"
      class="font-16"
      :class="{
        'px-6': true,
        ...cardTitleStyle,
        'bg-header': !hideHeaderBg,
      }"
      v-bind="titleProps"
    >
      <slot name="title">{{ title }}</slot>
      <slot name="title-append"></slot>
    </v-card-title>

    <v-card-text
      :class="cardTextStyle"
      v-bind="textProps"
    >
      <slot />
    </v-card-text>

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  cardTitleStyle: {
    type: [Object],
    default: () => {},
  },
  titleProps: {
    type: Object,
    default: () => {},
  },
  textProps: {
    type: Object,
    default: () => {},
  },
  cardTextStyle: {
    type: [String, Object],
    default: () => 'pt-4',
  },
  flat: {
    type: Boolean,
    default: false,
  },
  hideHeaderBg: {
    type: Boolean,
    default: false,
  },
});
</script>
