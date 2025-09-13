<template>
  <v-row
    :class="{
      'px-3': vuetifyDisplay.smAndUp.value
    }"
  >
    <page-header
      title="Add New Staff"
      mb="0"
      cols="9"
      md="8"
      sm="8"
      order="1"
      order-sm="0"
      class="mt-1"
      :class="{
        'ml-2': $vuetify.display.xs
      }"
      hide-divider
      :subtitles="[
        {
          title: shopDetails.shopName,
          to: route.matched[0].path
        },
        {
          title: 'New Staff Member',
          to: route.path
        }
      ]"
      :title-props="{
        style: {
          fontSize: '1.3rem'
        }
      }"
    />

    <v-col
      cols="12"
      md="4"
      sm="4"
      order="0"
      order-sm="1"
      class="d-flex justify-end"
      :class="{
        'px-10': vuetifyDisplay.smAndUp.value,
        'pb-0': vuetifyDisplay.xs.value
      }"
    >
      <custom-btn
        id="back-btn"
        color="grey-lighten-1"
        :disabled="isLoading"
        @click="() => router.back()"
      >
        Back
      </custom-btn>
    </v-col>

    <v-col
      cols="12"
      order="2"
      class="pt-0 mt-5"
      :class="{
        'px-2': vuetifyDisplay.xs.value
      }"
    >
      <custom-expansion-panel v-model="activePanels" :panels="panels">
        <template
          v-for="(panel, index) in panels"
          :key="index"
          #[`content-${index}`]
        >
          <custom-tabs
            v-model="panel.activeTab"
            :tabs="panel.tabs"
            @update:modelValue="resetPage"
          >
            <template
              v-for="(tab, tabIdx) in panel.tabs"
              :key="tabIdx"
              #[`content-${tabIdx}`]
            >
              <v-container fluid :class="tab.containerClass">
                <v-row>
                  <v-col v-if="tab.showFullName" cols="6">
                    <span class="font-weight-600 text-h6">
                      New Staff Member
                    </span>
                  </v-col>
                  <v-col
                    :cols="tab.showFullName ? 6 : 12"
                    class="d-flex justify-end ga-3"
                  >
                    <custom-btn
                      v-if="!isFormDisabled"
                      id="cancel-btn"
                      color="btn"
                      prepend-icon="cancel"
                      :disabled="isLoading"
                      @click="cancelForm"
                    >
                      Cancel
                    </custom-btn>
                    <custom-btn
                      id="save-staff-details"
                      :color="isFormDisabled ? 'btn' : 'myGreen'"
                      :prepend-icon="isFormDisabled ? 'edit' : 'save'"
                      :loading="isLoading"
                      @click="
                        isFormDisabled ? (isFormDisabled = false) : onSubmit()
                      "
                    >
                      {{ isFormDisabled ? 'Edit' : 'Save' }}
                    </custom-btn>
                  </v-col>

                  <v-col :cols="tab.formCols ?? 12" :md="tab.md">
                    <v-row v-bind="tab.rowProps">
                      <generic-form-cols
                        v-if="panel.activeTab === tabIdx + 1"
                        ref="staffFormsRef"
                        :data="staffDetails"
                        :disabled="isFormDisabled || isLoading"
                        :forms-config="tab.formsConfig"
                        @update:payload="payloadUpdated"
                      />
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </custom-tabs>
        </template>
      </custom-expansion-panel>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { cloneDeep } from 'lodash'
import { showErrorToast, showSuccessToast } from '@/toster'

// Components
import PageHeader from '@/components/PageHeader.vue'
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue'
import CustomTabs from '@/shared/components/CustomTabs.vue'
import CustomBtn from '@/shared/components/CustomBtn.vue'
import GenericFormCols from '@/components/GenericFormCols.vue'

// Composables
const vuetifyDisplay = useDisplay()
const router = useRouter()
const route = useRoute()
const store = useStore()

// Reactive data
const staffFormsRef = ref(null)
const staffDetails = ref({})
const activePanels = ref([])
const isFormDisabled = ref(false) // Start with form enabled for new staff
const isFormDirty = ref(false)
const isLoading = ref(false)
const updatedPayload = ref({})

