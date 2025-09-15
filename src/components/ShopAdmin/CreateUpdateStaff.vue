<template>
  <v-row
    :class="{
      'px-3': vuetifyDisplay.smAndUp.value,
    }"
  >
    <page-header
      title="Shop Staff Profile"
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
          title: userFullName,
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
      class="pt-0"
      :class="{
        'px-3': vuetifyDisplay.smAndUp.value,
      }"
    >
      <v-skeleton-loader
        v-if="isLoading"
        type="list-item-two-line"
        class="border-md border-opacity-25 px-5 py-3"
      >
      </v-skeleton-loader>
      <custom-key-value-pair
        v-else
        flat
        class="my-elevation px-5 py-3 custom-key-value-details"
        :config="[
          {
            title: 'Staff Name:',
            value: userFullName,
          },
          { title: 'Staff ID:', value: userId?.slice(0, 6) ?? '-' },
        ]"
      />
    </v-col>

    <v-col
      cols="12"
      class="mt-5"
      order="3"
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
                  <v-col v-if="tab.showEditBtn" cols="6">
                    <v-switch
                      v-model="updatedPayload.activeStatue"
                      label="Active Employee"
                      color="blue"
                      inset
                      hide-details
                      @update:modelValue="toggleUserStatus"
                    />
                  </v-col>
                  <v-col v-if="tab.showFullName" cols="6">
                    <span class="font-weight-600 text-h6">
                      {{ `${userDetails.firstName ?? ""} ${userDetails.lastName ?? ""}` }}
                    </span>
                  </v-col>
                  <v-col
                    :cols="tab.showEditBtn || tab.showFullName ? 6 : 12"
                    class="d-flex justify-end ga-3"
                  >
                    <custom-btn
                      v-if="!isFormDisabledArr[index]"
                      id="cancel-btn"
                      color="btn"
                      prepend-icon="cancel"
                      :disabled="isLoading"
                      @click="isFormDisabledArr[index] = true"
                    >
                      Cancel
                    </custom-btn>
                    <custom-btn
                      id="edit-user-details"
                      :color="isFormDisabledArr[index] ? 'btn' : 'myGreen'"
                      :prepend-icon="isFormDisabledArr[index] ? 'edit' : 'save'"
                      :loading="isLoading"
                      @click="
                        isFormDisabledArr[index]
                          ? (isFormDisabledArr[index] = false)
                          : onSubmit()
                      "
                    >
                      {{ isFormDisabledArr[index] ? "Edit" : "Save" }}
                    </custom-btn>
                  </v-col>

                  <v-col :cols="tab.formCols ?? 12" :md="tab.md">
                    <v-row v-bind="tab.rowProps">
                      <generic-form-cols
                        v-if="panel.activeTab === tabIdx + 1"
                        ref="staffUserFormsRef"
                        :data="userDetails"
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
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { handleError } from "@/handleError";
import PageHeader from "@/components/PageHeader.vue";
import CustomExpansionPanel from "@/shared/components/CustomExpansionPanel.vue";
import CustomKeyValuePair from "@/shared/components/CustomKeyValuePair.vue";
import CustomTabs from "@/shared/components/CustomTabs.vue";
import CustomBtn from "@/shared/components/CustomBtn.vue";
import GenericFormCols from "@/components/GenericFormCols.vue";
import { cloneDeep, isEqual } from "lodash";
import { computed } from "vue";
import NotificationDelivery from "./NotificationDelivery.vue";
import { shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast, showSuccessToast } from "@/toster";
import { useDisplay } from "vuetify";

const USER_PERMISSIONS = [
  "Office",
  "Estimator",
  "Parts",
  "Technician",
  "Accounting",
  "Manager",
];
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

const vuetifyDisplay = useDisplay();
const router = useRouter();
const route = useRoute();
const store = useStore();

const props = defineProps({
  userId: {
    type: [String],
    default: null, // Default ko null karein
  },
});

const staffUserFormsRef = ref(null);
const userDetails = ref({});
const activePanels = ref([]);
const isFormDisabled = ref(true);
const isFormDirty = ref(false);
const isLoading = ref(false);
const updatedPayload = ref({});

