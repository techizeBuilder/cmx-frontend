<script setup>
import chatInicons from "../../icons/chatInicons.png";
import EstiChatIcons from "../../icons/EstiChatIcons.png";
import RepairChatIcons from "../../icons/RepairChatIcons.png";
import CompletChatIcons from "../../icons/CompletChatIcons.png";
import SurveyIcons from "../../icons/SurveyIcons.png";

import FolChatlinkInvite from "./FolChatlinkInvite.vue";
import FloEstiChat from "./FloEstiChat.vue";
import FloRepairChat from "./FloRepairChat.vue";
import FloCompletChat from "./FloCompletChat.vue";
import FloSurvey from "./FloSurvey.vue";
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";
import { showErrorToast } from "../../../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const shopId = localStorage.getItem("shopId");
const AuthToken = localStorage.getItem("AuthToken");
const customerChatLinkData = ref({});

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

const featchData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/customerChatLink/list/${shopId}`,
      config
    );
    customerChatLinkData.value = gotData.data.data;
  } catch (error) {
    handleError(error);
  }
};

onMounted(async () => {
  await featchData();
});
const refreshData = async () => {
  await featchData();
};
</script>

<template>
  <div class="shoppage-section">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs m-0">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#FolChatlinkInvite"
          >
            <img class="sidebar-icon" :src="chatInicons" alt="chatInicons" />
            Chatlink Invite</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#FloEstiChat">
            <img
              class="sidebar-icon"
              :src="EstiChatIcons"
              alt="EstiChatIcons"
            />
            Estimate Chat</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#FloRepairChat">
            <img
              class="sidebar-icon"
              :src="RepairChatIcons"
              alt="RepairChatIcons"
            />
            Repair Chat</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#FloCompletChat">
            <img
              class="sidebar-icon"
              :src="CompletChatIcons"
              alt="CompletChatIcons"
            />
            Completed Chat</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#FloSurvey">
            <img class="sidebar-icon" :src="SurveyIcons" alt="SurveyIcons" />
            Survey Request</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first">
      <div class="tab-content">
        <div class="tab-pane show active " id="FolChatlinkInvite">
          <FolChatlinkInvite
            :customerChatLinkData="customerChatLinkData.ChatLinkInvite"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane show active" id="FloEstiChat">
          <FloEstiChat
            :customerChatLinkData="customerChatLinkData.EstimateChat"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane show active" id="FloRepairChat">
          <FloRepairChat
            :customerChatLinkData="customerChatLinkData.RepairChat"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane show active" id="FloCompletChat">
          <FloCompletChat
            :customerChatLinkData="customerChatLinkData.CompletedChat"
            @elementAdded="refreshData"
          />
        </div>
        <div class="tab-pane show active" id="FloSurvey">
          <FloSurvey
            :customerChatLinkData="customerChatLinkData.SurveyRequest"
            @elementAdded="refreshData"
          />
        </div>
      </div>
    </div>
  </div>
</template>
