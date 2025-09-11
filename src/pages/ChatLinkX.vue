<template>
  <v-row>
    <page-header title="Chat Link" />

    <v-col cols="12">
      <custom-expansion-panel
        v-model="activePanel"
        :panels="[
          {
            title: 'CHAT LINK',
            icon: 'ChatIcon.svg',
          },
        ]"
      >
        <template #content-0>
          <v-container fluid>
            <v-row justify="center">
              <v-col cols="3">
                <custom-field
                  id="search"
                  label="Chat Link"
                  clearable
                  placeholder="Search..."
                  append-inner-icon="mdi-magnify"
                >
                  <template #append>
                    <custom-btn
                      id="plus-btn"
                      icon
                      variant="flat"
                      color="primary"
                      size="small"
                      rounded="lg"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </custom-btn>
                  </template>
                </custom-field>

                <v-expansion-panels
                  :model-value="[0]"
                  class="mt-8"
                >
                  <messages-list
                    title="New Messages"
                    bg-color="#e6f0ff"
                    :messages="newMessages"
                    @handleMessageClick="handleSelectChat"
                  />
                  <messages-list
                    title="Prior Messages"
                    :messages="priorMessages"
                    @handleMessageClick="handleSelectChat"
                  />
                </v-expansion-panels>
              </v-col>

              <chat-box
                v-model:chat-input="chatInputField"
                :is-loading="isChatDetailsLoading"
                :chat-details="selectedChatDetails"
                :user-details="userDetails"
              />

              <chat-details
                :user-details="userDetails"
                @chatSelected="onChatSelected"
              />
            </v-row>
          </v-container>
        </template>
      </custom-expansion-panel>
    </v-col>

    <scroll-to-top />
  </v-row>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import MessagesList from '@/components/ChatLinkX/MessagesList.vue';
import ChatDetails from '@/components/ChatLinkX/ChatDetails.vue';
import ChatBox from '@/components/ChatLinkX/ChatBox.vue';
import { showErrorToast } from '@/toster';
import { ref } from 'vue';
import { io } from 'socket.io-client';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import moment from 'moment';
import { computed } from 'vue';

const store = useStore();
const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);
const activePanel = ref([0]);
const selectedChatDetails = ref([]);
const userDetails = ref({});
const estimateToken = ref(null);
const newMessages = ref([]);
const priorMessages = ref([]);
const chatInputField = ref(null);
const isChatDetailsLoading = ref(false);

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log('An error occurred while fetching data', error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push('/login');
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error('An error occurred while fetching data', error);
  } else {
    showErrorToast('Some Error Occurred!!!!');
    console.error(
      'An error occurred while fetching data. Response was not available.',
      error
    );
  }
};
const fetchChatDetails = async () => {
  isChatDetailsLoading.value = true;
  const response = await store.dispatch(
    'fetchEstimateChatLink',
    estimateToken.value
  );

  if (!response.data) {
    handleError(response);
    return;
  }
  selectedChatDetails.value = response.data;
  userDetails.value = response.customerData;
  isChatDetailsLoading.value = false;
  
  socket.emit('shopMessage', {
    recieverId: userDetails.value.estimateToken,
  });
};
const seenMessage = async () => {
  const response = await store.dispatch(
    'updateSeenChatMessage',
    estimateToken.value
  );
  if (response.broadCast) {
    socket.emit('shopMessage', {
      recieverId: estimateToken.value,
    });
  }
};
const fetchNewMessages = async () => {
  const { data } = await store.dispatch('fetchNewMessages');
  if (!data) {
    return;
  }
  newMessages.value = data;
};
const fetchAllCustomersChat = async () => {
  const response = await store.dispatch('fetchAllCustomersChat');
  if (!response.data) {
    return;
  }
  priorMessages.value = response.data;
};
const onChatSelected = (item) => {
  chatInputField.value = item.messageDescription;
};
async function handleSelectChat(token) {
  estimateToken.value = token;
  socket.off('customerMessage');
  socket.emit('shopDisconnect');
  socket.emit('shopConnect', token);
  socket.on('customerMessage', async (data) => {
    await fetchChatDetails();
    await seenMessage();
  });
  await fetchChatDetails();
  await seenMessage();
  await fetchNewMessages();
}

onMounted(async () => {
  await fetchAllCustomersChat();
  socket.on('connect', () => {
    console.log(socket.id);
  });
  await fetchNewMessages();
  socket.on('customerMessage', async (data) => {
    if (estimateToken.value !== data.estimateToken) {
      seenMessage(estimateToken.value);
    } else {
      handleSelectChat();
    }
  });
});
</script>

<style lang="scss">
.chat-details {
  a {
    text-decoration: underline !important;
    font-weight: 500 !important;
  }
}

.chat-shortcut {
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
