<script setup>
import map from "./Icons/map.png";
import Phone from "./Icons/Phone.png";
import Email from "./Icons/Email.png";
import { ref } from "vue";
import { watch } from "vue";
import axios from "axios";
import { showErrorToast } from "../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const props = defineProps(["shopId"]);
const shopData = ref({});

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

const featchData = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/shop/getShopRegister/${id}`,
      config
    );
    shopData.value = response.data.data;
  } catch (error) {
    handleError(error);
  }
};

const handleClick = (e) => {
  if (e.target.checked) {
    console.log("Checked");
  }
};

watch(props, async () => {
  isLoading.value = true;
  await featchData(props.shopId);
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
  <div class="px-5" :style="{ backgroundColor: '#EFEFEF' }">
    <div class="chatlinkHeadAX py-5">
      <div class="chatCustate">
        <h6>Customer Rating</h6>
        <div>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
      </div>
      <div class="chatBodyDetials">
        <ul class="list-unstyle">
          <li>{{ shopData.shopName }}</li>
          <li>
            {{ shopData.address }}, {{ shopData.city }}, {{ shopData.state }},
            {{ shopData.zipCode }}
          </li>
          <li>{{ shopData.phone1 }}</li>
          <li>{{ !shopData.email ? "email" : shopData.email }}</li>
          <li>{{ shopData.phone2 }}</li>
        </ul>
        <div class="linkChats">
          <span>
            <a href="#">
              <img :src="map" alt="map" :style="{ width: '30px' }" />
            </a>
          </span>
          <span>
            <a href="#">
              <img :src="Phone" alt="Phone" :style="{ width: '30px' }" />
            </a>
          </span>
          <span>
            <a href="#">
              <img :src="Email" alt="Email" :style="{ width: '25px' }" />
            </a>
          </span>
        </div>
      </div>
      <div class="chatMass d-flex align-items-center flex-column">
        <div class="form-check form-switch mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="mySwitch"
            name="darkmode"
            value="yes"
            :style="{ fontSize: '25px' }"
            @click="handleClick"
          />
        </div>
        <p>
          Massage Opt-In <br />
          Message Opt-Out
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.chatlinkHeadAX {
  display: flex;
  justify-content: space-between;
}

.chatBodyDetials {
  background-color: #ffffff;
  border-radius: 9.5px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  min-width: 600px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.chatBodyDetials ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chatBodyDetials ul li {
  margin-bottom: 0.8rem;
}

.linkChats {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
