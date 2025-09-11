<script setup>
import uploadIconsss from '../../assets/uploadIcon.png'
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import sample from './sample.pdf'
</script>
<template>
    <div class="estimatedetailsection">
        <div class="row">
            <div class="col-lg-12 col-rowset">
                <div class="d-lg-flex align-items-end gap-4 mt-2 mb-4 justify-content-end">

                    <div class="d-flex align-items-end gap-4  justify-content-end flex-wrap">
                        <button type="button" class="btn btn-light text-nowrap"><i class="fa-solid fa-trash-can"></i>&nbsp;
                            Delete</button>
                        <button type="button" class="btn btn-light text-nowrap" data-bs-toggle="modal"
                            data-bs-target="#UploadEstimatemodule"><i class="fa-solid fa-cloud-arrow-up"></i>&nbsp;
                            Upload Estimate</button>
                        <button type="button" class="btn btn-light text-nowrap"><i
                                class="fa-regular fa-pen-to-square"></i>&nbsp;
                            Edit</button>
                        <button type="button" class="btn btn-light text-nowrap"> <i class="fa-regular fa-floppy-disk"></i>
                            Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-rowset">
                <div class="d-flex align-items-end  justify-content-between mt-2 mt-sm-2 pb-5">
                    <vue-pdf-app style="min-height: 100vh;height: 100vh; width: 100%;" :pdf="sample"></vue-pdf-app>
                </div>
            </div>
        </div>
    </div>
    <div class="modal " id="UploadEstimatemodule">
        <div class="modal-dialog modal-lg modal-dialog-centered p-0 p-sm-5">
            <div class="modal-content ">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body text-center pt-5 px-sm-5">
                    <h2 class="mb-4">Drag & Drop</h2>
                    <div class="file ">
                        <img :src="uploadIconsss" alt="DownloadIcon" :style="{ width: '125px' }" />
                        <input type="file" name="file" />
                        <h4>Document upload</h4>
                        <button class="btn mt-3" :style="{ backgroundColor: '#FF8100', color: '#ffffff' }">Select
                            documents</button>
                    </div>

                    <div class="d-flex gap-4 justify-content-end mt-4">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal"
                            :style="{ backgroundColor: '#E0E0E0 !important', color: '#ffffff' }">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>