<script setup>
import ChatBodyDetials from "./ChatBodyDetials.vue";
import ChatlinkTab from "./ChatlinkTab.vue";
import photos from "./Icons/photos.png";
import Esign from "./Icons/Esign.png";
import chat from "./Icons/chat.png";
import welcome from "./Icons/welcome.png";
import PhotoExpress from "./PhotoExpress.vue";
import WelcomeFormMain from "./WelcomeForm/WelcomeFormMain.vue";
import ESign from "./ESign.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { showErrorToast, showSuccessToast } from "../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const apiUrl = import.meta.env.VITE_API_URL;
const isLoading = ref(false);
const AuthToken = localStorage.getItem("AuthToken");
const customerData = ref({});
const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push("/login");
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error("An error occurred while fetching data", error);
  } else {
    showErrorToast("Some Error Occurred!!!!");
    console.error(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
};

const seenMessage = async () => {
  try {
    await axios.get(
      `${apiUrl}/estimateChatLink/Update/Seen/${route.params.token}/Admin`
    );
  } catch (error) {
    console.log(error);
  }
};

const fetchData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateProfile/get/customer/${route.params.token}`,
      config
    );
    customerData.value = response.data.data;
    // console.log("customerData>>>>>>>", customerData.value);
  } catch (error) {
    handleError(error);
  }
};

const route = useRoute();
onMounted(async () => {
  isLoading.value = true;
  await fetchData();
  await seenMessage();
  isLoading.value = false;
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
  <div class="chatlinkmainPge shopadmindashboard">
    <div class="section-main">
      <div class="main-header-dashboard">
        <div class="-section">
          <div class="row" style="align-items: center;">
            <div class="col-lg-6 col-md-5 col-sm-5 col-7">
              <div
                class="d-inline-flex justify-content-start align-items-center gap-sm-5 gap-3 w-full"
              >
                <div class="set w-full">
                  <a href="/">
                    <img
                      src="../assets/CollisionMateX.png"
                      alt="logo"
                      :style="{ width: '270px' }"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <nav
    class="navbar sticky-top py-0 FolderXNavbar"
    :style="{ backgroundColor: '#EFEFEF', borderRadius: '2px', top: '3.4rem' }"
  >
    <div class="floderXhe">
      <div class="container">
        <p class="mb-0 px-2 py-0">
          <small
            >Owner {{ customerData.lastName }},
            {{ customerData.firstName }}</small
          >
        </p>
      </div>
    </div>
  </nav>
  <div class="mt-5">
    <ChatBodyDetials :shopId="customerData.shopId" />

    <div class="tab-content">
      <div id="WelcomeForm" class="tab-pane fade">
        <div :style="{ backgroundColor: '#D2D4D780', paddingBottom: '200px' }">
          <WelcomeFormMain :customerData="customerData" />
        </div>
      </div>

      <div id="home" class="tab-pane fade">
        <div :style="{ backgroundColor: '#D2D4D780', paddingBottom: '200px' }">
          <ESign :signatures="customerData" />
        </div>
      </div>
      <div id="Chatlink" class="tab-pane active">
        <div :style="{ paddingBottom: '200px' }">
          <ChatlinkTab />
        </div>
      </div>
      <div id="PhotoExpress" class="tab-pane fade">
        <div :style="{ paddingBottom: '200px' }">
          <PhotoExpress :Photes="customerData.photoExpress" />
        </div>
      </div>
    </div>

    <div class="btmTab">
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="pill" href="#WelcomeForm">
            <img :src="welcome" alt="welcome" />
            <h6>Welcome Form</h6>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="pill" href="#home">
            <img :src="Esign" alt="Esign" />
            <h6>E-Sign</h6>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="pill" href="#Chatlink">
            <img :src="chat" alt="chat" />
            <h6>Chatlink</h6>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="pill" href="#PhotoExpress">
            <img :src="photos" alt="photos" />
            <h6>Photo Express</h6>
          </a>
        </li>
      </ul>
      <!-- <div>
            <img :src="Esign" alt="Esign">
            <h6>E-Sign</h6>
        </div>
        <div>
            <img :src="chat" alt="chat">
            <h6>Chatlink</h6>
        </div>
        <div>
            <img :src="photos" alt="photos">
            <h6>Photo Express</h6>
        </div> -->
    </div>
  </div>
</template>

<style scoped>
.btmTab {
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15rem;
  text-align: center;
  align-items: center;
}

/* #E8F1FF */
.btmTab h6 {
  font-size: 14px;
  color: #000;
  font-weight: 600;
}

.btmTab .nav-pills .nav-link img {
  width: 30px;
  margin: 0 auto;
}

.btmTab .nav-pills {
  gap: 3rem;
}

.btmTab .nav-pills .nav-link {
  background-color: #ffffff;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 5px;
}

.btmTab .nav-pills .nav-link.active {
  background-color: #e8f1ff;
}

.chatlinkmainPge .section-main {
  position: fixed;
}
</style>
