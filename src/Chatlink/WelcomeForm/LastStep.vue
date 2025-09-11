<script setup>
import Upload from '../Icons/Upload.png'
</script>
<template>
    <div class="text-center py-5">
        <h2 class="mb-0">welcome form</h2>
        <h2 class="mb-4">uploaded to repair shop</h2>
        <div class="file ">
            <img :src="Upload" alt="Upload" :style="{ width: '150px' }" />
            <input type="file" name="file" />

        </div>

        <div class="d-flex gap-4 justify-content-center mt-5">
            <button type="button" class="btn btn-light px-5" data-bs-dismiss="modal"
                :style="{ backgroundColor: '#E0E0E0 !important', color: '#ffffff' }">Close</button>

            <button class="btn px-4 " :style="{ backgroundColor: '#FF8100', color: '#ffffff' }">RETURN to Chatlink</button>
        </div>
    </div>
</template>
<style scoped>
.file {
    position: relative;
}
</style>