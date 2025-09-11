<script setup>
import uploadIcon from "./ImagesXP/uploadIcon.png";
import DownloadIcon from "./ImagesXP/DownloadIcon.png";
import View from "./ImagesXP/View.png";
import uploadIconsss from "../../assets/uploadIcon.png";
import VehicleInfo from "../Icons/VehicleInfo.svg";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import moment from "moment";
import DocumentUploadModule from "./DocumentModelFolderx.vue";
import axios from "axios";
import { showSuccessToast } from "../../toster";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import sortIcon from "../Icons/sort.png";

const docEdit = ref(true);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const AllDoc = ref([]);

const handleDocSave = async () => {
  const updatedObj = AllDoc.value.reduce((acc, current) => {
    acc[current._id] = {
      Category: current.Category,
      Description: current.Description,
      DocumentshowName: current.DocumentshowName,
    };
    return acc;
  }, {});
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.post(
      `${apiUrl}/document/doc/update/${storeEstimateDetails.value._id}`,
      { updateDocData: updatedObj },
      config
    );
    showSuccessToast(response.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    docEdit.value = true;
  } catch (error) {
    console.log(error);
  }
};

const handleDocDeleteFolderX = async () => {
  let delDoc = [];
  AllDoc.value.map((item, index) => {
    if (checkBoxVar.value[index]) {
      delDoc.push(item._id);
    }
  });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/document/doc/delete/${
        storeEstimateDetails.value._id
      }/${JSON.stringify(delDoc)}`,
      { DocIDs: delDoc },
      config
    );
    showSuccessToast(response.data.msg);
    document.getElementById("closeDocDeleteFolderXModel").click();
    checkBoxVar.value = Object.values(checkBoxVar.value).filter(
      (item, index) => !item
    );
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    console.log(error);
  }
};

const downloadDocument = (item) => {
  fetch(`${apiUrl}/documents/${item.FileRefName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = item.DocumentshowName;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.error("Error downloading Document:", error);
    });
};

const checkBoxVar = ref({});

const handleAllDownload = () => {
  AllDoc.value.map((item, index) => {
    if (checkBoxVar.value[index]) {
      downloadDocument(item);
    }
  });
};

