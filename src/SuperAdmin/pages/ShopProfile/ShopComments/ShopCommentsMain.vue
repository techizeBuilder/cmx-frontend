<script setup>
import ShopCommentXTab from './ShopCommentXTab.vue'
import ShopComXNewComment from './ShopComXNewComment.vue'
import { ref } from 'vue';
const seen = ref(false)
</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#ShopcommentCom" v-on:click="seen = false">
                    Comments</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-on:click="seen = !seen" :style="{ cursor: 'pointer' }">
                    New Comment</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active pb-5" id="ShopcommentCom">
                    <div v-if="seen">
                        <ShopComXNewComment />
                    </div>
                    <ShopCommentXTab />
                </div>
            </div>
        </div>
    </div>
</template>