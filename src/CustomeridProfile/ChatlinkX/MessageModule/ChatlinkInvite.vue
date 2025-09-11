<script setup>
import Chatlink from '../chatIcons/Chatlink.png'

const ChatlinkInviteData = [
    {
        ModalHead: 'Chatlink Invite # 1',
        InputMsg: 'Welcome Message',
        MsgDisc: 'We first want to take a moment to thank you for trusting us with your vehicle. If you have any questions please contact us via our Chatlink or by phone.',
        Default: 'Default #1'
    },
    {
        ModalHead: 'Chatlink Invite # 2',
        InputMsg: 'PhotoX Invite Message',
        MsgDisc: 'Please take a moment to begin the Virtual Photo process by selecting the “PhotoX” icon.',

    },
    {
        ModalHead: 'Chatlink Invite # 3',
        InputMsg: 'E-Sign Invite Message',
        MsgDisc: 'Please take a moment e-sign the authorization for repairs via the Electronic Signature found in the lower section of this page “E-Sign”.',
    },
    {
        ModalHead: 'Invite Chat # 4',
        InputMsg: 'Vehicle Arrival - Tow Message',
        MsgDisc: 'Vehicle Update: We are wanting to inform you that your vehicle has arrived by tow. We will check in your vehicle and will provide you with an update soon. If you have any questions please contact us via our Chatlink or by phone.',

    },
]


</script>
<template>
    <div class="d-flex flex-column gap-3 mt-4">
        <div class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer " data-bs-toggle="modal"
            data-bs-target="#ChatlinkInviteZ">
            <div class="d-flex gap-3 align-items-center">
                <img class="img-fluid chatimgx" :src="Chatlink" alt="Chatlink" :style="{ width: '25px' }" />
                <span class="text-underline">Chatlink Invite</span>
            </div>
            <i class="fa-solid fa-angle-down"></i>
        </div>

    </div>

    <div class="modal" id="ChatlinkInviteZ">
        <div class="modal-dialog modal-dialog-centered  modal-fullscreen">
            <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">

                <!-- Modal Header -->
                <div class="modal-header chatHeBox border-0">
                    <h6 class="m-0">Chatlink Invite</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body px-2 mt-4">
                    <div class="row justify-content-center g-3">
                        <div class="col-sm-12 mb-4" v-for="(Items, Index) in ChatlinkInviteData" :key="Index">
                            <div class="card mx-auto" :style="{ maxWidth: '500px' }">
                                <div class="card-body p-5">
                                    <div class="d-flex mb-1 justify-content-between align-items-center">
                                        <h6 class="m-0  ">{{ Items.ModalHead }}</h6>
                                        <p class="m-0" :style="{ color: '#636363' }">{{ Items.Default }}</p>
                                    </div>
                                    <p class="border p-2 rounded border-dark">{{ Items.InputMsg }}</p>
                                    <div class="card MsgDiscard mt-3" :style="{ border: '1px solid #78707D' }">
                                        <div class="card-body pb-5 border-dark">
                                            <small>
                                                {{ Items.MsgDisc }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-light">Select</button>
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
.MsgDiscard {
    min-height: 230px;
}
.chatHeBox{
    background-color: #ccdff1;
}
</style>