<script setup>
import ESignatureFolderX from "./ESignatureFolderX.vue";
import FolderXCustCommentsMain from "./FolderXCustComments/FolderXCustCommentsMain.vue";
import TimelineFolderxCstm from "./TimelineFolderxCstm.vue";
import ChatlinkMessagesCommsMain from "./ChatlinkMessagesComms/ChatlinkMessagesCommsMain.vue";
import FolderXCusomColor from "./FolderXCusomColor.vue";
import { onMounted, ref } from "vue";

const result = ref({});
const myChild = ref(null);

// const handleESignatureTabClose = () => {
//   console.log("called",myChild.value.customTimeLine);
// };

// onMounted(() => {
//   const TimelineFolderxCstm = document.querySelector(
//     '[href="#TimelineFolderxCstm"]'
//   );
//   TimelineFolderxCstm.addEventListener(
//     "hidden.bs.tab",
//     handleESignatureTabClose
//   );
// });
</script>

<template>
  <div class="shoppage-section">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#TimelineFolderxCstm"
            >Timeline</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#CommentsFolderxCstm"
            >Comments</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#esignatureFolderxCstm"
            >E-Signature</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#ChatlinkFolderxCstm"
            >Chatlink Messages</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            data-bs-toggle="tab"
            href="#FolderXCustomColorFolderxCstm"
            >RO Custom Color</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first">
      <div class="tab-content">
        <div class="tab-pane" id="TimelineFolderxCstm">
          <TimelineFolderxCstm :data="result" ref="myChild" />
        </div>
        <div class="tab-pane" id="CommentsFolderxCstm">
          <FolderXCustCommentsMain />
        </div>
        <div class="tab-pane " id="esignatureFolderxCstm">
          <ESignatureFolderX />
        </div>
        <div class="tab-pane " id="ChatlinkFolderxCstm">
          <ChatlinkMessagesCommsMain />
        </div>
        <div class="tab-pane show active" id="FolderXCustomColorFolderxCstm">
          <FolderXCusomColor />
        </div>
      </div>
    </div>
  </div>
</template>
