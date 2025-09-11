<script setup>
import { ref, watch, onMounted, computed } from "vue";
import lock from "../Icons/lock.png";
import moment from "moment";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";
import surtIcon from "../Icons/sort.png";

const store = useStore();
const route = useRoute();
const gotComments = ref([]);
const editItem = ref({});
const staffId = localStorage.getItem("userId");
const apiUrl = import.meta.env.VITE_API_URL;
const storeCommentRefresh = computed(() => store.getters.getCommentRefresh);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const AuthToken = localStorage.getItem("AuthToken");
let PayItem = [
  { name: " Customer", price: "0.00" },
  { name: " Insurance", price: "0.00" },
  { name: " Grand Total", price: "0.00" },
  { name: "Total Posted", price: "0.00" },
];
const page = ref(1);
const ShowPage = ref(1);
const prevComments = ref(0);
const comments = ref(10);
const decPage = async () => {
  if (ShowPage.value > 1) {
    ShowPage.value--;
    gotComments.value = await featchComments(pattern[ShowPage.value - 1]);
    comments.value = pattern[ShowPage.value - 1];
  }
};

const pattern = [10, 25, 50, 75, 100];
const incPage = async () => {
  if (ShowPage.value <= 4) {
    ShowPage.value++;
    gotComments.value = await featchComments(pattern[ShowPage.value - 1]);
    comments.value = pattern[ShowPage.value - 1];
  }
};

const isItemOlderThan24Hours = (time) => {
  const createdAt = new Date(time);
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return createdAt > twentyFourHoursAgo;
};

