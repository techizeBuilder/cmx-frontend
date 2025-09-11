<template>
  <v-col
    cols="2"
    class="d-flex flex-column align-center chat-details"
  >
    <custom-btn
      id="opt-in-btn"
      color="btn"
      class="my-elevation"
    >
      <template #prepend>
        <div
          class="mt-1 rounded-circle"
          style="
            background-color: #00ff51;
            min-width: 15px;
            min-height: 15px;
          "
        ></div>
      </template>
      Opt In
    </custom-btn>

    <v-divider class="my-5 w-100" />

    <div class="w-100">
      <p class="mb-0 font-16 font-weight-bold text-center">
        {{ userDetails?.firstName?.toUpperCase() || 'Customer Name' }}
      </p>

      <p class="mb-0 font-16 font-weight-regular">
        Phone: {{ formatPhoneNumber(userDetails.phone) }}
      </p>
      <p
        class="mb-0 font-16 font-weight-regular"
        style="overflow-wrap: break-word"
      >
        Email: {{ userDetails.email || 'XXXXXXX@gmail.com' }}
      </p>
    </div>

    <v-divider class="my-5 w-100" />

    <div class="w-100 text-grey-darken-1">
      <p class="mb-0 font-16 font-weight-regular">
        <v-icon color="black">mdi-link-variant</v-icon>
        Customer ID:
        <a
          :href="
            userDetails._id
              ? `/customeridprofile/${userDetails._id}`
              : null
          "
          target="_blank"
        >
          {{ userDetails.customerId?.customerId || '000000' }}
        </a>
      </p>
      <p class="mb-0 font-16 font-weight-regular">
        <v-icon color="black">mdi-link-variant</v-icon>
        RO: <a :href="null">000000</a>
      </p>
      <div class="ml-7">
        <p class="mb-0 font-16 font-weight-regular">
          RO Status: Open
        </p>
        <p class="mb-0 font-16 font-weight-regular">
          {{ userDetails.vehicalId?.year || 'Year' }}
        </p>
        <p class="mb-0 font-16 font-weight-regular">
          {{ userDetails.vehicalId?.make || 'Make' }}
        </p>
        <p class="mb-0 font-16 font-weight-regular">
          {{ userDetails.vehicalId?.model || 'Model' }}
        </p>
        <p class="mb-0 font-16 font-weight-regular">Insurance</p>
      </div>
    </div>

    <v-divider class="my-5 w-100" />

    <v-list
      density="comfortable"
      nav
      class="px-0 w-100"
    >
      <v-list-item
        v-for="(link, linkIdx) in chatDetailLinks"
        :key="linkIdx"
        :id="link.title"
        block
        variant="text"
        rounded="md"
        @click="selectedLink = link"
      >
        <template #prepend>
          <v-img
            :src="getImageUrl(`icons/${link.icon}`)"
            min-width="20"
            class="mr-3"
          />
        </template>

        <span class="font-16 font-weight-regular text-underline">
          {{ link.title }}
        </span>
      </v-list-item>
    </v-list>

    <v-dialog
      :model-value="!!selectedLink.title"
      width="800"
      @update:modelValue="closeModal"
    >
      <custom-card cardTextStyle="pa-3">
        <v-row justify="center">
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center py-2"
            :style="{
              backgroundColor: '#D9D9D9',
            }"
          >
            <h6 class="mb-0">{{ selectedLink.title }}</h6>

            <custom-btn
              id="modal-close-btn"
              variant="text"
              icon
              @click="closeModal"
            >
              <v-icon
                size="24"
                color="grey-darken-2"
              >
                mdi-close
              </v-icon>
            </custom-btn>
          </v-col>

          <v-col
            v-if="loading"
            cols="11"
          >
            <v-skeleton-loader type="article" />
          </v-col>

          <v-col
            v-else
            v-for="(item, index) in selectedLink.content"
            :key="index"
            cols="11"
            :class="{
              'mt-3': index === 0,
              'mb-3': index === selectedLink.content.length - 1,
            }"
          >
            <v-card
              flat
              class="rounded-md border-a"
            >
              <v-card-text>
                <h6 class="mb-4">{{ item.header }}</h6>
                <custom-field
                  :id="`title-${index}`"
                  :model-value="item.inputMessage"
                  readonly
                  class="mb-3"
                />
                <custom-field
                  :id="`description${index}`"
                  :model-value="item.messageDescription"
                  readonly
                  class="mb-3"
                  type="textarea"
                />
                <div class="d-flex justify-space-between mt-3 mb-2">
                  <custom-btn
                    id="cancel"
                    color="grey-lighten-3"
                    density="comfortable"
                    @click="closeModal"
                  >
                    Cancel
                  </custom-btn>
                  <custom-btn
                    id="select"
                    color="grey-lighten-3"
                    density="comfortable"
                    @click="() => onChatSelect(item)"
                  >
                    Select
                  </custom-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </custom-card>
    </v-dialog>
  </v-col>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import { isEmpty } from 'lodash';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { getImageUrl } from '@/composables';

const emits = defineEmits(['chatSelected']);
const props = defineProps({
  userDetails: {
    type: Object,
    default: () => {},
  },
});

const store = useStore();
const selectedLink = ref({});
const loading = ref(false);
const chatDetailLinks = ref([
  {
    title: 'ChatLink Invite',
    icon: 'ChatIcon.svg',
    backendKey: 'ChatLinkInvite',
  },
  {
    title: 'Estimate Chat',
    icon: 'Estimate.png',
    backendKey: 'EstimateChat',
  },
  {
    title: 'Repair Chat',
    icon: 'Repair.png',
    backendKey: 'RepairChat',
  },
  {
    title: 'Completed Chat',
    icon: 'Completed.png',
    backendKey: 'CompletedChat',
  },
  {
    title: 'Survey Request',
    icon: 'survey.png',
    backendKey: 'SurveyRequest',
  },
]);

const formatPhoneNumber = (phone) => {
  const cleaned = phone?.replace(/\D+/g, '');
  return cleaned
    ? `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`
    : 'XXXXXXX';
};
const closeModal = () => {
  selectedLink.value = {};
};
const onChatSelect = (item) => {
  emits('chatSelected', item);
  closeModal();
};
const fetchChatLinkDetails = async () => {
  if (selectedLink.value.backendKey) {
    loading.value = true;
    const { data } = await store.dispatch(
      'fetchChatLinkDetails',
      selectedLink.value.backendKey
    );

    if (!data) return;

    selectedLink.value.content = data.map((val, index) => ({
      header: `${selectedLink.value.title} ${index + 1}`,
      inputMessage: val.title,
      messageDescription: val.data,
    }));
    loading.value = false;
  }
};

watch(selectedLink, (newVal) => {
  if (!isEmpty(newVal)) {
    fetchChatLinkDetails();
  }
});
</script>
