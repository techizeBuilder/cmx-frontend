<script setup>
 
import VendorXStaffSetupActive from './VendorXStaffSetupActive.vue';
import VendorXStaffSetupInactive from './VendorXStaffSetupInactive.vue';
</script>

<template>
    <div class="shoppage-section">
        <div class="scrool-delevry">
            <ul class="nav nav-nav nav-tabs ">
                <li class="nav-item">
                    <a class="nav-link show active" data-bs-toggle="tab" href="#staffsetupsectionone">Active
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#staffsetupsectiontwo">Inactive</a>
                </li>
            </ul>
        </div>
        <div class="select-option-first">
            <div class="tab-content">
                <div class="tab-pane show active" id="staffsetupsectionone">
                    <VendorXStaffSetupActive /> <!--  Active component -->
                </div>

                <div class="tab-pane" id="staffsetupsectiontwo">
                    <VendorXStaffSetupInactive /> <!--  Inactive component -->
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
