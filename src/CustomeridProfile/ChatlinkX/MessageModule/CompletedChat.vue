<script setup>
import Completed from '../chatIcons/Completed.png'

const ChatlinkInviteData = [
    {
        ModalHead: 'Completed Chat # 1',
        InputMsg: 'Vehicle Completed Update',
        MsgDisc: 'Total Customer Amount Due: .............$0.00 - Insurance payment (Customer) .............$0.00 - Deductible (Customer) Total Insurance Amount Due: $0.00 Total Estimate Amount $0.00 If you have any questions please contact us via Chatlink or by phone.',

    },
    {
        ModalHead: 'Completed Chat # 2',
        InputMsg: 'Vehicle Completed Update',
        MsgDisc: 'Vehicle Update: Your vehicle is ready for pickup. Please provide a date and time you will be able to pickup your vehicle. Pickup hours: Monday - Friday: 8AM - 4:30PM Saturday: 9AM - 11:30AM Sunday: Closed Note: If you have a rental vehicle please return your rental prior to picking up your vehicle.',

    },

]


</script>
<template>
    <div class="d-flex flex-column gap-3  ">
        <div class="d-flex gap-3 mb-2 align-items-center cursor-pointer justify-content-between" data-bs-toggle="modal"
            data-bs-target="#CompletedChatAXB">

            <div class="d-flex gap-3 align-items-center">
                <img class="img-fluid chatimgx" :src="Completed" alt="Completed" :style="{ width: '25px' }" />
                <span class="text-underline">Completed Chat</span>
            </div>
            <i class="fa-solid fa-angle-down"></i>
        </div>

    </div>

    <div class="modal" id="CompletedChatAXB">
        <div class="modal-dialog modal-dialog-centered  modal-fullscreen">
            <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">

                <!-- Modal Header -->
                <div class="modal-header chatHeBox border-0">
                    <h6 class="m-0">Completed Chat</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body px-2 mt-4">
                    <div class="row   g-3">
                        <div class="col-sm-12 mb-4" v-for="(Items, Index) in ChatlinkInviteData" :key="Index">
                            <div class="card mx-auto" :style="{ maxWidth: '500px' }">
                                <div class="card-body py-5 px-4">
                                    <div class="d-flex mb-1 justify-content-between align-items-center">
                                        <h6 class="m-0  ">{{ Items.ModalHead }}</h6>
                                        <p class="m-0" :style="{ color: '#636363' }">{{ Items.Default }}</p>
                                    </div>
                                    <p class="border p-2 rounded border-dark">{{ Items.InputMsg }}</p>
                                    <div class="card MsgDiscard mt-3" :style="{ border: '1px solid #78707D' }">
                                        <div class="card-body border-dark">
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
    min-height: 300px;
}
.chatHeBox{
    background-color: #ccdff1;
}
</style>