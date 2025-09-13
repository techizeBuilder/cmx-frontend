<script setup>
import { ref, watch } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";

const edit = ref(true);
const props = defineProps([
  "data",
  "userId",
  "handleUpdateAll",
  "handleAddEmploy",
]);
const userId = props.userId;
const handleUpdateAll = props.handleUpdateAll;
const handleAddEmploy = props.handleAddEmploy;
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),
});

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: props.data.notificationDelivery
    ? props.data.notificationDelivery[0]
    : null,
});

const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");

const permissions = ref({
  Office: props.data.permissions
    ? props.data.permissions.includes("Office")
      ? true
      : false
    : false,
  Estimator: props.data.permissions
    ? props.data.permissions.includes("Estimator")
      ? true
      : false
    : false,
  Parts: props.data.permissions
    ? props.data.permissions.includes("Parts")
      ? true
      : false
    : false,
  Technician: props.data.permissions
    ? props.data.permissions.includes("Technician")
      ? true
      : false
    : false,
  Accounting: props.data.permissions
    ? props.data.permissions.includes("Accounting")
      ? true
      : false
    : false,
  Manager: props.data.permissions
    ? props.data.permissions.includes("Manager")
      ? true
      : false
    : false,
});
const notification = ref({
  Office: props.data.notification
    ? props.data.notification.includes("Office")
      ? true
      : false
    : false,
  Estimator: props.data.notification
    ? props.data.notification.includes("Estimator")
      ? true
      : false
    : false,
  Parts: props.data.notification
    ? props.data.notification.includes("Parts")
      ? true
      : false
    : false,
  Technician: props.data.notification
    ? props.data.notification.includes("Technician")
      ? true
      : false
    : false,
  Accounting: props.data.notification
    ? props.data.notification.includes("Accounting")
      ? true
      : false
    : false,
  Manager: props.data.notification
    ? props.data.notification.includes("Manager")
      ? true
      : false
    : false,
});

const shopAdmin = ref(
  props.data.permissions
    ? props.data.permissions.length === 6
      ? true
      : false
    : false
);
const shopAdminNot = ref(
  props.data.notification
    ? props.data.notification.length === 6
      ? true
      : false
    : false
);

const handleshopAdmin = () => {
  if (shopAdmin.value) {
    Object.keys(permissions.value).forEach((key) => {
      permissions.value[key] = true;
    });
  } else {
    Object.keys(permissions.value).forEach((key) => {
      permissions.value[key] = false;
    });
  }
};
const handleshopAdminNot = () => {
  if (shopAdminNot.value) {
    Object.keys(notification.value).forEach((key) => {
      notification.value[key] = true;
    });
  } else {
    Object.keys(notification.value).forEach((key) => {
      notification.value[key] = false;
    });
  }
};

const handleNotification = handleSubmit(async (value) => {
  const truePermissions = Object.keys(permissions.value).filter(
    (key) => permissions.value[key]
  );
  const trueNotification = Object.keys(notification.value).filter(
    (key) => notification.value[key]
  );

  // console.log("value", [value]);
  if (!userId) {
    await handleAddEmploy({
      shopId: localStorage.getItem("shopId"),
      notification: trueNotification,
      permissions: truePermissions,
      notificationDelivery: [value],
    });
  } else {
    value.userId = userId;
    await handleUpdateAll({
      userId: userId,
      notification: trueNotification,
      permissions: truePermissions,
      notificationDelivery: [value],
    });
  }
  edit.value = true;
});

const handleNotificationBack = () => {
  const truePermissions = Object.keys(permissions.value).filter(
    (key) => permissions.value[key]
  );
  const trueNotification = Object.keys(notification.value).filter(
    (key) => notification.value[key]
  );
  return {
    userId: userId,
    notification: trueNotification,
    permissions: truePermissions,
    notificationDelivery: [{ email: email.value, phone: phone.value }],
  };
};
defineExpose({
  handleNotification,
  handleNotificationBack,
});

watch(
  permissions,
  () => {
    shopAdmin.value = Object.values(permissions.value).every((value) => value);
  },
  { deep: true }
);
watch(
  notification,
  () => {
    shopAdminNot.value = Object.values(notification.value).every(
      (value) => value
    );
  },
  { deep: true }
);
</script>

<template>
  <div class="estimatedetailsection">
    <div class="p-2 text-end">
      <button
        type="button"
        @click="() => (edit = false)"
        class="btn btn-light text-nowrap"
        v-if="edit"
      >
        <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
      </button>
      <button
        v-else
        :style="{ 'background-color': '#6BFA65' }"
        type="button"
        class="btn btn-light text-nowrap flex-1"
        @click="handleNotification"
      >
        <i class="fa-regular fa-floppy-disk"></i> Save
      </button>
    </div>
    <div class="row px-lg-5 pt-4 pt-sm-0 g-5">
      <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="EmpFrame">
          <div class="mt-0">
            <h5 class="mb-4">Permissions</h5>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="permissions.Office"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Office</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="permissions.Estimator"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Estimator</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="permissions.Parts"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Parts</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="permissions.Technician"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Technician</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="permissions.Accounting"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Accounting</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="permissions.Manager"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Manager</label>
            </div>
          </div>
          <hr class="my-5" />
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              name="darkmode"
              value="yes"
              v-model="shopAdmin"
              @change="handleshopAdmin"
              :disabled="edit"
              checked
            />
            <label class="form-check-label" for="mySwitch">Shop Admin</label>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="EmpFrame">
          <div class="mt-0">
            <h5 class="mb-4">Notification</h5>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="notification.Office"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Office</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="notification.Estimator"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Estimator</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="notification.Parts"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Parts</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="notification.Technician"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Technician</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="notification.Accounting"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Accounting</label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                v-model="notification.Manager"
                :disabled="edit"
                checked
              />
              <label class="form-check-label" for="mySwitch">Manager</label>
            </div>
          </div>
          <hr class="my-5" />
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              name="darkmode"
              value="yes"
              v-model="shopAdminNot"
              @change="handleshopAdminNot"
              :disabled="edit"
              checked
            />
            <label class="form-check-label" for="mySwitch">Shop Admin</label>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="EmpFrame">
          <div class="mt-0">
            <h5 class="mb-4">Notification Delivery</h5>
            <div class="form-check form-switch mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                checked
              />
              <label class="form-check-label" for="mySwitch"
                >CMX Notification</label
              >
            </div>
            <div
              class="form-check form-switch mb-2 d-flex gap-2 justify-content-center align-items-center"
            >
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                checked
              />
              <label class="form-check-label" for="mySwitch"
                >Email<span v-if="emailErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                v-model="email"
                type="text"
                class="form-control"
              />
            </div>
            <div
              class="form-check form-switch mb-2 d-flex gap-2 justify-content-center align-items-center"
            >
              <input
                class="form-check-input"
                type="checkbox"
                name="darkmode"
                value="yes"
                checked
              />
              <label class="form-check-label" for="mySwitch"
                >SMS<span v-if="phoneErrorMessage" class="errors"
                  >*</span
                ></label
              >
              <input
                :disabled="edit"
                type="text"
                v-model="phone"
                class="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
label {
  font-weight: 500;
}

.EmpFrame {
  background: rgba(210, 212, 215, 0.2);
  padding: 20px 30px;
}
</style>
