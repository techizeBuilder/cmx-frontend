<script setup>
import VendorXpartshopdetials from './VendorXpartshopdetials.vue';

</script>

<template>
    <div class="shoppage-section">
        <div class="scrool-delevry">
            <ul class="nav nav-nav nav-tabs ">
                <li class="nav-item">
                    <a class="nav-link show active" data-bs-toggle="tab" href="#tabmobileone">Shop
                        Details</a>
                </li>
                
            </ul>
        </div>
        <div class="select-option-first">
            <div class="tab-content">
                <div class="tab-pane show active" id="tabmobileone">
                    <VendorXpartshopdetials />
                </div>
                 
            </div>
        </div>
    </div>
</template>

<style scoped></style>
