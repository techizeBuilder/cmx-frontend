<script setup>
import ChatDetialsRight from "./ChatDetialsRight.vue";
import ChatingBlock from "./ChatingBlock.vue";
import Chatlink from "../Icons/Chatlink.png";
import ChatlinkInviteTab from "./ChatlinkInviteTab.vue";
import { watch, ref } from "vue";

const props = defineProps(["customerData"]);
const customerData = ref("");
watch(props, () => {
  customerData.value = props.customerData;
});

const chatBlock = ref();
const handleText = (text) => {
  chatBlock.value.messageData = text;
  chatBlock.value.messageEdit = false;
  document.querySelector('[name="folderXChatInput"]').focus();
};
</script>
<template>
  <div>
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#Chatlink">
            &nbsp; ChatlinX</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ChatlinkInvite">
            &nbsp; ChatlinX Invite</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Chatlink">
          <div class="estimatedetailsection">
            <div class="row">
              <div class="col-lg-12 col-rowset">
                <div class="d-flex justify-content-between pb-5 mt-4">
                  <ChatingBlock ref="chatBlock" />
                  <ChatDetialsRight
                    :customerData="customerData"
                    @SelectText="handleText"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="ChatlinkInvite">
          <div class="estimatedetailsection">
            <div class="row">
              <div class="col-lg-12 col-rowset">
                <div class="d-flex justify-content-between pb-5 mt-4">
                  <ChatlinkInviteTab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
