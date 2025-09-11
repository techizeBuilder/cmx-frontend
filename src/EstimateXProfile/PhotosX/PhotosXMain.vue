<script setup>
import uploadIcon from "./ImagesXP/uploadIcon.png";
import DownloadIcon from "./ImagesXP/DownloadIcon.png";
import SelectAllIcon from "./ImagesXP/SelectAllIcon.png";
import PhotoExIcon from "./ImagesXP/PhotoExIcon.png";
import uploadIconsss from "../../assets/uploadIcon.png";
import documentIconsss from "../../assets/document.png";
import { ref, computed, watch } from "vue";
import cam from "./ImagesXP/cam.png";
import carsDemo from "./ImagesXP/carsDemo.png";
import PhotoExMore from "./ImagesXP/PhotoExMore.png";
import VehicleInfo from "../Icons/VehicleInfo.svg";
import PhotoXSideView from "./PhotoXSideView.vue";
import { useStore } from "vuex";
import axios from "axios";
import { showSuccessToast } from "../../toster";

const store = useStore();

const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const isActive = ref(true);
const childRef = ref(null);
const estimateDetails = ref(storeEstimateDetails?.value);

const urlImg = ref({});
const fileImg = ref({});
const urlImgPrior = ref({});
const fileImgPrior = ref({});
const imgUp = (e) => {
  urlImg.value[e.target.id] = URL.createObjectURL(e.target.files[0]);
  fileImg.value[e.target.id] = e.target.files[0];
};
const imgUpPrior = (e) => {
  urlImgPrior.value[e.target.id] = URL.createObjectURL(e.target.files[0]);
  fileImgPrior.value[e.target.id] = e.target.files[0];
};
const selectAll = ref(false);
const handleSelectAll = () => {
  selectAll.value = !selectAll.value;
};

const PhotDec = ref(null);
const uploadFile = ref(null);
const imageUpload = ref(null);
const uploadFileMultiple = ref([]);
const imageUploadMultiple = ref([]);
const imageFileUploadedMultiple = ref([]);
const isUploading = ref(false);
const progress = ref(0);
const photoXexpressList = ref([
  {name:"DamageArea1",id:"DamageArea1", title:"Damage Area 1" },
  {name:"DamageArea2",id:"DamageArea2", title:"Damage Area 2" },
  {name:"DamageArea3",id:"DamageArea3", title:"Damage Area 3" },
  {name:"DamageArea4",id:"DamageArea4", title:"Damage Area 4" },
  {name:"DamageArea5",id:"DamageArea5", title:"Damage Area 5" },
  {name:"DamageArea6",id:"DamageArea6", title:"Damage Area 6" },
  {name:"DamageArea7",id:"DamageArea7", title:"Damage Area 7" },
  {name:"DamageArea8",id:"DamageArea8", title:"Damage Area 8" },
  
  
]);
const priorDamageexpressList = ref([
  {name:"PriorDamageArea1",id:"PriorDamageArea1", title:"Prior Damage Area 1" },
  {name:"PriorDamageArea2",id:"PriorDamageArea2", title:"Prior Damage Area 2" },
  {name:"PriorDamageArea3",id:"PriorDamageArea3", title:"Prior Damage Area 3" },
  {name:"PriorDamageArea4",id:"PriorDamageArea4", title:"Prior Damage Area 4" },
  {name:"PriorDamageArea5",id:"PriorDamageArea5", title:"Prior Damage Area 5" },
  {name:"PriorDamageArea6",id:"PriorDamageArea6", title:"Prior Damage Area 6" },
  {name:"PriorDamageArea7",id:"PriorDamageArea7", title:"Prior Damage Area 7" },
  {name:"PriorDamageArea8",id:"PriorDamageArea8", title:"Prior Damage Area 8" },
  
  
]);

