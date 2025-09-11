<script setup>
import Cars from "./Icons/Cars.png";
import cmx from "./Icons/cmx.jpeg";
import cmx01 from "./Icons/cmx01.jpeg";
import cmx02 from "./Icons/cmx02.jpeg";
import cmxLogo04 from "../assets/cmxLogo04.jpeg";
import { useStore } from "vuex";
import { onMounted,computed, watch, ref } from "vue";
const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const primary_image_id = ref(null);

const updatePrimaryImageId = () => {
  if (storeEstimateDetails.value) {
    primary_image_id.value = storeEstimateDetails.value.photesGalleries.filter(
      (val) => val._id === storeEstimateDetails.value.primary_image_id
    );
  }
};
onMounted(() => {
  updatePrimaryImageId();
});
watch(storeEstimateDetails, () => {
  updatePrimaryImageId();
});
const handleImageError = async ( event) =>  {
  event.target.src = cmxLogo04; // Set a fallback image
}
</script>
<template>
  <img
          :src="primary_image_id&&primary_image_id.length>0?primary_image_id[0].src:cmxLogo04"
          @error="handleImageError"
          alt="logo"
          class="d-block"
          style="width: 100%;max-width: 145px;border-radius: 5px;max-height: 115px;"
        />
  <!-- <div id="demo" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        
      </div>
        <div class="carousel-item">
        <img
          :src="cmx01"
          alt="Los Angeles"
          class="d-block"
          style="width: 100%;"
        />
      </div>
      <div class="carousel-item">
        <img
          :src="cmx02"
          alt="Los Angeles"
          class="d-block"
          style="width: 100%;"
        />
      </div>  
    </div>
  </div> -->
</template>
