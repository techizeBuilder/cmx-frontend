<script setup>
import Repair from '../chatIcons/Repair.png'

const ChatlinkInviteData = [
    {
        ModalHead: 'Repair Chat #1',
        InputMsg: 'Repair Stage Update',
        MsgDisc: 'Vehicle update: Your vehicle is in the following stage # <Enter Number> (#1 Body, #2 Frame, #3 Paint, #4 Mechanical, #5 Reassembly, #6 Detail) We will continue to provide you updates on your vehicle. The estimated Target date for your vehicle is: MM/DD/YYYY If you have any questions please contact us via Chatlink or by phone.',
       
    },
    
]


</script>
<template>
    <div class="d-flex flex-column gap-3  ">       
        <div class="d-flex gap-3 mb-2 align-items-center cursor-pointer justify-content-between " data-bs-toggle="modal" data-bs-target="#RepairChatAXB">
            <div class="d-flex gap-3 align-items-center">
            <img class="img-fluid chatimgx" :src="Repair" alt="Repair" :style="{ width: '25px' }" />
           <span class="text-underline">Repair Chat</span>
        </div>
           <i class="fa-solid fa-angle-down"></i>
        </div>
    </div>

    <div class="modal" id="RepairChatAXB">
        <div class="modal-dialog modal-dialog-centered  modal-fullscreen">
            <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">

                <!-- Modal Header -->
                <div class="modal-header chatHeBox border-0">
                    <h6 class="m-0">Repair Chat</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body mt-4 px-4">
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
 .MsgDiscard{
    min-height: 230px;
 }
 .chatHeBox{
    background-color: #ccdff1;
}
</style>