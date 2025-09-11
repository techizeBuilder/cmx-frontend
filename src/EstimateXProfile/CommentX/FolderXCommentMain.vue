<script setup>
import CommentXTab from "./CommentXTab.vue";
import CommentXNewComment from "./CommentXNewComment.vue";
import Comments from "../Icons/Comments.png";
import NewCo from "../Icons/NewCo.png";
import { ref } from "vue";
const seen = ref(false);
</script>

<template>
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            id="CommentsTab"
            href="#Comments"
            v-on:click="seen = false"
          >
            <img
              class="sidebar-icon"
              :src="Comments"
              alt="Customerpro"
              width="20"
            />Comments</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-on:click="seen = !seen"
            :style="{ cursor: 'pointer' }"
          >
            <img
              class="sidebar-icon"
              :src="Comments"
              alt="Customerpro"
              width="20"
            />New&nbsp;Comment</a
          >
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="Comments">
          <div v-if="seen">
            <CommentXNewComment />
          </div>
          <CommentXTab />
        </div>
      </div>
    </div>
  </div>
</template>
