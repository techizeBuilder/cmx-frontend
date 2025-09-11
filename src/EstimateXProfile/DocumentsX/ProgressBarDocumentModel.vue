<script setup>
import axios from "axios";
import LvProgressBar from "lightvue/progress-bar";
import { ref, watch, computed, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { showSuccessToast, showErrorToast } from "../../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import uploadIconsss from "../../assets/uploadIcon.png";
import View from "./ImagesXP/View.png";
import { Fancybox } from "@fancyapps/ui";

const store = useStore();
const userData = JSON.parse(localStorage.getItem("userData"));
const storeDocCategory = computed(() => store.getters.getDocumentCategory);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const apiUrl = import.meta.env.VITE_API_URL;
const userId = localStorage.getItem("userId");
const AuthToken = localStorage.getItem("AuthToken");
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const progress = ref(0);
const props = defineProps(["Start", "Files"]);
const allFiles = ref({});
const varFiles = ref([]);
const selcetField = ref({});
const isLoading = ref(false);

const removeFile = () => {
  varFiles.value = [];
  allFiles.value = {};
  uploadFileUpdate.value.value = null;
};

const CategoryValidate = ref(false);
const DocNameValidate = ref(false);

const validateCategoryAndDocumentName = () => {
  CategoryValidate.value = false;
  DocNameValidate.value = false;
  let isValid = true;
  for (const item of varFiles.value) {
    if (!item.Category || item.Category.trim() === "") {
      CategoryValidate.value = true;
      isValid = false;
    }
    if (!item.DocumentName || item.DocumentName.trim() === "") {
      DocNameValidate.value = true;
      isValid = false;
    }
  }
  return isValid;
};

const handleDocumentUpload = async () => {
  if (!validateCategoryAndDocumentName()) {
    return;
  }
  isLoading.value = true;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    Object.values(allFiles.value).forEach((file, index) => {
      formData.append(index, file);
      formData.append(
        index,
        JSON.stringify(varFiles.value.find((item) => item.Id === index))
      );
    });
    const response = await axios.post(
      `${apiUrl}/document/register/${storeEstimateDetails.value._id}/${userId}`,
      formData,
      config
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    store.dispatch("setPaymentDoc", {
      paymentDocBoll: true,
      newDocId: response.data.data,
    });
    document.getElementById("closeProgressDocumentModel").click();
    document.getElementById("closeDocumentModel").click();
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};

const openModal = () => {
  const modalElement = document.getElementById("DocumentProgressBarModule");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const openEditModel = (id) => {
  selcetField.value = { ...varFiles.value.find((item) => item.Id === id) };
  const modalElement = document.getElementById("DocumentEditModule");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const hanldeEditSave = () => {
  document.getElementById("closeEditDocumentModel").click();
  varFiles.value = varFiles.value.map((item) => {
    if (item.Id === selcetField.value.Id) {
      return { ...item, ...selcetField.value };
    }
    return item;
  });
};

const handleDeleteFile = (id) => {
  varFiles.value = varFiles.value.filter((item) => item.Id !== id);
  allFiles.value = Object.values(allFiles.value).filter(
    (item, index) => index !== id
  );
  varFiles.value.map((item, index) => (item.Id = index));
};

const handleProgressBar = (files) => {
  const intervalId = setInterval(() => {
    let newValue = progress.value + Math.floor(Math.random() * 20) + 1;
    if (newValue >= 100) {
      newValue = 0;
      progress.value = 0;
      clearInterval(intervalId);
      Object.values(files).forEach((item) => {
        allFiles.value[Object.values(allFiles.value).length] = item;
        varFiles.value.push({
          Id: Object.values(allFiles.value).length - 1,
          name: item.name,
          Category: storeDocCategory.value,
          Description: "",
          Description: "",
        });
      });
      if (uploadFileUpdate.value?.files.length) {
        uploadFileUpdate.value.value = null;
      }
    }
    progress.value = newValue;
  }, 500);
};

watch(props, () => {
  openModal();
  handleProgressBar(props.Files);
});

onMounted(() => {
  const documentModel = document.getElementById("DocumentProgressBarModule");
  if (documentModel) {
    documentModel.addEventListener("hidden.bs.modal", removeFile);
  }
});

onBeforeUnmount(() => {
  document
    .getElementById("DocumentProgressBarModule")
    .removeEventListener("hidden.bs.modal", removeFile);
});

const uploadFileUpdate = ref(null);

const handleFileUpdate = () => {
  handleProgressBar(uploadFileUpdate.value.files);
};

const openFancybox = (index) => {
  if (Object.values(allFiles.value).length > 0) {
    const fancyboxImages = Object.values(allFiles.value).map((file) => {
      let type = "";
      if (file.type === "application/pdf") {
        type = "pdf";
      } else {
        type = "image";
      }
      return {
        src: URL.createObjectURL(file),
        type,
      };
    });
    Fancybox.show(fancyboxImages, { startIndex: index });
  }
};
</script>
<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    background-color="#E6F0FF"
    color="#E6F0FF"
  />
  <div class="modal" id="DocumentProgressBarModule">
    <div class="modal-dialog modal-xl modal-dialog-centered p-5">
      <div class="modal-content" style="min-height: 70vh;">
        <div
          class="modal-header text-center border-0"
          style="background-color: #e3eeff;"
        >
          <h3 class="mb-0 text-center">Document Upload</h3>
          <button
            id="closeProgressDocumentModel"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div id="fileUpload" class="modal-body text-center mt3">
          <div v-if="progress !== 0" class="p-3">
            <LvProgressBar
              :value="progress"
              color="#6bfa65"
              :style="{ borderRadius: '10px', overflow: 'hidden' }"
            />
          </div>
          <div
            v-if="varFiles.length > 0"
            class="mx-auto w-75 rounded"
            style="border: 2px dotted;"
          >
            <h2 class="mb-3 w-100">Drag & Drop or click</h2>
            <div class="file">
              <img
                :src="uploadIconsss"
                alt="DownloadIcon"
                :style="{ width: '120px' }"
              />
              <input
                type="file"
                name="file"
                multiple="true"
                ref="uploadFileUpdate"
                @input="handleFileUpdate"
              />
            </div>
            <h4>Document upload</h4>
          </div>
          <div class="table-responsive myestimateprotable p-3">
            <table
              v-if="varFiles.length > 0"
              class="table table-bordered table-striped text-center"
            >
              <thead>
                <tr>
                  <th class="text-center text-nowrap"></th>
                  <th class="text-center text-nowrap">File Name</th>
                  <th class="text-center text-nowrap">
                    Category<span style="color: #000;" v-if="CategoryValidate"
                      >*</span
                    >
                  </th>
                  <th class="text-center text-nowrap">
                    Document Name<span
                      style="color: #000;"
                      v-if="DocNameValidate"
                      >*</span
                    >
                  </th>
                  <th class="text-center text-nowrap">View</th>
                  <!-- <th class="text-center text-nowrap">Description</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of varFiles">
                  <td>
                    <div class="d-flex justify-content-center gap-2">
                      <button
                        @click="openEditModel(item.Id)"
                        type="button"
                        class="btn btn-light px-4"
                      >
                        Edit
                      </button>
                      <button
                        @click="handleDeleteFile(item.Id)"
                        type="button"
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td class="text-center">{{ item.name }}</td>
                  <td class="text-center">{{ item.Category }}</td>
                  <td class="text-center">{{ item.DocumentName }}</td>
                  <td class="text-center">
                    <div @click="openFancybox(item.Id)">
                      <img
                        :src="View"
                        alt="View"
                        :style="{ width: '22px', cursor: 'pointer' }"
                      />
                    </div>
                  </td>
                  <!-- <td>{{ item.Description }}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="varFiles.length > 0" class="d-flex justify-content-end p-4">
          <button
            data-bs-dismiss="modal"
            type="button"
            class="btn btn-light me-3"
          >
            Cancel
          </button>
          <button
            :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
            type="button"
            class="btn btn-light me-3 text-dark"
            @click="$refs.uploadFileUpdate.click()"
          >
            Select documents
          </button>
          <button
            type="button"
            class="btn px-4 btn-light text-dark"
            @click="handleDocumentUpload"
            style="background-color: #6bfa65;"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="DocumentEditModule"
    tabindex="-1"
    aria-labelledby="DocumentEditModuleLabel"
    aria-hidden="true"
    v-if="selcetField !== null"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            id="closeEditDocumentModel"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="fileUpload" class="modal-body text-center">
          <h2 class="mb-4">Edit Document</h2>
          <div class="mb-3 text-start">
            <label for="fileName" class="form-label">File Name</label>
            <input
              v-model="selcetField.name"
              id="documentName"
              class="form-control"
              type="text"
            />
          </div>
          <div class="mb-3 text-start">
            <label for="documentType" class="form-label">Category</label>
            <select
              v-model="selcetField.Category"
              id="documentType"
              class="form-select"
            >
              <option value="">-</option>
              <option value="Estimate">Estimate</option>
              <option value="Supplement">Supplement</option>
              <option value="Part Invoice">Part Invoice</option>
              <option value="Sublet Invoice">Sublet Invoice</option>
              <option value="OE Procedures">OE Procedures</option>
              <option value="Other">Other</option>
              <option value="Proof of Payment">Proof of Payment</option>
              <option value="Posted Payment">Posted Payment</option>
            </select>
          </div>
          <div class="mb-3 text-start">
            <label for="documentName" class="form-label">Document Name</label>
            <input
              v-model="selcetField.DocumentName"
              id="fileName"
              class="form-control"
              type="text"
            />
          </div>
          <!-- <div class="mb-4 text-start">
            <label for="description" class="form-label">Description</label>
            <input
              v-model="selcetField.Description"
              id="description"
              class="form-control"
              type="text"
            />
          </div> -->
          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-light text-dark"
              @click="hanldeEditSave"
              style="background-color: #6bfa65;"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.fancybox__container {
  z-index: 9999 !important;
}
</style>
