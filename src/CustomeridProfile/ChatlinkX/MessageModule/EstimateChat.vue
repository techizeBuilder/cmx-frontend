<script setup>
import Estimate from '../chatIcons/Estimate.png'

const ChatlinkInviteData = [
    {
        ModalHead: 'Estimate Chat #1',
        InputMsg: 'Preliminary Estimate, Insurance Review',
        MsgDisc: 'Vehicle update: We want to inform you we have completed the preliminary estimate for your vehicle. We have submitted it to the insurance company for review and are waiting on a response. We will update you as soon as we have a response. If you have any questions please contact us via Chatlink or by phone.',
        Default: 'Default #1'
    },
    {
        ModalHead: 'Estimate Chat #2',
        InputMsg: 'Insurance Estimate Approval',
        MsgDisc: '`Vehicle Update: We have secured an approval from the insurance company for your vehicle repairs.The total reliminary estimate for your vehicle is $0.00.The estimated days to repair are 121day which begins when all parts have arrived.Due to unexpected delays in manufacturing parts delays can be more or less then 3 days.We will keep you updated when parts have arrived.Note: Target days are only an estimate.Should we find additional damage(Supplement) this will add to the total number of days to repair your vehicle. If you have any questions please contact us by Chatlink or by phone.  `',

    },
    {
        ModalHead: 'Estimate Chat #3',
        InputMsg: 'Supplement Notification (Hold, Approval)',
        MsgDisc: 'Vehicle update: We have uncovered additional (Supplement) damage to your vehicle. We have submitted the additional damage to the insurance company. >We will provide you an update as soon as we have one from the Insurance company. At this time your vehicle is on hold waiting on a response from the Insurance company. >We have secured approval from the Insurance and repairs will continue. The total additional amount is <0.00> which brings a total repair of <$0.00> The new estimated days to repair are <Days to repair>. We will continue to inform you on repair status. If you have any questions please contact us by Chatlink or by phone.',

    },

]


</script>
<template>
    <div class="d-flex flex-column gap-3  ">
        <div class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer " data-bs-toggle="modal"
            data-bs-target="#EstimateChatAXB">
            <div class="d-flex gap-3 align-items-center">
                <img class="img-fluid chatimgx" :src="Estimate" alt="Estimate" :style="{ width: '25px' }" />
                <span class="text-underline">Estimate Chat</span>
            </div>
            <i class="fa-solid fa-angle-down"></i>
        </div>

    </div>

    <div class="modal" id="EstimateChatAXB">
        <div class="modal-dialog modal-dialog-centered  modal-fullscreen">
            <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">

                <!-- Modal Header -->
                <div class="modal-header chatHeBox border-0">
                    <h6 class="m-0">Estimate Chat</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body mt-4 px-2">
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