<script setup>
import CMXCustomer from "./chatIcons/CMXCustomer.png";
import CMXSHOP from "./chatIcons/CMXSHOP.png";
import { useStore } from "vuex";
import axios from "axios";
import { watch, computed, ref, onUpdated } from "vue";
import { io } from "socket.io-client";
import { showErrorToast, showSuccessToast } from "../../toster";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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
        recieverId: storeEstimateDetails.value.estimateToken,
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
    socket.emit("shopMessage", {
      recieverId: storeEstimateDetails.value.estimateToken,
    });
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
  return date.toLocaleDateString("en-US");
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
    await seenMessage(storeEstimateDetails.value.estimateToken);
    socket.emit("shopConnect", storeEstimateDetails.value?.estimateToken);
    socket.on("customerMessage", async (data) => {
      await fetchData();
      await seenMessage(storeEstimateDetails.value.estimateToken);
    });
  } catch (error) {
    console.log(error);
  }
});

// onUpdated(() => {
//   const chatWindow = document.getElementById("scrollEst");
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// });

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

const extractName = (photoName) => {
  const lastUnderscoreIndex = photoName.lastIndexOf("_");
  const lastPeriodIndex = photoName.lastIndexOf(".");
  return photoName.substring(lastUnderscoreIndex + 1, lastPeriodIndex);
};

const chatLinkFile = ref();

