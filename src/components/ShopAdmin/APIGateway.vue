<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template #content-0>
      <v-container
        fluid
        class="mt-3"
      >
        <v-row>
          <v-col cols="12">
            <p class="mb-0 mt-5">
              Setup Quantum pay gateway and save!
            </p>
            <p>Request setup if you do not have an account.</p>
          </v-col>

          <v-col cols="12">
            <custom-card
              card-text-style="px-7 py-9"
              color="grey-lighten-4"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="pb-0 title-wrapper"
                >
                  <span class="label bg-grey-lighten-1 border-md">
                    QUANTUM PAY
                  </span>
                </v-col>
                <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="qpay-fields pt-0"
                >
                  <custom-field
                    id="api-field"
                    label="API"
                    :show-placeholder="false"
                  />
                  <custom-field
                    id="transaction-key-field"
                    label="Transaction Key"
                    :show-placeholder="false"
                  />
                </v-col>
                <v-col
                  cols="8"
                  md="5"
                  sm="5"
                  class="d-flex justify-center"
                >
                  <custom-btn
                    id="request-btn"
                    color="grey-lighten-4"
                    class="border-sm border-opacity-100"
                    :text-wrap="false"
                  >
                    Request Information
                  </custom-btn>
                </v-col>
                <v-col
                  cols="4"
                  md="7"
                  sm="7"
                  class="d-flex justify-end"
                >
                  <custom-btn
                    id="save-btn"
                    color="grey-lighten-4"
                    class="border-sm border-opacity-100"
                  >
                    Save
                  </custom-btn>
                </v-col>
              </v-row>
            </custom-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import GenericForm from '@/shared/forms/GenericForm.vue';
import HelpMenu from '@/components/HelpMenu.vue';
import { useStore } from 'vuex';
import { showErrorToast } from '@/toster';

const store = useStore();

const isLoading = ref(false);
const currentTab = ref(1);
const tabs = ref([
  {
    title: 'QPAY',
  },
  {
    title: 'ESTIMATE',
  },
]);
</script>

<style lang="scss">
.qpay-fields {
  .field-label-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .label {
      max-width: 40%;
      margin-bottom: 0 !important;
      display: flex;
      align-items: center;
      font-weight: bold;
      text-transform: uppercase;
    }

    .v-input {
      max-width: 60%;
      .v-field {
        border-radius: 0 !important;
      }
    }
  }
}

.title-wrapper {
  display: flex;
  justify-content: end;

  .label {
    padding-block: 4px;
    min-width: 60%;
    max-width: 60%;
    text-align: center;
  }
}
</style>
