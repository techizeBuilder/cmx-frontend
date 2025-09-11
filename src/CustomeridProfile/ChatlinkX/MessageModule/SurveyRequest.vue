<script setup>
import Survery from '../chatIcons/Survery.png'

const ChatlinkInviteData = [
    {
        ModalHead: 'Survey Request # 2',
        InputMsg: '5 Star Survay',
        MsgDisc: 'Please take a moment to complete our Survey. We strive for 5 Starts!',
    },

]


</script>
<template>
    <div class="d-flex flex-column gap-3  ">
        <div class="d-flex gap-3 mb-2 align-items-center justify-content-between cursor-pointer " data-bs-toggle="modal"
            data-bs-target="#SurveyRequestAXB">
            <div class="d-flex gap-3 align-items-center">
                <img class="img-fluid chatimgx" :src="Survery" alt="Survery" :style="{ width: '25px' }" />
                <span class="text-underline">Survey Request </span>
            </div>
            <i class="fa-solid fa-angle-down"></i>
        </div>
    </div>

    <div class="modal" id="SurveyRequestAXB">
        <div class="modal-dialog modal-dialog-centered  modal-fullscreen">
            <div class="modal-content" :style="{ backgroundColor: '#D9D9D9' }">

                <!-- Modal Header -->
                <div class="modal-header chatHeBox border-0">
                    <h6 class="m-0">Survey Request</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body px-2">
                    <div class="row   g-3">

                        <div class="col-sm-12 mb-4">
                            <div class="card mx-auto" :style="{ maxWidth: '500px' }">
                                <div class="card-body py-5 px-4">
                                    <div class="d-flex mb-1 justify-content-between align-items-center">
                                        <h6 class="m-0  ">Survey Request # 1</h6>

                                    </div>
                                    <p class="border p-2 rounded border-dark">5 Star Survay</p>
                                    <div class="card MsgDiscard mt-3" :style="{ border: '1px solid #78707D' }">
                                        <div class="card-body border-dark">
                                            <p><small> Please take a moment to provide your 5 Star Survey.</small></p>
                                            <div class="customerRatingR px-3">
                                                <h6 class="mb-1">Customer Rating</h6>
                                                <div class="d-flex justify-content-start align-items-start gap-2">
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                </div>
                                            </div>
                                            <div class="GoogleRatingR mt-4 px-3">
                                                <h6 class="mb-1">Google Rating</h6>
                                                <div class="d-flex justify-content-start align-items-start gap-2">
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-light">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>

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
<style>
.MsgDiscard {
    min-height: 300px;
}

.customerRatingR .checked,
.GoogleRatingR .checked {
    color: orange;
} .chatHeBox{
    background-color: #ccdff1;
}
</style>