<template>
  <v-col cols="7">
    <div
      :style="{
        'min-height': '550px',
        'max-height': '550px',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
      }"
      ref="chatContainer"
    >
      <v-skeleton-loader
        v-if="isLoading"
        class="chat-loader"
        type="paragraph, paragraph, paragraph, paragraph"
      />
      <p
        v-else-if="!chatDetails.length"
        class="font-italic text-error font-weight-600 text-center"
      >
        No Message is send Yet
      </p>

      <v-row v-else>
        <v-col
          v-for="(chat, index) in chatDetails"
          :key="chat._id"
          cols="12"
        >
          <v-row
            class="mx-2"
            :justify="chat.role === 'Admin' ? 'end' : 'start'"
          >
            <v-col
              v-if="
                index === 0 ||
                formatDate(chat.SendAt) !==
                  formatDate(chatDetails[index - 1].SendAt)
              "
              cols="12"
              class="d-flex align-center w-100"
            >
              <v-divider />
              <h6 class="mb-0 mx-2">{{ formatDate(chat.SendAt) }}</h6>
              <v-divider />
            </v-col>

            <v-col
              cols="9"
              class="mb-4"
              :class="{
                'sender-chat': chat.role === 'Admin',
                'incoming-chat': chat.role !== 'Admin',
              }"
            >
              <div>
                <div
                  class="d-flex"
                  :class="{
                    'justify-space-between': chat.role === 'Admin',
                  }"
                >
                  <span>
                    <svg
                      v-if="chat.role === 'Admin'"
                      :style="{
                        width: '1.5em',
                        height: '1.5em',
                        verticalAlign: 'middle',
                        fill: chat.messageSeen ? 'green' : 'grey',
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
                    <v-icon v-else>mdi-alpha-c-circle-outline</v-icon>
                  </span>
                  <div class="d-flex align-center">
                    <p class="mb-0 mr-4 font-weight-bold">
                      {{
                        chat.role === 'Admin'
                          ? userDetails?.shopId?.shopName?.toUpperCase()
                          : userDetails?.customerId?.firstName?.toUpperCase()
                      }}
                    </p>
                    <v-img
                      v-if="chat.role === 'Admin'"
                      :src="getImageUrl('icons/shopUserIcon.svg')"
                      alt="ShopUserIcon"
                      min-width="25"
                      max-width="25"
                    />
                  </div>
                </div>
                <div class="d-flex flex-column mt-3">
                  <p
                    v-if="chat.messageType === 'Text'"
                    class="mb-3 pl-4 text-justify"
                  >
                    {{ chat.message }}
                  </p>
                  <div v-else-if="chat.messageType === 'Image'">
                    <img
                      :src="chat.file.src"
                      class="pa-2"
                      style="width: 150px; height: 150px"
                      :class="{ blur: !chat.file.downloaded }"
                      @click="
                        handleChatLinkFile(
                          chat.file.downloaded,
                          chat?.file?.src
                        )
                      "
                    />
                    <div class="d-flex justify-content-between pl-2">
                      <span class="font-weight-bold">
                        {{ chat.file.fileName }}
                      </span>
                      <custom-btn
                        id="download-image-btn"
                        flat
                        variant="text"
                        icon
                        @click="
                          () => {
                            chat.file.downloaded = true;
                            handleChatLinkFileDownload(
                              chat?.file?.src,
                              chat?.file?.fileName
                            );
                          }
                        "
                      >
                        <v-icon color="blue">
                          <i
                            class="fa-solid fa-download"
                            style="font-size: 22px"
                          />
                        </v-icon>
                      </custom-btn>
                    </div>
                    <div class="">
                      <span class="">
                        {{
                          `${bytesToKB(chat?.file?.fileSize, 2)} kB`
                        }}
                      </span>
                    </div> 
                  </div>
                  <div v-else>
                    <div
                      class="w-100 d-flex justify-space-between rounded-md bg-white border-a px-2 py-3"
                    >
                      <a
                        href="#"
                        class="text-black d-flex"
                        @click="
                          () =>
                            handleDocOpen(
                              chat.file.downloaded,
                              chat?.file?.src
                            )
                        "
                      >
                        <v-icon
                          class="mr-2"
                          size="26"
                        >
                          mdi-file-outline
                        </v-icon>
                        <div>
                          <span
                            class="font-16 font-weight-bold text-start"
                          >
                            {{ chat.file.fileName }}
                          </span>
                          <div
                            class="text-grey-darken-1 text-lowercase"
                          >
                            <span class="mr-2">
                              {{
                                `${bytesToKB(
                                  chat?.file?.fileSize,
                                  2
                                )} kB`
                              }}
                            </span>
                            <span>
                              {{ fileType(chat.file.fileType) }}
                            </span>
                          </div>
                        </div>
                      </a>

                      <custom-btn
                        id="download-file-btn"
                        flat
                        variant="text"
                        icon
                        @click="
                          () => {
                            chat.file.downloaded = true;
                            handleChatLinkFileDownload(
                              chat?.file?.src,
                              chat?.file?.fileName
                            );
                          }
                        "
                      >
                        <v-icon color="blue">
                          <i
                            class="fa-solid fa-download"
                            style="font-size: 22px"
                          />
                        </v-icon>
                      </custom-btn>
                    </div>
                  </div>
                  <span class="text-end mt-2">
                    {{ formatTime(chat.SendAt) }}
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <v-divider class="w-100" />

    <custom-field
      v-model="input"
      id="cmx-chat"
      density="comfortable"
      placeholder="CMX Chatlink..."
    >
      <template #prepend>
        <custom-btn
          id="chat-add-file-btn"
          icon
          size="small"
          rounded="md"
          color="grey-lighten-3"
        >
          <v-icon color="grey-darken-1">
            mdi-plus-circle-outline
          </v-icon>
        </custom-btn>
      </template>
      <template #append>
        <custom-btn
          id="chat-send-btn"
          icon
          size="small"
          rounded="md"
          color="green"
        >
          <v-icon color="grey-darken-1"> mdi-send </v-icon>
        </custom-btn>
      </template>
    </custom-field>
  </v-col>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import { onMounted, ref, watch } from 'vue';
