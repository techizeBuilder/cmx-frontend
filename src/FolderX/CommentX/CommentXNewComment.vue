<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import axios from "axios";
import { useRoute } from "vue-router";
import { showSuccessToast, showErrorToast } from "../../toster";
import { useStore } from "vuex";
import { watch } from "vue";

const route = useRoute();
const store = useStore();
const shopId = localStorage.getItem("shopId");
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storeCommentRefresh = computed(() => store.getters.getCommentRefresh);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const staffId = localStorage.getItem("userId");
const schema = yup.object().shape({
  commentCategory: yup.string().required("Category is required"),
  commentVal: yup.string().required("Comment is required"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const {
  value: commentCategory,
  errorMessage: commentCategoryErrorMessage,
} = useField("commentCategory");
const { value: commentVal, errorMessage: commentValErrorMessage } = useField(
  "commentVal"
);

const handleComment = handleSubmit(async (value) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    value.estimateId = storeEstimateDetails.value._id;
    value.staffId = staffId;
    const response = await axios.post(
      `${apiUrl}/customerComments/register`,
      value,
      config
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setCommentRefresh", !storeCommentRefresh.value);
    resetForm();
  } catch (error) {
    console.log(error);
  }
});

const category = ref("");
const filedsComments = ref([]);
const handleSelectCategory = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/shopDefaultComments/get/special/${shopId}/${category.value}`
    );
    if (response.data.data.length !== 0) {
      var modal = new bootstrap.Modal(
        document.getElementById("PreCommentModel")
      );
      modal.show();
      filedsComments.value = response.data.data;
    } else {
      category.value = "";
      showErrorToast("No Quick Comment Available for this Category !");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCancle = () => {
  document.getElementById("CommentsTab").click();
};

const handlePreComment = (title, comment) => {
  // console.log(title);
  // console.log(comment);
  commentCategory.value = category.value;
  commentVal.value = comment;
  document.getElementById("closeDefaultComment").click();
};

const onSelect = () => {
  category.value = "";
};

onMounted(() => {
  const modal = document.getElementById("PreCommentModel");
  if (modal) {
    modal.addEventListener("hidden.bs.modal", onSelect);
  }
});
onUnmounted(() => {
  const modal = document.getElementById("PreCommentModel");
  if (modal) {
    modal.removeEventListener("hidden.bs.modal", onSelect);
  }
});

const commentRows = ref(1);
const updateRows = () => {
  const words = commentVal.value.trim().split(/\s+/);
  const wordsPerLine = 15;
  const lines = Math.ceil(words.length / wordsPerLine);
  commentRows.value = lines;
};

watch(commentVal, () => {
  updateRows();
});
</script>
<template>
  <div class="estimatedetailsection my-5">
    <div class="row">
      <div class="col-sm-12 col-lg-3">
        <form action="#" class="mb-1 px-xl-4">
          <div class="d-flex flex-column flex-lg-column flex-sm-row gap-4">
            <div>
              Select Category<span
                v-if="commentCategoryErrorMessage"
                class="errors"
                >*</span
              >
            </div>
            <select v-model="commentCategory" class="form-select w-100">
              <option selected disabled value="">Select Category</option>
              <option value="Customer">Customer</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
              <option value="Parts">Parts</option>
              <option value="Payments">Payments</option>
              <option value="Repairs">Repairs</option>
              <option value="Supplement">Supplement</option>
            </select>
            <select
              v-model="category"
              @change="handleSelectCategory"
              class="form-select w-100"
            >
              <option selected disabled value="">Select Quick Comment</option>
              <option value="Customer">Customer</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
              <option value="Parts">Parts</option>
              <option value="Payments">Payments</option>
              <option value="Repairs">Repairs</option>
              <option value="Supplement">Supplement</option>
            </select>
          </div>
        </form>
        <div class="d-flex align-items-end gap-4 justify-content-center mt-4">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <button type="button" @click="handleComment" class="btn btn-light">
              <i class="fa-regular fa-floppy-disk"></i> Add
            </button>
            <button
              type="button"
              class="btn btn-light"
              v-on:click="seen = false"
              @click="handleCancle"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-9">
        <div class="table-responsive myestimateprotable">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>
                  Enter New Comment<span
                    v-if="commentValErrorMessage"
                    class="errors"
                    >*</span
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-start">
                  <textarea
                    class="form-control"
                    :rows="commentRows"
                    id="comment"
                    name="text"
                    placeholder="Enter New Comment"
                    v-model="commentVal"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="PreCommentModel">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">
        <div class="modal-header chatHeBox border-0">
          <h6 class="m-0">{{ category }}</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            id="closeDefaultComment"
          ></button>
        </div>

        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div
              v-for="item in filedsComments"
              :key="item._id"
              class="col-md-4 mb-4"
            >
              <div class="card">
                <div class="card-body p-3">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Quick Comments: {{ category }}</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">
                    {{ item.commentTitle }}
                  </p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #78707D' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>{{ item.comment }}</small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      @click="handlePreComment(item.commentTitle, item.comment)"
                      type="button"
                      class="btn btn-light"
                    >
                      Select
                    </button>
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

<style scoped>
.MsgDiscard {
  min-height: 230px;
}

.chatHeBox {
  background-color: #ccdff1;
}
</style>
