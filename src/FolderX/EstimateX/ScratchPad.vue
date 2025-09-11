<script setup>
  
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
</script>
<template>
    <div class="estimatedetailsection">
        <div class="row">
            <div class="col-lg-12 col-rowset">
                <div class="d-lg-flex align-items-end gap-4 mt-2 mb-4 justify-content-end">
                 
                    <div class="d-flex align-items-end gap-4  justify-content-end">
                        <button type="button" class="btn btn-light text-nowrap">&nbsp;
                            Cancel</button>
                        <button type="button" class="btn btn-light text-nowrap"><i class="fa-regular fa-pen-to-square"></i>&nbsp;
                            Edit</button>
                        <button type="button" class="btn btn-light text-nowrap"> <i class="fa-regular fa-floppy-disk"></i>
                            Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-rowset pb-5">
                 <div :style="{height: '40vh'}">
                    <QuillEditor  toolbar='full' />
                 </div> 
            </div>
        </div>


    </div>
</template>
<style scoped></style>