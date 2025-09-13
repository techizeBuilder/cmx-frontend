<script setup>
import ShopStaffInactive from './ShopStaffinactive.vue';
import ShopStaffActive from './ShopStaffactive.vue';

 

 

</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#ShopStaffactive">
                    Active Staff</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#ShopStaffinactive">
                    Inactive Staff</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active" id="ShopStaffactive">
                   
                    <ShopStaffActive />
                </div>
                <div class="tab-pane show" id="ShopStaffinactive"> 
                    <ShopStaffInactive />
                </div>
            </div>
        </div>

    </div>
</template>