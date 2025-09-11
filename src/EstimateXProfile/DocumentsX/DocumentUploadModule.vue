<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import ProgressBarDocumentModel from "./ProgressBarDocumentModel.vue";
import uploadIconsss from "../../assets/uploadIcon.png";

const uploadFile = ref({});
const Start = ref(true);
const varFile = ref(null);

const removeFile = () => {
  uploadFile.value.value = null;
};

const handleUpFun = () => {
  if (uploadFile.value?.files.length !== 0) {
    Start.value = !Start.value;
    varFile.value = uploadFile.value.files;
  }
};

onMounted(() => {
  const documentModel = document.getElementById("DocumentUploadModule");
  if (documentModel) {
    documentModel.addEventListener("hidden.bs.modal", removeFile);
  }
  const documentModelUpload = document.getElementById(
    "DocumentProgressBarModule"
  );
  if (documentModelUpload) {
    documentModelUpload.addEventListener("hidden.bs.modal", removeFile);
  }
});

onBeforeUnmount(() => {
  const documentModel = document.getElementById("DocumentUploadModule");
  const documentModelUpload = document.getElementById(
    "DocumentProgressBarModule"
  );

  if (documentModel) {
    documentModel.removeEventListener("hidden.bs.modal", removeFile);
  }

  if (documentModelUpload) {
    documentModelUpload.removeEventListener("hidden.bs.modal", removeFile);
  }
});
</script>
<template>
  <div class="modal" id="DocumentUploadModule">
    <div class="modal-dialog modal-lg modal-dialog-centered p-0 p-sm-5">
      <div class="modal-content pe-1">
        <div class="modal-header border-0 text-center">
          <button
            id="closeDocumentModel"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div id="fileUpload" class="modal-body text-center p-5">
          <div class="mx-auto w-75 rounded" style="border: 2px dotted;">
            <h2 class="mb-0 w-100 p-4">Drag & Drop or click</h2>
            <div class="file">
              <img
                :src="uploadIconsss"
                alt="DownloadIcon"
                :style="{ width: '100px' }"
                @click="$refs.uploadFile.click()"
              />
              <input
                type="file"
                name="file"
                @input="handleUpFun"
                multiple="true"
                ref="uploadFile"
              />
            </div>
            <h4 class="mb-4">Document upload</h4>
          </div>

          <!-- Centered buttons below the content -->
          <div class="d-flex justify-content-center w-100 mt-4">
            <button
              type="button"
              class="btn btn-light me-5"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-light text-dark"
              :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
              @click="$refs.uploadFile.click()"
            >
              Select documents
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProgressBarDocumentModel :Start="Start" :Files="varFile" />
</template>
