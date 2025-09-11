<template>
  <div class="mt-2">
    <custom-tabs
      v-model="currentTab"
      :tabs="tabs"
      density="comfortable"
    >
      <template
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        #[`content-${tabIndex}`]
      >
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="6">
              <p class="mb-2 font-16 font-weight-medium">
                Custom Quick Comments
              </p>
            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-end ga-3"
            >
              <custom-btn
                id="add-btn"
                color="grey-lighten-3"
              >
                Add
              </custom-btn>
              <custom-btn
                id="cancel-btn"
                color="grey-lighten-3"
                :disabled="isDisabled"
              >
                Cancel
              </custom-btn>
              <custom-btn
                id="edit-btn"
                color="grey-lighten-3"
                :disabled="isDisabled"
              >
                Edit
              </custom-btn>
            </v-col>

            <v-col
              cols="4"
              v-if="isLoading"
              v-for="n in [1, 2]"
              :key="n"
            >
              <v-skeleton-loader type="card" />
            </v-col>

            <v-col
              v-else
              v-for="(comment, commentIdx) in tab.comments"
              :key="commentIdx"
              cols="4"
            >
              <custom-card
                flat
                class="border-md"
              >
                <v-row class="pa-2">
                  <v-col
                    cols="6"
                    class="d-flex align-center py-1"
                  >
                    <span class="font-16">
                      {{
                        `${comment.commentCategory} ${commentIdx + 1}`
                      }}
                    </span>
                  </v-col>
                  <v-col
                    cols="6"
                    class="py-1"
                  >
                    <v-switch
                      color="blue"
                      class="float-right"
                      density="compact"
                      hide-details
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="px-0 py-1"
                  >
                    <custom-field
                      :model-value="comment.commentTitle"
                      id="comment-title"
                      placeholder="Enter Title"
                      hide-details
                      :disabled="isDisabled"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="px-0 py-1"
                  >
                    <custom-field
                      :model-value="comment.comment"
                      id="comment-message"
                      placeholder="Enter Message"
                      hide-details
                      :disabled="isDisabled"
                      type="textarea"
                      class="comment-message"
                    />
                  </v-col>
                </v-row>
              </custom-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </custom-tabs>
  </div>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomField from '@/shared/components/CustomField.vue';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { handleError } from '@/handleError';

const store = useStore();
const isDisabled = ref(true);
const isLoading = ref(false);
const allComments = ref([]);
const currentTab = ref(1);
const tabs = computed(() => {
  return [
    {
      title: 'Customer',
      comments: allComments.value.Customer,
    },
    {
      title: 'Insurance',
      comments: allComments.value.Insurance,
    },
    {
      title: 'Parts',
      comments: allComments.value.Parts,
    },
    {
      title: 'Payments',
      comments: allComments.value.Payments,
    },
    {
      title: 'Repairs',
      comments: allComments.value.Repairs,
    },
    {
      title: 'Supplement',
      comments: allComments.value.Supplement,
    },
  ];
});

const fetchAllComments = async () => {
  isLoading.value = true;
  const response = await store.dispatch(
    'fetchAllCommentsForShopAdmin'
  );
  if (!response.data) {
    return handleError(response);
  }
  allComments.value = response.data;
  isLoading.value = false;
};

onMounted(() => {
  fetchAllComments();
});
</script>

<style lang="scss">
.comment-message {
  transition: all 1s ease-in-out;

  .v-field {
    border: 1px solid black;
  }
  .v-field.v-field--focused {
    border: none;
  }
}
</style>
