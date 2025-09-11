<script setup>
import { onMounted, ref, watch, computed } from "vue";
import placeholder from "../../assets/placeholder.png";
import documentIconsss from "../../assets/document.png";
import image293 from "./ImagesXP/image293.png";
import image294 from "./ImagesXP/image294.png";
import image324 from "./ImagesXP/image324.png";
import image325 from "./ImagesXP/image325.png";
import image298 from "./ImagesXP/image298.png";
import FolderXSlider from "../FolderXSlider.vue";

import cmx from "../Icons/cmx.jpeg";
import cmx01 from "../Icons/cmx01.jpeg";
import cmx02 from "../Icons/cmx02.jpeg";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { showErrorToast, showSuccessToast } from "../../toster";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import axios from "axios";
import JSZip from "jszip";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(false);

const store = useStore();
const route = useRoute();
const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;

const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
//  Fancybox.bind("[data-fancybox]", {
//     // Your custom options
//     dblclickContent: false,
//     dblclickSlide: true,
//     dblclickOutside: false,
//     // on: {
//     //     done: (fancybox, slide) => {
//     //         /* console.log("fancybox",fancybox)
//     //         console.log("slide",fancybox) */
//     //         if (fancybox.isCurrentSlide(slide)) {
//     //             console.log(
//     //             `The content of the current slide #${slide.index} is loaded and revealed`
//     //             );
//     //         } else {
//     //             console.log(
//     //             `The content of the slide #${slide.index} is preloaded and revealed`
//     //             );
//     //         }
//     //     },
//     // },
// });
async function getImageSize(url) {
  try {
    const response = await axios.head(url.src);
    return parseInt(response.headers["content-length"], 10);
  } catch (error) {
    console.error(`Error fetching size for ${url}:`, error);
    return 0;
  }
}
function formatSize(sizeInBytes) {
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;
  return {
    sizeInBytes,
    sizeInKB: sizeInKB.toFixed(2),
    sizeInMB: sizeInMB.toFixed(2),
  };
}
const Allimg = ref([]);
const setPhotosData = async () => {
  Allimg.value = [];
  if (
    storeEstimateDetails.value &&
    storeEstimateDetails.value.photesGalleries
  ) {
    let sizePromises = storeEstimateDetails?.value?.photesGalleries.map(
      getImageSize
    );
    let sizes = await Promise.all(sizePromises);
    let totalSizeInBytes = sizes.reduce((acc, size) => acc + size, 0);
    let formattedSize = formatSize(totalSizeInBytes);
    /* console.log(`Total size: ${formattedSize.sizeInBytes} bytes, ${formattedSize.sizeInKB} KB, ${formattedSize.sizeInMB} MB`); */
    totalImageSize.value = `${formattedSize.sizeInMB}`;
  }
  storeEstimateDetails?.value?.photesGalleries.map(async (item, i) => {
    let sizeInBytes = await axios.head(item.src);
    let formattedSize = formatSize(
      parseInt(sizeInBytes.headers["content-length"], 10)
    );
    /* console.log(`Total size =======: ${formattedSize.sizeInBytes} bytes, ${formattedSize.sizeInKB} KB, ${formattedSize.sizeInMB} MB`);
     */
    const blob = await getImageBlob(`${apiUrl}/photoExpress/${item.photoName}`);
    const properDate = extractDate(item.photoName);
    const name = extractName(item.photoName);
    let imgSrc = `${apiUrl}/photoExpress/${item.photoName}`;
    let styleObj = { width: "100%", objectFit: "contain", height: "100%" };
    let styleObjDiv = {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#d6d6d6",
      textAlign: "center",
      height: "150px",
    };
    let styleObjDivSingle = {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#d6d6d6",
      textAlign: "center",
      height: "350px",
    };

    if (typeof item.type === "string" && !item.type.startsWith("image/")) {
      imgSrc = `${documentIconsss}`;
      styleObj = { width: "75%", objectFit: "contain", height: "100%" };
      styleObjDiv = {
        maxWidth: "100%",
        width: "100%",
        backgroundColor: "#d6d6d6",
        textAlign: "center",
        padding: "25px",
        height: "150px",
      };
      styleObjDivSingle = {
        maxWidth: "100%",
        width: "100%",
        backgroundColor: "#d6d6d6",
        textAlign: "center",
        padding: "25px",
        height: "350px",
      };
    }
    Allimg.value.push({
      _id: item._id,
      Id: item.Id,
      name: item.name,
      type: item.type,
      date: moment(item.date)
        .tz("America/New_York")
        .format("MM/DD/YYYY - hh:mm A"),
      size: formattedSize.sizeInMB,
      src: `${apiUrl}/photoExpress/${item.photoName}`,
      imgSrc: imgSrc,
      dsc: item.imageDescription !== "null" ? item.imageDescription : "",
      photoName: item.photoName,
      imageDescription:
        item.imageDescription !== "null" ? item.imageDescription : "",
      is_primary: item.is_primary,
      isDocs: typeof item.type === "string" && item.type.startsWith("image/"),
      styleObj: styleObj,
      styleObjDiv: styleObjDiv,
      styleObjDivSingle: styleObjDivSingle,
    });
    /* const newObj = {};
    newObj[item._id] = false;
    checkboxValues.value.push(newObj); */
    if (item.is_primary == true) {
      /* showSingleImage({
        _id: item._id,
        Id: item.Id,
        name: item.name,
        type: item.type,
        date: moment(properDate)
          .tz("America/New_York")
          .format("MM/DD/YYYY - hh:mm A"),
        size: (item.size / (1024 * 1024)).toFixed(3),
        src: `${apiUrl}/photoExpress/${item.photoName}`,
        dsc: item.imageDescription!=='null'?item.imageDescription:"",
        photoName: item.photoName,
        imageDescription: item.imageDescription!=='null'?item.imageDescription:"",
        is_primary: item.is_primary,
        isDocs:typeof item.type === 'string' && item.type.startsWith('image/'),
        imgSrc:imgSrc
      }); */
    }
  });
};
const getPhotosData = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateProfile/extra/photes/${storeEstimateDetails.value._id}`
    );
    if (response.data.data) {
      Allimg.value = response.data.data.extraPhotes;
      if (response.data.data.extraPhotes.length > 0) {
        showSingleImage(response.data.data.extraPhotes[0]);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const startFancy = (index) => {
  if (Allimg.value.length > 0) {
    const fancyboxImages = Allimg.value.map((image) => ({ src: image.src }));
    console.log("fancyboxImages", fancyboxImages);
    Fancybox.show(fancyboxImages, { startIndex: index });
  }
};
const singleImageDetails = ref(Allimg.value ? Allimg.value[0] : "");
const showSingleImage = (items) => {
  singleImageDetails.value = items;
};

// let Allimg = [

//     cmx, cmx01,cmx02,cmx, cmx01,cmx02,cmx, cmx01,cmx02,cmx, cmx01,cmx02,cmx, cmx01,cmx02,cmx, cmx01,cmx02,cmx, cmx01,cmx02,cmx, cmx01,cmx02]

const props = defineProps(["selectAll", "downloadSelected", "deleteSelected"]);
const checkboxValues = ref(
  Allimg.value ? Allimg.value.map((item) => ({ [item._id]: false })) : ""
);
const selectedcheckboxValues = ref([]);

watch(
  () => props.selectAll,
  (newValue, oldValue) => {
    if (newValue) {
      checkboxValues.value = Allimg.value.map((item) => ({ [item._id]: true }));
      selectedcheckboxValues.value = Allimg.value.map((item) => ({
        _id: item._id,
        src: item.src,
        name: item.photoName,
      }));
    } else {
      checkboxValues.value = Allimg.value.map((item) => ({
        [item._id]: false,
      }));
      selectedcheckboxValues.value = [];
    }
  }
);
const isChecked = (itemId) => {
  return selectedcheckboxValues.value.some((item) => item._id === itemId);
};
const handleImageError = async (event) => {
  event.target.src = placeholder; // Set a fallback image
};
const handleSelectCheckbox = async (item, event) => {
  if (event.target.checked) {
    selectedcheckboxValues.value.push({
      _id: item._id,
      src: item.src,
      name: item.photoName,
    });
  } else {
    selectedcheckboxValues.value = selectedcheckboxValues.value.filter(
      (selectedItem) => selectedItem._id !== item._id
    );
  }
};
const downloadFun = async () => {
  if (selectedcheckboxValues.value.length === 0) {
    showErrorToast("Please select at least one image to download.");
    // alert('Please select at least one image to download.');
    return;
  }
  try {
    const zip = new JSZip();

    for (const item of selectedcheckboxValues.value) {
      const response = await axios.get(item.src, { responseType: "blob" });
      zip.file(item.name, response.data, { binary: true });
    }

    const content = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "images.zip";
    link.click();
  } catch (error) {
    console.error("Error downloading images:", error);
  }
  /* const zip = new JSZip();
  // Download each image and add it to the zip file
  for (const item of selectedcheckboxValues.value) {
    const response = await axios.get(item.src, { responseType: 'blob' });
    // console.log("response",response.data)
    zip.file(item.photoName, response.data, { binary: true });
  } */

  /*  const content = await zip.generateAsync({ type: 'blob' });

  // Create a link to download the zip file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = 'images.zip';
  link.click(); */
};
const getData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      `${apiUrl}/estimateProfile/customer/Vehical/data/${storeEstimateDetails.value._id}`
    );
    let estimateData = response.data.data;
    let customerData = response.data.data.customerId;
    let vehicalData = response.data.data.vehicalId;

    store.dispatch("setCustomerDetails", customerData);
    store.dispatch("setEstimateDetails", estimateData);
    store.dispatch("setVehicals", vehicalData);

    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};
const setPhotoOfRecordFun = async () => {};
const setPrimaryFun = async () => {
  if (!singleImageDetails.value) {
    showErrorToast("Please select image.");
    return;
  }
  let imageID = singleImageDetails.value._id;
  try {
    const response = await axios.post(
      `${apiUrl}/estimateProfile/extra/Photes/setPrimary/${storeEstimateDetails.value._id}`,
      { imageID: imageID, is_primary: true }
    );
    showSuccessToast("The image has been set as primary !");
    await getData();
  } catch (error) {
    console.log(error);
  }
  // showErrorToast("The image has been set as primary !");
};

const handleDocPhotosDelete = async () => {
  let deletList = selectedcheckboxValues.value;
  try {
    const response = await axios.post(
      `${apiUrl}/estimateProfile/extra/Photes/delete/${storeEstimateDetails.value._id}`,
      { deletList }
    );
    if (response.data.success) {
      /* Allimg.value = Allimg.value.filter(
        (image, index) => !checkboxValues.value[index][image._id]
      );

      Allimg.value = Allimg.value.filter((image, index) =>  !(selectedcheckboxValues.value.every(criteria =>  image._id === criteria._id))); */

      let filterIds = new Set(
        selectedcheckboxValues.value.map((item) => item._id)
      );
      Allimg.value = Allimg.value.filter((item) => !filterIds.has(item._id));

      singleImageDetails.value = Allimg.value.length > 0 ? Allimg.value[0] : "";
      // console.log(response);
      showSuccessToast(response.data.msg);

      let modalEl = document.querySelector("#docPhotoDelete");
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    } else {
      showErrorToast(response.data.msg);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteFun = async () => {
  let deletList = selectedcheckboxValues.value;
  if (deletList.length <= 0) {
    showErrorToast("Please select image.");
    return;
  }
  let modalEl = document.querySelector("#docPhotoDelete");
  let modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
  console.log("modalInstance", modalInstance);
  modalInstance.show();
  /* console.log("Allimg.value",Allimg.value)
  console.log("selectedcheckboxValues.value",selectedcheckboxValues.value)
   */
  // const deletList = Allimg.value.filter((image, index) => checkboxValues.value[index][image._id]) .map((image) => image._id);
};

const uploadFun = async (
  value,
  name,
  size,
  imageDescription,
  imageID,
  uploaded_data
) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  /* Allimg.value.unshift({
    Id: `cmx${Allimg.value.length + 1}`,
    name: name.split(".").slice(0, -1).join("."),
    type: name.split(".").pop().toLowerCase(),
    size: (size / (1024 * 1024)).toFixed(3),
    date: formattedDate,
    src: value,
    Activeborder: "",
    dsc: "Vehicle details, Vehi cle details, Vehicle details,",
  });

  const newObj = {};
  newObj[`cmx${Allimg.value.length}`] = false;
  checkboxValues.value.push(newObj); */

  let blob = await getImageBlob(`${apiUrl}/photoExpress/${name}`);
  let properDate = extractDate(name);
  let nameImage = extractName(name);
  let itemData = uploaded_data;
  let styleObj = { width: "100%", objectFit: "contain", height: "100%" };
  let styleObjDiv = {
    maxWidth: "100%",
    width: "100%",
    backgroundColor: "#d6d6d6",
    textAlign: "center",
    height: "150px",
  };
  let styleObjDivSingle = {
    maxWidth: "100%",
    width: "100%",
    backgroundColor: "#d6d6d6",
    textAlign: "center",
    height: "350px",
  };

  let imgSrc = `${apiUrl}/photoExpress/${itemData.photoName}`;
  if (!itemData.type.startsWith("image/")) {
    imgSrc = `${documentIconsss}`;
    styleObj = { width: "75%", objectFit: "contain", height: "100%" };
    styleObjDiv = {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#d6d6d6",
      textAlign: "center",
      padding: "25px",
    };
    styleObjDivSingle = {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#d6d6d6",
      textAlign: "center",
      padding: "25px",
      height: "350px",
    };
  }
  itemData.imgSrc = imgSrc;
  itemData.isDocs = itemData.type.startsWith("image/");
  itemData.styleObj = styleObj;
  itemData.styleObjDiv = styleObjDiv;
  itemData.styleObjDivSingle = styleObjDivSingle;
  itemData.date = moment(itemData.date)
    .tz("America/New_York")
    .format("MM/DD/YYYY - hh:mm A");

  if (Allimg.value.length <= 0) {
    /* itemData?.map(async (item, i) => {
      let imgSrc= `${apiUrl}/photoExpress/${itemData.photoName}`;
      if(typeof item.type === 'string' && !item.type.startsWith('image/')){
        imgSrc= `${documentIconsss}`;
      }
      itemData.imgSrc=imgSrc;
      itemData.isDocs=item.type.startsWith('image/');
      return item;
    }); */
    showSingleImage(itemData);
    /* const newObj = {};
    newObj[itemData[0]._id] = false;
    checkboxValues.value.push(newObj); */
  }
  Allimg.value.unshift(itemData);
};

const calculateTotalImageSize = async (Allimg) => {
  let totalSize = 0;
  for (const image of Allimg.value) {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      totalSize += blob.size;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  const totalSizeInMB = totalSize / (1024 * 1024);
  return totalSizeInMB.toFixed(3);
};

const totalImageSize = ref(0);
const inputValue = ref("");
let intervalId;
onMounted(async () => {
  await setPhotosData();
  // await getData();
  // totalImageSize.value = await calculateTotalImageSize();
  // await getPhotosData();
});
const onDescChange = async (item, event) => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    callApi(event.target.value, item);
    clearInterval(intervalId);
  }, 500);
};
async function callApi(value, item) {
  let imageID = item._id;
  try {
    const response = await axios.post(
      `${apiUrl}/estimateProfile/extra/photesUpdate/${imageID}`,
      { desc: value }
    );
    console.log(response.data);
    // showSuccessToast("The image has been set as primary !");
    // await getData();
  } catch (error) {
    console.log(error);
  }
  /* fetch(`/extra/photes/:gallery_id` + value)
    .then(response => response.json())
    .then(data => {
      apiResponse.value = data;
    })
    .catch(error => {
      console.error('API error:', error);
    }); */
}
watch(Allimg.value, async () => {
  console.log("calculateTotalImageSize Allimg.value", Allimg.value);
  // totalImageSize.value = await calculateTotalImageSize();
});
defineExpose({
  deleteFun,
  setPrimaryFun,
  setPhotoOfRecordFun,
  downloadFun,
  uploadFun,
});

const getImageBlob = async (url) => {
  const response = await fetch(url);
  return await response.blob();
};

const extractDate = (photoName) => {
  const date = photoName.substring(0, 8);
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6);
  return new Date(`${year}-${month}-${day}`);
};

const extractName = (photoName) => {
  const lastUnderscoreIndex = photoName.lastIndexOf("_");
  const lastPeriodIndex = photoName.lastIndexOf(".");
  return photoName.substring(lastUnderscoreIndex + 1, lastPeriodIndex);
};

watch(storeEstimateDetails, async () => {
  await setPhotosData();
  /* Allimg.value= [];
  storeEstimateDetails?.value?.photesGalleries.map(async (item, i) => {
    const blob = await getImageBlob(`${apiUrl}/photoExpress/${item.photoName}`);
    const properDate = extractDate(item.photoName);
    const name = extractName(item.photoName);
    let imgSrc= `${apiUrl}/photoExpress/${item.photoName}`;
    if(typeof item.type === 'string' &&  !item.type.startsWith('image/')){
      imgSrc= `${documentIconsss}`;
    }
    Allimg.value.push({
      _id: item._id, 
      Id: item.Id,
      name: item.name,
      type: item.type,
      date: moment(properDate)
        .tz("America/New_York")
        .format("MM/DD/YYYY - hh:mm A"),
      size: (item.size / (1024 * 1024)).toFixed(3),
      src: `${apiUrl}/photoExpress/${item.photoName}`,
      imgSrc:imgSrc,
      dsc: item.imageDescription!=='null'?item.imageDescription:"",
      photoName: item.photoName,
      imageDescription: item.imageDescription!=='null'?item.imageDescription:"",
      is_primary: item.is_primary,
      isDocs:typeof item.type === 'string' && item.type.startsWith('image/')
    });
    const newObj = {};
    newObj[item._id] = false;
    checkboxValues.value.push(newObj);
    if (item.is_primary == true) {
      showSingleImage({
        _id: item._id,
        Id: item.Id,
        name: item.name,
        type: item.type,
        date: moment(properDate)
          .tz("America/New_York")
          .format("MM/DD/YYYY - hh:mm A"),
        size: (item.size / (1024 * 1024)).toFixed(3),
        src: `${apiUrl}/photoExpress/${item.photoName}`,
        dsc: item.imageDescription!=='null'?item.imageDescription:"",
        photoName: item.photoName,
        imageDescription: item.imageDescription!=='null'?item.imageDescription:"",
        is_primary: item.is_primary,
        isDocs:typeof item.type === 'string' && item.type.startsWith('image/'),
        imgSrc:imgSrc
      });
    }
  }); */
  /* if(storeEstimateDetails.value.photesGalleries.length>0){
    showSingleImage(storeEstimateDetails.value.photesGalleries[0]);
  } */
});
</script>
<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    color="#E6F0FF"
  />
  <div class="estimatedetailsection mt-sm-5 mt-3">
    <div class="row">
      <div class="col-sm-12 col-md-7 vehScrool order-2 order-sm-1">
        <!-- <div class="d-flex justify-content-start gap-1 flex-wrap"> -->
        <div class="row" v-if="Allimg && Allimg.length">
          <div
            class="col-sm-12 col-md-3 mb-4"
            v-for="(Item, index) in Allimg"
            v-bind:key="index"
          >
            <div
              class="card overflow-hidden"
              :style="{
                border:
                  singleImageDetails?._id == Item._id
                    ? '2px solid #3c86ff'
                    : '',
              }"
            >
              <div class="card-content">
                <div class="flex-fill">
                  <label :for="Item._id" class="w-100 position-absolute">
                    <div class="position-absolute photoRight">
                      <input
                        :id="Item._id"
                        type="checkbox"
                        class="form-check"
                        :style="{ width: '18px', height: '18px' }"
                        :checked="isChecked(Item._id)"
                        @change="handleSelectCheckbox(Item, $event)"
                      />
                    </div>
                  </label>
                  <!-- <a  :href="Item.src"> -->
                  <div :style="Item.styleObjDiv">
                    <img
                      :src="Item.imgSrc"
                      @error="handleImageError"
                      v-on:click="showSingleImage(Item)"
                      v-on:dblclick="startFancy(index)"
                      alt="Item"
                      :style="Item.styleObj"
                    />
                  </div>
                  <!-- </a> -->
                  <p class="p-2 m-0">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      v-model="Item.dsc"
                      @input="onDescChange(Item, $event)"
                      rows="2"
                      >{{ Item.dsc }}</textarea
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <!-- No images available. -->
        </div>
        <!-- </div> -->
      </div>
      <div
        :class="[
          'col-sm-12 col-md-5 order-1 order-sm-2',
          { 'd-none': !singleImageDetails },
        ]"
      >
        <div class="card overflow-hidden mt-0">
          <div class="card-content">
            <div id="photy" class="carousel slide" data-bs-ride="carousel">
              <!-- <div class="carousel-indicators">
                                <button type="button" data-bs-target="#photy" data-bs-slide-to="0" class="active"></button>
                                <button type="button" data-bs-target="#photy" data-bs-slide-to="1"></button>
                                <button type="button" data-bs-target="#photy" data-bs-slide-to="2"></button>
                            </div> -->
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div :style="singleImageDetails?.styleObjDivSingle">
                    <img
                      @error="handleImageError"
                      :src="singleImageDetails?.imgSrc"
                      alt="Los Angeles"
                      class="d-block mb-3 mx-auto"
                      :style="singleImageDetails?.styleObj"
                    />
                  </div>

                  <div class="px-2 mt-3">
                    <div class="d-flex gap-3 flex-wrap word-break-all">
                      <small> Name: {{ singleImageDetails?.photoName }} </small>
                      <small>Type: {{ singleImageDetails?.type }} </small>
                      <small>Size: {{ singleImageDetails?.size }} M.B. </small>
                      <small>Date: {{ singleImageDetails?.date }} </small>
                    </div>
                  </div>
                  <p class="px-2">
                    {{ singleImageDetails?.dsc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-end pe-4 mt-5">
          <p class="m-0">Total Photos {{ Allimg.length }}</p>
          <p>Total Size: {{ totalImageSize }} M.B.</p>
        </div>
      </div>
    </div>
  </div>
  <!-- DELETE MODAL START -->
  <div class="modal fade" id="docPhotoDelete">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="docPhotoDeleteLabel">
            Delete Photos
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeRoConverModel"
          ></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">
            Are you sure you want to delete the selected Documents?
          </p>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              @click="handleDocPhotosDelete"
              type="button"
              class="btn btn-light"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.photoRight {
  right: 4px;
}
.word-break-all {
  word-break: break-all;
}
</style>