const showElement = async (text) => {
  /* console.log("storeEstimateDetails.value",storeEstimateDetails.value)
  console.log("storeEstimateDetails.value",storeEstimateDetails.value.firstName)
  console.log("fileImg.value",fileImg.value) */

  isActive.value = !isActive.value;
  if (text === "Upload") {
    try {
      const formData = new FormData();
      for (const key in fileImg.value) {
        formData.append(key, fileImg.value[key]);
        let nameImage = extractName(fileImg.value[key].name);
        let randomComponent = Math.floor(Math.random() * 1000);
        let timestamp = new Date().valueOf();
        let imageID = `${timestamp}_${randomComponent}_${nameImage}`;
        formData.append("imageID", imageID);
      }
      formData.append("photoType", "express_photos");
      formData.append(
        "estimateToken",
        storeEstimateDetails.value.estimateToken
      );
      const config = {
        headers: {
          Authorization: `Bearer ${AuthToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        `${apiUrl}/estimateProfile/photo/Upload`,
        formData,
        config
      );
      if (response.data.success) {
        showSuccessToast(response.data.msg);
        let uploaded_data = response.data.uploaded_data;
        if (uploaded_data.length > 0) {
          uploaded_data.forEach((uploadObj) => {
            uploadObj.imageDescription = uploadObj.imageDescription!=="null"?uploadObj.imageDescription:""
            uploadObj.dsc = uploadObj.dsc!=="null"?uploadObj.dsc:""
            childRef.value.uploadFun(
              uploadObj.src,
              uploadObj.photoName,
              uploadObj.size,
              uploadObj.imageDescription,
              uploadObj._id,
              uploadObj
            );
          });
        }
       
        const modalEl = document.getElementById("PhotoXExpressModul");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        uploadFile.value.value = null;
        imageUpload.value = null;
        fileImg.value = {};
        urlImg.value = {};
        fileImgPrior.value = {};
        urlImgPrior.value = {};
        uploadFileMultiple.value = [];
        imageUploadMultiple.value = [];
        imageFileUploadedMultiple.value=[];
        PhotDec.value = null;
        modalInstance.hide();
        
      } else {
        showErrorToast(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (text === "UploadPrior") {
    try {
      const formData = new FormData();
      for (const key in fileImgPrior.value) {
        formData.append(key, fileImgPrior.value[key]);
        let nameImage = extractName(fileImgPrior.value[key].name);
        let randomComponent = Math.floor(Math.random() * 1000);
        let timestamp = new Date().valueOf();
        let imageID = `${timestamp}_${randomComponent}_${nameImage}`;
        formData.append("imageID", imageID);
      }
      formData.append(
        "estimateToken",
        storeEstimateDetails.value.estimateToken
      );
      formData.append("photoType", "priorDamagePhoto");
      
      const config = {
        headers: {
          Authorization: `Bearer ${AuthToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        `${apiUrl}/estimateProfile/photo/Upload`,
        formData,
        config
      );
      if (response.data.success) {
        showSuccessToast(response.data.msg);
        let uploaded_data = response.data.uploaded_data;
        if (uploaded_data.length > 0) {
          uploaded_data.forEach((uploadObj) => {
            uploadObj.imageDescription = uploadObj.imageDescription!=="null"?uploadObj.imageDescription:""
            uploadObj.dsc = uploadObj.dsc!=="null"?uploadObj.dsc:""
            childRef.value.uploadFun(
              uploadObj.src,
              uploadObj.photoName,
              uploadObj.size,
              uploadObj.imageDescription,
              uploadObj._id,
              uploadObj
            );
          });
        }
        const modalEl = document.getElementById("PhotoXExpressModul");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        uploadFile.value.value = null;
        imageUpload.value = null;
        fileImg.value = {};
        urlImg.value = {};
        fileImgPrior.value = {};
        urlImgPrior.value = {};
        uploadFileMultiple.value = [];
        imageUploadMultiple.value = [];
        imageFileUploadedMultiple.value=[];
        PhotDec.value = null;
        modalInstance.hide();
        
      } else {
        showErrorToast(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
};

const handleAddMore = () => {
  const newId = `DamageArea${photoXexpressList.value.length + 1}`;
  const newPhotoArea = {
    id: newId,
    name: newId,
    title: `Damage Area ${photoXexpressList.value.length + 1}`
  };
  photoXexpressList.value.push(newPhotoArea);
 
}
const handleAddMorePrior = () => {
  const newId = `PriorDamageArea${priorDamageexpressList.value.length + 1}`;
  const newPhotoArea = {
    id: newId,
    name: newId,
    title: `Prior Damage Area ${priorDamageexpressList.value.length + 1}`
  };
  priorDamageexpressList.value.push(newPhotoArea);
 
}
const handleUploadImage = () => {
  
  const file = uploadFile.value.files[0];
  const files = event.target.files;
  console.log("files",files)
  imageUpload.value = URL.createObjectURL(file);
  if (uploadFile.value.files.length > 0) {
    Array.from(files).forEach((file) => {
      let fileType = file.type;
      let fileName = file.name;
      /* console.log("file.type.startsWith('image/')",file.type.startsWith('image/'))
      console.log("fileName",fileName)
      console.log("file",file) */
      uploadFileMultiple.value.push(file);
      imageUploadMultiple.value.push(URL.createObjectURL(file));
      imageFileUploadedMultiple.value.push({
        url:URL.createObjectURL(file),
        file:file,
        isDocs:file.type.startsWith('image/')
      });

    });
  }
};
const extractName = (photoName) => {
  const lastUnderscoreIndex = photoName.lastIndexOf("_");
  const lastPeriodIndex = photoName.lastIndexOf(".");
  return photoName.substring(lastUnderscoreIndex + 1, lastPeriodIndex);
};
const handleCloseUpload=()=>{
  uploadFile.value.value = null;
  imageUpload.value = null;
  uploadFileMultiple.value = [];
  imageUploadMultiple.value = [];
  imageFileUploadedMultiple.value = [];
  PhotDec.value = null;
}
const handleUpload = async () => {
  
  if (uploadFileMultiple.value.length === 0) {
    showErrorToast("Please select files to upload.");
    return;
  }
  const file = uploadFile.value.files[0];
  const files = uploadFileMultiple.value;
  let is_primary = false;
  isUploading.value = true;
  progress.value = 0;
 
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let nameImage = extractName(files[i].name);
      let randomComponent = Math.floor(Math.random() * 1000);
      let timestamp = new Date().valueOf();
      let imageID = `${timestamp}_${randomComponent}_${nameImage}`;
      formData.append("extraPhotes", files[i]);
      formData.append("imageID", imageID);
    }
    // formData.append("extraPhotes", file);
    formData.append("imageDescription", PhotDec.value);
    formData.append("is_primary", is_primary);
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },      
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      }
    };
    const response = await axios.post(
      `${apiUrl}/estimateProfile/extra/Photes/${storeEstimateDetails.value._id}`,
      formData,
      config
    );
    
    if (response.data.success) {      
      showSuccessToast(response.data.msg);
      let uploaded_data = response.data.uploaded_data;
      if (uploaded_data.length > 0) {
        /* storeEstimateDetails.value.photesGalleries=uploaded_data; */
        uploaded_data.forEach((uploadObj) => {
          uploadObj.imageDescription = uploadObj.imageDescription!=="null"?uploadObj.imageDescription:""
          uploadObj.dsc = uploadObj.dsc!=="null"?uploadObj.dsc:""
          childRef.value.uploadFun(
            uploadObj.src,
            uploadObj.photoName,
            uploadObj.size,
            uploadObj.imageDescription,
            uploadObj._id,
            uploadObj
          );
        });
      }
      setTimeout(() => {
        isUploading.value = false;
        const modalEl = document.getElementById("photoXUploadModul");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        uploadFile.value.value = null;
        imageUpload.value = null;
        uploadFileMultiple.value = [];
        imageUploadMultiple.value = [];
        imageFileUploadedMultiple.value = [];
        PhotDec.value = null;
        modalInstance.hide();
      }, 100);
      

      
    }
    // store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
  } catch (error) {
    console.log(error);
  }
};

watch(storeEstimateDetails, () => {
  estimateDetails.value = storeEstimateDetails.value;
  /* storeEstimateDetails.value.photoExpress.map(
    (item) => (urlImg.value[item.fileField] = `${apiUrl}${item.filename}`)
  ); */
});
</script>
<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Sideview">
            &nbsp; Photos</a
          >
        </li>
        <!-- <li class="nav-item">
                    <a class="nav-link show" data-bs-toggle="tab" href="#ViewAll">
                        <img class="sidebar-icon" :src="VehicleInfo" alt="VehicleInfo" width="20">
                        &nbsp; View All</a>
                </li> -->
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="estimatedetailsection">
        <div class="row">
          <div class="col-lg-12 col-rowset">
            <div
              class="d-flex align-items-end gap-sm-4 gap-2 flex-wrap upbtn justify-sm-content-end mt-2 mt-sm-4 pb-2"
            >
              <button
                type="button"
                class="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#photoXUploadModul"
              >
                <img :src="uploadIcon" alt="uploadIcon" />Upload
              </button>

              <button
                @click="childRef.downloadFun()"
                type="button"
                class="btn btn-light"
              >
                <img
                  :src="DownloadIcon"
                  alt="DownloadIcon"
                  :style="{ width: '22px' }"
                />Download
              </button>

              <button
                @click="handleSelectAll"
                type="button"
                class="btn btn-light"
              >
                <img :src="SelectAllIcon" alt="DownloadIcon" />Select All
              </button>

              <button
                type="button"
                class="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#PhotoXExpressModul"
              >
                <img
                  :src="PhotoExIcon"
                  alt="DownloadIcon"
                  :style="{ width: '22px' }"
                />PhotoX Express
              </button>

              <button
                type="button"
                class="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#PriorDamageExpressModul"
              >
                <img
                  :src="PhotoExIcon"
                  alt="DownloadIcon"
                  :style="{ width: '22px' }"
                />Prior Damage Express
              </button>

              <button
                @click="childRef.setPrimaryFun()"
                type="button"
                class="btn btn-light "
              >
                Set Primary
              </button>
              <button
                @click="childRef.setPhotoOfRecordFun()"
                type="button"
                class="btn btn-light me-sm-1"
              >
                Photo of Record
              </button>
              <button
                @click="childRef.deleteFun()"
                type="button"
                class="btn btn-light ms-sm-5"
              >
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane show active" id="Sideview">
          <PhotoXSideView :selectAll="selectAll" ref="childRef" />
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="photoXUploadModul">
    <div class="modal-dialog modal-lg modal-dialog-centered p-0 p-sm-5">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="handleCloseUpload"
          ></button>
        </div>

        <!-- Modal body -->
        <div id="fileUpload" class="modal-body text-center px-sm-5">
          <h2 class="mb-4">Drag & Drop</h2>

          <div class="file">
            <img
              :src="uploadIconsss"
              alt="DownloadIcon"
              :style="{ width: '255px' }"
              :class="{ 'uploaded-image': imageUpload }"
            />
            <input
              type="file"
              name="file"
              ref="uploadFile"
              multiple
              @input="handleUploadImage"
            />
            <h5 class="text-uppercase fw-bolder my-3">
              photo upload
            </h5>
          </div>
          <!-- <hr />
          <div class="form-group p-2">
            <p class="text-start mb-1">Description :</p>
            <textarea
              class="form-control"
              id="PhotoDescription"
              rows="3"
              v-model="PhotDec"
            ></textarea>
          </div> -->
          <div class="row" v-if="imageFileUploadedMultiple.length > 0">
            <div
              class="col-sm-3 mt-2"
              v-for="(image, index) in imageFileUploadedMultiple"
              :key="index"
            >

              <img
                :src="image.url"
                alt="DownloadIcon"
                :style="{ width: '255px',height:'130px' }"
                :class="{ 'uploaded-image': imageUpload }"
                 v-if="image.isDocs"
              />
              <div v-else>
                <p>
                  <img :src="documentIconsss" alt="document" :style="{ width: '30px',height:'30px' }" :class="{ 'uploaded-image': imageUpload }"    />{{image.file.name}}</p>
              </div> 
              
            </div>
          </div>
          <div v-if="isUploading">
            <div class="progress-bar">
              <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
            <p>{{ progress }}%</p>
          </div>
          <div class="mt-3">
            <button
              type="button"
              class="btn btn-light text-uppercase px-5 py-2 fs-4"
              
              :style="{ backgroundColor: '#2400FF', color: '#ffffff' }"
              @click="handleUpload"
            >
              Upload Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="PhotoXExpressModul">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <p class="ownerP">
            RO# {{ estimateDetails?.estimateId }} |
            {{ estimateDetails?.firstName }}, {{ estimateDetails?.lastName }} |
            {{ estimateDetails?.year }}, {{ estimateDetails?.make }},
            {{ estimateDetails?.model }} | {{ estimateDetails?.vin }} VIN# |
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Modal body -->

        <div class="modal-body text-center">
          <div class="ExpressFirst" v-if="isActive">
            <div class="d-flex flex-row justify-content-center gap-sm-5 gap-2">
              <div class="d-flex flex-column gap-3">
                <div class="camBlock" >
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="driverFront"
                      type="file"
                      name="driverFront"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['driverFront']"
                      :src="urlImg['driverFront']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Driver Front</h6>
                </div>
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="VinNumber"
                      type="file"
                      name="vinNumber"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['VinNumber']"
                      :src="urlImg['VinNumber']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>VIN Number</h6>
                </div>
                
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="DriverSide"
                      type="file"
                      name="driverSide"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['DriverSide']"
                      :src="urlImg['DriverSide']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Driver Side</h6>
                </div>
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="DriverRear"
                      type="file"
                      name="driverRear"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['DriverRear']"
                      :src="urlImg['DriverRear']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Driver Rear</h6>
                </div>
              </div>
              <div class="d-flex flex-column align-items-center gap-3">
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="CenterFront"
                      type="file"
                      name="CenterFront"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['CenterFront']"
                      :src="urlImg['CenterFront']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Center front</h6>
                </div>
                <div>
                  <img :src="carsDemo" class="cardDemo" alt="carsDemo" />
                </div>
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="RearCenter"
                      type="file"
                      name="rearCenter"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['RearCenter']"
                      :src="urlImg['RearCenter']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Rear Center</h6>
                </div>
              </div>
              <div class="d-flex flex-column gap-3">
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="PassengerFront1"
                      type="file"
                      name="PassengerFront1"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['PassengerFront1']"
                      :src="urlImg['PassengerFront1']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Passenger front</h6>
                </div>
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="Mileage"
                      type="file"
                      name="mileage"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['Mileage']"
                      :src="urlImg['Mileage']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Mileage</h6>
                </div>
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="PassengerSide"
                      type="file"
                      name="PassengerSide"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['PassengerSide']"
                      :src="urlImg['PassengerSide']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Passenger front</h6>
                </div>
                <div class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      id="PassengerRear"
                      type="file"
                      name="passengerRear"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg['PassengerRear']"
                      :src="urlImg['PassengerRear']"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>

                  <h6>Passenger Rear</h6>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="showElement('NEXT')"
              class="btn btn-block w-50 mt-3"
              :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
            >
              NEXT
            </button>

            <!-- <div class="d-flex gap-4 justify-content-end mt-2">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal"
                            :style="{ backgroundColor: '#E0E0E0 !important', }">Close</button>
                    </div> -->
          </div>
          <div class="ExpresSecond" v-else>
            <button
              class="btn align-items-center ArrowRight"
              @click="showElement('NEXT')"
              :disabled="isActive"
              style="width: 100px;"
            >
              <i class="fa-solid fa-chevron-left" style="font-size: 24px;"></i>
            </button>
            <div class="w-50 mx-auto">
            <div class="d-flex flex-wrap justify-content-center gap-sm-5 gap-2">
                <div v-for="(photo, index) in photoXexpressList" :key="index" class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUp"
                      :id="photo.id"
                      type="file"
                      :name="photo.name"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImg[photo.name]"
                      :src="urlImg[photo.name]"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>
                  <h6>{{ photo.title }}</h6>
                </div>
                <div class="camBlock add-more" @click="handleAddMore">
                  <div class="camBox file">
                    <img :src="PhotoExMore" alt="Add More" />
                  </div>
                  <h6>ADD MORE PHOTO</h6>
                </div>
            </div>
            </div>

            <button
              type="button"
              class="btn btn-block w-50 mt-3"
              :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
              data-bs-dismiss="modal"
              @click="showElement('Upload')"
              :disabled="Object.keys(fileImg).length === 0"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div class="modal" id="PriorDamageExpressModul">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <p class="ownerP">
            RO# {{ estimateDetails?.estimateId }} |
            {{ estimateDetails?.firstName }}, {{ estimateDetails?.lastName }} |
            {{ estimateDetails?.year }}, {{ estimateDetails?.make }},
            {{ estimateDetails?.model }} | {{ estimateDetails?.vin }} VIN# |
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Modal body -->

        <div class="modal-body text-center">          
          <div class="ExpresSecond">
            <!-- <button
              class="btn align-items-center ArrowRight"
              @click="showElement('NEXT')"
              :disabled="isActive"
              style="width: 100px;"
            >
              <i class="fa-solid fa-chevron-left" style="font-size: 24px;"></i>
            </button> -->
            <div class="w-50 mx-auto">
            <div class="d-flex flex-wrap justify-content-center gap-sm-5 gap-2">
                <div v-for="(photo, index) in priorDamageexpressList" :key="index" class="camBlock">
                  <div class="camBox file">
                    <input
                      @change="imgUpPrior"
                      :id="photo.id"
                      type="file"
                      :name="photo.name"
                      accept="image/*"
                    />
                    <img
                      class="avalable"
                      v-if="urlImgPrior[photo.name]"
                      :src="urlImgPrior[photo.name]"
                      alt="img"
                    />
                    <img v-else :src="cam" alt="cam" />
                  </div>
                  <h6 class="font-size-12">{{ photo.title }}</h6>
                </div>
                <div class="camBlock add-more" @click="handleAddMorePrior">
                  <div class="camBox file">
                    <img :src="PhotoExMore" alt="Add More" />
                  </div>
                  <h6 class="font-size-12">ADD MORE PHOTO</h6>
                </div>
            </div>
            </div>

            <button
              type="button"
              class="btn btn-block w-50 mt-3"
              :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
              data-bs-dismiss="modal"
              @click="showElement('UploadPrior')"
              :disabled="Object.keys(fileImgPrior).length === 0"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.font-size-12 {
  font-size: 12px !important;
}
.camBox {
  background-color: rgba(0, 102, 255, 0.09);
  border-top: 4px solid #8a9eb7;
  height: 150px;
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.camBlock h6 {
  color: #ffffff;
  background-color: #000000;
  padding: 5px 10px;
}

.camBox img {
  width: 45px;
}

.camBox img.avalable {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}

.expressactive {
  display: none;
}

.ArrowRight {
  position: absolute;
  left: 0;
}

.cardDemo {
  width: 250px;
}

.upbtn button img {
  margin-right: 4px;
}

@media screen and (max-width: 767px) {
  #PhotoXExpressModul .cardDemo {
    width: 120px;
  }
  .camBlock {
    width: calc(33.333% - 10px); /* Adjust width for three columns */
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .camBox {
    position: relative;
  }
  .camBox {
    height: 80px;
    width: 100px;
  }
  .camBlock h6 {
    font-size: 10px;
    padding: 3px 4px;
  }
  p.ownerP {
    font-size: 10px;
  }
  .camBox img {
    width: 30px;
  }
  p.ownerP {
    margin-bottom: 0;
  }
  .ArrowRight {
    position: relative;
    width: 100% !important;
    text-align: left;
  }
}

@media screen and (max-width: 500px) {
  .upbtn button img {
    display: none;
  }

  .upbtn button i {
    display: none;
  }
}

.uploaded-image {
  max-width: 100%; /* Ensure the image fits within its container */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px; /* Add border radius for a rounded appearance */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}
.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
}

.progress {
  height: 20px;
  background-color: #4caf50;
  transition: width 0.2s;
}

</style>
