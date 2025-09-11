<script setup>
import { ref } from "vue";
import blue from "./Icons/blue.svg";
import Red from "./Icons/Red.svg";
import axios from "axios";
import { onMounted, watch } from "vue";
import moment from "moment";
import { computed } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;
const storeCustomerData = computed(() => store.getters.getCuatomerId);
const props = defineProps(["socket"]);
const shopId = localStorage.getItem("shopId");
let NewchatData = ref([
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
    ViewMsd: "16",
  },

  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
    ViewMsd: "9",
  },
]);
let chatData = ref([
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
    ViewMsd: "16",
  },
  {
    Img: Red,
    name: "Last Name, First",
    folderName: "Estimate ID",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
    ViewMsd: "16",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
  {
    Img: blue,
    name: "Last Name, First",
    folderName: "FolderX",
    Fid: "00000",
    Year: "Year, Make, Model",
    Date: "04/15/2024",
    Time: "11:22 Am",
  },
]);

const emit = defineEmits(["selectChat", "newMessage", "seenMessage"]);
const estimateTokenNow = ref("");
const handleNewMEssage = async (item) => {
  estimateTokenNow.value =
    allunReadMsg.value[item].estimateProfile.estimateToken;
  emit("selectChat", estimateTokenNow.value);
};

const unSeenMessage = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateChatLink/unseen/chat/${shopId}`
    );
    allunReadMsg.value = response.data.data;
    // NewchatData.value = allunReadMsg.value.map((item) => ({
    //   Img: blue,
    //   name: `${item.estimateProfile.lastName}, ${item.estimateProfile.firstName}`,
    //   folderName: item._id,
    //   Fid: "00000",
    //   Year: `${item.vehicalId.year}, ${item.vehicalId.make}, ${item.vehicalId.model}`,
    //   Date: moment(item.lastMessageDate).format("MM/DD/YYYY"),
    //   Time: moment(item.lastMessageDate).format("hh:mm A"),
    //   ViewMsd: item.UnSeenChat.toString(),
    // }));
  } catch (error) {
    console.log(error);
  }
};

const handleAllChat = (item) => {
  estimateTokenNow.value =
    getAllChatStatic.value[item].estimateProfile.estimateToken;
  emit("selectChat", estimateTokenNow.value);
};

const getAllChatStatic = ref([]);
const getAllChat = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/estimateChatLink/get/All/Customer/${shopId}`
    );
    getAllChatStatic.value = response.data.data;
    chatData.value = getAllChatStatic.value.map((item) => ({
      Img: blue,
      name: `${item.estimateProfile.lastName}, ${item.estimateProfile.firstName}`,
      folderName: "FolderX",
      Fid: "00000",
      Year: `${item.vehicalId.year}, ${item.vehicalId.make}, ${item.vehicalId.model}`,
      Date: `${moment(item.lastDate).format("MM/DD/YYYY")}`,
      Time: `${moment(item.lastDate).format("hh:mm A")}`,
    }));
  } catch (error) {
    console.log(error);
  }
};

const allunReadMsg = ref([]);
onMounted(async () => {
  await getAllChat();
  props.socket.on("connect", () => {
    console.log(props.socket.id);
  });
  await unSeenMessage();
  props.socket.on("customerMessage", async (data) => {
    if (estimateTokenNow.value !== data.estimateToken) {
      emit("seenMessage", estimateTokenNow.value);
    } else {
      emit("newMessage", data.estimateToken);
    }
  });
});

