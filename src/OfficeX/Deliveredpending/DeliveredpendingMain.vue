<script setup>
 
import DeliveredpendingTab from './DeliveredpendingTab.vue'
 

</script>
<template>
    <div class="shoppage-section">
        <div class="scrool-delevry">
            <ul class="nav nav-nav nav-tabs ">
                <li class="nav-item">
                    <a class="nav-link show active" data-bs-toggle="tab" href="#tabEstimateCalendar">Delivered</a>
                </li>
                

            </ul>
        </div>
        <div class="select-option-first">
            <div class="tab-content">
                <div class="tab-pane show active" id="tabEstimateCalendar">
                      <DeliveredpendingTab />
                </div>
                

            </div>
        </div>
    </div>
</template>