// Staff Personal Details Configuration
const STAFF_PERSONAL_DETAILS = {
  title: 'Staff Personal Details',
  formCols: 12,
  md: 11,
  showFullName: true,
  formsConfig: [
    {
      cols: 3,
      colProps: {
        style: {
          minWidth: '29.8% !important'
        }
      },
      config: [
        {
          id: 'staffPersonalPhone',
          vModel: 'phone',
          name: 'staffPersonalPhone',
          label: 'Staff Personal Phone / Cell 1',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'staffPersonalPhone2',
          vModel: 'phone2',
          name: 'staffPersonalPhone2',
          label: 'Extension #',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'staffPersonalEmailAddress',
          vModel: 'email',
          name: 'staffPersonalEmailAddress',
          label: 'Staff Personal Email Address',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11,
          required: true
        }
      ]
    },
    {
      divider: true,
      cols: 1
    },
    {
      cols: 3,
      colProps: {
        style: {
          minWidth: '29.8% !important'
        }
      },
      config: [
        {
          id: 'homeAddress',
          vModel: 'address',
          name: 'homeAddress',
          label: 'Home Address',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'city',
          vModel: 'city',
          name: 'city',
          label: 'City',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'state',
          vModel: 'state',
          name: 'state',
          label: 'State',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'zipCode',
          vModel: 'zipCode',
          name: 'zipCode',
          label: 'Zip Code',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'country',
          vModel: 'country',
          name: 'country',
          label: 'Country',
          strongLabel: true,
          bgColor: 'secondary',
          type: 'select',
          items: ['USA', 'Canada', 'Mexico'], // Add country options
          cols: 12,
          md: 11
        }
      ]
    },
    {
      divider: true,
      cols: 1
    },
    {
      cols: 3,
      colProps: {
        style: {
          minWidth: '29.8% !important'
        }
      },
      config: [
        {
          id: 'hireDate',
          vModel: 'hireDate',
          name: 'hireDate',
          label: 'Hire Date',
          type: 'date',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        },
        {
          id: 'separationDate',
          vModel: 'terminationDate',
          name: 'separationDate',
          label: 'Separation Date',
          type: 'date',
          strongLabel: true,
          bgColor: 'secondary',
          cols: 12,
          md: 11
        }
      ]
    }
  ]
}

// Panel configuration
const STAFF_DETAILS_CONFIG = {
  title: 'New Staff Details',
  icon: 'staffSetup.png',
  activeTab: 1,
  tabs: [STAFF_PERSONAL_DETAILS]
}

const panels = ref([STAFF_DETAILS_CONFIG])

// Computed properties
const shopDetails = computed(() => {
  return store.getters.getShopDetails ?? {}
})

// Methods
const resetPage = () => {
  staffDetails.value = {}
  updatedPayload.value = {}
  isFormDisabled.value = false
  staffFormsRef.value?.resetForms()
}

const cancelForm = () => {
  resetPage()
  isFormDisabled.value = true
}

const payloadUpdated = ({ payload, isDirty, validate, fieldsUpdated }) => {
  if (Array.isArray(fieldsUpdated)) {
    fieldsUpdated.forEach(fc => {
      updatedPayload.value[fc] = payload[fc]
    })
  }
  isFormDirty.value = isDirty
}

const createStaff = async () => {
  try {
    updatedPayload.value.shopId = store.getters.shopId

    const response = await store.dispatch(
      'createStaffUser',
      updatedPayload.value
    )

    if (!response.success) {
      return showErrorToast(response.error || 'Failed to create staff member')
    }

    showSuccessToast(response.msg || 'Staff member created successfully')

    // Reset form after successful creation
    resetPage()
    isFormDisabled.value = true

    // Optional: Navigate back to staff list
    // router.push({ name: 'staff-list' });
  } catch (error) {
    console.error('Error creating staff:', error)
    showErrorToast('An error occurred while creating the staff member')
  }
}

const onSubmit = async () => {
  try {
    const isFormValid = await staffFormsRef.value.validateForm()

    if (isFormValid) {
      isLoading.value = true
      await createStaff()
    }
  } catch (error) {
    console.error('Form validation error:', error)
    showErrorToast('Please check the form for errors')
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Initialize with empty staff details for new staff
  staffDetails.value = {}
  updatedPayload.value = {}
})
</script>

<style lang="scss">
.staff-personal-details {
  .v-switch {
    justify-self: start;

    .v-selection-control {
      flex-direction: row-reverse;
      gap: 16px;
    }
  }

  .v-switch.no-wrap {
    .v-selection-control {
      flex-direction: row;
      gap: 16px;
    }
  }
}

// Responsive styling to match CreateUpdateStaff.vue
@media (min-width: 992px) {
  .staff-personal-details {
    .v-container,
    .v-row,
    .v-col {
      font-size: 14px !important;
    }
  }
}

@media (max-width: 991px) {
  .staff-personal-details {
    .v-container,
    .v-row,
    .v-col {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }

    .v-row {
      row-gap: 12px !important;
    }

    .v-col {
      margin-bottom: 8px !important;
    }
  }
}
</style>
