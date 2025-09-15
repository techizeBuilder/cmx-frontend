<template>
  <v-row
    :class="{
      'px-3': vuetifyDisplay.smAndUp.value,
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
        'ml-2': $vuetify.display.xs,
      }"
      hide-divider
      :subtitles="[
        {
          title: shopDetails.shopName,
          to: route.matched[0].path,
        },
        {
          title: 'New Staff Member',
          to: route.path,
        },
      ]"
      :title-props="{
        style: {
          fontSize: '1.3rem',
        },
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
        'pb-0': vuetifyDisplay.xs.value,
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
        'px-2': vuetifyDisplay.xs.value,
      }"
    >
      <custom-expansion-panel v-model="activePanels" :panels="panels">
        <template v-for="(panel, index) in panels" :key="index" #[`content-${index}`]>
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
                    <span class="font-weight-600 text-h6"> New Staff Member </span>
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
                      @click="isFormDisabled ? (isFormDisabled = false) : onSubmit()"
                    >
                      {{ isFormDisabled ? "Edit" : "Save" }}
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { cloneDeep } from "lodash";
import { showErrorToast, showSuccessToast } from "@/toster";

// Components
import PageHeader from "@/components/PageHeader.vue";
import CustomExpansionPanel from "@/shared/components/CustomExpansionPanel.vue";
import CustomTabs from "@/shared/components/CustomTabs.vue";
import CustomBtn from "@/shared/components/CustomBtn.vue";
import GenericFormCols from "@/components/GenericFormCols.vue";

const STAFF_TITLES = [
  "CEO",
  "Owner",
  "NVP",
  "RVP",
  "COO",
  "Director",
  "Controller",
  "Administrative",
  "Accountant",
  "Office",
  "Shop Foreman",
  "Shop Manager",
  "Estimator",
  "Parts",
  "Body Technician",
  "Frame Technician",
  "Painter",
  "Detailer Technician",
  "Paint Prepper",
  "Maintenance Technician",
  "Parts Delivery Driver",
  "Shop Helper",
];

// Composables
const vuetifyDisplay = useDisplay();
const router = useRouter();
const route = useRoute();
const store = useStore();

// Reactive data
const staffFormsRef = ref(null);
const staffDetails = ref({});
const activePanels = ref([]);
const isFormDisabled = ref(false); // Start with form enabled for new staff
const isFormDirty = ref(false);
const isLoading = ref(false);
const updatedPayload = ref({});

// Staff Personal Details Configuration
const STAFF_BUSINESS_DETAILS = {
  title: "Staff Business Details",
  showEditBtn: true,
  formCols: 12,
  md: 10,
  formsConfig: [
    {
      cols: 4,
      config: [
        {
          id: "staffFirstName",
          vModel: "firstName",
          name: "staffFirstName",
          label: "Staff First Name",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
          required: true,
        },
        {
          id: "staffLastName",
          vModel: "lastName",
          name: "staffLastName",
          label: "Staff Last Name",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
          required: true,
        },
        {
          id: "staffTitle",
          vModel: "employeeTile",
          label: "Employee Title",
          type: "select",
          items: STAFF_TITLES,
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
          required: true,
        },
      ],
    },
    {
      divider: true,
      cols: 1,
    },
    {
      cols: 4,
      config: [
        {
          id: "staffBusinessPhone",
          vModel: "phone",
          name: "staffBusinessPhone",
          label: "Staff Business Phone",
          type: "phoneNumber",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
          required: true,
        },
        {
          id: "staffBusinessPhone2",
          vModel: "phone2",
          name: "staffBusinessPhone2",
          label: "Extension #",
          type: "phoneNumber",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "staffBusinessEmailAddress",
          vModel: "email",
          name: "staffBusinessEmailAddress",
          label: "Staff Business Email Address",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
          required: true,
        },
      ],
    },
  ],
};

// Panel configuration
const STAFF_DETAILS_CONFIG = {
  title: "New Staff Details",
  icon: "staffSetup.png",
  activeTab: 1,
  tabs: [STAFF_BUSINESS_DETAILS],
};

const panels = ref([STAFF_DETAILS_CONFIG]);

// Computed properties
const shopDetails = computed(() => {
  return store.getters.getShopDetails ?? {};
});

// Methods
const resetPage = () => {
  staffDetails.value = {};
  updatedPayload.value = {};
  isFormDisabled.value = false;
  staffFormsRef.value?.resetForms();
};

const cancelForm = () => {
  resetPage();
  isFormDisabled.value = true;
};

const payloadUpdated = ({ payload, isDirty, validate, fieldsUpdated }) => {
  if (Array.isArray(fieldsUpdated)) {
    fieldsUpdated.forEach((fc) => {
      updatedPayload.value[fc] = payload[fc];
    });
  }
  isFormDirty.value = isDirty;
};

const createStaff = async () => {
  try {
    // ✅ Get shopIdStr from localStorage
    const shopIdStr = localStorage.getItem("shopIdStr") || "S00001"; // fallback if not found

    const allowedFields = ["firstName", "lastName", "email", "phone", "employeeTile"];

    const filteredPayload = allowedFields.reduce(
      (acc, key) => {
        if (updatedPayload.value[key]) {
          acc[key] = updatedPayload.value[key];
        }
        return acc;
      },
      { shopId: shopIdStr } // ✅ Inject shopId from localStorage
    );

    console.log("Filtered payload:", filteredPayload); // Confirm shopId is correct

    const response = await store.dispatch("createStaffUser", filteredPayload);

    if (response.success) {
      showSuccessToast("Staff created successfully");
      router.push("/Shop_Profile");
    } else {
      showErrorToast(response.error || "Failed to create staff");
    }
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    showErrorToast(error.response?.data?.message || "Unexpected error occurred");
  }
};

const onSubmit = async () => {
  try {
    const isFormValid = await staffFormsRef.value.validateForm();

    if (isFormValid) {
      isLoading.value = true;
      await createStaff();
    }
  } catch (error) {
    console.error("Form validation error:", error);
    showErrorToast("Please check the form for errors");
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  // Initialize with empty staff details for new staff
  staffDetails.value = {};
  updatedPayload.value = {};
});
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