// registeredUserId ko seedhe route se lein, ye sabse reliable tareeka hai
const registeredUserId = ref(route.params.userId || props.userId || null);

const isFormDisabledArr = ref([true, true, true]);

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

const STAFF_PERSONAL_DETAILS = {
  title: "Staff Personal Details",
  formCols: 12,
  md: 11,
  showFullName: true,
  formsConfig: [
    {
      cols: 3,
      colProps: {
        style: {
          minWidth: "29.8% !important",
        },
      },
      config: [
        {
          id: "staffPersonalPhone",
          vModel: "phone",
          name: "staffPersonalPhone",
          label: "Staff Personal Phone / Cell 1",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "staffPersonalPhone2",
          vModel: "phone2",
          name: "staffPersonalPhone2",
          label: "Extension #",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "staffPersonalEmailAddress",
          vModel: "email",
          name: "staffPersonalEmailAddress",
          label: "Staff Personal Email Address",
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
      cols: 3,
      colProps: {
        style: {
          minWidth: "29.8% !important",
        },
      },
      config: [
        {
          id: "homeAddress",
          vModel: "address",
          name: "homeAddress",
          label: "Home Address",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "city",
          vModel: "city",
          name: "city",
          label: "City",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "state",
          vModel: "state",
          name: "state",
          label: "State",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "zipCode",
          vModel: "zipCode",
          name: "zipCode",
          label: "Zip Code",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "country",
          vModel: "country",
          name: "country",
          label: "Country",
          strongLabel: true,
          bgColor: "secondary",
          type: "select",
          cols: 12,
          md: 11,
        },
      ],
    },
    {
      divider: true,
      cols: 1,
    },
    {
      cols: 3,
      colProps: {
        style: {
          minWidth: "29.8% !important",
        },
      },
      config: [
        {
          id: "hireDate",
          vModel: "hireDate",
          name: "hireDate",
          label: "Hire Date",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "separationDate",
          vModel: "terminationDate",
          name: "separationDate",
          label: "Separation Date",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
      ],
    },
  ],
};
const EMERGENCY_CONTACT = {
  title: "Emergency Contact",
  formCols: 12,
  md: 10,
  formsConfig: [
    {
      cols: 4,
      config: [
        {
          id: "emergencyContactFirstName",
          vModel: "emergencyContactFirstName",
          label: "Emergency Contact First Name ",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "emergencyContactLastName",
          vModel: "emergencyContactLastName",
          label: "Emergency Contact Last Name ",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "emergencyContactPhone1",
          vModel: "emergencyContactPhone",
          label: "Emergency Contact Phone Cell 1",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        // {
        //   id: 'emergencyContactPhone2',
        //   vModel: 'emergencyContactPhone2',
        //   label: 'Emergency Contact Phone 2',
        //   strongLabel: true,
        //   bgColor: 'secondary',
        //   cols: 11,
        // },
        // {
        //   id: 'relationship',
        //   vModel: 'relationship',
        //   label: 'Relationship ',
        //   strongLabel: true,
        //   bgColor: 'secondary',
        //   cols: 11,
        // },
      ],
    },
    {
      divider: true,
      cols: 1,
    },
    {
      cols: 4,
      config: [
        // {
        //   id: 'emergencyContactFirstName',
        //   vModel: 'emergencyContactFirstName',
        //   label: 'Emergency Contact First Name ',
        //   strongLabel: true,
        //   bgColor: 'secondary',
        //   cols: 11,
        // },
        // {
        //   id: 'emergencyContactLastName',
        //   vModel: 'emergencyContactLastName',
        //   label: 'Emergency Contact Last Name ',
        //   strongLabel: true,
        //   bgColor: 'secondary',
        //   cols: 11,
        // },
        // {
        //   id: 'emergencyContactPhone1',
        //   vModel: 'emergencyContactPhone',
        //   label: 'Emergency Contact Phone Cell 1',
        //   strongLabel: true,
        //   bgColor: 'secondary',
        //   cols: 11,
        // },
        {
          id: "emergencyContactPhone2",
          vModel: "emergencyContactPhone2",
          label: "Emergency Contact Phone 2",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
        {
          id: "relationship",
          vModel: "relationship",
          label: "Relationship ",
          strongLabel: true,
          bgColor: "secondary",
          cols: 12,
          md: 11,
        },
      ],
    },
  ],
};
const STAFF_USER_DETAILS_CONFIG = {
  title: "Staff User Details",
  icon: "staffSetup.png",
  activeTab: 1,
  // component: shallowRef(ShopProfile),
  tabs: [STAFF_BUSINESS_DETAILS, STAFF_PERSONAL_DETAILS, EMERGENCY_CONTACT],
};
const STAFF_NOTIFICATIONS = {
  title: "Staff Notifications",
  icon: "staffSetup.png",
  activeTab: 1,
  tabs: [
    {
      title: "Staff Notifications",
      justify: "center",
      formCols: 12,
      formsConfig: [
        {
          title: "Notification Delivery",
          justify: "center",
          cols: 4,
          component: shallowRef(NotificationDelivery),
          props: {
            get data() {
              return { notificationEmail: updatedPayload.value.email };
            },
            get disabled() {
              return isFormDisabled.value || isLoading.value;
            },
          },
          on: {
            "update:payload": (val) => {
              if (val && val.notificationEmail !== undefined) {
                updatedPayload.value.email = val.notificationEmail;
              }
            },
          },
        },
        {
          divider: true,
          cols: 1,
        },
        {
          title: "User Notification",
          titleAlign: "center",
          justify: "center",
          cols: 4,
          formProps: {
            style: {
              marginLeft: "115px !important",
            },
          },
          config: [
            {
              type: "switch",
              id: "notification-office",
              vModel: "notification",
              label: "Office",
              value: "Office",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (notification) => {
                  updatedPayload.value.notification = notification;
                },
              },
            },
            {
              type: "switch",
              id: "notification-estimator",
              vModel: "notification",
              label: "Estimator",
              value: "Estimator",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (notification) => {
                  updatedPayload.value.notification = notification;
                },
              },
            },
            {
              type: "switch",
              id: "notification-parts",
              vModel: "notification",
              label: "Parts",
              value: "Parts",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (notification) => {
                  updatedPayload.value.notification = notification;
                },
              },
            },
            {
              type: "switch",
              id: "notification-technician",
              vModel: "notification",
              label: "Technician",
              value: "Technician",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (notification) => {
                  updatedPayload.value.notification = notification;
                },
              },
            },
            {
              type: "switch",
              id: "notification-accounting",
              vModel: "notification",
              label: "Accounting",
              value: "Accounting",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (notification) => {
                  updatedPayload.value.notification = notification;
                },
              },
            },
            {
              type: "switch",
              id: "notification-manager",
              vModel: "notification",
              label: "Manager",
              value: "Manager",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (notification) => {
                  updatedPayload.value.notification = notification;
                },
              },
            },
            {
              type: "divider",
              id: "divider",
              cols: 12,
              style: {
                opacity: 0.4,
              },
              colProps: {
                class: "py-0",
              },
            },
            {
              type: "switch",
              id: "shopAdmin",
              vModel: "notificationAccess",
              label: "Shop Admin",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 10,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              listeners: {
                "update:modelValue": (modelValue) => {
                  updatedPayload.value.notificationAccess = modelValue;
                  updatedPayload.value.notification = modelValue ? USER_PERMISSIONS : [];
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
const isPageUpdatingUser = computed(() => {
  return !!registeredUserId.value;
});

const STAFF_PERMISSIONS = {
  title: "Staff Permissions",
  icon: "staffNotification.png",
  tabs: [
    {
      title: "Staff Permissions",
      justify: "center",
      rowProps: {
        style: {
          minWidth: "700px",
        },
      },
      formsConfig: [
        {
          title: "User System Access Setup",
          cols: 7,
          config: [
            {
              type: "switch",
              id: "systemAccess",
              vModel: "permissions.length",
              label: "System Access",
              color: "blue",
              class: "system-access-switch",
              inset: true,
              hideDetails: true,
              cols: 12,
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              // listeners: {
              //   "update:modelValue": async (permissions) => {
              //     updatedPayload.value.permissions = permissions;
              //     if (isPageUpdatingUser.value) {
              //       await updateUser(updatedPayload.value);
              //     }
              //   },
              // },
            },
            {
              id: "userCompanyEmail",
              vModel: "email",
              label: "User Company Email",
              strongLabel: true,
              bgColor: "secondary",
              cols: 7,
              required: true,
            },
            {
              id: "userName",
              vModel: "userName",
              label: "User Name",
              strongLabel: true,
              bgColor: "secondary",
              cols: 7,
              required: true,
              hideDetails: true,
            },
            {
              type: "btn",
              id: "generateUserName",
              text: "Generate User Name",
              color: "grey-lighten-3",
              height: "40",
              density: "default",
              cols: 5,
              colProps: {
                class: "d-flex align-end",
              },
              listeners: {
                click: (e) => {
                  e.preventDefault();
                  userDetails.value.userName = generateUserName(userDetails.value);
                  updatedPayload.value.userName = generateUserName(userDetails.value);
                },
              },
            },
            {
              id: "userPassword",
              vModel: "password",
              type: "password",
              label: "User Password",
              strongLabel: true,
              bgColor: "secondary",
              cols: 7,
              required: true,
              hideDetails: true,
            },
            {
              type: "btn",
              id: "generateUserPassword",
              text: "Generate User Password",
              color: "grey-lighten-3",
              height: "40",
              density: "default",
              cols: 5,
              colProps: {
                class: "d-flex align-end px-0",
              },
              listeners: {
                click: (e) => {
                  e.preventDefault();
                  userDetails.value.password = generateUserPassword();
                  updatedPayload.value.password = generateUserPassword();
                },
              },
            },
          ],
        },
        {
          divider: true,
          cols: 1,
        },
        {
          title: "User Permissions",
          titleAlign: "center",
          justify: vuetifyDisplay.xs.value ? "start" : "center",
          cols: 4,
          formProps: {
            style: {
              marginLeft: "36px !important",
            },
          },
          config: [
            {
              type: "switch",
              id: "office",
              vModel: "permissions",
              label: "Office",
              value: "Office",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
            {
              type: "switch",
              id: "estimator",
              vModel: "permissions",
              label: "Estimator",
              value: "Estimator",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
            {
              type: "switch",
              id: "parts",
              vModel: "permissions",
              label: "Parts",
              value: "Parts",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
            {
              type: "switch",
              id: "technician",
              vModel: "permissions",
              label: "Technician",
              value: "Technician",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
            {
              type: "switch",
              id: "accounting",
              vModel: "permissions",
              label: "Accounting",
              value: "Accounting",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
            {
              type: "switch",
              id: "manager",
              vModel: "permissions",
              label: "Manager",
              value: "Manager",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
            {
              type: "divider",
              id: "divider",
              cols: 8,
              style: {
                opacity: 0.4,
              },
              colProps: {
                class: "py-0",
              },
            },
            {
              type: "switch",
              id: "shopAdmin",
              vModel: "systemAccess",
              label: "Shop Admin",
              color: "blue",
              inset: true,
              hideDetails: true,
              cols: 7,
              class: "no-wrap",
              colProps: {
                class: "py-0",
              },
              // listeners: {
              //   "update:modelValue": (modelValue) => {
              //     updatedPayload.value.systemAccess = modelValue;
              //     updatedPayload.value.permissions = modelValue
              //       ? USER_PERMISSIONS
              //       : [];
              //   },
              // },
              disabled: !isPageUpdatingUser.value && isFormDisabled,
              listeners: {
                "update:modelValue": async (permissions) => {
                  updatedPayload.value.permissions = permissions;
                  if (isPageUpdatingUser.value) {
                    await updateUser(updatedPayload.value);
                  }
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
const panels = ref([STAFF_USER_DETAILS_CONFIG, STAFF_PERMISSIONS, STAFF_NOTIFICATIONS]);

const userFullName = computed(() => {
  return `${userDetails.value.firstName ?? "-"} ${userDetails.value.lastName ?? ""}`;
});
const shopDetails = computed(() => {
  return store.getters.getShopDetails ?? {};
});

const resetPage = () => {
  updatedPayload.value = cloneDeep(userDetails.value);
  isFormDisabled.value = true;
  staffUserFormsRef.value?.resetForms();
};
const fetchUserDetails = async () => {
  // Ab ye condition sahi se kaam karegi
  if (isPageUpdatingUser.value) {
    console.log("Condition is TRUE. Fetching user details for ID:", registeredUserId.value);
    const response = await store.dispatch(
      "fetchUserDetails",
      registeredUserId.value
    );
    if (!response.data) {
      return handleError(response);
    }else{
      console.log('userDtails: ', response.data)
    }
    response.data.systemAccess = response.data?.permissions?.length === 6;
    response.data.notificationAccess = response.data?.notification?.length === 6;
    userDetails.value = response.data;
    updatedPayload.value = cloneDeep(userDetails.value);
    if (userDetails.value?.permissions) {
      updatedPayload.value.permissions = userDetails.value.permissions;
    } else {
      updatedPayload.value.permissions = [];
    }
  }
};
const payloadUpdated = async ({ payload, isDirty, validate, fieldsUpdated }) => {
  if (Array.isArray(fieldsUpdated)) {
    fieldsUpdated.forEach((fc) => {
      updatedPayload.value[fc] = payload[fc];
      if (fc === "notificationEmail") {
        updatedPayload.value.email = payload[fc];
      }
    });
  }
  isFormDirty.value = isDirty;
  if (payload && Array.isArray(payload.permissions)) {
    updatedPayload.value.allPermissions =
      payload.permissions.length === USER_PERMISSIONS.length;
  } else {
    updatedPayload.value.allPermissions = false;
  }
};
const updateUser = async (payload) => {
  isLoading.value = true;
  payload.userId = registeredUserId.value || props.userId;
  payload.email = updatedPayload.value.email || userDetails.value.email || "";
  const response = await store.dispatch("updateUserDetails", payload);
  if (!response.success) {
    return showErrorToast("Error:", response.msg);
  }
  isLoading.value = false;
  await fetchUserDetails();
  showSuccessToast(response.msg);
  isFormDisabled.value = true;
  // userDetails.value = {};
  // updatedPayload.value = {};
  // router.push('/Shop_Profile'); 
};
const createUser = async () => {
  updatedPayload.value.shopId = store.getters.shopId;
  updatedPayload.value.email =
    updatedPayload.value.email || userDetails.value.email || "";
  const response = await store.dispatch("createStaffUser", updatedPayload.value);
  if (!response.success) {
    return showErrorToast(response.error);
  }

  registeredUserId.value = response.data?._id || response.data?.userId || null;

  updatedPayload.value.userId = registeredUserId.value;
  showSuccessToast(response.msg);
  isFormDisabled.value = true;
  userDetails.value = {};
  updatedPayload.value = {};
};
const onSubmit = async () => {
  const isFormValid = await staffUserFormsRef.value.validateForm();
  if (isFormValid) {
    isLoading.value = true;

    if (registeredUserId.value) {
      updatedPayload.value.userId = registeredUserId.value;
      await updateUser(updatedPayload.value);
    } else {
      await createUser();
    }
  }
  isLoading.value = false;
};
const toggleUserStatus = async (value) => {
  if (userDetails.value.activeStatue !== value) {
    updateUser(updatedPayload.value);
  }
};
const generateUserName = (user) => {
  if (!user.firstName || !user.lastName) {
    showErrorToast("First and last name not found!");
    return null;
  }

  const firstPart = user.firstName.slice(0, 2);

  let randomNum = Math.floor(10 + Math.random() * 90);

  return `${firstPart}${user.lastName}${randomNum}`;
};
const generateUserPassword = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  let randomLetters = "";
  for (let i = 0; i < 5; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  let randomNumbers = "";
  for (let i = 0; i < 2; i++) {
    randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return randomLetters + randomNumbers;
};

watch(
  activePanels,
  () => {
    isFormDisabled.value = true;
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  isLoading.value = true;
  await fetchUserDetails();
  isLoading.value = false;
  console.log("userDetails hi", userDetails, updatedPayload.value);
});
</script>

<style lang="scss">
.staff-business-details,
.user-permissions {
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
</style>