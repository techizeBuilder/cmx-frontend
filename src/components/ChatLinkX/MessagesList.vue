<template>
  <v-expansion-panel
    density="compact"
    :style="{
      'border-bottom-left-radius': '5px !important',
      'border-bottom-right-radius': '5px !important',
      'border-top-left-radius': '5px !important',
      'border-top-right-radius': '5px !important',
    }"
  >
    <v-expansion-panel-title class="text-orange">
      <span class="font-16 font-weight-medium">
        {{ title }}
      </span>
    </v-expansion-panel-title>

    <v-expansion-panel-text class="mt-3">
      <message
        v-if="messages.length"
        v-for="(msg, msgIndex) in messages"
        :msg="msg"
        :bg-color="bgColor"
        :key="msgIndex"
        @click="() => messageClicked(msgIndex)"
      />
      <v-row v-else>
        <v-col
          cols="12"
          class="font-12 text-error font-weight-600 text-center"
        >
          {{ `No ${title}` }}
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import Message from './Message.vue';

const emits = defineEmits(['handleMessageClick']);
const props = defineProps({
  messages: {
    type: Array,
    default: () => {},
  },
  title: {
    type: String,
    default: () => {},
  },
  bgColor: {
    type: String,
    default: () => {},
  },
});

const messageClicked = (index) => {
  const estimateToken =
    props.messages[index].estimateProfile.estimateToken;
  if (estimateToken) {
    emits('handleMessageClick', estimateToken);
  }
};
</script>

<style lang="scss" scoped>
.v-row + .v-row {
  margin-top: 20px;
}
</style>
