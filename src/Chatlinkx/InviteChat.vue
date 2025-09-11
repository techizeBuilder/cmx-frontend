<script setup>
import Chatlink from "./Icons/Chatlink.png";
import Completed from "./Icons/Completed.png";
import Estimate from "./Icons/Estimate.png";
import Repair from "./Icons/Repair.png";
import Survery from "./Icons/Survery.png";
import { ref } from "vue";
import axios from "axios";

const shopId = localStorage.getItem("shopId");
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const ChatlinkInviteData = ref([]);

const chatLinkInvite = ref([
  { name: "Chatlink Invite", src: Chatlink, key: "ChatLinkInvite" },
  { name: "Estimate Chat", src: Estimate, key: "EstimateChat" },
  { name: "Repair Chat", src: Repair, key: "RepairChat" },
  { name: "Completed Chat", src: Completed, key: "CompletedChat" },
  { name: "Survey Request", src: Survery, key: "SurveyRequest" },
]);

const chatLinkModel = ref({});
const handleChatLink = async (item) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/customerChatLink/get/chat/${shopId}/${item.key}`,
      config
    );
    chatLinkModel.value = item;
    ChatlinkInviteData.value = response.data.data.map((val, index) => ({
      ModalHead: `${item.name} ${index + 1}`,
      InputMsg: `${val.title}`,
      MsgDisc: `${val.data}`,
    }));
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["chatLinkData"]);
const handleSelect = (item) => {
  document.getElementById("chatLinkClose").click();
  emit("chatLinkData", item);
};
</script>
<template>
  <div class="d-flex flex-column gap-3 mt-4" v-for="item in chatLinkInvite">
    <div
      class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer"
      data-bs-toggle="modal"
      data-bs-target="#ChatlinkInviteZ"
      @click="handleChatLink(item)"
    >
      <div class="d-flex gap-3 align-items-center">
        <img
          class="img-fluid chatimgx"
          :src="item.src"
          alt="Chatlink"
          :style="{ width: '25px' }"
        />
        <span class="text-underline">{{ item.name }}</span>
      </div>
      <i class="fa-solid fa-angle-down"></i>
    </div>
  </div>

  <div class="modal" id="ChatlinkInviteZ">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">
        <!-- Modal Header -->
        <div class="modal-header chatHeBox border-0">
          <h6 class="m-0">{{ chatLinkModel.name }}</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            id="chatLinkClose"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div
              class="col-sm-12 mb-4"
              v-for="(Items, Index) in ChatlinkInviteData"
              :key="Index"
            >
              <div class="card mx-auto" :style="{ maxWidth: '500px' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">{{ Items.ModalHead }}</h6>
                    <p class="m-0" :style="{ color: '#636363' }">
                      {{ Items.Default }}
                    </p>
                  </div>
                  <p class="border p-2 rounded border-dark">
                    {{ Items.InputMsg }}
                  </p>
                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #78707D' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        {{ Items.MsgDisc }}
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
                      @click="handleSelect(Items.MsgDisc)"
                      type="button"
                      class="btn btn-light"
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
</template>
