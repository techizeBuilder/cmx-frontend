<script setup>
import Chatlink from "./chatIcons/Chatlink.png";
import Estimate from "./chatIcons/Estimate.png";
import Repair from "./chatIcons/Repair.png";
import Completed from "./chatIcons/Completed.png";
import Survery from "./chatIcons/Survery.png";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import axios from "axios";

const store = useStore();
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const ChatlinkInviteData = ref([]);
const typeTop = ref(null);

const handleChatLink = async (type) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    };
    const response = await axios.get(
      `${apiUrl}/customerChatLink/get/chat/${storeEstimateDetails.value?.shopId}/${type}`,
      config
    );
    typeTop.value = type;
    if (response.data.data.length !== 0) {
      var modal = new bootstrap.Modal(
        document.getElementById("CommentChatLinkModel")
      );
      modal.show();
      ChatlinkInviteData.value = response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const topChat = {
  ChatLinkInvite: "Chatlink Invite",
  EstimateChat: "Estimate Chat",
  RepairChat: "Repair Chat",
  CompletedChat: "Completed Chat",
  SurveyRequest: "Survey Request",
};

const emit = defineEmits(["SelectText"]);
const handleSelect = (text) => {
  emit("SelectText", text);
};
</script>
<template>
  <div class="d-flex flex-column gap-3 mt-4 w-75">
    <div class="d-flex flex-column gap-3 mt-4">
      <div
        class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer"
        @click="handleChatLink('ChatLinkInvite')"
      >
        <div class="d-flex gap-3 align-items-center">
          <img
            class="img-fluid chatimgx"
            :src="Chatlink"
            alt="Chatlink"
            :style="{ width: '25px' }"
          />
          <span class="text-underline">Chatlink Invite</span>
        </div>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer"
        @click="handleChatLink('EstimateChat')"
      >
        <div class="d-flex gap-3 align-items-center">
          <img
            class="img-fluid chatimgx"
            :src="Estimate"
            alt="Estimate"
            :style="{ width: '25px' }"
          />
          <span class="text-underline">Estimate Chat</span>
        </div>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        class="d-flex gap-3 mb-2 align-items-center cursor-pointer justify-content-between"
        @click="handleChatLink('RepairChat')"
      >
        <div class="d-flex gap-3 align-items-center">
          <img
            class="img-fluid chatimgx"
            :src="Repair"
            alt="Repair"
            :style="{ width: '25px' }"
          />
          <span class="text-underline">Repair Chat</span>
        </div>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        class="d-flex gap-3 mb-2 align-items-center cursor-pointer justify-content-between"
        @click="handleChatLink('CompletedChat')"
      >
        <div class="d-flex gap-3 align-items-center">
          <img
            class="img-fluid chatimgx"
            :src="Completed"
            alt="Completed"
            :style="{ width: '25px' }"
          />
          <span class="text-underline">Completed Chat</span>
        </div>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer"
        @click="handleChatLink('SurveyRequest')"
      >
        <div class="d-flex gap-3 align-items-center">
          <img
            class="img-fluid chatimgx"
            :src="Survery"
            alt="Survery"
            :style="{ width: '25px' }"
          />
          <span class="text-underline">Survey Request </span>
        </div>
        <i class="fa-solid fa-angle-down"></i>
      </div>
    </div>

    <div class="modal" id="CommentChatLinkModel">
      <div class="modal-dialog modal-dialog-centered modal-fullscreen">
        <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">
          <!-- Modal Header -->
          <div class="modal-header chatHeBox border-0">
            <h6 class="m-0">{{ topChat[typeTop] }}</h6>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body px-2">
            <div class="row g-3">
              <div
                class="col-sm-12 mb-4"
                v-for="(Items, Index) in ChatlinkInviteData"
                :key="Index"
              >
                <div class="card mx-auto" :style="{ maxWidth: '500px' }">
                  <div class="card-body py-5 px-4">
                    <div
                      class="d-flex mb-1 justify-content-between align-items-center"
                    >
                      <h6 class="m-0">{{ Items.type }}</h6>
                    </div>
                    <p class="border p-2 rounded border-dark">
                      {{ Items.title }}
                    </p>
                    <div
                      class="card MsgDiscard mt-3"
                      :style="{ border: '1px solid #78707D' }"
                    >
                      <div class="card-body border-dark">
                        <small>
                          {{ Items.data }}
                        </small>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between mt-3">
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        @click="handleSelect(Items.data)"
                        type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