watch(storeEstimateDetails, async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/document/doc/estimate/${storeEstimateDetails.value._id}`,
      config
    );
    AllDoc.value = response.data.data;
    store.dispatch("setDocumentList", AllDoc.value);
  } catch (error) {
    console.log(error);
  }
});
const isAnyCheckboxSelected = computed(() => {
  return Object.values(checkBoxVar.value).some((value) => value);
});

const startFancy = (index) => {
  if (AllDoc.value.length > 0) {
    const fancyboxImages = AllDoc.value.map((item) => ({
      src: `${apiUrl}/documents/${item.FileRefName}`,
    }));
    Fancybox.show(fancyboxImages, { startIndex: index });
  }
};

const docName = ref(1);
const docCat = ref(1);
const docStaff = ref(1);
const docDate = ref(1);

const sortRefs = {
  Category: docCat,
  StaffDoc: docStaff,
  DocumentshowName: docName,
  documentDate: docDate,
};

const handleSort = async (type) => {
  const ref = sortRefs[type];
  if (!ref) return;

  AllDoc.value = AllDoc.value.sort((a, b) => {
    if (a[type] < b[type]) return -1 * ref.value;
    if (a[type] > b[type]) return 1 * ref.value;
    return 0;
  });

  ref.value = ref.value === 1 ? -1 : 1;
};
</script>
<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Sideview">
            <img
              class="sidebar-icon"
              :src="VehicleInfo"
              alt="VehicleInfo"
              width="20"
            />
            &nbsp; Documents</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="estimatedetailsection">
        <div class="row">
          <div class="col-lg-12 col-rowset">
            <div
              class="d-flex align-items-end gap-sm-4 gap-3 justify-content-between flex-wrap mt-2 mt-sm-4"
            >
              <div class="d-flex gap-3">
                <button
                  type="button"
                  class="btn btn-light text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#DocumentUploadFolderXModule"
                  :disabled="docEdit"
                >
                  <img :src="uploadIcon" alt="uploadIcon" />
                  &nbsp; Upload
                </button>
                <button
                  type="button"
                  @click="handleAllDownload"
                  class="btn btn-light text-nowrap"
                  :disabled="docEdit || !isAnyCheckboxSelected"
                >
                  <img
                    :src="DownloadIcon"
                    alt="DownloadIcon"
                    :style="{ width: '22px' }"
                  />&nbsp; Download
                </button>
                <button
                  :disabled="docEdit || !isAnyCheckboxSelected"
                  type="button"
                  class="btn btn-light text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#docDeleteFolderX"
                >
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-light text-nowrap"
                  @click="() => (docEdit = !docEdit)"
                  v-if="docEdit"
                >
                  <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
                </button>
                <button
                  v-else
                  :style="{ 'background-color': '#6BFA65' }"
                  @click="handleDocSave"
                  type="button"
                  class="btn btn-light text-nowrap flex-1"
                >
                  <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="table-responsive myestimateprotable mt-5">
          <table
            v-if="AllDoc.length !== 0"
            class="table table-bordered table-striped text-center"
          >
            <thead>
              <tr>
                <th></th>
                <th class="text-center text-nowrap">
                  <img
                    :src="DownloadIcon"
                    alt="DownloadIcon"
                    :style="{ width: '22px' }"
                  />
                </th>
                <th class="text-nowrap">
                  Document Name<img
                    class="sidebar-icon float-end"
                    type="button"
                    style="width: 16px; height: 16px;"
                    :src="sortIcon"
                    alt="surtIcon"
                    @click="handleSort('DocumentshowName')"
                  />
                </th>
                <th class="text-nowrap">
                  Category<img
                    class="sidebar-icon float-end"
                    type="button"
                    style="width: 16px; height: 16px;"
                    :src="sortIcon"
                    alt="surtIcon"
                    @click="handleSort('Category')"
                  />
                </th>
                <th class="text-nowrap">
                  File Name
                </th>
                <th class="text-nowrap">
                  Staff Name<img
                    class="sidebar-icon float-end"
                    type="button"
                    style="width: 16px; height: 16px;"
                    :src="sortIcon"
                    alt="surtIcon"
                    @click="handleSort('StaffDoc')"
                  />
                </th>
                <th class="text-nowrap">Size</th>
                <th class="text-nowrap">
                  Date | Time<img
                    class="sidebar-icon float-end"
                    type="button"
                    style="width: 16px; height: 16px;"
                    :src="sortIcon"
                    alt="surtIcon"
                    @click="handleSort('documentDate')"
                  />
                </th>
                <!-- <th class="text-nowrap">Size</th> -->
                <th class="text-nowrap">View</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in AllDoc" class="text-center">
                <td class="text-center">
                  <input v-model="checkBoxVar[index]" type="checkbox" />
                </td>
                <td class="text-center">
                  <img
                    type="button"
                    :src="DownloadIcon"
                    alt="DownloadIcon"
                    :style="{ width: '22px' }"
                    @click="downloadDocument(item)"
                  />
                </td>
                <td>
                  <input
                    :disabled="docEdit"
                    v-model="item.DocumentshowName"
                    id="description"
                    class="form-control"
                    type="text"
                  />
                </td>
                <td>
                  <select
                    :disabled="docEdit"
                    v-model="item.Category"
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
                </td>
                <td>{{ item.DocumentName }}</td>
                <td>{{ item.StaffDoc }}</td>
                <td>
                  {{ (item.Size / 1024 / 1024).toFixed(1) }} MB
                  <!-- <input
                    :disabled="docEdit"
                    v-model="item.Description"
                    id="description"
                    class="form-control"
                    type="text"
                  /> -->
                </td>
                <td>
                  {{
                    moment(item.documentDate)
                      .tz("America/New_York")
                      .format("MM/DD/YYYY - hh:mm A")
                  }}
                </td>
                <!-- <td>{{ (item.Size / 1024 / 1024).toFixed(4) }} MB</td> -->
                <td class="text-center">
                  <div @click="startFancy(index)">
                    <img
                      :src="View"
                      alt="View"
                      :style="{ width: '22px', cursor: 'pointer' }"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-else
            style="height: 330px; text-align: center; font-style: italic;"
          >
            No Document Uploaded Yet
          </div>
        </div>
      </div>
    </div>
  </div>
  <DocumentUploadModule />
  <div
    class="modal fade"
    id="docDeleteFolderX"
    tabindex="-1"
    aria-labelledby="docDeleteFolderXLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content w-75">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="docDeleteFolderXLabel">
            Delete File Notice
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeDocDeleteFolderXModel"
          ></button>
        </div>
        <div class="modal-body">
          <p class="mb-0 text-center">
            Are you sure you want to delete Documents?
          </p>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              @click="handleDocDeleteFolderX"
              type="button"
              class="btn btn-light"
            >
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
th {
  vertical-align: middle;
  background-color: #ccdff1;
}

td {
  vertical-align: middle;
}


div#myModal {
  z-index: 9999;
}
</style>
