<script setup>
import CMXCustomer from "./chatIcons/CMXCustomer.png";
import CMXSHOP from "./chatIcons/CMXSHOP.png";
import { useStore } from "vuex";
import axios from "axios";
import { watch, computed, ref, onUpdated } from "vue";
import { io } from "socket.io-client";
import { showErrorToast } from "../../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const shopData = JSON.parse(localStorage.getItem("shopData"));
const store = useStore();
const socket = io(apiUrl, {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const AuthToken = localStorage.getItem("AuthToken");
const chatData = ref([]);
const customerData = ref(null);
const messageData = ref("");

const formatTime = (dateTimeString) => {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

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

const seenMessage = async (item) => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateChatLink/Update/Seen/${item}/Customer`
    );
    if (response.data.broadCast) {
      socket.emit("shopMessage", {
        recieverId: storeEstimateDetails.value.customerId._id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const data = {
      role: "Admin",
      message: messageData.value,
      estimateToken: storeEstimateDetails.value?.estimateToken,
    };
    const response = await axios.post(
      `${apiUrl}/estimateChatLink/register`,
      data,
      config
    );
    socket.emit("shopMessage", response.data.data);
  } catch (error) {
    handleError(error);
  }
};

const fetchData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateChatLink/getChatLink/${storeEstimateDetails.value?.estimateToken}`,
      config
    );
    chatData.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (dateTimeString) => {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const isSameDate =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const isWithinLastSevenDays = date >= sevenDaysAgo && date < today;

  if (isSameDate) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  } else if (isWithinLastSevenDays) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  } else {
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

const messageEdit = ref(true);
const handleSendMessage = async () => {
  if (messageData.value.trim() !== "" && !messageEdit.value) {
    messageEdit.value = true;
    await sendMessage();
    await seenMessage(storeEstimateDetails.value.estimateToken);
    await fetchData();
    messageData.value = "";
  }
};

const shopId = ref();
watch(
  storeEstimateDetails,
  () => {
    shopId.value = storeEstimateDetails.value?.shopId;
  },
  { immediate: true }
);

watch(shopId, async () => {
  try {
    await fetchData();
    socket.emit("shopConnect", shopId.value);
    socket.on("customerMessage", async (data) => {
      await fetchData();
      await seenMessage(storeEstimateDetails.value.estimateToken);
    });
  } catch (error) {
    console.log(error);
  }
});

onUpdated(() => {
  const chatWindow = document.getElementById("scrollEst");
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

function formatPhoneNumber(phone) {
  if (phone) {
    const cleaned = phone.replace(/\D+/g, "");
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
}

const commentRows = ref(1);
const updateRows = () => {
  const words = messageData.value.trim().split(/\s+/);
  const wordsPerLine = 11;
  const lines = Math.ceil(words.length / wordsPerLine);
  commentRows.value = lines;
};

watch(messageData, () => {
  updateRows();
});

defineExpose({ messageData, messageEdit });
</script>
<template>
  <div class="message-area">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="chat-area">
            <!-- chatbox -->
            <div class="chatbox">
              <div class="modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-body" id="scrollEst">
                    <div class="msg-body">
                      <div
                        class="top-Txt d-flex flex-column justify-content-start align-items-start"
                        v-if="customerData && customerData.length > 0"
                      >
                        <h6>
                          {{ customerData?.lastName }}
                          {{ customerData?.firstName }}
                        </h6>
                        <h6>{{ formatPhoneNumber(customerData?.phone) }}</h6>
                        <h6>{{ customerData?.email }}</h6>
                      </div>
                      <ul class="ps-0 pe-2 pb-2">
                        <template v-if="chatData.length !== 0">
                          <template
                            v-for="(Item, index) in chatData"
                            :key="Item._id"
                          >
                            <li
                              v-if="
                                index === 0 ||
                                formatDate(Item.SendAt) !==
                                  formatDate(chatData[index - 1].SendAt)
                              "
                              class="divider"
                            >
                              <h6>{{ formatDate(Item.SendAt) }}</h6>
                            </li>
                            <li
                              :class="
                                Item.role === 'Admin'
                                  ? 'sender shopUser gap-3'
                                  : 'repaly custome gap-3 w-75'
                              "
                            >
                              <div
                                :class="
                                  Item.role === 'Admin'
                                    ? 'w-75 shopUserBox'
                                    : 'repaly custome w-75 gap-3'
                                "
                              >
                                <div v-if="Item.role === 'Admin'">
                                  <div
                                    class="d-flex align-items-center justify-content-between"
                                  >
                                    <span>
                                      <svg
                                        class="svg-icon"
                                        :style="{
                                          width: '1.5em',
                                          height: '1.5em',
                                          verticalAlign: 'middle',
                                          fill: Item.messageSeen
                                            ? 'green'
                                            : 'grey',
                                          overflow: 'hidden',
                                        }"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M495.018667 587.093333l60.245333 60.245334 361.216-361.216 60.330667 60.330666-421.546667 421.546667-271.530667-271.530667 60.330667-60.330666 90.666667 90.666666 60.288 60.245334z m0.085333-120.661333l211.285333-211.328 60.16 60.16-211.285333 211.328-60.16-60.16z m-120.618667 241.28L314.197333 768 42.666667 496.469333l60.330666-60.330666 60.288 60.288-0.042666 0.042666 211.242666 211.242667z"
                                        />
                                      </svg>
                                    </span>
                                    <span
                                      class="d-flex gap-2 align-items-center"
                                    >
                                      <p class="shopUserp m-0 fw-bold">
                                        {{ shopData?.shopName?.toUpperCase() }}
                                      </p>
                                      <img
                                        :src="CMXSHOP"
                                        alt="CMXSHOP"
                                        :style="{ width: '25px' }"
                                      />
                                    </span>
                                  </div>
                                  <div class="d-flex flex-column mt-3">
                                    <p class="mb-3 ps-4 text-justify">
                                      {{ Item.message }}
                                    </p>
                                    <span class="time">{{
                                      formatTime(Item.SendAt)
                                    }}</span>
                                  </div>
                                </div>
                                <div v-else>
                                  <div class="d-flex gap-2 align-items-center">
                                    <img
                                      :src="CMXCustomer"
                                      alt="CMXCustomer"
                                      :style="{ width: '25px' }"
                                    />
                                    <p class="customep m-0 fw-bold">
                                      {{
                                        storeEstimateDetails?.customerId?.firstName?.toUpperCase()
                                      }}
                                    </p>
                                  </div>
                                  <div class="d-flex flex-column">
                                    <p class="mb-3 ps-4 ms-2">
                                      {{ Item.message }}
                                    </p>
                                    <span class="time">{{
                                      formatTime(Item.SendAt)
                                    }}</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </template>
                        </template>
                        <template v-else>
                          <div
                            style="
                              height: 330px;
                              text-align: center;
                              font-style: italic;
                            "
                          >
                            No Message is send Yet
                          </div>
                        </template>
                      </ul>
                    </div>
                  </div>

                  <div class="send-box">
                    <form action="">
                      <a href="javascript:void(0)" class="appA"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewbox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8 16C3.58862 16 0 12.4114 0 8C0 3.58862 3.58862 0 8 0C12.4114 0 16 3.58862 16 8C16 12.4114 12.4114 16 8 16ZM8 1C4.14001 1 1 4.14001 1 8C1 11.86 4.14001 15 8 15C11.86 15 15 11.86 15 8C15 4.14001 11.86 1 8 1Z"
                            fill="#7D7D7D"
                          />
                          <path
                            d="M11.5 8.5H4.5C4.224 8.5 4 8.276 4 8C4 7.724 4.224 7.5 4.5 7.5H11.5C11.776 7.5 12 7.724 12 8C12 8.276 11.776 8.5 11.5 8.5Z"
                            fill="#7D7D7D"
                          />
                          <path
                            d="M8 12C7.724 12 7.5 11.776 7.5 11.5V4.5C7.5 4.224 7.724 4 8 4C8.276 4 8.5 4.224 8.5 4.5V11.5C8.5 11.776 8.276 12 8 12Z"
                            fill="#7D7D7D"
                          />
                        </svg>
                      </a>
                      <textarea
                        class="form-control"
                        :rows="commentRows"
                        name="estimateChatInputChatK"
                        aria-label="message…"
                        placeholder="CMX Chatlink…"
                        v-model="messageData"
                        @input="
                          () =>
                            messageData.trim() !== ''
                              ? (messageEdit = false)
                              : (messageEdit = true)
                        "
                        @keydown.enter.prevent="handleSendMessage"
                      ></textarea>
                      <button
                        class="btn btn-light p-1"
                        :disabled="messageEdit"
                        @click="handleSendMessage"
                        style="background-color: #6bfa65;"
                      >
                        <i
                          class="fa fa-paper-plane chatFs"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- chatbox -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* *******************************
message-area
******************************** */

.message-area {
  height: 100vh;

  width: 100%;
}

.chat-area {
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 0.3rem;
  height: 100%;
  min-height: calc(100% - 1rem);
  max-height: 100vh;
}

.chat-area .modal-content {
  border: none;
  border-radius: 0;
  outline: 0;
  height: 100%;
}

.chat-area .modal-dialog-scrollable {
  height: 100% !important;
}

.chatbox {
  width: auto;
  height: 100%;
}

.msg-body ul {
  overflow: hidden;
}

.msg-body ul li {
  list-style: none;
  margin: 15px 0;
}

.msg-body ul li.sender {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: flex-end;
}

.msg-body ul li.sender .shopUserBox {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 0;
  padding: 15px;
  background: rgba(173, 205, 255, 0.2);
}

/* .msg-body ul li.sender .shopUserBox:before {
    display: block;
    clear: both;
    content: '';
    position: absolute;
    top: -6px;
    left: -7px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12px 15px 12px;
    border-color: transparent transparent #f5f5f5 transparent;
    -webkit-transform: rotate(-37deg);
    -ms-transform: rotate(-37deg);
    transform: rotate(-37deg);
} */

.msg-body ul li.sender p,
.msg-body ul li.repaly.custome p {
  color: #000;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  display: inline-block;
  text-align: justify;
}

.msg-body ul li.repaly.custome {
  display: flex;
  width: 100%;
  position: relative;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 0;
  padding: 15px;
  background: #ccdff1;
}

/* .msg-body ul li.repaly:before {
    display: block;
    clear: both;
    content: '';
    position: absolute;
    top: -6px;
    left: -7px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12px 15px 12px;
    border-color: transparent transparent #ccdff1 transparent;
    -webkit-transform: rotate(-37deg);
    -ms-transform: rotate(-37deg);
    transform: rotate(-37deg);
} */

.shopUser .time,
.msg-body ul li.repaly .time {
  position: absolute;
  right: 9px;
  bottom: 1px;
  color: #7d8592;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
}

.divider {
  position: relative;
  z-index: 1;
  text-align: center;
}

.msg-body h6 {
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.5;
  color: #222;
  background: #fff;
  display: inline-block;
  padding: 0 5px;
  margin-bottom: 0;
}

.divider:after {
  display: block;
  content: "";
  clear: both;
  position: absolute;
  top: 12px;
  left: 0;
  border-top: 1px solid #ebebeb;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.send-box {
  padding: 15px;
  border-top: 1px solid #ccc;
}

.send-box form {
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 15px;
}

a.appA {
  border: 1px solid #eee;
  padding: 10px;
  cursor: pointer;
}

input.charCmxz {
  width: 100%;
  padding: 10px;
  border: 1px solid #eee;
}

input.charCmxz:focus {
  box-shadow: none;
  outline: none;
}

i.fa.fa-paper-plane.chatFs {
  padding: 14px;
  border: 1px solid #eee;
  border-left: none;
  cursor: pointer;
}

@media (max-width: 767px) {
  .chatbox {
    width: 100%;
    position: absolute;
    left: 1000px;
    right: 0;
    background: #fff;
    transition: all 0.5s ease;
    border-left: none;
  }

  .send-box button {
    width: 28%;
  }

  .send-box .form-control {
    width: 70%;
  }

  .msg-body ul li.sender p {
    font-size: 13px;
    padding: 8px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .msg-body ul li.repaly p {
    font-size: 13px;
    padding: 8px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
}
</style>