defineExpose({ unSeenMessage });
</script>
<template>
  <div class="mCardBlock">
    <div class="mb-5 d-flex w-75 m-auto gap-2 align-items-end">
      <div class="  ">
        <h6>chat link</h6>
        <div class="input-group">
          <input
            class="form-control border-end-0 border"
            type="search"
            value="search"
            id="example-search-input"
            placeholder="Quick Search"
          />
          <span class="input-group-append">
            <button
              class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
              type="button"
            >
              <i class="fa fa-search"> </i></button
          ></span>
        </div>
      </div>
      <div class="plusIconBlock">
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
    <div class="accordion accordion-flush" id="mewmsgacco">
      <div class="accordion-item p-0 border-0">
        <div
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapsenewmsgse"
          aria-expanded="true"
        >
          <div class="accomdationset-head">
            <h3>New Messages</h3>
          </div>
        </div>
        <div
          id="flush-collapsenewmsgse"
          class="accordion-collapse"
          data-bs-parent="#mewmsgacco"
        >
          <div class="row">
            <div class="col-lg-12 col-rowset mt-2">
              <div
                class="newMCard"
                v-for="(Item, index) in NewchatData"
                v-bind:key="index"
                @click="handleNewMEssage(index)"
              >
                <div class="d-flex">
                  <div class="Mcardli">
                    <img :src="Item.Img" alt="blue" />
                  </div>
                  <div class="d-flex justify-content-between w-100">
                    <div class="mCardhead">
                      <h6 class="m-0">{{ Item.name }}</h6>
                      <p class="mb-2">
                        {{ Item.folderName }}: <span>{{ Item.Fid }} </span>
                      </p>
                      <p class="m-0">{{ Item.Year }}</p>
                    </div>
                    <div class="mCardTime">
                      <p class="m-0">{{ Item.Date }}</p>
                      <p class="mb-2">{{ Item.Time }}</p>

                      <p class="m-0 ViewMsd">{{ Item.ViewMsd }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item p-0 border-0">
        <div
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapsePriormsg"
          aria-expanded="false"
        >
          <div class="accomdationset-head">
            <h3>Prior Messages</h3>
          </div>
        </div>
        <div
          id="flush-collapsePriormsg"
          class="accordion-collapse"
          data-bs-parent="#mewmsgacco"
        >
          <div class="row">
            <div class="col-lg-12 col-rowset mt-4">
              <div
                class="mCard"
                v-for="(Item, index) in chatData"
                v-bind:key="index"
                @click="handleAllChat(index)"
              >
                <div class="d-flex">
                  <div class="Mcardli">
                    <img :src="Item.Img" alt="blue" />
                  </div>
                  <div class="d-flex justify-content-between w-100">
                    <div class="mCardhead">
                      <h6 class="m-0">{{ Item.name }}</h6>
                      <p class="mb-2">
                        {{ Item.folderName }}: <span>{{ Item.Fid }} </span>
                      </p>
                      <p class="m-0">{{ Item.Year }}</p>
                    </div>
                    <div class="mCardTime">
                      <p class="m-0">{{ Item.Date }}</p>
                      <p class="mb-2">{{ Item.Time }}</p>
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
<style scoped>
.mCardBlock {
  overflow: scroll;
  height: 268vh;
  width: 665px;
  overflow-y: auto;
  overflow-x: hidden;
}

.plusIconBlock {
  border-radius: 6.372px;
  background: #e6f0ff;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mCard {
  width: 325px;
  border-radius: 6.372px;
  background: #fff;
  box-shadow: 0px 5.098px 5.098px 0px rgba(0, 0, 0, 0.25);
  height: 100px;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}
.newMCard {
  width: 350px;
  border-radius: 6.372px;
  background: #e6f0ff;
  box-shadow: 0px 5.098px 5.098px 0px rgba(0, 0, 0, 0.25);
  height: 115px;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}

.mCardBlock .accordion-item .accordion-button {
  background-color: transparent;
  color: #ff8100;
}

.mCardhead h6 {
  color: #0a1629;
  font-size: 16px;
  font-style: normal;
  line-height: 30.586px;
  /* 150% */
}

.Mcardli {
  width: 25px;
}

.mCardhead p {
  color: #91929e;
  font-size: 14px;
}

.mCardhead p span {
  text-decoration: underline;
}

.mCardTime p {
  color: #91929e;
  font-size: 15px;
}

.mCardTime {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.ViewMsd {
  background-color: #ccdff1;
  width: 21px;
  height: 21px;
  border-radius: 100px;
  text-align: center;
  color: #000 !important;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px !important;
}
</style>
