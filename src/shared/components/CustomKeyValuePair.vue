<template>
  <custom-card cardTextStyle="pt-2 pa-1">
    <div
      v-for="(detail, index) of filteredConfig"
      :key="index"
      class="key-value"
      :class="{
        'dark-key-value': $vuetify.theme.current.dark,
      }"
      :style="{
        backgroundColor: backgroundColor,
      }"
    >
      <span
        class="key"
        :class="{ 'font-weight-black': detail.strong }"
      >
        {{ detail.title }}
      </span>
      <span
        v-if="detail.redirectTo"
        class="text-primary cursor-pointer value"
      >
        <a @click="redirectToPage(detail.redirectTo)">
          {{ ` ${detail.value}` }}
        </a>
      </span>
      <span
        v-else
        class="pl-2 value"
        v-html="detail.value || ''"
      />
    </div>
  </custom-card>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import CustomCard from '@/shared/components/CustomCard.vue';

const router = useRouter();
const props = defineProps({
  config: {
    type: Array,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: () => {},
  },
});

const filteredConfig = computed(() => {
  // return props.config.filter((item) => item.value);
  return props.config;
});

const redirectToPage = (redirectTo) => {
  if (redirectTo.newTab) {
    // return this.$$window.open(redirectTo.path);
  }
  router.push({ path: redirectTo.path });
};
</script>

<style lang="scss">
.key-value {
  // background-color: #e6f0ff;
  border: 1px solid white;
  margin-bottom: 2px;
  padding: 3px 8px;

  .key {
    font-weight: 600;
    font-size: 16px !important;
  }
}
.dark-key-value {
  background-color: #303030 !important;
}
</style>
