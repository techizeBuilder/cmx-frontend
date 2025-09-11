<script setup>

import ChatlinkInvite from './MessageModule/ChatlinkInvite.vue'
import EstimateChat from './MessageModule/EstimateChat.vue'
import RepairChat from './MessageModule/RepairChat.vue'
import CompletedChat from './MessageModule/CompletedChat.vue'
import SurveyRequest from './MessageModule/SurveyRequest.vue'

</script>
<template>
    <div class="d-flex flex-column gap-3 mt-4 w-75">
        <ChatlinkInvite />
        <EstimateChat />
        <RepairChat />
        <CompletedChat />
        <SurveyRequest />
    </div>
</template>
