<script setup>
import { ref, watch } from "vue";
import carsDemo from "./Icons/carsDemo.png";
import PhotoExMore from "./Icons/PhotoExMore.png";
import cam from "./Icons/cam.png";
import axios from "axios";
import { useRoute } from "vue-router";
import { showErrorToast, showSuccessToast } from "../toster";

const hasAnyImageUploaded = ref(false);
const route = useRoute();
const props = defineProps(["Photes"]);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const isActive = ref(true);
const fileImg = ref({});
const showElement = () => {
  isActive.value = !isActive.value;
};

const sendElements = async () => {
  if (hasAnyImageUploaded.value) {
    try {
      console.log("files>>>>>", fileImg.value);
      const formData = new FormData();
      for (const key in fileImg.value) {
        formData.append(key, fileImg.value[key]);
      }
      formData.append("estimateToken", route.params.token);
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
      console.log(response);
      showSuccessToast(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  } else {
    showErrorToast("Data hasn't changed. No update required");
  }
};

const urlImg = ref({});
const imgUp = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imgUrl = URL.createObjectURL(file);
    urlImg.value[e.target.id] = imgUrl;
    fileImg.value[e.target.id] = file;
    hasAnyImageUploaded.value = true;
  } else {
    urlImg.value[e.target.id] = "";
    fileImg.value[e.target.id] = "";
    hasAnyImageUploaded.value = true;
  }
};
watch(props, async () => {
  props.Photes.map((item) => {
    if (item.filename !== "") {
      urlImg.value[item.fileField] = `${apiUrl}${item.filename}`;
    }
  });
});
</script>
<template>
  <div class="photoEx">
    <div class="ExpressFirst" v-if="isActive">
      <div class="d-flex flex-row justify-content-center gap-5">
        <div class="d-flex flex-column gap-3">
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="driverFront"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['driverFront']"
                :src="urlImg['driverFront']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>
            <h6>Driver front</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="VinNumber"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
                @input="imgUp"
                id="DriverSide"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
                @input="imgUp"
                id="DriverRear"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
                @input="imgUp"
                id="Centerfront"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['Centerfront']"
                :src="urlImg['Centerfront']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Center front</h6>
          </div>
          <div>
            <img :src="carsDemo" alt="carsDemo" :style="{ width: '250px' }" />
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="RearCenter"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
                @input="imgUp"
                id="PassengerFront1"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
                @input="imgUp"
                id="Mileage"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
                @input="imgUp"
                id="PassengerFront2"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['PassengerFront2']"
                :src="urlImg['PassengerFront2']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Passenger front</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="PassengerRear"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
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
        @click="showElement"
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
        @click="showElement"
        :disabled="isActive"
        style="width: 100px;"
      >
        <i class="fa-solid fa-chevron-left" style="font-size: 24px;"></i>
      </button>
      <div class="d-flex flex-row justify-content-center gap-5">
        <div class="d-flex flex-column gap-3">
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea1"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea1']"
                :src="urlImg['DamageArea1']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 1</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea4"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea4']"
                :src="urlImg['DamageArea4']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 4</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea7"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea7']"
                :src="urlImg['DamageArea7']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 7</h6>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center gap-3">
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea2"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea2']"
                :src="urlImg['DamageArea2']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 2</h6>
          </div>

          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea5"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea5']"
                :src="urlImg['DamageArea5']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 5</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea8"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea8']"
                :src="urlImg['DamageArea8']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 8</h6>
          </div>
        </div>
        <div class="d-flex flex-column gap-3">
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea3"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea3']"
                :src="urlImg['DamageArea3']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 3</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea6"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea6']"
                :src="urlImg['DamageArea6']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 6</h6>
          </div>
          <div class="camBlock">
            <div class="camBox file">
              <input
                @input="imgUp"
                id="DamageArea9"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
              />
              <img
                class="avalable"
                v-if="urlImg['DamageArea9']"
                :src="urlImg['DamageArea9']"
                alt="img"
              />
              <img v-else :src="cam" alt="cam" />
            </div>

            <h6>Damage Area 9</h6>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-block w-50 mt-3"
        :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
        @click="sendElements"
      >
        <!-- data-bs-dismiss="modal" -->
        NEXT
      </button>
    </div>
  </div>
</template>
<style scoped>
.photoEx {
  position: relative;
  padding: 40px;
  margin-bottom: 140px;
  text-align: center;
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
</style>
