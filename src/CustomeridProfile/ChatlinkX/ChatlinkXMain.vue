<script setup>
import ChatDetialsRight from './ChatDetialsRight.vue';
import ChatingBlock from './ChatingBlock.vue';
import Chatlink from '../Icons/Chatlink.png'
</script>
<template>
    <div>
        <div class="scrool-delevry">
            <ul class="nav nav-nav nav-tabs mt-2">
                <li class="nav-item">
                    <a class="nav-link show active" data-bs-toggle="tab" href="#Chatlink">
                        <img class="sidebar-icon" :src="Chatlink" alt="Chatlink" :style="{ width: '20px' }">
                        &nbsp; CHATLINK</a>
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
                                    <ChatingBlock />
                                    <ChatDetialsRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>