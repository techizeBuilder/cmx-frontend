<script setup>
import pointOfImpact from "../Icons/pointOfImpact.png";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import axios from "axios";
import { showSuccessToast } from "../../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const store = useStore();
const AuthToken = localStorage.getItem("AuthToken");
const apiUrl = import.meta.env.VITE_API_URL;
const storeVehicalDetails = computed(() => store.getters.getVehicals);
const storePaymentRefresh = computed(() => store.getters.getPaymentRefresh);
const isLoading = ref(false);

const pointOfImpactData = ref({});
watch(storeVehicalDetails, () => {
  pointOfImpactData.value = storeVehicalDetails.value.PointOfImpact;
});

const handlePointOfImpact = async (point) => {
  if (edit.value) {
    return;
  }
  try {
    isLoading.value = true;
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const sendData = await axios.get(
      `${apiUrl}/customerVehical/point/of/impact/${storeVehicalDetails.value._id}/${point}`,
      config
    );
    showSuccessToast(sendData.data.msg);
    store.dispatch("setPaymentRefresh", !storePaymentRefresh.value);
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const edit = ref(true);
const props = defineProps(["edit"]);

watch(props, () => {
  edit.value = props.edit;
});
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
  <div class="metodo" id="metodo">
    <!-- <img :src='pointOfImpact' alt="pointOfImpact" class="img-fluid" :style="{ width: '380px' }" /> -->
    <div class="circle">
      <!-- box -->
      <div
        class="box link-1"
        :style="{
          backgroundColor: pointOfImpactData.FrontCenter
            ? '#ff8100'
            : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('FrontCenter')" :class="{ disabled: edit }">
          A
        </div>
        <span>Front Center</span>
      </div>

      <!-- box -->
      <div
        class="box link-2"
        :style="{
          backgroundColor: pointOfImpactData.RTFront ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('RTFront')" :class="{ disabled: edit }">
          B
        </div>
        <span>RT Front</span>
      </div>
      <!-- /box -->

      <!-- box -->
      <div
        class="box link-3"
        :style="{
          backgroundColor: pointOfImpactData.RTSide ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('RTSide')" :class="{ disabled: edit }">
          C
        </div>
        <span>RT Side</span>
      </div>
      <!-- /box -->

      <!-- box -->
      <div
        class="box link-4"
        :style="{
          backgroundColor: pointOfImpactData.RTRear ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('RTRear')" :class="{ disabled: edit }">
          D
        </div>
        <span>RT Rear</span>
      </div>
      <!-- /box -->

      <!-- box -->
      <div
        class="box link-5"
        :style="{
          backgroundColor: pointOfImpactData.RearCenter ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('RearCenter')" :class="{ disabled: edit }">
          E
        </div>
        <span>Rear Center</span>
      </div>
      <!-- /box -->

      <!-- box -->
      <div
        class="box link-6"
        :style="{
          backgroundColor: pointOfImpactData.LTRear ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('LTRear')" :class="{ disabled: edit }">
          F
        </div>
        <span>LT Rear</span>
      </div>
      <!-- /box -->

      <!-- box -->
      <div
        class="box link-7"
        :style="{
          backgroundColor: pointOfImpactData.LTSide ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('LTSide')" :class="{ disabled: edit }">
          G
        </div>
        <span>LT Side</span>
      </div>
      <!-- /box -->

      <!-- box -->
      <div
        class="box link-8"
        :style="{
          backgroundColor: pointOfImpactData.LTFront ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('LTFront')" :class="{ disabled: edit }">
          H
        </div>
        <span>LT Front </span>
      </div>
      <!-- /box -->
      <div
        class="box link-9"
        :style="{
          backgroundColor: pointOfImpactData.Windshield ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('Windshield')" :class="{ disabled: edit }">
          I
        </div>
        <span>Windshield</span>
      </div>
      <!-- /box -->
      <div
        class="box link-10"
        :style="{
          backgroundColor: pointOfImpactData.Top ? '#ff8100' : '#d9d9d9',
        }"
      >
        <div @click="handlePointOfImpact('Top')" :class="{ disabled: edit }">
          J
        </div>
        <span>Top</span>
      </div>
      <!-- /box -->
    </div>
  </div>
</template>
<style scoped>
.metodo {
  width: 100%;
}

.circle {
  position: relative;
  width: 350px;
  height: 350px;
  margin: 0px auto;
  background-image: url("../Icons/pointOfImpact01.png");
  background-size: cover;
  background-position: center center;
}

.box {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  border-radius: 50%;
  transition: all linear 0.2s;
}

.box > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #000;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.box > span {
  display: none;
  background-color: #e0ebfd;
  padding: 5px 10px;
  width: 100%;
  position: relative;
  font-size: 12px;
  min-width: max-content;
  border-radius: 5px;
  color: #000;
  font-weight: 600;
  /* border: 1px solid #969694; */
  box-shadow: 2px 3px 2px 1px #949494;
  z-index: 999999;
}

.box:hover span {
  display: block;
  z-index: 999999;
}

.box img {
  width: 100%;
  height: auto;
}

.link-1 {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-151px) rotate(-0deg);
}

.link-2 {
  /*gris*/
  transform: translate(-50%, -50%) rotate(45deg) translateY(-151px)
    rotate(-45deg);
}

.link-3 {
  /*gris*/
  transform: translate(-50%, -50%) rotate(90deg) translateY(-151px)
    rotate(-90deg);
}

.link-4 {
  /*gris*/
  transform: translate(-50%, -50%) rotate(135deg) translateY(-151px)
    rotate(-135deg);
}

.link-5 {
  /*amarillo*/
  transform: translate(-50%, -50%) rotate(180deg) translateY(-151px)
    rotate(-180deg);
}

.link-6 {
  /*amarillo*/
  transform: translate(-50%, -50%) rotate(226deg) translateY(-151px)
    rotate(-220deg);
}

.link-7 {
  /*naranja*/
  transform: translate(-50%, -50%) rotate(270deg) translateY(-151px)
    rotate(-270deg);
}

.link-8 {
  /*naranja*/
  transform: translate(-50%, -50%) rotate(315deg) translateY(-151px)
    rotate(-315deg);
}

.link-9 {
  /*naranja*/
  transform: translate(-50%, -50%) rotate(0deg) translateY(-40px) rotate(-0deg);
}

.link-10 {
  /*naranja*/
  transform: translate(-50%, -50%) rotate(0deg) translateY(20px) rotate(-0deg);
}

.disabled {
  opacity: 0.5;
}
</style>