const handleEditComment = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    editItem.value.staffId = staffId;
    const response = await axios.post(
      `${apiUrl}/customerComments/update/${editItem.value._id}`,
      editItem.value,
      config
    );
    showSuccessToast(response.data.msg);
    document.getElementById("closeCommentEditModel").click();
    gotComments.value = await featchComments(comments.value);
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (item) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/customerComments/delete/${item._id}`,
      config
    );
    showSuccessToast(response.data.msg);
    gotComments.value = await featchComments(comments.value);
  } catch (error) {
    console.log(error);
  }
};

const featchComments = async (data) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/customerComments/get/estimate/${data}/${storeEstimateDetails.value?._id}`,
      config
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const featchSortComments = async (sortData, sortType) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/customerComments/sort/comment/${comments.value}/${sortData}/${sortType}/${route.params.id}`,
      config
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const catSort = ref(1);
const staffSort = ref(1);
const dateSort = ref(1);
const handleSort = async (item) => {
  switch (item) {
    case "Category": {
      // gotComments.value = await featchSortComments(
      //   "commentCategory",
      //   catSort.value
      // );
      gotComments.value = gotComments.value.sort((a, b) => {
        if (a["commentCategory"] < b["commentCategory"])
          return -1 * catSort.value;
        if (a["commentCategory"] > b["commentCategory"])
          return 1 * catSort.value;
        return 0;
      });
      catSort.value = catSort.value === 1 ? -1 : 1;
      return;
    }
    case "Staff Name": {
      // gotComments.value = await featchSortComments("staffId", staffSort.value);
      gotComments.value = gotComments.value.sort((a, b) => {
        if (a["staffId"] < b["staffId"]) return -1 * staffSort.value;
        if (a["staffId"] > b["staffId"]) return 1 * staffSort.value;
        return 0;
      });
      staffSort.value = staffSort.value === 1 ? -1 : 1;
      return;
    }
    case "Date | Time": {
      // gotComments.value = await featchSortComments(
      //   "created_at",
      //   dateSort.value
      // );
      gotComments.value = gotComments.value.sort((a, b) => {
        if (a["created_at"] < b["created_at"]) return -1 * dateSort.value;
        if (a["created_at"] > b["created_at"]) return 1 * dateSort.value;
        return 0;
      });
      dateSort.value = dateSort.value === 1 ? -1 : 1;
      return;
    }
  }
};

const handleInputSelect = async (value) => {
  gotComments.value = await featchComments(value);
  ShowPage.value = pattern.findIndex((item) => item === parseInt(value)) + 1;
};

watch(comments, (newComments) => {
  page.value = newComments / 25;
});

const commentLength = ref(0);
watch(storeEstimateDetails, async () => {
  gotComments.value = await featchComments(10);
  commentLength.value = storeEstimateDetails.value.commentsLength;
});
watch(storeCommentRefresh, async () => {
  gotComments.value = await featchComments(comments.value);
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="table-responsive myestimateprotable mt-4">
      <table
        v-if="gotComments?.length !== 0"
        class="table table-bordered text-center table-striped"
      >
        <thead>
          <tr>
            <th>Select</th>
            <th class="text-start" :style="{ minWidth: '600px' }">Comment</th>
            <th>
              Category<img
                class="sidebar-icon float-end"
                type="button"
                @click="handleSort('Category')"
                style="width: 16px; height: 16px;"
                :src="surtIcon"
                alt="surtIcon"
              />
            </th>
            <th>
              Staff Name<img
                class="sidebar-icon float-end"
                style="width: 16px; height: 16px;"
                type="button"
                @click="handleSort('Staff Name')"
                :src="surtIcon"
                alt="surtIcon"
              />
            </th>
            <th class="text-nowrap">
              Date | Time<img
                class="sidebar-icon float-end"
                style="width: 16px; height: 16px;"
                type="button"
                @click="handleSort('Date | Time')"
                :src="surtIcon"
                alt="surtIcon"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="index in ((comments) - 3)" :key="index">
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                ></button>
                <ul class="dropdown-menu py-2">
                  <li class="ps-4 mb-2">Edit</li>
                  <li class="ps-4">Save</li>
                </ul>
              </div>
            </td>
            <td>
              <textarea class="form-control" rows="1" id="comment" name="text">
Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and</textarea
              >
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr> -->
          <tr v-for="item in gotComments">
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <div
                v-if="isItemOlderThan24Hours(item.created_at)"
                class="dropdown"
              >
                <button
                  type="button"
                  class="btn dropdown-toggle p-0 m-0 border-0"
                  data-bs-toggle="dropdown"
                  style="font-size: 30px;"
                ></button>
                <ul
                  class="dropdown-menu py-2"
                  @click="() => (editItem = { ...item })"
                >
                  <li
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#EditComments"
                    class="dropdown-item ps-4 mb-2"
                  >
                    Edit
                  </li>
                  <li
                    type="button"
                    @click="handleDelete(item)"
                    class="dropdown-item ps-4"
                  >
                    Delete
                  </li>
                </ul>
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn border-0"
                  data-bs-toggle="dropdown"
                >
                  <img
                    class="sidebar-icon w-75 h-75"
                    :src="lock"
                    alt="Payment"
                  />
                </button>
              </div>
            </td>
            <td>
              <textarea
                class="form-control"
                rows="1"
                id="comment"
                name="text"
                :disabled="true"
                style="display: inline-table;"
                >{{ item.commentVal }}</textarea
              >
            </td>
            <td class="text-center">{{ item.commentCategory }}</td>
            <td class="text-center">{{ item.staffId }}</td>
            <td class="text-center">
              {{
                moment(item.created_at)
                  .tz("America/New_York")
                  .format("MM/DD/YYYY - hh:mm A")
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-else
        style="height: 330px; text-align: center; font-style: italic;"
      >
        No Commensts Yet
      </div>
      <small class="d-flex justify-content-end mt-1"
        >Edit not available after end of day</small
      >
    </div>
    <div class="navigation-sectionsame mt-3">
      <div class="box d-flex">
        <select
          @change="(e) => handleInputSelect(e.target.value)"
          class="form-select"
          style="border: 0.898px solid #000;"
          v-model="comments"
        >
          <option value="10" selected>10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
        <span class="input-group-text">of {{ commentLength }}</span>
      </div>
      <div class="boxsg">
        <div class="sect-box-arrow">
          <i
            type="button"
            :disabled="ShowPage === 1"
            @click="decPage"
            class="fa-solid fa-angle-left"
          ></i>
          <div class="box-count">{{ ShowPage }}</div>
          <i type="button" @click="incPage" class="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="EditComments"
    tabindex="-1"
    aria-labelledby="EditCommentsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content" style="background-color: #d9d9d9;">
        <div class="modal-header chatHeBox border-0">
          <h6 class="m-0">Edit Comments</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeCommentEditModel"
          ></button>
        </div>

        <div class="modal-body p-5">
          <div class="row g-3">
            <div class="col-12">
              <select v-model="editItem.commentCategory" class="form-select">
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

            <div class="col-12">
              <div class="card border">
                <div class="card-body">
                  <textarea
                    class="form-control"
                    rows="6"
                    id="comment"
                    name="text"
                    placeholder="Enter New Comment"
                    v-model="editItem.commentVal"
                    style="resize: none;"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="col-12 d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                @click="handleEditComment"
                type="button"
                class="btn btn-light"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-control:disabled {
  background-color: #e6f0ff !important;
}
</style>