import { showErrorToast } from '@/toster';
import { computed } from 'vue';
import { getImageUrl } from '@/composables';

const emits = defineEmits(['update:chatInput']);
const props = defineProps({
  chatInput: {
    type: String,
    default: () => {},
  },
  chatDetails: {
    type: Array,
    default: () => {},
  },
  userDetails: {
    type: Object,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: () => false,
  },
});

const chatContainer = ref(null);

const input = computed({
  get() {
    return props.chatInput;
  },
  set(val) {
    emits('update:chatInput', val);
  },
});

const formatTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
const formatDate = (dateTimeString) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('en-US');
};
function bytesToKB(bytes, decimalPlaces = 2) {
  return parseFloat((bytes / 1024).toFixed(decimalPlaces));
}
function fileType(mimeType) {
  const mimeMap = {
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'docx',
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/vnd.oasis.opendocument.text': 'odt',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'xlsx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'pptx',
    'application/vnd.ms-powerpoint': 'ppt',
    'text/plain': 'txt',
    'application/rtf': 'rtf',
    'application/vnd.wordperfect': 'wpd',
    'application/x-gzip': 'gz',
    'application/x-tar': 'tar',
    'application/zip': 'zip',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'video/x-ms-wmv': 'wmv',
    // Add more MIME types as needed
  };
  return mimeMap[mimeType];
}

const handleFilesSend = async () => {
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
      formData.append('extraPhotes', files[i]);
      imageIDs.push(imageID);
    }

    formData.append('imageID', JSON.stringify(imageIDs));
    formData.append('role', 'Admin');
    const config = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(
      `${apiUrl}/estimateChatLink/doc/upload/${estimateIdRef.value}`,
      formData,
      config
    );
    if (response.data.success) {
      props.socket.emit('shopMessage', {
        recieverId: estimateToken.value,
      });
      await fetchData(estimateToken.value);
      await seenMessage(estimateToken.value);
    }
    // showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

const handleFilesShow = () => {
  const files = chatLinkFile.value.files;
  let fancyboxImages = Array.from(files).map((file) => {
    let type = '';
    if (file.type === 'application/pdf') {
      type = 'pdf';
    } else if (file.type.startsWith('image/')) {
      type = 'image';
    } else {
      type = 'other'; // or any other type you want to handle
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
            await handleFilesSend();
            Fancybox.close();
          },
        },
      },
      display: {
        left: ['infobar'],
        middle: [],
        right: ['uploadButton', 'close'],
      },
    },
    on: {
      close: () => {
        chatLinkFile.value.value = '';
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
    window.open(src, '_blank');
  }
};

function handleChatLinkFileDownload(src, fileName) {
  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'default_filename.pdf';
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      showErrorToast(
        'Some Error Occurred while downloading Document!!!'
      );
      console.error('Error downloading Document:', error);
    });
}

watch(props, () => {
  setTimeout(() => {
    if (props.chatDetails?.length) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight;
    }
  }, 500);
});

onMounted(() => {
  if (props.chatDetails?.length) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});
</script>

<style lang="scss">
.sender-chat {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ccdff133;
}

.incoming-chat {
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ccdff1;
}

.chat-loader {
  .v-skeleton-loader__bone {
    max-width: 70%;
    
    &:nth-of-type(even) {
      justify-content: end;
    }
  }
}
</style>