const handleFileUpload = async () => {
  const files = chatLinkFile.value.files;
  try {
    const formData = new FormData();
    let imageIDs = [];

    for (let i = 0; i < files.length; i++) {
      let nameImage = extractName(files[i].name);
      let randomComponent = Math.floor(Math.random() * 1000);
      let timestamp = new Date().valueOf();
      let imageID = `${timestamp}_${randomComponent}_${nameImage}_${Math.floor(
        Math.random() * 1000
      )}`;
      formData.append("extraPhotes", files[i]);
      imageIDs.push(imageID);
    }

    formData.append("imageID", JSON.stringify(imageIDs));
    formData.append("role", "Admin");
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateChatLink/doc/upload/${storeEstimateDetails.value._id}`,
      formData,
      config
    );
    if (response.data.success) {
      socket.emit("shopMessage", {
        recieverId: storeEstimateDetails.value.estimateToken,
      });
      await fetchData();
      await seenMessage(storeEstimateDetails.value.estimateToken);
    }
    // showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

const handleFilesShow = () => {
  const files = chatLinkFile.value.files;
  let fancyboxImages = Array.from(files).map((file) => {
    let type = "";
    if (file.type === "application/pdf") {
      type = "pdf";
    } else if (file.type.startsWith("image/")) {
      type = "image";
    } else {
      type = "other"; // or any other type you want to handle
    }
    return {
      src: URL.createObjectURL(file),
      type,
    };
  });

  Fancybox.show(fancyboxImages, {
    startIndex: 0,
    Toolbar: {
      enabled: true,
      items: {
        uploadButton: {
          tpl: `<button 
                 class="f-button bg-success" 
                 style="position: absolute;
                 z-index: 10;
                 margin-right: 50px;">
                 <i class="fa-solid fa-paper-plane"></i></button>`,
          click: async () => {
            await handleFileUpload();
            Fancybox.close();
          },
        },
      },
      display: {
        left: ["infobar"],
        middle: [],
        right: ["uploadButton", "close"],
      },
    },
    on: {
      close: () => {
        chatLinkFile.value.value = "";
        chatLinkFile.value.files = null;
      },
    },
  });
};

const handleChatLinkFile = (cond, src) => {
  if (cond) {
    let fancyboxImages = [{ src: src }];
    Fancybox.show(fancyboxImages, { startIndex: 0 });
  }
};

const handleDocOpen = (cond, src) => {
  if (cond) {
    window.open(src, "_blank");
  }
};

function selectFiles(accept) {
  chatLinkFile.value.accept = accept;
  chatLinkFile.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

function bytesToKB(bytes, decimalPlaces = 2) {
  return parseFloat((bytes / 1024).toFixed(decimalPlaces));
}
function fileType(mimeType) {
  const mimeMap = {
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/vnd.oasis.opendocument.text": "odt",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "pptx",
    "application/vnd.ms-powerpoint": "ppt",
    "text/plain": "txt",
    "application/rtf": "rtf",
    "application/vnd.wordperfect": "wpd",
    "application/x-gzip": "gz",
    "application/x-tar": "tar",
    "application/zip": "zip",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/x-ms-wmv": "wmv",
    // Add more MIME types as needed
  };
  return mimeMap[mimeType];
}
function handleChatLinkFileDownload(src, fileName) {
  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "default_filename.pdf";
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      showErrorToast("Some Error Occurred while downloading Document!!!");
      console.error("Error downloading Document:", error);
    });
}

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
                      >
                        <h6>
                          {{ customerData?.lastName }}
                          {{ customerData?.firstName }}
                        </h6>
                        <h6>{{ customerData?.phone }}</h6>
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
                                    <p
                                      v-if="Item?.messageType === 'Text'"
                                      class="mb-3 ps-4 text-justify"
                                    >
                                      {{ Item?.message }}
                                    </p>
                                    <div
                                      v-else-if="Item?.messageType === 'Image'"
                                    >
                                      <img
                                        :src="Item?.file?.src"
                                        class="p-2"
                                        style="width: 150px; height: 150px;"
                                        :class="{ blur: !Item.file.downloaded }"
                                        @click="
                                          handleChatLinkFile(
                                            Item.file.downloaded,
                                            Item?.file?.src
                                          )
                                        "
                                        type="button"
                                      />
                                      <div
                                        class="d-flex justify-content-between ps-2"
                                      >
                                        <span class="file-name fw-bold">{{
                                          Item?.file?.fileName
                                        }}</span>
                                        <div
                                          @click="
                                            () => {
                                              Item.file.downloaded = true;
                                              handleChatLinkFileDownload(
                                                Item?.file?.src,
                                                Item?.file?.fileName
                                              );
                                            }
                                          "
                                          class="download-icon text-primary pe-2"
                                        >
                                          <i class="fa-solid fa-download"></i>
                                        </div>
                                      </div>
                                      <div
                                        class="file-details small text-muted"
                                      >
                                        <span class="file-size me-1 ps-2">{{
                                          `${bytesToKB(
                                            Item?.file?.fileSize,
                                            2
                                          )} kB`
                                        }}</span>
                                      </div>
                                    </div>
                                    <div v-else>
                                      <div
                                        class="file-item d-flex justify-content-between align-items-center p-2 rounded bg-light border"
                                      >
                                        <div
                                          @click="
                                            handleDocOpen(
                                              Item.file.downloaded,
                                              Item?.file?.src
                                            )
                                          "
                                          type="button"
                                        >
                                          <i
                                            class="fa-regular fa-file file-icon me-2"
                                          ></i>
                                          <span class="file-name fw-bold">{{
                                            Item?.file?.fileName
                                          }}</span>
                                          <div
                                            class="file-details ps-4 small text-muted"
                                          >
                                            <span class="file-size me-1">{{
                                              `${bytesToKB(
                                                Item?.file?.fileSize,
                                                2
                                              )} kB`
                                            }}</span>
                                            <span class="file-type">{{
                                              fileType(Item?.file?.fileType)
                                            }}</span>
                                          </div>
                                        </div>
                                        <div
                                          @click="
                                            () => {
                                              Item.file.downloaded = true;
                                              handleChatLinkFileDownload(
                                                Item?.file?.src,
                                                Item?.file?.fileName
                                              );
                                            }
                                          "
                                          class="download-icon text-primary"
                                        >
                                          <i class="fa-solid fa-download"></i>
                                        </div>
                                      </div>
                                    </div>
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
                                  <div class="d-flex flex-column mt-3">
                                    <p
                                      v-if="Item?.messageType === 'Text'"
                                      class="mb-3 ps-4 text-justify"
                                    >
                                      {{ Item?.message }}
                                    </p>
                                    <div
                                      v-else-if="Item?.messageType === 'Image'"
                                    >
                                      <img
                                        :src="Item?.file?.src"
                                        class="p-2"
                                        style="width: 150px; height: 150px;"
                                        :class="{ blur: !Item.file.downloaded }"
                                        @click="
                                          handleChatLinkFile(
                                            Item.file.downloaded,
                                            Item?.file?.src
                                          )
                                        "
                                        type="button"
                                      />
                                      <div
                                        class="d-flex justify-content-between ps-2"
                                      >
                                        <span class="file-name fw-bold">{{
                                          Item?.file?.fileName
                                        }}</span>
                                        <div
                                          @click="
                                            () => {
                                              Item.file.downloaded = true;
                                              handleChatLinkFileDownload(
                                                Item?.file?.src,
                                                Item?.file?.fileName
                                              );
                                            }
                                          "
                                          class="download-icon text-primary pe-2"
                                        >
                                          <i class="fa-solid fa-download"></i>
                                        </div>
                                      </div>
                                      <div
                                        class="file-details small text-muted"
                                      >
                                        <span class="file-size me-1 ps-2">{{
                                          `${bytesToKB(
                                            Item?.file?.fileSize,
                                            2
                                          )} kB`
                                        }}</span>
                                      </div>
                                    </div>
                                    <div v-else>
                                      <div
                                        class="file-item d-flex justify-content-between align-items-center p-2 rounded bg-light border"
                                      >
                                        <div
                                          @click="
                                            handleDocOpen(
                                              Item.file.downloaded,
                                              Item?.file?.src
                                            )
                                          "
                                          type="button"
                                        >
                                          <i
                                            class="fa-regular fa-file file-icon me-2"
                                          ></i>
                                          <span class="file-name fw-bold">{{
                                            Item?.file?.fileName
                                          }}</span>
                                          <div
                                            class="file-details ps-4 small text-muted"
                                          >
                                            <span class="file-size me-1">{{
                                              `${bytesToKB(
                                                Item?.file?.fileSize,
                                                2
                                              )} kB`
                                            }}</span>
                                            <span class="file-type">{{
                                              fileType(Item?.file?.fileType)
                                            }}</span>
                                          </div>
                                        </div>
                                        <div
                                          @click="
                                            () => {
                                              Item.file.downloaded = true;
                                              handleChatLinkFileDownload(
                                                Item?.file?.src,
                                                Item?.file?.fileName
                                              );
                                            }
                                          "
                                          class="download-icon text-primary"
                                        >
                                          <i class="fa-solid fa-download"></i>
                                        </div>
                                      </div>
                                    </div>
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
                    <form action="" class="mychatgr">
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-toggle="dropdown"
                      >
                        <a
                          href="javascript:void(0)"
                          class="appA file"
                          type="button"
                        >
                          <input
                            @input="handleFilesShow"
                            ref="chatLinkFile"
                            type="file"
                            name="file"
                            multiple="true"
                          />

                          <svg
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
                      </button>
                      <ul class="dropdown-menu dropup">
                        <li
                          class="dropdown-item"
                          type="button"
                          @click="selectFiles('image/*')"
                        >
                          Images
                        </li>
                        <li
                          class="dropdown-item"
                          type="button"
                          @click="selectFiles('.doc, .docx, .pdf')"
                        >
                          Documents
                        </li>
                      </ul>

                      <textarea
                        class="form-control mytextre"
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
                        class="btn btn-light sendfrd"
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
  <div
    class="modal vdatepicktimedit"
    id="ShowFilesMoodel"
    tabindex="-1"
    aria-labelledby="ShowFilesMoodel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header" :style="{ background: '#D2D4D7' }">
          <div class="d-flex align-items-center gap-3">
            <h6 class="m-0">Quick Estimate Appointment</h6>
          </div>
          <button
            type="button"
            class="btn-close"
            id="closeShowFilesMoodel"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-5"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* *******************************
message-area
******************************** */

.blur {
  filter: blur(2px);
}

.file-icon {
  font-size: 1.5em;
}

.download-icon i {
  font-size: 1.5em;
  cursor: pointer;
}

.download-icon:hover i {
  color: #0056b3; /* Darker primary color for hover effect */
}

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
textarea.form-control.mytextre:focus {
  outline: none !important;
  box-shadow: none !important;
}
.sendfrd {
  padding: 8px;
}
a.appA {
  padding: 3px;
  cursor: pointer;
  border-radius: 0;
  margin-top: 4px;
}

input.charCmxz {
  width: 100%;
  padding: 10px;
}

input.charCmxz:focus {
  box-shadow: none;
  outline: none;
}
.mychatgr {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 5px;
}
.mytextre {
  border: none !important;
}
i.fa.fa-paper-plane.chatFs {
  padding: 10px;
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
