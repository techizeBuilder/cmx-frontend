<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { watch, ref } from "vue";

const shopId = localStorage.getItem("shopId");
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();
const props = defineProps(["customerCommentData"]);
const permissions = ref({});
import { showErrorToast, showSuccessToast } from "../../../toster";
const schema = yup.object().shape({
  commentTitle: yup.string().required("comment Title is required"),
  comment: yup.string().required("data is required"),
});
const { handleSubmit, setValues, resetForm, values } = useForm({
  validationSchema: schema,
});
const {
  value: commentTitle,
  errorMessage: commentTitleErrorMessage,
} = useField("commentTitle");
const { value: comment, errorMessage: commentErrorMessage } = useField(
  "comment"
);
const ChatlinkInviteData = ref();
//     [
//   {
//     title: "Welcome Message",
//     parts: "",
//   },
//   {
//     title: "Welcome Message",
//     parts: "",
//   },
//   {
//     title: "Welcome Message",
//     parts: "",
//   },
//   {
//     title: "Welcome Message",
//     parts: "",
//   },
//   {
//     title: "Welcome Message",
//     parts: "",
//   },
//   {
//     title: "Welcome Message",
//     parts: "",
//   },
// ]
const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push("/login");
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error("An error occurred while fetching data", error);
  } else {
    showErrorToast("Some Error Occurred!!!!");
    console.error(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
};
const emit = defineEmits(["elementAdded"]);
const handleAdd = handleSubmit(async (value) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    value.shopId = localStorage.getItem("shopId");
    value.commentCategory = "Parts";
    const response = await axios.post(
      `${apiUrl}/shopDefaultComments/add/default/comment/${shopId}`,
      value,
      config
    );
    showSuccessToast(response.data.msg);
    emit("elementAdded");
    const closeButton = document.getElementById("closeCommentModelParts");
    closeButton.click();
    resetForm();
  } catch (error) {
    handleError(error);
  }
});
watch(props, () => {
  ChatlinkInviteData.value = props.customerCommentData;
  permissions.value = ChatlinkInviteData.value.reduce((acc, item) => {
    acc[item._id] = false;
    return acc;
  }, {});
});

const editValue = ref({});
const editButton = ref(true);
const togglePermission = (value) => {
  if (permissions.value[value._id]) {
    permissions.value[value._id] = false;
    editButton.value = true;
    return;
  }

  for (const key in permissions.value) {
    if (key === value._id) continue;
    permissions.value[key] = false;
  }

  permissions.value[value._id] = true;
  editValue.value = value;
  editButton.value = false;
};
const addComment = ref(false);
const handleEdit = () => {
  addComment.value = false;
  setValues(editValue.value ? editValue.value : {});
};
const handleEditData = handleSubmit(async (value) => {
  try {
    if (
      Object.keys(value).every((key) => {
        return value[key] === editValue.value[key];
      })
    ) {
      showErrorToast("Value have not changed !!!");
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/shopDefaultComments/update/comment/${shopId}/${value._id}`,
      value,
      config
    );
    showSuccessToast(response.data.msg);
    emit("elementAdded");
    const closeButton = document.getElementById("closeCommentModelParts");
    closeButton.click();
    editButton.value = true;
  } catch (error) {
    handleError(error);
  }
});
</script>
<template>
  <div class="pb-2 mt-3">
    <div class="d-flex align-items-center gap-3 justify-content-end">
      <div class="d-flex justify-content-end gap-3">
        <button
          type="button"
          class="btn btn-light px-4"
          data-bs-toggle="modal"
          data-bs-target="#partsSettings"
          @click="
            () => {
              addComment = true;
              resetForm();
            }
          "
        >
          Add
        </button>
        <button
          type="button"
          class="btn btn-light px-4"
          data-bs-toggle="modal"
          data-bs-target="#partsSettings"
          @click="handleEdit"
          :disabled="editButton"
        >
          Edit
        </button>
        <button type="button" class="btn btn-light px-4">Cancel</button>
        <button type="button" class="btn btn-light px-4">Save</button>
      </div>
    </div>
  </div>
  <div
    v-if="ChatlinkInviteData?.length > 0"
    class="row justify-content-center g-4 mt-4"
  >
    <div
      class="col-sm-4 mb-4"
      v-for="(Items, Index) in ChatlinkInviteData"
      :key="Index"
    >
      <div class="card mx-auto">
        <div class="card-body p-3">
          <div class="d-flex mb-1 justify-content-between align-items-center">
            <h6 class="m-0 fw-bold">Parts {{ Index + 1 }}</h6>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="time"
                name="times"
                @change="togglePermission(Items)"
                :checked="permissions[Items._id]"
              />
            </div>
          </div>
          <p class="border p-2 rounded border-dark">{{ Items.commentTitle }}</p>
          <div
            class="card MsgDiscard mt-3"
            :style="{ border: '1px solid #78707D' }"
          >
            <div class="card-body pb-5 border-dark">
              <small>
                {{ Items.comment }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="height: 425px; text-align: center; font-style: italic;">
    No chat Added yet
  </div>
  <div
    class="modal fade login-popup-dashtwo"
    id="partsSettings"
    tabindex="-1"
    aria-labelledby="partsSettingsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body mymodules">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Action: Edit, add staff</p>
                    <button
                      id="closeCommentModelParts"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center g-4 mt-4">
              <div class="col-sm-4 mb-4">
                <div class="card mx-auto">
                  <div class="card-body p-3">
                    <div
                      class="d-flex mb-1 justify-content-between align-items-center"
                    >
                      <h6 class="m-0 fw-bold">Add Customer Parts</h6>
                      <div class="form-check form-switch">
                        <button
                          type="button"
                          class="btn btn-light px-4"
                          @click="handleAdd"
                          v-if="addComment"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          class="btn btn-light px-4"
                          v-else
                          @click="handleEditData"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <label for="text" class="form-label">Parts Title </label>
                    <span v-if="commentTitleErrorMessage" class="errors"
                      >*</span
                    >
                    <input class="form-control" v-model="commentTitle" />
                    <div class="card MsgDiscard mt-3">
                      <label for="text" class="form-label p-1"
                        >Parts<span v-if="commentErrorMessage" class="errors"
                          >*</span
                        >
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="11"
                        v-model="comment"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
