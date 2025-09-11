<template>
  <v-row
    class="my-elevation rounded-md py-3 chat-shortcut"
    :style="{
      backgroundColor: bgColor,
    }"
    @click="() => emits('click')"
  >
    <v-col cols="1">
      <div
        class="mt-1 rounded-circle"
        style="
          background-color: #00ff51;
          min-width: 12px;
          min-height: 12px;
        "
      ></div>
    </v-col>
    <v-col
      cols="7"
      class="pr-0"
    >
      <p class="font-16 mb-1">
        {{
          `${msg.estimateProfile?.lastName}, ${msg.estimateProfile?.firstName}`
        }}
      </p>

      <p class="text-grey-darken-1 mb-1">
        {{ msg.folderName || 'FolderX' }}:
        <span class="text-underline">
          {{ msg.folderX || '0000' }}
        </span>
      </p>

      <p class="text-grey-darken-1 mb-0 mt-2">
        {{
          `${msg.vehicalId?.year}, ${msg.vehicalId?.make}, ${msg.vehicalId?.model}`
        }}
      </p>
    </v-col>
    <v-col
      cols="4"
      class="text-end pl-0"
    >
      <p class="text-grey-darken-1 mb-0 mt-2 font-15">
        {{ moment(msg.lastDate).format('MM/DD/YYYY') }}
      </p>
      <p class="text-grey-darken-1 mb-1 font-15">
        {{ moment(msg.lastDate).format('hh:mm A') }}
      </p>

      <span
        v-if="msg.UnSeenChat"
        class="font-weight-600 rounded-circle bg-primary"
        style="padding: 1px 6px"
      >
        {{ msg.UnSeenChat }}
      </span>
    </v-col>
  </v-row>
</template>

<script setup>
import moment from 'moment';

const emits = defineEmits(['click']);
const props = defineProps({
  msg: {
    type: Object,
    default: {},
  },
  bgColor: {
    type: String,
    default: () => {},
  },
});
</script>
