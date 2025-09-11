<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <custom-select
          id="select-category"
          placeholder="Select Category"
          :items="['Payment', 'Customer', 'Other']"
        />
        <custom-select
          id="select-quick-category"
          placeholder="Select Quick Category"
          class="mt-4"
        />
      </v-col>

      <v-col cols="9">
        <custom-card
          style="
            border: 1px solid #bdbdbd;
            border-radius: 5px !important;
          "
          flat
          :cardTextStyle="{ 'pa-3': true }"
        >
          <v-row>
            <v-col
              cols="12"
              class="bg-primary text-blueText font-weight-bold"
            >
              <span class="mx-4"> Enter New Comment </span>
              <custom-btn
                id="clear-btn"
                color="my-grey"
                density="comfortable"
                @click="newCommentInput = null"
              >
                Clear
              </custom-btn>
            </v-col>
            <v-col
              cols="12"
              class="pa-0"
            >
              <custom-field
                v-model="newCommentInput"
                id="new-comment"
                type="textarea"
                :show-label="false"
              />
            </v-col>
          </v-row>
        </custom-card>
      </v-col>

      <v-col cols="3" />

      <v-col
        cols="9"
        class="pl-5"
      >
        <custom-btn
          id="save-comment-btn"
          class="save-comment-btn"
          color="my-grey"
          prepend-icon="mdi-content-save-outline"
          @click="saveNewComment"
        >
          Save Comment
        </custom-btn>
      </v-col>

      <v-col
        cols="12"
        class="mt-4"
      >
        <custom-data-table
          id="customer-comments-table"
          :headers="headers"
          :items="customerComments"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CustomSelect from '@/shared/components/CustomSelect.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import { ref } from 'vue';

const newCommentInput = ref(
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
);
const headers = ref([
  {
    title: '',
    value: '$$link',
  },
  {
    title: 'Comment #',
    align: 'center',
    value: '$$numbering',
  },
  {
    title: 'File #',
    value: '$$default',
    valueFrom: 'file',
  },
  {
    title: 'Update',
    value: '$$checkbox',
    valueFrom: 'update',
  },
  {
    title: 'Comment',
    value: '$$scrollable',
    valueFrom: 'comment',
  },
  {
    title: 'Category',
    value: '$$default',
    valueFrom: 'category',
  },
  {
    title: 'Staff Name',
    value: '$$default',
    valueFrom: 'staffName',
  },
  {
    title: 'Date | Time',
    value: '$$default',
    valueFrom: 'dateTime',
  },
]);

const customerComments = ref([
  {
    file: 'E123456',
    comment: newCommentInput.value,
    category: 'Customer',
    staffName: 'First Last',
    dateTime: '12/30/2025 - 10:45 AM',
  },
  {
    file: '987654',
    comment: newCommentInput.value,
    category: 'Payment',
    staffName: 'First Last',
    dateTime: '12/30/2025 - 10:45 AM',
  },
]);

const saveNewComment = async () => {};
</script>

<style lang="scss">
.save-comment-btn {
  .v-btn__prepend {
    font-size: 17px !important;
  }
}
</style>
