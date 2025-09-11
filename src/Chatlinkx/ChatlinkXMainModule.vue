<script setup>
import scrollTopIcons from "../assets/scrollTopIcons.png";
import ChatDetialsRight from "./ChatDetialsRight.vue";
import ChatingBlock from "./ChatingBlock.vue";
import Newmsg from "./Newmsg.vue";
import Chatlink from "./Icons/Chatlink.png";
import { ref } from "vue";
import { onMounted } from "vue";
import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);
function scrollToTop() {
  window.scrollTo(0, 0);
}

const chatBot = ref(null);
const newMsg = ref(null);
const customerDetail = ref(null);

async function handleSelectChat(estimateToken) {
  socket.off("customerMessage");
  socket.emit("shopDisconnect");
  socket.emit("shopConnect", estimateToken);
  socket.on("customerMessage", async (data) => {
    await chatBot.value.fetchData(estimateToken);
    await chatBot.value.seenMessage(estimateToken);
  });
  await chatBot.value.fetchData(estimateToken);
  await chatBot.value.seenMessage(estimateToken);
  chatBot.value.estimateToken = estimateToken;
  await newMsg.value.unSeenMessage();
  chatBot.value.chatSelected = false;
}

async function handleUnseenmsg() {
  await newMsg.value.unSeenMessage();
}

async function handleNewMessage(estimateToken) {
  socket.off("customerMessage");
  socket.emit("shopDisconnect");
  socket.emit("shopConnect", estimateToken);
  socket.on("customerMessage", async (data) => {
    await chatBot.value.fetchData(estimateToken);
    await chatBot.value.seenMessage(estimateToken);
  });
  await chatBot.value.fetchData(estimateToken);
  await chatBot.value.seenMessage(estimateToken);
  chatBot.value.chatSelected = false;
  chatBot.value.estimateToken = estimateToken;
}

async function handleSeenMessage(estimateToken) {
  await chatBot.value.fetchData(estimateToken);
  await chatBot.value.seenMessage(estimateToken);
}

async function handleCustomerData(customerData) {
  await customerDetail.value.handleCustomer(customerData);
}

function handleChatLink(item) {
  chatBot.value.messageData = item;
  chatBot.value.messageEdit = false;
  document.querySelector('[name="estimateChatInput"]').focus();
}
</script>

<template>
  <div class="px-3">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">Chatlink</router-link>
      </div>
    </div>

    <div class="sectionaccomadation mt-5">
      <ul class="link-section">
        <li class="li-drop" id="CHATLINKX">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <div class="pages">
                <div
                  class="accordion-button collapsed folderXAccor"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapsecmxthree"
                  aria-expanded="false"
                >
                  <div class="accomdationset-head">
                    <img class="sidebar-icon" :src="Chatlink" alt="Chatlink" />
                    <h3>CHATLINK</h3>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapsecmxthree"
                class="accordion-collapse "
                data-bs-parent="#accordionFlushExample"
              >
                <div class="row">
                  <div class="col-lg-12 col-rowset">
                    <div class="d-flex justify-content-between pb-5 mt-4">
                      <Newmsg
                        ref="newMsg"
                        @selectChat="handleSelectChat"
                        @newMessage="handleNewMessage"
                        @seenMessage="handleSeenMessage"
                        :socket="socket"
                      />
                      <ChatingBlock
                        ref="chatBot"
                        @unseenMesg="handleUnseenmsg"
                        @customerData="handleCustomerData"
                        :socket="socket"
                      />
                      <ChatDetialsRight
                        @chatLinkData="handleChatLink"
                        ref="customerDetail"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="d-flex justify-content-end cursor-pointer mt-5"
        :style="{ marginRight: '20px' }"
        @click="scrollToTop"
      >
        <img
          :src="scrollTopIcons"
          alt="scrollTopIcons"
          class="img-fluid"
          :style="{ width: '24px' }"
        />
      </div>
    </div>
  </div>
</template>

<style>
.FolderXNavbar.sticky-top {
  top: 3.4rem;
  z-index: 99;
}
</style>
