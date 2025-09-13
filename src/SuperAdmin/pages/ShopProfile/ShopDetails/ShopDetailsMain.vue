<script setup>
import ShopDetailsTab from './ShopDetailsTab.vue';
import ShopRatestab from './ShopRatestab.vue';

 

</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#Shopdetailsnew">
                    Shop Details</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#Ratesnew">
                    Rates</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active" id="Shopdetailsnew">
                    <div class="shopDemoTopBar d-flex align-items-center justify-content-end w-full my-5 gap-5">
      
                        <div class="d-flex align-items-center  gap-4">
                            <button type="btn" class="btn btn-dark text-nowrap px-4">EDIT</button>
                            <button type="btn" class="btn btn-dark text-nowrap px-4">CANCEL</button>
                            <button type="btn" class="btn btn-dark text-nowrap px-4">SAVE</button>
                        </div>
                    </div>
                  <ShopDetailsTab />
                </div>
                <div class="tab-pane show" id="Ratesnew">

                    <div class="shopDemoTopBar d-flex align-items-center justify-content-end w-full my-5 gap-5">
                    
                        <div class="d-flex align-items-center  gap-4">
                            <button type="btn" class="btn btn-dark text-nowrap px-4">EDIT</button>
                            <button type="btn" class="btn btn-dark text-nowrap px-4">CANCEL</button>
                            <button type="btn" class="btn btn-dark text-nowrap px-4">SAVE</button>
                        </div>
                    </div>
                     <ShopRatestab />
                </div>
            </div>
        </div>

    </div>
</template>