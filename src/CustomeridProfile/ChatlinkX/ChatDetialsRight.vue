<script setup>
import InviteChat from './InviteChat.vue';


</script>
<template>
    <div class="px-3" :style="{ width: '600px' }">
        <div class="dtopbtn d-flex gap-4 justify-content-center pb-2" >
            <button class="btn btn-light">
                <i class="fa-solid fa-circle" :style="{ color: '#00FF51' }"></i> &nbsp;Opt In
            </button>
            <button class="btn btn-light">
                <i class="fa-solid fa-print"></i>&nbsp; Print
            </button>
        </div>
        <hr :style="{ color: '#E6EBF5', borderWidth: '2px',opacity: 1 }" />
        <div class="d-block dcustometDe mt-4 mb-4">
            <h6 class="fw-bold  text-center mb-4">Customer Name</h6>
            <p class="mb-1">Phone : XXXXXXXX</p>
            <p>Email : XXXXXXXX@gmail.com</p>
        </div>
        <hr class="py-2" :style="{ color: '#E6EBF5', borderWidth: '2px',opacity: 1 }" />
        <p class="mb-1">
            <i class="fa-solid fa-link"></i>
            <span :style="{ color: '#91929E' }"> Customer ID:</span>&nbsp;
            <span :style="{ color: '#0066FF', textDecoration: 'underline' }">000000</span>
        </p>
        <p class="mb-1">
            <i class="fa-solid fa-link"></i>
            <span :style="{ color: '#91929E' }"> FolderX:</span>&nbsp;
            <span :style="{ color: '#0066FF', textDecoration: 'underline' }">000000</span>
        </p>
        <p class="ps-4 mb-1">
            <span :style="{ color: '#91929E' }">RO Status: Open</span>
        </p>
        <p class="ps-4">
            <span :style="{ color: '#91929E' }">
                Year <br />
                Make<br />
                Model<br />
                Insurance<br />
            </span>
        </p>

        <hr :style="{ color: '#E6EBF5', borderWidth: '2px',opacity: 1 }" />

        <InviteChat />

        <hr :style="{ color: '#E6EBF5', borderWidth: '2px',opacity: 1 }" />
        <div class="customerRatingR text-center mt-4">
            <h6 class="mb-1">Customer Rating</h6>
            <div class="d-flex justify-content-center align-items-center gap-2">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
            </div>
        </div>
        <div class="GoogleRatingR text-center mt-4">
            <h6 class="mb-1">Google Rating</h6>
            <div class="d-flex justify-content-center align-items-center gap-2">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.customerRatingR .checked,
.GoogleRatingR .checked {
    color: orange;
}
</style>